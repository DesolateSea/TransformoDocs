import React, { useState } from "react";
import AuthService from "../../services/API.Login";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../Store/userSlice";
import { Eye, EyeOff } from "lucide-react";
import { PasswordVerifier } from "../../scripts/UserAuth";
import { RootState } from "../../store";
import { ConfirmPasswordProps } from "../../Lib/interfaces/Authentication/Authentication";

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({
  value,
  setValue,
}) => {
  const dispatch = useDispatch();
  const [showPasswordNew, setShowPasswordNew] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);

  const API = new AuthService();

  const setRegister = (info: any) => {
    dispatch(loginSuccess(info));
  };

  const mode = useSelector((state: RootState) => state.mode.mode);

  const password = value.PASSWORD;
  const confirmPassword = value.CPASSWORD;

  const isPasswordValid = PasswordVerifier(password);
  const isPasswordsMatch = password === confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: fieldValue } = e.target;
    setValue({ ...value, [name]: fieldValue });
  };

  const handleConfirm = () => {
    if (!isPasswordValid) {
      setMsg("Password is not strong enough");
      return;
    }

    if (!isPasswordsMatch) {
      setMsg("Passwords do not match");
      return;
    }

    API.confirmPasswordChange({ ...value, setRegister });
  };

  return (
    <div className="bottom">
      <div className="container flex flex-col text-left px-2">
        <label className={`head-info ${mode ? "dark-mode" : ""}`}>
          New Password*
        </label>
        <div className="relative">
          <input
            className={`input-detail ${
              !isPasswordValid ? "border-red-500" : ""
            }`}
            type={showPasswordNew ? "text" : "password"}
            name="PASSWORD"
            value={password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-2 top-6 transform -translate-y-1/2"
            onClick={() => setShowPasswordNew((prev) => !prev)}
          >
            {showPasswordNew ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {!isPasswordValid && password.trim().length > 0 && (
          <div className="msg text-red-500 mt-1 text-sm">
            Password must be at least 8 characters long, include an uppercase
            letter, a number, and a special character.
          </div>
        )}
      </div>

      <div className="flex flex-col text-left px-2">
        <label className={`head-info ${mode ? "dark-mode" : ""}`}>
          Confirm Password*
        </label>
        <div className="relative">
          <input
            className={`input-detail ${
              !isPasswordsMatch ? "border-red-500" : ""
            }`}
            type={showPasswordConfirm ? "text" : "password"}
            name="CPASSWORD"
            value={confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-2 top-6 transform -translate-y-1/2"
            onClick={() => setShowPasswordConfirm((prev) => !prev)}
          >
            {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {!isPasswordsMatch && confirmPassword.trim().length > 0 && (
          <div className="msg text-red-500 mt-1 text-sm">
            Passwords do not match.
          </div>
        )}
      </div>

      <button className="enterdetail btn" onClick={handleConfirm}>
        Confirm
      </button>

      {msg && (
        <div className="msg text-red-500 mt-2 text-base text-center">{msg}</div>
      )}
    </div>
  );
};

export default ConfirmPassword;
