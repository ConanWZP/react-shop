import {useAppSelector} from "./customHooks";
import {useNavigate} from "react-router-dom";


export const useRedirectToCart = (includedElement: string, redirectTo: string) => {

    const {previousURL} = useAppSelector(state => state.cart)
    const navigate = useNavigate()

    const redirectionFunc = () => {
        if (previousURL.includes(includedElement)) {
            navigate(redirectTo)
        } else {
            navigate('/')
        }
    }

    return redirectionFunc

}