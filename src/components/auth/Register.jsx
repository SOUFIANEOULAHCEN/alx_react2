import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("http://localhost:3000/register", { name, email, password })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "An error occurred");
        console.error("Error:", err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center items-center h-screen text-white bg-primary">
      <div className="bg-secondary p-8 rounded-lg w-1/3">
        <div className="flex justify-center items-center shadow-lg w-auto p-2 mb-10 mt-2 rounded-lg">
          <img src={logo} alt="itoob logo" className="w-20" />
          <h1 className="text-4xl font-bold ml-2">ITube</h1>
        </div>
        <form className="flex flex-col space-y-4" onSubmit={onRegister}>
          <input
            type="text"
            placeholder="Name"
            className="p-2 rounded-lg bg-primary border border-primary"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded-lg bg-primary border border-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded-lg bg-primary border border-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-primary hover:bg-blue-900 transition-all duration-300 text-white p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="text-lg text-lightGray text-center mt-4">
          Do you have an account?{" "}
          <Link to="/" className="text-white hover:underline">
            Login here
          </Link>
        </p>{" "}
      </div>
    </div>
  );
}
