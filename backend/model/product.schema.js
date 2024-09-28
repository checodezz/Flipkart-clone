import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    category: String,
    qunatity: Number,
    ratings: String,
    description: String,
    discount: String,
    tagline: String
})


const Product = mongoose.model("product", productSchema);

export default Product