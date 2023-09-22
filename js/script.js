/* 
Author: Rabius Sani
Date: April 6, 2023
Description: This JavaScript file includes functions for rendering products, adding and removing products from the cart, and updating the cart display. It also includes event handlers for the "Add to Cart", "Checkout", and "Cart" buttons.
Copyright: © 2023 Rabius Sani. All rights reserved.
*/


const products = [
    { name: 'Apple', price: 120, image: 'img/Apple.jpg' },
    { name: 'Orange', price: 250, image: 'img/Orange.jpg' },
    { name: 'Banana', price: 120, image: 'img/Banana.jpg' },
    { name: 'Pear', price: 300, image: 'img/Pear.jpg' },
    { name: 'Peach', price: 280, image: 'img/Peach.jpg' },
    { name: 'Plum', price: 160, image: 'img/Plum.jpg' },
];

const cart = {};

function renderProducts() {
    const productsDiv = document.getElementById('products');
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'border p-4 shadow-lg';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover mb-4">
            <h2 class="font-bold mb-2">${product.name}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${index})" class="mt-2 bg-green-500 text-white px-4 py-1 rounded">Add to Cart</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}

function addToCart(index) {
    const product = products[index];
    if (cart[product.name]) {
        cart[product.name].quantity += 1;
    } else {
        cart[product.name] = { ...product, quantity: 1 };
    }
    renderCart('cart'); 
    renderCart('cart-modal-content'); 
}

function removeFromCart(name) {
    if (cart[name].quantity > 1) {
        cart[name].quantity -= 1;
    } else {
        delete cart[name];
    }
    renderCart('cart'); 
    renderCart('cart-modal-content'); 
}


function renderCart(id) {
    const cartDiv = document.getElementById(id);
    cartDiv.innerHTML = '';
    let total = 0;
    Object.values(cart).forEach((item) => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'border p-4 mb-2 shadow-lg flex justify-between items-center';
        itemDiv.innerHTML = `
            <span>${item.name} - BDT${item.price.toFixed(2)} x ${item.quantity}</span>
            <div>
                <button onclick="removeFromCart('${item.name}')" class="border px-4 py-1 rounded border-red-500">-</button>
                <button onclick="addToCart(${products.findIndex(product => product.name === item.name)})" class="border px-4 py-1 rounded border-green-500">+</button>
            </div>
        `;
        cartDiv.appendChild(itemDiv);
    });
    
    const totalDiv = document.createElement('div');
    totalDiv.className = 'font-bold';
    totalDiv.innerText = `Total: BDT${total.toFixed(2)}`;
    
    cartDiv.appendChild(totalDiv);
}


function renderProducts() {
    const productsDiv = document.getElementById('products');
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'border p-4 shadow-lg';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover mb-4">
            <h2 class="font-bold mb-2">${product.name}</h2>
            <p>BDT${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${index})" class="mt-2 bg-green-500 text-white px-4 py-1 rounded">Add to Cart</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}
// cart modal 
function openCart() {
    renderCart('cart-modal-content'); 
    document.getElementById('cart-modal').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// toggle menu 
document.querySelector('[data-collapse-toggle="navbar-sticky"]').addEventListener('click', function() {
    document.getElementById('navbar-sticky').classList.toggle('hidden');
});
// alert modal section
function openSuccessModal(message) {
    document.getElementById('success-message').innerText = message;
    document.getElementById('success-modal').style.display = 'flex';
}

function closeSuccessModal() {
    document.getElementById('success-modal').style.display = 'none';
}
document.getElementById('checkout-cart').addEventListener('click', function() {
    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty!');
    } else {
        openSuccessModal("You've successfully checked out! Happy shopping!");
    }
});

document.getElementById('checkout-modal').addEventListener('click', function() {
    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty!');
    } else {
        openSuccessModal("You've successfully checked out! Happy shopping!");
    }
});



renderProducts();