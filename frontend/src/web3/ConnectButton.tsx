import * as SorobanClient from "@stellar/stellar-sdk";

import { useRegisteredContract } from "@soroban-react/contracts";
import { useSorobanReact } from "@soroban-react/core";
import { Soroban } from "soroban-client";

export const ConnectButton = ({ onConnect, onDisconnect }) => {
  const sorobanContext = useSorobanReact();
  const { activeChain, address, disconnect, setActiveConnectorAndConnect } =
    sorobanContext;
  const activeAccount = address;
  const browserWallets = sorobanContext.connectors;
  const mycontract = useRegisteredContract("energy_trade");

  const handleConnect = async (wallet) => {
    await setActiveConnectorAndConnect(wallet);
    onConnect();
  };

  const handleDisconnect = async () => {
    await disconnect();
    onDisconnect();
  };

  const buyer: SorobanClient.xdr.ScVal = new SorobanClient.Address(
    "GBN2GLBHYOYW7XGKHD43ZN5VOYJ6EHUDFQEVW3WHH6UKAYQWAXPTZ3DX"
  ).toScVal();
  const seller: SorobanClient.xdr.ScVal = new SorobanClient.Address(
    "GD6NP2LXO2DPARLON62F6R6Z22VZBTW7XEVHWVLTHBDKJYLVAOTJE7K4"
  ).toScVal();

  const energy_amount: SorobanClient.xdr.ScVal = SorobanClient.nativeToScVal(
    10,
    { type: "u32" }
  );
  const amount: SorobanClient.xdr.ScVal = SorobanClient.nativeToScVal(100, {
    type: "i128",
  });

  const handleTrade = async () => {
    console.log("bhai pata nhi ");
    try {
     await mycontract?.invoke({
       method: "create_trade",

       args: [buyer, seller, energy_amount, amount],
       signAndSend: true,
     });   
    } catch (error) {
      console.log("fail")
    }
try {
  await mycontract?.invoke({
    method: "complete_trade",

    args: [buyer],
    signAndSend: true,
  });  
  
} catch (error) {
  console.log(error)
}

   
  };

  if (!activeAccount)
    return (
      <div className="w-full p-4">
        <p className="text-white text-lg mb-2">Connect to a wallet</p>
        {browserWallets.map((w) => (
          <button
            onClick={() => handleConnect(w)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            key={w.name}
          >
            {w.name}
          </button>
        ))}
      </div>
    );

  return (
    <div className="w-full p-4 text-white text-lg flex flex-col gap-2">
      <p>
        Active Chain: <b>{activeChain?.name}</b>
      </p>
      <p>
        Wallet Address: <b>{address}</b>
      </p>
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen text-black">
          <h1 className="text-4xl font-bold mb-4">Energy Dashboard</h1>
          <div className="flex flex-col items-center p-6 rounded-lg shadow-md mb-4">
            <img
              alt="Energy Icon"
              src="https://images.app.goo.gl/fxG9c1WrwVnB7F2c7"
              className="mb-4"
            />
            <p className="text-lg">Available Energy: 100 kWh</p>
            <p className="text-lg">Cost of Energy: 100 tokens/kWh</p>
          </div>
        </div>
        <div className="flex flex-row">
          <button
            onClick={handleTrade}
            className="bg-lime-500 text-white p-2 rounded-lg"
          >
            Buy Now
          </button>
          <button
            className="fixed right-0 top-0 m-4 bg-red-500 hover:bg-red-700 justify-center text-center text-white font-bold py-2 px-4 rounded-full w-min"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};
