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


//     {
//         attributes: ['username', 'email', 'role', 'phoneNumber', 'address']
// }

    static async getUser(req, res){
        try {
            const user = await User.findByPk(req.params.id);
            res.status(200).json(user);
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
                return; //disini
            }
            res.status(500).json({message: "Internal Server Error"});
        
            // if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError"){
            //     res.status(400).json({message: error.errors[0].message});
            //     // return; disini
            // } else {    //atau return res.status(400).json({message: error.errors[0].message});
            //     console.log(error.name);
            //     res.status(500).json({message: "Internal Server Error"});
            // } 
        }
    }

    //PUT
    static async editUser(req, res){
        try {
            let user = await User.findByPk(req.params.id);
            if(!user) throw ({name: "NotFound"});
            await user.update(req.body);
            res.status(200).json(req.body);
        } catch (error) {
            console.log(error.name);
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError"){
                res.status(400).json({message: error.errors[0].message}); 
            } else if(error.name === "NotFound") {
                res.status(404).json({message: "error not found"});
            } else {
                res.status(500).json({message: "Internal Server Error"});
            }
        }
    }

    //DELETE
    // static async deleteUser(req, res){
    //     try {
    //         let user = await User.findByPk(req.params.id);
    //         if(!user) throw ({name: "NotFound"});
    //         await user.destroy();
    //         res.status(200).json({message: `${user.username} success to delete`});
    //             // res.status(204).end(); tidak ada response
    //     } catch (error) {
    //         if(error.name === "NotFound") {
    //             res.status(404).json({message: "error not found"});
    //         } else {
    //             console.log(error);
    //             res.status(500).json({message: "Internal Server Error"});
    //         }
    //     }
    // }

}