import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthProvider';

const Addproduct = () => {

  const { user } = useContext(AuthContext);

  //useForm hook
  const { register, handleSubmit } = useForm()

  const handleAddProduct = data => {
    const formData = data;
    formData.sellerEmail = `${user.email}`
    formData.sellerName = `${user.displayName}`
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
  return (
    <div className='w-1/3 ml-20 rounded-xl py-7 bg-orange-300 '>

      <h3 className='text-2xl text-black text-center'>Add Product</h3>
      <form className='' onSubmit={handleSubmit(handleAddProduct)}>
        <div className='flex justify-around mb-3'>
          <div className="form-control w-full max-w-[250px]">
            <label className="label">
              <span className="label-text text-black">Name</span>
            </label>
            <input type="text" placeholder="" className="input input-bordered input-sm rounded-md"  {...register("name", {
              required: "Product Name is required"
            })} />
          </div>

        </div>

        <div className='flex justify-around mb-3'>
          <div className="form-control w-full max-w-[250px]">
            <label className="label">
              <span className="label-text text-black">Product Image URL</span>
            </label>
            <input type="text" placeholder="" className="input input-bordered input-sm rounded-md"  {...register("img", {
              required: "Photo URL is required"
            })} />
          </div>
        </div>


        <div className='flex justify-around mb-3'>



          <div className="form-control w-full max-w-[250px]">
            <label className="label">
              <span className="label-text text-black">Product Description</span>
            </label>
            <input type="text" placeholder="" className="input input-bordered input-sm rounded-md"  {...register("desc", {
              required: "Description is required"
            })} />
          </div>
        </div>


        <div className='flex justify-around mb-3'>

          <div className="form-control w-full max-w-[250px]">
            <label className="label">
              <span className="label-text text-black">Quantity</span>
            </label>
            <input type="number" placeholder="" className="input input-bordered input-sm rounded-md"  {...register("quan", {
              valueAsNumber: true,
            })} />
          </div>
        </div>







        <div className='flex justify-around mb-3'>



          <div className="form-control w-full max-w-[250px]">
            <label className="label">
              <span className="label-text text-black">Price (in Tk)</span>
            </label>
            <input type="number" placeholder="" className="input input-bordered input-sm rounded-md"  {...register("price", {
              required: "Asking Price here"
            })} />
          </div>
        </div>



        <div className='flex justify-center mt-7 mb-4'>
          <input className='btn btn-sm w-1/3 rounded-lg bg-blue-600 border-blue-600 hover:bg-blue-700 text-black' value="Add Product" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Addproduct;