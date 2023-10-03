const { users } = require('../lib/mongo');
const { jwtSign } = require("../lib/JWT");


const getUserByUserName = async (username) => {
    //find the user by username inside mongodb collection
    const user = await users().findOne({ 'username': username });
    return user;
}

const addUser = async (user) => {
    //find the user by username inside mongodb collection
    const newUser = await users().insertOne(user);
    console.log('newUser',newUser)
    return newUser ;
}
const getUserToken = (user) => {
    const { id } = user;
    delete user.password;

    const access_token = jwtSign({ id });

    return access_token;
}

module.exports = { getUserByUserName, getUserToken, addUser };