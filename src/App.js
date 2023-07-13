import {useState} from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Purchase from './Components/Purchase/Purchase';
import Transfer from './Components/Transfer/Transfer';
import Stake from './Components/Stake/Stake';
import Proposal from './Components/Proposal/Proposal';
import Transaction from './Components/Transaction/Transaction';
import Vote from './Components/Vote/Vote';
import Admin from './Components/Admin/Admin';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

function App() {
  const [state, setState] = useState({
    web3:null,
    contract:null
  })
  const [acc, setacc] = useState("");
  const saveState = (state, account) => {
    console.log(state);
    setState(state);
    setacc(account);
    console.log(account);
  }
  return (
    <>
    <Router>
        <Navbar saveState={saveState}></Navbar>
           <Routes>
                <Route exact path='/' element={< Hero />}></Route>
                <Route exact path='/purchase' element={< Purchase state={state} />}></Route>
                <Route exact path='/transfer' element={< Transfer state={state} />}></Route>
                <Route exact path='/stake' element={< Stake state={state} />}></Route>
                <Route exact path='/proposal' element={< Proposal state={state} />}></Route>
                <Route exact path='/transaction' element={< Transaction state={state} />}></Route>
                <Route exact path='/vote' element={< Vote state={state} />}></Route>
                <Route exact path='/admin' element={< Admin state={state} />}></Route>
                {/* <Route exact path='/check' element={< Check state={state} />}></Route>
                <Route exact path='/admin' element={< Admin state={state} />}></Route> */}
          </Routes>
      </Router>
    </>
  );
}

export default App;
