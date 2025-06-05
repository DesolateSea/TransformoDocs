import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../Store/userSlice";
import { Eye, EyeOff } from "lucide-react";
import { EmailVerifier } from "../../scripts/UserAuth";
import { RootState } from "../../store";
import { LoginProps } from "../../Lib/interfaces/Authentication/Authentication";

const Login: React.FC<LoginProps> = ({ value, setValue, API }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string>("");
  const mode = useSelector((state: RootState) => state.mode.mode);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    setValue({ ...value, [name]: inputValue });
  };

  const setRegister = (info: any) => {
    dispatch(loginSuccess(info));
  };

  const isEmailValid = EmailVerifier(value.EMAIL);

  const handleLogin = () => {
    if (!isEmailValid && value.EMAIL.trim().length > 0) {
      setMsg("Invalid Email");
      return;
    }
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
        {!isEmailValid && value.EMAIL.trim().length > 0 && (
          <div className="text-red-500">Invalid Email</div>
        )}
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
          />
          <button
            type="button"
            className="absolute right-2 top-6 transform -translate-y-1/2"
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
