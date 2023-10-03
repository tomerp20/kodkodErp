const express = require('express');
const route = express.Router();
const { usersSchema } = require('../dto/users.schema');
const { validateDto } = require('../dto/validate');
const { postLogin, postRegister } = require('../controllers/users.controller');

route.post('/register', validateDto(usersSchema), postRegister);
route.post('/login', validateDto(usersSchema), postLogin);


module.exports = route;