CREATE DATABASE ums;

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TYPE device_type AS ENUM('ios', 'android');

CREATE TABLE user_device(
    id SERIAL NOT NULL,
    device_type "device_type",
    device_model TEXT,
    user_agent TEXT,
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);


ALTER TABLE user_device ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id);



CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR NOT NULL
);

CREATE TABLE subcategories (
    id SERIAL PRIMARY KEY,
    subcategory_name VARCHAR NOT NULL,
    category_id INT REFERENCES categories(id)
);


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title TEXT,
    price TEXT NOT NULL,
    subcategory_id INT REFERENCES subcategories(id)
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    users_id INT,
    product_id INT
);


ALTER TABLE products
  ADD created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


ALTER TABLE products
  ADD user_id INT REFERENCES users(id);


ALTER TABLE products DROP COLUMN user_id;

-- Insert categories
INSERT INTO categories (category_name) VALUES ('Books'), ('Smartphone');

-- Insert subcategories
INSERT INTO subcategories (subcategory_name, category_id) VALUES('Samsung', 2), ('Flip', 2), ('Nokia', 2), ('Motorola', 2);

-- Insert products
INSERT INTO products (title, price, subcategory_id, user_id) VALUES ('Molxona', '1 000 000', 9, 19);

ALTER TABLE products RENAME COLUMN VALUES user_id TO 20;

INSERT INTO products (title, price, subcategory_id, user_id)
VALUES ('iPhone 15 Pro X Max', '2000', 2, 19),
('Samsung Galaxy S21 Ultra', '1,199', 8, 20),
('Samsung Galaxy S21', '999', 8, 22),
('Samsung Galaxy Note 20 Ultra', '1,099', 8, 21),
('Samsung Galaxy S20+', '1,199', 8, 23),
('Samsung Galaxy Z Fold 2', '1,999', 8, 25),
('Samsung Galaxy A52', '499', 8, 24),
('Samsung Galaxy A71', '599', 8, 26),
('iPhone 13 Pro Max', '1,099', 2, 29),
('iPhone SE (1st Generation)', '399', 2, 29);




SELECT * FROM subcategories;


SELECT categories.id, category_name, subcategory_name
FROM subcategories
INNER JOIN categories ON subcategories.category_id = categories.id;



SELECT
    p.title AS product_title,
    p.price AS product_price,
    s.subcategory_name,
    c.category_name,
    u.username
FROM products p
INNER JOIN subcategories s ON p.subcategory_id = s.id
LEFT JOIN categories c ON s.category_id = c.id
RIGHT JOIN users u ON p.user_id = u.id; 



SELECT * FROM products WHERE title ILIKE $3 OFFSET $1 LIMIT $2

