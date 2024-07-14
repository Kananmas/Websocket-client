import { createContext } from "react";

export const exceptionState = {
    getter:()=>{},
    setter:()=>{}
};



export const ExceptionContext = createContext(exceptionState);