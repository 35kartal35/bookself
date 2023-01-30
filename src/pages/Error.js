import React from "react";
import error from "../assets/style/404.png"
const Error=()=>{
    return(
        <div style={{ widht: "100%",height: "100vh", display: "flex", justifyContent: "center", alignItem: "center"}}>
            <img src={error} />
        </div>
    )
}

export default Error;