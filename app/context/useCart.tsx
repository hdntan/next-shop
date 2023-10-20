import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "../product/[productId]/ProductDetail";
import { toast } from "react-hot-toast";
import Product from "../product/[productId]/page";
type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts:CartProductType[] | null;
    handleAddProductToCart:(product: CartProductType) => void
    handleDeleteProductToCart:(product: CartProductType) => void
    handleCartQtyIncrease:(product: CartProductType) => void
    handleCartQtyDecree:(product: CartProductType) => void
    handleClearCart: () => void
    paymentIntent: string | null
    handleSetPaymentIntent: (val: string | null) => void

};

export const CartContext = createContext<CartContextType | null>(null)


interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartTotalAmount, setCartTotalAmount] = useState(0)

    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)


    console.log('total', cartTotalAmount)
    console.log('qty', cartTotalQty)
    useEffect(() => {
        const cartItems: any = localStorage.getItem('cartItem')
        const carts: CartProductType[] | null = JSON.parse(cartItems);
        const shopPaymentIntent: any = localStorage.getItem('shopPaymentIntent');
        const paymentIntent: string | null = JSON.parse(shopPaymentIntent)
        setCartProducts(carts);
        setPaymentIntent(paymentIntent)

    },[])

    useEffect(() => {
        const getTotals = () => {
            if(cartProducts) {
                const {total, qty}  = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity
                    acc.total += itemTotal
                    acc.qty += item.quantity
                    return acc
                },{
                    total: 0,
                    qty:0
                })

                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }
        
        }
        getTotals()
    },[cartProducts]) 

    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val);
        localStorage.setItem("shopPaymentIntent", JSON.stringify(val));

    },[paymentIntent])

    const handleAddProductToCart = useCallback((product: CartProductType) =>{
        setCartProducts((prev) => {
            let updatedCart;
            if(prev) {
                updatedCart = [...prev, product]
            }
            else {
                updatedCart = [product]
            }
            toast.success("Product added to cart")
            localStorage.setItem('cartItem', JSON.stringify(updatedCart))
            return updatedCart
        })
    },[])

    const handleDeleteProductToCart = useCallback((product: CartProductType) => {
        if(cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })
            setCartProducts(filteredProducts);
            toast.success("Product removed")
            localStorage.setItem('cartItem', JSON.stringify(filteredProducts))
        }
    }, [cartProducts]) 

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 50) {
            return toast.error("Ooop! Maximum reached");
        }
        if(cartProducts) {
            updatedCart = [...cartProducts];
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id 
            );
            if(existingIndex > -1) {
                updatedCart[existingIndex].quantity =  ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('cartItem', JSON.stringify(updatedCart))
        }

    },[cartProducts])

    const handleCartQtyDecree = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 1) {
            return toast.error("Ooop! Minimum reached");
        }
        if(cartProducts) {
            updatedCart = [...cartProducts];
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id 
            );
            if(existingIndex > -1) {
                updatedCart[existingIndex].quantity =  --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('cartItem', JSON.stringify(updatedCart))
        }

    },[cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('cartItem', JSON.stringify(null))
    },[cartProducts])

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleDeleteProductToCart,
        handleCartQtyIncrease,
        handleCartQtyDecree,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent
    }
    return <CartContext.Provider value={value} {...props}/>
       
   
}

export const useCart = () => {
    const context = useContext(CartContext);

    if(context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }
    return context
}