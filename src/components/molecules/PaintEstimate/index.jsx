import React, { useState, useEffect } from "react";
import { useBudget } from "@components/atoms/BudgetContext";
import PaintIcon from "@assets/images/Cat.jpg";
import Swal from "sweetalert2";
import CostHistoryPaint from "@components/atoms/CostHistoryPaint";
import axios from "axios";
import Cookies from "js-cookie";

const PaintEstimate = () => {
  const { addCatEstimate } = useBudget();
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [doorHeight, setDoorHeight] = useState("");
  const [doorWidth, setDoorWidth] = useState("");
  const [doorCount, setDoorCount] = useState("");
  const [windowHeight, setWindowHeight] = useState("");
  const [windowWidth, setWindowWidth] = useState("");
  const [windowCount, setWindowCount] = useState("");
  const [paintPrice, setPaintPrice] = useState(300000); // Harga fixed 
  const [color, setColor] = useState("White");
  const [priceOption, setPriceOption] = useState("fixed");
  const [customPrice, setCustomPrice] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("catEstimateHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("catEstimateHistory", JSON.stringify(history));
  }, [history]);

  const fetchCatEstimates = async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:8000/api/users/list_estimasi_cat/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const data = response.data;
        setHistory(data);
        localStorage.setItem("catEstimateHistory", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching cat estimates:", error);
      }
    } else {
      console.error("Authentication token not found.");
    }
  };

  useEffect(() => {
    fetchCatEstimates();
  }, []);

  const paintCoverage = 10; // m² per liter, fixed value as per example

  const wallArea = length && width ? length * width : 0;
  const doorArea = doorHeight && doorWidth ? doorHeight * doorWidth * doorCount : 0;
  const windowArea = windowHeight && windowWidth ? windowHeight * windowWidth * windowCount : 0;
  const totalPaintArea = Math.max(0, wallArea - (doorArea + windowArea));
  const litersRequired = totalPaintArea / paintCoverage;

  // Calculate total cost considering paint packaging
  const paintPackageVolume = 2.5; // liters per package
  const selectedPaintPrice = priceOption === "custom" ? customPrice : paintPrice;
  const totalPackagesRequired = Math.ceil(litersRequired / paintPackageVolume);
  const estimatedCost = totalPackagesRequired * selectedPaintPrice;

  const handleLengthChange = (e) => setLength(e.target.value === "" ? "" : Number(e.target.value));
  const handleWidthChange = (e) => setWidth(e.target.value === "" ? "" : Number(e.target.value));
  const handleDoorHeightChange = (e) => setDoorHeight(e.target.value === "" ? "" : Number(e.target.value));
  const handleDoorWidthChange = (e) => setDoorWidth(e.target.value === "" ? "" : Number(e.target.value));
  const handleDoorCountChange = (e) => setDoorCount(e.target.value === "" ? "" : Number(e.target.value));
  const handleWindowHeightChange = (e) => setWindowHeight(e.target.value === "" ? "" : Number(e.target.value));
  const handleWindowWidthChange = (e) => setWindowWidth(e.target.value === "" ? "" : Number(e.target.value));
  const handleWindowCountChange = (e) => setWindowCount(e.target.value === "" ? "" : Number(e.target.value));
  const handlePaintPriceChange = (e) => setPaintPrice(e.target.value === "" ? "" : Number(e.target.value));
  const handleColorChange = (e) => setColor(e.target.value);
  const handlePriceOptionChange = (e) => setPriceOption(e.target.value);
  const handleCustomPriceChange = (e) => setCustomPrice(e.target.value === "" ? "" : Number(e.target.value));

  const handleAddEstimate = async () => {
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
    const timestamp = currentDateTime.toISOString();

    const newEstimate = {
      length: parseFloat(length),
      width: parseFloat(width),
      doorSize: parseFloat(doorArea),
      windowsSize: parseFloat(windowArea),
      pricePerLiter: parseFloat(selectedPaintPrice),
      color,
      qty: Math.ceil(litersRequired),
      price: parseFloat(estimatedCost),
      created_at: timestamp,
    };

    const token = Cookies.get("token");
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/save_estimasi_cat/",
          newEstimate,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (response.status === 201) {
          setHistory([...history, response.data]);
          localStorage.setItem("catEstimateHistory", JSON.stringify([...history, response.data]));

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Estimasi biaya cat berhasil disimpan.",
            toast: true,
            position: "top-right",
            timer: 3000,
            showConfirmButton: false,
          });

          // Clear the input fields
          setLength("");
          setWidth("");
          setDoorHeight("");
          setDoorWidth("");
          setDoorCount("");
          setWindowHeight("");
          setWindowWidth("");
          setWindowCount("");
          setPaintPrice(300000); // reset to default fixed price
          setCustomPrice("");
          setColor("Grey");
          setPriceOption("fixed");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menyimpan estimasi.",
          toast: true,
          position: "top-right",
          timer: 3000,
          showConfirmButton: false,
        });
        console.error("Error saving estimate:", error.response.data); // Logging the error response
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Token otentikasi tidak ditemukan.",
        toast: true,
        position: "top-right",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const colorMap = {
    Grey: "#B0B0B0",
    White: "#FFFFFF",
    Blue: "#0000FF",
    Brown: "#A52A2A",
    Red: "#FF0000",
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md md:p-6">
      <h2 className="mb-6 text-xl font-bold md:text-2xl">Estimasi Cat</h2>
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
            <label className="block text-gray-700">
              Pintu (Jumlah, Tinggi x Lebar) (m)
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                className="w-1/3 p-2 border rounded"
                value={doorCount}
                onChange={handleDoorCountChange}
                placeholder="1"
              />
              <input
                type="number"
                className="w-1/3 p-2 border rounded"
                value={doorHeight}
                onChange={handleDoorHeightChange}
                placeholder="Tinggi"
              />
              <input
                type="number"
                className="w-1/3 p-2 border rounded"
                value={doorWidth}
                onChange={handleDoorWidthChange}
                placeholder="Lebar"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Jendela (Jumlah, Tinggi x Lebar) (m)
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                className="w-1/3 p-2 border rounded"
                value={windowCount}
                onChange={handleWindowCountChange}
                placeholder="1"
              />
              <input
                type="number"
                className="w-1/3 p-2 border rounded"
                value={windowHeight}
                onChange={handleWindowHeightChange}
                placeholder="Tinggi"
              />
              <input
                type="number"
                className="w-1/3 p-2 border rounded"
                value={windowWidth}
                onChange={handleWindowWidthChange}
                placeholder="Lebar"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Warna Cat</label>
            <select
              className="w-full p-2 border rounded"
              value={color}
              onChange={handleColorChange}
            >
              {/* <option value="Grey">Abu-abu</option> */}
              <option value="White">Putih</option>
              <option value=" ">Segera Datang</option>
              {/* <option value="Blue">Biru</option>
              <option value="Brown">Cokelat</option>
              <option value="Red">Merah</option> */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Harga Cat</label>
            <div className="flex space-x-2">
              <select
                className="w-1/2 p-2 border rounded"
                value={priceOption}
                onChange={handlePriceOptionChange}
              >
                <option value="fixed">Harga Tetap</option>
                <option value="custom">Harga Kustom</option>
              </select>
              {priceOption === "fixed" ? (
                <select
                  className="w-1/2 p-2 border rounded"
                  value={paintPrice}
                  onChange={handlePaintPriceChange}
                >
                  <option value={300000}>300,000</option>
                  {/* <option value={450000}>450,000</option>
                  <option value={500000}>500,000</option> */}
                </select>
              ) : (
                <input
                  type="number"
                  className="w-1/2 p-2 border rounded"
                  value={customPrice}
                  onChange={handleCustomPriceChange}
                  placeholder="Harga Kustom"
                />
              )}
            </div>
          </div>
        </div>
        {/* <div className="w-full md:w-1/2">
          <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
            <h3 className="mb-4 text-lg font-bold">Estimasi Biaya Cat</h3>
            <div className="mb-4">
              <p className="text-gray-700">Area Dicat: {totalPaintArea.toFixed(2)} m²</p>
              <p className="text-gray-700">Jumlah Cat Diperlukan: {litersRequired.toFixed(2)} liter</p>
              <p className="text-gray-700">
                Paket Cat Diperlukan: {totalPackagesRequired} paket (2.5 liter/paket)
              </p>
              <p className="text-gray-700">
                Harga Cat per Liter: Rp {selectedPaintPrice.toLocaleString()}
              </p>
            </div>
            <div className="text-xl font-bold text-green-500 md:text-2xl">
              Rp {estimatedCost.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <CostHistoryPaint history={history} />
    </div> */}
     <div className="flex flex-col items-center w-full md:w-1/2">
          <img src={PaintIcon} alt="Paint Icon" className="w-24 mb-4 md:w-36" />
          <div className="text-center">
            <div
              className="w-24 h-24 m-auto mb-4 rounded-lg shadow-lg shadow-slate-600 md:w-36"
              style={{ backgroundColor: colorMap[color] }}
            ></div>         
            <div className="mb-4 text-2xl font-bold md:text-4xl">            
              {litersRequired.toFixed(2)} Liter
            </div>
            <div className="text-xl text-gray-700 md:text-2xl">
              Estimasi Biaya
            </div>
            <div className="text-xl font-bold text-green-500 md:text-2xl">
              Rp {estimatedCost.toLocaleString()}
            </div>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={handleAddEstimate}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      <CostHistoryPaint history={history} setHistory={setHistory} />
    </div>
  );
};

export default PaintEstimate;
