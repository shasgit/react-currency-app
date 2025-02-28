import { useState, useEffect } from 'react'
import './App.css'
import CurrencyInput from 'react-currency-input-field'

// Currency data with code and symbol
const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'INR', symbol: '₹' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'CHF', symbol: 'CHF' },
  { code: 'CNY', symbol: '¥' },
]

// Countries with name and locale
const countries = [
  { name: 'United States', locale: 'en-US' },
  { name: 'United Kingdom', locale: 'en-GB' },
  { name: 'Germany', locale: 'de-DE' },
  { name: 'France', locale: 'fr-FR' },
  { name: 'Japan', locale: 'ja-JP' },
  { name: 'India', locale: 'hi-IN' },
  { name: 'China', locale: 'zh-CN' },
  { name: 'Brazil', locale: 'pt-BR' },
  { name: 'Italy', locale: 'it-IT' },
]

function App() {
  const [value, setValue] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [selectedCountry, setSelectedCountry] = useState('en-US')
  const [currencySymbol, setCurrencySymbol] = useState('$')
  
  // Update currency symbol when currency changes
  useEffect(() => {
    const currency = currencies.find(c => c.code === selectedCurrency)
    setCurrencySymbol(currency?.symbol || '$')
  }, [selectedCurrency])
  
  const handleValueChange = (value: string | undefined) => {
    setValue(value || '')
  }
  
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value)
  }
  
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value)
  }
  
  // Format the displayed value based on locale
  const formatLocalizedValue = () => {
    if (!value) return 'No value entered'
    
    try {
      // Format the number according to the selected locale
      const numericValue = parseFloat(value)
      return new Intl.NumberFormat(selectedCountry, {
        style: 'currency',
        currency: selectedCurrency,
      }).format(numericValue)
    } catch (error) {
      return `${currencySymbol}${value}`
    }
  }

  return (
    <>
      <h1>Currency Converter</h1>
      
      <div className="card">
        <div className="input-container">
          <div className="select-container">
            <label htmlFor="currency-select">Currency:</label>
            <select
              id="currency-select"
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="currency-select"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>
          
          <div className="select-container">
            <label htmlFor="country-select">Format:</label>
            <select
              id="country-select"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="country-select"
            >
              {countries.map(country => (
                <option key={country.locale} value={country.locale}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <h2>Enter Amount</h2>
        <CurrencyInput
          id="currency-input"
          name="currency-input"
          placeholder="0.00"
          value={value}
          onValueChange={handleValueChange}
          prefix={currencySymbol}
          decimalsLimit={2}
          className="currency-input"
          // Use these props based on locale conventions
            intlConfig={{ locale: selectedCountry }}
          />
        
        <p>Formatted value: <strong>{formatLocalizedValue()}</strong></p>
      </div>
    </>
  )
}

export default App
