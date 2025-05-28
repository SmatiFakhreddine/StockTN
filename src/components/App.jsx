import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function App() {

  const [productList, setProductList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [operationArray, setOperationArray] = useState([]);

    useEffect(() => {
      if(localStorage.product != null){
        setProductList(JSON.parse(localStorage.product));
      };
      if(localStorage.client != null){
        setClientList(JSON.parse(localStorage.client));
      };
      if(localStorage.supplier != null){
        setSupplierList(JSON.parse(localStorage.supplier));
      };
      if(localStorage.operation != null){
        setOperationArray(JSON.parse(localStorage.operation));
      };
    }, []);
    
    // localStorage.clear();

    function addProductTitle(item) {
      let checkItem = productList.find((element) => element.title == item);
      if (!checkItem) {
        setProductList((prevValue) => {
          return [ ...prevValue, {title: item, count: 0}]
        });
        localStorage.setItem('product', JSON.stringify([...productList, {title: item, count: 0}]));
        return "Success";
      } else {
        return "Product exist";
      }
    };
    
    function addProductItem(item) {
      let checkItem = productList.find((element) => element.title == item.title);
      let index = productList.findIndex((element) => element.title == item.title);
      // console.log(checkItem, index);
      let totalCount = parseInt(checkItem.count) + parseInt(item.count);
      checkItem.count = totalCount;
      setProductList((prevValue) => {
        prevValue[index] = checkItem;
        return [ ...prevValue]
      }); 
      localStorage.setItem('product', JSON.stringify(productList));
    };
    
    function removeProductItem (item) {
      let checkItem = productList.find((element) => element.title == item.title);
      let index = productList.findIndex((element) => element.title == item.title);
      // console.log(checkItem, index);
      if (checkItem.count < item.count) {
        return `You only have ${checkItem.count + " pieces of " + checkItem.title} products.`;
      } else {
        let newCount = checkItem.count - item.count;
        checkItem.count = newCount;
        setProductList((prevValue) => {
          prevValue[index] = checkItem;
          return [ ...prevValue]
        });
        localStorage.setItem('product', JSON.stringify(productList));
        return "Success";
      }
    };

    function addClientItem(item) {
      let checkItem = clientList.includes(item);
      if (!checkItem) {
        setClientList((prevValue) => {
          return [ ...prevValue, item]
        });
        localStorage.setItem('client', JSON.stringify([...clientList, item]));
        return "Success";
      } else {
        return "Client exist";
      }
    };

    function addSupplierItem(item) {
      let checkItem = supplierList.includes(item);
      if(!checkItem) {
        setSupplierList((prevValue) => [...prevValue, item]);
        localStorage.setItem('supplier', JSON.stringify([...supplierList, item]));
        return "Success";
      } else {
        return "Supplier exist";
      }
    };

    function addOperation(operationItem) {
      setOperationArray((prevArray) => {
        return [operationItem, ...prevArray]
      });
      localStorage.setItem('operation', JSON.stringify([operationItem, ...operationArray]));
    };

  return (
         <div>
        <Header 
        array={operationArray} add={addOperation}
        clientsArray={clientList} clientItem={addClientItem}
        suppliersArray={supplierList} supplierItem={addSupplierItem}
        productsArray={productList} addProductTitle={addProductTitle} 
        addProductItem={addProductItem} removeProductItem={removeProductItem}
        />
        <Footer />
      </div>
      );
}

export default App;
