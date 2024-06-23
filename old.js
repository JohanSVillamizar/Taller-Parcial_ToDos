//libreria de http que viene de años atras la mas viejitas 
const http = require ('http');
//otra sintaxis 
//import http from 'http'; esta se utiliza solo para saber que la mas nueva pero debe ser configurada

//creatserver recibe la fncion req => funciona como una Fuction 
//req y res se utilizan por convencion 
const server = http.createServer((req, res) => {
    //para nosotros 
    console.log('Request received');
    console.log(req);
    //para el cliente 
    res.writeHead(200, {'Content-Type': 'text/plain'});
    //res.end('Hello World');
    res.end(greet('Carlos'));
    }
);

server.listen(3000, () => {
    console.log ('Listening on port 3000');
})

//Arrow functions
//function greet (){
 //   return 'Hello World fron Greet method';
//}
//Arrow Function v1
//const greet = () => {
   // return 'Hello World fron Greet arrow method';
//}

//Arrow function v2. si lo unico que hace mi funcion es retornar algo, puedo omitir las llaves y el return 
//const greet = (name) => 'Hello' + name + 'World from Greet arrow simplified method';

//Arrow function v3. Si mi funcion solo recibe un parametro, puedo omitir los parentesis 