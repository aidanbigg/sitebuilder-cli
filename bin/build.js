#! /usr/bin/env node

/*
Scripts to build the new site
 */
console.log('building site...');

let shell = require('shelljs');
let jsonReader = require('load-json-file');

jsonReader('build/config.json').then(json => {
    shell.exec('mkdir site');
    shell.exec('cd site && hugo new site ' + json.site_name);
    shell.exec('cd site/' + json.site_name + ' && ' + 'git init && git submodule add ' + json.theme_repo + ' themes/' + json.theme);
    shell.exec('cd site/' + json.site_name + ' && ' + 'echo \'theme = "' + json.theme + '"\' >> config.toml');
    console.log('# Site Built & Configured #');
});