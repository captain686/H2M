import TurndownService from "turndown";
import { writeFile as _writeFile } from "fs";
import request from "request";
import { generate } from "random-ua";
import { question } from "readline-sync";

var turdownService = new TurndownService();

var url = question("Input Your URL：");
console.log("正在获取" + url);

function gethtml(writeFile) {
    request({
            url: url,
            method: "GET",
            charest: "utf-8",
            headers: {
                "User-Agent": generate(),
            },
        },
        function (err, response, body) {
            if (err) {
                console.log(err);
                return;
            }
            if (response.statusCode === 200) {
                // console.log(body)
                var re = /<title>.*?<\/title>/;
                var title = re.exec(body)[0];
                title = title.replace(/<.*?>/, "");
                title = title.replace(/<.*?>/, "");
                console.log(title);
                writeFile(body, title);
            }
        }
    );
}

function writeFile(file, title) {
    var markdown = turdownService.turndown(file);
    console.log("正在写入" + title);
    _writeFile(title + ".md", markdown, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(title + "写入完成");
    });
}

gethtml(writeFile);var TurndownService = require("turndown");
var fs = require("fs");
var request = require("request");
var random_ua = require("random-ua");
var readlineSync = require("readline-sync");

var turdownService = new TurndownService();

var url = readlineSync.question("Input Your URL：");
console.log("正在获取" + url);

function gethtml(writeFile) {
    request({
            url: url,
            method: "GET",
            charest: "utf-8",
            headers: {
                "User-Agent": random_ua.generate(),
            },
        },
        function (err, response, body) {
            if (err) {
                console.log(err);
                return;
            }
            if (response.statusCode === 200) {
                // console.log(body)
                var re = /<title>.*?<\/title>/;
                var title = re.exec(body)[0];
                title = title.replace(/<.*?>/, "");
                title = title.replace(/<.*?>/, "");
                console.log(title);
                writeFile(body, title);
            }
        }
    );
}

function writeFile(file, title) {
    var markdown = turdownService.turndown(file);
    console.log("正在写入" + title);
    fs.writeFile(title + ".md", markdown, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(title + "写入完成");
    });
}

gethtml(writeFile);
