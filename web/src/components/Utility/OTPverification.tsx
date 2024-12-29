import React, { useEffect, useState } from "react";
import { OTPVerificationProps } from "../../Lib/interface/Authentication";

const OTPVerification: React.FC<OTPVerificationProps> = ({ value, setValue, Update, PASS, work, API }) => {
  const [timer, setTimer] = useState<number>(300); // 5 minutes in seconds
  const [msg, setMsg] = useState<string>("");
  const [isResendVisible, setIsResendVisible] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      setIsResendVisible(false);
      return () => clearInterval(countdown);
    } else {
      setIsResendVisible(true);
    }
  }, [timer]);

  const formatTime = (): string => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bottom">
      <div className="container flex flex-col text-left px-16">
        <div className="text-white head-info">OTP</div>
        {isResendVisible ? null : (
          <span className="text-white timer">Resend in {formatTime()}</span>
        )}
        <input
          className="input-detail"
          name="OTP"
          value={value.OTP}
          placeholder="6-digit Code"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-row">
        {isResendVisible && (
          <button
            className="enterdetail btn"
            onClick={() => {
              API.resendOTP({value}, setTimer, setMsg);
            }}
          >
            Resend
          </button>
        )}
        <button
          className="enterdetail btn"
          onClick={() => {
            API.verifyOTP({ value, Update, PASS, work }, setMsg);
          }}
        >
          Enter
        </button>
      </div>
      {msg && <div className="mt-2 text-base text-center text-red-500 msg">{msg}</div>}
    </div>
  );
};

export default OTPVerification;
