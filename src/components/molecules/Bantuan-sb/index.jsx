// import React from "react";
// import SidebarButton from "@components/atoms/SidebarButton";
// import Dinding from "@assets/images/KeramikD.jpg";
// import Lantai from "@assets/images/KeramikL.jpg";
// import Cat from "@assets/images/Cat.jpg"
// import SemenLantai from "@assets/images/SemenL.jpg";
// import SemenPondasi from "@assets/images/semenPO.jpg";
// import Total from "@assets/images/rupiah.png";
// // import Cat from "@assets/icons/cat.svg";
// // import SemenLantai from "@assets/icons/semenLantai.svg";
// // import SemenPondasi from "@assets/icons/semenPondasi.svg";
// // import Kramik from "@assets/icons/kramik.webp";
// // import Total from "@assets/icons/total.svg";

// const Sidebar = ({ onSectionChange }) => {
//   return (
//     <div className="w-full p-4 mt-4 mb-2 overflow-y-auto lg:h-auto lg:w-1/5 lg:ml-56 relative">
//         <nav className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:space-x-0 lg:space-y-4">
//           <SidebarButton
//             label="Lantai"
//             onClick={() => onSectionChange("flooring")}
//             name="Kramik"
//             images={Lantai}
//             className="lg:w-full"
//           />
//           <SidebarButton
//             label="Estimasi Cat"
//             onClick={() => onSectionChange("paint")}
//             name="Cat"
//             images={Cat}
//             className="lg:w-full"
//           />
//           <SidebarButton
//             label="Estimasi Semen Lantai"
//             onClick={() => onSectionChange("cementFloor")}
//             name="Semen Lantai"
//             images={SemenLantai}
//             className="lg:w-full"
//           />
//           <SidebarButton
//             label="Estimasi Semen Pondasi"
//             onClick={() => onSectionChange("foundation")}
//             name="Semen Pondasi"
//             images={SemenPondasi}
//             className="lg:w-full"
//           />
//           <SidebarButton
//             label="Dinding"
//             onClick={() => onSectionChange("walling")}
//             name="Kramik"
//             images={Dinding}
//             className="lg:w-full"
//           />
//           <SidebarButton
//             label="Total Budget"
//             onClick={() => onSectionChange("budget")}
//             name="Total"
//             images={Total}
//             className="lg:w-full"
//           />
//         </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import SidebarButton from "@components/atoms/SidebarButton";
import Cat from "@assets/icons/Paint.svg";

import SemenLantai from "@assets/icons/SemenLan.svg";
import SemenPondasi from "@assets/icons/SemenPon.svg";
import Total from "@assets/icons/Dollar.svg";
import Dinding from "@assets/icons/Wall.svg";
import Lantai from "@assets/icons/Floor.svg";


const Sidebar = ({ onSectionChange }) => {
  return (
    <div className="w-full p-4 mt-4 mb-2 overflow-y-auto lg:h-auto lg:w-1/5 lg:ml-56 relative">
        <nav className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:space-x-0 lg:space-y-4">
          <SidebarButton
            label="Lantai"
            onClick={() => onSectionChange("flooring")}
            name="Kramik"
            images={Lantai}
            className="lg:w-full"
          />
          <SidebarButton
            label="Estimasi Cat"
            onClick={() => onSectionChange("paint")}
            name="Cat"
            images={Cat}
            className="lg:w-full"
          />
          <SidebarButton
            label="Estimasi Semen Lantai"
            onClick={() => onSectionChange("cementFloor")}
            name="Semen Lantai"
            images={SemenLantai}
            className="lg:w-full"
          />
          <SidebarButton
            label="Estimasi Semen Pondasi"
            onClick={() => onSectionChange("foundation")}
            name="Semen Pondasi"
            images={SemenPondasi}
            className="lg:w-full"
          />
          <SidebarButton
            label="Dinding"
            onClick={() => onSectionChange("walling")}
            name="Kramik"
            images={Dinding}
            className="lg:w-full"
          />
          <SidebarButton
            label="Total Budget"
            onClick={() => onSectionChange("budget")}
            name="Total"
            images={Total}
            className="lg:w-full"
          />
        </nav>
    </div>
  );
};

export default Sidebar;

