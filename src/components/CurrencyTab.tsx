import { useState, useEffect } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { currencies, countries } from '../data'

type DecimalGroupSeparator = {
  decimalSeparator: string,
  groupSeparator: string
};

const DecimalGroupSeparatorOptions = [`{"decimalSeparator":".","groupSeparator":","}`, `{"decimalSeparator":",","groupSeparator":"."}`, `{"decimalSeparator":".","groupSeparator":" "}`];

function CurrencyTab() {
  const [value, setValue] = useState('2500000.55')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [selectedCountry, setSelectedCountry] = useState('de-DE')
  const [align, setAlign] = useState<'left' | 'right'>('right')
  const [type, setType] = useState<"country" | "decimalGroup">("country");
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const [decimalGroupSeparator, setDecimalGroupSeparator] = useState<DecimalGroupSeparator>(() => {
    return JSON.parse(DecimalGroupSeparatorOptions[0])
  });

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value as "country" | "decimalGroup");
  };

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

  const handleDecimalGroupSeparatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDecimalGroupSeparator(JSON.parse(e.target.value) as DecimalGroupSeparator);
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



        <div className="align-container">
          <label htmlFor="align-select">Align:</label>
          <select
            id="align-select"
            value={align}
            onChange={handleAlignChange}
            className="align-select"
          >
            {["Left", "Right"].map(alignKey => (
              <option key={alignKey.toLowerCase()} value={alignKey.toLowerCase()}>
                {alignKey}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="input-container" style={{
        alignItems: "Center"
      }}>
        <input
          type="radio"
          name="radioGroup"
          value={"country"}
          checked={type === "country"}
          style={{
            transform: 'scale(1.5)'
          }}
          onChange={handleTypeChange}
        />
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
        <span>OR</span>
        <input
          type="radio"
          name="radioGroup"
          value={"decimalGroup"}
          style={{
            transform: 'scale(1.5)'
          }}
          checked={type === "decimalGroup"}
          onChange={handleTypeChange}
        />
        <div className="decimalGroupSeparator-container">
          <label htmlFor="decimalGroupSeparator-select">Decimal & Group Separator:</label>
          <select
            id="decimalGroupSeparator-select"
            value={JSON.stringify(decimalGroupSeparator)}
            onChange={handleDecimalGroupSeparatorChange}
            className="decimalGroupSeparator-select"
          >
            {DecimalGroupSeparatorOptions.map(align => (
              <option key={align} value={align}>
                {`Decimal Separator  '${JSON.parse(align).decimalSeparator}' Group Separator  '${JSON.parse(align).groupSeparator}'`}
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
        decimalSeparator={type === "country" ? undefined : decimalGroupSeparator.decimalSeparator}
        groupSeparator={type === "country" ? undefined : decimalGroupSeparator.groupSeparator}
      />

      <p>Formatted value: <strong>{formatLocalizedValue()}</strong></p>
    </div>
  )
}

export default CurrencyTab