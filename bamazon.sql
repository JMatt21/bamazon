CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR (30),
    price DOUBLE(5,2),
    stock_quantity INT(11),
    PRIMARY KEY (item_id)
);

/* TEST ITEMS */

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Apple', "produce", 0.20, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Chips', "snacks", 6.50, 16);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Milk_Gallon', "produce", 4.00, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Bananas_lb', "produce", 2.15, 90);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Red_Onions_lb', "produce", 3.20, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Tea', "produce", 0.07, 90);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Beer', "alcohol", 8.00, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Bacon_lb', "Deli", 7.13, 91);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Ground_meat_lb', "Deli", 5.10, 88);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Rice_lb', "produce", 0.55, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Cheeze Nips"', "poison", 0.55, 4);

UPDATE products SET stock_quantity = 6400 WHERE product_name = 'apple';
UPDATE products SET stock_quantity = stock_quantity + 5 WHERE product_name = 'apple';

SELECT * FROM products;	