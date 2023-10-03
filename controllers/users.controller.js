const { ErrUserNotFound, ErrConflict } = require("../lib/ResponseHandler");
const { getUserByUserName, getUserToken, addUser } = require("../services/users.service");

//POST /register
postRegister = async (req, res, next) => {
    const { username } = req.body;
    const user = await getUserByUserName(username);
    console.log({ user })
    if (user) {
        return next(ErrConflict());
    }
    const newUser = addUser(req.body);
    res.create(newUser);
}

//POST /login
postLogin = async(req, res, next) => {
    //get the user
    const { username, password } = req.body;

    const user = await getUserByUserName(username);

    if (!user) {
        return next(ErrUserNotFound());
    }

    if (user.password !== password) {
        console.log(user)
        console.log(password,user.password)

        return next(ErrUserNotFound());
    }

    //create access token with the user
    const access_token = getUserToken(user);

    //respond back
    res.ok({ access_token, user })
}


module.exports = { postLogin, postRegister };