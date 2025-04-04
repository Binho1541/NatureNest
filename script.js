function searchProducts() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let productItems = document.getElementsByClassName('product-item');

    for (let i = 0; i < productItems.length; i++) {
        let product = productItems[i];
        if (product.innerText.toLowerCase().includes(input)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    }
}

let cart = [];

function addToCart(id, name, price) {
    // Check if item already exists in the cart
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if the product is already in the cart
    } else {
        // Add new product to the cart
        cart.push({ id, name, price, quantity: 1 });
    }

    // Update the cart display
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalAmount = document.getElementById('total-amount');
    let cartHTML = '';
    let total = 0;

    cart.forEach(item => {
        cartHTML += '<li>${item.name} x ${item.quantity} - $${item.price * item.quantity}</li>';
        total += item.price * item.quantity;
    });

    cartList.innerHTML = cartHTML;
    totalAmount.textContent = 'Total: $${total.toFixed(2)}';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    window.location.href = 'checkout.html'; // Redirect to checkout page
}