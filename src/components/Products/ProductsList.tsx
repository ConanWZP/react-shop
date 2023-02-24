import React, {FC, useState} from 'react';
import { BsGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import SearchInput from "../MiniComponents/SearchInput";
import {IProduct} from "../Admin/ListGoods";
import ProductItem from "./ProductItem";

interface IProductsListProps {
    products: IProduct[]
}

const ProductsList:FC<IProductsListProps> = ({products}) => {



    const [isGrid, setIsGrid] = useState(true)

    return (
        <div className={'w-full'} id={'product'}>
            <div className={'w-full border-b-2 border-slate-400 flex justify-between items-center mb-6'}>

                <div className={'flex gap-3 mb-1 items-center'}>
                    <FaThList size={22} className={`cursor-pointer ${!isGrid ? 'text-green-500' : ''}`} onClick={() => setIsGrid(false)} />
                    <BsGridFill size={22} className={`cursor-pointer ${isGrid ? 'text-green-500' : ''}`} onClick={() => setIsGrid(true)} />
                    <div>
                        <span>6</span> products were found
                    </div>
                </div>

                <div className={'mb-1'}>
                    <SearchInput />
                </div>

                <div className={'mb-1'}>
                    <span className={'font-bold'}>Sort by: </span>
                    <select className={`w-[10vw] rounded-[5px] p-1 border-2 border-gray-300
                           focus:border-blue-500 outline-none appearance-none cursor-pointer`}>
                        <option value="last">Latest</option>
                        <option value="low-price">Lowest Price</option>
                        <option value="high-price">Highest Price</option>
                        <option value="a-z">A - Z</option>
                        <option value="z-a">Z - A</option>
                    </select>
                </div>
            </div>


            <div className={isGrid ? `grid grid-cols-3 gap-2 mb-4 ` : `flex flex-col gap-4 mb-4`}>
                {
                    products.length > 0 ?
                            products.map((product) => (
                               /* <div key={product.id}>*/
                                    <ProductItem key={product.id} product={product} isGrid={isGrid} />
                               /* </div>*/
                            ))
                        :
                        <span>There are no goods</span>
                }
            </div>
        </div>
    );
};

export default ProductsList;