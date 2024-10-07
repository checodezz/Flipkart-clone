import { useDispatch } from "react-redux";
import { Slider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  clearAllFilters,
  setCategoryFilter,
  setPriceRangeFilter,
  setRatingFilter,
  setSorting,
} from "../../redux/features/products/productSlice";

const Filters = ({
  filteredCategories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  ratings,
  setRatings,
  maxPrice,
  minPrice,
  sort,
  setSort,
}) => {
  const dispatch = useDispatch();

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prevValue) => {
      const newCategories = checked
        ? [...selectedCategories, value]
        : prevValue.filter((cat) => cat !== value);
      dispatch(setCategoryFilter(newCategories));
      return newCategories;
    });
  };

  const handleSliderChange = (event) => {
    setPriceRange(event.target.value);
    dispatch(setPriceRangeFilter(event.target.value));
  };

  const handleRatingChange = (event) => {
    setRatings(Number(event.target.value));
    dispatch(setRatingFilter(Number(event.target.value)));
  };

  const handleSorting = (e) => {
    setSort(e.target.value);
    dispatch(setSorting(e.target.value));
  };

  const clearAllBtn = () => {
    setSelectedCategories([]);
    setRatings(null);
    setPriceRange(null);
    setSort(null);
    dispatch(clearAllFilters());
  };

  return (
    <div className="">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <p className="font-medium text-lg">Filters</p>
          <button
            className="text-blue-500 text-sm font-medium"
            onClick={clearAllBtn}
          >
            CLEAR ALL
          </button>
        </div>
      </div>
      <hr />

      {/* Price Range Slider */}
      <div className="p-4">
        <p className="font-medium text-sm mb-1">PRICE</p>
        <Slider
          aria-label="Custom marks"
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="on"
          max={maxPrice}
        />
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="border border-gray-300 bg-gray-100 px-2 py-1 flex-1 mr-2 md:mr-1 text-center">
            ₹{minPrice}
          </span>
          <span className="mt-1 text-gray-500 flex-none">to</span>
          <span className="border border-gray-300 bg-gray-100 px-2 py-1 flex-1 ml-2 md:ml-1 text-center">
            ₹{maxPrice}
          </span>
        </div>
      </div>

      {/* Category Picker inside Accordion */}
      <Accordion disableGutters defaultExpanded style={{ borderRadius: "0px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p className="font-normal text-sm" style={{ fontWeight: "500px" }}>
            CATEGORIES
          </p>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col space-y-1">
          {filteredCategories.map((category, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                className="m-2 "
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Ratings Picker inside Accordion */}
      <Accordion disableGutters defaultExpanded style={{ borderRadius: "0px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <p className="font-normal text-sm" style={{ fontWeight: "500px" }}>
            CUSTOMER RATINGS
          </p>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col space-y-1">
          {[1, 2, 3, 4].reverse().map((star) => (
            <div key={star} className="flex items-center">
              <input
                type="radio"
                value={star}
                name="rating"
                id={`rating-${star}`}
                checked={ratings === star}
                onChange={handleRatingChange}
                className="m-2"
              />
              <label
                htmlFor={`rating-${star}`}
                className="text-sm flex items-center  cursor-pointer"
              >
                {star} <StarIcon fontSize="small" className="ml-1" /> &nbsp; &
                above
              </label>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Sorting Options inside Accordion */}
      <Accordion disableGutters defaultExpanded style={{ borderRadius: "0px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <p className="font-normal text-sm" style={{ fontWeight: "500px" }}>
            SORT BY
          </p>
        </AccordionSummary>
        <AccordionDetails className="space-y-1">
          <div className="flex flex-col">
            <div className="flex items-center py-1">
              <input
                type="radio"
                value="low-to-high"
                name="sorting"
                id="low-to-high"
                onChange={handleSorting}
                checked={sort === "low-to-high"}
                className="m-2"
              />
              <label htmlFor="low-to-high" className="text-sm cursor-pointer">
                Low to High
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="high-to-low"
                name="sorting"
                id="high-to-low"
                onChange={handleSorting}
                checked={sort === "high-to-low"}
                className="m-2"
              />
              <label htmlFor="high-to-low" className="text-sm cursor-pointer">
                High to Low
              </label>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Filters;
