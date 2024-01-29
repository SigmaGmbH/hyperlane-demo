import './App.css';
import React, { useState } from 'react'
import { ethers } from 'ethers'
import { getAnvilCounter, getSwisstronikCounter, incrementSwisstronikCounter } from './contracts'

function App() {
  const [metamaskProvider, setMetamaskProvider] = useState()
  const [anvilCounter, setAnvilCounter] = useState(0)
  const [swisstronikCounter, setSwisstronikCounter] = useState(0)
  const [txProcessing, setTxProcessing] = useState(false)

  const updateAnvilCounter = async () => {
    try {
      const counterValue = await getAnvilCounter()
      console.log('Got anvil counter: ', counterValue.toNumber())
      setAnvilCounter(counterValue.toNumber())
    } catch (error) {
      console.error('Cannot obtain counter value from Anvil contract. Reason: ', error)
    }
  }

  const updateSwisstronikCounter = async () => {
    try {
      const counterValue = await getSwisstronikCounter()
      console.log('Got swisstronik counter: ', counterValue.toNumber())
      setSwisstronikCounter(counterValue.toNumber())
    } catch (error) {
      console.error('Cannot obtain counter value from Swisstronik contract. Reason: ', error)
    }
  }

  const incrementCounter = async () => {
    try {
      const signer = metamaskProvider.getSigner()
      await incrementSwisstronikCounter(signer)
      setTxProcessing(true)
    } catch (error) {
      console.error('Cannot increment counter in Swisstronik contract. Reason: ', error)
    }
  }

  const connectMetamask = async () => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)

    if (window.ethereum) {
      // Connect MetaMask to page
      const res = await window.ethereum.request({ method: "eth_requestAccounts" })
      if (res.length === 0) {
        return
      }

      try {
        // Add swisstronik testnet to MetaMask
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x50B",
            rpcUrls: ["https://json-rpc.testnet.swisstronik.com"],
            chainName: "Swisstronik Testnet",
            nativeCurrency: {
              name: "SWTR",
              symbol: "SWTR",
              decimals: 18
            },
            blockExplorerUrls: ["https://explorer-evm.testnet.swisstronik.com/"]
          }]
        })

        // Switch to swisstronik testnet
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x50B' }],
        });
      } catch (error) {
        console.error("Cannot switch to Swisstronik Testnet. Reason: ", error)
        alert('Please switch network to Swisstronik Testnet')
        return
      }

      setMetamaskProvider(provider)
    } else {
      alert("Cannot connect MetaMask");
    }
  }

  const renderMainPage = () => {
    return (
      <div className="App">
        <h2>Swisstronik Chain</h2>
        <p>Current counter: {swisstronikCounter}</p>
        <button onClick={updateSwisstronikCounter}>Update counter</button>
        <button onClick={incrementCounter}>Increment counter</button>
        {txProcessing ? <p>Transaction in progress, update counters</p> : <></>}

        <h2>Anvil Chain</h2>
        <p>Current counter: {anvilCounter}</p>
        <button onClick={updateAnvilCounter}>Update counter</button>
      </div>
    )
  }

  const renderLoader = () => {
    return (
      <div className="App">
        <button onClick={connectMetamask}>Connect metamask</button>
      </div>
    )
  }

  return (
    metamaskProvider ? renderMainPage() : renderLoader()
  );
}

export default App;
