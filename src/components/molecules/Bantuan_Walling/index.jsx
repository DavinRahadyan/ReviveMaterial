// ../molecules/FloorCementEstimate/index.jsx
import React, { useState, useEffect } from "react";
import Kramik from "@assets/images/KeramikD.jpg";

const FloorCementEstimate = () => {

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mr-60  w-3/4">
      <h2 className="mb-6 text-xl font-bold md:text-2xl text-center">
        Estimasi Dinding
      </h2>
        <div className="flex flex-col items-center justify-center w-full">
            <img
            src={Kramik}
            alt="Kramik"
            className="w-24 mb-4 shadow-lg shadow-slate-700 md:w-36 "
            />
            <p className="mb-5 text-black text-sm text-justify md:text-base lg:text-lg">
                Fitur ini merupakan fitur yang dapat membantu dalam menghitung kebutuhan keramik pada dinding
                dan biaya yang harus dikeluarkan. Beberapa hal, perlu diperhatikan dalam mengimplentasikan
                estimasi dinding. Pertama, memastikan ukuran panjang x lebar suatu ruangan dalam satuan meter. 
                Kedua, memastikan ukuran keramik yang diinginkan 30x30, 40x40, dan 50x50. Ketiga, memasukan 
                harga keramik per paknya.
            </p>
        </div>
    </div>
  );
};

export default FloorCementEstimate;