
let products = [];

let id = 1;
const postProduct = (name, price, category, productcharacteristics, description ) => {
    const newProducts = {
        name,
        price,
        category,
        productcharacteristics,
        description,
        id: id++, 
    };
    products.push(newProducts);
    return newProducts;
}

const getProductByID = (id, category) => {
    const productFilteredId = products.find(p => p.id === Number(id) || products.category === category);

//   if(usersFiltered) return usersFiltered;
    productFilteredId ? productFilteredId : false
};

const deleteProd = (id) => {
    const prod = products.find(p => p.id === Number(id));
    
    if(!prod) return false;
    else{
        prod = prod.filter(prod =>prod.id !== Number(id))
        // 3hs
        return prod;
    }
}

const putProduct = (id, dataBoby) => {
    const prod = products.find(p => p.id === Number(id));
    if (prod) {
        products.map(p => p.id === Number(id) ? {...p, ...dataBoby} : {...p});
    }
    return prod
}

module.exports = {
    postProduct,
    getProductByID,
    deleteProd,
    putProduct,
    products
}