// Function to fetch products from JSON file
function fetchProducts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'products.json', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const products = JSON.parse(this.responseText);
            displayProducts(products);
        }
    };
    xhr.send();
}

// Function to display products in the table
function displayProducts(products) {
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>
                <button onclick="editProduct(${product.id})" class="btn-edit">Edit</button>
                <button onclick="deleteProduct(${product.id})" class="btn-delete">Delete</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });
}

// Function to handle form submission for add/update
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'products.json', true);
    xhr.onload = function() {
        if (this.status === 200) {
            let products = JSON.parse(this.responseText);
            if (id) {
                // Update existing product
                const productIndex = products.findIndex(product => product.id === parseInt(id));
                products[productIndex].name = name;
                products[productIndex].price = price;
            } else {
                // Create new product
                const newProduct = { id: Date.now(), name, price };
                products.push(newProduct);
            }
            // Update JSON file (this won't work in a real scenario without a server)
            console.log('Updated products:', products);
            alert('Product saved successfully!');
            clearForm();
            displayProducts(products);
        }
    };
    xhr.send();
});

// Function to edit a product
function editProduct(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'products.json', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const products = JSON.parse(this.responseText);
            const product = products.find(p => p.id === id);
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
        }
    };
    xhr.send();
}

// Function to delete a product
function deleteProduct(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'products.json', true);
    xhr.onload = function() {
        if (this.status === 200) {
            let products = JSON.parse(this.responseText);
            products = products.filter(product => product.id !== id);
            // Update JSON file (this won't work in a real scenario without a server)
            console.log('Updated products:', products);
            alert('Product deleted successfully!');
            displayProducts(products);
        }
    };
    xhr.send();
}

// Function to clear form inputs
function clearForm() {
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
}

// Fetch products on page load
fetchProducts();
