import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../helpers/auth schema/loginSchema";
import { registerSchema } from "../helpers/auth schema/registerSchema";
import { login } from "../api/authApi";
import ErrorMessage from "./ErrorMessage";
import { register } from "../api/authApi";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { NavLink, useNavigate } from "react-router-dom";

export default function AuthForm({ btnText, type }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const cookie = new Cookies();
  const navigate = useNavigate();
  const schema = type === "login" ? loginSchema : registerSchema;
  const defaultFormData =
    type === "login"
      ? {
          email: "",
          password: "",
        }
      : {
          firstName: "",
          secondName: "",
          email: "",
          password: "",
          rePassword: "",
          dateOfBirth: "",
          gender: "",
        };

  const {
    register: formData,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormData,
    resolver: zodResolver(schema),
  });
  async function onSubmit(data) {
    const loginData = { email: data.email, password: data.password };
    const payload = {
      ...data,
      name: `${data.firstName} ${data.secondName}`.trim(),
    };
    if (type === "register") {
      delete payload.firstName;
      delete payload.secondName;
      console.log(payload);
    }

    //handle send data to server

    //login function
    async function _login() {
      const res = await login(loginData);
      const token = res.data.token;
      console.log("token", token);
      cookie.set("Bearer", token,{ path: "/" });
      navigate("/");
    }
    
    try {
      setLoading(true);
      if (type === "login") {
        _login();
      } else {
        await register(payload);

       await  _login();
        // navigate("/");
      }
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    // <div className="min-h-screen bg-gray-50  flex-col dark:bg-gray-900 flex items-center justify-center p-4">

    //  <div className="pb-3">
    //     <h2 className="text-purble">
    //       {type === "login" ? "Sign In" : "Sign Up"}
    //     </h2>
    //     <p className=" text-gray-500 dark:text-gray-300">
    //       {type === "login"
    //         ? "Welcome back! Please sign in to continue"
    //         : "Create your account and join us today"}
    //     </p>
    //   </div>

    //   <form
    //     className="max-w-md w-full mx-auto"
    //     onSubmit={handleSubmit(onSubmit)}
    //   >
    //     {/* email input */}
    //     <div className="relative z-0 w-full mb-5 group">
    //       <input
    //         type="email"
    //         {...formData("email")}
    //         id="email"
    //         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
    //           border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
    //           dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
    //           focus:ring-0 focus:border-purble peer"
    //         placeholder=" "
    //         required
    //       />
    //       {errors.email && (
    //         <p className="text-red-500">{errors.email.message}</p>
    //       )}
    //       <label
    //         htmlFor="email"
    //         className="peer-focus:font-medium absolute text-sm text-gray-500 
    //           dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
    //           top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
    //           peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
    //           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
    //           peer-focus:-translate-y-6"
    //       >
    //         Email address
    //       </label>
    //     </div>

    //     {/* password input */}
    //     <div className="relative z-0 w-full mb-5 group">
    //       <input
    //         type="password"
    //         {...formData("password")}
    //         id="password"
    //         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
    //           border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
    //           dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
    //           focus:ring-0 focus:border-purble peer"
    //         placeholder=" "
    //         required
    //       />
    //       {errors.password && (
    //         <p className="text-red-500">{errors.password.message}</p>
    //       )}
    //       <label
    //         htmlFor="password"
    //         className="peer-focus:font-medium absolute text-sm text-gray-500 
    //           dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
    //           top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
    //           peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
    //           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
    //           peer-focus:-translate-y-6"
    //       >
    //         Password
    //       </label>
    //     </div>

    //     {type === "register" && (
    //       <>
    //         {/* confirm password */}
    //         <div className="relative z-0 w-full mb-5 group">
    //           <input
    //             type="password"
    //             {...formData("rePassword")}
    //             id="rePassword"
    //             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
    //               border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
    //               dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
    //               focus:ring-0 focus:border-purble peer"
    //             placeholder=" "
    //             required
    //           />
    //           {errors.rePassword && (
    //             <p className="text-red-500">{errors.rePassword.message}</p>
    //           )}
    //           <label
    //             htmlFor="rePassword"
    //             className="peer-focus:font-medium absolute text-sm text-gray-500 
    //               dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
    //               top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
    //               peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
    //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
    //               peer-focus:-translate-y-6"
    //           >
    //             Confirm password
    //           </label>
    //         </div>

    //         {/* first + last name */}
    //         <div className="grid md:grid-cols-2 md:gap-6">
    //           <div className="relative z-0 w-full mb-5 group">
    //             <input
    //               type="text"
    //               {...formData("firstName")}
    //               id="firstName"
    //               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
    //                 border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
    //                 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
    //                 focus:ring-0 focus:border-purble peer"
    //               placeholder=" "
    //               required
    //             />
    //             {errors.firstName && (
    //               <p className="text-red-500">{errors.firstName.message}</p>
    //             )}
    //             <label
    //               htmlFor="firstName"
    //               className="peer-focus:font-medium absolute text-sm text-gray-500 
    //                 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
    //                 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
    //                 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
    //                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
    //                 peer-focus:-translate-y-6"
    //             >
    //               First name
    //             </label>
    //           </div>
    //           <div className="relative z-0 w-full mb-5 group">
    //             <input
    //               type="text"
    //               {...formData("secondName")}
    //               id="secondName"
    //               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
    //                 border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
    //                 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
    //                 focus:ring-0 focus:border-purble peer"
    //               placeholder=" "
    //               required
    //             />
    //             {errors.secondName && (
    //               <p className="text-red-500">{errors.secondName.message}</p>
    //             )}
    //             <label
    //               htmlFor="secondName"
    //               className="peer-focus:font-medium absolute text-sm text-gray-500 
    //                 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
    //                 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
    //                 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
    //                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
    //                 peer-focus:-translate-y-6"
    //             >
    //               Last name
    //             </label>
    //           </div>
    //         </div>

    //         {/* date of birth */}
    //         <div className="relative z-0 w-full mb-5 group">
    //           <input
    //             type="date"
    //             {...formData("dateOfBirth")}
    //             id="dateOfBirth"
    //             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
    //               border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
    //               dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
    //               focus:ring-0 focus:border-purble peer"
    //             required
    //           />
    //           {errors.dateOfBirth && (
    //             <p className="text-red-500">{errors.dateOfBirth.message}</p>
    //           )}
    //           <label
    //             htmlFor="dateOfBirth"
    //             className="peer-focus:font-medium absolute text-sm text-gray-500 
    //               dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
    //               top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
    //               peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
    //               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
    //               peer-focus:-translate-y-6"
    //           >
    //             Date of Birth
    //           </label>
    //         </div>

    //         {/* gender */}
    //         <div className="w-[150px] mb-5">
    //           <label
    //             htmlFor="gender"
    //             className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
    //           >
    //             Gender
    //           </label>
    //           <select
    //             id="gender"
    //             {...formData("gender")}
    //             className="block w-full rounded-lg border border-gray-300 bg-white 
    //               py-2 px-3 text-sm text-gray-900 shadow-sm focus:border-blue-500 
    //               focus:ring focus:ring-blue-200 focus:ring-opacity-50 
    //               dark:bg-gray-800 dark:text-white dark:border-gray-600 
    //               dark:focus:border-blue-500"
    //             required
    //           >
    //             <option value="">Select gender</option>
    //             <option value="male">Male</option>
    //             <option value="female">Female</option>
    //           </select>
    //           {errors.gender && (
    //             <p className="text-red-500">{errors.gender.message}</p>
    //           )}
    //         </div>
    //       </>
    //     )}

    //     <button
    //       type="submit"
    //       className="cursor-pointer text-white btn focus:ring-4 focus:outline-none focus:ring-purble-300 
    //         font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
    //         dark:bg-purble dark:hover:bg-purple-700 dark:focus:ring-blue-800"
    //     >
    //       {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : btnText}
    //     </button>
    //     {type === "login" && (
    //       <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
    //         Don’t have an account?
    //         <NavLink
    //           to="/register"
    //           className="text-purble font-medium hover:underline"
    //         >
    //           Register Now
    //         </NavLink>
    //       </p>
    //     )}
    //   </form>
    //   {errorMessage && <ErrorMessage message={errorMessage} />}
    // </div>
   
     <div className="min-h-screen bg-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg my-auto">
        {/* Header Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-t-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 shadow-xl">
          <div className="text-center">
            {/* Logo/Icon */}
            <div className="mx-auto w-16 h-16 bg-purble rounded-full flex items-center justify-center mb-4 shadow-lg">
              <i className={`fas ${type === 'login' ? 'fa-sign-in-alt' : 'fa-user-plus'} text-white text-2xl`}></i>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {type === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              {type === "login"
                ? "Sign in to your account to continue"
                : "Join us today and get started"}
            </p>
          </div>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-b-2xl border-x border-b border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                {...formData("email")}
                id="email"
                className="peer w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200"
                placeholder="Email address"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-purple-600 dark:peer-focus:text-purple-400 peer-focus:bg-white dark:peer-focus:bg-gray-800"
              >
                Email address
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                {...formData("password")}
                id="password"
                className="peer w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200"
                placeholder="Password"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-purple-600 dark:peer-focus:text-purple-400 peer-focus:bg-white dark:peer-focus:bg-gray-800"
              >
                Password
              </label>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.password.message}
                </p>
              )}
            </div>

            {type === "register" && (
              <>
                <div className="relative">
                  <input
                    type="password"
                    {...formData("rePassword")}
                    id="rePassword"
                    className="peer w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200"
                    placeholder="Confirm Password"
                    required
                  />
                  <label
                    htmlFor="rePassword"
                    className="absolute left-4 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-purple-600 dark:peer-focus:text-purple-400 peer-focus:bg-white dark:peer-focus:bg-gray-800"
                  >
                    Confirm Password
                  </label>
                  {errors.rePassword && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {errors.rePassword.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      {...formData("firstName")}
                      id="firstName"
                      className="peer w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200"
                      placeholder="First Name"
                      required
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-4 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-purple-600 dark:peer-focus:text-purple-400 peer-focus:bg-white dark:peer-focus:bg-gray-800"
                    >
                      First Name
                    </label>
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <i className="fas fa-exclamation-circle mr-1"></i>
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      {...formData("secondName")}
                      id="secondName"
                      className="peer w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200"
                      placeholder="Last Name"
                      required
                    />
                    <label
                      htmlFor="secondName"
                      className="absolute left-4 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:left-4 peer-focus:text-sm peer-focus:text-purple-600 dark:peer-focus:text-purple-400 peer-focus:bg-white dark:peer-focus:bg-gray-800"
                    >
                      Last Name
                    </label>
                    {errors.secondName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <i className="fas fa-exclamation-circle mr-1"></i>
                        {errors.secondName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="date"
                    {...formData("dateOfBirth")}
                    id="dateOfBirth"
                    className="peer w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200"
                    required
                  />
                  <label
                    htmlFor="dateOfBirth"
                    className="absolute left-4 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    Date of Birth
                  </label>
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div className="relative">
                  <select
                    {...formData("gender")}
                    id="gender"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <label
                    htmlFor="gender"
                    className="absolute left-4 -top-2.5 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    Gender
                  </label>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purble hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <i className={`fas ${type === 'login' ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2`}></i>
                  {btnText}
                </span>
              )}
            </button>

            {type === "login" && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
                Don't have an account?{" "}
                <NavLink
                  to="/register"
                  className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
                >
                  Register Now
                </NavLink>
              </p>
            )}
          </form>

          {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
      </div>
    </div>
  );
}


