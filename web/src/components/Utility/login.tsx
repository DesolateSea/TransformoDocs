import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch hook from react-redux
import { loginSuccess } from "../../Store/userSlice"; // Import loginSuccess action from userSlice
import { LoginProps } from "../../Lib/interfaces/Authentication";
import { RootState } from "../../store";
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const setRegister = (info: any) => {
    dispatch(loginSuccess(info));
  };

  const handleLogin = () => {
    API.login({ value, setRegister }, setMsg, navigate);
  };

  return (
    <div className={`bottom ${mode ? "dark-mode" : ""}`}>
      <div className="flex flex-col text-left px-2">
        <div className={`head-info ${mode ? "dark-mode" : ""}`}>Email*</div>
        <input
          className="input-detail"
          name="EMAIL"
          value={value.EMAIL}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col px-2 text-left">
        <div className={`head-info ${mode ? "dark-mode" : ""}`}>Password*</div>
        <div className="relative">
          <input
            className="input-detail"
            type={showPassword ? "text" : "password"}
            name="PASSWORD"
            value={value.PASSWORD}
            onChange={handleChange}
          ></input>
          <button
            type="button"
            className={`absolute right-2 top-6 transform -translate-y-1/2 ${
              mode ? "text-white" : "text-black"
            }`}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <button className="enterdetail btn" onClick={handleLogin}>
        Login
      </button>
      {msg && (
        <div className="mt-2 text-base text-center text-red-500 msg">{msg}</div>
      )}
    </div>
  );
};

export default Login;
