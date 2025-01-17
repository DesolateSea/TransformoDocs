import axios, { AxiosResponse } from "axios";
import server from "../server.json";
import {
  LoginAuthProps,
  SignupProps,
  VerficationProps,
  ResendProps,
  ForgetPasswordProps,
  EmailVerificationProps,
} from "../Lib/interface/Authentication";
import {
  ConfirmPasswordAPI,
  VerficationPropsAPI,
} from "../Lib/interface/AuthenticationAPI";
import Auth from "../Lib/interface/Auth";
class AuthService implements Auth {
  private baseURL: string;
  private server: any;

  constructor() {
    // Initialize base URL and server configuration from environment variables and server.json
    this.baseURL = import.meta.env.VITE_REACT_APP_BACKWEB!;
    this.server = server;
  }

  /**
   * Helper method to handle API POST requests.
   * @param {string} endpoint - The API endpoint to call.
   * @param {object} data - The data to send with the POST request.
   * @returns {Promise<AxiosResponse>} - Returns the response data from the server.
   * @throws {Error} - Throws an error if the request fails.
   */
  private async postRequest(
    endpoint: string,
    data: object
  ): Promise<AxiosResponse> {
    try {
      // Send POST requsest to the specified endpoint with the provided data
      const response = await axios.post(`${this.baseURL}${endpoint}`, data, {
        headers: { Accept: "application/json" },
      });
      return response;
    } catch (error: any) {
      // Throw an error with a message from the response or a default error message
      throw new Error(error.response?.data?.message || "An error occurred");
    }
  }
  /**
   * Resend the OTP (One Time Password) to the user.
   * @param {ResendProps} props - The props object containing user information.
   * @param {Function} setTimer - Function to reset the OTP timer.
   * @param {Function} setMsg - Function to set the message to display to the user.
   * @throws {Error} - Throws an error if the OTP resend fails.
   */
  async resendOTP(
    props: ResendProps,
    setTimer: Function,
    setMsg: Function
  ): Promise<void> {
    try {
      // Send request to resend OTP
      const response: AxiosResponse = await this.postRequest(
        this.server.Auth.resend,
        { ...props.value }
      );
      if (response.status !== 200) throw new Error("Failed to Send OTP");

      // Reset timer to 5 minutes
      setTimer(300);
      // Set success message
      setMsg("OTP resent successfully.");
    } catch (error: any) {
      // Set error message
      setMsg(error.message);
      console.error(error);
    }
  }

  /**
   * Verify the OTP entered by the user.
   * @param {Props} props - The props object containing OTP and user information.
   * @param {Function} setMsg - Function to set the message to display to the user.
   * @throws {Error} - Throws an error if OTP verification fails.
   */
  async verifyOTP(
    props: EmailVerificationProps,
    setMsg: Function
  ): Promise<void> {
    try {
      // Send request to verify OTP
      const response: AxiosResponse = await this.postRequest(
        this.server.Auth.verifyEmail,
        { otp: props.value.OTP, email: props.value.AUTHENTICATION }
      );
      if (response.status !== 200) throw new Error("Invalid OTP");

      // Reload page on successful verification
      window.location.reload();

      setMsg("OTP verified successfully.");
    } catch (error: any) {
      // Set error message
      setMsg(error.message);
      console.error(error);
    }
  }
  /**
   * Handle reset password otp verification process.
   * @param {Props} props - The props object containing OTP and user information.
   * @param {Function} setMsg - Function to set the message to display to the user.
   * @throws {Error} - Throws an error if OTP verification fails.
   */
  async verifyResetOtp(
    props: VerficationPropsAPI,
    setMsg: Function
  ): Promise<void> {
    try {
      // Send request to verify OTP
      const response: AxiosResponse = await this.postRequest(
        this.server.Auth.verifyResetOtp,
        { otp: props.value.OTP, email: props.value.AUTHENTICATION }
      );
      if (response.status !== 200) throw new Error("Invalid OTP");

      // Handle OTP verification logic based on the work value
      props.Update(5);
      props.PASS({
        AUTHENTICATION: response.data.token,
        PASSWORD: "",
        CPASSWORD: "",
        EMAIL: props.value.AUTHENTICATION,
      });

      setMsg("OTP verified successfully.");
    } catch (error: any) {
      // Set error message
      setMsg(error.message);
      console.error(error);
    }
  }
  /**
   * Handle forgot password process by sending an email to the user.
   * @param {ForgetPasswordProps} props - The props object containing user email.
   * @throws {Error} - Throws an error if sending the password reset email fails.
   */
  async forgotPassword(
    props: ForgetPasswordProps,
    setMsg: Function
  ): Promise<void> {
    try {
      // Send request to initiate password reset process
      const response: AxiosResponse = await this.postRequest(
        this.server.Auth.forgetPassword,
        { email: props.EMAIL }
      );
      if (response.status !== 200) throw new Error("Failed to Send Email");

      // Update state to show OTP verification screen
      props.Update(4);
      props.AUTH({
        AUTHENTICATION: props.EMAIL,
        OTP: "",
      });
    } catch (error: any) {
      // Set error message
      setMsg(error.message);
      console.error(error);
    }
  }

  /**
   * Confirm password change process after OTP verification.
   * @param {ConfirmPasswordAPI} props - The props object containing new password details.
   * @throws {Error} - Throws an error if confirming password change fails.
   */
  async confirmPasswordChange(props: ConfirmPasswordAPI): Promise<void> {
    try {
      // Send request to confirm password change
      console.log({
        password: props.PASSWORD,
        token: props.AUTHENTICATION,
        email: props.EMAIL,
      });
      const response: AxiosResponse = await this.postRequest(
        this.server.Auth.updatePassword,
        {
          password: props.PASSWORD,
          token: props.AUTHENTICATION,
          email: props.EMAIL,
        }
      );
      if (response.status !== 200)
        throw new Error("Failed to confirm password change");

      // Update register state to mark user as successfully registered
      console.log("Successfully changed password");
      window.location.reload();
      // props.setRegister({
      //   state: true,
      //   info: "Password changed successfully",
      // });
    } catch (error: any) {
      console.error(error);
    }
  }

  /**
   * Log in the user by validating their credentials.
   * @param {Props} props - The props object containing login credentials (email and password).
   * @param {Function} setMsg - Function to set the message to display to the user.
   * @param {Function} navigate - Function to navigate to a different page upon successful login.
   * @throws {Error} - Throws an error if login fails due to invalid credentials.
   */
  async login(
    props: LoginAuthProps,
    setMsg: Function,
    navigate: Function
  ): Promise<void> {
    try {
      // Send request to log in the user
      const response: AxiosResponse = await this.postRequest(
        this.server.Auth.login,
        { email: props.value.EMAIL, password: props.value.PASSWORD }
      );
      if (response.status !== 200) throw new Error("Invalid Credentials");
      console.log(response.data);
      // Update register state with user info
      props.setRegister({
        state: true,
        info: response.data,
      });
      navigate("/"); // Navigate to the home page after successful login
      setMsg("You are logged in!");
    } catch (error: any) {
      // Set error message
      setMsg(error.message);
      console.error(error);
    }
  }

  /**
   * Handle the user registration process (signup).
   * @param {SignupProps} props - The props object containing user details for registration.
   * @throws {Error} - Throws an error if registration fails.
   */
  async signup(props: SignupProps): Promise<void> {
    try {
      // Send request to register a new user
      const response: AxiosResponse = await this.postRequest(
        this.server.Auth.register,
        { email: props.value.EMAIL, password: props.value.PASSWORD }
      );
      if (response.status !== 201) throw new Error("Failed to register");

      // Update state to show OTP verification screen after successful registration
      props.Update(2);
      props.AUTH({
        AUTHENTICATION: props.value.EMAIL,
        OTP: "",
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  /**
   * Log out the user by clearing session data.
   * @throws {Error} - Throws an error if logout fails.
   */
  async logout(): Promise<void> {
    try {
      // Send request to log out the user
      const response: AxiosResponse = await this.postRequest(
        this.server.Auth.logout,
        {}
      );
      if (response.status !== 200) throw new Error("Failed to logout");

      // Reload page after successful logout
      window.location.reload();
    } catch (error: any) {
      console.error(error);
    }
  }
}

export default AuthService;
