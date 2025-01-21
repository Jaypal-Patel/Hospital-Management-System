import React, { useContext, useState } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext.jsx";
import { toast } from "react-toastify";

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        state === "Admin"
          ? `${backendUrl}/api/admin/login`
          : `${backendUrl}/api/doctor/login`;

      const { data } = await axios.post(endpoint, { email, password });

      if (data.success) {
        localStorage.setItem(
          state === "Admin" ? "aToken" : "dToken",
          data.token
        );
        setAToken(data.token);
        toast.success(`${state} logged in successfully!`);
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-primary text-white w-full py-2 rounded-md text-base ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
