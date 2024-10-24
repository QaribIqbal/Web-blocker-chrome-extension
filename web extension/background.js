console.log('Service worker started.');

// Function to update rules dynamically
function updateBlocklistRules(blocklist) {
  if (chrome.declarativeNetRequest) {
    // Update rules dynamically
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: [1], // Remove existing rules with ID 1 if any
        addRules: [
          {
            "id": 1,
            "priority": 1,
            "action": {
              "type": "redirect",
              "redirect": {
                "extensionPath": "/blocked.html"
              }
            },
            "condition": {
              "regexFilter": blocklist,
              "resourceTypes": ["main_frame"]
            }
          }
        ]
      },
      () => {
        console.log('Rules updated successfully.');
      }
    );

    // Add listener for rule matches (for debugging purposes)
    chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
      const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
      console.log(msg);
    });
  } else {
    console.error('declarativeNetRequest API is not available.');
  }
}

// Initial blocklist setup
chrome.storage.local.get(['block_list'], function (result) {
  let blocklist = "";
  if (!result.block_list || result.block_list.length === 0) {
    blocklist = 'www.nothing.com';
    console.log('Chrome storage is clear');
  } else {
    console.log('Else statement ran');
    let sitelist = result.block_list;
    blocklist = sitelist.join('|');
  }
  console.log('Initial blocklist:', blocklist);
  updateBlocklistRules(blocklist);
});

// Listen for changes in the storage and update rules accordingly
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.block_list) {
    let newBlocklist = "";
    if (!changes.block_list.newValue || changes.block_list.newValue.length === 0) {
      newBlocklist = 'www.nothing.com';
      console.log('Block list is cleared or empty.');
    } else {
      console.log('Updating blocklist with new values.');
      newBlocklist = changes.block_list.newValue.join('|');
    }
    console.log('Updated blocklist:', newBlocklist);
    updateBlocklistRules(newBlocklist);
  }
});
