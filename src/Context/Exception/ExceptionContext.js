import { createContext } from "react";

export const exceptionState = {
    message:"",
    code:"",
};



export const ExceptionContext = createContext(exceptionState);