// State of cors (enabled or disabled by user)
var state;

chrome.storage.local.get(['corsState'], (res) => {
  state = res.corsState
  // That way, 'state' will not be undefined since the function is asynchronous
  main()
})

// Main function
function main() {
  var button = document.querySelector('button')
  // If CORS is enabled
  if (state) {
    button.textContent = 'Turn Off';
    button.textContent = 'Enabled';
    button.className = 'on'
  }
  // If CORS is disabled
  else {
    button.textContent = 'Turn On';
    button.textContent = 'Disabled';
    button.className = 'off'
  }

  // If button clicked, toggle cors state
  button.addEventListener('click', event => {
    // If CORS is enabled
    if (state) {
      // Change HTML
      button.textContent = 'Disabled';
      button.className = 'off'
      // Update variable
      state = false
      // Send message to background.js to update state var
      chrome.runtime.sendMessage({'type': 'cors', 'state': state})
      // Store to localstorage so it saves when user closes popup page
      chrome.storage.local.set({'corsState': state}, ()=>{});
    }
    // If CORS is disabled
    else {
      // Change HTML
      button.textContent = 'Enabled';
      button.className = 'on'
      // Send message to background.js to update state var
      state = true
      chrome.runtime.sendMessage({'type': 'cors', 'state': state})
      chrome.storage.local.set({'corsState': state}, ()=>{});
    }
  })
}
