import products from './products.json'

const getProducts = async ({limit, page}: { limit: number, page: number }) => {
    const paginatedProdcuts = products.slice((page - 1) * limit, limit * page)
    return {products: paginatedProdcuts, total: products.length}
}

export default getProducts