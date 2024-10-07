import { useDispatch } from "react-redux";
import { setTotalCost } from "../../redux/features/cart/cartSlice";

const CartPriceDetails = ({ cartItems }) => {
  const dispatch = useDispatch();

  // Calculate totals using reduce
  const totalMRP = cartItems.reduce(
    (sum, item) =>
      sum + (item?.product?.price?.mrp * (item?.quantity || 1) || 0),
    0
  );
  const totalCost = cartItems.reduce(
    (sum, item) =>
      sum + (item?.product?.price?.cost * (item?.quantity || 1) || 0),
    0
  );

  const totalDiscount = totalMRP - totalCost;

  // Dispatch total cost
  dispatch(setTotalCost(totalCost));

  return (
    <div className="flex flex-col bg-white rounded-sm shadow">
      <h1 className="px-6 py-3 border-b font-medium text-gray-500">
        PRICE DETAILS
      </h1>

      <div className="flex flex-col gap-4 p-6 pb-3">
        <p className="flex justify-between">
          Price ({cartItems.length} items){" "}
          <span>₹{totalMRP.toLocaleString()}</span>
        </p>
        <p className="flex justify-between">
          Discount{" "}
          <span className="text-green-700">
            - ₹{totalDiscount.toLocaleString()}
          </span>
        </p>
        <p className="flex justify-between">
          Delivery Charges <span className="text-green-700">FREE</span>
        </p>
        <div className="border border-dashed"></div>
        <p className="flex justify-between text-lg font-medium">
          Total Amount <span>₹{totalCost?.toLocaleString()}</span>
        </p>
        <div className="border border-dashed"></div>
        <p className="font-medium text-green-700">
          You will save ₹{totalDiscount?.toLocaleString()} on this order
        </p>
      </div>
    </div>
  );
};

export default CartPriceDetails;
