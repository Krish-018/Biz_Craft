-- BizCraft Database Schema
-- MySQL 8.0+

CREATE DATABASE IF NOT EXISTS bizcraft_db;
USE bizcraft_db;

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- ============================================
-- GUIDES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS guides (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    long_description TEXT,
    category VARCHAR(100),
    type VARCHAR(50),
    format VARCHAR(20),
    read_time VARCHAR(20),
    rating DECIMAL(3,2) DEFAULT 0,
    difficulty VARCHAR(20),
    downloads INT DEFAULT 0,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    bookmarks INT DEFAULT 0,
    shares INT DEFAULT 0,
    author VARCHAR(100),
    author_role VARCHAR(100),
    author_bio TEXT,
    author_avatar VARCHAR(500),
    published_date DATE,
    last_updated DATE,
    pages INT,
    language VARCHAR(50) DEFAULT 'English',
    featured BOOLEAN DEFAULT FALSE,
    popular BOOLEAN DEFAULT FALSE,
    trending BOOLEAN DEFAULT FALSE,
    cover_image VARCHAR(500),
    thumbnail VARCHAR(500),
    tags JSON,
    includes JSON,
    learning_objectives JSON,
    table_of_contents JSON,
    related_ids JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_rating (rating),
    INDEX idx_featured (featured),
    FULLTEXT INDEX idx_search (title, description)
);

-- ============================================
-- SUPPLIERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    sub_category VARCHAR(100),
    location VARCHAR(200),
    country VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    products INT DEFAULT 0,
    description TEXT,
    long_description TEXT,
    website VARCHAR(255),
    email VARCHAR(100),
    phone VARCHAR(50),
    address TEXT,
    founded VARCHAR(10),
    employees VARCHAR(50),
    delivery_time VARCHAR(50),
    payment_terms VARCHAR(50),
    min_order VARCHAR(50),
    return_policy VARCHAR(100),
    success_rate DECIMAL(5,2),
    total_orders INT,
    response_time VARCHAR(50),
    languages JSON,
    certifications JSON,
    tags JSON,
    reviews JSON,
    cover_image VARCHAR(500),
    image VARCHAR(500),
    color VARCHAR(50),
    featured BOOLEAN DEFAULT FALSE,
    trending BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_verified (verified),
    INDEX idx_rating (rating)
);

-- ============================================
-- TOOLS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS tools (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    long_description TEXT,
    category VARCHAR(100),
    sub_category VARCHAR(100),
    icon VARCHAR(50),
    color VARCHAR(50),
    rating DECIMAL(3,2) DEFAULT 0,
    users INT DEFAULT 0,
    downloads INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    popular BOOLEAN DEFAULT FALSE,
    tags JSON,
    features JSON,
    setup JSON,
    screenshots JSON,
    last_updated DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_rating (rating)
);

-- ============================================
-- CALCULATORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS calculators (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    short_name VARCHAR(100),
    description TEXT,
    long_description TEXT,
    category VARCHAR(100),
    icon VARCHAR(50),
    color VARCHAR(50),
    uses INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    popular BOOLEAN DEFAULT FALSE,
    tags JSON,
    inputs JSON,
    formula TEXT,
    last_updated DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_popular (popular)
);

-- ============================================
-- BOOKMARKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookmarks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    item_type ENUM('guide', 'supplier', 'tool', 'calculator') NOT NULL,
    item_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_bookmark (user_id, item_type, item_id),
    INDEX idx_user (user_id),
    INDEX idx_item (item_type, item_id)
);

-- ============================================
-- USER ACTIVITY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_activity (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    activity_type VARCHAR(50),
    item_type VARCHAR(50),
    item_id INT,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_created (created_at)
);

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Demo user (password: demo123)
INSERT INTO users (name, email, password, role) VALUES 
('Demo User', 'demo@bizcraft.com', '\\\.Mr4qZq7JqX8qX8qX8qX8qX8qX8qX8q', 'user');

-- Sample guides
INSERT INTO guides (title, subtitle, description, category, type, read_time, rating, difficulty, author, published_date, featured, popular, trending) VALUES
('The Complete Guide to Starting a Bakery Business', 'From Home Baker to Bakery Owner', 'A step-by-step guide to launching and growing a successful bakery business.', 'Food Business', 'PDF Guide', '45 min', 4.9, 'Beginner', 'Chef Marie Dubois', '2024-01-15', TRUE, TRUE, TRUE),
('Coffee Shop Success: From Beans to Business', 'The Ultimate Guide to Opening a Profitable Cafe', 'Everything you need to know about starting and running a successful coffee shop.', 'Food Business', 'PDF Guide', '55 min', 4.8, 'Beginner', 'James Hoffman', '2024-02-10', TRUE, TRUE, FALSE),
('The Ultimate Pizza Restaurant Business Guide', 'From Neapolitan to New York Style', 'Complete guide to opening and running a successful pizzeria.', 'Food Business', 'PDF Guide', '65 min', 4.9, 'Intermediate', 'Tony Gemignani', '2024-01-30', TRUE, TRUE, TRUE);

-- Sample suppliers
INSERT INTO suppliers (name, category, location, rating, verified, products, description, website, email, phone, featured, trending) VALUES
('ABC Corporation', 'Electronics', 'New York, NY', 4.8, TRUE, 245, 'Leading supplier of electronic components and devices', 'www.abccorp.com', 'contact@abccorp.com', '+1 (212) 555-0123', TRUE, TRUE),
('XYZ Industries', 'Raw Materials', 'Los Angeles, CA', 4.6, TRUE, 189, 'Premium raw materials for manufacturing', 'www.xyzindustries.com', 'sales@xyzindustries.com', '+1 (213) 555-0456', FALSE, TRUE),
('Global Traders', 'Import/Export', 'Chicago, IL', 4.5, TRUE, 567, 'International trading and logistics', 'www.globaltraders.com', 'info@globaltraders.com', '+1 (312) 555-0789', TRUE, FALSE);

-- Sample calculators
INSERT INTO calculators (id, name, description, category, icon, color, uses, rating, featured, popular) VALUES
('profit-margin', 'Profit Margin Calculator', 'Calculate profit margins, markup, and optimal pricing', 'finance', 'DollarSign', 'green', 15234, 4.9, TRUE, TRUE),
('loan-emi', 'Loan EMI Calculator', 'Calculate EMI, total interest, and loan repayment schedules', 'finance', 'CreditCard', 'blue', 12345, 4.8, TRUE, TRUE),
('gst-calculator', 'GST Calculator', 'Calculate GST for invoices, tax returns, and pricing', 'tax', 'Percent', 'purple', 9876, 4.7, FALSE, TRUE),
('roi-calculator', 'ROI Calculator', 'Calculate return on investment for business decisions', 'finance', 'TrendingUp', 'orange', 8765, 4.8, TRUE, TRUE),
('break-even', 'Break-Even Analyzer', 'Find your break-even point and profitability threshold', 'finance', 'BarChart3', 'red', 6543, 4.6, FALSE, FALSE),
('compound-interest', 'Compound Interest Calculator', 'Calculate compound interest for investments', 'investment', 'PiggyBank', 'emerald', 7654, 4.8, FALSE, FALSE);

-- Sample tools
INSERT INTO tools (name, description, category, icon, color, rating, users, downloads, featured, popular) VALUES
('ROI Calculator', 'Calculate return on investment', 'Calculator', 'Calculator', 'purple', 4.9, 8765, 12345, TRUE, TRUE),
('Supplier Comparison Tool', 'Compare suppliers side by side', 'Supplier', 'Truck', 'blue', 4.7, 5432, 8765, FALSE, TRUE),
('Profit Analyzer', 'Analyze business profitability', 'Analytics', 'BarChart3', 'green', 4.8, 9876, 15432, TRUE, TRUE);

SELECT 'Database setup complete!' as Status;
SELECT COUNT(*) as Total_Users FROM users;
SELECT COUNT(*) as Total_Guides FROM guides;
SELECT COUNT(*) as Total_Suppliers FROM suppliers;
