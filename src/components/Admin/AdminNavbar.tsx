import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {MdDashboard} from 'react-icons/md'
import {FaClipboardList} from 'react-icons/fa'
import {AiFillFileAdd} from 'react-icons/ai'
import {BsFileEarmarkCheckFill} from 'react-icons/bs'
import avatarBlank from '../../assets/img/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent (1).png'
import {useAppSelector} from "../../hooks/customHooks";
import { BiCategoryAlt } from 'react-icons/bi';

const AdminNavbar = () => {

    const {userName, avatar} = useAppSelector(state => state.auth)
    const location = useLocation()

    return (
        <div className={'flex flex-col'}>
            <div className={'w-full flex flex-col items-center pt-2 mb-3'}>
                <img className={'rounded-full w-[200px] h-[200px] object-cover mb-1'} src={avatar === '' ? avatarBlank : avatar} alt=""/>
                <span className={'text-[22px] font-bold'}>{userName}</span>
            </div>
            {/*<hr className={'h-[1px] bg-black w-full border-none'}/>*/}
            <div className={'pl-3 pt-2 pr-1 max-[600px]:pl-1.5 max-[600px]:pr-0.5'}>
                <div className={'text-[24px] text-gray-500 font-medium mb-2'}>Navigation</div>
                <div className={'text-center px-2 flex flex-col gap-4'}>
                    <Link to={'/admin/home'} className={location.pathname === '/admin/home' ? 'text-blue-500' : ''}>
                        <div className={`flex items-center gap-2`}>
                            <MdDashboard size={18} />
                            <span className={'hover:text-[18px] transition-all duration-300 ease-in-out'}>Dashboard</span>
                        </div>
                        <div className={'h-[1px] w-full bg-gray-400 px-4'}></div>
                    </Link>
                    <Link to={'/admin/list-goods'} className={location.pathname === '/admin/list-goods' ? 'text-blue-500' : ''}>
                        <div className={`flex items-center gap-2`}>
                            <FaClipboardList size={18} />
                            <span className={'hover:text-[18px] transition-all duration-300 ease-in-out'}>List Products</span>
                        </div>
                        <div className={'h-[1px] w-full bg-gray-400 px-4'}></div>
                    </Link>
                    <Link to={'/admin/add-good/add'} className={location.pathname === '/admin/add-good/add' ? 'text-blue-500' : ''}>
                        <div className={`flex items-center gap-2 `}>
                            <AiFillFileAdd size={18} />
                            <span className={'hover:text-[18px] transition-all duration-300 ease-in-out'}>Add Product</span>
                        </div>
                        <div className={'h-[1px] w-full bg-gray-400 px-4'}></div>
                    </Link>
                    <Link to={'/admin/check-orders'} className={location.pathname === '/admin/check-orders' ? 'text-blue-500' : ''}>
                        <div className={`flex items-center gap-2`}>
                            <BsFileEarmarkCheckFill size={18} />
                            <span className={'hover:text-[18px] transition-all duration-300 ease-in-out'}>Check Orders</span>
                        </div>
                        <div className={'h-[1px] w-full bg-gray-400 px-4'}></div>
                    </Link>
                    <Link to={'/admin/create-category'} className={location.pathname === '/admin/create-category' ? 'text-blue-500' : ''}>
                        <div className={`flex items-center gap-2`}>
                            <BiCategoryAlt size={18} />
                            <span className={'hover:text-[18px] transition-all duration-300 ease-in-out'}>Add Category</span>
                        </div>
                        <div className={'h-[1px] w-full bg-gray-400 px-4'}></div>
                    </Link>

                </div>


            </div>
        </div>
    );
};

export default AdminNavbar;