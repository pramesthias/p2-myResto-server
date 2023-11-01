const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const {User} = require("../models");

module.exports = class UserController {

    static async registerUser(req, res, next){
        try {
            const {username, email, password, phoneNumber, address} = req.body
            const user = await User.create({username, email, password, phoneNumber, address});

            res.status(201).json({
                "id": user.id,
                "email": user.email
            });

        } catch (error) {
            next(error);
        }
    }


    static async login(req, res, next){   //bukan create data!
        try {
            const {email, password} = req.body;

            if(!email) {
                res.status(400).json({message: "Email is missing"});
                return; 
            }
            
            if(!password) {
                res.status(400).json({message: "Password is missing"});
                return; 
            }

            const user = await User.findOne({ where: {email} }); 
            if(!user){
                res.status(401).json({message: "error invalid email or password"});
                return;
            }

            if(req.body.role === "Staff"){ 
            const isValidPassword = comparePassword(password, user.password);
            if(!isValidPassword){
                res.status(401).json({message: "error invalid email or password"});
                return;
                }
            }

            const access_token = signToken({ id: user.id });
            res.status(200).json({ access_token}); 
            
        } catch (error) {
            next(error);
        }
    }

}