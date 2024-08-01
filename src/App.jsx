import {useZustandA, useZustandB} from "./useZustand.js";
import {atom, useSetAtom, useAtom} from 'jotai';


const ZuA = () => {
    const {a, setA} = useZustandA();
    console.log("a rendering")

    return (
        <section style={{backgroundColor: 'tomato', padding: 8}}>
            <div>{a}</div>
            <button onClick={() => setA(a + 1)}>set A</button>
        </section>
    )
}

const ZuB = () => {
    const {b, setB} = useZustandB();

    console.log("b rendering!")

    return (<section style={{backgroundColor: 'tan', padding: 8}}>
        <div>{b}</div>
        <button onClick={() => setB(b + 1)}>set B</button>
    </section>);
};

const baseAtom = atom({
    a: 0,
    b: 0,
})

const JoA = () => {
    const [atomStates, setAtom] = useAtom(baseAtom)

    console.log("joA rendering")
    return (
        <section style={{backgroundColor: 'aliceblue', padding: 8}}>
            <div>{atomStates.a}</div>
            <button onClick={() => setAtom(prev => {
                return {...prev, a: prev.a + 1};
            })}>set A</button>
        </section>
    )
}

const JoB = () => {
    const [atomStates] = useAtom(baseAtom)
    const setB = useSetAtom(baseAtom);

    console.log("joB rendering")
    return (
        <section style={{backgroundColor: 'rebeccapurple', padding: 8}}>
            <div>{atomStates.b}</div>
            <button onClick={() => setB(prev => ({...prev, b: prev.b + 1}))}>set B</button>
        </section>
    )
}

function App() {
    return (
        <>
            <strong>VITE_MODE: {import.meta.env.VITE_MODE}</strong>
            <h3>Zustand</h3>
            <ZuA/>
            <ZuB/>
            <h3>Jotai</h3>
            <JoA/>
            <JoB/>
        </>
    );
}

export default App
