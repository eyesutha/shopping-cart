import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import {  useSessionStorage } from "../hooks/useSessionStorage";


type ShoppingcartPoviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number
}

type ShoppingCartContextType = {
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void

}
const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);
export function useShoppingCart() {
    const context = useContext(ShoppingCartContext);
    if (context === undefined) {
        throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
    }
    return context;
}

export function ShoppingcartPovider({ children }:
    ShoppingcartPoviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useSessionStorage<CartItem[]>
    ("shopping-cart", [])

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,0 )

const openCart = () => setIsOpen(true)
const closeCart = () => setIsOpen(false)

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    const increaseCartQuantity = (id: number) =>{
        setCartItems(currItems => {
            const item = currItems.find(item => item.id === id);
            if (!item) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map(item => 
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            const item = currItems.find(item => item.id === id);
            if (item?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => 
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currItems => currItems.filter(item => item.id !== id));
    }
    
    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
            }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}