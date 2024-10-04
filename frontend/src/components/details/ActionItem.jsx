import { useDispatch } from "react-redux";
import { updateCart } from "../../redux/features/cart/cartSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { enqueueSnackbar } from "notistack";

const ActionItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddtoCart = (productAction) => {
    dispatch(updateCart(productAction));
    enqueueSnackbar("Item added to cart", {
      variant: "success",
      autoHideDuration: 1000,
    });
  };

  return (
    <div className="flex flex-col items-center min-w-[40%] p-10 lg:p-5 mt-2">
      {/* Image container with heart icon */}
      <div className="relative p-4 border border-gray-200 w-full max-w-[90%] flex justify-center">
        {/* Favorite (heart) icon */}
        <FavoriteIcon
          className="absolute border border-gray-200 rounded-full top-5 right-5 text-2xl text-gray-200 hover:text-red-500 transition duration-200 cursor-pointer p-2 shadow-md"
          sx={{ fontSize: "45px" }}
        />

        {/* Product image */}
        <img
          src={product.detailUrl}
          alt="product"
          className="w-full h-96 object-contain"
        />
      </div>

      {/* Buttons container */}
      <div className="flex gap-2 mt-4 w-full max-w-[90%] justify-between">
        <button
          onClick={() =>
            handleAddtoCart({ productId: product._id, action: "plus" })
          }
          className="flex items-center justify-center w-[48%] h-12 rounded-sm text-white hover:bg-yellow-600 transition duration-200"
          style={{ background: "#ff9f00" }}
        >
          <ShoppingCartIcon className="mr-2" />
          Add to Cart
        </button>
        <button className="flex items-center justify-center w-[48%] h-12 rounded-sm bg-orange-500 text-white hover:bg-red-700 transition duration-200">
          <FlashOnIcon className="mr-2" />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ActionItem;
