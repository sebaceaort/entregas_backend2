export const auth = (role)=>{
    return async (req, res, next) => {
        
        if(!req.user) return res.status(401).json({status:"error", message:"Error! necesitas iniciar sesion!"});
        if (req.user.role.some(rol => rol === role)) {
            next();
        } else {
            res.status(403).json({status:"error", message:"Error! No tienes permiso para realizar esta accion!"});
        }
    }

}