import React, {useState, useEffect} from "react";
import axios from "axios";

export default function Recipe() {
    const [recipe, setRecipe] = useState([]);
    const[page, setPage] = useState(1);
    
    useEffect(()=>{
        // 서버를 연결해서 데이터를 읽어온 후 => setRecipe 에 저장
        axios.get("http://localhost:3355/recipe", {
            params:{
                page: page
            }
        }).then((result)=>{
            setRecipe(result.data);
        })
    },[])

    const html = recipe.map((m)=>
        <div className={"col-md-4"}>
            <div className={"thumbnail"}>
                <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                <div className="caption">
                    <p style={{"fontSize":"9pt"}}>{m.title}</p>
                    <sub style={{"color":"grey"}}>{m.chef}</sub>
                </div>
            </div>
        </div>
    )
    return (
        <div className={"row"}>
            {html}
        </div>
    )
}