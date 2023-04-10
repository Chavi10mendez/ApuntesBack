const { User, Post } = require('../db-sqlz');
const { Op } = require('sequelize');


const getAllUsers = async () => {
   const all = await User.findAll({
    include: {
        model: Post,
        attributes: ["title", "contents"],
        through: {
            attributes: [],
        }
    }
   });
   return all;
}

const getUsersByID = async (id) => {
    const usersFilteredId = await User.findByPk(Number(id));
//   if(usersFiltered) return usersFiltered;
    usersFilteredId ? usersFilteredId : { error: `No se encontro el usuario solicitado` }
};

const getUsersByName = async (name) => {
    const usersFiltered = await User.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            },
        },
        include: {
                model: Post,
                attributes: ["title", "contents"],
                through: {
                    attributes: [],
                }
        }
    });

//   if(usersFiltered) return usersFiltered;
    usersFiltered ? usersFiltered : { error: `No hay usuarios con nombre: ${name}` }
};

const postUser = async (name, email, username, dni ) => {
    const newUser = await User.create({
        name,
        email,
        username,
        dni,
    });
    return newUser;
}

const updateUser = async (id, name, username, email, dni ) => {
    const user = await User.update(
        {
            name: name,
            username: username,
            email: email
        },
        {
        where:{
            id: Number(id),
            dni: dni
        }
    }); 
    if(!user) return { error: "usuario inexistente" };
    else{
        return user;
    }
}

const deleteUser = async (id) => {
    const nameUser = await User.findOne(Number(id));

    await nameUser.destroy();
    
    if(!nameUser) return { error: "Usuario no encontrado" };
    else{
        return { message: `El usuario ${nameUser.name} se elimino` };
    }
};

module.exports = {
    getAllUsers,
    getUsersByName,
    postUser,
    updateUser,
    deleteUser, 
    getUsersByID, 
}