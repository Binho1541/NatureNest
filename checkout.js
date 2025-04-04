document.addEventListener("DOMContentLoaded", function () {
    const paymentForm = document.getElementById("payment-form");
    const paymentDetails = document.getElementById("payment-details");
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');

    paymentMethods.forEach(method => {
        method.addEventListener("change", function () {
            updatePaymentDetails(this.value);
        });
    });

    function updatePaymentDetails(paymentMethod) {
        paymentDetails.innerHTML = ""; // Clear previous fields

        if (paymentMethod === "mobile-money") {
            paymentDetails.innerHTML = `
                <label for="network">Select Network:</label>
                <select id="network" required>
                    <option value="">--Choose Network--</option>
                    <option value="mtn">MTN</option>
                    <option value="vodafone">Vodafone</option>
                    <option value="airteltigo">AirtelTigo</option>
                </select>
                <label for="momo-number">Mobile Money Number:</label>
                <input type="tel" id="momo-number" placeholder="Enter Mobile Money Number" required>
            `;
        } else if (paymentMethod === "card") {
            paymentDetails.innerHTML = `
                <label for="card-number">Card Number:</label>
                <input type="text" id="card-number" placeholder="Enter Card Number" required>
                <label for="expiry">Expiry Date:</label>
                <input type="month" id="expiry" required>
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" placeholder="Enter CVV" required>
            `;
        } else if (paymentMethod === "paypal") {
            paymentDetails.innerHTML = `<p>You will be redirected to PayPal for secure payment.</p>`;
        }
    }

    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission

        alert("Payment successful! Redirecting...");
        window.location.href = "thankyou.html"; // Redirect to Thank You page
    });
});
