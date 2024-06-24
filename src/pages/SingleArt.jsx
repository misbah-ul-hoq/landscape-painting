import { useParams } from "react-router-dom";
import useData from "../hooks/useData";

const SingleArt = () => {
  const id = useParams().id;
  const { loading, data } = useData(`/arts/${id}`);

  const {
    image,
    itemName,
    subcategoryName,
    description,
    price,
    rating,
    customization,
    processingTime,
    stockStatus,
    userEmail,
    userName,
  } = data;
  return loading ? (
    <span className="loading loading-dots loading-lg"></span>
  ) : (
    <div className="space-y-4">
      <img src={image} alt="" />
      <h2 className="text-3xl font-bold">{itemName}</h2>
      <p>{subcategoryName}</p>
      <p>{description}</p>
      <p>{price}</p>
      <p>{rating}</p>
      <p>{customization}</p>
      <p>{processingTime}</p>
      <p>{stockStatus}</p>
      <p>Users email: {userEmail}</p>
      <p>Posted By: {userName}</p>
    </div>
  );
};

export default SingleArt;
