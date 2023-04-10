const axios = require('axios');
//suponiendo que existe el modelo character en sequelize
// const { Character } = require('../db-sqlz.js')

const getApiData = async () => {
  try {
    let i = 1;
    let characters = [];

    while (i < 6) {
        let apiData = await axios (`https://rickandmortyapi.com/api/character?page=${i}`);
        characters.push(apiData);
        i++;
        //en este punto character tiene un array de promesas(5) que no se resolvieron
    }

    characters = (await Promise.all(characters)).map(res => res.data.results.map(char => {
        return({
            id: char.id,
            name: char.name,
            status: char.status,
            species: char.species,
            gender: char.gender,
            origin: char.origin.name,
            image: char.image
        })
    }))
    // el Promise.all return un array con las promesas resueltas
    //ahora characters es un array de un array de objetos [ [ {1}, {2}, {3}, {4}, {5} ] ]

    //quiero solo un [de objetos]
    
    // let allCharacters = [];
    // characters.map(char => {allCharacters = allCharacters.concat(char)});
    //mejor opcion para mi:
    let allCharacters = characters[0];
    return allCharacters;
    
  } catch (error) {
    return {eror: error.message};
  }
};

const saveApiData = async () => {
    try {
        const allCharacters = await getApiData();
        const createdCharacter = await Character.bulkCreate(allCharacters);
        //bulkCreate nos permite pasarle un array de obj y los crea todos juntos en la db
    } catch (error) {
        return {eror: error.message};
    }
};

module.exports = {
    saveApiData,
    // esta funcion saveApiData la exporto al achivo server que conecta a la db
}

/*
const server = require('./routes/index');
const { database } = require('./db-sqlz');
const { saveApiData } = requiere('../controllers/ej-busqueda-apiData.js');

database.sync({ force: true }).then(async () => {
    await saveApiData();

    console.log('db conectada');

    server.listen(3001, () => {
       console.log('El server esta corriendo en el puerto 3001  correctamente')
    })

}).catch((error) => {
    console.log(error);
});

*/