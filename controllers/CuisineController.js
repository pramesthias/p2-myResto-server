const { Op } = require("sequelize");
const { User, Category, Cuisine } = require("../models");

const cloudinary = require('cloudinary').v2;

const { randomUUID } = require('crypto');

cloudinary.config({
    cloud_name: 'dfyn5hmau',
    api_key: process.env.api_key,     //REVISED
    api_secret: process.env.api_secret    //REVISED
});

module.exports = class CuisineController {

    static async getPubCuisines(req, res, next) {

        const { search, filter, sort, page = 1 } = req.query;

        let limit = 10;
        let offset = (+page - 1) * limit;

        let paramQuerySQL = {
            include: [
                {
                    model: User,
                    attributes: ['username'],  //REVISED
                },
                {
                    model: Category
                }
            ],
            order: [['createdAt', 'asc']],
        };


        // PAGINATION
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;


        //SEARCH BY CUISINE NAME
        if (search !== '' && typeof search !== 'undefined') {
            paramQuerySQL.where = {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            }
        }

        // SORTING DATA TERBARU & TERLAMA
        if (sort !== '' && typeof sort !== 'undefined') {
            if (sort.charAt(0) !== '-') {
                paramQuerySQL.order.push([[sort, 'ASC']]);
            } else {
                paramQuerySQL.order.push([[sort.replace('-', ''), 'DESC']]);
            }
        }

        // FILTER ENTITAS CUISINE BASED ON CATEGORY
        if (filter !== '' && typeof filter !== 'undefined') {
            paramQuerySQL.where = {
                categoryId: { [Op.in]: [filter] },
            };
        }

        console.log(paramQuerySQL)
        try {
            const cuisines = await Cuisine.findAndCountAll(paramQuerySQL);
            res.status(200).json(cuisines);
        } catch (error) {
            // next(error);
            console.log(error)
        }
    }


    //  if (filter !== '' && typeof filter !== 'undefined') {        
    //     paramQuerySQL.where = {
    //       categoryId: { [Op.iLike]: `%${filter}%` },
    //     };
    //   }


    // try {
    //     const cuisines = await Cuisine.findAll({
    //         include: [{
    //             model: User,
    //             attributes: {exclude: ['username', 'phoneNumber', 'address']},  //REVISED
    //         },
    //         { model: Category }]
    //     });
    //     res.status(200).json(cuisines);
    // }


    static async getCuisines(req, res, next) {
        try {
            const cuisines = await Cuisine.findAll({
                include: [{
                    model: User,
                    attributes: { exclude: ['password', 'phoneNumber', 'address'] },  //REVISED
                },
                { model: Category }]
            });
            res.status(200).json(cuisines);
        } catch (error) {
            next(error);
        }
    }


    static async getCuisine(req, res, next) {
        try {
            const cuisine = await Cuisine.findByPk(req.params.id);

            if (!cuisine) {
                next({ name: 'NotFound', message: "Cuisine not found" });
                return;
            }

            res.status(200).json(cuisine);
        } catch (error) {
            next(error);
        }
    }


    static async createCuisine(req, res, next) {
        try {
            const cuisine = await Cuisine.create({ ...req.body, authorId: req.user.id });    //gaperlu kirim authorId karna ikutin access token
            console.log({ authorId: req.user.id })
            res.status(201).json(cuisine);
        } catch (error) {
            next(error);
        }
    }

    //gaperlu kirim authorId karna ikutin access token
    static async editCuisine(req, res, next) {
        try {
            console.log(req.body)
            let cuisine = await Cuisine.findByPk(req.params.id);
            let update = await cuisine.update(req.body, { returning: true });
            res.status(200).json(update);
        } catch (error) {
            next(error);
        }
    }

    static async deleteCuisine(req, res, next) {   //DELETE
        try {
            let cuisine = await Cuisine.findByPk(req.params.id);
            await cuisine.destroy();
            res.status(200).json({ message: `${cuisine.name} success to delete` });
            // res.status(204).end(); tidak ada response
        } catch (error) {
            next(error);
        }
    }


    static async updateImageUrl(req, res, next) {
        try {

            const cuisine = await Cuisine.findByPk(req.params.id);

            if (!cuisine) {
                next({ name: 'NotFound' });
                return;
            }

            // console.log(req.file, req.body);
            if (!req.file) {
                next({ name: 'NoFileError' });
                return;
            }

            const base64File = Buffer.from(req.file.buffer).toString('base64');

            const dataURI = `data:${req.file.mimetype};base64,${base64File}`
            const data = await cloudinary.uploader.upload(dataURI, {
                public_id: `${req.file.originalname}_${randomUUID()}`,
                folder: 'cuisines'
            });

            await cuisine.update({ imgUrl: data.secure_url });

            console.log(data)
            res.status(200).json({ message: `Image ${cuisine.name} success to update` })
            next();
        } catch (error) {
            next(error);
        }
    }
}