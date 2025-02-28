// Currency data with code and symbol
export const currencies = [
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
export const countries = [
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

// UoM categories and units
export const uomCategories = [
  {
    name: 'Length',
    units: [
      { code: 'M', name: 'Meter', symbol: 'm' },
      { code: 'CM', name: 'Centimeter', symbol: 'cm' },
      { code: 'KM', name: 'Kilometer', symbol: 'km' },
      { code: 'IN', name: 'Inch', symbol: 'in' },
      { code: 'FT', name: 'Foot', symbol: 'ft' },
      { code: 'YD', name: 'Yard', symbol: 'yd' },
      { code: 'MI', name: 'Mile', symbol: 'mi' },
    ]
  },
  {
    name: 'Weight',
    units: [
      { code: 'KG', name: 'Kilogram', symbol: 'kg' },
      { code: 'G', name: 'Gram', symbol: 'g' },
      { code: 'MG', name: 'Milligram', symbol: 'mg' },
      { code: 'LB', name: 'Pound', symbol: 'lb' },
      { code: 'OZ', name: 'Ounce', symbol: 'oz' },
    ]
  },
  {
    name: 'Volume',
    units: [
      { code: 'L', name: 'Liter', symbol: 'L' },
      { code: 'ML', name: 'Milliliter', symbol: 'mL' },
      { code: 'GAL', name: 'Gallon (US)', symbol: 'gal' },
      { code: 'PT', name: 'Pint', symbol: 'pt' },
      { code: 'QT', name: 'Quart', symbol: 'qt' },
    ]
  },
  {
    name: 'Count',
    units: [
      { code: 'PC', name: 'Piece', symbol: 'pc' },
      { code: 'EA', name: 'Each', symbol: 'ea' },
      { code: 'DOZ', name: 'Dozen', symbol: 'doz' },
      { code: 'SET', name: 'Set', symbol: 'set' },
      { code: 'BOX', name: 'Box', symbol: 'box' }
    ]
  }
]