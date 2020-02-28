import React, { useState } from 'react';

const VisitaDetail = () => {

    const [isCheckedOut, setCheckout] = useState(true);

    return (
        <React.Fragment>
            
            <h1>VISITA NUMERO 16</h1>    
            {
                isCheckedOut == true ? 
                    (<h2>La visita SI tiene check out</h2>) :
                    (<h2>La visita NO tiene check out</h2>)
            }

            <button onClick={() => { console.log(!isCheckedOut); setCheckout(!isCheckedOut); }} >Change</button>

        </React.Fragment>
    );
}

export default VisitaDetail;