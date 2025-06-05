import axios from "axios";
import server from "../server.json";

/**
 * Verifies the user authentication by sending a GET request to the server.
 * @returns {Promise<any | null>} - Returns user information if authenticated, or null if not.
 */
export const UserVerify = async (): Promise<any | null> => {
  // Retrieve the backend URL from environment variables
  let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;

  // Configure axios to include credentials (e.g., cookies) with requests
  axios.defaults.withCredentials = true;

  try {
    // Send a GET request to the verification endpoint
    const response = await axios.get(`${BACKWEB}${server.User.getUserInfo}`, {
      headers: {
        // Set the Accept header to expect JSON responses
        Accept: "application/json",
      },
      withCredentials: true, // Include credentials such as cookies in the request
    });

    // If the server responds with HTTP status 200, user is authenticated
    if (response.status === 200) {
      // Extract and return user information from the response
      const userInfo = response.data;
      return userInfo;
    } else {
      // If the status is not 200, return null (unauthenticated)
      return null;
    }
  } catch (e) {
    // In case of an error (e.g., network issues), return null
    return null;
  }
};

export const PasswordVerifier = (password: string) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  );
};

export const EmailVerifier = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
