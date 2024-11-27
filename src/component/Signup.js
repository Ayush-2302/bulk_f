import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";

function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(
      `https://bulk-backend.onrender.com/api/auth/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/login");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Something went wrong", "danger");
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex items-center justify-center text-black h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg max-w-4xl w-full p-8">
        <div className="mb-6 md:mb-0 md:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full rounded-lg"
            alt="Signup"
          />
        </div>
        <div className="w-full md:w-5/12">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
              Create a new account
            </h2>


            {/* Name input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
            </div>
            <TEInput
              type="text"
              name="name"
              className="w-full px-4 py-2 border text-gray-800 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={credentials.name}
              onChange={onchange}
              placeholder="Enter your name"
            />

            {/* Email input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email address
              </label>
            </div>
            <TEInput
              type="email"
              name="email"
              className="w-full px-4 py-2 border text-gray-800 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={credentials.email}
              onChange={onchange}
              placeholder="Enter email"
            />

            {/* Password input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <TEInput
              type="password"
              name="password"
              className="w-full px-4 py-2 border text-gray-800 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={credentials.password}
              onChange={onchange}
              placeholder="Enter password"
            />

            {/* Confirm Password input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="cpassword"
              >
                Confirm Password
              </label>
            </div>
            <TEInput
              type="password"
              name="cpassword"
              className="w-full px-4 py-2 border text-gray-800 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={credentials.cpassword}
              onChange={onchange}
              placeholder="Confirm your password"
            />

            {/* Submit button */}
            <TERipple className="w-full">
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition duration-200"
              >
                Signup
              </button>
            </TERipple>

            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
