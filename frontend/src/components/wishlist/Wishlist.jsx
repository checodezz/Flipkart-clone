import { useSelector } from "react-redux";
import WishlistItem from "./WishlistItem";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <div className="flex flex-col pt-3  gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
      <div className="flex flex-col shadow bg-white">
        <span className="font-medium text-2xl px-2 sm:px-8 py-4 border-b">
          Wishlist
        </span>
        <div>
          {wishlistItems.length ? (
            wishlistItems.map((item) => (
              <WishlistItem key={item?.product?._id} item={item} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
              <img
                draggable="false"
                className="w-1/2 h-44 object-contain"
                src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
                alt="Search Not Found"
              />
              <h1 className="text-2xl font-medium text-gray-900">
                Your wishlist is empty
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
