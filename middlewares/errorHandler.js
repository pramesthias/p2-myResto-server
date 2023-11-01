module.exports = function errorHandler(error, req, res, next) {
 
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message: error.errors[0].message}); 
            break;

        case "JsonWebTokenError":
        case "Unauthenticated": //error.message
            res.status(401).json({message: "Unauthenticated"}); //BELOM LOGIN / INVALID TOKEN
            break;

        case "Forbidden":
            res.status(403).json({message: "You are not authorized"}); 
            break;

        case "NotFound":
            res.status(404).json({message: error.message ?? "Data not found"}); //cusine -> error
            break;

        case "NoFileError":
            res.status(400).json({message: "File is required"}); 
            break;

        default:
            res.status(500).json({message: "Internal Server Error"});
            break;
    }

}