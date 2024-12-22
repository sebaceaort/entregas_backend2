import express from "express";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import productsMongoRouter from "./routes/productMongo.router.js";
import cartsRouter from "./routes/cart.router.js";

const app = express();
const puerto = 8080;
const httpServer = app.listen(puerto, () => {
    console.log(`Servidor Activo en el puerto: ${puerto}`);
});
 export const socketServer = new Server(httpServer);

 mongoose.connect("mongodb+srv://sceaort:hcaD7dqwi1Oexap3@coderbackend.pobdwe8.mongodb.net/ecommerce?retryWrites=true&w=majority");


app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsMongoRouter);
app.use("/api/carts", cartsRouter);



