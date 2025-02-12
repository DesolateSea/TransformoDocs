import {
  FaBrain,
  FaRobot,
  FaCogs,
  FaEye,
  FaMicrophone,
  FaImage,
} from "react-icons/fa";
import { useSelector } from "react-redux";
const ProductNavInfo = () => {
  const mode = useSelector((state: any) => state.mode.mode);
  const products = [
    {
      title: "Programmable Media",
      description: "Seamlessly transform and optimize media assets.",
      icon: <FaCogs className="text-2xl" />,
    },
    {
      title: "Machine Learning",
      description: "Leverage AI for smarter automation and insights.",
      icon: <FaBrain className="text-2xl" />,
    },
    {
      title: "Natural Language Processing",
      description: "Understand and process human language efficiently.",
      icon: <FaRobot className="text-2xl" />,
    },
    {
      title: "Computer Vision",
      description: "Enable machines to see and interpret visual data.",
      icon: <FaEye className="text-2xl" />,
    },
    {
      title: "Speech Recognition",
      description: "Convert speech to text with high accuracy.",
      icon: <FaMicrophone className="text-2xl" />,
    },
    {
      title: "Image Recognition",
      description: "Identify objects and patterns in images.",
      icon: <FaImage className="text-2xl" />,
    },
  ];

  return (
    <div
      className={`nav-dropdown ${
        mode ? "dark-mode bg-blue-950 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <div className="drop-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((product, index) => (
          <div
            key={index}
            className={`product-item group flex flex-col items-start gap-2 p-4 border ${
              mode ? "border-gray-700" : "border-gray-300"
            } rounded-md ${
              mode
                ? "hover:bg-blue-800 hover:text-gray-100"
                : "hover:bg-blue-500 hover:text-white"
            } transition-all duration-300 ease-in-out`}
          >
            <div
              className={`icon flex items-center justify-center ${
                mode
                  ? "bg-gray-800 text-gray-400 group-hover:bg-gray-100 group-hover:text-blue-800"
                  : "bg-gray-200 text-gray-800 group-hover:bg-white group-hover:text-blue-500"
              } rounded-full p-3 transition duration-300`}
            >
              {product.icon}
            </div>
            <h3
              className={`text-lg font-bold ${
                mode ? "group-hover:underline" : "group-hover:underline"
              }`}
            >
              {product.title}
            </h3>
            <p
              className={`text-sm ${
                mode
                  ? "text-gray-500 group-hover:text-gray-300"
                  : "text-gray-600 group-hover:text-gray-200"
              }`}
            >
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductNavInfo;
