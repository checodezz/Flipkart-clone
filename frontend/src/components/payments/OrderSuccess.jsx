import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { clearCartFromBackend } from "../../redux/features/cart/cartSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCartFromBackend());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {/* Success icon with animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <CheckCircleIcon
          style={{ fontSize: "100px", color: "green" }}
          className="text-green-500"
        />
      </motion.div>

      {/* Animated success message */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-3xl font-semibold text-center text-gray-800"
      >
        Congratulations! Your order has been placed.
      </motion.h1>

      {/* Explore More button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6"
      >
        <Link to="/">
          <button className="px-8 py-3 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition duration-300">
            Explore More
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
