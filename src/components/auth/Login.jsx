import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .get(`http://localhost:3000/login/${email}/${password}`)
      .then((res) => {
        if (res.data.message) {
          setError(res.data.message);
        } else {
          console.log(res.data);
          navigate("/youtube");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
        console.error("Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen text-white bg-primary">
      <div className="bg-secondary p-8 rounded-lg w-1/3">
        <div className="flex justify-center items-center shadow-lg w-auto p-2 mb-10 mt-2 rounded-lg">
          <img src={logo} alt="itoob logo" className="w-20" />
          <h1 className="text-4xl font-bold ml-2">ITube</h1>
        </div>
        <form className="flex flex-col space-y-4" onSubmit={onLogin}>
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded-lg bg-primary border-1 border-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded-lg bg-primary border-1 border-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-primary hover:bg-blue-900 transition-all duration-300 text-white p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="text-lg text-lightGray text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-white hover:underline">
            Register here
          </Link>
        </p>{" "}
      </div>
    </div>
  );
}