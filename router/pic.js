const express = require("express");
const router = express();
const http = require('http')

router.get("/", (req, res) => {
    const cookie = req.get("Cookie") ? req.get("Cookie") : "";
    const data = {
        hostname:req.query.hostname,
        src: req.query.src,
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'image/jpg; charset=UTF-8');
    let ne_req = ''
    // http://p1.music.126.net/K_q4k-f7b0dXkytaDN0MTQ==/528865150111579.jpg
    console.log(data.hostname)
    console.log(data.src)
    const http_client = http.request(
        {
            hostname: data.hostname,
            method: 'GET',
            path: '/'+data.src,
        },
        sres => {

            sres.setEncoding('binary')
            sres.on('data', chunk => {
                ne_req += chunk
            })
            sres.on('end', () => {
                res.end(new Buffer(ne_req, 'binary'));
            })
        }
    )
    http_client.end()
});

module.exports = router;