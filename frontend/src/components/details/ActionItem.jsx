import { useDispatch, useSelector } from "react-redux";
import { updateCart, fetchCart } from "../../redux/features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/wishlist/wishlistSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { enqueueSnackbar } from "notistack";

const ActionItem = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    dispatch(fetchCart()); // Fetch the cart when the component is loaded or updated
  }, [dispatch]);

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  useEffect(() => {
    const productInCart = cartItems.some(
      (cartItem) => cartItem.product._id === product._id
    );
    setIsInCart(productInCart);
  }, [cartItems, product]);

  const handleAddtoCart = (productAction) => {
    setIsAddingToCart(true);

    dispatch(updateCart(productAction))
      .then(() => {
        enqueueSnackbar("Item added to cart", {
          variant: "success",
          autoHideDuration: 1000,
        });
        setIsAddingToCart(false);
        setIsInCart(true);
      })
      .catch(() => {
        setIsAddingToCart(false);
      });
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const handleBuyNow = (product) => {
    dispatch(updateCart({ productId: product._id, action: "plus" })).then(
      () => {
        enqueueSnackbar("Item added to cart", {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/cart");
      }
    );
  };

  const handleWishlistClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
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
        {isInCart ? (
          <button
            onClick={handleGoToCart}
            className="flex items-center justify-center w-[48%] h-12 rounded-sm text-white bg-green-500 hover:bg-green-600 transition duration-200"
          >
            <ShoppingCartIcon className="mr-2" />
            <span className="text-lg md:text-base sm:text-sm">Go to Cart</span>
          </button>
        ) : (
          <button
            onClick={() =>
              handleAddtoCart({ productId: product._id, action: "plus" })
            }
            className="flex items-center justify-center w-[48%] h-12 rounded-sm text-white hover:bg-yellow-600 transition duration-200"
            style={{ background: "#ff9f00" }}
            disabled={isAddingToCart}
          >
            <ShoppingCartIcon className="mr-2" />
            <span className="text-lg md:text-base sm:text-sm">
              {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
            </span>
          </button>
        )}
        <button
          className="flex items-center justify-center w-[48%] h-12 rounded-sm bg-orange-500 text-white hover:bg-red-700 transition duration-200"
          onClick={() => handleBuyNow(product)}
        >
          <FlashOnIcon className="mr-2" />
          <span className="text-lg md:text-base sm:text-sm">Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default ActionItem;
