import React from "react";

function Home(props) {

    let revenue = 0;
    props.array.forEach((item) => {
    if(item.client) {
      revenue += item.price * item.count;
    };
    });
    
    
    let icon;
    let agent;
    let nameOperation = "No Operation Found";
    let divClassName = "no-operation";
    let hidden = true;
    let lastItem = {};
    if (props.array.length > 0) {
        lastItem = props.array[0];
        hidden = false;
        if (lastItem.supplier) {
            icon = "fa-solid fa-money-check-dollar";
            agent = "supplier";
            nameOperation = "Buy operation";
            divClassName = "operation-info-forBuy";
        } else if (lastItem.client) {
            icon = "fa-solid fa-money-bill-wave";
            agent = "client";
            nameOperation = "Sell operation";
            divClassName = "operation-info-forSell";
        }
    }
    
  return (

    <div className="content">
        <div className="title-info">
              <p>Dashboard</p>
              <i className="fas fa-chart-bar"  />
        </div>
        <div className="data-info">
            <div className="box">
                  <i className="fas fa-user-group" />
                <div className="data">
                    <p>Clients</p>
                    <span>{props.clientsArray.length}</span>
                </div>
            </div>
            <div className="box">
                <i className="fa-solid fa-truck" />
                <div className="data">
                    <p>Suppliers</p>
                    <span>{props.suppliersArray.length}</span>
                </div>
            </div>
            <div className="box">
                <i className="fas fa-table" />
                <div className="data">
                    <p>Products</p>
                    <span>{props.productsArray.length}</span>
                </div>
            </div>
        </div>
        <div className="data-info">
            <div className="box" style={{background: "#080"}}>
                  <i className="fas fa-dollar" />
                  <div className="data">
                    <p>Revenue</p>
                    <span>{revenue} DT</span>
                  </div>
            </div>
        </div>
        <div className="transactions">
            <div className="title-info">
                <p>Last Transaction</p>
                <i className="fa-solid fa-note-sticky" />
            </div>
            <div >
                <div className={divClassName}>
                    <p>{nameOperation}</p>
                    <i className={icon} />
                </div>
                <table style={hidden ? {display: "none"} : {}}>
                    <thead>
                        <tr>
                            <th>date</th>
                            <th id="count">count</th>
                            <th>product</th>
                            <th>total price</th>
                            <th>{agent}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{lastItem.date}</td>
                            <td id="count"><span className={agent}>{lastItem.count}</span></td>
                            <td>{lastItem.product}</td>
                            <td><span className={agent}>${lastItem.count * lastItem.price}</span></td>
                            <td><span>{lastItem[agent]}</span></td>
                        </tr>
                    </tbody>
                </table> 
            </div>        

        </div>

    </div>                      
      
  )


}

export default Home;
