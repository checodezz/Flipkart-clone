import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductsById } from "../../redux/features/products/productDetailSlice";
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";
import Loader from "../loader/Loader";
import Slide from "../home/Slide";
import { fetchProducts } from "../../redux/features/products/productSlice";
import { PRODUCT_DETAILS_BANNER } from "../../constants/data";

const DetailView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { status, product } = useSelector((state) => state.productDetail);
  const { products } = useSelector((state) => state.products);
  console.log(products);
  useEffect(() => {
    if (id !== product?._id) {
      dispatch(fetchProductsById(id));
    }
  }, [dispatch, id, product]);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

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

      <img src={PRODUCT_DETAILS_BANNER} alt="banner" className="mt-3 mx-2" />
      <div className="mb-3 mx-2">
        {products && products.length > 0 && (
          <Slide
            products={products}
            title="You might be interested in"
            timer={false}
          />
        )}
      </div>
    </div>
  );
};

export default DetailView;
