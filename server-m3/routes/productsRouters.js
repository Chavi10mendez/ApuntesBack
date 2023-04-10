const productsRouter = require('express').Router();
const { products, postProduct, getProductByID, deleteProd, putProduct} = require('../controllers/index3');

productsRouter.get('/', (req, res) => {
    try {
        if(products.length !== 0) {
        res.status(200).json(products)
        } else {
        throw Error({ error: 'No hay productos por el momento'});
        }
    } catch (error) {
        res.status(404).json(error.message)
    } 
})

productsRouter.post('/', (req, res) => {
    const { name, price, category, productcharacteristics, description} = req.body;

    try {
        if((!name || !price || !category || !productcharacteristics) && description) throw Error('Faltan datos obligatorios')
        else{
            const newProducts = postProduct(name, price, category, productcharacteristics, description);
            if(newProducts){
                return res.status(204).send('producto creado con exito')
            }
        }

    } catch (error) {
        return res.status(404).json(error.message)
    }
})

productsRouter.get('/:id/:category', (req, res) => {
    const { id, category } = req.params;

    try {
        if(id || category) {
            const prodId = getProductByID(id, category);

            if(prodId === false) throw Error('No se encontro El producto');
            else{
                return res.status(200).json(prodId);
            }
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }

})

productsRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    try {
        if(id) {
            const prodDeleted = deleteProd(id);
    
            if(prodDeleted === false) throw Error('el no existe o algo salio mal');
            else{
                return res.sendStatus(204);
            }
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }

})

productsRouter.put ('/:id', (req, res) => {
    const { id } = req.params;
    const dataBoby = req.boby;

    try {
        if(!id || !dataBoby) throw Error('error de datos o no existe el product')
        else {
            const putProd = putProduct(id, dataBoby);
            if(putProd) return res.status(200).send('producto actualizado')
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }

})

module.exports = productsRouter;