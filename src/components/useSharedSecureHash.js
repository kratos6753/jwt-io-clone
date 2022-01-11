import { useState } from "react";
import { useBetween } from "use-between";

const useSecureHash = () => {
    const [ secret, setSecret ] = useState('your-secret-key');
    return {
        secret, setSecret
    };
}

const useSharedSecureHash = () => useBetween(useSecureHash);

export default useSharedSecureHash;