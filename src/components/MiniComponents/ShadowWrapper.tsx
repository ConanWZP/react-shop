import React, {FC} from 'react';

interface ShadowWrapperProps {
    children: any
}

const ShadowWrapper:FC<ShadowWrapperProps> = ({children}) => {
    return (
        <div className={'shadow-lg shadow-[#406bad] rounded-[10px] px-4 py-3 border border-transparent overflow-hidden'}>
            {children}
        </div>
    );
};

export default ShadowWrapper;