import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(formData);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
    //   console.log(data)

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-sky-100">

        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center mb-3">
            <span className="text-white text-xl font-bold">SF</span>
          </div>
          <h2 className="text-2xl font-bold text-sky-700">
            School Feeding System
          </h2>
          <p className="text-sm text-gray-400 mt-1">Sign in to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-sky-700">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-sky-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-sky-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-medium py-2 rounded-lg transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}