#!/usr/bin/env node
/*
 * $Id: voorhees.js,v 0.1 2013/04/02 13:50:50 dankogai Exp dankogai $
 *
 *  (c) 2013 Dan Kogai
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license
 *
 */
(function (ctx) {
    var p = process,
    argv = p.argv,
    stdin = p.stdin,
    stdout = p.stdout,
    matches;
    function voorhees(data) {
        stdout.write(JSON.stringify(JSON.parse('' + data), null, 2) + '\n')
    }
    if (matches = argv[2].match(/^(https?):\/\//)) { // fetch https?
        var proto = matches[1], 
        http = require(proto),
        url = require('url'),
        req = url.parse(argv[2]),
        chunks = [];
        http.get(req, function (res) {
            res.on('data', function (data) {
                chunks.push(data)
            }).on('error', function (e) {
                console.log(e.message);
            }).on('end', function () {
                voorhees(chunks.join(''))
            });
        });
    } else if (argv[2]) {  // read local file
        var fs = require('fs');
        fs.readFile(argv[2], function (err, data) {
            if (err) throw err;
            voorhees(data);
        });
    } else { // read stdin
        stdin.resume();
        stdin.setEncoding("UTF8");
        stdin.on("data", voorhees);
    }
})(this);
