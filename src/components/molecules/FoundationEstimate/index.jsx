import React, { useState, useEffect } from "react";
import { useBudget } from "@components/atoms/BudgetContext";
import CementIcon from "@assets/images/Cement.svg";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import CostHistoryFoundation from "@components/atoms/CostHistoryFoundation";

const FoundationCementEstimate = () => {
  const { addPondasiEstimate } = useBudget();
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [weight, setWeight] = useState(40); // kg per sack
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchEstimates = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/api/users/list_estimasi_pondasi/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setHistory(response.data);
        } catch (error) {
          console.error("Error fetching estimates:", error);
        }
      } else {
        console.error("No token found");
      }
    };

    fetchEstimates();
  }, []);

  const floorArea = length * width; // in square meters
  const cementNeededPerSqM = 10; // kg per square meter
  const totalCementNeeded = floorArea * cementNeededPerSqM; // total kg needed
  const numberOfSacks = Math.ceil(totalCementNeeded / weight);
  const pricePerSack = weight === 50 ? 72000 : 65000; // 70,000 IDR for 50 kg, 50,000 IDR for 40 kg
  const estimatedCost = numberOfSacks * pricePerSack;

  const handleLengthChange = (e) => {
    const value = e.target.value;
    setLength(value === "" ? "" : Number(value));
  };

  const handleWidthChange = (e) => {
    const value = e.target.value;
    setWidth(value === "" ? "" : Number(value));
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    setWeight(value === "" ? "" : Number(value));
  };

  const handleSaveEstimate = async () => {
    if (!estimatedCost || isNaN(estimatedCost) || estimatedCost <= 0) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Mohon masukkan data dengan benar.",
        toast: true,
        position: "top-right",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    const currentDateTime = new Date();
    const timestamp = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;

    const newEstimate = {
      length,
      width,
      weight,
      qty: numberOfSacks,
      price: estimatedCost,
      created_at: timestamp,
    };

    const token = Cookies.get("token");
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/save_estimasi_pondasi/",
          newEstimate,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setHistory([...history, response.data]);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Estimasi biaya semen pondasi berhasil disimpan.",
          toast: true,
          position: "top-right",
          timer: 3000,
          showConfirmButton: false,
        });

        // Clear the input fields
        setLength("");
        setWidth("");
        setWeight(40);
      } catch (error) {
        console.error("Error saving estimate:", error);
      }
    } else {
      console.error("User is not authenticated");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md md:p-6">
      <h2 className="mb-6 text-xl font-bold md:text-2xl">
        Estimasi Semen Pondasi
      </h2>
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <label className="block text-gray-700">Panjang (m)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={length}
              onChange={handleLengthChange}
              placeholder="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Lebar (m)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={width}
              onChange={handleWidthChange}
              placeholder="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Berat Semen (kg/sak)</label>
            <select
              className="w-full p-2 border rounded"
              value={weight}
              onChange={handleWeightChange}
            >
              <option value={40}>40 kg (Rp65.000,00)</option>
              <option value={50}>50 kg (RP72.000,00)</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2">
          <img
            src={CementIcon}
            alt="Cement Icon"
            className="w-24 mb-4 md:w-36"
          />
          <div className="text-center">
            <div className="mb-4 text-2xl font-bold md:text-4xl">
              {numberOfSacks} Sak Semen
            </div>
            <div className="text-xl text-gray-700 md:text-2xl">
              Estimasi Biaya
            </div>
            <div className="text-xl font-bold text-green-500 md:text-2xl">
              Rp {isNaN(estimatedCost) ? 0 : estimatedCost.toLocaleString()}
            </div>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={handleSaveEstimate}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <CostHistoryFoundation history={history} setHistory={setHistory} />
      </div>
    </div>
  );
};

export default FoundationCementEstimate;
