import { Chart, LinearScale, PointElement } from 'chart.js/auto';
import { TreeChart } from 'chartjs-chart-graph';

const ONE_SHOT_EXAMPLE_CATEGORIES = [
  'ChatGPT',
  'HTML Standard',
  '雪中悍刀行',
  'Olevo',
  'Josh Richardson',
  'Steph Curry',
  'YouTube',
  'Canada vs USA',
  'USAB Showcase',
  'Full Game Highlights',
  'July 10, 2024',
  'Canada vs USA Basketball',
  'Friendly International Games',
  'USA Basketball Showcase',
  'Yahoo Sports',
  'Sporting News',
  "Olympic Men's Basketball Exhibition Game",
  'Box Score',
  'Accelerated Shape Detection',
  'Images',
  'GitHub',
  'Prompt API',
  'Browser-Provided Language Models',
  'AI & the Web',
  'Machine Learning Models',
  'W3C',
  'Gmail',
  'Celsius',
  'Google Calendar',
  'Navia Benefit Solutions',
  'Deposits',
  'Contributions',
  'San Mateo Weather',
];

const ONE_SHOT_CORRECT_RESPONSE = {
  'Web Technologies & AI': [
    'HTML Standard',
    'GitHub',
    'Prompt API',
    'Browser-Provided Language Models',
    'AI & the Web',
    'Machine Learning Models',
    'W3C',
    'Accelerated Shape Detection',
    'Images',
    'ChatGPT',
  ],
  'Sports & Entertainment': [
    'Josh Richardson',
    'Steph Curry',
    'Canada vs USA',
    'USAB Showcase',
    'Friendly International Games',
    'USA Basketball Showcase',
    "Olympic Men's Basketball Exhibition Game",
    'Box Score',
    '雪中悍刀行',
  ],
  'Streaming & Media Platforms': ['YouTube', 'Full Game Highlights', 'Olevo'],
  'News & Updates': ['Yahoo Sports', 'Sporting News'],
  'Personal & Financial Management': [
    'Google Calendar',
    'Gmail',
    'Celsius',
    'Deposits',
    'Contributions',
    'Navia Benefit Solutions',
    'San Mateo Weather',
  ],
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function months(config) {
  var cfg = config || {};
  var count = cfg.count || 12;
  var section = cfg.section;
  var values = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}

document.addEventListener('DOMContentLoaded', () => {
  const barCtx = document.getElementById('bar').getContext('2d');
  const myChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: [
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Purple',
        'Orange',
        'Cyan',
        'Orange',
        'Dark Purple',
        'Green',
        'Magenta',
      ],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3, 1, 2, 3, 45, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 255, 255, 0.2)', // (Cyan)
            'rgba(255, 159, 64, 0.2)', // (Orange)
            'rgba(128, 0, 128, 0.2)', // (Dark Purple)
            'rgba(0, 128, 0, 0.2)', // (Green)
            'rgba(255, 0, 255, 0.2)', // (Magenta)
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(0, 255, 255)', // (Cyan)
            'rgb(255, 159, 64)', // (Orange)
            'rgb(128, 0, 128)', // (Dark Purple)
            'rgb(0, 128, 0)', // (Green)
            'rgb(255, 0, 255)', // (Magenta)
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const pieCtx = document.getElementById('pie').getContext('2d');
  new Chart(pieCtx, {
    type: 'polarArea',
    data: {
      labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue',
        'Purple',
        'Orange',
        'Dark Purple',
        'Green',
        'Magenta',
      ],
      datasets: [
        {
          label: 'My First Dataset',
          data: [11, 16, 7, 3, 14, 1, 2, 3, 45, 5],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)', // (Purple)
            'rgb(255, 159, 64)', // (Orange)
            'rgb(128, 0, 128)', // (Dark Purple)
            'rgb(0, 128, 0)', // (Green)
            'rgb(255, 0, 255)', // (Magenta)
          ],
        },
      ],
    },
    options: {},
  });

  const labels = months({ count: 7 });
  const lineCtx = document.getElementById('line').getContext('2d');
  new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
  });

  // const nodes = [
  //   { name: '1' },
  //   { name: '11', parent: 0 },
  //   { name: '111', parent: 1 },
  //   { name: '1111', parent: 2 },
  //   { name: '1112', parent: 2 },
  //   { name: '112', parent: 1 },
  //   { name: '1121', parent: 5 },
  //   { name: '1122', parent: 5 },
  //   { name: '113', parent: 1 },
  //   { name: '1131', parent: 8 },
  //   { name: '1132', parent: 8 },
  //   { name: '12', parent: 0 },
  //   { name: '121', parent: 11 },
  //   { name: '1211', parent: 12 },
  //   { name: '1212', parent: 12 },
  //   { name: '122', parent: 11 },
  //   { name: '1221', parent: 15 },
  //   { name: '1222', parent: 15 },
  //   { name: '123', parent: 11 },
  //   { name: '1231', parent: 18 },
  //   { name: '1232', parent: 18 },
  //   { name: '13', parent: 0 },
  //   { name: '131', parent: 21 },
  // ];

  // const treeCtx = document.getElementById('tree').getContext('2d');
  // new TreeChart(treeCtx, {
  //   type: 'tree',
  //   data: {
  //     labels: nodes.map((d) => d.name),
  //     datasets: [
  //       {
  //         pointBackgroundColor: 'steelblue',
  //         pointRadius: 5,
  //         directed: true,
  //         data: nodes.map((d) => Object.assign({}, d)),
  //       },
  //     ],
  //   },
  //   options: {
  //     plugins: {
  //       datalabels: {
  //         display: false,
  //       },
  //     },
  //     tree: {
  //       orientation: 'horizontal',
  //     },
  //   },
  // });
});

function extractJSON(str) {
  const regex = /\{[\s\S]*\}/;
  const match = str.match(regex);

  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return null;
    }
  }

  return null;
}

chrome.storage.onChanged.addListener(async (changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log('storage changed');
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${JSON.stringify(
        oldValue
      )}", new value is "${JSON.stringify(newValue)}".`
    );
  }

  if (changes['results']) {
    console.log('results changed');
    const rawCategories = [];
    let rawResult;
    try {
      await chrome.storage.sync.get(['results'], function (result) {
        console.log('results: ', result);
        rawResult = result.results;
        result.results.forEach((item) => rawCategories.push(item.category));
      });
    } catch (error) {
      console.error('Error parsing new value');
      console.log(error);
    }

    const canCreate = await window.ai.canCreateTextSession();
    // canCreate will be one of the following:
    // * "readily": the model is available on-device and so creating will happen quickly
    // * "after-download": the model is not available on-device, but the device is capable,
    //   so creating the session will start the download process (which can take a while).
    // * "no": the model is not available for this device.

    if (canCreate !== 'no') {
      const session = await window.ai.createTextSession();
      console.log('session created');
      console.log('Grouping raw categories into 10 or less unique categories');
      const categoryGroupingPrompt = `You are an native english literature expert. You can expertly group raw categories into 10 or less unique categories, 
        which can be ANY category, as long as they are valid and make sense.
        Example:
        Given this set of raw categories: ${ONE_SHOT_EXAMPLE_CATEGORIES.join(
          ', '
        )}

        A correct JSON representation of the grouped categories and their count could be :
        ${JSON.stringify(ONE_SHOT_CORRECT_RESPONSE)}
        <ctrl23>

        Hence, given this set of raw categories: ${rawCategories.join(', ')}, 
        
        A correct JSON representation of the grouped categories could be :`;

      console.log(categoryGroupingPrompt);
      const groupedCategories = await session.prompt(categoryGroupingPrompt);
      console.log(groupedCategories);
      let cleanedGroupCategories = extractJSON(groupedCategories);

      const cleanJsonSession = await window.ai.createTextSession();
      while (cleanedGroupCategories === null) {
        console.log('Re-cleaning JSON group categories');
        const intermediateJson = await cleanJsonSession.prompt(
          `Given this result ${groupedCategories}, please generate a valid json representation string.`
        );
        cleanedGroupCategories = extractJSON(intermediateJson);

        if (cleanedGroupCategories) {
          cleanJsonSession.destroy();
        }
      }
      console.log(cleanedGroupCategories);

      // const subCategoriesToTopCategories = new Map();
      // const subCategoryCounterMap = new Map();
      // for (let [category, items] of Object.entries(cleanedGroupCategories)) {
      //   console.log(`Category: ${category}`);
      //   items.forEach((subCategory) => {
      //     console.log(`Subcategory: ${subCategory}`);
      //     subCategoriesToTopCategories.set(subCategory, category);
      //     subCategoryCounterMap.set(subCategory, 0);
      //   });
      // }

      // // calculate results per subcategory
      // rawResult.forEach((item) => {
      //   const subCategories = item.category.split(',');
      //   subCategories.forEach((subCategory) => {
      //     const currentCount = subCategoryCounterMap.get(subCategory);
      //     if (!currentCount) {
      //       console.log(`Invalid subcategory: ${subCategory}`);

      //       if (subCategoryCounterMap.get('Others') === undefined) {
      //         subCategoryCounterMap.set('Others', 0);
      //       }

      //       subCategoryCounterMap.set(
      //         'Others',
      //         subCategoryCounterMap.get('Others') + 1
      //       );
      //     }
      //     subCategoryCounterMap.set(subCategory, currentCount + 1);
      //   });
      // });
      // console.log(subCategoryCounterMap);

      // const topCategoryCounterMap = new Map();

      // // sum up the number of votes per category using the subcategory counts
      // for (let [subCategory, count] of subCategoryCounterMap) {
      //   const topCategory = subCategoriesToTopCategories.get(subCategory);
      //   const currentCount = subCategoryCounterMap.get(subCategory);
      //   if (topCategoryCounterMap.get(topCategory) === undefined) {
      //     topCategoryCounterMap.set(topCategory, currentCount);
      //   } else {
      //     topCategoryCounterMap.set(topCategory, currentCount + count);
      //   }
      // }

      // const categoryVotes = new Map();
      // await chrome.storage.sync.set({
      //   groupedCategories: cleanedGroupCategories,
      // });
      session.destroy();
    } else {
      console.log('model not available');
    }
  }
});
