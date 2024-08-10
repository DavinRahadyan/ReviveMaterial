import React, { useEffect } from "react";
import { useBudget } from "../BudgetContext";
import CatEstimateDetails from "../CatEstimateDetail";
import FloorEstimateDetails from "../FloorEstimateDetail";
import FloorCementEstimateDetails from "../FloorCementEstimateDetail";
import FoundationCementEstimateDetails from "../FoundationCementDetail";
import WallEstimateDetails from "../WallEstimateDetail";
import { FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const CostEstimate = () => {
  const {
    totalBudget,
    setTotalBudget,
    semenLantaiEstimate,
    lantaiEstimate,
    pondasiEstimate,
    dindingEstimate,
    catEstimate,
    clearAllEstimates,
    removePondasiEstimate,
    removeLantaiEstimate,
    removeSemenLantaiEstimate,
    removeCatEstimate,
    removeDindingEstimate,
  } = useBudget();

  useEffect(() => {
    const totalCost =
      semenLantaiEstimate.cost +
      lantaiEstimate.cost +
      pondasiEstimate.cost +
      dindingEstimate.cost +
      catEstimate.cost;
    setTotalBudget(totalCost);
  }, [
    semenLantaiEstimate,
    lantaiEstimate,
    pondasiEstimate,
    dindingEstimate,
    catEstimate,
    setTotalBudget,
  ]);

  const handleViewDetails = (title, estimate, removeFunction) => {
    MySwal.fire({
      title: `Detail ${title}`,
      html: `
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;text-align:left;">
            <thead>
              <tr style="background-color:#f2f2f2;">
                <th style="border:1px solid #ddd;padding:8px;">Biaya</th>
                <th style="border:1px solid #ddd;padding:8px;">Jumlah</th>
                <th style="border:1px solid #ddd;padding:8px;">Waktu</th>
                <th style="border:1px solid #ddd;padding:8px;">Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${estimate.history
                .map(
                  (est, index) => `
                  <tr>
                    <td style="border:1px solid #ddd;padding:8px;">Rp ${Number(est.price).toLocaleString()}</td>
                    <td style="border:1px solid #ddd;padding:8px;">${est.qty}</td>
                    <td style="border:1px solid #ddd;padding:8px;">${new Date(est.created_at).toLocaleString()}</td>
                    <td style="border:1px solid #ddd;padding:8px;text-align:center;">
                      <button id="delete-button-${index}" class="text-white bg-red-500 rounded px-2 py-1 hover:bg-red-700">Hapus</button>
                    </td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "OK",
      showCloseButton: false,
      focusConfirm: false,
      didOpen: () => {
        estimate.history.forEach((_, index) => {
          document
            .getElementById(`delete-button-${index}`)
            .addEventListener("click", () => {
              removeFunction(index);
              MySwal.close();
            });
        });
      },
    });
  };

  const handleViewSemenLantaiDetails = () => {
    handleViewDetails(
      "Estimasi Semen Lantai",
      semenLantaiEstimate,
      removeSemenLantaiEstimate
    );
  };

  const handleViewLantaiDetails = () => {
    handleViewDetails("Estimasi Lantai", lantaiEstimate, removeLantaiEstimate);
  };

  const handleViewPondasiDetails = () => {
    handleViewDetails(
      "Estimasi Semen Pondasi",
      pondasiEstimate,
      removePondasiEstimate
    );
  };

  const handleViewDindingDetails = () => {
    handleViewDetails(
      "Estimasi Dinding",
      dindingEstimate,
      removeDindingEstimate
    );
  };

  const handleViewCatDetails = () => {
    handleViewDetails("Estimasi Cat", catEstimate, removeCatEstimate);
  };

  return (
    <>
      <h2 className="text-xl font-poppins font-semibold text-center text-gray-800">
        Estimasi Biaya
      </h2>
      <div className="w-full  mx-auto mt-4 bg-white border shadow-slate-300 shadow-xl table-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left border sm:px-4 sm:py-2">
                Kategori
              </th>
              <th className="px-2 py-1 text-right border sm:px-4 sm:py-2">
                Biaya
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1 border sm:px-4 sm:py-2">
                Estimasi Semen Lantai
              </td>
              <td className="px-2 py-1 text-right border sm:px-4 sm:py-2">
                Rp {Number(semenLantaiEstimate.cost).toLocaleString()}
                <button
                  className="ml-2 text-gray-600 hover:text-gray-800"
                  onClick={handleViewSemenLantaiDetails}
                >
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border sm:px-4 sm:py-2">
                Estimasi Lantai
              </td>
              <td className="px-2 py-1 text-right border sm:px-4 sm:py-2">
                Rp {Number(lantaiEstimate.cost).toLocaleString()}
                <button
                  className="ml-2 text-gray-600 hover:text-gray-800"
                  onClick={handleViewLantaiDetails}
                >
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border sm:px-4 sm:py-2">
                Estimasi Semen Pondasi
              </td>
              <td className="px-2 py-1 text-right border sm:px-4 sm:py-2">
                Rp {Number(pondasiEstimate.cost).toLocaleString()}
                <button
                  className="ml-2 text-gray-600 hover:text-gray-800"
                  onClick={handleViewPondasiDetails}
                >
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border sm:px-4 sm:py-2">
                Estimasi Dinding
              </td>
              <td className="px-2 py-1 text-right border sm:px-4 sm:py-2">
                Rp {Number(dindingEstimate.cost).toLocaleString()}
                <button
                  className="ml-2 text-gray-600 hover:text-gray-800"
                  onClick={handleViewDindingDetails}
                >
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 border sm:px-4 sm:py-2">
                Estimasi Cat
              </td>
              <td className="px-2 py-1 text-right border sm:px-4 sm:py-2">
                Rp {Number(catEstimate.cost).toLocaleString()}
                <button
                  className="ml-2 text-gray-600 hover:text-gray-800"
                  onClick={handleViewCatDetails}
                >
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-2 py-1 font-semibold border sm:px-4 sm:py-2">
                Total Estimasi:
              </td>
              <td className="px-2 py-1 text-right font-semibold border sm:px-4 sm:py-2">
               <span className="text-green-700 font-bold">
               Rp {Number(totalBudget).toLocaleString()}
                </span> 
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <button
            className="px-4 py-2 m-3  text-white bg-red-500 rounded hover:bg-red-700"
            onClick={clearAllEstimates}
          >
            Hapus Semua
          </button>
        </div>
      </div>
    </>
  );
};

export default CostEstimate;
