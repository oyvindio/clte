function toArray(nodelist) {
  return [].slice.call(nodelist);
}

function findAnchor(node) {
  var childWithId = node.querySelector("[id]");
  if (childWithId) {
    return "#" + childWithId.id;
  }

  var childAs = toArray(node.querySelectorAll("a[href]"));
  var asWithAnchor = childAs.filter(function(a) {
    return a.href.match(/#.*/);
  });
  if (asWithAnchor) {
    var href = asWithAnchor[0].href;
    if (href.match(/^#.*/)) {
      return window.location + href;
    } else {
      return href;
    }
  }

  return "";
}

function contextMenuClick() {
  var range = window.getSelection().getRangeAt(0);
  var subTree = range.cloneContents();
  var anchor = findAnchor(subTree);
  if (anchor) {
    console.log("writing '" + anchor + "' to clipboard");
    saveToClipboard(anchor);
  }
};

function saveToClipboard(str) {
  chrome.runtime.getBackgroundPage(function(background) {
    var content = background.document.getElementById("content");
    content.val(str).select();
    document.execCommand('copy');
    content.val('');
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  
});
