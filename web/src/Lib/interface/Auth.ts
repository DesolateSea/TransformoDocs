import { EmailVerificationProps } from "./Authentication";
import {
  LoginAuthProps,
  SignupPropsAPI,
  ResendPropsAPI,
  ConfirmPasswordAPI,
  ForgetPasswordPropsAPI,
  VerficationPropsAPI,
} from "./AuthenticationAPI";
import { VerficationProps } from "./Authentication";
interface Auth {
  /**
   * Resend the OTP (One Time Password) to the user.
   * @param {ResendPropsAPI} props - The props object containing user information.
   * @param {Function} setTimer - Function to reset the OTP timer.
   * @param {Function} setMsg - Function to set the message to display to the user.
   * @returns {Promise<void>} - Promise resolving to no value.
   */
  resendOTP(
    props: ResendPropsAPI,
    setTimer: Function,
    setMsg: Function
  ): Promise<void>;

  /**
   * Verify the OTP entered by the user.
   * @param {EmailVerificationProps} props - The props object containing OTP and user information.
   * @param {Function} setMsg - Function to set the message to display to the user.
   * @returns {Promise<void>} - Promise resolving to no value.
   */
  verifyOTP(props: EmailVerificationProps, setMsg: Function): Promise<void>;

  /**
   * Handle forgot password process by sending an email to the user.
   * @param {ForgetPasswordPropsAPI} props - The props object containing user email.
   * @param {Function} setMsg - Function to set the message to display to the user.
   * @returns {Promise<void>} - Promise resolving to no value.
   */
  forgotPassword(
    props: ForgetPasswordPropsAPI,
    setMsg: Function
  ): Promise<void>;

  /**
   * Confirm password change process after OTP verification.
   * @param {ConfirmPasswordAPI} props - The props object containing new password details.
   * @returns {Promise<void>} - Promise resolving to no value.
   */
  confirmPasswordChange(props: ConfirmPasswordAPI): Promise<void>;

  /**
   * Log in the user by validating their credentials.
   * @param {LoginAuthProps} props - The props object containing login credentials (email and password).
   * @param {Function} setMsg - Function to set the message to display to the user.
   * @param {Function} navigate - Function to navigate to a different page upon successful login.
   * @returns {Promise<void>} - Promise resolving to no value.
   */
  login(
    props: LoginAuthProps,
    setMsg: Function,
    navigate: Function
  ): Promise<void>;

  /**
   * Handle the user registration process (signup).
   * @param {SignupPropsAPI} props - The props object containing user details for registration.
   * @returns {Promise<void>} - Promise resolving to no value.
   */
  signup(props: SignupPropsAPI): Promise<void>;

  /**
   * Log out the user by clearing session data.
   * @returns {Promise<void>} - Promise resolving to no value.
   */
  logout(): Promise<void>;
  /**
   * Handle reset password otp verification process.
   * @param {Props} props - The props object containing OTP and user information.
   * @param {Function} setMsg - Function to set the message to display to the user.
   * @throws {Error} - Throws an error if OTP verification fails.
   */
  verifyResetOtp(props: VerficationPropsAPI, setMsg: Function): Promise<void>;
}

export default Auth;
