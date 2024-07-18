import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../redux/actions/user";
import notify  from "../../utils/toastHandler";



const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("1100011000");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    if (!name || !lastName || !email || !password || !phoneNumber) {
      notify("Required all inputs", "error");
      return;
    }
    if (phoneNumber.length !== 10) {
      notify("Invalid Phone number!", "error");
      return;
    }

    e.preventDefault();

    const myForm = {
      name,
      lastName,
      email,
      password,
      phoneNumber,
    };
    dispatch(register(myForm));
  };

  return (
    <div>
      <section className="md:h-[100vh]">
        <div className="px-6 py-4 h-screen text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <div className="md:mt-6">
                {/* First Name */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                    placeholder="First Name*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                {/* Last Name */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                    placeholder="Last Name*"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                {/*Phone Number */}
                <div className="mb-6">
                  <input
                    type="number"
                    className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                    placeholder="Phone number*"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    maxLength={10}
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                    placeholder="Email Address*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                    placeholder="Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="text-center mt-5 lg:text-left">
                  <button
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={submitHandler}
                  >
                    Sign up
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Have an account?
                    <Link
                      to="/login"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      {" "}
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
