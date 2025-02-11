import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { verifyUser } from "./Store/userSlice";
import { useAppDispatch } from "./Hooks/useAppRedux";
import LoginUser from "./container/LoginUser";
import ConvertPdf from "./container/ConvertPdf";
import ConvertNonMachineReadable from "./container/ConvertNonMachineReadable";
import ConvertImage from "./container/ConvertImage";
import Test from "./components/Ui/Test";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(verifyUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
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
          <Route path="convert-image" element={<ConvertImage />} />
          <Route path="/ui" element={<Test />} />
        </Routes>
      </Router>
    </PersistGate>
  );
};

export default App;
