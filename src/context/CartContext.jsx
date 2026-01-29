import { createContext, useContext, useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems(prev => {
            const existingItem = prev.find(i => i.id === item.id);
            if (existingItem) {
                toast.success(`Increased quantity of ${item.name}`);
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            toast.success(`${item.name} added to cart!`);
            return [...prev, { ...item, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const item = prev.find(i => i.id === itemId);
            if (item) {
                toast.success(`${item.name} removed from cart`);
            }
            return prev.filter(item => item.id !== itemId);
        });
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        toast.success('Cart cleared');
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const placeOrder = async (deliveryAddress, notes = '') => {
        if (!user) {
            toast.error('Please login to place an order');
            return { success: false };
        }

        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return { success: false };
        }

        setIsPlacingOrder(true);

        try {
            const orderData = {
                items: cartItems.map((item) => ({
                    menuItem: item._id || item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                totalAmount: getTotalPrice(),
                deliveryAddress: deliveryAddress || {
                    hostelId: user.hostelId,
                    roomNumber: user.roomNumber,
                },
                notes,
            };

            const response = await orderService.createOrder(orderData);

            if (response.success) {
                clearCart();
                setIsCartOpen(false);
                toast.success(`Order placed successfully! Order #${response.data.orderNumber}`);
                return { success: true, order: response.data };
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to place order';
            toast.error(message);
            return { success: false, message };
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                isPlacingOrder,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalPrice,
                getTotalItems,
                toggleCart,
                setIsCartOpen,
                placeOrder,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
