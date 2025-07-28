import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import WalletProvider from "./context/WalletContext";
import MyNFTs from "./components/MyNfts";
import AllNFTs from "./components/AllNfts"
import MintNFTs from "./components/MintNFTs";

function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <div className="flex flex-col min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/my-nfts" element={<MyNFTs />} />
              <Route path="/explore" element={<AllNFTs />} />
              <Route path="/mint" element={<MintNFTs />} />
            </Routes>
          </main>
        </div>
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;
