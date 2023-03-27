import React, {FC, useState} from 'react';

interface ChangingOrderStatusProps {
    loading: boolean
}

const ChangingOrderStatus:FC<ChangingOrderStatusProps> = ({loading}) => {

    const existedStatus: string[] = [
        'The order was created',
        'Proceeded',
        'On the way',
        'Delivered'
    ]

    const [status, setStatus] = useState<any>()

    const changeStatus = (e: any) => {
        setStatus(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div className={`pt-4 rounded-[10px] border border-slate-400`}>
            <h2 className={`text-[26px] font-[600]`}>Change order status</h2>
            <select required name={'category'} value={status} onChange={changeStatus}
                    className={`w-[50%] rounded-[10px] p-3 border-2 border-gray-300 text-[22px]
                           focus:border-blue-500 outline-none  cursor-pointer max-[970px]:w-full`}>
                {loading ?
                    <option value={''} disabled>Loading...</option>
                    :
                    <>
                        <option value={''} disabled>
                            -- empty --
                        </option>
                        {existedStatus.map((status: any, index: number) =>
                            <option key={index} value={status}>
                                {status}
                            </option>
                        )}
                    </>
                }
            </select>
        </div>
    );
};

export default ChangingOrderStatus;