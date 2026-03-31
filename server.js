const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("YOUR_MONGODB_URI", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// User Schema
const User = mongoose.model("User", {
    username: String,
    password: String
});

// Register Route
app.post("/register", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send("User registered");
});

// Login Route
app.post("/login", async (req, res) => {
    const user = await User.findOne(req.body);

    if(user) {
        res.send("SUCCESS");
    } else {
        res.send("FAIL");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));