

const { items } = require('./itemsData');

const seedItems = async (db) => {
    try {
        console.log('🌱 Starting items seeding process...');

        // Check if items already exist
        const existingItemsCount = await db.get(
            `SELECT COUNT(*) as count FROM items`
        );

        if (existingItemsCount.count > 0) {
            console.log(`✓ Items table already contains ${existingItemsCount.count} items. Skipping seed.`);
            return {
                success: true,
                inserted: 0,
                skipped: existingItemsCount.count,
                message: 'Items already seeded'
            };
        }

        // Begin transaction for atomic insertion
        await db.exec('BEGIN TRANSACTION');

        let insertedCount = 0;
        let skippedCount = 0;

        const insertQuery = `
            INSERT INTO items (name, description, price, stock, created_at)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        `;

        for (const item of items) {
            try {
                // Validate item data
                if (!item.name || item.price === undefined) {
                    console.warn(`⚠ Skipping invalid item: ${JSON.stringify(item)}`);
                    skippedCount++;
                    continue;
                }

                // Check if item with same name already exists
                const existingItem = await db.get(
                    `SELECT id FROM items WHERE name = ?`,
                    [item.name]
                );

                if (existingItem) {
                    skippedCount++;
                    continue;
                }

                // Insert the item
                await db.run(insertQuery, [
                    item.name,
                    item.description || null,
                    item.price,
                    item.stock || 0
                ]);

                insertedCount++;
            } catch (itemError) {
                console.error(`✗ Error inserting item "${item.name}":`, itemError.message);
                skippedCount++;
            }
        }

        // Commit transaction
        await db.exec('COMMIT');

        console.log(`✓ Seeding completed successfully!`);
        console.log(`  - Inserted: ${insertedCount} items`);
        console.log(`  - Skipped: ${skippedCount} items`);

        return {
            success: true,
            inserted: insertedCount,
            skipped: skippedCount,
            message: 'Seeding completed successfully'
        };

    } catch (error) {
        // Rollback on error
        await db.exec('ROLLBACK');
        console.error('✗ Seeding failed:', error.message);
        
        return {
            success: false,
            inserted: 0,
            skipped: 0,
            error: error.message
        };
    }
};

module.exports = {
    seedItems
};