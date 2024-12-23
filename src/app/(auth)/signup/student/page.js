"use client";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import collegeService from "@/services/college.service";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/context/AuthContext";

const StudentSignup = () => {
  const [show, setShow] = useState(false);
  const [formPrefillData, setFormPrefillData] = useState();
  const [tab, setTab] = useState(0);
  const [timer, setTimer] = useState(30);
  const [showOtpField, setShowOtpField] = useState(true);
  const [canResend, setCanResend] = useState(false);
  const [error, setErrors] = useState();
  const [colleges, setColleges] = useState([]);
  function handleClick() {
    setShow(!show);
  }
  const navigate = useRouter();
    const router = useRouter();
    const { isAuth } = useGlobalContext();
    if (isAuth) {
      router.push("/");
    }
    const handleOtpForSignUp = (values) => {
      console.log(values);
      setShowOtpField(true);
      setCanResend(false);
      setTimer(30);
    };
  const fetchColleges = async () => {
    try {
      const response = await collegeService.getAllVerifiedColleges();
      if (response.data.success) {
        const colleges = response.data.colleges;
        setColleges(colleges);
      } else {
        console.error("Error fetching colleges:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };
  useEffect(() => {
    fetchColleges();
  }, []);
  const initialValues = {
    college_name: "Select a college", 
    name: "",
    email: "",
    password: "",
    otp: "",
  };
  const loginForm = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(1, values);
      if (!values.email) {
        setErrors("Email Required!");
        return;
      }
      if (!values.college_name) {
        setErrors("College Name Required!");
        return;
      }
      if (!values.password || !Boolean(values.password?.trim())) {
        setErrors("Password Required!");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        setErrors("Invalid Email");
        return;
      }
      if (values.password.length < 8) {
        setErrors("Password must be at least 8 characters");
        return;
      }
      if (tab === 0) {
        if (!values.name) {
          setErrors("Full Name Required!");
          return;
        }
        try {
          const payload = {
            name: values.name,
            college_name: values.college_name,
            email: values.email,
            password: values.password,
            role: "student",
          };
          const data = await authService.signUpStudent(payload);
          console.log(12, data);
          if (data.data.message === "OTP is already Verified") {
            navigate.push(`/signup/student/registration/${data.data.id}`);
          } else {
            toast.success(data.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTab(1);
          }
          setErrors("");
        } catch (error) {
          setErrors("");
          toast.error(error.response?.data.message || "An error occurred", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }

      if (tab === 1) {
        try {
          const payload = {
            otp: values.otp,
          };
          payload.email = values.email;
          const data = await authService.verifyOtpForAdmin(payload);
          toast.success(data.data.message)
          navigate.push(`/signup/student/registration/${data.data.id}`);
        } catch (error) {
          setErrors("");
          toast.error(error.response?.data.message || "An error occurred", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const resendOtp = async () => {
    try {
      const payload = { email: loginForm.values.email };
      const response = await authService.sendOtp(payload);

      if (response) {
        toast.success("OTP sent successfully");
        setShowOtpField(true);
        setCanResend(false);
        setTimer(30); 
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Error occurred", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="h-full w-full flex flex-col px-3 ">
      <main>
        {tab === 0 ? (
          <div className="w-full  flex items-center justify-center  py-12 sm:py-3">
            {/* register component */}
            <div className=" flex  flex-col bg-white rounded-2xl shadow justify-center items-center py-12 w-full sm:w-[500px]">
              <div className="font-bold  tracking-wide justify-center mb-7  text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px] ">
                Student Signup
              </div>
              <div className="flex flex-col justify-center gap-7 w-[80%]">
                {/* College Name Section */}
                <div className="w-full md:w-full md:flex-1">
                  <h1 className="text-neutral-500">Select College</h1>
                  <div className="w-full border px-4 py-3 sm:px-6 sm:py-3  rounded-full mt-2 text-lg">
                    <div className="relative w-full">
                      <select
                        name="college_name"
                        value={loginForm.values.college_name}
                        onChange={loginForm.handleChange}
                        className="appearance-none w-full rounded px-4 leading-tight focus:outline-none focus:border-blue-500 max-sm:text-sm"
                      >
                        {/* Populate select options */}
                        <option
                          >
                            Select College
                          </option>
                        {colleges.map((college) => (
                          <option
                            key={college._id}
                            value={college.college_name}
                          >
                            {college.college_name}
                          </option>
                        ))}
                      </select>
                      {/* Arrow icon */}
                      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none px-1">
                        {!isDropdownOpen ? (
                          <FaChevronDown className="h-4 w-4 text-gray-600" />
                        ) : (
                          <FaChevronUp className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Email section*/}
                <div className="space-y-3 w-full gap-y-10">
                  <p className="text-[#676767]">Email ID</p>
                  <input
                    type="text"
                    name="email"
                    value={loginForm.values.email}
                    onChange={(e) => {
                      loginForm.handleChange(e);
                    }}
                    error={
                      loginForm.touched.email && Boolean(loginForm.errors.email)
                    }
                    placeholder="Enter Email ID"
                    className="rounded-full border border-[#E0E0E0] w-full p-3 max-sm:text-sm"
                  />
                </div>
                {/* Password Section */}
                <div className="space-y-3 w-full">
                  <p className="text-[#676767]">Password</p>
                  <div className="flex flex-row items-center relative w-full">
                    <input
                      type={`${show ? "password" : "text"}`}
                      name="password"
                      value={loginForm.values.password}
                      onChange={loginForm.handleChange}
                      error={
                        loginForm.touched.password &&
                        Boolean(loginForm.errors.password)
                      }
                      placeholder="Must be min 8 characters"
                      className="rounded-full border border-[#E0E0E0] p-3 w-full  max-sm:text-sm"
                    />
                    <p
                      className="absolute right-3 pr-3 hover:cursor-pointer text-[#0048B4]  max-sm:text-sm"
                      onClick={handleClick}
                    >
                      {show ? "Show" : "Hide"}
                    </p>
                  </div>
                </div>
                {/* Full name */}
                <div className="space-y-3 w-full">
                  <p className="text-[#676767]">Your Name</p>
                  <input
                    type="name"
                    name="name"
                    value={loginForm.values.name}
                    onChange={loginForm.handleChange}
                    error={
                      loginForm.touched.name && Boolean(loginForm.errors.name)
                    }
                    placeholder="Enter Your Name"
                    className="rounded-full border border-[#E0E0E0] w-full p-3  max-sm:text-sm"
                  />
                </div>

                {/* Forgot password */}
                {/* Register Button */}
                <p className="text-red-500 text-sm  text-center">{error}</p>
                <div className="">
                  <button
                    className="text-center bg-blue-400 text-white hover:bg-blue-500 hover:text-white font-semibold p-2  sm:p-4 w-full rounded-full"
                    onClick={(e) => {
                      setErrors();
                      loginForm.handleSubmit();
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* already on edzer */}
              <p className="text-sm leading-relaxed mt-4 text-grey-900">
                Already registered?{" "}
                <Link
                  href="/signin"
                  className="font-bold  text-blue-600 hover:text-blue-900"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full  flex items-center justify-center  py-12 sm:py-10">
            {/* register component */}
            <div className="flex  flex-col bg-white rounded-2xl shadow justify-center items-center py-12 w-full sm:w-[500px]">
              <div className="font-bold  tracking-wide justify-center mb-7  text-[30px]  md:text-[40px] lg:text-[48px] xl:text-[48px]">
                Student Signup
              </div>
              <div className="flex flex-col justify-center gap-7 w-[80%]">
                {/* Email section*/}
                <div className="space-y-3 w-full">
                  <p className="text-[#676767]">Enter OTP</p>
                  <div className="flex flex-row items-center relative w-full">
                    <input
                      type={`${show ? "password" : "text"}`}
                      value={loginForm.values.otp}
                      onChange={loginForm.handleChange}
                      name="otp"
                      placeholder="Enter OTP"
                      className="rounded-full border border-[#E0E0E0] p-3 w-full  max-sm:text-sm"
                    />
                    <p
                      className="absolute right-3 pr-3 hover:cursor-pointer text-[#0048B4]"
                      onClick={handleClick}
                    >
                      {show ? "Show" : "Hide"}
                    </p>
                  </div>
            
                </div>

                <div className=" flex gap-4 flex-col">
                  <p className="text-red-500 text-sm  text-center">{error}</p>
                  <button
                    className="text-center bg-blue-400 text-white hover:bg-blue-500 hover:text-white font-semibold p-2 sm:p-4 w-full rounded-full"
                    onClick={(e) => {
                      setErrors();
                      loginForm.handleSubmit();
                    }}
                  >
                    Sign Up
                  </button>
                  <button
                    className="bg-gray-400 text-white p-4 w-full rounded-full"
                    onClick={resendOtp}
                    disabled={!canResend}
                  >
                    {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
                  </button>
                </div>
              </div>

              {/* already on edzer */}
              <p className="text-sm mt-8 leading-relaxed text-grey-900">
                Already registered ?{" "}
                <Link
                  href="/signin"
                  className="font-bold  text-blue-600 hover:text-blue-900"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentSignup;
