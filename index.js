const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const qr = require('qr-image');
const port = 3000;
let visibleImg = false;

const server = http.createServer((req, res) => {
  console.log(`Request received for ${req.url}`);
  
  // load/get html
  if (req.url === '/' || req.url === '/index.html') {
    //set value to false every on index
    visibleImg = false;
    
    fs.readFile(path.join("./public/home.html"), 'utf8', (err, data) => {
        if (err) {
        console.log(`error html`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
    //load styleling
  } else if (req.url === '/style.css') {
    fs.readFile(path.join("./public/style.css"), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
    //load scrip.js
  } else if (req.url === '/script.js') {
    fs.readFile(path.join("./public/script.js"), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end("let visibleImg = "+visibleImg+";  "+ data);
      }
    });
    //load image
  }else if(req.url === '/qrCode.png'){
    fs.readFile('./public/qrCode.png',( err,data )=>{
      res.end(data);
    })
  } else if ( req.url === '/submit') {
    let body = '';
    visibleImg = true;
    
    // Mengumpulkan data form dari request body
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedBody = querystring.parse(body);
        const link = parsedBody.link;
        
        console.log(`link: ${link}`);
        
        //creating qr
        qrGenerator(link); 

        //value set for image

        fs.readFile(path.join("./public/home.html"), 'utf8', (err, data) => {
          if (err) {
          console.log(`error html`);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



function qrGenerator(link) {

  var qr_svg = qr.image(link, { type: 'png' });
  qr_svg.pipe(require('fs').createWriteStream('./public/qrCode.png'));
  console.log("success");
  

}