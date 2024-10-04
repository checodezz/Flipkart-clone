import CartActions from "./CartActions";
import { Link } from "react-router-dom";

const CartItems = ({ item }) => {
  // console.log(item);
  const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
  return (
    <div className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b overflow-hidden">
      <Link
        to={`/productDetail/${item?.product?._id}`}
        className="flex flex-col sm:flex-row gap-5 items-stretch w-full group"
      >
        {/* Product image */}
        <div className="w-full sm:w-1/6 h-28 flex-shrink-0">
          <img
            draggable="false"
            className="h-full w-full object-contain"
            src={item?.product?.detailUrl}
            alt={item?.product?.title?.shortTitle || "Product"}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col sm:gap-5 w-full pr-6">
          <div className="flex flex-col sm:flex-row justify-between items-start pr-5 gap-1 sm:gap-0">
            <div className="flex flex-col gap-0.5 sm:w-3/5">
              <p className="group-hover:text-blue-500">
                {item?.product?.title?.longTitle?.length > 42
                  ? `${item.product?.title?.longTitle.substring(0, 42)}...`
                  : item?.product?.title?.longTitle}
              </p>
              <span className="text-sm text-gray-500">Seller: Unknown</span>
            </div>

            <div className="flex flex-col sm:gap-2">
              <p className="text-sm">
                Delivery by {date.toDateString()} |&nbsp;
                <span className="text-green-700">Free</span>
              </p>
              <span className="text-xs text-gray-500">
                7 Days Replacement Policy
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 text-xl font-medium">
            <span>
              ₹{(item?.product?.price?.cost * item?.quantity)?.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 line-through font-normal">
              ₹{(item?.product?.price?.mrp * item?.quantity)?.toLocaleString()}
            </span>
            <span className="text-sm text-green-700">
              {item?.product?.price?.discount}% Off
            </span>
          </div>
        </div>
      </Link>

      <CartActions productId={item?.product?._id} quantity={item?.quantity} />
    </div>
  );
};

export default CartItems;
