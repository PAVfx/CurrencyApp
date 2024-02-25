import React from 'react';
import PropTypes from 'prop-types';
import './CurrencyInput.css'

function CurrencyInput(props) {
    const { amount, currency, currencies } = props;
    return (
        <div className="group">
            {/* This is currency $ amount */}
            <input 
                type="text" 
                value={amount}
                onChange = {e => props.onAmountChange(e.target.value)}
            />

            {/* This is currency dropdown selection */}
            <select
                value={currency} 
                onChange={e => props.onCurrencyChange(e.target.value)}
            >
                {currencies && currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>
        </div>
    );
}
CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    setAmount: PropTypes.func.isRequired,
    setCurrency: PropTypes.func.isRequired,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func
}

export default CurrencyInput;