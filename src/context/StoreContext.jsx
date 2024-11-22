import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { auth, firestore } from "../config/firebase"; // Import auth and firestore
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchCartItems = async () => {
      if (auth.currentUser) {
        const cartSnapshot = await getDocs(collection(firestore, `users/${auth.currentUser.uid}/cart`));
        const cartData = {};
        cartSnapshot.forEach(doc => cartData[doc.id] = doc.data().quantity);
        setCartItems(cartData);
      }
    };

    fetchCartItems();
  }, []);

  const addToCart = async (itemId) => {
    console.log('Adding to cart:', itemId);
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (auth.currentUser) {
      try {
        await setDoc(doc(firestore, `users/${auth.currentUser.uid}/cart`, itemId), { quantity: (cartItems[itemId] || 0) + 1 });
        console.log('Document successfully written!');
      } catch (error) {
        console.error('Error writing document: ', error);
      }
    }
  };
  
  const removeFromCart = async (itemId) => {
    console.log('Removing from cart:', itemId);
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: prev[itemId] - 1 };
      if (newCart[itemId] <= 0) delete newCart[itemId];
      return newCart;
    });
    if (auth.currentUser) {
      try {
        await setDoc(doc(firestore, `users/${auth.currentUser.uid}/cart`, itemId), { quantity: cartItems[itemId] - 1 });
        console.log('Document successfully updated!');
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  };
  

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    for (const itemId in cartItems) {
      totalQuantity += cartItems[itemId];
    }
    return totalQuantity;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setCartItems({});
      }
    });
    return () => unsubscribe();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
