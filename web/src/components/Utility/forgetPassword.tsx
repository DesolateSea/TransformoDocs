import React, { useState } from "react";
import { ForgetPasswordProps } from "../../Lib/interface/Authentication";
const ForgetPassword: React.FC<ForgetPasswordProps> = ({ EMAIL, setValue, AUTH, Update, API }) => {
  const [msg, setMsg] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    API.forgotPassword({ EMAIL: EMAIL, setValue, Update ,AUTH}, setMsg);
  };

  return (
    <div className="bottom">
      <div className="container flex flex-col text-left px-16">
        <label className="text-white head-info">Email*</label>
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
