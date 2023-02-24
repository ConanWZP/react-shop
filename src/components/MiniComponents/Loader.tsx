import React from 'react';
import loaderGif from '../../assets/svg/LoaderBalls.svg'

const Loader = () => {
    return (
        <div className={'fixed w-[100vw] h-[100vh] bg-black bg-opacity-40 z-9 top-0 left-0'}>
            <div className={'fixed left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%] z-999'}>
                <img src={loaderGif} alt="Loading......."/>
            </div>
        </div>
    );
};

export default Loader;