export interface SignupPropsAPI {
  value: { EMAIL: string; PASSWORD: string };
  setValue: (value: { EMAIL: string; PASSWORD: string }) => void;
  Update: (step: number) => void;
  AUTH: (data: { AUTHENTICATION: string; OTP: string }) => void;
}
export interface LoginAuthProps {
  value: {
    EMAIL: string;
    PASSWORD: string;
  };
  setRegister: (value: { state: boolean; info: string }) => void;
}
export interface OTPVerificationPropsAPI {
  value: { OTP: string; AUTHENTICATION: string };
  setValue: (value: { OTP: string; AUTHENTICATION: string }) => void;
  Update: (step: number) => void;
  PASS: (data: {
    AUTHENTICATION: string;
    PASSWORD: string;
    CPASSWORD: string;
  }) => void;
  work?: number;
}
export interface VerficationPropsAPI {
  value: { AUTHENTICATION: string; OTP: string };
  Update: (step: number) => void;
  PASS: (data: {
    AUTHENTICATION: string;
    PASSWORD: string;
    CPASSWORD: string;
    EMAIL: string;
  }) => void;
}
export interface ResendPropsAPI {
  value: { AUTHENTICATION: string; OTP: string };
}
export interface ConfirmPasswordAPI {
  PASSWORD: string;
  AUTHENTICATION: string;
  EMAIL: string;
  setRegister: (info: any) => void;
}

export interface ForgetPasswordPropsAPI {
  EMAIL: string;
  setValue: (value: string) => void;
  AUTH: (data: { AUTHENTICATION: string; OTP: string }) => void;
  Update: (step: number) => void;
}
