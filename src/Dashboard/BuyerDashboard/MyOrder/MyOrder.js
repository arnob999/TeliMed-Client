import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../../component/Loading/Loading';


const MyOrder = () => {
    const { user } = useContext(AuthContext);
    const { data: myOrders, isLoading, refetch } = useQuery({
        queryKey: ["myOrders"],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/booking/${user?.email}`, {
                    headers: {
                        authorization: `bearrer ${localStorage.getItem('accessToken')}`
                    }
                })

                const data = await res.json();

                return data;
            }

            catch (err) {
                console.error(err)
            }

        }
    })


    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="overflow-x-auto w-full mx-7">
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Price</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        myOrders.map((myOrder, i) =>
                            <tr key={myOrder._id}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={myOrder.pic} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-black">{myOrder.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className='font-bold'>
                                    {myOrder.price}Tk.
                                </td>

                                {/* <td>
                                    {
                                        myOrder.payment === "false"
                                            ?
                                            <Link to={`/dashboard/payment/${myOrder._id}`}>
                                                <button className="btn btn-ghost btn-xs bg-violet-500 text-white hover:bg-violet-600">Pay</button>
                                            </Link>
                                            :
                                            <p className='text-green-600 font-semibold text-sm'>Paid</p>
                                    }
                                </td> */}
                            </tr>
                        )
                    }

                </tbody>



            </table>
        </div>
    );
};

export default MyOrder;


// <input type="checkbox" id="deleteProduct" className="modal-toggle" />
//                                     <div className="modal">
//                                         <div className="modal-box">
//                                             <h3 className="font-bold text-lg">Are You Sure to delete these seller?</h3>
//                                             <p className="py-4">Note: This Action cannot be undone</p>
//                                             <div className="modal-action">
//                                                 <label htmlFor="deleteProduct">
//                                                     <button htmlFor="deleteProduct" onClick={() => { handleDeleteProduct(myOrder._id) }} className="btn btn-ghost btn-xs bg-red-600 text-white hover:bg-red-700">Delete</button>
//                                                 </label>

//                                                 <label htmlFor="deleteProduct" className="btn btn-xs mt-[2px]">Cancel</label>
//                                             </div>
//                                         </div>
//                                     </div>




// <label htmlFor="deleteProduct">Delete</label>