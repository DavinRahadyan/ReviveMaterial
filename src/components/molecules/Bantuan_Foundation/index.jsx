// ../molecules/FloorCementEstimate/index.jsx
import React, { useState, useEffect } from "react";
import CementIcon from "@assets/images/Cement.svg";

const FloorCementEstimate = () => {

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mr-60  w-3/4">
      <h2 className="mb-6 text-xl font-bold md:text-2xl text-center">
        Estimasi Semen Pondasi
      </h2>
        <div className="flex flex-col items-center justify-center w-full">
          <img
            src={CementIcon}
            alt="Cement Icon"
            className="w-24 mb-4 md:w-36"
          />
            <p className="mb-5 text-black text-sm text-justify md:text-base lg:text-lg">
              Fitur ini merupakan fitur yang dapat membantu dalam menghitung kebutuhan semen 
              dan biaya yang harus dikeluarkan. Beberapa hal, perlu diperhatikan dalam mengimplentasikan
              estimasi semen pondasi dengan memastikan ukuran panjang x lebar suatu ruangan harus sesuai dan dalam satuan meter.
            </p>
        </div>
    </div>
  );
};

export default FloorCementEstimate;