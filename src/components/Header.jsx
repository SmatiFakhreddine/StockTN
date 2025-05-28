import React, { useState } from "react";
import Home from"./Home";
import SellForm from "./SellForm";
import BuyForm from "./BuyForm";
import ArraysList from "./ArraysList";
import Analytics from "./Analytics";
import TransactionList from "./TransactionList";
import AboutUs  from "./AboutUs";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

function Header(props) {
  
  const [newSellStyle, setNewSellStyle] = useState({});
  const [newProductStyle, setNewProductStyle] = useState({});
  const [displayMenu, setDisplayMenu] = useState(false);
  const [isDisabled, setIsDisabled] = useState();

  function handleClick (event) {
    setDisplayMenu(false);
    const condition = event.currentTarget.name;
    if (condition == "newSell") {
      setNewSellStyle({background: "#ffffff55"});
      setNewProductStyle({});
    } else if (condition == "newProduct") {
      setNewProductStyle({background: "#ffffff55"});
      setNewSellStyle({});
    } else {
      setNewSellStyle({});
      setNewProductStyle({});
    }
  };

  function discoverClick () {
    setNewSellStyle({});
    setNewProductStyle({});
    setDisplayMenu((prevValue) => {
      return !prevValue;
    });
  };

  function menuClick () {
    setDisplayMenu(false);
  };

  function disabledButton (text) {
    setIsDisabled(text)
  };

  // purchased Array
  let purchasedArray = [];
  props.clientsArray.forEach((name) => {
    let itemArray = [];
    let value = 0;
    itemArray = props.array.filter ((object) => {
      return object.client == name;
    });
    value = itemArray.reduce((accumulator, item) => (accumulator += item.price * item.count), 0);
    purchasedArray.push({
      client: name,
      value: value
    });
  });
  purchasedArray.sort((a, b) => b.value - a.value);
  
  // selling Array
  let sellingArray = [];
  props.suppliersArray.forEach((name) => {
    let itemSellingArray = [];
    let soldValue = 0;
    itemSellingArray = props.array.filter ((object) => {
      return object.supplier == name;
    });
    soldValue = itemSellingArray.reduce((accumulator, item) => (accumulator += item.price * item.count), 0);
    sellingArray.push({
      supplier: name,
      value: soldValue
    });
  });
  sellingArray.sort((a, b) => b.value - a.value);

  // quantity Array
  let quantityArray = props.productsArray;
  quantityArray.sort((a, b) => b.count - a.count);

  return (
    <BrowserRouter >
      <header>
        <Link className={isDisabled} id="title" to="/" name="title" onClick={handleClick}>
          <h1>StockTN</h1>
        </Link>
        <div className="buttons">
                <Link id="link" className={isDisabled} to="/newSell" name="newSell" onClick={handleClick} style={newSellStyle}>
                    <i className="fa-solid fa-square-plus" />
                    <p>New Sell</p>
                </Link>
                <Link id="link" className={isDisabled} to="/newBuy" name="newProduct" onClick={handleClick} style={newProductStyle}>
                    <i className="fa-solid fa-cart-plus" />
                    <p>New Buy</p>
                </Link>
        </div>
        <submit className={isDisabled} id="discover" onClick={discoverClick} style={displayMenu ? {background: "#ffffff55"} : {}}>
          ⁝
        </submit>

        <div className="menu" onClick={menuClick} style={displayMenu ? {display:"block"} : {display:"none"}}>
        
            <Link id="link" to="/">                
                <i className="fas fa-home" />
                <p>Dashboard</p>
            </Link>
                
            <Link id="link" to="/Clients">                
                <i className="fas fa-user-group" />
                <p>Clients</p>
            </Link>

            <Link id="link" to="/Suppliers">                
                <i className="fa-solid fa-truck" />
                <p>Suppliers</p>
            </Link>    
                
            <Link id="link" to="/Products">
                <i className="fas fa-table" />
                <p>Products</p>
            </Link>        
                
            <Link id="link" to="/Analytics">
                <i className="fas fa-chart-pie" />
                <p>Analytics</p>
            </Link>

            <Link id="link" to="/Transactions">
                <i className="fa-solid fa-note-sticky" />
                <p>Transactions</p>
            </Link>

            <Link id="link" to="/AboutUs" >
                <img className="img" src="logo-big-size.jpg" alt="profile" />
                <p>About us</p>
            </Link>
        
        </div>
      </header>
          
        <Switch>
          <Route exact path="/">
            <Home 
            array={props.array}
            clientsArray={props.clientsArray}
            suppliersArray={props.suppliersArray}
            productsArray={props.productsArray}
            />
          </Route>
          <Route path="/AboutUs">
            <AboutUs />
          </Route>
          <Route path="/newSell">
            <SellForm 
            add={props.add} 
            productsArray={props.productsArray} 
            clientsArray={props.clientsArray} 
            removeProductItem={props.removeProductItem} 
            disabledButton={disabledButton} 
            />
          </Route>
          <Route path="/newBuy">
            <BuyForm 
            add={props.add} 
            productsArray={props.productsArray} 
            suppliersArray={props.suppliersArray} 
            addProductItem={props.addProductItem} 
            />
          </Route>
          <Route path="/Clients">
            <ArraysList 
            array={purchasedArray} 
            addArraysItem={props.clientItem} 
            agent="Client" 
            icon="fas fa-user"
            disabledButton={disabledButton}
            />
          </Route>
          <Route path="/Suppliers">
            <ArraysList 
            array={sellingArray} 
            addArraysItem={props.supplierItem} 
            agent="Supplier" 
            icon="fa-solid fa-truck-field"
            disabledButton={disabledButton}
            />
          </Route>
          <Route path="/Products">
            <ArraysList 
            array={quantityArray} 
            addArraysItem={props.addProductTitle} 
            agent="Product" 
            disabledButton={disabledButton}
            />
          </Route>
          <Route path="/Analytics">
            <Analytics 
            array={props.array}
            purchasedArray={purchasedArray}
            sellingArray={sellingArray}
            quantityArray={quantityArray}
            />
          </Route>
          <Route path="/Transactions">
            <TransactionList array={props.array} />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default Header;
