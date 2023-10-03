const { ErrSchema } = require("../lib/ResponseHandler");

const validateDto = (schema) => {
    return (req, res, next) => {
        schema.validate(req.body, { abortEarly: false, stripUnknown: false }).then(() => {
            next();
        }).catch(function (err) {
            console.log({err});
            next(ErrSchema(err.errors));
        });
    }
}

module.exports = {
    validateDto
}