import React from "react";

function AboutUs() {
  
  return (
    <div className="about-us">
      <img className="img" src="logo-big-size.jpg" alt="profile" />
      <p>
      <span style={{color: "rgba(140, 0, 255, 0.6)", fontSize: "1.1em"}}>StockTn</span> is elaborated for inventory management, it includes a dashboard, 
      a revenue and profit analysis section and a transaction history.
      <br />This application was developed by Mr. <span style={{color: "rgba(140, 0, 255, 0.6)", fontSize: "1.1em"}}>Fakhreddine Smati</span>, a Full JS Developer.
      <br /><span style={{color: "#f00", fontWeight: "800"}}>Note :</span> Data entered while using the application is stored in <span style={{color: "#f00", textDecoration: "underline"}}>the browser's local storage area</span>.
      </p>
    </div>
  );
}

export default AboutUs;
