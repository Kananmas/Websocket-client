import { useContext } from "react"
import { ExceptionContext } from "../Context/Exception/ExceptionContext";

export const useException = () => {
    const context = useContext(ExceptionContext);
    return context;
}