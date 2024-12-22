import { Router } from "express";



const userRouter = Router();

userRouter.get("/login", (req, res) => {
    res.json({status:"ok", user});
})


userRouter.post("/register", (req, res) => {
    res.json({status:"ok", message:"El Usuario se creo correctamente!"});
})


userRouter.delete("/logout", (req, res) => {
    res.json({status:"ok", message:"El Usuario se cerro correctamente!"});
})
export default userRouter;