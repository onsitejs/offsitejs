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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
////////////////////////////////////////////////
// FUNCTION:HELPER genTS
// generates timestamp epoch
////////////////////////////////////////////////
export function genTS() {
    return Number(Date.now());
}
//////////////////////////////////////////////////
// FUNCTION:HELPER genUID
// generates UUID4 identifier
//////////////////////////////////////////////////
export function genUID() {
    return crypto.randomUUID();
}
//////////////////////////////////////////////////
// FUNCTION:HELPER sha256
// generates sha256 hash of a string
//////////////////////////////////////////////////
export function sha256(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var buffer, arrayBuffer, hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buffer = new TextEncoder().encode(msg);
                    return [4 /*yield*/, crypto.subtle.digest('SHA-256', buffer)];
                case 1:
                    arrayBuffer = _a.sent();
                    hash = Array.prototype.map.call(new Uint8Array(arrayBuffer), function (x) { return ('00' + x.toString(16)).slice(-2); }).join('');
                    return [2 /*return*/, String(hash)];
            }
        });
    });
}
//////////////////////////////////////////////////
// FUNCTION:HELPER simpleJavascriptPayload
// returns javascript source for simple payload
//////////////////////////////////////////////////
export function simpleJavascriptPayload(postback_url, event_id) {
    return "const postback_url = \"".concat(postback_url, "\";\nlet document_fonts = document_fullscreenEnabled = document_location = document_lastModified = document_links = document_scripts = document_referrer = null;\ntry {\n    document_fonts = document.fonts;\n} catch {}\ntry {\n    document_fullscreenEnabled = document.fullscreenEnabled;\n} catch {}\ntry {\n    document_location = document.location;\n} catch {}\ntry {\n    document_lastModified = document.lastModified;\n} catch {}\ntry {\n    document_links = document.links;\n} catch {}\ntry {\n    document_scripts = document.scripts;\n} catch {}\ntry {\n    document_referrer = document.referrer;\n} catch {}\n\nlet navigator_app = navigator_deviceMemory = navigator_doNotTrack = navigator_languages = navigator_keyboard = navigator_platform = null;\ntry {\n    navigator_app = navigator.app;\n} catch {}\ntry {\n    navigator_deviceMemory = navigator.deviceMemory;\n} catch {}\ntry {\n    navigator_doNotTrack = navigator.doNotTrack;\n} catch {}\ntry {\n    navigator_languages = navigator.languages;\n} catch {}\ntry {\n    navigator_keyboard = navigator.keyboard;\n} catch {}\ntry {\n    navigator_platform = navigator.platform\n} catch {}\n\nlet window_innerWidth = window_innerHeight = window_outerWidth = window_outerHeight = null;\ntry {\n    window_innerWidth = window.innerWidth;\n} catch {}\ntry {\n    window_innerHeight = window.window_innerHeight;\n} catch {}\ntry {\n    window_outerWidth = window.outerWidth;\n} catch {}\ntry {\n    window_outerHeight = window.window_outerHeight;\n} catch {}\n\nlet screen_width = screen_height = screen_availWidth = screen_availHeight = screen_colorDepth = screen_pixelDepth = null;\ntry {\n    screen_width = window.screen.width;\n} catch {}\ntry {\n    screen_height = window.screen.height;\n} catch {}\ntry {\n    screen_availWidth = window.screen.availWidth;\n} catch {}\n\ntry {\n    screen_availHeight = window.screen.availHeight;\n} catch {}\n\ntry {\n    screen_colorDepth = window.screen.colorDepth;\n} catch {}\n\ntry {\n    screen_pixelDepth = window.screen.pixelDepth;\n} catch {}\n\nconst raw = {\n    document: { document_fonts, document_fullscreenEnabled, document_location, document_lastModified, document_links, document_scripts, document_referrer },\n    navigator: { navigator_app, navigator_languages, navigator_keyboard, navigator_platform },\n    window: { window_innerWidth, window_innerHeight, window_outerWidth, window_outerWidth },\n    screen: { screen_width, screen_height, screen_availWidth, screen_availHeight, screen_colorDepth, screen_pixelDepth }\n}\nconst tx_ts = Number(Date.now());\nconst tx_id = crypto.randomUUID();\nconst tx_type = 'postback';\nconst event_id = '").concat(event_id, "';\nconst postback_data = { tx_ts, tx_id, tx_type, event_id, raw };\nfetch(postback_url,{\n    method: 'post',\n    mode: 'no-cors',\n    headers: {\n        'Access-Control-Allow-Origin':'*'\n    },\n    body: JSON.stringify(postback_data)\n})");
}
//////////////////////////////////////////////////
// FUNCTION:HELPER getEndpoint
// given a request, extract the pathname from url
//////////////////////////////////////////////////
export function getEndpoint(request) {
    return String(new URL(request.url).pathname);
}
//////////////////////////////////////////////////
// FUNCTION:RESPONSE response204
// returns a 204 response
//////////////////////////////////////////////////
export function response204() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Headers': 'access-control-allow-origin,content-type,access-control-allow-methods',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
            'content-type': 'application/javascript'
        },
        status: 204
    });
}
//////////////////////////////////////////////////
// FUNCTION:RESPONSE jsonResponse
// given an object, returns a JSON response
//////////////////////////////////////////////////
export function jsonResponse(obj) {
    return new Response(JSON.stringify(obj, null, 4), {
        headers: {
            'Access-Control-Allow-Headers': 'access-control-allow-origin,content-type,access-control-allow-methods',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
            'content-type': 'application/javascript'
        }
    });
}
//////////////////////////////////////////////////
// FUNCTION:RESPONSE javascriptResponse
// given an string, returns a JS response
//////////////////////////////////////////////////
export function javascriptResponse(script) {
    return new Response("".concat(script), {
        headers: {
            'Access-Control-Allow-Headers': 'access-control-allow-origin,content-type,access-control-allow-methods',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS,REDIRECT',
            'content-type': 'application/javascript',
            'Referrer-Policy': 'unsafe-url'
        }
    });
}
//////////////////////////////////////////////////
// FUNCTION:RESPONSE headerResponse
// given an headers, return empty response
//////////////////////////////////////////////////
export function headerResponse(headers) {
    return new Response(null, {
        headers: headers
    });
}
//////////////////////////////////////////////////
// FUNCTION:RESPONSE gifResponse
// given a gif in b64, return gif
//////////////////////////////////////////////////
export function gifResponse(gifBinary) {
    return new Response("".concat(gifBinary), {
        headers: {
            'Access-Control-Allow-Headers': 'access-control-allow-origin,content-type,access-control-allow-methods',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
            'content-type': 'application/javascript'
        }
    });
}
//////////////////////////////////////////////////
// FUNCTION:LOG logData
// relays log data to a server, db, etc.
// 
// EDIT THIS FUNCTION TO LOG SESSIONS
//
//////////////////////////////////////////////////
export function logData(obj) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(JSON.stringify(obj, null, 4));
            return [2 /*return*/];
        });
    });
}
//////////////////////////////////////////////////
// FUNCTION:HANDLING requestToObject
// extractions from request object
//////////////////////////////////////////////////
export function requestToObject(request) {
    return __awaiter(this, void 0, void 0, function () {
        var body, e_1, e_2, headers, _a, _b, _c, _d, _e, _f, _g, data;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (!(request.method === 'POST' || request.method === 'PUT')) return [3 /*break*/, 9];
                    if (!request.body) return [3 /*break*/, 8];
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 3, , 8]);
                    return [4 /*yield*/, request.json()];
                case 2:
                    body = _h.sent();
                    return [3 /*break*/, 8];
                case 3:
                    e_1 = _h.sent();
                    _h.label = 4;
                case 4:
                    _h.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, request.text];
                case 5:
                    body = _h.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_2 = _h.sent();
                    body = null;
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 10];
                case 9:
                    body = null;
                    _h.label = 10;
                case 10:
                    headers = Object.fromEntries(request.headers);
                    _h.label = 11;
                case 11:
                    _h.trys.push([11, 18, , 19]);
                    if (!Object.keys(headers).includes('cf-connecting-ip')) return [3 /*break*/, 13];
                    _a = headers;
                    _b = 'cf-connecting-ip';
                    return [4 /*yield*/, sha256(headers['cf-connecting-ip'])];
                case 12:
                    _a[_b] = _h.sent();
                    _h.label = 13;
                case 13:
                    if (!Object.keys(headers).includes('x-real-ip')) return [3 /*break*/, 15];
                    _c = headers;
                    _d = 'x-real-ip';
                    return [4 /*yield*/, sha256(headers['x-real-ip'])];
                case 14:
                    _c[_d] = _h.sent();
                    _h.label = 15;
                case 15:
                    if (!Object.keys(headers).includes('x-forwarded-for')) return [3 /*break*/, 17];
                    _e = headers;
                    _f = 'x-forwarded-for';
                    return [4 /*yield*/, sha256(headers['x-forwarded-for'])];
                case 16:
                    _e[_f] = _h.sent();
                    _h.label = 17;
                case 17: return [3 /*break*/, 19];
                case 18:
                    _g = _h.sent();
                    return [3 /*break*/, 19];
                case 19:
                    ;
                    try {
                        delete headers['authorization'];
                        delete headers['key'];
                        delete headers['cookie'];
                        delete headers['x-auth-key'];
                        delete headers['authentication'];
                    }
                    catch (_j) { }
                    ;
                    data = {
                        request: {
                            url: request.url,
                            method: request.method,
                            headers: headers,
                            body: body,
                            redirect: request.redirect
                        },
                        cf: request.cf
                    };
                    return [2 /*return*/, data];
            }
        });
    });
}
//////////////////////////////////////////////////
// FUNCTION:HANDLING handleOffsitejsEndpoint
// handles requests to /offsite.js
//////////////////////////////////////////////////
export function handleOffsitejsEndpoint(request) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, post_request, postback_data, tx_ts, tx_id, tx_type, event_id, raw, data, script_source;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(request.method === 'OPTIONS')) return [3 /*break*/, 1];
                    headers = {
                        'Access-Control-Allow-Headers': 'access-control-allow-origin,content-type,access-control-allow-methods',
                        'Access-Control-Allow-Origin': (new URL(request.url)).hostname,
                        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
                        'content-type': 'application/javascript',
                        'Referrer-Policy': 'origin'
                    };
                    return [2 /*return*/, new Response("1", {
                            headers: headers,
                            status: 200
                        })];
                case 1:
                    if (!(request.method === 'POST')) return [3 /*break*/, 3];
                    return [4 /*yield*/, requestToObject(request)];
                case 2:
                    post_request = _a.sent();
                    postback_data = post_request.request.body;
                    logData(postback_data);
                    return [2 /*return*/, javascriptResponse("console.log(\"posted\");")];
                case 3:
                    if (!(request.method === 'GET')) return [3 /*break*/, 5];
                    tx_ts = genTS();
                    tx_id = genUID();
                    tx_type = 'request';
                    event_id = genUID();
                    return [4 /*yield*/, requestToObject(request)];
                case 4:
                    raw = _a.sent();
                    data = { tx_ts: tx_ts, tx_id: tx_id, tx_type: tx_type, event_id: event_id, raw: raw };
                    logData(data);
                    script_source = simpleJavascriptPayload(raw.request.url, event_id);
                    return [2 /*return*/, javascriptResponse(script_source)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//////////////////////////////////////////////////
// FUNCTION:HANDLING handlePixelEndpoint
// handles requests to /pixel.gif
//
// light-touch analytics with 0 javascript
//
//////////////////////////////////////////////////
export function handlePixelEndpoint(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = logData;
                    return [4 /*yield*/, requestToObject(request)];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/, gifResponse('R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==')];
            }
        });
    });
}
//////////////////////////////////////////////////
// FUNCTION:HANDLING handleRequest
// primary router for request -> handler
//////////////////////////////////////////////////
export function handleRequest(request) {
    return __awaiter(this, void 0, void 0, function () {
        var endpoint, _a, e_3, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    endpoint = getEndpoint(request);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 5]);
                    switch (endpoint) {
                        case '/offsite.js':
                            return [2 /*return*/, handleOffsitejsEndpoint(request)];
                        case '/pixel.gif':
                            return [2 /*return*/, handlePixelEndpoint(request)];
                    }
                    _a = logData;
                    return [4 /*yield*/, requestToObject(request)];
                case 2:
                    _a.apply(void 0, [_c.sent()]);
                    return [2 /*return*/, response204()];
                case 3:
                    e_3 = _c.sent();
                    _b = logData;
                    return [4 /*yield*/, requestToObject(request)];
                case 4:
                    _b.apply(void 0, [_c.sent()]);
                    return [2 /*return*/, response204()];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//////////////////////////////////////////////////
// fetch handler main
//////////////////////////////////////////////////
export default {
    fetch: function (request) {
        return handleRequest(request);
    }
};
