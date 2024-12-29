import LoginBlock from "../components/Utility/LoginBlock";
import AuthService from "../services/API.Login";
const LoginPage = () => {
    const API = new AuthService();
  return (
    <div>
      <LoginBlock API={API} />
    </div>
  );
};

export default LoginPage;