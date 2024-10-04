import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../redux/features/cart/cartSlice";
import CartItems from "./CartItems";
import CartPriceDetails from "./CartPriceDetails";
import AddressModal from "./AddressModal";

const Cart = () => {
  const [showModal, setShowModal] = useState(false);

  // State to store addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      city: "123 Demo Street, New York, 10001",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(1); // Initially selects the demo address

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handlePlaceOrderClick = () => {};

  const handleAddAddressClick = () => {
    setShowModal(true); // Show modal for adding a new address
  };

  const handleModalClose = (newAddress) => {
    setShowModal(false);
    if (newAddress) {
      // Add the new address to the address list
      setAddresses((prevAddresses) => [
        ...prevAddresses,
        { id: prevAddresses.length + 1, ...newAddress },
      ]);
    }
  };

  const handleAddressSelect = (id) => {
    setSelectedAddress(id); // Set the selected address
  };

  return (
    <div className="flex flex-col pt-3 sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
      <div className="flex-1">
        {
          <div className="border p-4  mb-2 bg-white">
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

            {/* Add Address button */}
            <button
              className="mt-4 text-blue-600 hover:underline"
              onClick={handleAddAddressClick}
            >
              + Add New Address
            </button>
          </div>
        }

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
              onClick={handlePlaceOrderClick}
            >
              PLACE ORDER
            </button>
          </div>

          {/* Address Modal */}
          {showModal && <AddressModal onClose={handleModalClose} />}
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
