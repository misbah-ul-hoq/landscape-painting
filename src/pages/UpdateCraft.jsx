import { useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateCraft = () => {
  const id = useLocation().pathname.replace("/arts/update/", "/arts/");
  console.log(id);
  const [formData, setFormData] = useState({
    image: "",
    itemName: "Sample Item",
    subcategoryName: "Sample Subcategory",
    shortDescription: "This is a short description of the item.",
    price: 100,
    rating: 4.5,
    customization: "yes",
    processingTime: "2-3 days",
    stockStatus: "In stock",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
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
            value={formData.subcategoryName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Short Description</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
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
            value={formData.rating}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Customization</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="customization"
                value="yes"
                checked={formData.customization === "yes"}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="customization"
                value="no"
                checked={formData.customization === "no"}
                onChange={handleChange}
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
            value={formData.processingTime}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Stock Status</label>
          <select
            name="stockStatus"
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
