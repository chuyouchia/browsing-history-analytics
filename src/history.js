const kMillisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
const kOneWeekAgo = new Date().getTime() - kMillisecondsPerWeek;
const historyDiv = document.getElementById('historyDiv');

function faviconURL(u) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'));
  url.searchParams.set('pageUrl', u);
  url.searchParams.set('size', '24');
  return url.toString();
}

function constructHistory(historyItems) {
  const template = document.getElementById('historyTemplate');
  for (let item of historyItems) {
    const clone = document.importNode(template.content, true);
    const pageLinkEl = clone.querySelector('.page-link');
    const pageTitleEl = clone.querySelector('.page-title');
    const pageVisitTimeEl = clone.querySelector('.page-visit-time');
    const imageWrapperEl = clone.querySelector('.image-wrapper');
    const checkbox = clone.querySelector('.removeCheck, input');
    checkbox.setAttribute('value', item.url);
    const favicon = document.createElement('img');
    pageLinkEl.href = item.url;
    favicon.src = faviconURL(item.url);
    pageLinkEl.textContent = item.url;
    imageWrapperEl.prepend(favicon);
    pageVisitTimeEl.textContent = new Date(item.lastVisitTime).toLocaleString();
    if (!item.title) {
      pageTitleEl.style.display = 'none';
    }
    pageTitleEl.innerText = item.title;

    clone
      .querySelector('.removeButton, button')
      .addEventListener('click', async function () {
        await chrome.history.deleteUrl({ url: item.url });
        location.reload();
      });

    clone
      .querySelector('.history')
      .addEventListener('click', async function (event) {
        // fix double click
        if (event.target.className === 'removeCheck') {
          return;
        }

        checkbox.checked = !checkbox.checked;
      });
    historyDiv.appendChild(clone);
  }
}

function injectLoadingState() {
  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'extension-loading-state';
  loadingDiv.style.position = 'fixed';
  loadingDiv.style.top = '0';
  loadingDiv.style.left = '0';
  loadingDiv.style.width = '100%';
  loadingDiv.style.height = '100%';
  loadingDiv.style.zIndex = '9999';
  loadingDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  loadingDiv.style.display = 'flex';
  loadingDiv.style.justifyContent = 'center';
  loadingDiv.style.alignItems = 'center';
  loadingDiv.style.fontFamily = 'Arial, sans-serif';

  loadingDiv.innerHTML = `
    <div>
      <div class="loader" style="
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      "></div>
      <div class="loading-text" style="
        margin-top: 20px;
        font-size: 18px;
        color: #333;
      ">Loading history...</div>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;

  document.body.appendChild(loadingDiv);
}

function removeLoadingState() {
  const loadingDiv = document.getElementById('extension-loading-state');
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

document.getElementById('searchSubmit').onclick = async function () {
  historyDiv.innerHTML = ' ';
  const searchQuery = document.getElementById('searchInput').value;
  const historyItems = await chrome.history.search({
    text: searchQuery,
    startTime: kOneWeekAgo,
  });

  console.log(historyItems[0]);

  // constructHistory(historyItems);
  const canCreate = await window.ai.canCreateTextSession();
  // canCreate will be one of the following:
  // * "readily": the model is available on-device and so creating will happen quickly
  // * "after-download": the model is not available on-device, but the device is capable,
  //   so creating the session will start the download process (which can take a while).
  // * "no": the model is not available for this device.
  console.log('start checking history');
  const results = [];
  if (canCreate !== 'no') {
    injectLoadingState();

    const session = await window.ai.createTextSession();
    console.log('session created');
    for (const item of historyItems) {
      console.log('extracting nouns from title');
      const category = await session.prompt(
        `You are an english literature expert. You can extract nouns from titles with superb accuracy.
        Given this webpage title: Discover Delicious Recipes for Every Occasion, the correct nouns are:Recipes, Occasion<ctrl23>
        Given this webpage title: Explore the Latest Fashion Trends and Styles, the correct nouns are:Fashion, Trends, Styles<ctrl23>
        Given this webpage title: I see that Lauri Markkanen is no longer untouchable. How would everyone feel about a Lauri trade possibly happening? : r/heat, the correct nouns are:Lauri, r/heat<ctrl23>
        Given this webpage title: ${item.title}, the correct nouns are:`
      );
      console.log({ url: item.url, category: category });
      results.push({ url: item.url, category: category });
    }

    console.log(results);
    await chrome.storage.sync.set({ results: results });
    removeLoadingState();
    console.log('results stored');
    session.destroy();
  } else {
    console.log('model not available');
  }
};

document.getElementById('deleteSelected').onclick = async function () {
  const checkboxes = document.getElementsByTagName('input');
  for (let checkbox of checkboxes) {
    if (checkbox.checked == true) {
      await chrome.history.deleteUrl({ url: checkbox.value });
    }
  }
  location.reload();
};

document.getElementById('removeAll').onclick = async function () {
  await chrome.history.deleteAll();
  location.reload();
};

chrome.history.search({
  text: '',
  startTime: kOneWeekAgo,
  maxResults: 99,
});
// .then(constructHistory);
