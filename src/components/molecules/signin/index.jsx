import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Bg from "@assets/images/Login-signin.webp";
import Bg from "@assets/images/RakBangunan.jpg";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("*Nama pengguna wajib diisi*"),
    password: Yup.string()
      .min(8, "*Kata sandi harus minimal 8 karakter*")
      .required("*Kata sandi wajib diisi*"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const loginResponse = await axios.post(
        "http://localhost:8000/api/users/login/",
        values
      );
      if (loginResponse.status === 200) {
        Cookies.set("token", loginResponse.data.token);
        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: "Anda telah berhasil masuk!",
        }).then(() => {
          navigate("/"); // Redirect to home or dashboard
          window.location.reload(); // Refresh the page
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Nama pengguna atau kata sandi salah.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response
          ? error.response.data.message
          : "Terjadi kesalahan saat login. Silakan coba lagi.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="flex items-center justify-end min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="w-full max-w-md p-8 m-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
        <h2 className="mb-4 text-4xl font-bold text-center text-primary">
          Masuk
        </h2>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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
                />
                <ErrorMessage
                  name="username"
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
               {/* {showPassword ? <FiEyeOff /> : <FiEye />} */}

                  </div>
                </div>
                <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="text-sm text-gray-700" htmlFor="rememberMe">
                Ingat saya
              </label>
            </div>
            </div>
                <ErrorMessage
                  name="password"
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
                  Masuk
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Belum punya akun?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-500 hover:text-blue-800"
                    href="#"
                  >
                    Daftar
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

export default SigninForm;
