import React, { useState } from "react";
import { ConnectButton } from "./web3/ConnectButton";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <>
      <div className="mt-20 text-center">
        <h1 className="max-w-md mx-auto text-3xl font-extrabold tracking-normal text-gray-900 sm:text-3xl md:text-5xl lg:text-6xl md:leading-none sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
          <span className="block">Decentralized Energy Trading</span>
        </h1>
      </div>

      {!isConnected ? (
        <div className="mt-10">
          <div className="max-w-6xl px-4 mx-auto md:max-w-4xl sm:max-w-2xl sm:px-6">
            <div className="text-center">
              <h2 className="max-w-md px-12 mx-auto mt-10 font-normal text-gray-500 text-md sm:mt-5 sm:text-md md:mt-5 md:text-xl sm:max-w-xl md:max-w-xl">
                Sendpreview is a social media advertising tool that lets you
                quickly create Ad mockups for client approval.
              </h2>
              <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
                {/* Other content */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
            {/* Additional content for the connected state */}
            <div className="flex flex-col items-center justify-center min-h-screen text-black">
              <h2 className="text-4xl font-bold mb-4">Energy Dashboard</h2>
              <div className="flex flex-col items-center p-6 rounded-lg shadow-md mb-4">
                <img
                  alt="Energy Icon"
                  src="https://images.app.goo.gl/fxG9c1WrwVnB7F2c7"
                  className="mb-4"
                />
                <p className="text-lg">Available Energy: 100 kWh</p>
                <p className="text-lg">Cost of Energy: 100 tokens/kWh</p>
              </div>
              <button className="bg-lime-500 text-white p-2 rounded-lg mb-4">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center w-full px-8 py-3 text-center">
        <ConnectButton
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
      </div>
    </>
  );
}

export default App;
