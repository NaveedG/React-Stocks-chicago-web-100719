import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {this.props.purchased.map(stock => {
            return <Stock 
            stock={stock}
            handleSell={this.props.handleSell}/>
          })}
      </div>
    );
  }

}

export default PortfolioContainer;
