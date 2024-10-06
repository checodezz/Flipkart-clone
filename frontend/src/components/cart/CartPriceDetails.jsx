const CartPriceDetails = ({ cartItems }) => {
  console.log(cartItems);

  // If there's only one item, handle it separately
  if (cartItems.length === 1) {
    const item = cartItems[0];
    console.log(item);
    const quantity = item?.quantity || 1;
    const mrp = item?.product?.price?.mrp || item?.price?.mrp;
    const cost = item?.product?.price?.cost || item?.price?.cost;
    const discount = mrp * quantity - cost * quantity;

    return (
      <div className="flex flex-col bg-white rounded-sm shadow">
        <h1 className="px-6 py-3 border-b font-medium text-gray-500">
          PRICE DETAILS
        </h1>

        <div className="flex flex-col gap-4 p-6 pb-3">
          <p className="flex justify-between">
            Price (1 item) <span>₹{(mrp * quantity).toLocaleString()}</span>
          </p>
          <p className="flex justify-between">
            Discount{" "}
            <span className="text-green-700">
              - ₹{discount.toLocaleString()}
            </span>
          </p>
          <p className="flex justify-between">
            Delivery Charges <span className="text-green-700">FREE</span>
          </p>
          <div className="border border-dashed"></div>
          <p className="flex justify-between text-lg font-medium">
            Total Amount <span>₹{cost?.toLocaleString()}</span>
          </p>
          <div className="border border-dashed"></div>
          <p className="font-medium text-green-700">
            You will save ₹{discount?.toLocaleString()} on this order
          </p>
        </div>
      </div>
    );
  }

  // If there are multiple items, calculate totals using reduce
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

  // If cartItems becomes 1 after some operations, handle that scenario
  const totalDiscount = totalMRP - totalCost;

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
