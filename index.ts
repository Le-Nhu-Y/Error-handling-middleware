import express from "express";
import bodyParser from "body-parser";
import fs from 'fs';


const PORT =3000;
const app = express();
app.use(bodyParser.json());


//Một request với method GET tại URL là '/one'
// sẽ trả về file one.txt nếu không có lỗi sảy ra.
// Nếu có lỗi thì sẽ được middleware phía trên xử lý nhờ vào dòng next(err).
app.get('/one',(req, res, next)=>{
    fs.promises.readFile('./one.txt')
        .then(data => res.send(data))
        .catch(err => next(err))
})


//tạo 1 application-level middleware để xử lý lỗi.
app.use((error, req, res, next) => {
    console.error('Error 1111: ', error.type)
    if (error.type == 'time-out') // arbitrary condition check
        res.status(408).send(error)
    else
        res.status(500).send(error)

})


//lắng nghe request ở port 3000
app.listen(PORT,()=>{
    console.log("Server is running on http://localhost:3000/one")
})
// npm run start:dev