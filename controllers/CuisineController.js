const {User, Category, Cuisine} = require("../models");

module.exports = class CuisineController {

    static async getCuisines(req, res){
        try {
            const cuisines = await Cuisine.findAll({
                include: [{
                    model: User,
                    attributes: {exclude: ['password']},
                },
                { model: Category }]
            });
            res.status(200).json(cuisines);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }


    static async getCuisine(req, res){
        try {
            const cuisine = await Cuisine.findByPk(req.params.id);
            res.status(200).json(cuisine);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }


    static async createCuisine(req, res){
        try {
            const cuisine = await Cuisine.create(req.body);
            res.status(201).json(cuisine);
        } catch (error) {
            console.log(error.name);
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError"){
                res.status(400).json({message: error.errors[0].message});
                return; 
            }
            res.status(500).json({message: "Internal Server Error"});
        }
    }


    //PUT
    static async editCuisine(req, res){
        try {
            let cuisine = await Cuisine.findByPk(req.params.id);
            if(!cuisine) throw ({name: "NotFound"});
            await cuisine.update(req.body);
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
    static async deleteCuisine(req, res){
        try {
            let cuisine = await Cuisine.findByPk(req.params.id);
            if(!cuisine) throw ({name: "NotFound"});
            await cuisine.destroy();
            res.status(200).json({message: `${cuisine.name} success to delete`});
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