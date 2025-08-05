import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null
};

// Action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOAD_CART: 'LOAD_CART'
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        toast.error('Course is already in your cart');
        return state;
      }
      
      const newItems = [...state.items, action.payload];
      const newTotal = newItems.reduce((sum, item) => sum + item.price, 0);
      
      toast.success('Course added to cart');
      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItems.length
      };
    
    case CART_ACTIONS.REMOVE_ITEM:
      const filteredItems = state.items.filter(item => item._id !== action.payload);
      const newTotalAfterRemove = filteredItems.reduce((sum, item) => sum + item.price, 0);
      
      toast.success('Course removed from cart');
      return {
        ...state,
        items: filteredItems,
        total: newTotalAfterRemove,
        itemCount: filteredItems.length
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      const updatedItems = state.items.map(item =>
        item._id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotalAfterUpdate = updatedItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      
      return {
        ...state,
        items: updatedItems,
        total: newTotalAfterUpdate
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      };
    
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case CART_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        itemCount: action.payload.itemCount || 0
      };
    
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartData = {
      items: state.items,
      total: state.total,
      itemCount: state.itemCount
    };
    localStorage.setItem('cart', JSON.stringify(cartData));
  }, [state.items, state.total, state.itemCount]);

  // Add item to cart
  const addToCart = (course) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: course });
  };

  // Remove item from cart
  const removeFromCart = (courseId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: courseId });
  };

  // Update item quantity
  const updateQuantity = (courseId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: courseId, quantity } });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    toast.success('Cart cleared');
  };

  // Check if item is in cart
  const isInCart = (courseId) => {
    return state.items.some(item => item._id === courseId);
  };

  // Get cart item
  const getCartItem = (courseId) => {
    return state.items.find(item => item._id === courseId);
  };

  // Calculate subtotal
  const getSubtotal = () => {
    return state.items.reduce((sum, item) => sum + item.price, 0);
  };

  // Calculate tax (example: 8.5%)
  const getTax = () => {
    return getSubtotal() * 0.085;
  };

  // Calculate total with tax
  const getTotalWithTax = () => {
    return getSubtotal() + getTax();
  };

  // Apply discount
  const applyDiscount = (discountCode) => {
    // This would typically call an API to validate the discount code
    // For now, we'll just show a placeholder
    toast.info('Discount code validation would happen here');
  };

  // Checkout
  const checkout = async () => {
    if (state.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });

    try {
      // This would typically redirect to a checkout page or payment processor
      // For now, we'll just show a success message
      toast.success('Redirecting to checkout...');
      
      // Simulate checkout process
      setTimeout(() => {
        clearCart();
        dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
        toast.success('Order placed successfully!');
      }, 2000);
    } catch (error) {
      dispatch({ 
        type: CART_ACTIONS.SET_ERROR, 
        payload: 'Checkout failed. Please try again.' 
      });
      toast.error('Checkout failed. Please try again.');
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItem,
    getSubtotal,
    getTax,
    getTotalWithTax,
    applyDiscount,
    checkout,
    clearError
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 