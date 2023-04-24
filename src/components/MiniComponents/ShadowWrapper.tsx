import React, {FC} from 'react';

interface ShadowWrapperProps {
    children: any
}

const ShadowWrapper:FC<ShadowWrapperProps> = ({children}) => {
    return (
        <div className={'shadow-lg shadow-[#406bad] rounded-[10px] px-4 py-3 border border-transparent overflow-hidden max-[430px]:px-2 max-[430px]:py-1 max-[800px]:shadow-none'}>
            {children}
        </div>
    );
};

export default ShadowWrapper;