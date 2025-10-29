"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

interface AdPhoto {
  id: number;
  imageUrl: string; // match backend
}

export default function AdPhotoSlider() {
  const [adPhotos, setAdPhotos] = useState<AdPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdPhotos = async () => {
      try {
        const res = await axios.get("https://localhost:7135/api/Ads");
        setAdPhotos(res.data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch ad photos:", err.message);
        setError("Failed to fetch ad photos");
      } finally {
        setLoading(false);
      }
    };

    fetchAdPhotos();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100 animate-pulse">
        <span className="text-lg font-semibold">Loading ad photos...</span>
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 font-semibold text-center py-10">{error}</div>
    );

  if (adPhotos.length === 0)
    return (
      <div className="text-gray-500 font-medium text-center py-10">
        No ad photos available.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-2 sm:px-4">
      <Slider {...sliderSettings}>
        {adPhotos.map((photo) => (
          <div key={photo.id} className="h-64 sm:h-80 md:h-96 relative">
            <img
              src={`https://localhost:7135/${photo.imageUrl}`}
              alt={`Ad ${photo.id}`}
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
