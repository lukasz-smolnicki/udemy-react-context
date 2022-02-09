import './App.css';

import Header from './components/Header/Header'

import StoreProvider from './store/StoreProvider';

import './App.scss'

function App() {
  return (
    <StoreProvider>
      <Header />
    </StoreProvider>
  );
}

export default App;
