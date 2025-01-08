import React from "react";
import { SignupProps } from "../../Lib/interface/Authentication";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const Signup: React.FC<SignupProps> = ({ value, setValue, Update, AUTH, API }) => {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bottom">
      <div className="container flex flex-col text-left px-2">
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
      <button
        className="enterdetail btn"
        onClick={() => {
          API.signup({ value, setValue, Update, AUTH });
        }}
      >
        Signup
      </button>
    </div>
  );
};

export default Signup;
