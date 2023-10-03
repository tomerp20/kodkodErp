const yup = require('yup');

/*
    username - required
    name - string
    password - required
    password - string

*/

let usersSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
}).noUnknown()


module.exports = {
    usersSchema
};