const {Category} = require("../models");

module.exports = class CategoryController {

    static async getCategories(req, res, next){  
        try {
            const categories = await Category.findAll(); 
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

        static async createCategory(req, res, next){ 
            try {
            const category = await Category.create(req.body); 
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }

    //authorizatin admin --> mas Patra
    static async editCategory(req, res, next){    
        try {
            let category = await Category.findByPk(req.params.id);
            // if(!category) throw ({name: "NotFound"});
            await category.update(req.body);
            res.status(200).json(req.body);
        } catch (error) {
            next(error);
        }
    }

}