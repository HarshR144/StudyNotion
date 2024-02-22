import { useEffect } from "react";

export default function useOnClickOutside(ref,handler){
    useEffect(()=>{
        // define listenr to be called on click/touch events
        const listener =(event)=>{
            //IF click / touch event originated inside  the ref element do nothing
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            // else call the provided handler function
            handler(event);
        };
    
    //Add event listner for mouse click/touch events
    document.addEventListener("mousedown",listener);
    document.addEventListener("touchstart",listener);

    //cleanup function to remove  the event  listners when the component unmounts or when the ref/handler dependencies changes
    return ()=>{
        document.removeEventListener("mousedown",listener);
        document.removeEventListener("touchstart",listener);
    };
    },[ref,handler]);//only run this effect when the ref or handler function changes
}