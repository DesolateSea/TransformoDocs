import React, { useState } from "react";
import { ForgetPasswordProps } from "../../Lib/interface/Authentication";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const ForgetPassword: React.FC<ForgetPasswordProps> = ({ EMAIL, setValue, AUTH, Update, API }) => {
  const [msg, setMsg] = useState<string>("");
  const mode = useSelector((state: RootState) => state.mode.mode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    API.forgotPassword({ EMAIL: EMAIL, setValue, Update ,AUTH}, setMsg);
  };

  return (
    <div className="bottom">
      <div className="container flex flex-col text-left px-2">
        <label className={`head-info ${mode?"dark-mode":""}`}>Email*</label>
        <input
          className="input-detail"
          name="EMAIL"
          value={EMAIL}
          onChange={handleChange}
        />
        <button className="enterdetail btn" onClick={handleSubmit}>
          Enter
        </button>
        {msg && (
          <div className="mt-2 text-base text-center text-red-500 msg">{msg}</div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
