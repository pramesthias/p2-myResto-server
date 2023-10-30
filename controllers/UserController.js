const {User} = require("../models");

module.exports = class UserController {

    static async getUsers(req, res){
        try {
            const users = await User.findAll(); 
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    static async createUser(req, res){
        try {
            console.log(req.body)
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.log(error.name);
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError"){
                res.status(400).json({message: error.errors[0].message});
                return; 
            }
            res.status(500).json({message: "Internal Server Error"});
        }
    }

}