"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Currency {
  acronym: string;
  fullName: string;
}


export default function Home() {
  const [ currencies, setCurrencies ] = useState([] as Currency[])

  async function getData() {
    const response = await fetch('https://api.getgeoapi.com/v2/currency/list?api_key=c27c9425a38679f734f1a6b278eec778a4d3045d')
    const data = await response.json()
    
    const newCurrencies = []
    for(const c in data.currencies) {
      newCurrencies.push({ acronym: c, fullName: data.currencies[c] })
    }
    setCurrencies(newCurrencies)
  }

  useEffect(() => {
    getData()  
  }, [])

  return (
    <main>
      <form>
        <label>
          Value
          <input type="number"/>
        </label>
        <label>
          From
          <select name="from">
            {currencies.map(currency => <option key={currency.acronym} value={currency.acronym}>{currency.acronym} - {currency.fullName}</option>)}
          </select>
        </label>
        <label>
          To
          <select name="to">
            {currencies.map(currency => <option key={currency.acronym} value={currency.acronym}>{currency.acronym} - {currency.fullName}</option>)}
          </select>
        </label>
        <button type="submit">Convert</button>
      </form>
    </main>
  )
}
