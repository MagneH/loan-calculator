import React from 'react';
import GlobalStyle from './styles/global';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LoanCalculator } from './components/LoanCalculator';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Navbar />
    <LoanCalculator />
    <Footer />
  </>
);

export default App;
