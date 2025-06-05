import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { OTPVerificationProps } from "../../Lib/interfaces/Authentication/Authentication";

const OTPVerification: React.FC<OTPVerificationProps> = ({
  value,
  setValue,
  Update,
  PASS,
  work,
  API,
}) => {
  const [timer, setTimer] = useState<number>(300); // 5 minutes
  const [msg, setMsg] = useState<string>("");
  const [isResendVisible, setIsResendVisible] = useState<boolean>(false);
  const otpInputs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.mode.mode);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    const otpArray = value.OTP.split("");
    otpArray[index] = input;
    setValue({
      ...value,
      OTP: otpArray.join(""),
    });
    if (input && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const otpArray = value.OTP.split("");
      otpArray[index] = "";
      setValue({
        ...value,
        OTP: otpArray.join(""),
      });
      if (index > 0) {
        otpInputs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (pasteData.length === 6) {
      setValue({ ...value, OTP: pasteData });
      pasteData.split("").forEach((char, i) => {
        const inputRef = otpInputs.current[i];
        if (inputRef) {
          inputRef.value = char;
        }
      });
    }
  };

  return (
    <div className="bottom">
      <div className="container flex flex-col text-left px-2">
        <div className="flex flex-row justify-between mb-7">
          <div className={`head-info ${mode ? "dark-mode" : ""}`}>OTP</div>
          {!isResendVisible && (
            <span className={`timer ${mode ? "text-white" : "text-gray-800"}`}>
              Resend in {formatTime()}
            </span>
          )}
        </div>

        <div className="flex gap-2 justify-center mt-2" onPaste={handlePaste}>
          {Array(6)
            .fill("")
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-10 h-10 text-center border border-gray-400 rounded-md"
                ref={(el) => (otpInputs.current[index] = el)}
                value={value.OTP[index] || ""}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-4">
        {isResendVisible && (
          <button
            className="btn resend"
            onClick={() => {
              API.resendOTP({ value }, setTimer, setMsg);
            }}
          >
            Resend
          </button>
        )}
        <button
          className="enterdetail btn"
          onClick={() => {
            if (work === 1) {
              API.verifyResetOtp({ value, Update, PASS }, setMsg);
            } else {
              API.verifyOTP({ value, setValue, Update, PASS }, setMsg);
            }
          }}
        >
          Enter
        </button>
      </div>

      {msg && (
        <div className="mt-2 text-base text-center text-red-500 msg">{msg}</div>
      )}
    </div>
  );
};

export default OTPVerification;
