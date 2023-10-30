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





}