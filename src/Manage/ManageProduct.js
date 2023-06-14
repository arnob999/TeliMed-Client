import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const ManageProduct = () => {
  //nirdishto id ashtese
  const { id } = useParams()

  const [products, setProducts] = useState({})
  const { _id, name, img, desc, price, quan, sellerEmail, sellerName } = products

  //useForm hook
  const { register, handleSubmit } = useForm()

  //for showing default value
  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then((res) => res.json())
      .then(data => {
        setProducts(data)
        console.log(products)
      })
  }, [])

  const handleAddProduct = data => {
    const formData = data;
    // formData.quan = parseInt(formData.quantity)
    console.log(formData)

    fetch('http://localhost:5000/product', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem("accessToken")}`
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        alert("Product Added")
      })
  }
  console.log(id)
  return (
    <div className="py-10">
      <div class="w-full mx-auto max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img class="object-cover w-full h-44" src={img} alt="avatar" />

        <div class="py-3 font-serif font-semibold text-black dark:text-white text-center">
          {name}
        </div>

        <form className='' onSubmit={handleSubmit(handleAddProduct)}>
          <div className='flex justify-around mb-3'>
            <div className="form-control w-full max-w-[250px]">
              <label className="label">
                <span className="label-text text-black dark:text-white ">Name</span>
              </label>
              <input type="text" placeholder="" defaultValue={name} className="input input-bordered input-sm rounded-md"  {...register("name", {
                required: "Product Name is required"
              })} />
            </div>

          </div>

          <div className='flex justify-around mb-3'>
            <div className="form-control w-full max-w-[250px]">
              <label className="label">
                <span className="label-text text-black dark:text-white">Product Image URL</span>
              </label>
              <input type="text" placeholder="" defaultValue={img} className="input input-bordered input-sm rounded-md"  {...register("img", {
                required: "Photo URL is required"
              })} />
            </div>
          </div>


          <div className='flex justify-around mb-3'>



            <div className="form-control w-full max-w-[250px]">
              <label className="label">
                <span className="label-text text-black dark:text-white">Product Description</span>
              </label>
              <input type="text" placeholder="" defaultValue={desc} className="input input-bordered input-sm rounded-md"  {...register("desc", {
                required: "Description is required"
              })} />
            </div>
          </div>


          <div className='flex justify-around mb-3'>

            <div className="form-control w-full max-w-[250px]">
              <label className="label">
                <span className="label-text text-black dark:text-white">Quantity</span>
              </label>
              <input type="number" defaultValue={quan} placeholder="" className="input input-bordered input-sm rounded-md"  {...register("quan", {
                valueAsNumber: true,
              })} />
            </div>
          </div>







          <div className='flex justify-around mb-3'>



            <div className="form-control w-full max-w-[250px]">
              <label className="label">
                <span className="label-text text-black dark:text-white">Price (in Tk)</span>
              </label>
              <input type="number" placeholder="" defaultValue={price} className="input input-bordered input-sm rounded-md"  {...register("price", {
                required: "Asking Price here"
              })} />
            </div>
          </div>



          <div className='flex justify-center mt-7 mb-4'>
            <input className='btn btn-sm rounded-lg bg-lime-500 hover:bg-lime-400 text-black dark:text-white' value="Update Product" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageProduct;