import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useAuth} from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const { authUser, setAuthUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      fullname: data.fullname,
      password: data.password,
      confirmpassword: data.confirmpassword,
    };

    try {
      const response = await axios.post(
        "/api/user/signup",
        userInfo
      );

      if (response.data) {
        toast.success("Signup successful");
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      if (error.response){
        toast.error("Error:" + error.response.data.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl border border-gray-300">
        <h1 className="text-2xl font-bold text-center text-blue-600">Messenger</h1>
        <h2 className="text-2xl text-center text-black">
          Create a New <span className="text-blue-600 font-semibold">Account</span>
        </h2>
        <h2 className="text-sm text-center text-gray-500">
          It's free and always will be
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
         

          {/* Fullname */}
          <div>
            <label className="block text-sm font-medium text-black">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("fullname", { required: "Fullname is required", minLength: 3 })}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 text-black placeholder-gray-500"
            />
            {errors.fullname && <p className="text-sm text-red-500">{errors.fullname.message}</p>}
          </div>

           {/* Email */}
           <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              placeholder="mail@site.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 text-black placeholder-gray-500"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required", minLength: 8 })}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 text-black placeholder-gray-500"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-black">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmpassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 text-black placeholder-gray-500"
            />
            {errors.confirmpassword && (
              <p className="text-sm text-red-500">{errors.confirmpassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>

          {/* Redirect */}
          <p className="text-center text-sm text-gray-600">
            Have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
