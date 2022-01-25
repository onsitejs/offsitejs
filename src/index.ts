////////////////////////////////////////////////
// FUNCTION:HELPER genTS
// generates timestamp epoch
////////////////////////////////////////////////
export function genTS() {
    return Number(Date.now())
}

//////////////////////////////////////////////////
// FUNCTION:HELPER genUID
// generates UUID4 identifier
//////////////////////////////////////////////////
export function genUID() {
    return crypto.randomUUID()
}

//////////////////////////////////////////////////
// FUNCTION:HELPER sha256
// generates sha256 hash of a string
//////////////////////////////////////////////////
async function sha256(msg: string) {
    const buffer = new TextEncoder().encode(msg)
    const arrayBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hash = Array.prototype.map.call(new Uint8Array(arrayBuffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    return String(hash);
}

//////////////////////////////////////////////////
// FUNCTION:HELPER simpleJavascriptPayload
// returns javascript source for simple payload
//////////////////////////////////////////////////
export function simpleJavascriptPayload(postback_url: string, event_id: string) {
    return `const postback_url = "${postback_url}";
let document_fonts = document_fullscreenEnabled = document_location = document_lastModified = document_links = document_scripts = document_referrer = null;
try {
    document_fonts = document.fonts;
} catch {}
try {
    document_fullscreenEnabled = document.fullscreenEnabled;
} catch {}
try {
    document_location = document.location;
} catch {}
try {
    document_lastModified = document.lastModified;
} catch {}
try {
    document_links = document.links;
} catch {}
try {
    document_scripts = document.scripts;
} catch {}
try {
    document_referrer = document.referrer;
} catch {}

let navigator_app = navigator_deviceMemory = navigator_doNotTrack = navigator_languages = navigator_keyboard = navigator_platform = null;
try {
    navigator_app = navigator.app;
} catch {}
try {
    navigator_deviceMemory = navigator.deviceMemory;
} catch {}
try {
    navigator_doNotTrack = navigator.doNotTrack;
} catch {}
try {
    navigator_languages = navigator.languages;
} catch {}
try {
    navigator_keyboard = navigator.keyboard;
} catch {}
try {
    navigator_platform = navigator.platform
} catch {}

let window_innerWidth = window_innerHeight = window_outerWidth = window_outerHeight = null;
try {
    window_innerWidth = window.innerWidth;
} catch {}
try {
    window_innerHeight = window.window_innerHeight;
} catch {}
try {
    window_outerWidth = window.outerWidth;
} catch {}
try {
    window_outerHeight = window.window_outerHeight;
} catch {}

let screen_width = screen_height = screen_availWidth = screen_availHeight = screen_colorDepth = screen_pixelDepth = null;
try {
    screen_width = window.screen.width;
} catch {}
try {
    screen_height = window.screen.height;
} catch {}
try {
    screen_availWidth = window.screen.availWidth;
} catch {}

try {
    screen_availHeight = window.screen.availHeight;
} catch {}

try {
    screen_colorDepth = window.screen.colorDepth;
} catch {}

try {
    screen_pixelDepth = window.screen.pixelDepth;
} catch {}

const raw = {
    document: { document_fonts, document_fullscreenEnabled, document_location, document_lastModified, document_links, document_scripts, document_referrer },
    navigator: { navigator_app, navigator_languages, navigator_keyboard, navigator_platform },
    window: { window_innerWidth, window_innerHeight, window_outerWidth, window_outerWidth },
    screen: { screen_width, screen_height, screen_availWidth, screen_availHeight, screen_colorDepth, screen_pixelDepth }
}
const tx_ts = Number(Date.now());
const tx_id = crypto.randomUUID();
const tx_type = 'postback';
const event_id = '${event_id}';
const postback_data = { tx_ts, tx_id, tx_type, event_id, raw };
fetch(postback_url,{
    method: 'post',
    mode: 'no-cors',
    headers: {
        'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify(postback_data)
})`
}

//////////////////////////////////////////////////
// FUNCTION:HELPER getEndpoint
// given a request, extract the pathname from url
//////////////////////////////////////////////////
export function getEndpoint(request: Request) {
    return String(new URL(request.url).pathname)
}

//////////////////////////////////////////////////
// FUNCTION:RESPONSE response204
// returns a 204 response
//////////////////////////////////////////////////
export function response204() {
    return new Response(
        null, {
        headers: {
            'Access-Control-Allow-Headers': 'access-control-allow-origin,content-type,access-control-allow-methods',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
            'content-type':'application/javascript',
        },
        status:204
    })
}

//////////////////////////////////////////////////
// FUNCTION:RESPONSE jsonResponse
// given an object, returns a JSON response
//////////////////////////////////////////////////
export function jsonResponse(obj: object) {
    return new Response(
        JSON.stringify(obj,null,4), {
        headers: {
            'Access-Control-Allow-Headers': 'access-control-allow-origin,content-type,access-control-allow-methods',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
            'content-type':'application/javascript',
        }
    })
}

//////////////////////////////////////////////////
// FUNCTION:RESPONSE javascriptResponse
// given an string, returns a JS response
//////////////////////////////////////////////////
export function javascriptResponse(script: string) {
    return new Response(
        `${script}`, {
        headers: {
            'Access-Control-Allow-Headers': 'access-control-allow-origin,content-type,access-control-allow-methods',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS,REDIRECT',
            'content-type':'application/javascript',
            'Referrer-Policy': 'unsafe-url'
        },
    })
}

//////////////////////////////////////////////////
// FUNCTION:RESPONSE headerResponse
// given an headers, return empty response
//////////////////////////////////////////////////
export function headerResponse(headers: object) {
    return new Response(null, {
        headers: headers
    })
}

//////////////////////////////////////////////////
// FUNCTION:RESPONSE gifResponse
// given a gif in b64, return gif
//////////////////////////////////////////////////
export function gifResponse(gifBinary: string) {
    return new Response(
        `${gifBinary}`, {
        headers: {
            'Access-Control-Allow-Headers': 'access-control-allow-origin,content-type,access-control-allow-methods',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
            'content-type':'application/javascript',
        }
    })
}


//////////////////////////////////////////////////
// FUNCTION:LOG logData
// relays log data to a server, db, etc.
// 
// EDIT THIS FUNCTION TO LOG SESSIONS
//
//////////////////////////////////////////////////
export async function logData(obj: object) {
    console.log(JSON.stringify(obj,null,4));
}

//////////////////////////////////////////////////
// FUNCTION:HANDLING requestToObject
// extractions from request object
//////////////////////////////////////////////////
export async function requestToObject(request: Request) {
    let body: any;
    if (request.method === 'POST' || request.method === 'PUT') {
        if (request.body){
            try {
                body = await request.json()
            } catch (e){
                try {
                    body = await request.text
                } catch (e){
                    body = null
                }
            }
        }
    } else {
        body = null
    }
    const headers = Object.fromEntries(request.headers);
    //////////////////////////////////////////////////
    // HEADER REMOVALS AND HASHING
    // this area will remove headers with PII
    // such as IP address, authorization, etc.
    // removal is done with explicitly named
    // header keys.
    //////////////////////////////////////////////////
    try {
        if (Object.keys(headers).includes('cf-connecting-ip')) {
            headers['cf-connecting-ip'] = await sha256(headers['cf-connecting-ip']);
        }
        if (Object.keys(headers).includes('x-real-ip')) {
            headers['x-real-ip'] = await sha256(headers['x-real-ip']);
        }
        if (Object.keys(headers).includes('x-forwarded-for')) {
            headers['x-forwarded-for'] = await sha256(headers['x-forwarded-for']);
        }
    } catch {};
    try {
        delete headers['authorization'];
        delete headers['key'];
        delete headers['cookie'];
        delete headers['x-auth-key'];
        delete headers['authentication'];
    } catch {};
    //////////////////////////////////////////////////
    // HEADER REMOVALS
    //////////////////////////////////////////////////
    const data = {
        request:{
            url: request.url,
            method: request.method,
            headers: headers,
            body: body,
            redirect: request.redirect
        },
        cf:request.cf
    };
    return data
}

//////////////////////////////////////////////////
// FUNCTION:HANDLING handleOffsitejsEndpoint
// handles requests to /offsite.js
//////////////////////////////////////////////////
export async function handleOffsitejsEndpoint(request: Request) {
    // OPTIONS handler for preflight postback
    if (request.method === 'OPTIONS') {
        const headers = {
            'Access-Control-Allow-Headers': 'access-control-allow-origin,content-type,access-control-allow-methods',
            'Access-Control-Allow-Origin': (new URL(request.url)).hostname,
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
            'content-type':'application/javascript',
            'Referrer-Policy': 'origin'
        }    
        return new Response("1", {
            headers: headers,
            status: 200
          })  
    }
    // POST handler for receiving postback data from client
    else if (request.method === 'POST') {
        const post_request = await requestToObject(request);
        const postback_data = post_request.request.body;
        logData(postback_data);
        return javascriptResponse(`console.log("posted");`)
    }
    // GET handler for the initial javascript
    else if (request.method === 'GET') {
        const tx_ts = genTS();
        const tx_id = genUID();
        const tx_type = 'request';
        const event_id = genUID();
        const raw = await requestToObject(request);
        const data = { tx_ts, tx_id, tx_type, event_id, raw };
        logData(data);
        const script_source = simpleJavascriptPayload(raw.request.url, event_id);
        return javascriptResponse(script_source)    
    }
}

//////////////////////////////////////////////////
// FUNCTION:HANDLING handlePixelEndpoint
// handles requests to /pixel.gif
//
// light-touch analytics with 0 javascript
//
//////////////////////////////////////////////////
export async function handlePixelEndpoint(request: Request) {
    logData(await requestToObject(request));
    return gifResponse('R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==')
}

//////////////////////////////////////////////////
// FUNCTION:HANDLING handleRequest
// primary router for request -> handler
//////////////////////////////////////////////////
export async function handleRequest(request: Request) {
    const endpoint = getEndpoint(request)
    try {
        switch(endpoint) {
            case '/offsite.js':
                return handleOffsitejsEndpoint(request);
            case '/pixel.gif':
                return handlePixelEndpoint(request);
        }
        logData(await requestToObject(request))
        return response204()
    } catch(e) {
        logData(await requestToObject(request))
        return response204()
    }
}

//////////////////////////////////////////////////
// fetch handler main
//////////////////////////////////////////////////
export default {
    fetch(request: Request) {
        return handleRequest(request);
    }
};