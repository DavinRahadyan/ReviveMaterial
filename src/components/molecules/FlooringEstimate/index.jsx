import React, { useState, useEffect } from "react";
import { useBudget } from "@components/atoms/BudgetContext";
import Kramik from "@assets/images/KeramikL.jpg";
import Swal from "sweetalert2";
import CostHistoryFloor from "@components/atoms/CostHistoryFloor";
import axios from "axios";
import Cookies from "js-cookie";

const FlooringEstimate = () => {
  const { addLantaiEstimate } = useBudget();
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [pricePerPak, setPricePerPak] = useState("105000");
  const [tileSize, setTileSize] = useState("30x30");
  const [history, setHistory] = useState([]);
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    const fetchEstimates = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/api/users/list_estimasi_lantai/", {
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

  const getTilesPerSquareMeter = (size) => {
    if (size === "30x30") {
      return 11; // 11 tiles per square meter for 30x30 cm tiles
    } else {
      const [tileWidth, tileHeight] = size
        .split("x")
        .map((dim) => parseInt(dim, 10) / 100);
      const tileArea = tileWidth * tileHeight;
      return 1 / tileArea;
    }
  };

  const roomArea = length && width ? length * width : 0; // in m²
  const tilesPerSquareMeter =
    tileSize === "30x30" ? 11 : getTilesPerSquareMeter(tileSize);
  const numberOfTiles = roomArea
    ? Math.floor(roomArea * tilesPerSquareMeter)
    : 0;
  const numberOfPacks =
    tileSize === "30x30"
      ? Math.floor(roomArea / 11)
      : Math.floor(numberOfTiles / 11); // 11 tiles per pack for 30x30 tiles
  const estimatedCost = numberOfPacks && pricePerPak ? numberOfPacks * pricePerPak : 0;

  const handleLengthChange = (e) => {
    setLength(e.target.value === "" ? "" : Number(e.target.value));
  };

  

  const handleWidthChange = (e) => {
    setWidth(e.target.value === "" ? "" : Number(e.target.value));
  };

  const handlePricePerPakChange = (e) => {
    setPricePerPak(e.target.value === "" ? "" : Number(e.target.value));
  };

  const handleTileSizeChange = (e) => {
    setTileSize(e.target.value);
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

    const newEstimate = {
      length,
      width,
      type: "keramik",
      tileSize,
      pricePerPak,
      qty: numberOfPacks,  // Menambahkan qty ke estimasi
      price: estimatedCost,
    };

    const token = Cookies.get("token");
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/save_estimasi_lantai/",
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
          text: "Estimasi biaya lantai berhasil disimpan.",
          toast: true,
          position: "top-right",
          timer: 3000,
          showConfirmButton: false,
        });

        // Clear the input fields
        setLength("");
        setWidth("");
        setPricePerPak("105000");
        setTileSize("30x30");
      } catch (error) {
        console.error("Error saving estimate:", error);
      }
    } else {
      console.error("User is not authenticated");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md md:p-6">
      <h2 className="mb-6 text-xl font-bold md:text-2xl">Estimasi Lantai</h2>
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <label className="block text-gray-700">Panjang Ruangan (m)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={length}
              onChange={handleLengthChange}
              placeholder="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Lebar Ruangan (m)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={width}
              onChange={handleWidthChange}
              placeholder="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Jenis Lantai</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value="Keramik"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ukuran Keramik (cm)</label>
            <select
              className="w-full p-2 border rounded"
              value={tileSize}
              onChange={handleTileSizeChange}
            >
              <option value="30x30">30 x 30</option>
              {/* <option value="40x40">40 x 40</option>
              <option value="50x50">50 x 50</option> */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Harga Keramik (Rupiah / pak)
            </label>
            <select
              type="number"
              className="w-full p-2 border rounded"
              value={pricePerPak}
              onChange={handlePricePerPakChange}
              // placeholder="0"
            >
              <option value={105000}>105,000</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2">
          <img
            src={Kramik}
            alt="Kramik"
            className="w-24 mb-4 shadow-lg shadow-slate-700 md:w-36"
          />
          <div className="text-center">
            <div className="mb-4 text-2xl font-bold md:text-4xl">
              {numberOfPacks} Pak Keramik
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
        <CostHistoryFloor history={history} setHistory={setHistory} />
      </div>
    </div>
  );
};

export default FlooringEstimate;
