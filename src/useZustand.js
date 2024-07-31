import {appStore} from "./appStore.js";

export const useZustandA = () => {
    const a = appStore((state) => state.a);
    const setA = appStore((state) => state.setA);

    return { a, setA };
};

export const useZustandB = () => {
    const b = appStore((state) => state.b);
    const setB = appStore((state) => state.setB);

    return { b, setB };
};