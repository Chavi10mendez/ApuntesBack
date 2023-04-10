/*
res.body aparece put y post                             post/put   EXPRESS(/user/)       URL/user/           req.body={"name": "xavi", "apellido": "apellido"} cuando me envian info(json) ejem en un formulario
res.params(siempre es un string lo que viene de en el obj)  get    EXPRESS(/user/:name)  URL/user/:name      req.params={name: "xavi"}
res.query(siempre es un string lo que viene de en el obj)   get    EXPRESS(/user)        URL/user?name=xavi  req.query={name: "xavi"}
*/                                                                 

// plan de accion de las rutas
/*
✅-RUTA GET USRES ===> PARA QUE ME TRAIGA TODOS LOS USERS O QUE BUSQUE POR NOMBRE
✅RUTA GET USRES/:ID ===> PARA QUE ME TRAIGA EL USUARIO CON EL ID SOLICITADO
✅-RUTA POST USRES ===> PARA CREAR UN USUARIO NUEVO
✅-RUTA PUT USRES ===> PARA MODIFICAR EL USUARIO QUE CORRESPONDA
✅-RUTA DELETE USRES ===> PARA ELIMINAR EL USUARIO QUE CORRESPONDA
*/

const usersRouter = require('express').Router();
const { getAllUsers, getUsersByName, postUser, updateUser, deleteUser, getUsersByID} = require('../controllers/index');

usersRouter.get('/', async (req, res) => {
    //verificar si recibi info por query para saber si traer todos los users o los que coincidan con el name
    const { name } = req.query;// /users?name=xavi

    try {

        if(name) {
            const users =await getUsersByName(name);

            if(users.error) throw Error(users.error);
            else{
                return res.status(200).json(users);
            }
        }
    //si no hay query => traer todos los users, una vez que lo tengo los mando en la res
        else {
            const users = await getAllUsers() // || await User.findAll();
            return res.status(200).json(users);
        }
    } catch (error) {
        return res.status(404).json(error);
    }
})

usersRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    try {
        if(id) {
            const userId = getUsersByID(id);

            if(userID.error) throw Error(userID.error);
            else{
                return res.status(200).json(userId);
            }
        }
    } catch (error) {
        return res.status(404).json(error);
    }
})

// esto crea el usuario, puede venir de un form
usersRouter.post('/', async (req, res) => {
    const { name, email, username } = req.body;

    try {
        if(!name || !email || !username) throw Error('Me faltan datos')
        else{
            const newUser = await postUser(name, email, username);
            return res.status(200).json(newUser);
        }

    } catch (error) {
        return res.status(404).json(error)
    }
})

usersRouter.put('/', (req, res) => {
    const { id, name, email, username } = req.body;

    if(id && (name || email || username)) {
        
        const userUpdated = updateUser(id, name, email, username)

        try {
            if(userUpdated.error) throw Error(userUpdated.error);
            else{
                return res.status(200).json(userUpdated)
            }
        } catch (error) {
            res.status(404).json(error);
        }
   
    }
})

usersRouter.delete('/:id', async (req, res) => {// /users/:id
    
    try {
        const { id } = req.params;

        if(id) {
            const userDeleted = deleteUser(id) // || await User.findByPk(id);
    
            if(userDeleted.error) throw Error(userDeleted.error);
            else{
                return res.status(200).json(userDeleted);
            }
        }
    } catch (error) {
        return res.status(404).json(error);
    }

    // if(id) {
    //     const userDeleted = deleteUser(id);

    //     if(userDeleted.error) return res.status(404).json(userDeleted.error);
    //     else{
    //         return res.status(200).json(userDeleted);
    //     }
    // }
})

module.exports = usersRouter;