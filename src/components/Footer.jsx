import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            corporis, qui ullam tempora necessitatibus ut inventore perferendis,
            adipisci dicta cupiditate quae! Doloremque, ipsa.
          </p>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">Company</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>Delivery</li>
                <li>About US</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">Get in Touch</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>+91 9914278XXX</li>
                <li>contact@foreveryou.com</li>
            </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024 forever.com - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
