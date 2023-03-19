import React from 'react';
import reducer from "./store/reducers";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import DefaultPage from "./components/DefaultPage";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
      <Provider store={store}>
          <div>
              <DefaultPage/>
          </div>
      </Provider>
  );
}

export default App;


//   const infura = 'https://goerli.infura.io/v3/your-api-key';
//   const web3 = new Web3(new Web3.providers.HttpProvider(infura));
//   let addressValue = (document.getElementById('address-input') as HTMLFormElement).value;
//   let balance = await web3.eth.getBalance(addressValue);
//   balance = web3.utils.fromWei(balance, 'ether');