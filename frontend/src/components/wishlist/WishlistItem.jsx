import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/features/wishlist/wishlistSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b overflow-hidden bg-white">
      {/* Delete Icon */}
      <DeleteOutlineIcon
        className="absolute top-3 right-3 cursor-pointer"
        onClick={() => dispatch(removeFromWishlist(item._id))}
      />

      <Link
        to={`/productDetail/${item?._id}`}
        className="flex flex-col sm:flex-row gap-5 items-stretch w-full group"
      >
        {/* Product image */}
        <div className="w-full sm:w-1/6 h-28 flex-shrink-0">
          <img
            draggable="false"
            className="h-full w-full object-contain"
            src={item?.detailUrl}
            alt={item?.title?.shortTitle || "Product"}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col sm:gap-5 w-full pr-6">
          <div className="flex flex-col sm:flex-row justify-between items-start pr-5 gap-1 sm:gap-0">
            <div className="flex flex-col gap-0.5 sm:w-3/5">
              <p className="group-hover:text-blue-500">
                {item?.title?.longTitle?.length > 42
                  ? `${item.title?.longTitle.substring(0, 42)}...`
                  : item?.title?.longTitle}
              </p>
              <span className="text-sm text-gray-500">Seller: Unknown</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 text-xl font-medium">
            <span>₹{item?.price?.cost?.toLocaleString()}</span>
            <span className="text-sm text-gray-500 line-through font-normal">
              ₹{item?.price?.mrp?.toLocaleString()}
            </span>
            <span className="text-sm text-green-700">
              {item?.price?.discount}% Off
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WishlistItem;
