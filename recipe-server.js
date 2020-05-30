// 라이브러리 로드
const express=require("express")

// 서버생성
const app = express();

// 서버구동
/*
* bind() => IP, PORT 를 연결 => 개통
* listen() => 대기상태
* accept() => 클라이언트가 접속시에 처리
* */
app.listen(3355, ()=>{
    console.log("Server Start ...", "http://localhost:3355")
})

// cross domain
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// 클라이언트 통신
// 사용자  URI => /recipe?page=1
// 몽고디비 연결
// MongoDB Connection

/* java 형식
* MongoClient mc= new MongoClient("localhost", 27107)
* DB db = mc.getDB("mydb")
* DBCollection dbc = db.get()
*/
const Client = require("mongodb").MongoClient;

/*====================================================================
*   RECIPE
 ====================================================================*/
app.get('/recipe', (request, response)=>{
    // request => 사용자가 보낸 요청 : page, id, pwd
    // 요청 처리
    // response =>  결과전송
    var page= request.query.page; //request.getParameter("page")
    var rowSize =12;
    var skip = (page*rowSize) - rowSize;
    // 1page => skip=0
    // 2page => skip 12(버림) ==> 13

    var url = "mongodb://211.238.142.181:27017";
    Client.connect(url, (err, client)=>{
        var db = client.db('mydb');
        // SELECT * FROM recipe => find{()}
        // SELECT * FROM recipe WHERE no=1 => find{(no:1)}
        // SELECT * FROM recipe WHERE title => find{()}
        // SELECT * FROM recipe WHERE => find{()}

        // skip => offset 과 비슷함.
        // toArray(err, docs) 콜백 함수: 가져온 데이터를 배열로 묶어줌. (docs에 있음)
        db.collection('recipe').find({}).skip(skip).limit(rowSize)
            .toArray((err, docs)=>{
                response.json(docs);
                console.log(docs);
                client.close();
            });
    })
})

app.get('/recipe-total', (req, res)=> {
    var url="mongodb://211.238.142.181:27017";
    Client.connect(url,(err,client)=>{
        var db = client.db('mydb');

        //총페이지수 구하기
        db.collection('recipe').find({}).count((err, cnt)=>{
            res.json({total:Math.ceil(cnt/12.0)});
            client.close();
            return 0;
        });
    })
})

/*
    http://localhost:3355/recipe_detail?no=1&page=1
    =====================/=============?====&======
    서버주소                URI           request 클래스에 담겨서 전달. &으로 여러개 전달가능.
    
    var no = req.query.no;
    var page = req.query.page;
*/
app.get('/recipe_detail', (req, res)=>{
    //요청 => 처리 => 결과값 전송
    var no=req.query.no;

    //몽고디비 연결
    var url='mongodb://211.238.142.181:27017';
    Client.connect(url, (err, client)=>{
        var db = client.db('mydb');

        //SELECT * FROM RECIPE_DETAIL WHERE NO = :no;
        //req의 no는 문자열이기 때문에, 숫자로 형변환 필수!!
        //Number(no) or parseInt(no)
        db.collection('recipe_detail').find({no:Number(no)})
            .toArray((err,docs)=>{
                //전송
                res.json(docs[0]); //목록이 아니니까 값1개만 전송
                client.close();
            });
    });
})


/*====================================================================
*   CHEF
 ====================================================================*/
app.get('/chef', (req, res)=>{
    var page= req.query.page;
    var rowSize = 50;
    var skip = (page*rowSize) - rowSize;
    var url = "mongodb://211.238.142.181:27017";

    Client.connect(url, (err, client)=>{
        var db = client.db('mydb');
        db.collection('chef').find({}).skip(skip).limit(rowSize)
            .toArray((err, docs)=>{
                res.json(docs);
                console.log(docs);
                client.close();
            });
    })
})

app.get('/chef_total', (req, res)=> {
    var url="mongodb://211.238.142.181:27017";

    Client.connect(url,(err,client)=>{
        var db = client.db('mydb');

        db.collection('chef').find({}).count((err, cnt)=>{
            res.json({total:Math.ceil(cnt/50.0)});
            client.close();
            return 0;
        });
    })
})

/*====================================================================
*   CHEF
 ====================================================================*/
/*
    @RequestMapping()
    public String recipe_news(req, res){}
*/
const xml2js  = require('xml2js'); //xml을 json으로 변경
const request = require('request'); //외부서버에서 데이터 읽어올 때 사용

app.get('/recipe_news', (req, res)=>{
    //http://newssearch.naver.com/search.naver?where=rss&query=%EB%A0%88%EC%8B%9C%ED%94%BC
    //rss => xml
    //var query = encodeURIComponent(req.query.fd);
    var query = encodeURIComponent("야구");
    console.log("query..."+query);

    var url = "http://newssearch.naver.com/search.naver?where=rss&query="+query;

    console.log("url..."+url);

    //xml을 json으로 변경하는 parser
    var parser = new xml2js.Parser({
        explicitArray:false
    });

    //http://localhost:3355/recipe_news?fd=야구
    //http://localhost:3355/recipe_news?fd=%EC%95%BC%EA%B5%AC
    request({url:url},(err,request, xml)=>{
        parser.parseString(xml, function (err, pJson) {
            console.log(pJson.rss.channel.item);
        })
    })
})
