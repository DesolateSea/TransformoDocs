import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ConvertPdf from "./container/ConvertPdf";
import ConvertNonMachineReadable from "./container/ConvertNonMachineReadable";
import ConvertImage from "./container/ConvertImage";
import LoginPage from "./container/LoginPage";
import LoginUser from "./container/LoginUser";
import Test from "./components/Ui/Test";
import { useSelector } from "react-redux";
import { verifyUser } from "./Store/userSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./Hooks/useAppRedux";
const App: React.FC = () => {
  // Define the routes for the application
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const user = useSelector((state: any) => state.user.userInfo);

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <LoginUser /> : <div>HELLO</div>}
        />
        <Route path="convert-pdf" element={<ConvertPdf />} />
        <Route
          path="convert-non-machine-readable"
          element={<ConvertNonMachineReadable />}
        />
        <Route path="convert-image" element={<ConvertImage />} />{" "}
        {/* Add route for ConvertImage */}
        <Route path="/ui" element={<Test></Test>} />
      </Routes>
    </Router>
  );
};

export default App;
