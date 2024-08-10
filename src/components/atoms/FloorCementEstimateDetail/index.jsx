import React from "react";
import { useBudget } from "../BudgetContext";
import { FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const FloorCementEstimateDetails = () => {
  const { semenLantaiEstimate, removeSemenLantaiEstimate } = useBudget();

  const handleViewDetails = (estimate, index) => {
    const MySwal = withReactContent(Swal);

    const formattedCreatedAt = estimate.created_at ? new Date(estimate.created_at).toLocaleString() : "N/A";

    MySwal.fire({
      title: "Detail Semen Lantai",
      html: `
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;text-align:left;">
            <thead>
              <tr style="background-color:#f2f2f2;">
                <th style="border:1px solid #ddd;padding:8px;">Biaya</th>
                <th style="border:1px solid #ddd;padding:8px;">Jumlah Sak</th>
                <th style="border:1px solid #ddd;padding:8px;">Panjang</th>
                <th style="border:1px solid #ddd;padding:8px;">Lebar</th>
                <th style="border:1px solid #ddd;padding:8px;">Berat Semen</th>
                <th style="border:1px solid #ddd;padding:8px;">Waktu</th>
                <th style="border:1px solid #ddd;padding:8px;">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border:1px solid #ddd;padding:8px;">Rp ${Number(estimate.price).toLocaleString()}</td>
                <td style="border:1px solid #ddd;padding:8px;">${estimate.qty}</td>
                <td style="border:1px solid #ddd;padding:8px;">${estimate.length} m</td>
                <td style="border:1px solid #ddd;padding:8px;">${estimate.width} m</td>
                <td style="border:1px solid #ddd;padding:8px;">${estimate.weight} kg</td>
                <td style="border:1px solid #ddd;padding:8px;">${formattedCreatedAt}</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:center;">
                  <button id="delete-button-${index}" class="text-white bg-red-500 rounded px-2 py-1 hover:bg-red-700">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "OK",
      showCloseButton: false,
      focusConfirm: false,
      didOpen: () => {
        document
          .getElementById(`delete-button-${index}`)
          .addEventListener("click", () => {
            removeSemenLantaiEstimate(index);
            MySwal.close();
          });
      },
    });
  };

  if (!semenLantaiEstimate) {
    return null; // or return some placeholder UI
  }

  return (
    <tr>
      <td className="px-2 py-1 border sm:px-4 sm:py-2">
        Estimasi Semen Lantai
      </td>
      <td className="px-2 py-1 text-right border sm:px-4 sm:py-2">
        Rp {Number(semenLantaiEstimate.cost).toLocaleString()}
        <button
          className="ml-2 text-gray-600 hover:text-gray-800"
          onClick={() => handleViewDetails(semenLantaiEstimate.history[0], 0)} // Assuming single estimate for simplicity
        >
          <FaEllipsisV />
        </button>
      </td>
    </tr>
  );
};

export default FloorCementEstimateDetails;
