import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductsById } from "../../redux/features/products/productDetailSlice";
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";
import Loader from "../loader/Loader";

const DetailView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { status, product } = useSelector((state) => state.productDetail);

  useEffect(() => {
    if (id !== product?._id) {
      dispatch(fetchProductsById(id));
    }
  }, [dispatch, id, product]);

  return (
    <div className="bg-gray-100 mt-[55px]">
      {status === "loading" ? (
        <Loader />
      ) : (
        product &&
        Object.keys(product).length > 0 && (
          <div className="flex flex-wrap bg-white">
            {/* Left side: ActionItem */}
            <div className="w-full lg:w-1/3 md:w-1/3 sm:w-full">
              <ActionItem product={product} />
            </div>

            {/* Right side: ProductDetail */}
            <div className="w-full lg:w-2/3 md:w-2/3 sm:w-full mt-7 pl-8">
              <ProductDetail product={product} />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DetailView;
