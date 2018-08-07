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

    displayProducts();
});


function displayProducts() {
    connection.query("SELECT * FROM products", function(err, response) {
        if (err) throw err;
        console.log("\n\ ----==== Welcome to BAMAZON shopping ====----")
        console.log("Here's what we currently have available: \n" )
    
    for (var i =0; i < response.length; i++) {
        console.log("Item ID: " + response[i].item_id + " || Product: " + response[i].product_name + " || Department: " + response[i].department_name + " || Price: $" + response[i].price + " || Stock: " + response[i].stock_quantity);
        }
    
    startShopping();
    });
};

function startShopping() {
    console.log(" ");
    inquirer.prompt([
        {
        type: "input",
        name: "ID",
        message: "^^^ What is the ID of the item you want to buy?"
    },
        {
        type: "input",
        name: "quantity",
        message: "How many (#) do you want?"
        }
    ]).then(function(answers){
        var selectedID = answers.ID;
        var selectedQuantity = answers.quantity;

        checkOut(selectedID, selectedQuantity);
    })
}

function checkOut(selectedID, selectedQuantity) {
    connection.query("SELECT * FROM products WHERE item_id = " + selectedID, function(err, response){
        if (err) throw err;
        
        if (parseInt(selectedQuantity) <= response[0].stock_quantity) {
            var newQuantity = response[0].stock_quantity - selectedQuantity;

            connection.query("UPDATE products SET ? WHERE ?", [
                {stock_quantity: newQuantity},
                {item_id: selectedID}
            ]), function(err, response) {
                    if (err) throw err;
            }

            console.log("\n ----------------------")
            console.log("We have what you need!")
            var totalCost = selectedQuantity * response[0].price;
            console.log("Your total for " + response[0].product_name + " x" + selectedQuantity + " is  ** $" + totalCost + " **" + "\n");
            
        } else {
            console.log(" \n ----------------------")
            console.log("Apologies... we don't have enough " + response[0].product_name + " to fill your order. \n")
        }

        inquirer.prompt ([{
            type: "confirm",
            name: "keepShopping",
            message: "Continue shopping?"

        }]).then(function(answer) {
                if (answer.keepShopping) {
                    displayProducts();
                } else {
                    console.log("\n Thanks for shopping with BAMAZON!")
                    connection.end();
                }
            })
        })
    };


// id , name , prices