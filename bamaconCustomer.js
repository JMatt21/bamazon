const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Du@F!dgg",
    database: "bamazon_db"
});

function updateProducts(item, amount_purchased){
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: item.quantity - amount_purchased
                // stock_quantity: 100
            },
            {
                product_name: item.name
                // product_name: 'apple'
            }
        ], (err, res) => {
            if (err) throw err;
            // console.log(res.affectedRows + " products updated!\n");
            console.log("Your purchase of " + item.name + ' will cost: ' + item.price * amount_purchased);
            // End the connection here and not in the startup connection 
            // Since javascript is asyncronous
            connection.end();
        });
}

function displayAndPrompt(){
    const items = [];
    connection.query('SELECT * FROM products', (err, res) => {

        // push all items into an array so that we can use one of the items later
        // because 'inquirer' only stores strings and not any hidden data
        // we will store the name, price, and stock_quantity of the item
        for (product of res) {
            items.push({ name: product.product_name, price: product.price, quantity: product.stock_quantity });
        }


        inquirer.prompt([
            {
                type: 'list',
                message: 'Please choose an item to purchase',
                choices: items,
                name: 'name'
            },
            {
                type: 'text',
                message: 'How many would you like to order?',
                name: 'quantity'
            }
        ]).then((item) => {
            const quantity = parseInt(item.quantity);
            const foundItem = items.find((e) => { return e.name == item.name });

            if (typeof quantity === 'number' && quantity <= foundItem.quantity) {
                updateProducts(foundItem, quantity);
            } else {
                console.log('Invalid Quantity!');
            }
        });
        
    });
}

// Startup
connection.connect((err) => {
    if (err) throw (err);
    displayAndPrompt();
})