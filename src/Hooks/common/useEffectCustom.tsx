// 絶対に初回走るな
import { type } from "os";
import { useEffect, useRef } from "react";

const useEffectCustom = (func:()=>void, dependencyList:readonly unknown[]) => {
  const fisrtFlgRef = useRef(true);

  useEffect(() => {
    if (!fisrtFlgRef.current) {
      func();
    } else {
      fisrtFlgRef.current = false;
    }
  }, dependencyList);
};

export default useEffectCustom;