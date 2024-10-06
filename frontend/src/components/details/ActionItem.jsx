import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../redux/features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/wishlist/wishlistSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { enqueueSnackbar } from "notistack";
import Cart from "../cart/Cart";

const ActionItem = ({ product }) => {
  console.log(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Update isInWishlist based on the latest wishlistItems
  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const handleAddtoCart = (productAction) => {
    setIsAddingToCart(true);
    dispatch(updateCart(productAction));
    enqueueSnackbar("Item added to cart", {
      variant: "success",
      autoHideDuration: 1000,
    });

    setTimeout(() => {
      setIsAddingToCart(false);
      navigate("/cart");
    }, 1000);
  };

  const handleBuyNow = (product) => {
    if (product) {
      navigate("/cart", { state: { product } });
    }
  };

  const handleWishlistClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id)); // Pass product._id instead of product
      enqueueSnackbar("Item removed from wishlist", {
        variant: "warning",
        autoHideDuration: 1000,
      });
    } else {
      dispatch(addToWishlist(product));
      enqueueSnackbar("Item added to wishlist", {
        variant: "success",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-w-[40%] p-10 lg:p-5 mt-2">
      <div className="relative p-4 border border-gray-200 w-full max-w-[90%] flex justify-center">
        <FavoriteIcon
          className={`absolute border border-gray-200 rounded-full top-5 right-5 text-2xl transition duration-200 cursor-pointer p-2 shadow-md ${
            isInWishlist ? "text-red-500" : "text-gray-200 hover:text-red-500"
          }`}
          sx={{ fontSize: "45px" }}
          onClick={handleWishlistClick}
        />

        <img
          src={product.detailUrl}
          alt="product"
          className="w-full h-96 object-contain"
        />
      </div>

      <div className="flex gap-2 mt-4 w-full max-w-[90%] justify-between">
        <button
          onClick={() =>
            handleAddtoCart({ productId: product._id, action: "plus" })
          }
          className="flex items-center justify-center w-[48%] h-12 rounded-sm text-white hover:bg-yellow-600 transition duration-200"
          style={{ background: "#ff9f00" }}
          disabled={isAddingToCart}
        >
          <ShoppingCartIcon className="mr-2" />
          {isAddingToCart ? "Going to Cart..." : "Add to Cart"}
        </button>
        <button
          className="flex items-center justify-center w-[48%] h-12 rounded-sm bg-orange-500 text-white hover:bg-red-700 transition duration-200"
          onClick={() => handleBuyNow(product)}
        >
          <FlashOnIcon className="mr-2" />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ActionItem;
