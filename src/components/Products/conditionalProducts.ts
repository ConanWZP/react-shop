

const conditionalProducts = (products: any[], currentBrand: string, currentCategory: string) => {

    let productsArray: any[] = []



    if (currentCategory === 'All') {

        if (currentBrand === 'All') {

            productsArray.push(...products)

            debugger



        } else {

            productsArray.push(...products.filter((product) => product.brand === currentBrand))

        }

    } else {
        if (currentBrand === 'All') {
            productsArray.push(...products.filter((product) => product.category === currentCategory))



        } else {
            productsArray.push(...products.filter((product) => product.category === currentCategory).filter((product) => product.brand === currentBrand))


        }
    }

    return {productsArray}
}

export default conditionalProducts