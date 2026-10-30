
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to my Express Server!");
});

// About route
app.get("/about", (req, res) => {
    res.status(200).json({
        name: "BATCHU VENKATA MANI SAI",
        section: "CSE-2A(S15)"
    });
});

// Time route
app.get("/time", (req, res) => {
    res.status(200).json({
        currentDateTime: new Date()
    });
});

// 404 route
app.use((req, res) => {
    res.status(404).json({
        message: "404 - Route Not Found"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
