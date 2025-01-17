import Auth from "../../Lib/interface/Auth";
export interface LoginBlockProps {
  API: Auth;
}
export interface SignupProps {
  value: { EMAIL: string; PASSWORD: string };
  setValue: (value: { EMAIL: string; PASSWORD: string }) => void;
  Update: (step: number) => void;
  AUTH: (data: { AUTHENTICATION: string; OTP: string }) => void;
  API: Auth;
}
export interface LoginProps {
  value: {
    EMAIL: string;
    PASSWORD: string;
  };
  API: Auth;
  setValue: (value: { EMAIL: string; PASSWORD: string }) => void;
}
export interface LoginAuthProps {
  value: {
    EMAIL: string;
    PASSWORD: string;
  };
  setRegister: (value: { state: boolean; info: string }) => void;
}
export interface OTPVerificationProps {
  value: { OTP: string; AUTHENTICATION: string };
  setValue: (value: { OTP: string; AUTHENTICATION: string }) => void;
  Update: (step: number) => void;
  PASS: (data: {
    AUTHENTICATION: string;
    PASSWORD: string;
    CPASSWORD: string;
    EMAIL: string;
  }) => void;
  API: Auth;
  work?: number;
}
export interface VerficationProps {
  value: { AUTHENTICATION: string; OTP: string };
  Update: (step: number) => void;
  API: Auth;
  PASS: (data: {
    AUTHENTICATION: string;
    PASSWORD: string;
    CPASSWORD: string;
    EMAIL: string;
  }) => void;
}
export interface ResendProps {
  value: { AUTHENTICATION: string; OTP: string };
}

export interface ConfirmPasswordProps {
  value: {
    AUTHENTICATION: string;
    PASSWORD: string;
    CPASSWORD: string;
    EMAIL: string;
  };
  API: Auth;
  setValue: (value: {
    PASSWORD: string;
    CPASSWORD: string;
    AUTHENTICATION: string;
    EMAIL: string;
  }) => void;
}
export interface EmailVerificationProps {
  value: { OTP: string; AUTHENTICATION: string };
  setValue: (value: { OTP: string; AUTHENTICATION: string }) => void;
  Update: (step: number) => void;
  PASS: (data: {
    AUTHENTICATION: string;
    PASSWORD: string;
    CPASSWORD: string;
    EMAIL: string;
  }) => void;
}
export interface ForgetPasswordProps {
  EMAIL: string;
  setValue: (value: string) => void;
  AUTH: (data: { AUTHENTICATION: string; OTP: string }) => void;
  Update: (step: number) => void;
  API: Auth;
}
