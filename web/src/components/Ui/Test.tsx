import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { RootState } from "../../store";
import { toggleDarkLight } from "../../Store/darkLightSlice";

const Test = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.mode.mode);

    return (
        <div className={`test ${mode ? "bg-black text-white" : "bg-white text-black"} relative`}>
            {/* Navbar */}
            <div className="relative mb-10 navbar">
            <NavBar />
            </div>
            
            {/* Content Section */}
            <div className="content-container ">
                {/* Add your main content here */}
                <h1 className="text-center mt-10">Main Content Section</h1>
                <button
                    className={`z-50 absolute ${mode ? "bg-black text-white" : "bg-white text-black"}`}
                    onClick={() => dispatch(toggleDarkLight())}
                >
                    {mode ? "light" : "dark"}
                </button>
            </div>
            
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Test;
