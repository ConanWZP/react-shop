import React, {FC} from 'react';

interface AdminInfoBlockProps {
    title: string,
    number: number | string,
    icon: any,
    extraStyles: any

}

const AdminInfoBlock:FC<AdminInfoBlockProps> = ({title, icon, number, extraStyles}) => {
    return (
        <div className={`w-full max-w-[300px]`}>
            <div className={`shadow-md border border-slate-400 text-[18px] rounded px-3 py-0.5 ${extraStyles}`}>
                <h2 className={`mb-1 font-medium`}>{title}</h2>
                <span className={`flex justify-between items-center`}>
                    <h3>{number}</h3>
                    {icon}
                </span>
            </div>
        </div>
    );
};

export default AdminInfoBlock;