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

        try {
        // const { search, filter, sort, page = 1} = req.query; 
        const { search, filter, sort, page} = req.query; 

        // let limit = 10;
        // let offset = (+page - 1) * limit;

        //ADDED
        // let offset = (+page) ? 0 : 8 * (page - 1);

        let paramQuerySQL = {
            include: [
                {
                    model: User,
                    attributes: ['username'] //REVISED
                },
                {
                    model: Category,
                    attributes: ['name']
                }
            ],
            limit: 10,      //PAGINATION HERE
            offset: !Number(page) ? 0 : 10 * (page - 1)
        };

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
                paramQuerySQL.order = [[sort, 'ASC']];
            } else {
                paramQuerySQL.order = [[sort.replace('-', ''), 'DESC']];
            }
        }

        // FILTER ENTITAS CUISINE BASED ON CATEGORY
        if (filter !== '' && typeof filter !== 'undefined') {
            paramQuerySQL.where = {
                categoryId: { [Op.in]: [filter] },
            };
        }
        
        
            //ADDED
            const {count, rows} = await Cuisine.findAndCountAll(paramQuerySQL);
            const totalPage = Math.ceil(count/10)
            res.status(200).json({
                total: count,
                totalPage,
                data: rows
            })

            // const cuisines = await Cuisine.findAll(paramQuerySQL);
            // res.status(200).json(cuisines);
        } catch (error) {
            next(error);
        }
    }


    static async getCuisines(req, res, next) {
        try {
            const cuisines = await Cuisine.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username']    //REVISED
                    },
                    {
                        model: Category,
                        attributes: ['name']
                    }
                ],
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
            console.log(error)
        }
    }


    static async createCuisine(req, res, next) {
        try {
            const cuisine = await Cuisine.create({ ...req.body, authorId: req.user.id });    //gaperlu kirim authorId karna ikutin access token
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