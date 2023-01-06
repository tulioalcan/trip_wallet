import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import './wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet">
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default connect()(Wallet);
