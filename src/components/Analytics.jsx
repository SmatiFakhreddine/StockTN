import React from "react";
import Charts from "./Charts";
import PieCharts from "./PieCharts";
import LineCharts from "./LineCharts";

function Analytics(props) {

    function compare(a, b) {
      return b.value - a.value;
    };

    // Best Client
    let bestClient = {client: "-", value: "0"};
    if (props.purchasedArray.length > 0) {
      bestClient = props.purchasedArray[0];
      // console.log(bestClient);
    };
 
    // Best supplier
    let bestSupplier = {supplier: "-", value: "0"};
    if (props.sellingArray.length > 0) {
      bestSupplier = props.sellingArray[0];
    };

    // Best product
    let benefitsProductArray = [];
    let bestProduct = {product: "-", value: "0"};
    props.quantityArray.forEach((product) => {
      let itemProductArray = [];
      let productValue1 = 0;
      let productValue2 = 0;
      itemProductArray = props.array.filter ((object) => {
        return object.product == product.title;
      });
      itemProductArray.forEach((item) => {
        if (item.client) {
          productValue1 += item.price * item.count;
        } else if (item.supplier) {
          productValue2 += item.price * item.count;
        }
      });
      benefitsProductArray.push({
        product: product.title,
        revenuesValue: productValue1,
        expensesValue: productValue2,
        value: (productValue1 - productValue2)
      });
    });
    benefitsProductArray.sort(compare);
    if (benefitsProductArray.length > 0) {
      bestProduct = benefitsProductArray[0];
    };
    

    // Most quantity
    let mostQuantityProduct = {title: "-", count: "0"};
    if (props.quantityArray.length > 0) {
      mostQuantityProduct = props.quantityArray[0];
    };

    // Most transaction
    /// add daysList
    let daysList = [];
    function addTransactionDay(date) {
      let checkItem = daysList.includes(date);
      if (!checkItem) {
        daysList = [date, ...daysList];
      }
    };
    props.array.forEach((item) => {
        addTransactionDay(item.date);
    });
    /// add most transaction day
    let transactionCurve = [];
    let transactionArray = [];
    let MostTransaction = {date: "-", value: "0"};
    daysList.forEach((date) => {
      let dayItemsArray = [];
      let transactionValue1 = 0;
      let transactionValue2 = 0;
      dayItemsArray = props.array.filter ((object) => {
        return object.date == date;
      });
      dayItemsArray.forEach((item) => {
        if(item.client) {
          transactionValue1 += item.price * item.count;
        } else if (item.supplier) {
          transactionValue2 += item.price * item.count;
        }
      });
      transactionCurve.push({
        date: date,
        revenuesValue: transactionValue1,
        expensesValue: transactionValue2,
      });
      transactionArray.push({
        date: date,
        value: transactionValue1
      });
    });
    transactionArray.sort(compare);
    if (transactionArray.length > 0) {
      MostTransaction = transactionArray[0];
    };
    
  return (
      <div className="list">
        <div className="title-info">
            <p>Analytics</p>
            <i className="fas fa-chart-pie" />
        </div>

        <div className="charts">
          <div className="chart">

            <table className="information">
            <thead>
                <tr> 
                    <th>Most Purchased Client</th>
                    <th>Purchase Amount</th>
                </tr>
            </thead>
            <tbody>

                  <tr>
                      <td><span className="field">{bestClient.client}</span></td>
                      <td><span className="max">{bestClient.value} DT</span></td>
                  </tr>

            </tbody>
            </table>

            <Charts
            array = {props.purchasedArray}
            agent= "client"
            />

          </div>
          <div className="chart">

                <table className="information">
              <thead>
                 <tr> 
                     <th>Most Selling Supplier</th>
                     <th>Sales Amount</th>
                 </tr>
              </thead>
              <tbody>
               
                   <tr>
                       <td><span className="field">{bestSupplier.supplier}</span></td>
                        <td><span className="max">{bestSupplier.value} DT</span></td>
                   </tr>
            
             </tbody>
             </table>

            <Charts 
            array = {props.sellingArray}
            agent= "supplier"
            />

          </div>
          <div className="chart">

                <table className="information">
                <thead>
                    <tr> 
                        <th>Best Selling Product</th>
                        <th>Product Profits</th>
                    </tr>
                </thead>
                <tbody>

                      <tr>
                          <td><span className="field">{bestProduct.product}</span></td>
                          <td><span className="max">{bestProduct.value} DT</span></td>
                     </tr>

               </tbody>
               </table>

            <Charts 
            benefitsArray = {benefitsProductArray}
            agent= "product"
            />

          </div>
        </div>

        <div className="charts">

          <div className="pieCharts">

            <table className="pieInformation">
              <thead>
                  <tr> 
                    <th>Most Quantity Product</th>
                    <th>Quantities</th>
                  </tr>
              </thead>
              <tbody>

                  <tr>
                    <td><span className="field">{mostQuantityProduct.title}</span></td>
                    <td><span className="max">{mostQuantityProduct.count} pieces</span></td>
                  </tr>
            
              </tbody>
            </table>
            
            <PieCharts
            quantityArray = {props.quantityArray}
            />

          </div>
          <div className="pieCharts">

            <table className="pieInformation">
              <thead>
                  <tr> 
                    <th>Most Sell Day</th>
                    <th>Sell Value</th>
                  </tr>
              </thead>
              <tbody>

                  <tr>
                    <td><span className="field">{MostTransaction.date}</span></td>
                    <td><span className="max">{MostTransaction.value} DT</span></td>
                  </tr>
            
              </tbody>
            </table>
            
            <LineCharts
            array = {transactionCurve}
            />

          </div>

        </div>

    </div>
    
  );
}

export default Analytics;
