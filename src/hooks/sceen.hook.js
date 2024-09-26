import { useEffect, useState } from "react"

export const useScreen = () => {
    const [state , setState] =  useState({
        width:window.innerWidth,
        height:window.innerHeight
    });

    useEffect(() => {
        const handleResize = (e) => {
            setState({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }

        window.addEventListener("resize" , handleResize);


        return () => {
            window.removeEventListener("resize" , handleResize);
        }

    },[])

    return state;
}