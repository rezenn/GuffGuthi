const express = require("express")
const app = express()
const cors = require("cors")

//middleware
app.use(express.json())
app.use(cors());


const PORT = process.env.PORT || 5000;

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/home", require("./routes/homeRoutes"));

app.listen(PORT, () => {
    console.log(`The app is running at port: ${PORT}`);
});
