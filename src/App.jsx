import './App.css';
import { HashRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header'
import AsideMenu from './components/AsideMenu/AsideMenu';
import Content from './Content/Content'
import StoreProvider from './store/StoreProvider';

import './App.scss'

function App() {
  return (
    <StoreProvider>
      <Header />
      <Router>
        <div className="content-wrapper">
          <AsideMenu />
          <Content />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
