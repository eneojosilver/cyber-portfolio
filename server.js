const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (DO NOT PUT YOUR STRING HERE)
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// ✅ User Schema
const User = mongoose.model("User", {
    username: String,
    password: String
});

// ✅ Test Route (for browser)
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// ✅ Register Route
app.post("/register", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send("User registered");
    } catch (err) {
        res.status(500).send("Error registering user");
    }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne(req.body);

        if (user) {
            res.send("SUCCESS");
        } else {
            res.send("FAIL");
        }
    } catch (err) {
        res.status(500).send("Error logging in");
    }
});

// ✅ IMPORTANT: Use Railway port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
