#! /usr/bin/env node

/*
Scripts to create a configuration file for the new site
 */
console.log("# SiteBuilder - Configuration #");

// Requires
let shell = require('shelljs');
let prompt = require('prompt');
let jsonWriter = require('write-json-file');
let jsonReader = require('load-json-file');

/*
Get basic site config
 */
let input = jsonReader.sync("data/configuration_input.json");
let config = {};
prompt.start();
prompt.get(input, function (err, result) {
    config.site_name = result.site_name;
    config.domain = result.domain;
    config.admin_email = result.admin_email;
    config.theme = result.theme;
    config.theme_repo = result.theme_repo;
    createConfig();
});

/**
 * Creates the configuration file then runs the builder script
 */
function createConfig() {
    console.log("# Creating configuration file ... #");
    jsonWriter('build/config.json', config).then(() => {
        console.log("# Configuration file created! Running builder #");
        shell.exec('sitebuilder-build');
    });
}