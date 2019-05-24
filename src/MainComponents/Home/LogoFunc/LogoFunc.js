import React from "react";

const LogoFunc = props => (
  <div class="container" style={{ marginTop: "15vh", height: "100vh" }}>
    <div class="row">
      <div class="col-sm-4" style={{ textAlign: "center" }}>
        <img
          src={require("../../../Resources/Images/logo1.png")}
          alt="logoImage"
          style={{ width: "100%", height: "75%", borderRadius: "50%" }}
        />
        <h3 style={{ color: "#275dad" }}>Anganwadi Application Software</h3>
      </div>
      <div
        class="col-sm-6"
        style={{
          marginTop: "15vh",
          marginLeft: "10vh",
          border: "5px solid #d8b753",
          borderRadius: "5%",
          padding: "20px"
        }}
      >
        <h3 style={{ borderBottom: "2px solid red", paddingBottom: "5px" }}>
          we are Known for...
        </h3>

        <p>
          <b>&#9673;</b> Locating location of the centre through GPS.
        </p>
        <p>
          <b>&#9673;</b> Building and facilities available in each centre.
        </p>
        <p>
          <b>&#9673;</b>Household registration with member details.
        </p>
        <p>
          <b>&#9673;</b> Maintaining the details of nutrients to children,
          expecting women and nursing mother.
        </p>
        <p>
          <b>&#9673;</b> Maintenance of stock and inventory.
        </p>
        <p>
          <b>&#9673;</b> Region wise Statistical reports.
        </p>
      </div>
    </div>
  </div>
);

export default LogoFunc;
