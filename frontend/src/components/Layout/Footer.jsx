import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-5 text-gray-400 text-sm pb-8"
      >
        <span>© 2024 Aleksander Bogdan. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
      </div>
    </div>
  );
};

export default Footer;