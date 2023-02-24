import React, {FC} from 'react';
import {IProduct} from "../Admin/ListGoods";
import ShadowWrapper from "../MiniComponents/ShadowWrapper";
import {Link} from "react-router-dom";

interface ProductItemProps {
    product: IProduct,
    isGrid: boolean
}

const ProductItem:FC<ProductItemProps> = ({product, isGrid}) => {
    return (
        <div className={`shadow-md px-6 py-2 bg-white rounded-[10px]  ${!isGrid ? `flex justify-between mb-1` : 'flex flex-col  items-center mb-4'}`}>
            <Link to={`/pr`} className={isGrid ? `mb-4` : ''}>
                <div>
                    <img className={'w-[150px] h-[150px] object-contain'} src={product.imageURLs[0]} alt=""/>
                </div>
            </Link>
            <div className={`flex flex-col px-2 flex-auto`}>

                    <p className={'mb-4 font-bold text-[22px]'}>{product.name}</p>
                    {isGrid ?
                        null
                        :
                        <p className={'flex-wrap'}>
                            {product.description.length > 70 ? `${product.description.slice(0, 70)}...` : product.description}
                        </p>
                    }




            </div>
            <div className={'flex flex-col items-center py-5'}>
                <p className={'text-[22px]'}>{product.price}$</p>
                <button className={`px-5 py-2 bg-green-500 text-white font-medium text-[22px] rounded-[10px] 
                transition-all duration-300 ease-in-out hover:bg-green-600 active:bg-green-700`}>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductItem;