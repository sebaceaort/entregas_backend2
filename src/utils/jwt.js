import jwt from "jsonwebtoken";

export const createToken = (payload) =>   jwt.sign({...payload}, process.env.JWT_SECRET, {expiresIn: "24h"});

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

