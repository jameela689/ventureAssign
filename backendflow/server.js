const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const SECRET_KEY = "shopping_app_secret_key_2024";
let db = null;
const db_path = path.join(__dirname, 'shoppingdata.db');

// Database Initialization
const dbInitAndConnect = async () => {
    try {
        db = await open({ filename: db_path, driver: sqlite3.Database });
        
        // Enable foreign keys
        await db.exec('PRAGMA foreign_keys = ON;');
        
        // Users table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Items table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL CHECK(price >= 0),
                stock INTEGER DEFAULT 0 CHECK(stock >= 0),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Carts table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS carts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL UNIQUE,
                status TEXT CHECK(status IN ('active', 'ordered')) DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        // Cart_Items table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS cart_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cart_id INTEGER NOT NULL,
                item_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL CHECK(quantity > 0),
                price_at_addition REAL NOT NULL,
                FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
                FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
                UNIQUE(cart_id, item_id)
            );
        `);

        // Orders table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                cart_id INTEGER NOT NULL,
                total_amount REAL NOT NULL CHECK(total_amount >= 0),
                status TEXT CHECK(status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (cart_id) REFERENCES carts(id)
            );
        `);

        // User sessions table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS user_sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL UNIQUE,
                token TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        app.listen(3001, () => console.log('Shopping API Server running on port 3001'));
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(-1);
    }
};

dbInitAndConnect();

// ==================== MIDDLEWARE ====================

const authenticateToken = (request, response, next) => {
    try {
        const authHeader = request.headers['authorization'];
        
        if (!authHeader) {
            return response.status(401).json({ error: 'No authorization header' });
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return response.status(401).json({ error: 'No token provided' });
        }

        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if (err) {
                return response.status(403).json({ error: 'Invalid or expired token' });
            }

            // Verify token exists in user_sessions
            const session = await db.get(
                `SELECT * FROM user_sessions WHERE user_id = ? AND token = ?`,
                [decoded.userId, token]
            );

            if (!session) {
                return response.status(403).json({ error: 'Session expired or invalid' });
            }

            request.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Auth error:', error);
        response.status(500).json({ error: 'Authentication error' });
    }
};

// ==================== USER ROUTES ====================

// POST /users - Create new user
app.post('/signup', async (request, response) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
        return response.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
        return response.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
        // Check if email already exists
        const existingUser = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
        if (existingUser) {
            return response.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.run(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            [name, email, hashedPassword]
        );

        const user = await db.get(`SELECT id, name, email, created_at FROM users WHERE id = ?`, [result.lastID]);
        response.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /users - List all users
app.get('/users', authenticateToken, async (request, response) => {
    try {
        const users = await db.all(`SELECT id, name, email, created_at FROM users`);
        response.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /users/login - User login
app.post('/users/login', async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
        
        if (!user) {
            return response.status(400).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return response.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate new token
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '24h' });

        // Delete old session and create new one (single session per user)
        await db.run(`DELETE FROM user_sessions WHERE user_id = ?`, [user.id]);
        await db.run(
            `INSERT INTO user_sessions (user_id, token) VALUES (?, ?)`,
            [user.id, token]
        );

        response.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// ==================== ITEM ROUTES ====================

// POST /items - Create new item
app.post('/items', authenticateToken, async (request, response) => {
    const { name, description, price, stock } = request.body;

    if (!name || price === undefined) {
        return response.status(400).json({ error: 'Name and price are required' });
    }

    if (price < 0) {
        return response.status(400).json({ error: 'Price cannot be negative' });
    }

    try {
        const result = await db.run(
            `INSERT INTO items (name, description, price, stock) VALUES (?, ?, ?, ?)`,
            [name, description || null, price, stock || 0]
        );

        const item = await db.get(`SELECT * FROM items WHERE id = ?`, [result.lastID]);
        response.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        console.error('Error creating item:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /items - List all items
app.get('/items', async (request, response) => {
    try {
        const items = await db.all(`SELECT * FROM items WHERE stock > 0 ORDER BY created_at DESC`);
        response.json({ items });
    } catch (error) {
        console.error('Error fetching items:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// ==================== CART ROUTES ====================

// POST /carts - Create cart and add items
app.post('/carts', authenticateToken, async (request, response) => {
    const { items } = request.body; // items = [{ item_id, quantity }, ...]
    const { userId } = request.user;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return response.status(400).json({ error: 'Items array is required' });
    }

    try {
        // Check if user already has an active cart
        let cart = await db.get(
            `SELECT * FROM carts WHERE user_id = ? AND status = 'active'`,
            [userId]
        );

        // If no active cart exists, create one
        if (!cart) {
            const result = await db.run(
                `INSERT INTO carts (user_id, status) VALUES (?, 'active')`,
                [userId]
            );
            cart = await db.get(`SELECT * FROM carts WHERE id = ?`, [result.lastID]);
        }

        // Add items to cart
        const addedItems = [];
        for (const cartItem of items) {
            const { item_id, quantity } = cartItem;

            if (!item_id || !quantity || quantity <= 0) {
                continue; // Skip invalid items
            }

            // Get item details
            const item = await db.get(`SELECT * FROM items WHERE id = ?`, [item_id]);
            
            if (!item) {
                continue; // Skip non-existent items
            }

            if (item.stock < quantity) {
                return response.status(400).json({ 
                    error: `Insufficient stock for ${item.name}. Available: ${item.stock}` 
                });
            }

            // Check if item already in cart
            const existingCartItem = await db.get(
                `SELECT * FROM cart_items WHERE cart_id = ? AND item_id = ?`,
                [cart.id, item_id]
            );

            if (existingCartItem) {
                // Update quantity
                await db.run(
                    `UPDATE cart_items SET quantity = quantity + ? WHERE id = ?`,
                    [quantity, existingCartItem.id]
                );
            } else {
                // Add new item to cart
                await db.run(
                    `INSERT INTO cart_items (cart_id, item_id, quantity, price_at_addition) 
                     VALUES (?, ?, ?, ?)`,
                    [cart.id, item_id, quantity, item.price]
                );
            }

            addedItems.push({ item_id, name: item.name, quantity, price: item.price });
        }

        // Get updated cart with items
        const cartItems = await db.all(
            `SELECT ci.*, i.name, i.description 
             FROM cart_items ci
             JOIN items i ON ci.item_id = i.id
             WHERE ci.cart_id = ?`,
            [cart.id]
        );

        response.status(201).json({
            message: 'Items added to cart successfully',
            cart: {
                id: cart.id,
                user_id: cart.user_id,
                status: cart.status,
                items: cartItems
            }
        });
    } catch (error) {
        console.error('Error creating/updating cart:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /carts - List all carts (admin) or user's cart
app.get('/carts', authenticateToken, async (request, response) => {
    const { userId } = request.user;

    try {
        // Get user's active cart with items
        const cart = await db.get(
            `SELECT * FROM carts WHERE user_id = ? AND status = 'active'`,
            [userId]
        );

        if (!cart) {
            return response.json({ message: 'No active cart found', cart: null });
        }

        const cartItems = await db.all(
            `SELECT ci.*, i.name, i.description, i.price as current_price
             FROM cart_items ci
             JOIN items i ON ci.item_id = i.id
             WHERE ci.cart_id = ?`,
            [cart.id]
        );

        const total = cartItems.reduce((sum, item) => sum + (item.price_at_addition * item.quantity), 0);

        response.json({
            cart: {
                id: cart.id,
                user_id: cart.user_id,
                status: cart.status,
                created_at: cart.created_at,
                items: cartItems,
                total_amount: total.toFixed(2)
            }
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// ==================== ORDER ROUTES ====================

// POST /orders - Convert cart to order
app.post('/orders', authenticateToken, async (request, response) => {
    const { cart_id } = request.body;
    const { userId } = request.user;

    if (!cart_id) {
        return response.status(400).json({ error: 'cart_id is required' });
    }

    try {
        // Verify cart belongs to user and is active
        const cart = await db.get(
            `SELECT * FROM carts WHERE id = ? AND user_id = ? AND status = 'active'`,
            [cart_id, userId]
        );

        if (!cart) {
            return response.status(404).json({ error: 'Cart not found or already ordered' });
        }

        // Get cart items
        const cartItems = await db.all(
            `SELECT ci.*, i.stock, i.name
             FROM cart_items ci
             JOIN items i ON ci.item_id = i.id
             WHERE ci.cart_id = ?`,
            [cart_id]
        );

        if (cartItems.length === 0) {
            return response.status(400).json({ error: 'Cart is empty' });
        }

        // Check stock availability
        for (const item of cartItems) {
            if (item.stock < item.quantity) {
                return response.status(400).json({ 
                    error: `Insufficient stock for ${item.name}. Available: ${item.stock}, Requested: ${item.quantity}` 
                });
            }
        }

        // Calculate total
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.price_at_addition * item.quantity), 0);

        // Create order
        const orderResult = await db.run(
            `INSERT INTO orders (user_id, cart_id, total_amount, status) 
             VALUES (?, ?, ?, 'pending')`,
            [userId, cart_id, totalAmount]
        );

        // Update cart status
        await db.run(
            `UPDATE carts SET status = 'ordered' WHERE id = ?`,
            [cart_id]
        );

        // Reduce stock
        for (const item of cartItems) {
            await db.run(
                `UPDATE items SET stock = stock - ? WHERE id = ?`,
                [item.quantity, item.item_id]
            );
        }

        const order = await db.get(`SELECT * FROM orders WHERE id = ?`, [orderResult.lastID]);

        response.status(201).json({
            message: 'Order created successfully',
            order: {
                ...order,
                items: cartItems
            }
        });
    } catch (error) {
        console.error('Error creating order:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /orders - List all orders for user
app.get('/orders', authenticateToken, async (request, response) => {
    const { userId } = request.user;

    try {
        const orders = await db.all(
            `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
            [userId]
        );

        // Get items for each order
        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const items = await db.all(
                    `SELECT ci.*, i.name, i.description
                     FROM cart_items ci
                     JOIN items i ON ci.item_id = i.id
                     WHERE ci.cart_id = ?`,
                    [order.cart_id]
                );
                return { ...order, items };
            })
        );

        response.json({ orders: ordersWithItems });
    } catch (error) {
        console.error('Error fetching orders:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});