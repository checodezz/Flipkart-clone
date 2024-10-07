import CartActions from "./CartActions";
import { Link } from "react-router-dom";

const CartItems = ({ items }) => {
  if (items.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
        <img
          draggable="false"
          className="w-1/2 h-44 object-contain"
          src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
          alt="Search Not Found"
        />
        <h1 className="text-2xl font-medium text-gray-900">
          Your Cart is empty
        </h1>
      </div>
    );
  }

  return (
    <div>
      {items?.map((item) => {
        const product = item?.product; // Simplify the access to product fields
        const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000); // Calculate delivery date
        const quantity = item?.quantity;

        return (
          <div
            key={product?._id}
            className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b overflow-hidden"
          >
            <Link
              to={`/productDetail/${product?._id}`}
              className="flex flex-col sm:flex-row gap-5 items-stretch w-full group"
            >
              {/* Product image */}
              <div className="w-full sm:w-1/6 h-28 flex-shrink-0">
                <img
                  draggable="false"
                  className="h-full w-full object-contain"
                  src={product?.detailUrl}
                  alt={product?.title?.shortTitle || "Product"}
                />
              </div>

              {/* Description */}
              <div className="flex flex-col sm:gap-5 w-full pr-6">
                <div className="flex flex-col sm:flex-row justify-between items-start pr-5 gap-1 sm:gap-0">
                  <div className="flex flex-col gap-0.5 sm:w-3/5">
                    <p className="group-hover:text-blue-500">
                      {product?.title?.longTitle?.length > 42
                        ? `${product.title?.longTitle.substring(0, 42)}...`
                        : product?.title?.longTitle}
                    </p>
                    <span className="text-sm text-gray-500">
                      Seller: Unknown
                    </span>
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
                    ₹
                    {(product?.price?.cost * (quantity || 1))?.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 line-through font-normal">
                    ₹{(product?.price?.mrp * (quantity || 1))?.toLocaleString()}
                  </span>
                  <span className="text-sm text-green-700">
                    {product?.price?.discount}% Off
                  </span>
                </div>
              </div>
            </Link>

            <CartActions productId={product?._id} quantity={quantity} />
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
