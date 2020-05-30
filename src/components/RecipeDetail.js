import React, {useEffect, useState} from "react";
import axios from 'axios';

/*
    var a='' => 문자열
    var a=1 => 정수
    var a=[] => 배열 ===> map사용
    var a={} => Object
*/
export default function RecipeDetail(props)
{
    //[VARIABLE]
    const {match}=props;
    const [detail, setDetail] = useState({});

    //[DATA]
    useEffect(()=>{
        axios.get('http://localhost:3355/recipe_detail',{
            params:{
                no:match.params.no
            }
        }).then((res)=>{
            setDetail(res.data);
        });
    }, []);



    //[RENDER]
    const food = String(detail.foodmake).split('\^'); //정규식에 사용하는 문자는 반드시 역슬래시를 덧붙여야함
    const data = food.map((m)=>
        <li>{m}</li>
    );

    return (
        <div className={"row"} style={{"margin":"0px auto", "width":"900px"}}>
            <h1>레시피 상세보기 : {match.params.no}</h1>
            <table className={"table"}>
                <tr>
                    <td colSpan={"3"}><img src={detail.poster} width={"100%"} height={"350px"} /></td>
                </tr>
                <tr>
                    <td colSpan={"3"}><h3>{detail.title}</h3></td>
                </tr>
                <tr>
                    <td colSpan={"3"}>{detail.content}</td>
                </tr>
                <tr>
                    <td className={"text-center"}><img src={"/inwon.png"}/></td>
                    <td className={"text-center"}><img src={"/time.png"}/></td>
                    <td className={"text-center"}><img src={"/who.png"}/></td>
                </tr>
                <tr>
                    <td className={"text-center"}>{detail.info1}</td>
                    <td className={"text-center"}>{detail.info2}</td>
                    <td className={"text-center"}>{detail.info3}</td>
                </tr>
                <tr>
                    <td colSpan={"3"}><h3>요리방법</h3></td>
                </tr>
                <tr>
                    <td colSpan={"3"}>
                        <ul>
                            {data}
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td colSpan={"3"}>
                        <table>
                            <tr>
                                <td rowSpan={"2"} width={"30%"}>
                                    <img src={detail.chef_poster} className={"img-circle"} width={"100"} height={"100"}/>
                                </td>
                                <td>{detail.chef}</td>
                            </tr>
                            <tr>
                                <td>{detail.chef_profile}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    )
}

