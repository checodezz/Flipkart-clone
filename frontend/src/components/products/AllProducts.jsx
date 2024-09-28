import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/products/productSlice";
import { Slider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const AllProducts = () => {
  const [priceRange, setPriceRange] = useState([20, 100]);
  const [selectedRating, setSelectedRating] = useState(0); // State for selected rating
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  // Get unique categories
  const categories = products.map((product) => product["category"]);
  const filteredCategories = [...new Set(categories)];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle slider value change
  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Handle rating change
  const handleRatingChange = (event) => {
    setSelectedRating(Number(event.target.value));
  };

  // Filter products by selected price range and rating
  const filteredProducts = products.filter((product) => {
    const inPriceRange =
      product.price.cost >= priceRange[0] &&
      product.price.cost <= priceRange[1];
    const meetsRating = product.rating >= selectedRating;
    return inPriceRange && meetsRating;
  });

  return (
    <div className="m-3 pt-3 grid gap-3 sm:grid-cols-12">
      {/* Filters Column */}
      <div className="min-h-[100px] w-[270px] shadow sm:col-span-2 bg-white p-4">
        {/* Filters Header */}
        <div className="flex justify-between items-center mb-4">
          <p className="font-medium text-lg">Filters</p>
          <button className="text-blue-500 text-sm font-medium">
            CLEAR ALL
          </button>
        </div>
        <hr className="mb-4" />

        {/* Price Range Slider */}
        <div className="mb-4">
          <p className="font-medium mb-2" style={{ fontSize: "12px" }}>
            PRICE{" "}
          </p>
          <Slider
            value={priceRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={200}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
        <hr className="mb-4" />

        {/* Category Picker */}
        <div className="mb-4">
          <p className="mb-2 font-medium pb-1">CATEGORIES</p>
          {filteredCategories.map((category, index) => (
            <div key={index} className=" flex items-center mb-2">
              <input type="checkbox" id={category} className="mr-2 " />
              <label htmlFor={category} className="text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>
        <hr className="mb-4" />

        {/* Ratings */}
        <div className="mb-4">
          <p className="font-semibold mb-2">Ratings</p>
          {[1, 2, 3, 4, 5].reverse().map((star) => (
            <div key={star} className="flex items-center mb-2">
              <input
                type="radio"
                value={star}
                name="rating"
                id={`rating-${star}`}
                onChange={handleRatingChange}
              />
              <label
                htmlFor={`rating-${star}`}
                className="flex items-center px-2 "
              >
                {star} <StarIcon fontSize="small" className="ml-1" />& above
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Products Column */}
      <div className="min-h-[100px] ms-7 shadow sm:col-span-10 bg-white p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Image */}
            <img
              src={product.detailUrl}
              alt={product.title.shortTitle}
              className="mb-4 h-48 px-8 object-contain"
            />
            {/* Product Title */}
            <p className="text-sm  font- mb-2">{product.title.longTitle}</p>
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
              <span>₹{product.price.cost.toLocaleString()}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
