import React, { useState } from "react";

function BuyForm(props) {

  const newProductObject = {
    date: "",
    product: "",
    count: "",
    price: "",
    supplier: ""
  };

  const [buttonText, setButtonText] = useState("Confirm");
  const [productObject, setProductObject] = useState(newProductObject);
  const [changeButtonStyle, setChangeButtonStyle] = useState({});
  const [alert, setAlert] = useState();
  
  function handleOver () {
    if(productObject.product != "" && productObject.count != "" && productObject.price!= "" && productObject.supplier!= "") {
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
    if (productObject.product != "" && productObject.count != "" && productObject.price!= "" && productObject.supplier!= "") {

      setChangeButtonStyle({background: "#0f0", scale: "1.1"});
      setButtonText("Successful ✔");
      setTimeout(styling,500);
      const {product, count} = productObject;
      props.addProductItem({
        title: product,
        count: count
      });
      props.add(productObject);
      setProductObject(newProductObject);
    }
  };

    return (
      <div className="sell-buy">
        <form onSubmit={handleSubmit} name="supplier" style={alert ? {opacity: "0.5"} : {}}>
          <h2>Set new Buy <i class="fa-solid fa-cart-plus"/> </h2>
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
            <input onChange={handleChange} name="count" value={productObject.count} type="number" id="count" placeholder="ex : 2" required />
          </div>
          <div class="form-group">
            <label for="price">{`Individual Price (DT)`}</label>
            <input onChange={handleChange} name="price" value={productObject.price} type="number" id="price" placeholder="ex : 250" required />
          </div>
          <div class="form-group">
            <label>Supplier</label>
            <select onChange={handleChange} name="supplier" value={productObject.supplier} style={!productObject.supplier ? {color: "gray"} : {}} >
              <option value="" selected disabled hidden > Select Supplier </option>
              {props.suppliersArray.map((item) => {
                return (
                  <option value={item}>
                    {item}
                  </option>
                )
              })}
            </select>
          </div>
          <button onMouseOver={handleOver} onMouseOut={handleOut} style={changeButtonStyle} >{buttonText}</button>
        </form>
      </div>
    );
  };

export default BuyForm;
