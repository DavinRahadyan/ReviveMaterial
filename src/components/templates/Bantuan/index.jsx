import BudgetAmount from "@components/molecules/Bantuan_Budget";
import FloorCementEstimate from "@components/molecules/Bantuan_FloorCement";
import FlooringEstimate from "@components/molecules/Bantuan_FlooringEstimate";
import FoundationEstimate from "@components/molecules/Bantuan_Foundation";
import PaintEstimate from "@components/molecules/Bantuan_Paint";
import Bantuan from "@components/molecules/Bantuan-sb";
import WallingEstimate from "@components/molecules/Bantuan_Walling";
import { useState } from "react";

const App = () => {
  const [activeSection, setActiveSection] = useState("flooring");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden lg:flex-row">
      <Bantuan onSectionChange={handleSectionChange} />
      <div className="flex-1 p-4 overflow-auto md:p-8">
        {activeSection === "flooring" && <FlooringEstimate />}
        {activeSection === "paint" && <PaintEstimate />}
        {activeSection === "cementFloor" && <FloorCementEstimate />}
        {activeSection === "foundation" && <FoundationEstimate />}
        {activeSection === "walling" && <WallingEstimate />}
        {activeSection === "budget" && <BudgetAmount />}
      </div>
    </div>
  );
};

export default App;
