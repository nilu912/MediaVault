import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import WalletProvider from "./context/WalletContext";
import MyNFTs from "./components/MyNfts";
import AllNFTs from "./components/AllNfts";
import MintNFTs from "./components/MintNFTs";
import Footer from "./components/Footer";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    // <BrowserRouter>
      <AnimatePresence mode="wait">
        <WalletProvider>
          <div className="flex flex-col h-auto min-h-screen overflow-x-hidden bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
            <Header />
            <main className="flex-grow">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Body />} />
                <Route path="/my-nfts" element={<MyNFTs />} />
                <Route path="/explore" element={<AllNFTs />} />
                <Route path="/mint" element={<MintNFTs />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </WalletProvider>
      </AnimatePresence>
    // </BrowserRouter>
  );
}

export default App;
