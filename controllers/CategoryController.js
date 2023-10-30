const {Category} = require("../models");

module.exports = class CategoryController {

    static async getCategories(req, res){
        try {
            const categories = await Category.findAll(); 
            res.status(200).json(categories);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }


    static async createCategory(req, res){
        try {
            console.log(req.body)
            const category = await Category.create(req.body);
            res.status(201).json(category);
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