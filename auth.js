// Show Register Form
function showRegister() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("register-section").style.display = "block";
}

// Show Login Form
function showLogin() {
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}

// Register User
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let name = document.getElementById("register-name").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    if (localStorage.getItem(email)) {
        alert("Email already exists. Please use another email.");
        return;
    }

    let user = { name, email, password };
    localStorage.setItem(email, JSON.stringify(user));
    alert("Account created successfully! You can now log in.");
    
    showLogin();
});

// Login User
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    let userData = localStorage.getItem(email);

    if (!userData) {
        alert("User not found. Please create an account.");
        return;
    }

    let user = JSON.parse(userData);
    if (user.password !== password) {
        alert("Incorrect password. Try again.");
        return;
    }

    alert("Login successful!");
    sessionStorage.setItem("loggedInUser", email); // Store session data
    window.location.href = "index2.html"; // Redirect to homepage after login
});