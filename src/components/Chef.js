import React, {useEffect, useState} from "react";
import axios from 'axios';
import {NavLink} from "react-router-dom";

export default function Chef() {
    //[VARIABLE]
    const [chef, setChef]=useState([]); //배열
    const [page, setPage]=useState(1); //숫자
    const [total, setTotal]=useState(0); //숫자

    //[DATA]
    //셰프정보목록
    useEffect(async ()=>{
        await axios.get('http://localhost:3355/chef', {
            params:{
                page: page
            }
        }).then((res)=> {
            setChef(res.data);
        });
    },[]);
    //총페이지수
    useEffect(async ()=>{
        await axios.get('http://localhost:3355/chef_total')
            .then((res)=> {
                setTotal(res.data.total);
        });
    },[]);

    //[EVENT]


    //[RENDER]
    const html = chef.map((m)=>
        <table className={"table"}>
            <tr>
                <td><img className={"img-circle"} src={m.poster} width={"100px"} height={"100px"} rowSpan={"3"}/></td>
                <td className={"text-center"} colSpan={"4"}>{m.chef}</td>
            </tr>
            <tr>
                <td className={"text-center"}><img src={"/1.png"}/></td>
                <td className={"text-center"}><img src={"/3.png"}/></td>
                <td className={"text-center"}><img src={"/7.png"}/></td>
                <td className={"text-center"}><img src={"/2.png"}/></td>
            </tr>
            <tr>
                <td className={"text-center"}>{m.mem_cont1}</td>
                <td className={"text-center"}>{m.mem_cont3}</td>
                <td className={"text-center"}>{m.mem_cont7}</td>
                <td className={"text-center"}>{m.mem_cont2}</td>
            </tr>
        </table>
    )

    return (
        <React.Fragment>
            <div className={"row"} style={{"margin":"0px auto", "width":"700px"}}>
                <table className={"table"}>
                    <tbody>
                        <tr>
                            <td>{html}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={"row"} >
                <button className={"btn btn-lg btn-primary"} onClick={""}>이전</button>
                {page} page/ {total} pages
                <button className={"btn btn-lg btn-danger"} onClick={""}>다음</button>
            </div>
        </React.Fragment>
    )
}

