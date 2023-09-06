import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import backgroundImage from "../resources/Rectangle 4.png";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div class="flex w-full">
        <div class="w-1/2 bg-white">
          <div class="flex flex-col min-h-screen justify-center items-center">
            <img className="" src={require("../resources/Login.png")} />
            <p className="mb-3">lorem ipsum dolor at ERP IDEAHUB dummy ...</p>
            <section className="heading"></section>
            <section className="form">
              <form onSubmit={onSubmit}>
                <div
                  style={{ backgroundColor: "#f3f1ff", width: "25vw" }}
                  className="form-group bg-slate-300 rounded-md m-3 flex flex-row items-start justify-start w-fit"
                >
                  {/* f3f1ff */}
                  <img
                    className="h-5 w-5 mx-5 m-auto"
                    src={require("../resources/user_icon.png")}
                  />
                  <input
                    type="email"
                    className="form-control input input-ghost w-full"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="username"
                    required
                  />
                </div>
                <div
                  style={{ backgroundColor: "#f3f1ff", width: "25vw" }}
                  className="form-group bg-slate-300 rounded-xl m-3 flex flex-row items-start justify-start"
                >
                  <img
                    className="h-5 w-5 mx-5 m-auto"
                    src={require("../resources/lock.png")}
                  />
                  <input
                    type="password"
                    className="form-control input input-ghost w-full"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="form-group flex flex-col justify-center items-center">
                  <button className="btn login-btn rounded-2xl shadow-xl box-border border-black">
                    <p className="text-white">Login Now</p>
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <div class="w-1/2 bg-slate-500 login-icon-container flex flex-col  justify-center items-center">
          <div className="login-icon-container-2 flex flex-col  justify-center items-center">
            <img className="" src={require("../resources/ideahub-c.png")} />
            <p className="px-9 max-w-[350px]">
              A Consultancy and Solution Provider offering all aspects of
              'Below-the-Line' Advertising and Support
            </p>
            <div className="rounded-full h-[75px] w-[75px] bg-white absolute top-[60%] right-[100%] circle-x flex flex-col  justify-center items-center">
            <img className="" src={require("../resources/thunderbolt 1.png")} />
            </div>
          </div>
          
        </div>
      </div>

      {/* <div className="bg-[url('../resources/Rectangle 4.svg')]"></div>  */}
    </>
  );
}

export default Login;
