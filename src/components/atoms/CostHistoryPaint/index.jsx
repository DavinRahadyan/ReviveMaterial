import React, { useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";
import { useBudget } from "@components/atoms/BudgetContext";
import axios from "axios";
import Cookies from "js-cookie";

const CostHistoryPaint = ({ history, setHistory }) => {
  const { addCatEstimate, removeCatEstimate } = useBudget();

  useEffect(() => {
    localStorage.setItem("catEstimateHistory", JSON.stringify(history));
  }, [history]);

  const handleDeleteEstimate = (index, id) => {
    const token = Cookies.get("token");
    if (token) {
      axios
        .delete(`http://localhost:8000/api/users/delete_estimasi_cat/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(() => {
          removeCatEstimate(index);
          const newHistory = history.filter((_, i) => i !== index);
          setHistory(newHistory);
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Estimasi biaya cat berhasil dihapus.",
            toast: true,
            position: "top-right",
            timer: 3000,
            showConfirmButton: false,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan saat menghapus estimasi.",
            toast: true,
            position: "top-right",
            timer: 3000,
            showConfirmButton: false,
          });
        });
    }
  };

  const handleAddEstimate = (estimate) => {
    addCatEstimate(estimate);
    Swal.fire({
      icon: "success",
      title: "Estimasi Ditambahkan",
      text: "Estimasi biaya cat berhasil ditambahkan ke total biaya.",
      toast: true,
      position: "top-right",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const handleViewDetails = (estimate) => {
    Swal.fire({
      title: "Detail Estimasi Cat",
      html: `
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Panjang:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${estimate.length} m</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Lebar:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${estimate.width} m</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Luas Pintu:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${estimate.doorSize} m²</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Luas Jendela:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${estimate.windowsSize} m²</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Harga Cat:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">Rp ${estimate.pricePerLiter.toLocaleString()} per liter</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Warna Cat:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${estimate.color}</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Biaya:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">Rp ${estimate.price.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Liter:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${estimate.qty.toFixed(2)} L</td>
              </tr>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;"><b>Waktu:</b></td>
                <td style="border:1px solid #ddd;padding:8px;">${new Date(estimate.created_at).toLocaleString()}</td>
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
              <span className="block">Biaya: Rp {estimate.price.toLocaleString()}</span>
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
                onClick={() => handleDeleteEstimate(index, estimate.id)}
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

export default CostHistoryPaint;
