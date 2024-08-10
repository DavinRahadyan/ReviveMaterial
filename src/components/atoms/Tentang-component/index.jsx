// import React from "react";
// import BgHero from "@assets/images/Tentang.webp";
// import { useNavigate } from "react-router-dom";
// import Logo from "@assets/images/Logo.png";
// import Cookies from "js-cookie";
// import Swal from "sweetalert2";

// const Tentang = () => {
//   return (
//     <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${BgHero})` }}>
//       <div className="absolute inset-0 bg-black bg-opacity-65"></div>
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-neutral-content">
//         <div className="p-2 bg-neutral-50 bg-opacity-80 rounded-lg shadow-lg max-w-lg md:max-w-2xl lg:max-w-4xl mt-14 ">
//           <h1 className="mb-5 text-black text-4xl font-bold text-center md:text-5xl lg:text-6xl">
//             Revive Material
//           </h1>
//           <img src={Logo} alt="Paint Icon" className="scale-250 w-36 md:w-48 mx-auto mb-2" />
//           {/* <img src={Logo} alt="Paint Icon" className="scale-150 w-24 mb-2 md:w-36 ml-32" /> */}
//           <p className="mb-5 text-black text-1xl leading-relaxed text-justify">
//           Revive Material adalah website yang dibentuk pada tahun 2024 untuk membantu masyarakat Indonesia dalam menentukan biaya yang dibutuhkan dalam membangun atau merenovasi suatu bangunan. 
//           Dengan fokus pada perhitungan yang mudah untuk dimengerti.
//           </p>
//         </div>
//           <div className="p-6 bg-neutral-50 bg-opacity-80 rounded-lg shadow-lg max-w-lg md:max-w-2xl lg:max-w-4xl mt-5 mb-14">
//           <h1 className="mb-5 text-4xl text-black text-center font-bold md:text-5xl lg:text-7x">
//               Lokasi Kami Beroperasi!
//             </h1>
//           <div className="mt-10">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32658978.692013398!2d95.93049393142974!3d-2.268425853558406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c4c07d7496404b7%3A0xe37b4de71badf485!2sIndonesia!5e0!3m2!1sen!2sid!4v1717327164363!5m2!1sen!2sid"
//               width="600"
//               height="450"
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               className="rounded-lg shadow-lg"
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tentang;


import React from "react";
import BgHero from "@assets/images/Tentang.webp";
import { useNavigate } from "react-router-dom";
import Logo from "@assets/images/Logo.png";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Tentang = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${BgHero})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-65"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-neutral-content">
        <div className="p-px bg-neutral-50 bg-opacity-80 rounded-lg shadow-lg max-w-lg md:max-w-2xl lg:max-w-4xl mt-5 ">
          <h1 className="mb-5 text-black text-4xl font-bold text-center md:text-5xl lg:text-6xl">
            Revive Material
          </h1>
          <img src={Logo} alt="Paint Icon" className="scale-250 w-36 md:w-48 mx-auto mb-2" />
          {/* <img src={Logo} alt="Paint Icon" className="scale-150 w-24 mb-2 md:w-36 ml-32" /> */}
          <p className="mb-5 text-black text-lg leading-relaxed text-justify">
          Revive Material adalah website yang dibentuk pada tahun 2024 untuk membantu masyarakat Indonesia dalam menentukan biaya yang dibutuhkan dalam membangun atau merenovasi suatu bangunan. 
          Dengan fokus pada perhitungan yang mudah untuk dimengerti.
          </p>
        </div>
        <div className="p-6 bg-neutral-50 bg-opacity-80 rounded-lg shadow-lg max-w-lg md:max-w-2xl lg:max-w-4xl mt-5 mb-2">
        <h1 className="mb-5 text-4xl text-black text-center font-bold md:text-5xl lg:text-6x">
            Lokasi Kami Beroperasi!
          </h1>
          <div className="mt-10 w-full h-0 pb-[56.25%] relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.478949799!2d106.829518!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1722151384978!5m2!1sen!2sid" 
              className="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-lg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tentang;

