import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [sortBy, setSortBy] = useState(""); // "Alphabetically" or "Price"
  const [filterBy, setFilterBy] = useState(""); // "Tech", "Finance", etc.

  useEffect(() => {
    fetch("http://localhost:3000/stocks")
      .then((res) => res.json())
      .then((data) => setStocks(data));
  }, []);

  // sort
  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === "Alphabetically") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Price") {
      return a.price - b.price;
    }
    return 0;
  });

  // filter
  const visibleStocks = filterBy
    ? sortedStocks.filter((stock) => stock.type === filterBy)
    : sortedStocks;

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={visibleStocks} />
        </div>
        <div className="col-4">
          <PortfolioContainer />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
