import React, { useState } from "react";

function ArraysList(props) {

  const[input, setInput] = useState("");
  const[feedBack, setFeedBack] = useState("Add Now");
  const[style, setStyle] = useState({});
  const[display, setDisplay] = useState(false);
  let pluralIcon;
  let text;

  function handleChange(event){
    setInput(event.target.value);
  };

  function handleSubmit(event){
    event.preventDefault();
    if(input != "") {
      let result = props.addArraysItem(input.toLowerCase());
      setFeedBack(result);
      if(result == "Success"){
        setStyle({background: "#0f0", scale: "1.1"});
        setTimeout(() => {
        setFeedBack("Add Now");
        setStyle({});
        setInput("");
      },500);
      } else {
        setStyle({background: "#f00", scale: "1.1"});
        setTimeout(() => {
          setFeedBack("Add Now");
          setStyle({});
        },1500);
      }
    }
  };

  function openForm () {
    setDisplay(true);
    props.disabledButton("disabled-link");
  };

  function closeForm () {
    setDisplay(false);
    setInput("");
    props.disabledButton();
  };

  if(props.agent != "Product") {

    if(props.agent == "Client"){
      pluralIcon = "fas fa-user-group";
      text = "Purchase";
    } else {
      pluralIcon = "fa-solid fa-truck";
      text = "Sales";
    }

    return (
      <div className="list">
        <button className="setNew" onClick={openForm} >Set New {props.agent} <i className={props.icon} /></button>
        <div className="title-info">
            <p>{props.agent}s</p>
            <i className={pluralIcon} />
        </div>
        <form style={!display ? {display: "none"} : {}} className="add" onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" placeholder={"New " + props.agent} value={input} />
          <button style={style}>{feedBack}</button>
          <submit className="close" onClick={closeForm} >X</submit>
        </form>
      <table>
      <thead>
          <tr> 
              <th id="count">{props.agent} Name</th>
              <th>{text} Amount</th>
          </tr>
      </thead>
      <tbody>
        {props.array.map((item) => {
        return (
            <tr>
                <td id="count"><span className="field">{item[props.agent.toLowerCase()]}</span></td>
                <td><span className="field">{item.value} DT</span></td>
            </tr>
                )}
        )}
      </tbody>
      </table>
    </div>
    
  );

  } else {

    return (

    <div className="list">
        <button className="setNew" onClick={openForm} >Set New Product <i className="fa-solid fa-cube" /></button>
        <div className="title-info">
            <p>Products</p>
            <i className="fa-solid fa-table" />
        </div>
        <form style={!display ? {display: "none"} : {}} className="add" onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" placeholder="New Client" value={input} />
          <button style={style}>{feedBack}</button>
          <submit className="close" onClick={closeForm} >X</submit>
        </form>
      
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th id="count">Quantities</th>
                </tr>
            </thead>
            <tbody>
                {props.array.map((item) => {
                return (
                    <tr>
                        <td><span className="field">{item.title}</span></td>
                        <td id="count"><span className="field">{item.count}</span></td>
                    </tr>
                        )}
                )}
            </tbody>
        </table>
    </div>
    
  );

  }

  
}

export default ArraysList;
