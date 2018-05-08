#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');

function resolve(...args) {
    return path.resolve(process.cwd(), ...args);
}

module.exports = function(filename) {
    const basename = path.basename(filename),
        rawContent = fs
        .readFileSync(resolve(filename))
        .toString('utf-8'),
        data = [];
    let at = 0,
        arr = [],
        str = '';

    while (at < rawContent.length) {
        let ch = rawContent[at];
        switch (ch) {
            case ',':
                arr.push(str);
                str = '';
                break;
            case '\n':
                arr.push(str);
                data.push(arr);
                str = '';
                arr = [];
                break;
            default:
                str += ch;
        }
        at++;
    }

    const buffer = xlsx.build([{ name: 'Awesome sheet1', data }]);

    fs.writeFileSync(resolve(`${basename}.xlsx`), buffer);
};