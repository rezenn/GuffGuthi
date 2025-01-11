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

//AuthRoutes
app.use("/auth", require("./routes/auth"))


//homeRoutes
app.use("/home", require("./routes/home"));


app.listen(PORT, () => {
    console.log(`The app is running at port: ${PORT}`);
})