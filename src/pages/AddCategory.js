import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../stylecss/addCategory.css"
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const AddCategory = () => {
    const { categoriesState } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        id: String(new Date().getTime()),
        name:"",
    });

    const handleSubmit = (event)=>{
    event.preventDefault();
/*validation*/
    if(form.name === ""){
        alert("Kategory boş bırakılamaz")
    }

    const hasCategory = categoriesState.categories.find(
        (item)=> item.name.toLocalLowerCase() === form.name.toLocaleLowerCase()
            );
            if (hasCategory !== undefined){
                alert("böyle bir kategori zaten var");
                return;
            }
            /*validation bitti*/
            
            api.post(urls.categories, form)
            .then((res)=>{
                dispatch({type:actionTypes.categoryAction.ADD_CATEGORIES, payload: form})
                navigate("/")
                 })
                 .catch((err)=>{});
                }


    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <div className="addcategory">

                    <input
                        type="Text"
                        className="form-control"
                        id="name"
                        placeholder={"Bir Kategori ismi giriniz"}
                        value={form.name}
                        onChange={(event)=>
                        setForm({...AddCategory, name: event.target.value})
                        } />
                </div>
                <div className="button">
                    <button className="button1" type="submit"
                    >
                        Kaydet
                    </button>

                </div>
            </form>
        </div>
    )
}

export default AddCategory