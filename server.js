if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

const indexRouter = require("./routes/index")

//tell our app which view-engine we are using
app.set("view engine", "ejs")
//tell our app where our views are gonna be coming from 
app.set("views", __dirname + "/views")
//hook up express layouts ... every single file is gonna be put inside the layout file so that we dont have to duplicate things like header and footer
app.set("layout", "layouts/layout")
// tell our app that we want to express layouts
app.use(expressLayouts)
//tell our app where our public files (styles, sheets, images, html) are gonna be
app.use(express.static("public"))

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on("error", error => console.log(error))
db.once("open", () => console.log("connected to mongoose"))

app.use('/', indexRouter)

//
app.listen(process.env.PORT || 3000)