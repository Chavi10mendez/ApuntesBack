const users = require('./index')
const { Posteo, UserPosteo } = require('../db-sqlz')

const getAllPosteos = async () => await Posteo.findAll();


const postPosteos = async (userId, title, contents) => {

    const newPost = await Posteo.create({
        title,
        contents
    });
    await newPost.addUsers(userId);

    return newPost;
};

const updatePosteo = (userid, title, contents) => {
};

module.exports = {
    getAllPosteos,
    postPosteos,
}