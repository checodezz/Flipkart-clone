import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useEffect } from "react";

const ProductDetail = ({ product }) => {
  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

  const adURL =
    "https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50";

  const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Title */}
      <h1 className="text-2xl">{product.title.longTitle}</h1>

      {/* Ratings */}
      <div className="text-sm  text-gray-500 mt-2 flex items-center">
        <span className="px-1.5 mr-4 text-sm  py-1 bg-green-600 rounded-sm text-white flex items-center gap-0.5">
          {product.ratings} <StarIcon sx={{ fontSize: "18px" }} />
        </span>

        <span>8 Ratings & 1 Review</span>
        <img src={fassured} alt="fassure" className="w-20 ml-5" />
      </div>

      <p className="text-green-700 text-sm font-medium mt-2">Special Price</p>
      {/* Price details */}
      <div className="text-base mt-2">
        <span className="text-3xl font-medium">
          ₹{product.price.cost.toLocaleString()}
        </span>
        <span className="text-gray-500 text-lg font-medium ml-4 line-through">
          ₹{product.price.mrp.toLocaleString()}
        </span>
        <span className="text-green-600 font-medium ml-4">
          {product.price.discount} off
        </span>
      </div>

      {/* Available Offers */}
      <h2 className="text-lg mt-3 font-medium">Available Offers</h2>
      <div className="text-base mt-2">
        <p className="flex items-center">
          <LocalOfferIcon className="text-green-600 mr-2" />
          Get extra 20% off upto ₹50 on 1 item(s) T&C
        </p>
        <p className="flex items-center mt-2">
          <LocalOfferIcon className="text-green-600 mr-2" />
          Get extra 13% off (price inclusive of discount) T&C
        </p>
        <p className="flex items-center mt-2">
          <LocalOfferIcon className="text-green-600 mr-2" />
          Sign up for Flipkart Pay Later and get Flipkart Gift Card worth ₹100*
          Know More
        </p>
        <p className="flex items-center mt-2">
          <LocalOfferIcon className="text-green-600 mr-2" />
          5% Unlimited Cashback on Flipkart Axis Bank Credit Card T&C
        </p>
        <p className="flex items-center mt-2">
          <LocalOfferIcon className="text-green-600 mr-2" />
          Make a purchase and enjoy a surprise cashback/coupon that you can
          redeem later! Know More
        </p>
        <p className="flex items-center mt-2">
          <LocalOfferIcon className="text-green-600 mr-2" />
          No Cost EMI on Bajaj Finserv EMI Card on cart value above ₹2999
        </p>
      </div>

      {/* Table */}
      <table className="w-full mt-5 border-collapse">
        <tbody>
          <tr>
            <td className="text-gray-500 p-2">Delivery</td>
            <td className="font-medium p-2">
              Delivery by {date.toDateString()} | ₹40
            </td>
          </tr>
          <tr>
            <td className="text-gray-500 p-2">Warranty</td>
            <td className="p-2">No Warranty</td>
          </tr>
          <tr>
            <td className="text-gray-500 p-2">Seller</td>
            <td className="p-2">
              <span className="text-blue-500 font-medium">SuperComNet</span>
              <div className="text-sm text-gray-600">GST invoice available</div>
              <div className="text-sm text-gray-600">10 Days Return Policy</div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="p-2">
              <img src={adURL} alt="flipkart-points" className="w-72" />
            </td>
          </tr>
          <tr>
            <td className="text-gray-500 p-2">Description</td>
            <td className="p-2">{product.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetail;
