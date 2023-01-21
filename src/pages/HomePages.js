import React from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Listbooks from "../components/Listbooks";

const HomePage=()=>{
    const {booksState,categoriesState}=useSelector(state=>state)
    console.log("books",booksState);
    console.log("categories",categoriesState);
    return(
        <div>
            <Header/>
            <Listbooks/>
        </div>
    )
}

export default HomePage