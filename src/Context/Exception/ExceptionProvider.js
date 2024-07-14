import { useState } from "react";
import { ExceptionContext, exceptionState } from "./ExceptionContext";
import { Alert } from "antd";
import { If } from "../../components/If";

export function ExceptionProvider({ children }) {
    const [state, setState] = useState(exceptionState);
    const [isOpen, setIsOpen] = useState(false);

    const setter = (error) => {
        if (error instanceof Error) {
            setState({
                message: error.message,
                code: error?.code
            })
            setIsOpen(true);
        }
    }

    const getter = () => state;

    const handleClickClose = () => {
        setIsOpen(false)
    }

    return <ExceptionContext.Provider value={{ getter, setter }}>
        <If condition={isOpen}>
            <Alert
                style={{position:"absolute" , left:"14px" , top:"14px" , zIndex:99}}
                description={state.message}
                message="ERROR MESSAGE"
                onClick={handleClickClose}
            />
        </If>
        {children}
    </ExceptionContext.Provider>
}