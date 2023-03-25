import React from 'react';
import {BsCart3} from 'react-icons/bs';
import {GrMoney} from 'react-icons/gr'
import {IoCartOutline} from 'react-icons/io5';
import AdminInfoBlock from "../MiniComponents/AdminInfoBlock";


const productIcon = <BsCart3 size={22} color={'#4066ad'}/>
const moneyIcon = <GrMoney size={22} color={'#5dad40'}/>
const orderIcon = <IoCartOutline size={22} color={'#ad7140'}/>


const AdminHome = () => {

    return (
        <div className={`w-full 
        flex flex-col justify-center items-center mx-auto`}>
            <h2 className={`text-[32px] font-bold text-left`}>Admin home page</h2>
            <div className={`w-full mx-auto max-w-[612px]`}>
                <div className={`flex flex-wrap gap-3`}>
                    <AdminInfoBlock number={5} title={'Products'} icon={productIcon}
                                    extraStyles={'border-b-[3px] border-b-[#4066ad]'}/>
                    <AdminInfoBlock number={10} title={'Income'} icon={moneyIcon}
                                    extraStyles={'border-b-[3px] border-b-[#5dad40]'}/>
                    <AdminInfoBlock number={2} title={'Orders'} icon={orderIcon}
                                    extraStyles={'border-b-[3px] border-b-[#ad7140]'}/>

                </div>
            </div>

        </div>
    );
};

export default AdminHome;