// Retrieve products from localStorage or initialize an empty array
let products = JSON.parse(localStorage.getItem('products')) || [];

// Function to add a new product
function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;

    // Check if both fields (name and price) are provided
    if (!productName || !productPrice) {
        alert('Please enter both product name and price');
        return;
    }

    // Create a new product object
    const newProduct = {
        id: Date.now(), // Unique ID based on current timestamp
        name: productName,
        price: parseFloat(productPrice)
    };

    // Add the new product to the array
    products.push(newProduct);

    // Update the products list in localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Reset input fields
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';

    // Display the updated product list
    displayProducts();
}

// Function to display all products
function displayProducts() {
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = ''; // Clear the current table

    // Loop through products and create table rows for each
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productTableBody.appendChild(row); // Append row to the table body
    });
}

// Function to edit a product
function editProduct(productId) {
    const product = products.find(p => p.id === productId); // Find the product by ID
    if (product) {
        const newName = prompt('Enter new name:', product.name); // Prompt for new name
        const newPrice = prompt('Enter new price:', product.price); // Prompt for new price

        // Check if both name and price are updated
        if (newName && newPrice) {
            product.name = newName;
            product.price = parseFloat(newPrice); // Update product details

            // Update localStorage with the edited product list
            localStorage.setItem('products', JSON.stringify(products));

            // Refresh the product list on the page
            displayProducts();
        }
    }
}

// Function to delete a product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        // Filter out the product with the given ID
        products = products.filter(product => product.id !== productId);

        // Update localStorage with the remaining products
        localStorage.setItem('products', JSON.stringify(products));

        // Refresh the product list on the page
        displayProducts();
    }
}

// Display the products when the page loads
document.addEventListener('DOMContentLoaded', displayProducts);
