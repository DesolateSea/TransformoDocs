import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch hook from react-redux
import { loginSuccess } from "../../Store/userSlice"; // Import loginSuccess action from userSlice
import { ConfirmPasswordProps } from "../../Lib/interface/Authentication";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Eye, EyeOff } from "lucide-react";
const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({
  value,
  setValue,
  API,
}) => {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState<string | null>(null);
  const mode = useSelector((state: RootState) => state.mode.mode);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: fieldValue } = e.target;
    setValue({ ...value, [name]: fieldValue });
  };
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(true);
  const [showPasswordNew, setShowPasswordNew] = useState<boolean>(true);
  const handleConfirm = useCallback(() => {
    if (value.PASSWORD !== value.CPASSWORD) {
      setMsg("Passwords do not match");
      return;
    }

    API.confirmPasswordChange({
      PASSWORD: value.PASSWORD,
      AUTHENTICATION: value.AUTHENTICATION,
      EMAIL: value.EMAIL,
      setRegister,
    });
  }, [value, API]);

  const setRegister = useCallback(
    (info: any) => {
      dispatch(loginSuccess(info));
    },
    [dispatch]
  );

  return (
    <div className="bottom">
      <div className="container flex flex-col text-left px-2">
        <label className={`head-info ${mode ? "dark-mode" : ""}`}>
          New Password*
        </label>
        <div className="relative">
          <input
            className="input-detail"
            type={showPasswordNew ? "text" : "password"}
            name="PASSWORD"
            value={value.PASSWORD}
            onChange={handleChange}
          ></input>
          <button
            type="button"
            className={`absolute right-2 top-6 transform -translate-y-1/2 ${
              mode ? "text-white" : "text-black"
            }`}
            onClick={() => setShowPasswordNew((prev) => !prev)}
          >
            {showPasswordNew ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <div className="flex flex-col text-left px-2">
        <label className={`head-info ${mode ? "dark-mode" : ""}`}>
          Confirm Password*
        </label>
        <div className="relative">
          <input
            className="input-detail"
            type={showPasswordConfirm ? "text" : "password"}
            name="CPASSWORD"
            value={value.CPASSWORD}
            onChange={handleChange}
          ></input>
          <button
            type="button"
            className={`absolute right-2 top-6 transform -translate-y-1/2 ${
              mode ? "text-white" : "text-black"
            }`}
            onClick={() => setShowPasswordConfirm((prev) => !prev)}
          >
            {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
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
