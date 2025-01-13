const express = require("express")
const app = express()
const cors = require("cors")

//middleware
app.use(express.json())
app.use(cors({
    // origin: 'http://localhost:5175', 
    // credentials: true, 
}));


const { PORT } = require("./constants")

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/home", require("./routes/homeRoutes"));

app.listen(PORT, () => {
    console.log(`The app is running at port: ${PORT}`);
});
