import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import {setProductsByBrand, setProductsByCategory, setProductsByPrice } from '../../redux/slices/filtersSlice';
import {IProduct} from "../Admin/ListGoods";
import conditionalProducts from "./conditionalProducts";
import {savePriceRange} from "../../redux/slices/productSlice";

interface ProductsFiltersProps {
    setSortValue: (e: string) => void,
    setSearchValue: (e: string) => void,
    searchValue: string
    setCurrentCategory: (e: string) => void,
    currentCategory: string,
    setCurrentBrand: (e: string) => void,
    currentBrand: string,
    setCurrentPrice: (e: any) => void,
    currentPrice: any
}

const ProductsFilters: FC<ProductsFiltersProps> = ({setSortValue, setSearchValue, searchValue,
                                                       setCurrentBrand, setCurrentCategory,
                                                       currentCategory, currentBrand,
                                                       setCurrentPrice, currentPrice}) => {

    const dispatch = useAppDispatch()


    const {products, maxPrice, minPrice} = useAppSelector(state => state.product)
   // const {filteredResults, filteredByCategory} = useAppSelector(state => state.filters)
    const {filteredResults} = useAppSelector(state => state.filters)

    const categoriesList = [
        'All',
        ...new Set(products.map((product: IProduct) => product.category))
    ]

    let brandsList: any[] = []

    if (currentCategory === 'All') {
        brandsList = [
            'All',
            ...new Set(products.map((product: IProduct) => product.brand))
        ]
    } else {
        brandsList = [
            'All',
            ...new Set(products.filter((product: IProduct) => product.category === currentCategory).map((product: IProduct) => product.brand))
        ]
    }




    const chooseCategory = (category: string) => {
        setCurrentCategory(category)
        setSortValue('last')
        setSearchValue('')
        dispatch(setProductsByCategory({products, category}))
        setCurrentBrand('All')
        setCurrentPrice(maxPrice)


    }

    useEffect(() => {
        dispatch(setProductsByCategory({products, category: 'All'}))
    }, [products, dispatch])

  /*  useEffect(() => {
        console.log(currentCategory)
        console.log(products)
        dispatch(setProductsByCategory({products, currentCategory}))
    }, [currentCategory, dispatch, products])*/

    useEffect(() => {
       // console.log(filteredByCategory)
        setSortValue('last')
        setSearchValue('')
        setCurrentPrice(maxPrice)

        if (currentCategory === 'All') {
            dispatch(setProductsByBrand({
                products: products,
                brand: currentBrand
            }))
        } else {
            dispatch(setProductsByBrand({
                products: products.filter((product: IProduct) => product.category === currentCategory),
                brand: currentBrand
            }))
        }

    }, [currentBrand, dispatch])
/*

    const chooseBrand = (brand: string) => {
        setCurrentBrand(brand)
        dispatch(setProductsByBrand({products: filteredResults, brand}))
    }*/

    const choosePrice = (price: any) => {
        setCurrentPrice(price)
        setSortValue('last')
        let filteredBySearchValueProducts: any[]
      //  if (searchValue !== '') {
            filteredBySearchValueProducts = products.filter((product: IProduct) => {
                return (
                    product?.name.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    product?.category.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    product?.brand.toLowerCase().includes(searchValue.toLowerCase())
                )
            })
      //  } else {
        //    filteredBySearchValueProducts = products
       // }

        const {productsArray} = conditionalProducts(filteredBySearchValueProducts, currentBrand, currentCategory)
        dispatch(setProductsByPrice({products: productsArray, price}))
    }

    const clearFilters = () => {
        setCurrentCategory('All')

        setSearchValue('')

        dispatch(setProductsByCategory({
            products,
            category: 'All'
        }))
        setCurrentBrand('All')



        setSortValue('last')
     /*   dispatch(savePriceRange({
            products
        }))*/
        setCurrentPrice(maxPrice)
    }

    useEffect(() => {

        if (maxPrice && currentPrice > maxPrice) {
            setCurrentPrice(maxPrice)
        }
        if (currentPrice === -Infinity) {
            setCurrentPrice(maxPrice)
        }
        if (minPrice && minPrice > currentPrice) {
            setCurrentPrice(maxPrice)
        }



    }, [maxPrice, minPrice])

    useEffect(() => {
        setCurrentPrice(maxPrice)
    }, [currentBrand, currentCategory])

    useEffect(() => {
       // setCurrentPrice(99999999)
    }, [])

   /* useEffect(() => {

   /!*     if (maxPrice === -Infinity) {
            setCurrentPrice(maxPrice)

        }
        console.log(maxPrice)*!/
    }, [])*/


    return (
        <div>
            <h2 className={`text-[22px] font-medium`}>Categories</h2>
            <div className={`mb-2 flex flex-col items-start`}>
                {
                    categoriesList.map((category, index) => (
                        <button key={index} type={'button'} onClick={() => chooseCategory(category)}
                                className={`pl-2 ${currentCategory === category ? 'border-l-2 border-green-500' : ''}`}>
                            {category}
                        </button>
                    ))
                }
            </div>
            <h2 className={`text-[22px] font-medium`}>Brand</h2>
            <div className={`mb-2`}>
                <select name="brand" value={currentBrand} onChange={(event) => setCurrentBrand(event.target.value)}
                        className={`w-1/2 rounded-[5px] p-1 border-2 border-gray-300
                           focus:border-blue-500 outline-none appearance-none cursor-pointer`}>
                    {
                        brandsList?.map((brand, index) => (
                            <option key={index} value={brand}>{brand}</option>
                        ))
                    }
                </select>
            </div>
            <h2 className={`text-[22px] font-medium`}>Price</h2>
            <p>{currentPrice}$</p>
            <div className={`mb-4`}>
                {minPrice}
                <input type="range" name={'price'} min={typeof minPrice === "number" ? minPrice : 1}
                       max={typeof maxPrice === "number" ? maxPrice : 1500}
                value={currentPrice} onChange={(e) => choosePrice(e.target.value)}/>

                {maxPrice}
            </div>
            <button onClick={() => clearFilters()}
                className={`text-[22px] bg-blue-500 text-white px-4 py-1 rounded
            hover:bg-blue-600 transition-all duration-300 ease-in-out`}>Clear Filter</button>
        </div>
    );
};

export default ProductsFilters;