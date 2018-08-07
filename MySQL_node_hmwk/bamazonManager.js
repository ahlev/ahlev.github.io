var mySQL = require ("mySQL");
var inquirer = require ("inquirer")

var connection = mySQL.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "plutoSQL123$",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw (err);
    console.log("connected as id " + connection.threadId)
    mainMenu();
});

function mainMenu() {
    console.log(" ");
    inquirer.prompt([{
        type: "list",
        name: "menuchoice",
        message: "Which would you like to do?",
        choices: [
        "View Products for Sale", 
        "View Low Inventory", 
        "Add to Inventory", 
        "Add New Product"]

    }]).then(function(answer) {

        switch (answer.menuchoice) {
            case "View Products for Sale":
                displayProductDetails();
                break;

            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            
            case "Add New Product":
                addNewProduct();
                break;
        }
    });
};

function returnToMenu() {
    console.log(" ")
    inquirer.prompt ([{
        type: "confirm",
        name: "returnToMenu",
        message: "Return to MANAGER menu?"

    }]).then(function(answer) {
            if (answer.returnToMenu) {
                console.log("Returning to main menu...")
                mainMenu()
            } else {
                console.log("\nLogging out of MANAGER mode!")
                console.log("--> Run 'node bamazonManager.js' to re-initiate!")
                connection.end();
            }
        })
    };

function displayProductDetails() {
    connection.query("SELECT * FROM products", function(err, response) {
        if (err) throw err;
        console.log("\n\ ----==== Welcome to BAMAZON shopping ====----")
        console.log("MANAGER MODE --- Inventory Details:: \n" )
    
    for (var i =0; i < response.length; i++) {
        console.log("Item ID: " + response[i].item_id + " ||| Product: " + response[i].product_name + " ||| Department: " + response[i].department_name + " ||| Price: $" + response[i].price + " ||| Stock: " + response[i].stock_quantity);
        }

        returnToMenu(); 
    });
};


function lowInventory() {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5";
    console.log("\n<<--Our stock is LOW for the following items: -->>")
    connection.query(query, function(err, response) {
        if (err) throw err;
        for (var i = 0; i < response.length; i++) {
            console.log("Item ID: " + response[i].item_id + " ||| Product: " + response[i].product_name + " ||| Price: $" + response[i].price + " ||| Stock: " + response[i].stock_quantity);
        }
    console.log ("\nConsider Adding to the Inventory from the MANAGER menu!")
    
        returnToMenu();
      });
    };


function addToInventory() {
    // connection.query("SELECT * FROM products", function (err, response) {
        inquirer.prompt([
            {
            type: "input",
            message: "What item do you want to order more of? (Item ID)",
            name: "itemID"
                },
            {
            type: "input",
            message: "How many do you want to add to our stock?",
            name: "quantity"
            }
        ]) .then(function(answers){
            var i = selectedID - 1;
            var selectedID = answers.itemID;
            var selectedQty = answers.quantity;

        inventoryRefresh(selectedID, selectedQty);
        })
    }

function inventoryRefresh(selectedID, selectedQty) {
        connection.query("SELECT * FROM products WHERE item_id = " + selectedID, function(err, response){
            if (err) throw err;
            var newQty = parseInt(response[0].stock_quantity) + parseInt(selectedQty);

            connection.query("UPDATE products SET ? WHERE ?", [
                    {stock_quantity: newQty},
                    {item_id: selectedID}
                ]), function (err, response) {
                    if (err) throw err;
                }
    
                    console.log("\n ----------------------")
                    console.log("Updating stock totals...")
                    console.log("Added " + selectedQty + " for a new total of ** " + newQty + " ** " + response[0].product_name + " in stock! \n");

                returnToMenu();
            })
        };
    

function addNewProduct() {
    console.log("\nDEVELOPER SAYS: 'This is the only menu item I didn't get working on this assignment. Just ran out of time. :)'")
    returnToMenu();
}