import { useContext } from "react";
import useData from "../hooks/useData";
import { AuthContext } from "../Providers/AuthProvider";
import MyArt from "../components/MyArt";

const MyCrafts = () => {
  const { user } = useContext(AuthContext);
  const { data, loading } = useData(`/my-arts/${user.email}`);
  console.log(data);

  return loading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <section className="my-crafts py-8">
      <h2 className="text-3xl font-bold mb-6">My crafts</h2>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <MyArt key={item._id} props={item} />
        ))}
      </div>
    </section>
  );
};

export default MyCrafts;
