const colorEl = document.getElementById("color-changer");

const rotateEl = document.getElementById("rotate");

const rotate3DEl = document.getElementById("rotate3d");

colorEl.addEventListener("input", (e) => {
  const hexValue = e.target.value;
  injectCSS(`body {
    background-color: ${hexValue}!important;
  }`);
});

rotateEl.addEventListener("input", (e) => {
  const degree = e.target.value;
  injectCSS(`body { 
    transform: rotate(${degree}deg) !important; 
  }`);
});

rotate3DEl.addEventListener("input", (e) => {
  const degree = e.target.value;
  injectCSS(`body { 
    transform: rotate3d(1, 1, 1,${degree}deg) !important; 
  }`);
});

function injectCSS(css) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currTab = tabs[0];
    if (currTab) {
      // Sanity check
      chrome.scripting.insertCSS(
        {
          css,
          target: { tabId: currTab.id },
        },
        function () {
          console.log("called");
          if (chrome.runtime.lastError) {
            message.innerText =
              "There was an error injecting css : \n" +
              chrome.runtime.lastError.message;
          }
        }
      );
    }
  });
}
