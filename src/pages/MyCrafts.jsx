import { useContext, useEffect, useState } from "react";
import useData from "../hooks/useData";
import { AuthContext } from "../Providers/AuthProvider";
import MyArt from "../components/MyArt";

const MyCrafts = () => {
  const { user } = useContext(AuthContext);

  const { data, loading } = useData(`/my-arts/${user.email}`);

  const [arts, setArts] = useState([]);

  useEffect(() => {
    if (data) {
      setArts(data);
    }
  }, [data]);

  console.log(arts);

  return loading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <section className="my-crafts py-8">
      <h2 className="text-3xl font-bold mb-6">My crafts</h2>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {arts.length &&
          arts.map((item) => (
            <MyArt key={item._id} art={item} arts={arts} setArts={setArts} />
          ))}
      </div>
    </section>
  );
};

export default MyCrafts;
