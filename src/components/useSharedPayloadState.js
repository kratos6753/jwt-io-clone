import { useState } from "react";
import { useBetween } from "use-between";

const usePayloadState = () => {
    const [ payload, setPayload ] = useState({
        "sub": "1234567890",
        "name": "John Doe",
        "iat": 1516239022
    });
    return {
        payload, setPayload
    };
}

const useSharedPayloadState = () => useBetween(usePayloadState);

export default useSharedPayloadState;