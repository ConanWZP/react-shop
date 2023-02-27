import React, {FC} from 'react';
import {IProduct} from "../Admin/ListGoods";
import {Link} from "react-router-dom";

interface ProductItemProps {
    product: IProduct,
    isGrid: boolean
}

const ProductItem:FC<ProductItemProps> = ({product, isGrid}) => {
    return (
        <div className={`shadow-md px-6 py-2 bg-white rounded-[10px] transition-all duration-300 ease-in-out
        ${!isGrid ? `flex justify-between mb-1 hover:shadow-lg ` : 
            'flex flex-col items-center mb-4 hover:shadow-blue-400'}`}>
            <Link to={`/product/${product.id}`} className={isGrid ? `mb-4` : ''}>
                <div>
                    <img className={'w-[150px] h-[150px] object-contain'} src={product.imageURLs[0]} alt=""/>
                </div>
            </Link>
            <div className={`px-2 flex-auto ${!isGrid ? `max-w-[65%]` : ''}`}>
                    <Link to={`/product/${product.id}`} className={'hover:text-blue-500 transition-all duration-200 ease-in-out'}>
                    <span className={'font-bold text-[22px]'}>{product.name}</span>
                    </Link>
                    {isGrid ?
                        null
                        :
                        <div className={'whitespace-wrap mt-4'}>
                            {product.description.length > 170 ? `${product.description.slice(0, 170)}...` : product.description}
                        </div>
                    }




            </div>
            <div className={'flex flex-col items-center py-2'}>
                <p className={'text-[24px] font-medium mb-1'}>{product.price}$</p>
                <button className={`px-5 py-2 bg-green-500 text-white font-medium text-[22px] rounded-[10px] 
                transition-all duration-300 ease-in-out hover:bg-green-600 active:bg-green-700`}>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductItem;