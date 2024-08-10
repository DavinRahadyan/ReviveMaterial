import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Bg from "@assets/images/RakBangunan.jpg";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(/^[a-zA-Z0-9]*$/, "*Nama pengguna hanya boleh mengandung huruf dan angka*")
      .matches(/^[^!?<>@#$%^*()]*$/, "*Nama pengguna tidak boleh mengandung !?<>*")
      .required("*Nama pengguna wajib diisi*"),
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "*Nama hanya boleh mengandung huruf*")
      .required("*Nama wajib diisi*"),
    email: Yup.string()
      .email("*Alamat email tidak valid*")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "*Alamat email harus mengandung '@' dan '.com'*")
      .required("*Email wajib diisi*"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "*Nomor telepon harus berupa angka*")
      .required("*Nomor telepon wajib diisi*")
      .max(14, "*Masukkan Nomor telepon yang valid*")
      .min(9, "*Masukkan Nomor telepon yang valid*"),
      password: Yup.string()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!?<>@#$%^*()])/, 
        "*Kata sandi harus mengandung spesial karakter, huruf, dan angka*"
      )
      .min(5, "*Kata sandi harus minimal 5 karakter*")
      .required("*Kata sandi wajib diisi*"),
    // password: Yup.string()
    //   .matches(/^[a-zA-Z0-9]*$/, "*Kata sandi harus mengandung spesial karakter, huruf, dan angka*")
    //   .matches(/^[^!?<>@#$%^*()]*$/, "*Kata sandi harus mengandung spesial karakter, huruf, dan angka*")
    //   .min(5, "*Kata sandi harus minimal 5 karakter*")
    //   .required("*Kata sandi wajib diisi*"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "*Kata sandi harus sama*")
      .required("*Konfirmasi kata sandi wajib diisi*"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const registerResponse = await axios.post(
        "http://localhost:8000/api/users/register/",
        {
          username: values.username,
          email: values.email,
          password: values.password,
          phone: values.phone,
        }
      );
      if (registerResponse.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registrasi Berhasil",
          text: "Anda telah berhasil mendaftar!",
        }).then(() => {
          navigate("/signin");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registrasi Gagal",
          text: "Terjadi kesalahan saat registrasi. Silakan coba lagi.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: error.response
          ? error.response.data.message
          : "Terjadi kesalahan saat registrasi. Silakan coba lagi.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="flex items-center justify-end min-h-screen bg-center bg-cover font-poppins"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="w-full max-w-md p-8 m-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
        <h2 className="mb-4 text-4xl font-bold text-center text-primary">
          Daftar
        </h2>
        <Formik
          initialValues={{
            username: "",
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="w-full">
              <div className="mb-4">
                <label
                  className="block pt-1 mb-2 text-sm font-bold text-gray-700"
                  htmlFor="username"
                >
                  Nama Pengguna
                </label>
                <Field
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-outline"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Nama Pengguna"
                  inputMode="text"
                  pattern="[a-zA-Z0-9]*"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="font-bold font-sans text-xs text-red-500 absolute pb-[2px]"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block pt-1 mb-2 text-sm font-bold text-gray-700"
                  htmlFor="name"
                >
                  Nama
                </label>
                <Field
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-outline"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nama"
                  inputMode="text"
                  pattern="[a-zA-Z\s]*"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="font-bold font-sans text-xs text-red-500 absolute pb-[2px]"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block pt-1 mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  inputMode="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="font-bold font-sans text-xs text-red-500 absolute pb-[2px]"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block pt-1 mb-2 text-sm font-bold text-gray-700"
                  htmlFor="phone"
                >
                  Nomor Telepon
                </label>
                <Field
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-outline"
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Nomor Telepon"
                  inputMode="tel"
                  pattern="[0-9]*"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="font-bold font-sans text-xs text-red-500 absolute pb-[2px]"
                />
              </div>
              <div className="relative mb-4">
                <label
                  className="block pt-1 mb-2 text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  Kata Sandi
                </label>
                <div className="relative">
                  <Field
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-outline"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="font-bold font-sans text-xs text-red-500 absolute pb-[2px]"
                />
              </div>
              <div className="relative mb-6">
                <label
                  className="block pt-1 mb-2 text-sm font-bold text-gray-700"
                  htmlFor="confirmPassword"
                >
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <Field
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-outline"
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="font-bold font-sans text-xs text-red-500 absolute pb-[2px]"
                />
              </div>
              <div className="mt-6">
                <button
                  className="w-full px-4 py-2 font-bold text-white rounded bg-primary hover:bg-primary-dark focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Daftar
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Sudah punya akun?{" "}
                  <Link
                    to="/signin"
                    className="text-blue-500 hover:text-blue-800"
                    href="#"
                  >
                    Masuk
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
