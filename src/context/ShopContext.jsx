import { createContext, useEffect, useState } from "react";
import { products } from '../assets/frontend_assets/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cardItem,setCardItem] = useState({});
    const navigate = useNavigate();

    const addToCart = async (itemId,size) =>{

        if (!size) {
            toast.error('Select Product Size')
            return;
        }
        let cartData = structuredClone(cardItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCardItem(cartData);
    }

    const getCartCount = () =>{
        let totalCount = 0;
        for(const items in cardItem){
            for(const item in cardItem[items]){
                try {
                    if (cardItem[items][item] > 0) {
                        totalCount += cardItem[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) =>{
        let cartData = structuredClone(cardItem);

        cartData[itemId][size] = quantity;

        setCardItem(cartData);
    }

    const getCartAmount =  ()=>{
        let totalAmount = 0;
        for(const items in cardItem){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cardItem[items]){
                try {
                    if(cardItem[items][item] > 0){
                        totalAmount+=itemInfo.price * cardItem[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const value = {
        products,
        currency,
        delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cardItem,addToCart,
        getCartCount,updateQuantity,
        getCartAmount,navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;