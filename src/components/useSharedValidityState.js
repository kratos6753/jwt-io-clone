import { useState } from "react";
import { useBetween } from "use-between";

const useValidityState = () => {
    const [ validity, setValidity ] = useState(false)
    return {
        validity, setValidity
    };
}

const useSharedValidityState = () => useBetween(useValidityState);

export default useSharedValidityState;