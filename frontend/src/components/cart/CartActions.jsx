import { useDispatch } from "react-redux";
import {
  fetchCart,
  optimisticUpdate,
  removeCart,
  updateCart,
} from "../../redux/features/cart/cartSlice";
import { useEffect } from "react";

const CartActions = ({ productId, quantity }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (productId, actionType) => {
    dispatch(optimisticUpdate({ productId, actionType }));
    dispatch(updateCart({ productId, action: actionType }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(optimisticUpdate({ productId, actionType: "remove" }));
    dispatch(removeCart(productId));
  };

  return (
    <div className="flex justify-between pr-4 sm:pr-0 sm:justify-start sm:gap-6">
      <div className="flex gap-1 ml-5 items-center">
        <span
          className={`w-7 h-7 text-3xl font-light rounded-full border flex items-center justify-center cursor-pointer ${
            quantity === 1
              ? "bg-gray-200 text-gray-700 cursor-not-allowed"
              : "bg-gray-50"
          }`}
          onClick={() => {
            if (quantity > 1) handleUpdateQuantity(productId, "minus");
          }}
          style={quantity === 1 ? { pointerEvents: "none" } : {}}
        >
          -
        </span>

        <input
          className="w-11 border outline-none text-center rounded-sm py-0.5 text-gray-700 font-medium text-sm qtyInput"
          value={quantity}
          disabled
        />

        <span
          className="w-7 h-7 text-xl font-light bg-gray-50 rounded-full border flex items-center justify-center cursor-pointer"
          onClick={() => handleUpdateQuantity(productId, "plus")}
        >
          +
        </span>
      </div>
      <div>
        <button
          className="font-medium hover:text-red-600 ml-4"
          onClick={() => handleRemoveItem(productId)}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default CartActions;
