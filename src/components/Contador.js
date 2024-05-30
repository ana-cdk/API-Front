// Import

import { useState } from "react";


// Component
function Contador() {
    let [count, setCount] = useState(10);

    function decrementar() {
        setCount(count-1);
        console.log(count);
    }

    function incrementar() {
        setCount(count+1);
        console.log(count);
    }

    return(
        <div>
            <p>Valor: {count}</p>

            <button onClick={decrementar}>-</button>
            <button onClick={incrementar}>+</button>
        </div>
    );
}

//Export
export default Contador;