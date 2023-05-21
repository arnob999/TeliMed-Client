import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Loading from '../../../component/Loading/Loading';


const AllSeller = () => {
    const handleVerification = (id) => {
        console.log("Verified")
        // fetch(`http://localhost:5000/user/verification/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         authorization: `bearrer ${localStorage.getItem('accessToken')}`
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         refetch();
        //         toast.success("Seller Verified Successfully")
        //     })
    }
    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ["sellers"],
        queryFn: async () => {
            try {
                const res = await fetch("http://localhost:5000/users/authorized/seller", {
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


    const handleDeleteUser = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/user/delete/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearrer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
                toast.success("Seller Deleted Successfully")
            })

    }

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
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        sellers?.map((seller, i) => <tr key={seller._id}>
                            <td>{i + 1}</td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={seller.photoURL ? seller.photoURL : "https://cdn1.iconfinder.com/data/icons/users-pack-mino-io/24/user-3-not-allowed-512.png"} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{seller.name}</div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                {seller.email}
                            </td>

                            <td>
                                <button className="btn btn-ghost btn-xs bg-red-600 text-white hover:bg-red-700"> <label htmlFor=" deleteSeller">Delete</label></button>

                                {/* Modal */}
                                <input type="checkbox" id=" deleteSeller" className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Are You Sure to delete these seller?</h3>
                                        <p className="py-4">Note: This Action cannot be undone</p>
                                        <div className="modal-action">
                                            <label htmlFor=" deleteSeller">
                                                <button htmlFor=" deleteSeller" onClick={() => { handleDeleteUser(seller._id) }} className="btn btn-ghost btn-xs bg-red-600 text-white hover:bg-red-700">Delete</button>
                                            </label>

                                            <label htmlFor=" deleteSeller" className="btn btn-xs mt-[2px]">Cancel</label>
                                        </div>
                                    </div>
                                </div>
                            </td>

                        </tr>)
                    }

                </tbody>





            </table>
        </div>
    );
};

export default AllSeller;