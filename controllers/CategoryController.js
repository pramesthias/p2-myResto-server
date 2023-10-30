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


    static async editCategory(req, res){
        try {
            let category = await Category.findByPk(req.params.id);
            if(!category) throw ({name: "NotFound"});
            await category.update(req.body);
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

    
    static async deleteCategory(req, res){
        try {
            let category = await Category.findByPk(req.params.id);
            if(!category) throw ({name: "NotFound"});
            await category.destroy();
            res.status(200).json({message: `${category.name} success to delete`});
                // res.status(204).end(); tidak ada response
        } catch (error) {
            if(error.name === "NotFound") {
                res.status(404).json({message: "error not found"});
            } else {
                console.log(error);
                res.status(500).json({message: "Internal Server Error"});
            }
        }
    }
}