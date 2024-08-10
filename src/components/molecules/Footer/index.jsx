// const Footer = () => {
//   return (
//     <footer className="py-2 text-white bg-gray-800">
//       <div className="container flex flex-col items-center justify-between px-2 mx-auto md:flex-row">
//         <div className="mb-2 md:mb-0">
//           <h2 className="text-xl font-bold">Revive Material</h2>
//           <p className="text-sm">© 2024 Revive Material. All rights reserved.</p>
//         </div>
//         {/* Uncomment the following section if needed */}
//         {/* <div className="flex space-x-2">
//           <a href="/about" className="text-sm hover:underline">
//             About Us
//           </a>
//           <a href="/services" className="text-sm hover:underline">
//             Services
//           </a>
//           <a href="/contact" className="text-sm hover:underline">
//             Contact
//           </a>
//         </div> */}
//       </div>
//     </footer>
//   );
// };

// export default Footer;


const Footer = () => {
  return (
    <footer className="py-6 text-white bg-gray-800">
      <div className="container flex flex-col items-center justify-between px-4 mx-auto md:flex-row">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">Revive Material</h2>
          <p className="text-sm">© 2024 Revive Material. All rights reserved.</p>
        </div>
        {/* className="flex space-x-4 */}
        <div className="mr-14">
          <p className="text-base">
            Alamat Kami - Jalan Suryo No. 12
          </p>
          <p className="text-base">
            Kontak Kami - 081318845555
          </p>
          {/* <a href="/contact" className="text-sm hover:underline">
            Contact
          </a> */}
        </div> 
      </div>
    </footer>
  );
};

export default Footer;
