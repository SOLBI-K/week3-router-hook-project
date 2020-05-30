import React, {useState, useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";



export default function Recipe() {
    //[변수]
    const [recipe, setRecipe] = useState([]);
    const[page, setPage] = useState(1);
    const[total,setTotal] = useState(0);

    //[DATA 1] http://localhost:3355/recipe?page=1
    useEffect(async ()=>{ //비동기화
        // 서버를 연결해서 데이터를 읽어온 후 => setRecipe 에 저장
        await axios.get("http://localhost:3355/recipe", {
            params:{
                page: page
            }
        }).then((result)=>{
            setRecipe(result.data);
        })
    },[]);

    //[DATA 2] 페이지수 가져오기
    useEffect(async()=>{ //비동기화
        await axios.get("http://localhost:3355/recipe-total")//보낼 데이터 없음
            .then((res)=>{
                //recipe-server.js 에서 넘겨주는 json data중 total값만 필요
                setTotal(res.data.total);
        })
    },[]);


    //버튼 처리할 이벤트함수 정의
    //[EVENT 1]
    const onPrev=()=>{
        setPage(page>1?page-1:page);

        axios.get("http://localhost:3355/recipe", {
            params:{
                page: page
            }
        }).then((result)=>{
            setRecipe(result.data);
        });
    };
    //[EVENT 2]
    const onNext=()=>{
        setPage(page<total?page+1:page);

        axios.get("http://localhost:3355/recipe", {
            params:{
                page: page
            }
        }).then((result)=>{
            setRecipe(result.data);
        });
    };



    //[RENDER] html 출력부분
    const html = recipe.map((m)=>
        <div className={"col-md-4"}>
            <div className={"thumbnail"}>
                <NavLink to={"/recipe_detail/"+m.no}>
                    <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                </NavLink>
                <div className="caption">
                    <p style={{"fontSize":"9pt"}}>{m.title.length>30?m.title.substring(0,30)+"...":m.title}</p>
                    <sub style={{"color":"grey"}}>{m.chef}</sub>
                </div>
            </div>
        </div>
    )

    return (
        <React.Fragment>
            <div className={"row"}>
                {html}
            </div>
            <div className={"row"} style={{"margin":"0px auto"}}>
                <button className={"btn btn-lg btn-primary"} onClick={onPrev}>이전</button>
                {page} page/ {total} pages
                <button className={"btn btn-lg btn-danger"} onClick={onNext}>다음</button>
            </div>
        </React.Fragment>
    )
}