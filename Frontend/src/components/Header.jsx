import React from "react";
import { assets } from "../assets/assets";

function Header() {
  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
        {/* ---------- Left Side ------------*/}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
          <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight ">
            Book Appointment <br /> With Trusted Doctors
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm ">
            <img className="w-28" src={assets.group_profiles} alt="" />
            <p>
              Simply browse through our extensive list of trusted doctors,
              schedule your appointment hassle-free.
            </p>
          </div>

          <a
            href="#speciality"
            class="bg-white text-gray-600 px-8 py-3 m-auto md:m-0 rounded-full font-semibold hover:scale-105 transition-all duration-300"
          >
            Book appointment →
          </a>
        </div>

        {/* ---------- Right Side ------------*/}
        <div className="md:w-1/2 relative">
          <img
            className="w-full md:absolute bottom-0 h-auto rounded-lg"
            src={assets.header_img}
            alt=""
          />
        </div>
      </div>

      {/* <section class="py-12 px-6">
        <h2 class="text-3xl font-bold text-center mb-6">Top Doctors to Book</h2>
        <p class="text-gray-600 text-center mb-8">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white shadow-md p-4 rounded-lg text-center">
            <img
              src="/path/to/doctor-image.jpg"
              alt="Doctor"
              class="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 class="text-lg font-bold">Dr. Richard James</h3>
            <p class="text-gray-600">General physician</p>
            <span class="text-green-500 font-semibold">Available</span>
          </div>
        </div>
        <button class="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg mx-auto block">
          More
        </button>
      </section>
      <section class="bg-blue-500 text-white text-center py-12 px-6">
        <h2 class="text-3xl font-bold mb-4">
          Book Appointment With 100+ Trusted Doctors
        </h2>
        <button class="bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold">
          Create account
        </button>
      </section>
      <footer class="bg-gray-800 text-gray-400 py-12 px-6">
        <div class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-white text-lg font-bold mb-4">Prescripto</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div>
            <h3 class="text-white text-lg font-bold mb-4">Company</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white">
                  About us
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-white text-lg font-bold mb-4">Get in Touch</h3>
            <p>+1-212-456-7890</p>
            <p>greatstackdev@gmail.com</p>
          </div>
        </div>
        <div class="text-center text-gray-600 mt-6">
          &copy; 2024 GreatStack - All Right Reserved.
        </div>
      </footer> */}
    </>
  );
}

export default Header;
