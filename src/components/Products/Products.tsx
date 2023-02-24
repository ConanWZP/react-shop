import React, {useEffect} from 'react';
import ProductsFilters from "./ProductsFilters";
import ProductsList from "./ProductsList";
import useFetchCollection from "../../hooks/useFetchCollection";
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import {saveProducts} from "../../redux/slices/productSlice";

const Products = () => {

    const dispatch = useAppDispatch()
    const {data, loading} = useFetchCollection('products')
    const {products} = useAppSelector(state => state.product)


    useEffect(() => {
        dispatch(saveProducts(data))
    }, [data, dispatch])

    return (
        <section className={'w-full pt-5 bg-gray-50'}>
            <div className={'max-w-[1280px] mx-auto flex'}>
                <aside className={'w-1/5 transition-all duration-300 ease-in-out'}>
                    <ProductsFilters />
                </aside>
                <div className={'w-4/5 pl-2'}>
                    <ProductsList products={products} />
                </div>
            </div>
        </section>
    );
};

export default Products;