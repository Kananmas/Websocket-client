export function Else({condition,children}) {
    if(!condition) {
        return <>
        {children}
        </>
    }
    else {
        return null
    }
}