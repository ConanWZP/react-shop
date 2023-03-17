import axios from 'axios';
import React, {FormEvent, useEffect, useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/customHooks";
import {setBillingData} from "../../redux/slices/checkoutSlice";
import {toast} from "react-toastify";
import CheckoutInfo from "../../components/Checkout/CheckoutInfo";

const CheckoutDetailsPage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        phone: '',
        name: '',
        address: '',
        lat: 0,
        long: 0
    })

    const {name, phone, address, lat, long} = formData

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const [loadingMap, setLoadingMap] = useState(true)

    const checkAddress = async () => {

        if (address.length > 0) {
            setLoadingMap(true)
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.REACT_APP_GEOCODE_API_KEY}`)
            const data = await response.data
            setFormData({
                ...formData,
                lat: data.features[0]?.center[1] ?? 0,
                long: data.features[0]?.center[0] ?? 0
            })
            setLoadingMap(false)
        } else {
            toast.info('Fill in the address')
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await checkAddress()
        console.log(formData)
        dispatch(setBillingData(formData))
        navigate('/checkout-page')

    }

    useEffect(() => {
        setLoadingMap(true)
    }, [address])

  //  min-w-[800px] max-[900px]:min-w-[600px] max-[500px]:mx-2 max-[620px]:min-w-[300px]

    return (
        <div className={`flex-auto mt-24 mx-auto flex gap-6 min-w-[1000px] max-[1100px]:min-w-[700px] max-[1000px]:mx-2 
        max-[720px]:min-w-[450px] max-[500px]:min-w-[300px] max-[960px]:flex-col max-[960px]:relative max-[960px]:gap-1`}>
            <div className={`w-2/3 max-[960px]:w-full`}>
                <Link to={`/cart`} className={`bg-blue-500 rounded px-5 py-1 text-[18px] text-white
            transition-all duration-300 ease-in-out hover:bg-blue-600`}>{'<-'} Back to cart</Link>
                <h2 className={`text-[44px] font-bold max-[620px]:text-[30px]`}>Shipping address</h2>
                <form onSubmit={handleSubmit}>
                    <div className={`mb-4`}>
                        <label>Name</label>
                        <input type={'text'} name={'name'} value={name} onChange={handleChange} required
                               className={`text-[16px] w-full  p-2 rounded-[6px] bg-white border-2 border-gray-300 outline-none focus:border-blue-500 `}/>
                    </div>
                    <div className={`mb-4`}>
                        <label>Your phone number</label>
                        <input type={'text'} name={'phone'} value={phone} onChange={handleChange} required
                               className={`text-[16px] w-full p-2 rounded-[6px] bg-white border-2 border-gray-300 outline-none focus:border-blue-500 `}/>
                    </div>

                    <div>
                        <p className={'text-[20px] mt-[10px] mb-[5px] font-semibold'}>Address</p>
                        <textarea value={address} onChange={handleChange} required name={'address'}
                                  className={`text-[16px mb-2 w-full p-2 rounded-[6px] bg-white border-2 border-gray-300 
                              outline-none focus:border-blue-500 resize-none `}/>
                        <button type={'button'} onClick={checkAddress} className={`mb-6 bg-green-500 px-4 py-0.5 rounded text-white text-[20px] 
                    float-right transition-all duration-300 ease-in-out hover:bg-green-600 max-[500px]:w-full`}>Check address on the map</button>
                    </div>
                    {
                        loadingMap ?
                            null
                            :
                            <div className={'w-full h-[400px] max-[768px]:h-[200px] overflow-hidden mb-8 shadow-lg'}>
                                {/*@ts-ignore*/}
                                <MapContainer center={[lat, long]}
                                              zoom={13}
                                              scrollWheelZoom={false}
                                              style={{height: '100%', width: '100%', zIndex: '20'}}>
                                    {/*@ts-ignore*/}
                                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[lat, long]}>
                                        <Popup>
                                            Your shipping address.
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                    }
                    <button className={`bg-blue-500 text-white text-[22px] font-medium w-full px-6 py-1 rounded
                transition-all duration-300 ease-in-out hover:bg-blue-600 mb-4 
                max-[960px]:absolute max-[960px]:bottom-0 max-[960px]:left-0`}>Place an order</button>




                </form>
            </div>
            <div className={`w-1/3 max-[960px]:w-full max-[960px]:mb-20`}>
                <CheckoutInfo />
            </div>

        </div>
    );
};

export default CheckoutDetailsPage;