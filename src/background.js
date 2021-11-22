const state = { urls: [] };

chrome.storage.sync.get("urls", function (result) {
  if (result.urls) {
    state.urls = result.urls;
  } else {
    chrome.storage.sync.set({ urls: [] });
  }
});  

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == "save") {
    state.urls.push(request.obj);
    chrome.storage.sync.set({ urls: state.urls });
    sendResponse({ ok: true });
  }
});

function onRequest(details) {
    console.log("Intercepted request to " + details.url);
    state.urls.forEach(url => { 
      if (url.shortcut == details.url)
        destination = url.url;
    });
  
    if (destination) {
      console.log("Redirecting to destination: " + destination);
      return { 
        redirectUrl: destination
      };
    } else {
      console.log("Cancelling the request");
      return {
        cancel: true
      };
    }
  }
  
  chrome.webRequest.onBeforeRequest.addListener(
    onRequest,
    { urls: ["*://h/*"] },
    ["blocking"]
  );