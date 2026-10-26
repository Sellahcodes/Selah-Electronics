const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// IMPORTANT: serve files from parent folder (Desktop project root)
app.use(express.static(path.join(__dirname, "..")));

// Home route → load index.html from root folder
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

// Fake database in memory
let users = [];
let cart = [];

// Signup
app.post("/signup", (req, res) => {
    users.push(req.body);
    console.log("Users:", users);

    res.json({
        message: "Signup successful!",
        users: users
    });
});

// Add to cart
app.post("/cart", (req, res) => {
    cart.push(req.body);
    console.log("Cart:", cart);

    res.json({
        message: "Added to cart!",
        cartCount: cart.length,
        cart: cart
    });
});

// Get cart
app.get("/cart", (req, res) => {
    res.json(cart);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});