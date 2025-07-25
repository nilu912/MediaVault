import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import WalletProvider from "./context/WalletContext";
function App() {
  return (
    <>
      <WalletProvider>
        <div className="bg-gray-500 h-screen w-screen flex flex-col">
          <Header />
          <Body />
        </div>
      </WalletProvider>
    </>
  );
}

export default App;
