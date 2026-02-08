const items = [
    {
      "name": "Dell XPS 15 Laptop",
      "description": "15.6\" FHD, Intel i7, 16GB RAM, 512GB SSD",
      "price": 1299.99,
      "stock": 15
    },
    {
      "name": "MacBook Air M2",
      "description": "13.6\" Retina, 8GB RAM, 256GB SSD, Space Gray",
      "price": 1199.00,
      "stock": 22
    },
    {
      "name": "iPhone 15 Pro",
      "description": "256GB, Titanium Blue, A17 Pro Chip",
      "price": 999.99,
      "stock": 45
    },
    {
      "name": "Samsung Galaxy S24 Ultra",
      "description": "512GB, Phantom Black, 200MP Camera",
      "price": 1199.99,
      "stock": 38
    },
    {
      "name": "Sony WH-1000XM5",
      "description": "Wireless Noise Cancelling Headphones, Black",
      "price": 399.99,
      "stock": 67
    },
    {
      "name": "Apple Watch Series 9",
      "description": "45mm GPS, Midnight Aluminum Case",
      "price": 429.00,
      "stock": 53
    },
    {
      "name": "iPad Pro 12.9\"",
      "description": "M2 Chip, 256GB, Wi-Fi, Space Gray",
      "price": 1099.00,
      "stock": 28
    },
    {
      "name": "Bose QuietComfort Earbuds II",
      "description": "True Wireless, Noise Cancelling, Triple Black",
      "price": 279.00,
      "stock": 72
    },
    {
      "name": "Logitech MX Master 3S",
      "description": "Wireless Mouse, Graphite, 8K DPI",
      "price": 99.99,
      "stock": 88
    },
    {
      "name": "Keychron K8 Pro",
      "description": "Wireless Mechanical Keyboard, RGB Backlight",
      "price": 109.00,
      "stock": 42
    },
    {
      "name": "Samsung 34\" Odyssey G5",
      "description": "WQHD Curved Gaming Monitor, 165Hz",
      "price": 449.99,
      "stock": 19
    },
    {
      "name": "LG 27\" 4K UHD Monitor",
      "description": "IPS Display, HDR10, USB-C",
      "price": 379.00,
      "stock": 31
    },
    {
      "name": "Canon EOS R6 Mark II",
      "description": "Full Frame Mirrorless Camera, 24.2MP",
      "price": 2499.00,
      "stock": 8
    },
    {
      "name": "Sony A7 IV",
      "description": "33MP Full Frame Mirrorless Camera",
      "price": 2498.00,
      "stock": 12
    },
    {
      "name": "DJI Mini 3 Pro",
      "description": "Foldable Drone, 4K HDR Video, 34 Min Flight",
      "price": 759.00,
      "stock": 25
    },
    {
      "name": "GoPro HERO12 Black",
      "description": "5.3K60 Video, HyperSmooth 6.0",
      "price": 399.99,
      "stock": 56
    },
    {
      "name": "Nike Air Max 270",
      "description": "Men's Running Shoes, Black/White, Size 10",
      "price": 149.99,
      "stock": 64
    },
    {
      "name": "Adidas Ultraboost 22",
      "description": "Women's Running Shoes, Core Black, Size 8",
      "price": 189.99,
      "stock": 48
    },
    {
      "name": "Levi's 501 Original Jeans",
      "description": "Men's Classic Fit, Medium Stonewash, 32x32",
      "price": 69.50,
      "stock": 95
    },
    {
      "name": "The North Face Nuptse Jacket",
      "description": "Men's Insulated Puffer, TNF Black, Size L",
      "price": 299.00,
      "stock": 33
    },
    {
      "name": "Ray-Ban Aviator Classic",
      "description": "Gold Frame, Green Classic G-15 Lens",
      "price": 163.00,
      "stock": 77
    },
    {
      "name": "Fossil Gen 6 Smartwatch",
      "description": "44mm, Smoke Stainless Steel, Wear OS",
      "price": 299.00,
      "stock": 41
    },
    {
      "name": "Garmin Fenix 7",
      "description": "Multisport GPS Watch, Solar Charging",
      "price": 799.99,
      "stock": 16
    },
    {
      "name": "Fitbit Charge 6",
      "description": "Fitness Tracker, Heart Rate Monitor, Obsidian",
      "price": 159.95,
      "stock": 68
    },
    {
      "name": "HP Envy 13",
      "description": "13.3\" FHD, Intel i5, 8GB RAM, 256GB SSD",
      "price": 799.99,
      "stock": 27
    },
    {
      "name": "ASUS ROG Zephyrus G14",
      "description": "14\" QHD, Ryzen 9, RTX 4060, 16GB RAM",
      "price": 1599.99,
      "stock": 14
    },
    {
      "name": "Microsoft Surface Pro 9",
      "description": "13\" Touch, Intel i7, 16GB RAM, 512GB SSD",
      "price": 1599.00,
      "stock": 21
    },
    {
      "name": "Lenovo ThinkPad X1 Carbon",
      "description": "14\" FHD, Intel i7, 16GB RAM, 1TB SSD",
      "price": 1749.00,
      "stock": 18
    },
    {
      "name": "Google Pixel 8 Pro",
      "description": "256GB, Obsidian, Tensor G3 Chip",
      "price": 999.00,
      "stock": 52
    },
    {
      "name": "OnePlus 12",
      "description": "512GB, Flowy Emerald, Snapdragon 8 Gen 3",
      "price": 899.99,
      "stock": 44
    },
    {
      "name": "Xiaomi 14 Pro",
      "description": "512GB, Titanium Black, Leica Camera",
      "price": 849.99,
      "stock": 37
    },
    {
      "name": "Nothing Phone (2)",
      "description": "256GB, Dark Gray, Glyph Interface",
      "price": 699.00,
      "stock": 59
    },
    {
      "name": "AirPods Pro (2nd Gen)",
      "description": "Active Noise Cancellation, MagSafe Charging",
      "price": 249.00,
      "stock": 81
    },
    {
      "name": "Samsung Galaxy Buds2 Pro",
      "description": "True Wireless, Intelligent ANC, Graphite",
      "price": 229.99,
      "stock": 74
    },
    {
      "name": "JBL Flip 6",
      "description": "Portable Bluetooth Speaker, Waterproof, Black",
      "price": 129.95,
      "stock": 92
    },
    {
      "name": "Sonos Beam Gen 2",
      "description": "Compact Smart Soundbar, Dolby Atmos",
      "price": 449.00,
      "stock": 29
    },
    {
      "name": "Roku Streaming Stick 4K",
      "description": "4K HDR Streaming Device, Voice Remote",
      "price": 49.99,
      "stock": 100
    },
    {
      "name": "Amazon Fire TV Stick 4K Max",
      "description": "Wi-Fi 6E, Alexa Voice Remote",
      "price": 59.99,
      "stock": 97
    },
    {
      "name": "Nintendo Switch OLED",
      "description": "7\" OLED Screen, White, 64GB Storage",
      "price": 349.99,
      "stock": 36
    },
    {
      "name": "PlayStation 5 Digital",
      "description": "825GB SSD, 4K Gaming, White Console",
      "price": 449.99,
      "stock": 11
    },
    {
      "name": "Xbox Series X",
      "description": "1TB SSD, 4K 120fps Gaming, Black",
      "price": 499.99,
      "stock": 9
    },
    {
      "name": "Razer BlackWidow V4 Pro",
      "description": "Mechanical Gaming Keyboard, Green Switches",
      "price": 229.99,
      "stock": 35
    },
    // {
    //   "name": "SteelSeries Arctis Nova Pro",
    //   "description": "Wireless Gaming Headset, Multi-System",
    //   "price": 349.99,
    //   "stock": 23
    // },
    // {
    //   "name": "Logitech G Pro X Superlight",
    //   "description": "Wireless Gaming Mouse, 25K DPI, White",
    //   "price": 159.99,
    //   "stock": 61
    // },
    // {
    //   "name": "BenQ Zowie XL2546K",
    //   "description": "24.5\" FHD Gaming Monitor, 240Hz, DyAc+",
    //   "price": 499.00,
    //   "stock": 17
    // },
    // {
    //   "name": "Herman Miller Aeron Chair",
    //   "description": "Ergonomic Office Chair, Size B, Graphite",
    //   "price": 1595.00,
    //   "stock": 7
    // },
    // {
    //   "name": "Secretlab Titan Evo 2022",
    //   "description": "Gaming Chair, NEO Hybrid, Stealth Edition",
    //   "price": 549.00,
    //   "stock": 20
    // },
    // {
    //   "name": "IKEA MARKUS Office Chair",
    //   "description": "High Back, Vissle Dark Gray, Adjustable",
    //   "price": 229.00,
    //   "stock": 54
    // },
    // {
    //   "name": "Autonomous SmartDesk Pro",
    //   "description": "Electric Standing Desk, 53\"x29\", Black",
    //   "price": 499.00,
    //   "stock": 13
    // },
    // {
    //   "name": "Anker PowerCore 26800mAh",
    //   "description": "Portable Charger, 3 USB Ports, Black",
    //   "price": 65.99,
    //   "stock": 86
    // },
    // {
    //   "name": "Belkin 3-in-1 Wireless Charger",
    //   "description": "MagSafe Compatible, iPhone/Watch/AirPods",
    //   "price": 149.99,
    //   "stock": 58
    // },
    // {
    //   "name": "Anker 735 GaNPrime Charger",
    //   "description": "65W 3-Port USB-C Charger, Compact Design",
    //   "price": 59.99,
    //   "stock": 79
    // },
    // {
    //   "name": "Samsung T7 Portable SSD",
    //   "description": "1TB, USB 3.2, up to 1050MB/s, Titan Gray",
    //   "price": 129.99,
    //   "stock": 65
    // },
    // {
    //   "name": "SanDisk Extreme Pro 128GB",
    //   "description": "microSDXC UHS-I Card, 200MB/s Read Speed",
    //   "price": 27.99,
    //   "stock": 100
    // },
    // {
    //   "name": "WD My Passport 4TB",
    //   "description": "Portable External HDD, USB 3.0, Black",
    //   "price": 109.99,
    //   "stock": 47
    // },
    // {
    //   "name": "Seagate Backup Plus 5TB",
    //   "description": "Desktop External HDD, USB 3.0, Black",
    //   "price": 129.99,
    //   "stock": 32
    // },
    // {
    //   "name": "TP-Link Archer AX73",
    //   "description": "AX5400 Wi-Fi 6 Router, Dual Band, 6 Antennas",
    //   "price": 149.99,
    //   "stock": 40
    // },
    // {
    //   "name": "NETGEAR Nighthawk AX12",
    //   "description": "AX6000 Wi-Fi 6 Router, 12-Stream, Black",
    //   "price": 399.99,
    //   "stock": 24
    // },
    // {
    //   "name": "Google Nest WiFi Pro",
    //   "description": "Wi-Fi 6E Mesh System, 3-Pack, Snow",
    //   "price": 399.99,
    //   "stock": 26
    // },
    // {
    //   "name": "Ring Video Doorbell Pro 2",
    //   "description": "1536p HD, 3D Motion Detection, Hardwired",
    //   "price": 249.99,
    //   "stock": 43
    // },
    // {
    //   "name": "Arlo Pro 4 Spotlight Camera",
    //   "description": "2K HDR, Color Night Vision, Wire-Free",
    //   "price": 199.99,
    //   "stock": 51
    // },
    // {
    //   "name": "Nest Learning Thermostat",
    //   "description": "Smart Thermostat, Energy Saving, Stainless Steel",
    //   "price": 249.00,
    //   "stock": 34
    // },
    // {
    //   "name": "Philips Hue White Starter Kit",
    //   "description": "4 Bulbs + Bridge, Smart LED, Bluetooth/Zigbee",
    //   "price": 99.99,
    //   "stock": 70
    // },
    // {
    //   "name": "Amazon Echo Dot (5th Gen)",
    //   "description": "Smart Speaker with Alexa, Charcoal",
    //   "price": 49.99,
    //   "stock": 100
    // },
    // {
    //   "name": "Google Nest Hub (2nd Gen)",
    //   "description": "7\" Smart Display, Chalk, Sleep Sensing",
    //   "price": 99.99,
    //   "stock": 62
    // },
    // {
    //   "name": "Instant Pot Duo Plus 9-in-1",
    //   "description": "6 Quart Electric Pressure Cooker, Stainless",
    //   "price": 119.95,
    //   "stock": 55
    // },
    // {
    //   "name": "Ninja Air Fryer Pro",
    //   "description": "4-in-1, 5 Quart, 400°F, Black/Gray",
    //   "price": 119.99,
    //   "stock": 66
    // },
    // {
    //   "name": "Keurig K-Elite Coffee Maker",
    //   "description": "Single Serve, Iced Coffee, Brushed Slate",
    //   "price": 169.99,
    //   "stock": 49
    // },
    // {
    //   "name": "Breville Barista Express",
    //   "description": "Espresso Machine, Built-in Grinder, Stainless",
    //   "price": 699.95,
    //   "stock": 15
    // },
    // {
    //   "name": "Dyson V15 Detect",
    //   "description": "Cordless Vacuum, Laser Detection, 60 Min Runtime",
    //   "price": 749.99,
    //   "stock": 19
    // },
    // {
    //   "name": "iRobot Roomba j7+",
    //   "description": "Robot Vacuum, Self-Emptying, Smart Mapping",
    //   "price": 799.99,
    //   "stock": 22
    // },
    // {
    //   "name": "Shark Navigator Lift-Away",
    //   "description": "Upright Vacuum, HEPA Filter, Blue",
    //   "price": 199.99,
    //   "stock": 46
    // },
    // {
    //   "name": "Vitamix E310 Explorian",
    //   "description": "Professional Blender, 48oz Container, Black",
    //   "price": 349.95,
    //   "stock": 30
    // },
    // {
    //   "name": "KitchenAid Artisan Stand Mixer",
    //   "description": "5-Quart, Tilt-Head, Empire Red",
    //   "price": 449.99,
    //   "stock": 25
    // },
    // {
    //   "name": "Cuisinart Food Processor",
    //   "description": "14-Cup, 720-Watt, Stainless Steel",
    //   "price": 199.95,
    //   "stock": 39
    // },
    // {
    //   "name": "All-Clad D3 Stainless Cookware Set",
    //   "description": "10-Piece, Tri-Ply, Dishwasher Safe",
    //   "price": 699.95,
    //   "stock": 11
    // },
    // {
    //   "name": "Lodge Cast Iron Skillet",
    //   "description": "12-Inch, Pre-Seasoned, Black",
    //   "price": 39.90,
    //   "stock": 93
    // },
    // {
    //   "name": "Hydro Flask Water Bottle",
    //   "description": "32oz Wide Mouth, Insulated, Pacific",
    //   "price": 44.95,
    //   "stock": 85
    // },
    // {
    //   "name": "YETI Rambler 20oz Tumbler",
    //   "description": "Vacuum Insulated, MagSlider Lid, Black",
    //   "price": 35.00,
    //   "stock": 90
    // },
    // {
    //   "name": "Patagonia Better Sweater",
    //   "description": "Men's Fleece Jacket, Classic Navy, Size M",
    //   "price": 139.00,
    //   "stock": 57
    // },
    // {
    //   "name": "Columbia Heavenly Jacket",
    //   "description": "Women's Hooded Jacket, Thermal Reflective, Black",
    //   "price": 169.99,
    //   "stock": 41
    // },
    // {
    //   "name": "Under Armour Tech 2.0 Tee",
    //   "description": "Men's Short Sleeve, Loose Fit, Black, Size L",
    //   "price": 24.99,
    //   "stock": 100
    // },
    // {
    //   "name": "Lululemon Align Leggings",
    //   "description": "Women's High-Rise, 25\", True Navy, Size 6",
    //   "price": 98.00,
    //   "stock": 73
    // },
    // {
    //   "name": "Champion Reverse Weave Hoodie",
    //   "description": "Unisex Pullover, Heavyweight, Oxford Gray, L",
    //   "price": 60.00,
    //   "stock": 69
    // },
    // {
    //   "name": "Carhartt Duck Detroit Jacket",
    //   "description": "Men's Work Jacket, Blanket Lined, Brown, XL",
    //   "price": 129.99,
    //   "stock": 38
    // },
    // {
    //   "name": "Timberland 6-Inch Premium Boots",
    //   "description": "Men's Waterproof Boots, Wheat Nubuck, Size 10",
    //   "price": 198.00,
    //   "stock": 50
    // },
    // {
    //   "name": "UGG Classic Short II Boots",
    //   "description": "Women's Sheepskin Boots, Chestnut, Size 8",
    //   "price": 169.95,
    //   "stock": 60
    // },
    // {
    //   "name": "Vans Old Skool Sneakers",
    //   "description": "Unisex Canvas Shoes, Black/White, Size 9",
    //   "price": 65.00,
    //   "stock": 87
    // },
    // {
    //   "name": "Converse Chuck Taylor All Star",
    //   "description": "High Top Sneakers, Classic Black, Size 10",
    //   "price": 60.00,
    //   "stock": 94
    // },
    // {
    //   "name": "New Balance 574 Core",
    //   "description": "Men's Running Shoes, Navy/Red, Size 11",
    //   "price": 84.99,
    //   "stock": 76
    // },
    // {
    //   "name": "ASICS Gel-Kayano 29",
    //   "description": "Women's Running Shoes, Black/Pink, Size 7.5",
    //   "price": 159.95,
    //   "stock": 45
    // },
    // {
    //   "name": "Birkenstock Arizona Sandals",
    //   "description": "Unisex Cork Footbed, Taupe Suede, Size 9",
    //   "price": 135.00,
    //   "stock": 63
    // },
    // {
    //   "name": "Crocs Classic Clog",
    //   "description": "Unisex Comfort Shoes, Black, Size 8",
    //   "price": 49.99,
    //   "stock": 98
    // },
    // {
    //   "name": "Herschel Little America Backpack",
    //   "description": "25L Laptop Backpack, Black Crosshatch",
    //   "price": 99.99,
    //   "stock": 71
    // },
    // {
    //   "name": "Fjallraven Kanken Backpack",
    //   "description": "16L Classic Daypack, Frost Green",
    //   "price": 85.00,
    //   "stock": 80
    // },
    // {
    //   "name": "Osprey Daylite Plus",
    //   "description": "20L Daypack, Black, Laptop Sleeve",
    //   "price": 75.00,
    //   "stock": 56
    // },
    // {
    //   "name": "Tumi Alpha 3 Brief Pack",
    //   "description": "Business Backpack, Leather Trim, Black",
    //   "price": 495.00,
    //   "stock": 6
    // },
    // {
    //   "name": "Samsonite Omni PC Hardside",
    //   "description": "20\" Carry-On Luggage, Spinner, Caribbean Blue",
    //   "price": 139.99,
    //   "stock": 28
    // },
    // {
    //   "name": "Away The Carry-On",
    //   "description": "22\" Hardside Suitcase, Built-in Battery, Black",
    //   "price": 275.00,
    //   "stock": 21
    // }
  ];

  module.exports = { items };