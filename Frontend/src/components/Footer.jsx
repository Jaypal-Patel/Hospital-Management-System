import React from "react";

function Footer() {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ------------- Left Side --------- */}
        <div>
          <div className="text-blue-600 text-2xl font-bold cursor-pointer mb-5">
            MyHospital
          </div>
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* ------------- Center Side --------- */}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ------------- Right Side --------- */}
        <div>
          <p className="text-xl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 6264599708</li>
            <li>jaypalpatel713@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ---------- Copyright Text --------- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 Jaypal Patel All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
