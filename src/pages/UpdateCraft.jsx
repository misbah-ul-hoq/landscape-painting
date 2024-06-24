import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useData from "../hooks/useData";
import { baseURL } from "../functions/fetchURL";
import Swal from "sweetalert2";

const UpdateCraft = () => {
  const id = useLocation().pathname.replace("/arts/update/", "/arts/");
  const { data, loading } = useData(id);
  const {
    _id,
    image,
    itemName,
    subcategoryName,
    description,
    price,
    rating,
    customization,
    processingTime,
    stockStatus,
  } = data;

  const [formData, setFormData] = useState({
    image: "",
    itemName: "",
    subcategoryName: "",
    description: "",
    price: "",
    rating: "",
    customization: "",
    processingTime: "",
    stockStatus: "",
  });

  useEffect(() => {
    if (!loading && data) {
      setFormData({
        image,
        itemName,
        subcategoryName,
        description,
        price,
        rating,
        customization,
        processingTime,
        stockStatus,
      });
    }
  }, [loading, data]);

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${baseURL}/arts/update/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount === 1) {
          Swal.fire({
            title: "Update successfull",
            icon: "success",
            text: "Info updated successfully. ",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error:" + error.message,
          confirmButtonText: "Close",
        });
      });
  };

  return loading ? (
    <span className="loading loading-ring loading-lg"></span>
  ) : (
    <div className="max-w-xl mx-auto mt-10 p-8 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={image}
            value={formData.image}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            name="itemName"
            defaultValue={itemName}
            value={formData.itemName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Subcategory Name</label>
          <input
            type="text"
            name="subcategoryName"
            defaultValue={subcategoryName}
            value={formData.subcategoryName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700"> Description</label>
          <textarea
            name="description"
            value={formData.description}
            defaultValue={description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            defaultValue={price}
            value={formData.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Rating</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            defaultValue={rating}
            value={formData.rating}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Customization</label>
          <div className="mt-1">
            <label
              className="inline-flex items-center"
              onClick={() =>
                setFormData({
                  ...formData,
                  customization: "yes",
                })
              }
            >
              <input
                type="radio"
                name="customization"
                checked={formData.customization === "yes"}
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>

            <label
              className="inline-flex items-center ml-6"
              onClick={() =>
                setFormData({
                  ...formData,
                  customization: "no",
                })
              }
            >
              <input
                type="radio"
                name="customization"
                checked={formData.customization === "no"}
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-gray-700">Processing Time</label>
          <input
            type="text"
            name="processingTime"
            defaultValue={processingTime}
            value={formData.processingTime}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Stock Status</label>
          <select
            name="stockStatus"
            defaultValue={stockStatus}
            value={formData.stockStatus}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          >
            <option value="In stock">In stock</option>
            <option value="Made to Order">Made to Order</option>
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCraft;
