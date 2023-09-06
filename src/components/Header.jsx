import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import settingsIcon from '../resources/settings.svg';
import ideahubIcon from '../resources/ideahub.svg'
import { getNotifications, setViewedNotifications } from "../features/notifications/notificationSlice";
import { useEffect } from "react";
import { io } from "socket.io-client";

import notificationsFilledIcon from "../resources/notifications-filled.svg";
import notificationsIcon from "../resources/notifications.svg";
import dismissIcon from "../resources/red-x-icon.svg";

import { toast } from "react-toastify";
import API_BASE_URL from "../config";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { notifications,
    isError,
    isSuccess,
    isLoading,
    message,
    updateNotificationIsSuccess,
    updateNotificationIsError, } = useSelector((state) => state.notification);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {

    dispatch(getNotifications(user.data.role))

    //run on unmount
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, []);

  useEffect(() => {
    // Replace 'your_server_url' with the actual URL of your server
    const socket = io(`${API_BASE_URL}/`);

    // Generate a JWT token (replace with your actual token generation logic)
    const token = user.token;

    // Emit the 'subscribe' event with the JWT token
    socket.emit('subscribe', token);

    // Handle any incoming messages or events from the server
    socket.on('notification', (data) => {
      console.log('Received data from server:', data);
      toast.success('notification received ' + data.type + '-' + data.category + '-' + data.key)
      dispatch(getNotifications(user.data.role))
    });

    // Cleanup when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const setViewedNotification = (notification_id) => {
    const role = user.data.role
    dispatch(setViewedNotifications({ role: role, notification_ids: [notification_id] }))
  }

  return (
    <header className="header">
      <div className="navbar bg-base-100 h-10 pl-15">
        <div className="navbar-start">
          <Link to="/">
            <img src={require("./logo.png")} className="pl-6 h-6 lg:h-full" />
            {/* <img src={ideahubIcon} className=" px-7" /> */}
          </Link>
        </div>

        <div className="navbar-end">
          <div className="form-control hidden lg:block">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-25 md:w-auto h-7"
            />
          </div>

          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle m-1">
              <img
                className="h-5 w-5"
                src={notifications.length > 0 ? notificationsFilledIcon : notificationsIcon}
              />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-38 mr-1"
            >
              {notifications && notifications.map((notification) => (
                <>
                  <li className=" w-[400px] grid grid-cols-10">
                    <div className=" col-span-8 flex flex-col items-start">
                      <p>{notification.type} - {notification.category}</p>
                      <p>Ref - {notification.key}</p>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <button onClick={() => setViewedNotification(notification.index_no)} className=" ">
                        <img src={dismissIcon} alt="X" className=" w-7" />
                      </button>
                    </div>
                  </li>
                </>
              ))}
            </ul>
          </div>

          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <img
                className="h-5 w-5 svg-icon"
                src={settingsIcon}
              />
            </div>
          </button>
          {/*  src={require("../resources/ph_gear-fill.png")} */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar m-1">
              <div className="w-7 h-7 rounded-full">
                <img src={require("../resources/Profile.png")} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-38 mr-1"
            >
              {user ? (
                <>
                  <li>
                    <a>Profile</a>
                  </li>
                  <li onClick={onLogout}>
                    <a>
                      <FaSignOutAlt /> Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register">
                      <FaSignInAlt />
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <FaUser />
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
