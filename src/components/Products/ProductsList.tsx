import React, {FC, useEffect, useState} from 'react';
import {BsGridFill, BsSearch} from 'react-icons/bs';
import {FaThList} from 'react-icons/fa';
import SearchInput from "../MiniComponents/SearchInput";
import {IProduct} from "../Admin/ListGoods";
import ProductItem from "./ProductItem";
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import {searchProducts, sortProductsBy} from '../../redux/slices/filtersSlice';
import conditionalProducts from "./conditionalProducts";
import Pagination from "../Pagination/Pagination";
import styles from './productsList.module.scss'
import {AiFillFilter, AiOutlineClose, AiOutlineSortAscending} from 'react-icons/ai';

interface IProductsListProps {
    products: IProduct[],
    setSearchValue: (e: string) => void,
    searchValue: string,
    setSortValue: (e: string) => void,
    sortValue: string,
    //setCurrentCategory: (e: string) => void,
    currentCategory: string,
    // setCurrentBrand: (e: string) => void,
    currentBrand: string,
    setCurrentPrice: (e: any) => void,
    currentPrice: any,
    productListRef: any,
    setHideFilters: (e: boolean) => void,
    hideFilters: boolean

}

const ProductsList: FC<IProductsListProps> = ({
                                                  products,
                                                  sortValue,
                                                  setSortValue,
                                                  setSearchValue,
                                                  searchValue,
                                                  currentCategory,
                                                  currentBrand,
                                                  setCurrentPrice,
                                                  currentPrice,
                                                  productListRef,
                                                  setHideFilters,
                                                  hideFilters
                                              }) => {

    const dispatch = useAppDispatch()


    const {filteredResults} = useAppSelector(state => state.filters)
    // const {maxPrice} = useAppSelector(state => state.product)

    const [isGrid, setIsGrid] = useState(true)
    const [openedSorts, setOpenedSorts] = useState(false)
    const [openedSearch, setOpenedSearch] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [numberDisplayedProducts, setNumberDisplayedProducts] = useState(3)

    const lastProductIndexOfCurrentPage = currentPage * numberDisplayedProducts
    const firstProductIndexOfCurrentPage = lastProductIndexOfCurrentPage - numberDisplayedProducts

    const productsResult = filteredResults.slice(firstProductIndexOfCurrentPage, lastProductIndexOfCurrentPage)


    if (openedSearch) {
        document.body.classList.add(`${styles.locked}`)
    } else {
        document.body.classList.remove(`${styles.locked}`)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [filteredResults])


    useEffect(() => {

        let filteredByPriceProducts: any[]

        //   if (searchValue !== '') {
        filteredByPriceProducts = products.filter((product) => product.price <= currentPrice)
        //  } else {
        //     filteredByPriceProducts = products
        // }


        const {productsArray} = conditionalProducts(filteredByPriceProducts, currentBrand, currentCategory)
        setSortValue('last')
        dispatch(searchProducts({
            products: productsArray,
            searchValue
        }))

    }, [searchValue, dispatch, currentPrice])


    useEffect(() => {
        dispatch(sortProductsBy({
            products: filteredResults,
            sortValue
        }))
    }, [sortValue, dispatch])

    if (products.length === 0) {
        return <div>Nothing weren't found</div>
    }

    return (
        <div className={'w-full'} id={'product'}>
            <div className={'w-full border-b-2 border-slate-400 flex justify-between items-center mb-6 max-[970px]:justify-center'}>

                <div className={'flex gap-3 mb-1 items-center '}>
                    <div className={`flex gap-3 items-center`}>
                        <FaThList size={22} className={`cursor-pointer ${!isGrid ? 'text-green-500' : ''}`}
                                  onClick={() => setIsGrid(false)}/>
                        <BsGridFill size={22} className={`cursor-pointer ${isGrid ? 'text-green-500' : ''}`}
                                    onClick={() => setIsGrid(true)}/>
                    </div>

                    <div>
                        <span>{filteredResults?.length}</span> products were found
                    </div>
                </div>

                <div className={'mb-1 max-[970px]:hidden'}>
                    <SearchInput setSearchValue={setSearchValue} searchValue={searchValue}/>
                </div>

                <div className={'mb-1 flex items-center gap-1 max-[970px]:hidden'}>
                    <div className={'font-bold '}>Sort by:</div>
                    <select value={sortValue} onChange={(e) => setSortValue(e.target.value)}
                            className={`rounded-[5px] p-1 border-2 border-gray-300
                           focus:border-blue-500 outline-none cursor-pointer`}>
                        <option value="last">Latest</option>
                        <option value="low-price">Lowest Price</option>
                        <option value="high-price">Highest Price</option>
                        <option value="a-z">A - Z</option>
                        <option value="z-a">Z - A</option>
                    </select>
                </div>
            </div>


            <div
                className={isGrid ? `grid grid-cols-3 gap-2 mb-4 max-[720px]:grid-cols-2 min-h-[400px]` :
                    `flex flex-col gap-4 mb-4 max-[800px]:gap-3`}>


                {
                    productsResult?.length > 0 ?
                        productsResult?.map((product) => (
                            <ProductItem key={product.id} product={product} isGrid={isGrid}/>
                        ))
                        :
                        <span>There are no goods</span>
                }
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                        numberDisplayedProducts={numberDisplayedProducts} totalCountProducts={filteredResults.length}/>


            {/*{
                openedSorts ?
                    <div className={`bg-white fixed bottom-0 left-0 w-1/3 h-[200px]`}>
                        <div className={'mb-1 flex flex-col items-center gap-1'}>
                            <div className={'font-bold '}>Sort by:</div>
                            <select value={sortValue} onChange={(e) => setSortValue(e.target.value)}
                                    className={` rounded-[5px] p-1 border-2 border-gray-300
                           focus:border-blue-500 outline-none cursor-pointer`}>
                                <option value="last">Latest</option>
                                <option value="low-price">Lowest Price</option>
                                <option value="high-price">Highest Price</option>
                                <option value="a-z">A - Z</option>
                                <option value="z-a">Z - A</option>
                            </select>
                        </div>
                    </div>
                    :
                    null
            }*/}
            {
                openedSorts ?
                    <div
                        className={`min-[970px]:hidden bg-gray-100 fixed bottom-16 left-0 w-1/3 rounded-t border border-t-slate-400 border-r-slate-400`}>
                        <div className={'mb-1 flex flex-col items-center gap-1'}>
                            <div className={'font-bold '}>Sort by:</div>
                            {/*<select value={sortValue} onChange={(e) => setSortValue(e.target.value)}
                                    className={` rounded-[5px] p-1 border-2 border-gray-300
                           focus:border-blue-500 outline-none cursor-pointer`}>*/}
                            <div onClick={() => setSortValue('last')} className={`cursor-pointer`}>Latest</div>
                            <div onClick={() => setSortValue("low-price")} className={`cursor-pointer`}>Lowest Price
                            </div>
                            <div onClick={() => setSortValue("high-price")} className={`cursor-pointer`}>Highest Price
                            </div>
                            <div onClick={() => setSortValue("a-z")} className={`cursor-pointer`}>A - Z</div>
                            <div onClick={() => setSortValue("z-a")} className={`cursor-pointer pb-2`}>Z - A</div>
                            {/*</select>*/}
                        </div>
                    </div>
                    :
                    null
            }
            {
                openedSearch ?
                    <div
                        className={`min-[970px]:hidden bg-gray-100 fixed top-0 left-0 w-full h-[calc(100%_-_64px)] z-30  `}>
                        <div className={`relative h-full w-full`}>
                            <div className={`absolute top-1/4 left-0 text-center text-[22px] font-bold flex justify-center w-full`}>
                                Enter a category/brand/name
                            </div>
                            <div className={`absolute top-16 right-1 `}>
                                <AiOutlineClose size={28} className={'cursor-pointer text-black'}
                                                onClick={() => setOpenedSearch(false)}/>
                            </div>
                            <div className={'absolute bottom-1/2 left-0 w-full'}>
                                {/*<div className={`flex justify-end mb-1`}>
                                    <AiOutlineClose size={28} className={'cursor-pointer text-black'}
                                                    onClick={() => setOpenedSearch(false)}/>
                                </div>*/}
                                <SearchInput setSearchValue={setSearchValue} searchValue={searchValue}
                                             openedSearch={openedSearch} setOpenedSearch={setOpenedSearch}/>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }


            <div className={`hidden max-[970px]:flex h-16 bg-white w-full fixed bottom-0 left-0 ${styles.shadow}`}>
                <div className={`w-1/3 h-full flex flex-col justify-center cursor-pointer`}
                     onClick={() => setOpenedSorts(!openedSorts)}>
                    <div className={`flex flex-col items-center`}>
                        <AiOutlineSortAscending className={`text-[28px] text-gray-400`}/>
                        <div className={`text-[20px] text-gray-400`}>
                            Sort
                        </div>


                    </div>
                </div>
                <div className={`w-1/3 h-full flex flex-col justify-center cursor-pointer`}
                     onClick={() => setOpenedSearch(!openedSearch)}>
                    <div className={`flex flex-col items-center`}>
                        <BsSearch className={`text-[28px] text-gray-400`}/>
                        <div className={`text-[20px] text-gray-400`}>Search</div>
                    </div>
                </div>
                <div className={`w-1/3 h-full flex flex-col justify-center cursor-pointer`}
                     onClick={() => setHideFilters(!hideFilters)}>
                    <div className={`flex flex-col items-center`}>
                        <AiFillFilter className={`text-[28px] text-gray-400`}/>
                        <div className={`text-[20px] text-gray-400`}>Filters</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductsList;