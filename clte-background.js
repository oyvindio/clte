function notifyContentScript(info, tab) {
  chrome.tabs.sendMessage(tab.id, info, function(response) {
    console.log("callback from contentscript")
  });
}

chrome.contextMenus.create({
  "id": "clte",
  "title": "Copy link to %s in page",
  "contexts": ["selection"]
});
chrome.contextMenus.onClicked.addListener(notifyContentScript);
