import React from "react";
import { Link } from "react-router-dom";

interface Props {
  _id: string;
  image: string;
  itemName: string;
  price: string;
  rating: string;
  customization: string;
  stockStatus: string;
}
const MyArt = ({ props }: { props: Props }) => {
  const { _id, image, itemName, price, rating, customization, stockStatus } =
    props;
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
          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyArt;
