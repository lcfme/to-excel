#! /usr/bin/env node
const excelify = require('./index');
const argv = require('yargs').option('filename', {
    alias: 'f',
}).argv


const filename = argv.filename;
if (!filename) throw new Error('缺少-f参数: excelify -f <路径>');

excelify(filename);