import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    purchased: [],
    sold: [],
    filter: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(data => this.setState({stocks: data}))
  }

  handlePurchase = (stock) => {
    this.setState({ purchased: [...this.state.purchased, stock] })
  }

  handleSell = (stock) => {
    this.setState({ 
      sold: [...this.state.sold, stock],
      purchased: [...this.state.purchased].filter(item => item !== stock )
    })
  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleSort = (sortBy) => {
    let arr = []
    switch(sortBy) {
      case "Alphabetically":
        arr = this.state.stocks.sort((a,b) => a.name > b.name ? 1 : -1)
        break
      case "Price":
          arr = this.state.stocks.sort((a,b) => a.price > b.price ? 1 : -1)
        break
    }
    this.setState({
      stocks: arr
    })
  }

  render() {
    const filteredStocks = this.state.stocks.filter(stock => stock.type.includes(this.state.filter))
    return (
      <div>
        <SearchBar 
        handleFilter={this.handleFilter}
        handleSort={this.handleSort}/>
          <div className="row">
            <div className="col-8">
              <StockContainer 
              stocks={filteredStocks} 
              handlePurchase={this.handlePurchase}/>
            </div>
            <div className="col-4">
              <PortfolioContainer 
              purchased={this.state.purchased} 
              sold={this.state.sold} 
              handleSell={this.handleSell}/>
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
