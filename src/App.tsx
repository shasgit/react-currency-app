import { useState } from 'react'
import './App.css'
import CurrencyTab from './components/CurrencyTab'
import UomTab from './components/UomTab'

function App() {
  const [activeTab, setActiveTab] = useState('currency')

  return (
    <>
      <h1>Number Input</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'currency' ? 'active' : ''}`}
          onClick={() => setActiveTab('currency')}
        >
          Currency
        </button>
        <button 
          className={`tab ${activeTab === 'uom' ? 'active' : ''}`}
          onClick={() => setActiveTab('uom')}
        >
          Units of Measurement
        </button>
        <button 
        >
          Double
        </button>
        <button 
        >
          Integer
        </button>
      </div>
      
      <div className="card">
        {activeTab === 'currency' ? <CurrencyTab /> : <UomTab />}
      </div>
    </>
  )
}

export default App