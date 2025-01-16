import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch hook from react-redux
import { loginSuccess } from "../../Store/userSlice"; // Import loginSuccess action from userSlice
import { ConfirmPasswordProps } from "../../Lib/interface/Authentication";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
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
        <input
          className="input-detail"
          name="PASSWORD"
          value={value.PASSWORD}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col text-left px-2">
        <label className={`head-info ${mode ? "dark-mode" : ""}`}>
          Confirm Password*
        </label>
        <input
          className="input-detail"
          name="CPASSWORD"
          value={value.CPASSWORD}
          onChange={handleChange}
        />
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
