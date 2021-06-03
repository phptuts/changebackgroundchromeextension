const colorEl = document.getElementById("color-changer");

const rotateEl = document.getElementById("rotate");

const rotate3DEl = document.getElementById("rotate3d");

colorEl.addEventListener("input", (e) => {
  const hexValue = e.target.value;
  chrome.tabs.executeScript(null, {
    code: `document.body.style.backgroundColor='${hexValue}'`,
  });
});

rotateEl.addEventListener("input", (e) => {
  const degree = e.target.value;
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currTab = tabs[0];
    if (currTab) { // Sanity check
      chrome.scripting.insertCSS({
        css: `body { transform: rotate(${degree}deg) !important; }`,
        target: {tabId: currTab.id}
      }, function() {
        console.log('called');
        if (chrome.runtime.lastError) {
          message.innerText = 'There was an error injecting css : \n' + chrome.runtime.lastError.message;
        }
      });
    }
  });
});

rotate3DEl.addEventListener("input", (e) => {
  const degree = e.target.value;
  chrome.tabs.executeScript(null, {
    code: `document.body.style.transform='rotate3d(1, 1, 1,${degree}deg)'`,
  });
});
