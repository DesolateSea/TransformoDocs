import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux"; // Import useDispatch hook from react-redux
import { loginSuccess } from "../../Store/userSlice"; // Import loginSuccess action from userSlice
import { LoginProps } from "../../Lib/interface/Authentication";
import { RootState } from "../../store";
const Login: React.FC<LoginProps> = ({ value, setValue, API }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string>("");
  const mode = useSelector((state: RootState) => state.mode.mode);
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
    <div className={`bottom ${mode ? "dark-mode" : ""}`}>
      <div className="flex flex-col text-left px-2">
        <div className={`head-info ${mode?"dark-mode":""}`}>Email*</div>
        <input
          className="input-detail"
          name="EMAIL"
          value={value.EMAIL}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col px-2 text-left">
        <div className={`head-info ${mode?"dark-mode":""}`}>Password*</div>
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
