"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAudioUrl = void 0;
const request = require('request');
const fetch = require('node-fetch');
function wait() {
    return new Promise(resolve => resolve(20));
}
function getAudioUrl(key, secretKey, carachter, text) {
    if (carachter === undefined)
        throw new Error('Define the carachter voice.');
    if (key === undefined)
        throw new Error('Define the key you got from uberduck');
    if (carachter === undefined)
        throw new Error('Define the secret key u got from uberduck.');
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        yield request({
            url: 'https://api.uberduck.ai/speak',
            method: 'POST',
            body: `{"speech": "${text}","voice": "${carachter}"}`,
            auth: {
                'user': key,
                'pass': secretKey
            }
        }, (erro, response, body) => __awaiter(this, void 0, void 0, function* () {
            if (erro)
                throw new Error('Error when making request, verify if yours params (key, secretKey, carachter) are correct.');
            const audioResponse = 'https://api.uberduck.ai/speak-status?uuid=' + JSON.parse(body).uuid;
            let jsonResponse = false;
            function getJson(url) {
                return __awaiter(this, void 0, void 0, function* () {
                    let jsonResult = undefined;
                    yield fetch(url)
                        .then(res => res.json())
                        .then(json => {
                        jsonResult = json;
                    });
                    return jsonResult;
                });
            }
            jsonResponse = yield getJson(audioResponse);
            while (jsonResponse.path === null)
                jsonResponse = yield getJson(audioResponse);
            resolve(jsonResponse.path);
        }));
    }));
}
exports.getAudioUrl = getAudioUrl;
