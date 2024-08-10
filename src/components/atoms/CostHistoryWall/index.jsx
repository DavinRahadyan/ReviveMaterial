import React, { useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";
import { useBudget } from "@components/atoms/BudgetContext";

const CostHistoryWall = ({ history, setHistory }) => {
  const { addDindingEstimate, removeDindingEstimate } = useBudget();

  useEffect(() => {
    localStorage.setItem("dindingEstimateHistory", JSON.stringify(history));
  }, [history]);

  const handleDeleteEstimate = async (index) => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const estimateId = history[index].id; // Assuming each estimate has a unique id
        await axios.delete(`http://localhost:8000/api/users/delete_estimasi_dinding/${estimateId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        removeDindingEstimate(index);
        setHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
      } catch (error) {
        console.error("Error deleting estimate:", error);
      }
    } else {
      console.error("User is not authenticated");
    }
  };
  
  const handleAddEstimate = (estimate) => {
    addDindingEstimate(estimate);
    Swal.fire({
      icon: "success",
      title: "Estimasi Ditambahkan",
      text: "Estimasi biaya dinding berhasil ditambahkan ke total biaya.",
      toast: true,
      position: "top-right",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const handleViewDetails = (estimate) => {
    Swal.fire({
      title: "Detail Estimasi Dinding",
      html: `
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Panjang:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${
                  estimate.length
                } m</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Lebar:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${
                  estimate.width
                } m</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Jenis Dinding:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">Keramik</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Ukuran Kramik:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${
                  estimate.tileSize
                }</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Biaya:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">Rp ${
                  estimate.price ? Number(estimate.price).toLocaleString() : 0
                }</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Jumlah Pak:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${
                  estimate.qty
                }</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Waktu:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${
                  new Date(estimate.created_at).toLocaleString()
                }</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "OK",
      showCloseButton: false,
      focusConfirm: false,
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-xl font-bold">Riwayat Kalkulasi</h2>
      <ul>
        {history.map((estimate, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            <div>
              <span className="block">
                Biaya: Rp{" "}
                {estimate.price ? Number(estimate.price).toLocaleString() : 0}
              </span>
              <span className="block">Waktu: {new Date(estimate.created_at).toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <button
                className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => handleAddEstimate(estimate)}
              >
                Tambah
              </button>
              <button
                className="px-2 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-700"
                onClick={() => handleDeleteEstimate(index)}
              >
                Hapus
              </button>
              <button
                className="ml-2 text-gray-600 hover:text-gray-800"
                onClick={() => handleViewDetails(estimate)}
              >
                <FaEllipsisV />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CostHistoryWall;
