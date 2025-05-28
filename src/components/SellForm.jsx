import React, { useState } from "react";
import Alert from '@mui/material/Alert';

function SellForm(props) {

  const newProductObject = {
    date: "",
    product: "",
    count: "",
    price: "",
    client: ""
  };

  const [buttonText, setButtonText] = useState("Confirm");
  const [productObject, setProductObject] = useState(newProductObject);
  const [changeButtonStyle, setChangeButtonStyle] = useState({});
  const [alert, setAlert] = useState();
  
  function handleOver () {
    if(productObject.product != "" && productObject.count != "" && productObject.price!= "" && productObject.client!= "") {
      if(!alert) {
        setButtonText("Confirm");
        setChangeButtonStyle({scale: "1.1"});
      } else {
        setChangeButtonStyle({cursor: "auto"});
      }
    } else {
      setButtonText("X");
      setChangeButtonStyle({background: "#f00", scale: "1.1"});
    }
  };

  function handleOut () {
    setButtonText("Confirm");
    setChangeButtonStyle({});
  };

  function handleChange (event) {
    const date = new Date();
    const fullDate = date.toISOString().split('T')[0];
    const {name, value} = event.target;
    setProductObject((prevValue) => {
      return {
        ...prevValue,
        date: fullDate,
        [name]: value
      }
    });
  };

  function styling () {
    setChangeButtonStyle({});
    setButtonText("Confirm");
  };

  function handleSubmit (event) {
    event.preventDefault();
    if (productObject.product != "" && productObject.count != "" && productObject.price!= "" && productObject.client!= "") {

    const {product, count} = productObject;
    const result = props.removeProductItem({
      title: product,
      count: count
    });
      if (result == "Success") {
        setChangeButtonStyle({background: "#0f0", scale: "1.1"});
        setButtonText("Successful ✔");
        setTimeout(styling,500);
        props.add(productObject);
        setProductObject(newProductObject);
      } else {
        // window.alert(result);
        setAlert(result);
        props.disabledButton("disabled-link");
      }
    }
  };

  function closeAlert () {
    setAlert(); 
    props.disabledButton();
  };

    return (
      <div className="sell-buy">
        <form onSubmit={handleSubmit} name="client" style={alert ? {opacity: "0.5"} : {}}>
          <h2>Set new Sell <i class="fa-solid fa-square-plus"/> </h2>
          <div class="form-group">
            <label>Product Title</label>
            <select disabled={alert ? true : false} onChange={handleChange} name="product" value={productObject.product} style={!productObject.product ? {color: "gray"} : {}} >
              <option value="" selected disabled hidden > Select Product </option>
              {props.productsArray.map((item) => {
                return (
                  <option value={item.title}>
                    {item.title}
                  </option>
                )
              })}
            </select>
          </div>
          <div class="form-group">
            <label for="count">Count</label>
            <input disabled={alert ? true : false} onChange={handleChange} name="count" value={productObject.count} type="number" id="count" placeholder="ex : 2" required />
          </div>
          <div class="form-group">
            <label for="price">{`Individual Price (DT)`}</label>
            <input disabled={alert ? true : false} onChange={handleChange} name="price" value={productObject.price} type="number" id="price" placeholder="ex : 250" required />
          </div>
          <div class="form-group">
            <label>Client</label>
            <select disabled={alert ? true : false} onChange={handleChange} name="client" value={productObject.client} style={!productObject.client ? {color: "gray"} : {}} >
              <option value="" selected disabled hidden > Select Client </option>
              {props.clientsArray.map((item) => {
                return (
                  <option value={item}>
                    {item}
                  </option>
                )
              })}
            </select>
          </div>
          <button disabled={alert ? true : false} onMouseOver={handleOver} onMouseOut={handleOut} style={changeButtonStyle} >{buttonText}</button>
          
        </form>
        <Alert 
        className="alert" 
        variant="filled" 
        severity="error" 
        onClose={closeAlert}
        style={!alert ? {display: "none"} : {}}>{alert}</Alert>
      </div>
    );
  };

export default SellForm;
