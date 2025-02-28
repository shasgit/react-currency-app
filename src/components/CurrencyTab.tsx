import { useState, useEffect } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { currencies, countries } from '../data'

function CurrencyTab() {
  const [value, setValue] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [selectedCountry, setSelectedCountry] = useState('en-US')
  const [align, setAlign] = useState<'left' | 'right'>('left')
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

  const handleAlignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlign(e.target.value as "left" | "right")
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
    <div className="tab-content">
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

        <div className="align-container">
          <label htmlFor="country-select">Format:</label>
          <select
            id="align-select"
            value={align}
            onChange={handleCountryChange}
            className="align-select"
          >
            {["left", "right"].map(align => (
              <option key={align} value={align}>
                {align}
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
        intlConfig={{ locale: selectedCountry }}
        style={{ textAlign: align }}
      />
      
      <p>Formatted value: <strong>{formatLocalizedValue()}</strong></p>
    </div>
  )
}

export default CurrencyTab