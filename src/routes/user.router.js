import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import { isValidPassword } from "../utils/hash.js";
import { createToken } from "../utils/jwt.js";
import passport from "passport";
import {auth} from "../middleware/auth.js";

const userRouter = Router();

userRouter.get("/login",passport.authenticate("login", {session:false,failureRedirect:"/faillogin"}),async (req, res) => {
    try{
        if(!req.user) res.status(400).json({status:"error", message:"Error! No se pudo loggear el Usuario!"});
        const {user} = req;
        const token = createToken(user);
        res.cookie("coderCookie", token, {httpOnly: true}).json({status:"ok", message:"El Usuario se loggeo correctamente!"});
    }
    catch (error) {
     
        res.status(500).json({status:"error", message:"Error! No se pudo registrar el Usuario!"});
    }
})


userRouter.post("/register", passport.authenticate("register", {session:false,failureRedirect:"/failregister"}), async(req, res) => {
    try{
        if(!req.user) res.status(400).json({status:"error", message:"Error! No se pudo registrar el Usuario!"});
        const {user} = req;
        const token = createToken(user);
        res.cookie("coderCookie", token, {httpOnly: true}).json({status:"ok", message:"El Usuario se registro correctamente!"});
    }
    catch (error) {
        res.status(500).json({status:"error", message:"Error! No se pudo registrar el Usuario!"});
    }
})


userRouter.delete("/logout", (req, res) => {
    
    res.clearCookie("coderCookie").json({status:"ok", message:"El Usuario se deslogueo correctamente!"});
})

userRouter.get("/current",passport.authenticate("jwt", {session:false}) ,auth('admin'), (req, res) => {
    console.log(req.user);
    if(req.user){
        res.status(200).json(req.user);
    }else{
        res.status(400).json({status:"error", message:"Error! No se pudo obtener el Usuario!"});
    }

})

export default userRouter;