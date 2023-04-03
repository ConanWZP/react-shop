import React, {FormEvent, useRef} from 'react';
import {AiFillInstagram, AiFillMail, AiFillPhone} from 'react-icons/ai';
import {ImLocation2} from 'react-icons/im'
import emailjs from '@emailjs/browser';
import {toast} from "react-toastify";

const ContactPage = () => {

    const form = useRef<any>();

    const sendMessage = (e: any) => {
        e.preventDefault()

        emailjs.sendForm('service_shsa205', 'template_3esdfcb ', form.current, 'UzTeJnrM_7ukYXPiw')
            .then((result) => {
                console.log(result.text);
                toast.success('Message has been successfully sent')
            }, (error) => {
                console.log(error.text);
                toast.error(error.text)
            });
         e.target.reset()

    }

    return (
        <section className={'flex-auto w-full'}>
            <div className={`max-w-[1280px] mx-auto pt-16`}>
                <h2 className={`text-[32px] font-bold mx-2`}>Contact us</h2>
                <div className={`flex gap-3 justify-between mb-6 max-[970px]:flex-col max-[970px]:items-center mx-2`}>
                    <form ref={form} onSubmit={sendMessage}
                        className={`rounded-[8px] shadow-lg border border-slate-300 p-3 w-[600px] max-[970px]:w-full`}>
                        <div className={`flex flex-col gap-1 mb-4`}>
                            <label className={`font-medium`}>Name:</label>
                            <input type="text" name={'userName'}
                                   className={`text-[20px] w-full p-2 rounded-[6px] bg-white border-2 border-gray-300 outline-none focus:border-blue-500 `}/>
                        </div>
                        <div className={`flex flex-col gap-1 mb-4`}>
                            <label className={`font-medium`}>Email:</label>
                            <input type="email" name={'userEmail'}
                                   className={`text-[20px] w-full p-2 rounded-[6px] bg-white border-2 border-gray-300 outline-none focus:border-blue-500 `}/>
                        </div>
                        <div className={`flex flex-col gap-1 mb-4`}>
                            <label className={`font-medium`}>Title:</label>
                            <input type="text" name={'messageTitle'}
                                   className={`text-[20px] w-full p-2 rounded-[6px] bg-white border-2 border-gray-300 outline-none focus:border-blue-500 `}/>
                        </div>
                        <div className={`flex flex-col gap-1 mb-4`}>
                            <label className={`font-medium`}>Message:</label>
                            <textarea rows={8} name={'messageText'}
                                      className={`w-full rounded-[10px] p-3 border-2 border-gray-300 text-[20px]
                           focus:border-blue-500 outline-none `}/>
                        </div>
                        <button
                            className={`bg-blue-500 text-white text-[22px] px-5 py-1 rounded hover:bg-blue-600 transition-all duration-300 ease-in-out`}>Send
                        </button>
                    </form>


                    <div className={`w-[600px] max-[970px]:w-full`}>
                        <div className={`max-h-[500px] overflow-auto bg-gray-300 rounded shadow-lg border border-slate-400 p-3`}>
                            <h2 className={`text-[32px] font-[600] mb-6`}>Other our contacts</h2>
                            <div className={`text-xl`}>
                                <div className={`flex items-center mb-3 gap-1`}>
                                    <AiFillPhone/>
                                    <span>+7(946)-742-14-92</span>
                                </div>
                                <div className={`flex items-center mb-3 gap-1`}>
                                    <AiFillMail/>
                                    <span>shopper@shopper.com</span>
                                </div>
                                <div className={`flex items-center mb-3 gap-1`}>
                                    <ImLocation2/>
                                    <span>Russia, Moscow</span>
                                </div>
                                <div className={`flex items-center mb-3 gap-1`}>
                                    <AiFillInstagram/>
                                    <span>Shopper</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ContactPage;