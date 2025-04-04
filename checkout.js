document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutTable = document.querySelector("#checkout-items tbody");
    const totalPriceElement = document.getElementById("total-price");
    const paymentDetailsDiv = document.getElementById("payment-details");

    let total = 0;

    function displayCheckoutItems() {
        checkoutTable.innerHTML = "";
        cart.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            checkoutTable.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toFixed(2);
    }

    displayCheckoutItems();

    // Handle Payment Method Selection
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener("change", function () {
            showPaymentFields(this.value);
        });
    });

    function showPaymentFields(method) {
        paymentDetailsDiv.innerHTML = ""; // Clear previous fields

        if (method === "mobile-money") {
            paymentDetailsDiv.innerHTML = `
                <label for="mobile-number">Mobile Money Number:</label>
                <input type="text" id="mobile-number" required placeholder="Enter Mobile Money Number">
                <label for="network">Network Provider:</label>
                <select id="network" required>
                    <option value="MTN">MTN</option>
                    <option value="Vodafone">Vodafone</option>
                    <option value="AirtelTigo">AirtelTigo</option>
                </select>
            `;
        } else if (method === "card") {
            paymentDetailsDiv.innerHTML = `
                <label for="card-number">Card Number:</label>
                <input type="text" id="card-number" required placeholder="Enter Card Number">
                <label for="expiry-date">Expiry Date:</label>
                <input type="month" id="expiry-date" required>
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" required placeholder="CVV">
            `;
        } else if (method === "paypal") {
            paymentDetailsDiv.innerHTML = `
                <label for="paypal-email">PayPal Email:</label>
                <input type="email" id="paypal-email" required placeholder="Enter PayPal Email">
            `;
        }
    }

    // Handle Payment Submission
    document.getElementById("payment-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

        if (!name || !address) {
            alert("Please fill in all required fields.");
            return;
        }

        let paymentInfo = {};
        if (paymentMethod === "mobile-money") {
            paymentInfo.number = document.getElementById("mobile-number").value.trim();
            paymentInfo.network = document.getElementById("network").value;
            if (!paymentInfo.number) {
                alert("Please enter a valid Mobile Money number.");
                return;
            }
        } else if (paymentMethod === "card") {
            paymentInfo.cardNumber = document.getElementById("card-number").value.trim();
            paymentInfo.expiryDate = document.getElementById("expiry-date").value;
            paymentInfo.cvv = document.getElementById("cvv").value.trim();
            if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
                alert("Please enter valid card details.");
                return;
            }

        } else if (paymentMethod === "paypal") {
            paymentInfo.email = document.getElementById("paypal-email").value.trim();
            if (!paymentInfo.email) {
                alert("Please enter a valid PayPal email.");
                return;
            }
        }

        alert(`Thank you, ${name}! Your order has been placed using ${paymentMethod}.`);

        localStorage.removeItem("cart"); // Clear the cart
        window.location.href = "thankyou.html"; // Redirect to thank-you page
    });
});