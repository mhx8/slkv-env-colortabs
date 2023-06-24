const slkvHosts = {

};

browser.tabs.onActivated.addListener(handleActivated);
browser.tabs.onUpdated.addListener(handleUpdated);


function handleActivated(activeInfo) {
  browser.tabs
    .query({ currentWindow: true, active: true })
    .then((tabs) => changeTabColor(tabs[0].url), onError);
}

function handleUpdated(tabId, changeInfo, tabInfo) {
  changeTabColor(changeInfo.url)
}

function changeTabColor(url) {
  if (url === undefined) {
    return;
  }

  let currentTabUrl = new URL(url);
  if (currentTabUrl.host in slkvHosts) {
    browser.theme.update({
      colors: {
        frame: slkvHosts[currentTabUrl.host],
        backgroundtext: '#000',
      }
    });
  } else {
    browser.theme.reset();
  }
}

function onError(error) {
  console.error(`Error: ${error}`);
}

