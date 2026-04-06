const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ MIDDLEWARE
app.use(express.json());
app.use(cors());

// ✅ CONNECT TO MONGODB
mongoose.connect("mongodb+srv://aspida:Doom5881@cluster0.znsw1dx.mongodb.net/?appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ SCHEMA
const User = mongoose.model("User", {
  username: String,
  password: String
});

// ✅ TEST ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// ✅ REGISTER
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User registered");
  } catch (err) {
    res.send("Error registering user");
  }
});

// ✅ LOGIN
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    if (user) {
      res.send("SUCCESS");
    } else {
      res.send("FAIL");
    }
  } catch (err) {
    res.send("Error logging in");
  }
});

// ✅ PORT (VERY IMPORTANT FOR RAILWAY)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
