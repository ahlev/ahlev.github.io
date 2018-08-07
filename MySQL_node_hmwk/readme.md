#HOMEWORK 12 OVERVIEW--

This repository contains homework assignment 12 (MySQL + node.js) from the Georgia Tech Coding Bootcamp.

File **bamazon.sql** was used to create and populate a database containing a table called 'products' (using MySQL Workbench) . The bamazon.sql file also defines the unique schema of that table.

**For a working demonstration of the application**, please see **BamazonDemo_AlexLevitt.mp4** within the repository.
[NOTE: audio is a bit fuzzy and loud -- suggest turning system volume to ~50% before playing. Thanks. :)]


###CUSTOMER INTERFACE
Running node (with the proper npm installations, per the package.json file) on **bamazonCustomer.js** enters a command line storefront, with 10 items available at different prices and different quantities. The user may choose to buy a product (by item_ID) and specify the quantity (stock_quantity).

- If the Bamazon storefront has enough (stock_quantity) to fulfill the user's order, the sale is confirmed and the price total for the order is presented. The database is updated to reflect new quantity totals.
- The user is prompted (after any action) whether or not they wish to return to the main storefront. If they choose no, the customer is "logged out" and the connection terminates.


###MANAGER INTERFACE
Running node (with the proper npm installations, per the package.json file) on **bamazonManager.js** presents the manager menu, where managers are given 4 main menu options. They can View Products for Sale, View Low Inventory, Add to Inventory, or Add New Product. These options all function properly except for Add New Product, simply because I ran out of time on this assignment.

- After any of these menu actions are taken (some ask subsequent prompts to specify more details for the action), the manager is prompted to confirm whether or not (Y/N) to return back to that initial Manager menu. 
- The data in table 'products' within the database updates when Add to Inventory is successfully completed. The application interface specifies the new total when inventory is added, and changes are visible within the data when View Products for Sale is subsequently chosen.
- If the user selects N, the manager is "logged out" and the connection terminates.



