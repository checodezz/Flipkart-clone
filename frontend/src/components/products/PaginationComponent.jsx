// PaginationComponent.jsx
import Pagination from "react-js-pagination";

const PaginationComponent = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  onChange,
}) => {
  return (
    <div className="mt-3 flex justify-center mb-3">
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        onChange={onChange}
        innerClass="flex items-center justify-center space-x-1" // Flexbox for pagination container
        itemClass="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer" // Default item style
        activeClass="bg-blue-500 text-white border-blue-500" // Style for active page
        linkClass="block w-full h-full flex items-center justify-center"
        prevPageText="&lt;" // Left arrow text
        nextPageText="&gt;" // Right arrow text
        disabledClass="text-gray-400 cursor-not-allowed" // Disabled pages style
      />
    </div>
  );
};

export default PaginationComponent;
