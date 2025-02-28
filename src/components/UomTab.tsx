import { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import { uomCategories } from "../data";
import { countries } from "../data";

function UomTab() {
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Length");
  const [selectedUnit, setSelectedUnit] = useState("M");
  const [unitSymbol, setUnitSymbol] = useState("m");
  const [selectedLocale, setSelectedLocale] = useState("en-US");

  // Get available units based on selected category
  const availableUnits =
    uomCategories.find((cat) => cat.name === selectedCategory)?.units || [];

  // Check if current category is a "Count" type that should not allow decimals
  const isCountCategory = selectedCategory === "Count";

  // Update unit symbol when unit changes
  useEffect(() => {
    const unit = availableUnits.find((u) => u.code === selectedUnit);
    setUnitSymbol(unit?.symbol || "");
  }, [selectedUnit, availableUnits]);

  const handleValueChange = (value: string | undefined) => {
    if (isCountCategory && value) {
      // For count categories, convert to integer
      const intValue = parseInt(value.replace(/[^\d]/g, ''), 10);
      setValue(isNaN(intValue) ? '' : intValue.toString());
    } else {
      setValue(value || "");
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    
    // Clear value when switching to/from Count category to avoid decimal issues
    setValue('');

    // Update selected unit to first one in new category
    const newUnits =
      uomCategories.find((cat) => cat.name === newCategory)?.units || [];
    if (newUnits.length > 0) {
      setSelectedUnit(newUnits[0].code);
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(e.target.value);
  };

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocale(e.target.value);
  };

  // Format the displayed value with unit based on locale
  const formatUomValue = () => {
    if (!value) return "No value entered";

    try {
      const numericValue = parseFloat(value);
      let formatted;
      
      if (isCountCategory) {
        // For count categories, use integer format
        formatted = new Intl.NumberFormat(selectedLocale, {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(numericValue);
      } else {
        // For other categories, allow decimals
        formatted = new Intl.NumberFormat(selectedLocale, {
          maximumFractionDigits: 4,
        }).format(numericValue);
      }
      
      return `${formatted} ${unitSymbol}`;
    } catch (error) {
      return `${value} ${unitSymbol}`;
    }
  };

  // Determine decimal and group separators for the selected locale
  const getDecimalSeparator = () => {
    const numberWithDecimal = 1.1;
    const formatted = Intl.NumberFormat(selectedLocale).format(numberWithDecimal);
    return formatted.charAt(1);
  };
  
  const getGroupSeparator = () => {
    const numberWithGroup = 1000;
    const formatted = Intl.NumberFormat(selectedLocale).format(numberWithGroup);
    return formatted.charAt(1);
  };

  return (
    <div className="tab-content">
      <div className="input-container">
        <div className="select-container">
          <label htmlFor="category-select">Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            {uomCategories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="select-container">
          <label htmlFor="unit-select">Unit:</label>
          <select
            id="unit-select"
            value={selectedUnit}
            onChange={handleUnitChange}
            className="unit-select"
          >
            {availableUnits.map((unit) => (
              <option key={unit.code} value={unit.code}>
                {unit.name} ({unit.symbol})
              </option>
            ))}
          </select>
        </div>
        
        <div className="select-container">
          <label htmlFor="locale-select">Format:</label>
          <select
            id="locale-select"
            value={selectedLocale}
            onChange={handleLocaleChange}
            className="locale-select"
          >
            {countries.map(country => (
              <option key={country.locale} value={country.locale}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2>Enter Value</h2>
    <div className="input-with-unit">
      <CurrencyInput
        id="uom-input"
        name="uom-input"
        placeholder={isCountCategory ? "0" : "0.00"}
        value={value}
        onValueChange={handleValueChange}
        decimalsLimit={isCountCategory ? 0 : 4}
        className="uom-input"
        decimalScale={isCountCategory ? 0 : 4}
        allowDecimals={!isCountCategory}
        intlConfig={{ locale: selectedLocale }}
        style={{ textAlign: 'right' }}
      />
      <span className="unit-display">{unitSymbol}</span>
    </div>

      <p>
        Formatted value: <strong>{formatUomValue()}</strong>
      </p>
    </div>
  );
}

export default UomTab;