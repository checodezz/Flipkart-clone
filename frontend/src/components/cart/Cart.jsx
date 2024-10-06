import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../redux/features/cart/cartSlice";
import CartItems from "./CartItems";
import CartPriceDetails from "./CartPriceDetails";
import AddressModal from "./AddressModal";
import { useLocation } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const product = location.state?.product; // Access the product from state
  console.log(product);
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      city: "123 Demo Street, New York, 10001",
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!product) {
      dispatch(fetchCart()); // Fetch cart items if no product is passed
    }
  }, [dispatch, product]);

  const handlePlaceOrderClick = () => {
    // Logic for placing the order
    console.log("Order placed for:", product || cartItems);
  };

  const handleAddAddressClick = () => {
    setShowModal(true);
  };

  const handleModalClose = (newAddress) => {
    setShowModal(false);
    if (newAddress) {
      setAddresses((prevAddresses) => [
        ...prevAddresses,
        { id: prevAddresses.length + 1, ...newAddress },
      ]);
    }
  };

  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
  };

  return (
    <div className="flex flex-col pt-3 sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
      <div className="flex-1">
        <div className="border p-4 mb-2 bg-white">
          <h3 className="font-semibold text-lg">Select Delivery Address</h3>
          {addresses.map((address) => (
            <div className="mt-3" key={address.id}>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="address"
                  className="mr-2"
                  value={address.id}
                  checked={selectedAddress === address.id}
                  onChange={() => handleAddressSelect(address.id)}
                />
                <span>{`${address.name}, ${address.city}`}</span>
              </label>
            </div>
          ))}
          <button
            className="mt-4 text-blue-600 hover:underline"
            onClick={handleAddAddressClick}
          >
            + Add New Address
          </button>
        </div>

        <div className="flex flex-col shadow bg-white">
          <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">
            My Cart {product ? "(1 item)" : `(${cartItems.length} items)`}{" "}
          </span>
          {product ? (
            <CartItems item={product} /> // Render product if passed
          ) : (
            cartItems.map((item) => <CartItems key={item._id} item={item} />) // Render cart items if no product
          )}
          <div className="flex justify-end">
            <button
              disabled={!product && cartItems.length < 1} // Disable if there are no items
              className={`${
                !product && cartItems.length < 1
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-orange-500"
              } w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm`}
              onClick={handlePlaceOrderClick}
            >
              PLACE ORDER
            </button>
          </div>

          {showModal && <AddressModal onClose={handleModalClose} />}
        </div>
      </div>

      <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">
        {/* Only show CartPriceDetails when the modal is not open */}
        {!showModal && (
          <CartPriceDetails cartItems={product ? [product] : cartItems} /> // Update price details
        )}
      </div>
    </div>
  );
};

export default Cart;
