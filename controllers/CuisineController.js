const {Cuisine} = require("../models");

module.exports = class CuisineController {

    static async getCuisines(req, res){
        try {
            const cuisines = await Cuisine.findAll();
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
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}