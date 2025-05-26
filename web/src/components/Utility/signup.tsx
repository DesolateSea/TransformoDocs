import { SignupProps } from "../../Lib/interfaces/Authentication";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
const Signup: React.FC<SignupProps> = ({
  value,
  setValue,
  Update,
  AUTH,
  API,
}) => {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const [showPassword, setShowPassword] = useState<boolean>(true);
  return (
    <div className="bottom">
      <div className="container flex flex-col text-left px-2">
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
