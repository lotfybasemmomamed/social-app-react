import { useForm } from "react-hook-form";

export default function AuthForm({ btnText, type }) {
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

  const { register: formData, handleSubmit } = useForm({
    defaultValues: defaultFormData,
  });

  function onSubmit(data) {
    if (type === "register") {
      const payload = {
        ...data,
        name: `${data.firstName} ${data.secondName}`.trim(),
      };

      delete payload.firstName;
      delete payload.secondName;
      console.log(payload);
    }

    console.log(data);
  }

  return (
    <div className="flex flex-col shadow-2xl p-[20px] w-[40%]">
      <div className="pb-3">
        <h2 className="text-purble">
          {type === "login" ? "Sign In" : "Sign Up"}
        </h2>
        <p className=" text-gray-500 dark:text-gray-300">
          {type === "login"
            ? "Welcome back! Please sign in to continue"
            : "Create your account and join us today"}
        </p>
      </div>

      <form
        className="max-w-md w-full mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* email input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            {...formData("email")}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
              border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
              dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
              focus:ring-0 focus:border-purble peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 
              dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
              top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
              peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
              peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        {/* password input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...formData("password")}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
              border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
              dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
              focus:ring-0 focus:border-purble peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 
              dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
              top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
              peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
              peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        {type === "register" && (
          <>
            {/* confirm password */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                {...formData("rePassword")}
                id="rePassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                  border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
                  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
                  focus:ring-0 focus:border-purble peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 
                  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
                  top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
                  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                  peer-focus:-translate-y-6"
              >
                Confirm password
              </label>
            </div>

            {/* first + last name */}
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  {...formData("firstName")}
                  id="firstName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                    border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
                    dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
                    focus:ring-0 focus:border-purble peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="firstName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 
                    dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
                    top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
                    peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                    peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  {...formData("secondName")}
                  id="secondName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                    border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
                    dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
                    focus:ring-0 focus:border-purble peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="secondName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 
                    dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
                    top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
                    peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                    peer-focus:-translate-y-6"
                >
                  Last name
                </label>
              </div>
            </div>

            {/* date of birth */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                {...formData("dateOfBirth")}
                id="dateOfBirth"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                  border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
                  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
                  focus:ring-0 focus:border-purble peer"
                required
              />
              <label
                htmlFor="dateOfBirth"
                className="peer-focus:font-medium absolute text-sm text-gray-500 
                  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 
                  top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-purble 
                  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                  peer-focus:-translate-y-6"
              >
                Date of Birth
              </label>
            </div>

            {/* gender */}
            <div className="w-[150px] mb-5">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Gender
              </label>
              <select
                id="gender"
                {...formData("gender")}
                className="block w-full rounded-lg border border-gray-300 bg-white 
                  py-2 px-3 text-sm text-gray-900 shadow-sm focus:border-blue-500 
                  focus:ring focus:ring-blue-200 focus:ring-opacity-50 
                  dark:bg-gray-800 dark:text-white dark:border-gray-600 
                  dark:focus:border-blue-500"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          className="text-white btn focus:ring-4 focus:outline-none focus:ring-purble-300 
            font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
            dark:bg-purble dark:hover:bg-purple-700 dark:focus:ring-blue-800"
        >
          {btnText}
        </button>
      </form>
    </div>
  );
}
