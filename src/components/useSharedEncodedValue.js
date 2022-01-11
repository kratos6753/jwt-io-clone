import { useState } from "react";
import { useBetween } from "use-between";

const useEncodedValue = () => {
    const [ encodedValue, setEncodedValue ] = useState("")
    return {
        encodedValue, setEncodedValue
    };
}

const useSharedEncodedValue = () => useBetween(useEncodedValue)

export default useSharedEncodedValue;