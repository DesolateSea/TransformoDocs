import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch hook from react-redux
import { loginSuccess } from "../../Store/userSlice"; // Import loginSuccess action from userSlice
import { LoginProps } from "../../Lib/interface/Authentication";

const Login: React.FC<LoginProps> = ({ value, setValue, API }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const setRegister = (info: any) => {
    dispatch(loginSuccess(info));
  };

  const handleLogin = () => {
    API.login({ value, setRegister }, setMsg, navigate);
  };

  return (
    <div className="bottom">
      <div className="flex flex-col text-left px-16">
        <div className="text-white head-info">Email*</div>
        <input
          className="input-detail"
          name="EMAIL"
          value={value.EMAIL}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col px-16 text-left">
        <div className="text-white head-info">Password*</div>
        <input
          className="input-detail"
          name="PASSWORD"
          value={value.PASSWORD}
          onChange={handleChange}
        />
      </div>
      <button className="enterdetail btn" onClick={handleLogin}>
        Login
      </button>
      {msg && <div className="mt-2 text-base text-center text-red-500 msg">{msg}</div>}
    </div>
  );
};

export default Login;
