import {toast} from "react-hot-toast";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

export function logout(navigate){
    return(dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
        
    }
}