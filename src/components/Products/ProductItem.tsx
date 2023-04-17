import React, {FC} from 'react';
import {IProduct} from "../Admin/ListGoods";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks/customHooks";
import {addProductToCart} from "../../redux/slices/cartSlice";

interface ProductItemProps {
    product: IProduct,
    isGrid: boolean
}

const ProductItem: FC<ProductItemProps> = ({product, isGrid}) => {

    const dispatch = useAppDispatch()

    const addItemToCart = (item: IProduct) => {
        dispatch(addProductToCart(item))
    }

    return (
        <div className={`shadow-md px-6 py-2 bg-white rounded-[10px] transition-all duration-300 ease-in-out w-full
        ${!isGrid ? `flex justify-between mb-1 flex-wrap hover:shadow-lg max-[1050px]:px-3 max-[720px]:px-1 max-[720px]:py-0.5` :
            'flex flex-col items-center mb-4  hover:shadow-blue-400 max-[580px]:px-1 py-1'}`}>
            <Link to={`/product/${product.id}`} className={isGrid ? `mb-4` : 'w-[20%] max-[700px]:w-[30%]'}>
                <div>
                    <img
                        className={`w-[150px] h-[150px] object-contain max-[450px]:w-[120px] max-[450px]:h-[120px] 
                        max-[380px]:w-[100px] max-[380px]:h-[100px]`}
                        src={product.imageURLs[0]} alt=""/>
                </div>
            </Link>
            <div className={`px-2 max-[580px]:px-0.5 flex-auto 
            ${!isGrid ? `w-[60%] max-[720px]:px-1 max-[700px]:w-[70%]` : ''}`}>
                <Link to={`/product/${product.id}`}
                      className={'hover:text-blue-500 transition-all duration-200 ease-in-out'}>
                    <span className={`font-bold text-[22px] max-[580px]:text-[16px] 
                    ${!isGrid ? 'max-[780px]:text-[18px]' : ''} `}>
                        {product.name}
                    </span>
                </Link>
                {isGrid ?
                    null
                    :
                    <>
                        <div className={`whitespace-wrap min-[601px]:hidden mt-4 `}>
                            {product.description.length > 80 ? `${product.description.slice(0, 80)}...` : product.description}
                        </div>
                        <div className={`whitespace-wrap min-[971px]:hidden max-[600px]:hidden mt-4 `}>
                            {product.description.length > 120 ? `${product.description.slice(0, 120)}...` : product.description}
                        </div>
                        <div className={`whitespace-wrap mt-4 max-[970px]:hidden `}>
                            {product.description.length > 170 ? `${product.description.slice(0, 170)}...` : product.description}
                        </div>

                    </>

                }


            </div>
            <div className={`flex  items-center py-2 
            ${!isGrid ? 'w-[20%] max-[700px]:w-[70%]  max-[700px]:justify-between max-[700px]:mx-auto max-[700px]:flex min-[701px]:flex-col' 
                : 'flex-col'} `}>
                <p className={'text-[24px] font-medium mb-1'}>{product.price}$</p>
                <button onClick={() => addItemToCart(product)}
                        className={`px-5 py-2 bg-green-500 text-white font-medium text-[22px] rounded-[10px] 
                transition-all duration-300 ease-in-out hover:bg-green-600 active:bg-green-700 max-[600px]:px-2 max-[600px]:py-1 
                ${!isGrid ? 'max-[1070px]:px-2' : ''}`}>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductItem;