import { useState } from "react";
import { useBetween } from "use-between";

const useAlgoState = () => {
    const [ algo, setAlgo ] = useState("HS256");
    return {
        algo, setAlgo
    };
};

const useSharedAlgoState = () => useBetween(useAlgoState);

export default useSharedAlgoState;