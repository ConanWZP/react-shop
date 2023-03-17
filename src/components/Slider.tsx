import React, {FC, useEffect, useState} from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import {Link, NavLink} from "react-router-dom";
import styles from './slider.module.scss'

interface SliderProps {
    scrollToList: () => void
}

const Slider:FC<SliderProps> = ({scrollToList}) => {

    const [slidesData, setSlidesData] = useState([
        {
            image: 'https://i.ibb.co/sKwTvQ2/601d0a0788112.jpg',
            title: 'Furniture',
            description: 'Big sales and wide choose'
        },
        {
            image: 'https://i.ibb.co/WVrzkbk/thermador-appliance-repair-service-san-francisco-thermador-appliance-repair-pros.jpg',
            title: 'Household Appliance',
            description: 'Freeze, microwave'
        },
        {
            image: 'https://i.ibb.co/cLGn9Tx/070315ptech2.jpg',
            title: 'Office Equipment',
            description: 'keyboards, moose, add'
        },
        {
            image: 'https://i.ibb.co/s3wYdKD/desktopwallpapers-org-ua-37429.jpg',
            title: 'Devices',
            description: 'phones, tablets, computers'
        },
        {
            image: 'https://i.ibb.co/PNY9Pk9/5e575adf356eb57623f7e2bf-classic-close-up-clothes-clothing-298864.jpg',
            title: 'Fashion',
            description: 'clothes, shoes, hats'
        },
    ])

    const [currentSlide, setCurrentSlide] = useState(0)

    const swipeNext = () => {
        setCurrentSlide( currentSlide === slidesData.length - 1 ? 0 : currentSlide+1)
    }

    const swipePrevious = () => {
        setCurrentSlide( currentSlide === 0 ? slidesData.length - 1 : currentSlide-1)
    }

    useEffect(() => {
        setCurrentSlide(0)
    }, [])

    let isAuthSwipe = true
    let delayTime = 3500
    let swipeInterval: any

    useEffect(() => {
        if (isAuthSwipe) {
            const swipeSlide = () => {
                swipeInterval = setInterval(swipeNext, delayTime)
            }
            swipeSlide()
        }
        return () => clearInterval(swipeInterval)
    }, [swipeInterval, currentSlide])


    return (
        <div className={`w-full overflow-hidden relative bg-blue-200 h-[calc(100vh_-_0px)]`}>
            <AiOutlineArrowLeft className={`border-2 border-orange-600 rounded-full w-12 h-12 cursor-pointer 
            bg-transparent absolute top-1/2 left-2 text-white z-50 max-[470px]:w-10 max-[470px]:h-10
            transition-all duration-200 ease-in-out ${styles.removeHover}`} onClick={swipePrevious}/>

            <AiOutlineArrowRight className={`border-2 border-orange-600 rounded-full w-12 h-12 cursor-pointer 
            bg-transparent absolute top-1/2 right-2 text-white z-50 max-[470px]:w-10 max-[470px]:h-10
            transition-all duration-200 ease-in-out ${styles.removeHover}`} onClick={swipeNext}/>

            {slidesData.map((slide, index) => (
                <div key={index} className={currentSlide === index ?
                    `absolute top-0 left-0 w-full h-full transition-all duration-500 easy-in-out ${styles.current} `
                    : 'absolute top-0 left-0 w-full h-full opacity-0 translate-x-[-50%] transition-all duration-500 easy-in-out'}>

                    {
                        currentSlide === index ?
                            <>
                                <img src={slide.image} className={'h-full w-full'} alt={''} />
                                <div className={styles.content}>
                                    <h2 className={'text-white mb-4 text-[72px] max-[470px]:text-[56px] max-[400px]:text-[48px]'}>{slide.title}</h2>
                                    <p className={'text-white mb-4'}>{slide.description}</p>
                                    <hr className={'text-white mb-4 h-1 w-full'} />
                                    <Link to={'/#product-list'} onClick={scrollToList}
                                             className={`bg-blue-500 px-[50px] py-[8px] rounded text-white 
                                             cursor-pointer text-[24px] hover:bg-blue-600 transition-all duration-300 ease-in-out
                                             max-[470px]:text-[22px] max-[400px]:text-[20px]`}>Check</Link>
                                </div>

                            </>
                            :
                            null
                    }


                </div>
            ))}
        </div>
    );
};

export default Slider;