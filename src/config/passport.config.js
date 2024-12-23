import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import {userModel} from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/hash.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["coderCookie"];
    }
    return token;
}
const initializePassport = () => {
    passport.use("jwt", new JWTStrategy(
    {
    jwtFromRequest:jwt.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET,    
    },
    async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload._doc);
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }
))

    passport.use("register", new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: "email"
            }, 
            async (req, username, password, done) => {
                const {first_name, last_name,  age, role} = req.body;
                try {
                    const user= await userModel.findOne({email:username});
                    if (user) {
                        return done(null, false);
                    }
                    const newUser = await userModel.create({
                                                            first_name,
                                                            last_name,
                                                            email:username,
                                                            age,
                                                            password: createHash(password),
                                                            role: role || ["user"]
                                                        });
                                                        
                    return done(null, newUser);
                } catch (error) {
                    return done(error, null);
                }
            }
        ));
 
        passport.use("login", new LocalStrategy(
            {
                usernameField: "email"
            }, 
            async (username, password, done) => {
                try {
                    const user = await userModel.findOne({email:username});
                    if (!user) {
                        return done(null, false);
                    }
                    if (!isValidPassword(user, password)) {
                        return done(null, false);
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            }
        ));
}

export default initializePassport;