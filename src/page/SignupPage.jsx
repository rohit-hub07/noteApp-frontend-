import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const { checkAuth, signup, isSigninUp } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await signup(data);
  };

  return (
    <div className="flex justify-center items-center max-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: "username is required" })}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-400"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* tenant */}
          <div>
            <label className="block text-gray-700">Tenant</label>
            <select
              {...register("tenant", { required: "tenant is required" })}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-400"
            >
              <option value="">Select a tenant</option>
              <option value="acme">ACME</option>
              <option value="globex">Globex</option>
            </select>
            {errors.tenant && (
              <p className="text-red-500 text-sm">{errors.tenant.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSigninUp}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
          >
            {isSigninUp ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/user/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
