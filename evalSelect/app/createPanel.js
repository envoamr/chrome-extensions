/*
createPanel.js
Creates the panel which displays the converted text and number of chars/words.
*/

/*
Called once. Creates the panel's elements, properties, and styles
*/
function createPanels() {
  // Create styles
  let style = document.createElement("style");
  style.innerHTML = `
    .conv-div-panel {
      background-color: #fafafa !important;
      display: inline-block !important;
      padding: 0px !important;
      text-align: center !important;
      max-width: 300px !important;
      border: 1px solid #3FA9D3 !important;
      border-radius: 10px !important;
      position: fixed !important;
      right: 20px !important;
      top: 20px !important;
      z-index: 1000000 !important;
      user-select: none !important;
      cursor: pointer !important;
    }
    .conv-p-title {
      margin: 0px !important;
      padding: 6px 12px 2px 12px !important;
      font-size: 14px !important;
      text-indent: 0px !important;
      color: #0067e5 !important;
    }
    .conv-p-result {
      margin: 0px !important;
      padding: 2px 12px 6px 12px !important;
      font-size: 14px !important;
      text-indent: 0px !important;
      color: #000 !important;
    }
    .conv-p-red {
      color: red !important;
    }
    .conv-hide {
      display: none !important;
    }
    .conv-div-count {
      background-color: #fafafa !important;
      padding: 0px !important;
      text-align: center !important;
      min-width: min-content !important;
      border: 1px solid #3FA9D3 !important;
      border-radius: 10px !important;
      position: fixed !important;
      right: 10px !important;
      bottom: 10px !important;
      z-index: 1000000 !important;
      user-select: none !important;
      margin: 0px !important;
      padding: 3px 6px 3px 6px !important;
      font-size: 12px !important;
      text-indent: 0px !important;
      color: #2f2f2f !important;
    }
    .conv-span-blue {
      color: #0067e5 !important;
      color: #0051b5 !important;
    }
  `;
  document.querySelector("head").appendChild(style);

  // Top right panel

  // Create div
  let divPanel = document.createElement("div");
  divPanel.id = "convertPanel";
  divPanel.className = "conv-div-panel conv-hide";
  divPanel.title = "Click to copy result";

  // Create title
  let pTitle = document.createElement("p");
  pTitle.className = "conv-p-title";
  let tTitle = document.createTextNode("");
  pTitle.appendChild(tTitle);

  // Create result box
  let pResult = document.createElement("p");
  pResult.className = "conv-p-result";
  let tResult = document.createTextNode("");
  pResult.appendChild(tResult);

  // Create horz line for separation
  let hr = document.createElement("hr");
  hr.style.maxWidth = "95%";
  hr.style.margin = "0 auto";

  // Append to page
  divPanel.appendChild(pTitle);
  divPanel.appendChild(hr);
  divPanel.appendChild(pResult);
  document.body.appendChild(divPanel);

  // Better readability
  panel = document.querySelector("#convertPanel");
  title = document.querySelector("#convertPanel p.conv-p-title");
  line = document.querySelector("#convertPanel hr");
  result = document.querySelector("#convertPanel p.conv-p-result");

  // Initially hide them
  finalText = "...";

  // Event listeners
  // When user hovers over panel
  panel.addEventListener("mouseover", (event) => (canHide = false));
  panel.addEventListener("mouseout", (event) => {
    if (!canHide) {
      title.textContent = finalTitle;
    }
    canHide = true;
  });
  panel.addEventListener("click", async (event) => {
    try {
      if (finalText != "...") {
        await navigator.clipboard.writeText(finalText);
        title.textContent = "copied";
      }
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  });

  // Bottom right panel

  // Create div
  let divCount = document.createElement("div");
  divCount.id = "convCountPanel";
  divCount.className = "conv-div-count conv-hide";

  // Create count box
  let pCount = document.createElement("p");
  pCount.className = "conv-p-count";
  pCount.appendChild(tResult);

  // Create spans
  let pSpan1 = document.createElement("span");
  pSpan1.className = "conv-span-blue";
  let tSpan1 = document.createTextNode("");
  pSpan1.appendChild(tSpan1);

  let pSpan2 = document.createElement("span");
  pSpan2.className = "";
  let tSpan2 = document.createTextNode(" chars.  ");
  pSpan2.appendChild(tSpan2);

  let pSpan3 = document.createElement("span");
  pSpan3.className = "conv-span-blue";
  let tSpan3 = document.createTextNode("");
  pSpan3.appendChild(tSpan3);

  let pSpan4 = document.createElement("span");
  pSpan4.className = "";
  let tSpan4 = document.createTextNode(" words. ");
  pSpan4.appendChild(tSpan4);

  // Append
  Object.values([pSpan1, pSpan2, pSpan3, pSpan4]).forEach((span) => {
    divCount.appendChild(span);
  });

  document.body.appendChild(divCount);

  count = document.querySelector("#convCountPanel");
  span1 = document.querySelector("#convCountPanel :nth-child(1)");
  span2 = document.querySelector("#convCountPanel :nth-child(2)");
  span3 = document.querySelector("#convCountPanel :nth-child(3)");
  span4 = document.querySelector("#convCountPanel :nth-child(4)");
}

// Reference
// navigator.clipboard: https://flaviocopes.com/clipboard-api/
