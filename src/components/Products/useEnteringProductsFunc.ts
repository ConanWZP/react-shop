import {useAppDispatch} from "../../hooks/customHooks";
import {useEffect} from "react";



const useEnteringProductsFunc = (products: any[], currentBrand: string, currentCategory: string, dispatchName: any, extraDispatchArg?: any) => {

    const dispatch = useAppDispatch()



    debugger

    const activateHook = () => {
        if (currentCategory === 'All') {

            if (currentBrand === 'All') {



                dispatch(dispatchName({
                    products: products,
                    extraDispatchArg: extraDispatchArg
                }))


            } else {
                dispatch(dispatchName({
                    products: products.filter((product) => product.brand === currentBrand),
                    extraDispatchArg: extraDispatchArg
                }))
            }

        } else {
            if (currentBrand === 'All') {
                dispatch(dispatchName({
                    products: products.filter((product) => product.category === currentCategory),
                    extraDispatchArg: extraDispatchArg
                }))

            } else {
                dispatch(dispatchName({
                    products: products.filter((product) => product.category === currentCategory).filter((product) => product.brand === currentBrand),
                    extraDispatchArg: extraDispatchArg
                }))
            }
        }
    }

    useEffect(() => {
        activateHook()
    }, [dispatch, extraDispatchArg])


}

export default useEnteringProductsFunc