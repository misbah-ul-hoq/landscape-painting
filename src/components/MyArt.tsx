import React, { useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../functions/fetchURL";
import Swal from "sweetalert2";

interface Props {
  _id: string;
  image: string;
  itemName: string;
  price: string;
  rating: string;
  customization: string;
  stockStatus: string;
}
const MyArt = ({
  art,
  arts,
  setArts,
}: {
  art: Props;
  arts: any[];
  setArts: any;
}) => {
  const { _id, image, itemName, price, rating, customization, stockStatus } =
    art;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${baseURL}/arts/delete/${_id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setArts(arts.filter((item) => item._id != _id));
            if (data.deletedCount === 1) {
              Swal.fire({
                title: "Deleted Successfully",
                // text: "Art added to database",
                icon: "success",
                confirmButtonText: "Ok",
              });
            }
          });
      }
    });
  };

  return (
    <div className="max-w- bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-48 object-cover object-center"
        src={image}
        alt={itemName}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{itemName}</h2>
        <p className="text-gray-600 text-sm mb-2">Price: ${price}</p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500">
            {Array(rating).fill("⭐️").join("")}
          </span>
          <span className="text-gray-600 ml-2">({rating})</span>
        </div>
        <p className="text-gray-600 text-sm mb-2">
          Customization: {customization}
        </p>
        <p className="text-gray-600 text-sm mb-4">
          Stock Status: {stockStatus}
        </p>
        <div className="flex justify-between">
          <Link
            to={`/arts/update/${_id}`}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Update
          </Link>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyArt;
