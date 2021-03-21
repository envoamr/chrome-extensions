/*
background.js
Received messages from popup.js to turn on/off cors. If on, adds headers
access-control-allow-origin=* and access-control-allow-methods=* to all
requests.
Some sites may not work as expected when enabling cors from the extension,
as the headers are added to all the requests without excluding some.
*/

// State of cors (enabled or disabled by user)
var state;

// Set cors disabled by default upon installation or being refreshed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ corsState: false }, () => {});
});

// Listen for message to update the 'state' var
chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.type === "cors") {
    state = message.state;
  }
});

// Listens when response headers are received
chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    // If user enabled cors
    if (state) {
      // Cors-related headers to add
      const newHeaders = [
        { name: "access-control-allow-origin", value: "*" },
        { name: "access-control-allow-methods", value: "*" },
      ];
      // Add headers to object
      const responseHeaders = details.responseHeaders.concat(newHeaders);
      // Return modified http headers to complete life cycle
      return { responseHeaders };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders", "extraHeaders"]
);
