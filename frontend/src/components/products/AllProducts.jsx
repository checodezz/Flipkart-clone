import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/products/productSlice";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import Filters from "./Filters";
const AllProducts = () => {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ratings, setRatings] = useState(null);
  const [sort, setSort] = useState(null);
  const { products, filteredProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get unique categories
  const categories = products.map((product) => product["category"]);
  const filteredCategories = categories.filter(
    (cat, index) => categories.indexOf(cat) === index
  );

  const maxPrice = filteredProducts.reduce(
    (acc, curr) => {
      return curr.price.cost > acc ? curr.price.cost : acc;
    },
    filteredProducts[0] ? filteredProducts[0].price.cost : 0
  );

  const minPrice = filteredProducts.reduce(
    (acc, curr) => {
      return curr.price.cost < acc ? curr.price.cost : acc;
    },
    filteredProducts[0] ? filteredProducts[0].price.cost : 0
  );

  return (
    <div className="m-3 pt-3 grid gap-3 sm:grid-cols-12">
      {/* Filters Column */}
      <Filters
        filteredCategories={filteredCategories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        ratings={ratings}
        setRatings={setRatings}
        maxPrice={maxPrice}
        minPrice={minPrice}
        setSort={setSort}
        sort={sort}
      />

      {/* Products Column */}
      <div className="min-h-[100px]  shadow sm:col-span-10 bg-white p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Image */}
            <Link
              to={`/productDetail/${product._id}`}
              style={{ textDecoration: "none" }}
              className=" hover:text-blue-500"
            >
              <img
                src={product.detailUrl}
                alt={product.title.shortTitle}
                className="mb-4 h-48 px-8 object-contain"
              />
              {/* Product Title */}
              <p className="text-sm  font- mb-2 hover:text-blue-500">
                {product.title.longTitle}
              </p>
              {/* Product Ratings */}
              <span className="text-sm font-medium flex gap-2 items-center mb-2">
                <span
                  className="px-1.5 py-0.4 bg-green-600 rounded-sm text-white flex items-center gap-0.5"
                  style={{ fontSize: "12px" }}
                >
                  {product.ratings} <StarIcon sx={{ fontSize: "14px" }} />
                </span>
              </span>
              {/* Product Price */}
              <div className="flex items-center gap-1.5 text-md font-medium">
                <span className="text-black">
                  ₹{product.price.cost.toLocaleString()}
                </span>
                <span className="text-gray-500 line-through text-xs">
                  ₹{product.price.mrp}
                </span>
                <span className="text-sm text-green-600">
                  {product.price.discount}&nbsp;off
                </span>
              </div>
              <div className="mt-2">
                <span className="bg-purple-100 text-purple-600 text-sm font-medium py-1 px-3 rounded">
                  {product.tagline}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
