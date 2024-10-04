import Cart from "../model/cart.schema.js";
import Product from "../model/product.schema.js";

export const fetchCart = async (req, res) => {
    try {
        const cart = await Cart.find({}).populate('product')
        res.status(200).json(cart)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateCart = async (req, res) => {
    const { productId, action } = req.body;

    try {
        const cartItem = await Cart.findOne({ product: productId });

        if (cartItem) {
            if (action === 'plus') {
                cartItem.quantity += 1;
            } else if (action === 'minus' && cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            }

            await cartItem.save();
            return res.status(200).json({ message: 'Cart updated', cartItem });
        } else {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            const newCartItem = new Cart({
                product: productId,
                quantity: 1,
            });
            await newCartItem.save();
            return res.status(201).json({ message: 'Product added to cart', newCartItem });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

export const removeCartItem = async (req, res) => {
    const { productId } = req.body;
    try {
        const cartItem = await Cart.findOne({ product: productId });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        await Cart.deleteOne({ product: productId });
        return res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
