import React from 'react';

const ContactPage = () => {
    return (
        <section className={'flex-auto w-full'}>
            <div className={`max-w-[1280px] mx-auto pt-16`}>
                <h2 className={`text-[32px] font-bold`}>Contact us</h2>
                <div className={`flex gap-3 justify-between`}>
                    <form className={`rounded-[8px] shadow-lg border border-slate-300 p-3 w-[500px]`}>
                        <div className={`flex flex-col gap-1 mb-4`}>
                            <label>Name:</label>
                            <input type="text" className={`text-[20px] w-full p-2 rounded-[6px] bg-white border-2 border-gray-300 outline-none focus:border-blue-500 `}/>
                        </div>
                        <div className={`flex flex-col gap-1 mb-4`}>
                            <label>Email:</label>
                            <input type="email" className={`text-[20px] w-full p-2 rounded-[6px] bg-white border-2 border-gray-300 outline-none focus:border-blue-500 `}/>
                        </div>
                        <div className={`flex flex-col gap-1 mb-4`}>
                            <label>Title:</label>
                            <input type="text" className={`text-[20px] w-full p-2 rounded-[6px] bg-white border-2 border-gray-300 outline-none focus:border-blue-500 `}/>
                        </div>
                        <div className={`flex flex-col gap-1 mb-4`}>
                            <label>Message:</label>
                            <textarea rows={8} className={`w-full rounded-[10px] p-3 border-2 border-gray-300 text-[20px]
                           focus:border-blue-500 outline-none `} />
                        </div>
                        <button className={`bg-blue-500 text-white text-[22px] px-5 py-1 rounded hover:bg-blue-600 transition-all duration-300 ease-in-out`}>Send</button>
                    </form>


                    <div className={`bg-gray-400 text-white rounded w-[500px] p-3`}>
                        <h2 className={`text-[22px] font-medium`}>Info about us</h2>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ContactPage;