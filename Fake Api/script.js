const apiUrl = "https://api.escuelajs.co/api/v1/products";

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    displayProducts();

    // Handle form submission for adding/updating products
    document.getElementById("productForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("productId").value;
        if (id) {
            updateProduct(id);
        } else {
            addProduct();
        }
    });
});

// Function to fetch and display products
function displayProducts() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}?limit=20&offset=1`, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const products = JSON.parse(xhr.responseText);
            const productTableBody = document.getElementById("productTableBody");
            productTableBody.innerHTML = "";

            products.forEach(product => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.description}</td>
                    <td>
                        <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                `;
                productTableBody.appendChild(row);
            });
        } else {
            alert("Error fetching products.");
        }
    };
    xhr.send();
}

// Function to add a new product
function addProduct() {
    const title = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const description = document.getElementById("productDescription").value;
    const categoryId = parseInt(document.getElementById("productCategoryId").value);
    const images = document.getElementById("productImage").value; // Expecting a string

    const newProduct = {
        title: title,
        price: price,
        description: description,
        categoryId: categoryId,
        images: [images] // Assuming the images field is an array
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", apiUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            alert("Product added successfully!");
            displayProducts();
            document.getElementById("productForm").reset();
        } else {
            alert("Error adding product.");
        }
    };
    xhr.send(JSON.stringify(newProduct));
}

// Function to edit an existing product
function editProduct(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/${id}`, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const product = JSON.parse(xhr.responseText);
            document.getElementById("productId").value = product.id;
            document.getElementById("productName").value = product.title;
            document.getElementById("productPrice").value = product.price;
            document.getElementById("productDescription").value = product.description;
            document.getElementById("productCategoryId").value = product.category.id;
            document.getElementById("productImage").value = product.images[0]; // Assuming a single image
        } else {
            alert("Error fetching product details.");
        }
    };
    xhr.send();
}

// Function to update a product
function updateProduct(id) {
    const title = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const description = document.getElementById("productDescription").value;
    const categoryId = parseInt(document.getElementById("productCategoryId").value);
    const images = document.getElementById("productImage").value;

    const updatedProduct = {
        title: title,
        price: price,
        description: description,
        categoryId: categoryId,
        images: [images] // Assuming the images field is an array
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${apiUrl}/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            alert("Product updated successfully!");
            displayProducts();
            document.getElementById("productForm").reset();
        } else {
            alert("Error updating product.");
        }
    };
    xhr.send(JSON.stringify(updatedProduct));
}

// Function to delete a product
function deleteProduct(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${apiUrl}/${id}`, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            alert("Product deleted successfully!");
            displayProducts();
        } else {
            alert("Error deleting product.");
        }
    };
    xhr.send();
}
