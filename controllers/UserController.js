const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const {User} = require("../models");

module.exports = class UserController {

    static async registerUser(req, res, next){
        try {   //req.body
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

            if(!email) {    // BENAR 400
                res.status(400).json({message: "error invalid email or password"}); //password missing
                return; 
            }
            
            if(!password) {
                res.status(400).json({message: "error invalid email or password"});
                return; 
            }

            // ganti jadi 401
            const user = await User.findOne({ where: {email} }); 
            if(!user){
                next({name: 'Unauthenticated', message: "user not found or password not matched"});
                return;
            }

            if(user.role === "Staff"){ 
            const isValidPassword = comparePassword(password, user.password);
            if(!isValidPassword){
                next({name: 'Unauthenticated', message: "user not found or password not matched"});
                return;
            }
        }

            const access_token = signToken({ id: user.id });
            res.status(200).json({ access_token, email: user.email, role: user.role}); 
            
        } catch (error) {
            next(error);
        }
    }

}