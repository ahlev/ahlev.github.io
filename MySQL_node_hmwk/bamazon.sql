-- Drops the bamazon DB if it already exists --
DROP DATABASE IF EXISTS bamazon;
-- Create a database called bamazon --
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50),
  department_name VARCHAR (50),
  price FLOAT (10,2),
  stock_quantity INTEGER(11)

  PRIMARY KEY (item_id)
);

-- Creates new rows
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paper Towels (8-pack)", "Household", 12.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Light Bulbs (2-pack)", "Household", 5.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AAA Batteries (12-pack)", "Electronics", 8.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Computer Mouse (wireless)", "Electronics", 20.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Treats (Box of 100)", "Pet Supplies", 10.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Catnip Toy", "Pet Supplies", 2.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Doritos (Family Size)", "Grocery", 4.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mountain Dew (2-Liter)", "Grocery", 2.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee (1-lb Ground)", "Grocery", 8.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Creamer", "Grocery", 4.00, 20);