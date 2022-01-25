const postback_url = "${postback_url}";
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
})