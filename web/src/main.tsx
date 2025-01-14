import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ConvertPdf from './container/ConvertPdf';
import ConvertNonMachineReadable from './container/ConvertNonMachineReadable';
import ConvertImage from './container/ConvertImage';  // Import ConvertImage
import './index.css';
import LoginPage from './container/LoginPage';
import { Provider } from 'react-redux';
import { store } from './store';
import Footer from './components/Ui/Footer';
import Test from './components/Ui/Test';
import LoginUser from './container/LoginUser';
const rootElement = document.getElementById('root');

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginUser />} />
                    <Route path="convert-pdf" element={<ConvertPdf />} />
                    <Route path="convert-non-machine-readable" element={<ConvertNonMachineReadable />} />
                    <Route path="convert-image" element={<ConvertImage />} /> {/* Add route for ConvertImage */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/ui" element = {<Test></Test>} />
                </Routes>
            </Router>
            </Provider>
        </React.StrictMode>
    );
}
