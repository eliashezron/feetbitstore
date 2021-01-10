import React from 'react'
import CurrencyFormat from 'react-currency-format'

const CurrencySeparator = () => {
    return (
        <CurrencyFormat
        decimalScale={2}
        
        displayType={"text"}
        thousandSeparator={true}
        prefix={"UGX"}

        />
            
        
    )
}

export default CurrencySeparator
