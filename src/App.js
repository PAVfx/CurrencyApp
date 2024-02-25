import './App.css';
import CurrencyInput from './CurrencyInput';
import {useState, useEffect} from "react";
import axios from "axios";

function App() {

  const [amount1, setAmount1] = useState(1); // define amount1 state for CURRENCY INPUT GROUP 1
  const [amount2, setAmount2] = useState(2); // define amount2 state for CURRENCY INPUT GROUP 2
  const [currency1, setCurrency1] = useState('CAD'); // define currency1 state for CURRENCY INPUT GROUP 1
  const [currency2, setCurrency2] = useState('USD'); // define currency2 state for CURRENCY INPUT GROUP 2
  const [rates, setRates] = useState({}); // define rates state to fetch currency rates via API

  useEffect(() => {
    axios.get('https://v6.exchangerate-api.com/v6/55f165cec8a81de8b626c7d4/latest/USD')
      .then(response => {
        setRates(response.data.conversion_rates); // in api fetch, the currency names are called conversion_rates
      })
      .catch(error => {
        console.error('Error fetching currency rates:', error);
      });
  }, []);

  useEffect(() => {
    // Check if rates is truthy and not an empty object
    if (rates && Object.keys(rates).length > 0) {
      // Call handleAmount1Change with the initial amount value of 1
      handleAmount1Change(1);
    }
  }, [rates]); // Specify rates as the dependency for the effect
  

  // create a function to format numbers (so only 4 decimal spaces)

  function format(number) {
    return number.toFixed(4);
  }

  // 4 handle functions from row 1 to row 2, and row 2 to row 1

  function handleAmount1Change(amount1) { // now let use actual rates from API fetch
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }
  
  function handleCurrency1Change(currency1) { // now let use actual rates from API fetch
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }


  // repeat for second row (value amount and currency select)

  function handleAmount2Change(amount2) { // now let use actual rates from API fetch
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }
  
  function handleCurrency2Change(currency2) { // now let use actual rates from API fetch
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
  <div className="App">
  <h1>Currency Converter</h1>
  {rates && Object.keys(rates).length > 0 && (
    <> 
    <CurrencyInput
      onAmountChange={handleAmount1Change}
      onCurrencyChange={handleCurrency1Change}
      currencies={Object.keys(rates)} 
      amount={amount1} 
      currency={currency1} 
    />

    <CurrencyInput 
      onAmountChange={handleAmount2Change}
      onCurrencyChange={handleCurrency2Change}
      currencies={Object.keys(rates)} 
      amount={amount2} 
      currency={currency2} 
    />
    </>
  )}
    </div>
  );
}

export default App;
