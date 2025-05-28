import React from "react";

function TransactionList(props) {

    if(props.array.length > 0) {
 
  return (
    <div className="list">
        <div className="title-info">
            <p>Transactions</p>
            <i className="fa-solid fa-note-sticky" />
        </div>

            {props.array.map((item) => {
                if (item.supplier) {
            return (
            <div>
            <div className="operation-info-forBuy">
                <p>Buy operation</p>
                <i class="fa-solid fa-money-check-dollar" />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>date</th>
                        <th id="count">count</th>
                        <th>product</th>
                        <th>total price</th>
                        <th>supplier</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{item.date}</td>
                        <td id="count"><span className="supplier">{item.count}</span></td>
                        <td>{item.product}</td>
                        <td><span className="supplier">${item.count * item.price}</span></td>
                        <td><span>{item.supplier}</span></td>
                    </tr>
                </tbody>
             </table>
             </div>
            )} else {
            return (
                <div>
            <div className="operation-info-forSell">
                <p>Sell operation</p>
                <i class="fa-solid fa-money-bill-wave" />
            </div>
                <table>
                    <thead>
                        <tr>
                            <th>date</th>
                            <th id="count">count</th>
                            <th>product</th>
                            <th>total price</th>
                            <th>client</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{item.date}</td>
                            <td id="count"><span className="client">{item.count}</span></td>
                            <td>{item.product}</td>
                            <td><span className="client">${item.count * item.price}</span></td>
                            <td><span>{item.client}</span></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            )            
            }
                }
            )}
    </div>
    
  );

    } else {
        return (
            <div className="list">
                <div className="title-info">
                    <p>Transactions</p>
                    <i className="fa-solid fa-note-sticky" />
                </div>  
                <div className="no-operation">
                    <p>Add Transaction Now</p>
                </div>
            </div>  
            )
    };

}

export default TransactionList;
