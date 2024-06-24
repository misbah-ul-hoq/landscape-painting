// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./index.css";

// import required modules
import { EffectCards } from "swiper/modules";
import { useEffect, useState } from "react";
import { baseURL } from "../functions/fetchURL";

export default function Sliders() {
  const [loading, setLoading] = useState(false);
  const [arts, setArts] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(`${baseURL}/arts`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setArts(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  return loading ? (
    <span className="loading loading-bars loading-lg"></span>
  ) : (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {arts.map((result) => (
          <SwiperSlide key={result._id} className="bg-secondary">
            <img src={result.image} className="h-full w-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
