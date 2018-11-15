import React, { Component } from 'react';
import './App.css';
import { Home } from '../../components'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className="banner">

        </div>
        <Home />
        </header>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    carStore: state.CarStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)