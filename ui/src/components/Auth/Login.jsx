import  { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { login } from "../../redux/actions/user";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test");

  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please input all fields");
    }
  
    dispatch(login(email, password));
  };


  return (
    <section className="">
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone"
              loading="lazy"
            />
          </div>
          <div className=" w-11/12 md:w-8/12 lg:w-5/12 lg:ml-20">
            <div className="md:mt-6">
              <div className="mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <Link
                  to="/forgetpassword"
                  className=" hover:underline text-sm text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex justify-start items-center mb-6">
                <Button text={"Login"} onClick={submitHandler} />

                <button className="text-center text-gray-800 bg-white-700 hover:underline  font-medium rounded-lg ml-5 mb-2 ">
                  <Link to={"/register"}>Sign up</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
