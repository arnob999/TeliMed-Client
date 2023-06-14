import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const ManageProduct = () => {
  //nirdishto id ashtese
  const { id } = useParams()

  const [products, setProducts] = useState({})
  const { _id, name, img, desc, price, quan, sellerEmail, sellerName } = products

  //useForm hook
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: name,
      img: img,
      desc: desc,
      price: price,
      quan: quan
    },
  })

  //for showing default value
  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then((res) => res.json())
      .then(data => {
        setValue('name', data.name);
        setValue('img', data.img);
        setValue('desc', data.desc);
        setValue('quan', data.quan);
        setValue('price', data.price);
        setProducts(data)
      })
  }, [])

  const handleManageProduct = data => {
    const formData = data;
    console.log(formData)
  }
  return (
    <div className="py-10">
      <div class="w-full mx-auto max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img class="object-cover w-full h-44" src={img} alt="avatar" />

        <div class="py-3 font-serif font-semibold text-black dark:text-white text-center">
          {name}
        </div>

        <form className='' onSubmit={handleSubmit(handleManageProduct)}>
          <div className='flex justify-around mb-3'>
            <div className="form-control w-full max-w-[250px]">
              <label className="label">
                <span className="label-text text-black dark:text-white ">Name</span>
              </label>
              <input type="text" placeholder="" defaultValue={name} className="input input-bordered input-sm rounded-md"  {...register("name")} />
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
              <input type="text" placeholder="" defaultValue={desc} className="input input-bordered input-sm rounded-md"  {...register("desc")} />
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
              <input type="number" placeholder="" defaultValue={price} className="input input-bordered input-sm rounded-md"  {...register("price")} />
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