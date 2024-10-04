import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../redux/features/cart/cartSlice";
import CartItems from "./CartItems";
import CartPriceDetails from "./CartPriceDetails";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // console.log(cartItems);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="flex flex-col pt-3 sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
      <div className="flex-1">
        <div className="flex flex-col shadow bg-white">
          <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">
            My Cart ({cartItems.length})
          </span>
          {cartItems.map((item) => (
            <CartItems key={item._id} item={item} />
          ))}
          <div className="flex justify-end">
            <button
              disabled={cartItems.length < 1 ? true : false}
              className={`${
                cartItems.length < 1
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-orange-500"
              } w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm`}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">
        {/* <!-- nav tiles --> */}
        <CartPriceDetails cartItems={cartItems} />
        {/* <!-- nav tiles --> */}
      </div>
    </div>
  );
};

export default Cart;
