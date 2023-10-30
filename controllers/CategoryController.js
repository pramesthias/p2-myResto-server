const {Category} = require("../models");

module.exports = class CategoryController {

    static async getCategories(req, res){
        try {
            const category = await Category.findAll(); 
            res.status(200).json(category);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    static async getUser(req, res){
        try {
            const user = await User.findByPk(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }

}