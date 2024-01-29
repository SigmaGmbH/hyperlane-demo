import {ethers} from 'ethers'
import {ANVIL_ABI, SWISSTRONIK_ABI} from './abi'
import {encryptDataField, decryptNodeResponse} from '@swisstronik/swisstronik.js'

const ANVIL_CONTRACT_ADDRESS = "0x0f0292ef074294b2fD30066685Fea0cC71a42176"
const SWISSTRONIK_CONTRACT_ADDRESS = "0x2E6e4cf23BE1133d698EB1bCe54efc34Df014201"

const SWISSTRONIK_URL = "https://json-rpc.testnet.swisstronik.com"
const ANVIL_URL = "https://evm-rpc.sdi.swisstronik.com"

export const getSwisstronikCounter = async () => {
    const provider = new ethers.providers.JsonRpcProvider(SWISSTRONIK_URL)
    const contract = new ethers.Contract(SWISSTRONIK_CONTRACT_ADDRESS, SWISSTRONIK_ABI, provider)
    const res = await sendShieldedQuery(
        provider, 
        SWISSTRONIK_CONTRACT_ADDRESS, 
        contract.interface.encodeFunctionData("counter")
    );
    return contract.interface.decodeFunctionResult("counter", res)[0];
}

export const getAnvilCounter = async () => {
    const provider = new ethers.providers.JsonRpcProvider(ANVIL_URL)
    const contract = new ethers.Contract(ANVIL_CONTRACT_ADDRESS, ANVIL_ABI, provider)
    return await contract.readCounter()
}

export const incrementSwisstronikCounter = async (signer) => {
    const contract = new ethers.Contract(SWISSTRONIK_CONTRACT_ADDRESS, SWISSTRONIK_ABI)
    const encodedData = contract.interface.encodeFunctionData("incrementCounter", [])
    return await sendShieldedTransaction(signer, SWISSTRONIK_CONTRACT_ADDRESS, encodedData)
}

const sendShieldedQuery = async (provider, destination, data) => {
    // Encrypt the call data using the SwisstronikJS function encryptDataField()
    const [encryptedData, usedEncryptedKey] = await encryptDataField(SWISSTRONIK_URL, data);

    // Execute the call/query using the provider
    const response = await provider.call({
        to: destination,
        data: encryptedData,
    });

    // Decrypt the call result using SwisstronikJS function decryptNodeResponse()
    return await decryptNodeResponse(SWISSTRONIK_URL, response, usedEncryptedKey);
};

const sendShieldedTransaction = async (signer, destination, data) => {  
    // Encrypt transaction data
    const [encryptedData] = await encryptDataField(SWISSTRONIK_URL, data);
  
    // Construct and sign transaction with encrypted data
    return await signer.sendTransaction({
      from: signer.address,
      to: destination,
      data: encryptedData,
    });
  };