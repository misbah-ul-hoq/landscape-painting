import { Link } from "react-router-dom";
import useArts from "../hooks/useArts";

const AllCrafts = () => {
  const { data, loading } = useArts();
  return loading ? (
    <span className="loading loading-ring loading-lg"></span>
  ) : (
    <section className="py-8">
      <h2 className="text-3xl font-bold">All Arts</h2>
      <div className="cards-wrapper grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div key={item._id} className="card h-56 image-full max-w-96">
            <figure>
              <img src={item?.image} alt="Shoes" className="h-full w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item?.itemName}</h2>
              <p>{item?.description}</p>
              <div className="card-actions justify-end">
                <Link to={`/arts/${item._id}`} className="btn btn-primary">
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllCrafts;
