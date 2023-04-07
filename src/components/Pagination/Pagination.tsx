import React, {FC, useState} from 'react';
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';


interface PaginationProps {
    currentPage: number,
    setCurrentPage: (e: number) => void,
    numberDisplayedProducts: number,
    totalCountProducts: number
}

const Pagination: FC<PaginationProps> = ({
                                             currentPage,
                                             setCurrentPage,
                                             numberDisplayedProducts,
                                             totalCountProducts
                                         }) => {

    const pages = []
    const totalPages = Math.ceil(totalCountProducts / numberDisplayedProducts)

    let numberDisplayedPages = 5
    const [maxDisplayedPages, setMaxDisplayedPages] = useState(5)
    const [minDisplayedPages, setMinDisplayedPages] = useState(0)


    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    const choosePrevPage = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % numberDisplayedPages === 0 ) {
            setMaxDisplayedPages(maxDisplayedPages - numberDisplayedPages)
            setMinDisplayedPages(minDisplayedPages - numberDisplayedPages)
        }
    }


    const chooseNextPage = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > maxDisplayedPages) {
            setMaxDisplayedPages(maxDisplayedPages + numberDisplayedPages)
            setMinDisplayedPages(minDisplayedPages + numberDisplayedPages)
        }
    }




    return (
        <ul className={`flex justify-center items-center text-[20px] gap-2 mb-2`}>
            <li onClick={() => choosePrevPage()}
                className={`border border-slate-400 p-1 bg-white cursor-pointer flex
            items-center min-w-[120px] justify-center rounded-l-full hover:shadow-lg transition-all duration-300 ease-in-out
            ${currentPage === 1 ? 'hidden' : ''}`}>
                <AiOutlineLeft/>
                <div>Previous</div>
            </li>
            {pages.map((page) => {

                if (page <= maxDisplayedPages && page > minDisplayedPages) {
                    return (
                        <li key={page} onClick={() => setCurrentPage(page)}
                            className={`border border-slate-400 p-1 bg-white cursor-pointer 
                flex items-center justify-center min-w-[30px] hover:shadow-lg transition-all duration-300 ease-in-out 
                ${currentPage === page ? 'bg-green-500 text-white' : ''}`}>{page}</li>
                    )
                }


                }
            )}
            <li onClick={() => chooseNextPage()}
                className={` border border-slate-400 p-1 bg-white cursor-pointer mr-2 flex items-center 
            min-w-[120px] justify-center rounded-r-full hover:shadow-lg transition-all duration-300 ease-in-out
            ${currentPage === pages[pages.length - 1] ? 'hidden' : ''}`}>
                <div>Next</div>
                <AiOutlineRight/>
            </li>
            <p>
                <b className={`text-green-500`}>Page {currentPage}</b>
                <span> of </span>
                <b className={`text-green-500`}>{totalPages}</b>
            </p>
        </ul>
    );
};

export default Pagination;