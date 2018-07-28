const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Du@F!dgg",
    database: "bamazon_db"
});

function viewProducts() {
    connection.query('SELECT * FROM products', (err, res) => {
        for (product of res) {
            console.log(product.product_name + ' ID:' + product.item_id + ' PRICE:$' + product.price + ' STOCK_QUANTITY:' + product.stock_quantity + ' DEPARTMENT:' + product.department_name + '\n');
        }
        userPrompt();
    });
}

function viewLowInventory(lowMargin) {
    connection.query('SELECT * FROM products WHERE stock_quantity <= ?', [lowMargin], (err, res) => {
        for (product of res) {
            console.log(product.product_name + ' ID:' + product.item_id + ' PRICE:$' + product.price + ' STOCK_QUANTITY:' + product.stock_quantity + ' DEPARTMENT:' + product.department + '\n');
        }
        userPrompt();
    });
}

function addToInventory() {
    inquirer.prompt([
        {
            type: 'text',
            message: 'Which product do you want to add to?',
            name: 'name'
        },
        {
            type: 'number',
            message: 'How much do you want to add to the inventory?',
            name: 'amount'
        }
    ]).then((added) => {
        connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE ?',
            [added.amount, { product_name: added.name }],
            (err, res) => {
                if (err) throw err;
            });
        userPrompt();
    });

}

function addNewProduct(name, department, price, stock) {

    inquirer.prompt([
        {
            type: 'text',
            message: 'What is the name of the new product?',
            name: 'name'
        },
        {
            type: 'text',
            message: 'What is the department of the new product?',
            name: 'department'
        },
        {
            type: 'number',
            message: 'What is the price of the new product?',
            name: 'price'
        },
        {
            type: 'number',
            message: 'How much stock do we currently have of the new product?',
            name: 'stock'
        }
    ]).then((newProduct) => {
        connection.query('INSERT INTO products SET ?',
            {
                product_name: newProduct.name,
                department_name: newProduct.department,
                price: newProduct.price,
                stock_quantity: newProduct.stock,
            }, (err, res) => {
                if (err) throw err;
            });
        userPrompt();
    });
}

function userPrompt() {
    inquirer.prompt(
        {
            type: 'list',
            message: 'Choose One:',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            name: 'option'
        }
    ).then((menu) => {
        switch (menu.option) {
            case 'View Products for Sale': viewProducts();
                break;
            case 'View Low Inventory': viewLowInventory(5);
                break;
            case 'Add to Inventory': addToInventory();
                break;
            case 'Add New Product': addNewProduct();
                break;
        }
    });
}
connection.connect((err) => {
    if (err) throw err;

    // viewProducts();
    // viewLowInventory(300);
    // addToInventory('apple', 5);
    // addNewProduct('carrot', 'produce', .25, 200);
    // connection.end();
    userPrompt();

})



