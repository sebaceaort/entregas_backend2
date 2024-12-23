import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import __dirname from "./utils.js";
import productsMongoRouter from "./routes/productMongo.router.js";
import cartsRouter from "./routes/cart.router.js";
import userRouter from "./routes/user.router.js";
import initializePassport from "./config/passport.config.js";
dotenv.config();

const app = express();
const puerto = process.env.PORT;

mongoose.connect(process.env.MONGO_URL);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

initializePassport();

app.use("/api/products", productsMongoRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", userRouter);


app.listen(puerto, () => {
    console.log(`Servidor Activo en el puerto: ${puerto}`);
});



/*
ARCHIVO .ENV

PORT=8080
MONGO_URL=mongodb+srv://sceaort:hcaD7dqwi1Oexap3@coderbackend.pobdwe8.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=A$f6ash15A4s346!

*/





 