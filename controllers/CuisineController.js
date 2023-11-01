const {User, Category, Cuisine} = require("../models");

const cloudinary = require('cloudinary').v2;
          
const { randomUUID } = require('crypto');

cloudinary.config({ 
  cloud_name: 'dfyn5hmau', 
  api_key: '675134913794287', 
  api_secret: 'SvzDgHcC2OALsrQWGU3uCLAdVxs' 
});

module.exports = class CuisineController {

    static async getCuisines(req, res, next){
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
            next(error);
        }
    }


    static async getCuisine(req, res, next){
        try {
            const cuisine = await Cuisine.findByPk(req.params.id);
            res.status(200).json(cuisine);
        } catch (error) {
            next(error);
        }
    }


    static async createCuisine(req, res, next){
        try {
            const cuisine = await Cuisine.create({...req.body, authorId: req.user.id});    //gaperlu kirim authorId karna ikutin access token
            console.log({authorId: req.user.id})
            res.status(201).json(cuisine);
        } catch (error) {
            next(error);
        }
    }

    //gaperlu kirim authorId karna ikutin access token
    static async editCuisine(req, res, next){
        try {
            let cuisine = await Cuisine.findByPk(req.params.id);
            await cuisine.update(req.body);
            res.status(200).json(req.body);
        } catch (error) {
            next(error);
        }
    }


    static async deleteCuisine(req, res, next){   //DELETE
        try {
            let cuisine = await Cuisine.findByPk(req.params.id);
            await cuisine.destroy();
            res.status(200).json({message: `${cuisine.name} success to delete`});
                // res.status(204).end(); tidak ada response
        } catch (error) {
            next(error);
        }
    }


    static async updateImageUrl(req, res, next){
        try {

            const cuisine = await Cuisine.findByPk(req.params.id);

            if(!cuisine) {
                next({name: 'NotFound', message: "Cuisine not found"});
                return;
            } 
                

            // console.log(req.file, req.body);
            const base64File = Buffer.from(req.file.buffer).toString('base64');

            const dataURI = `data:${req.file.mimetype};base64,${base64File}`
            const data = await cloudinary.uploader.upload(dataURI,{ 
                public_id: `${req.file.originalname}_${randomUUID()}`,
                folder: 'cuisines'
            });


            await Cuisine.update()

            console.log(data)
            res.json({message: "successfully uploaded"})
            // next();
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}