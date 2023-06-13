import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const Card = (props) => {

    const { id, name, price, img, quan } = props
    const { user } = useContext(AuthContext)
    const bookingData = {
        name: name,
        price: price,
        pic: img,
        buyerEmail: user?.email,
        buyerName: user?.displayName
    }

    const orderItem = (id) => {
        console.log(id)
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(bookingData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert("Item Booked")
                }
                else {
                    alert("Unknown Error Occured")
                }

            })
    }
    return (
        <div className=' shadow rounded-md p-5 cursor-pointer hover:bg-lime-400 '>
            <img className='h-60' src={props.img} alt="" />
            <div>
                <h1 className='text-3xl font-semibold'>{props.name}</h1>
                <p className='text-xl '>Price: <span className='text-2xl font-bold'>{props.price}Tk</span></p>
                <p className='text-xl '>Remaining: <span className='text-lg font-semibold'>{quan}</span></p>
                <p className='text-md py-2'>
                    {props.desc}
                </p>

            </div>
            <div>
                <button onClick={() => { orderItem(id) }} className='px-20 py-2 block mx-auto hover:bg-orange-600 bg-green-500 text-xl text-white uppercase rounded'>Order Now</button>
            </div>
        </div>
    );
};

export default Card;