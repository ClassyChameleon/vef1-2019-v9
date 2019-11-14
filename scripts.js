const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let input;
  let results;

  function init(companies) {
    input = document.querySelector('input');
    results = companies.querySelector('.results');
    const form = companies.querySelector('form');
    form.addEventListener('submit', submit);
  }

  function submit(event) {
    event.preventDefault();
    empty(results);
    const value = input.value;
    if (value.trim() === '') {
      showMessage('Fyrirtæki verður að vera strengur');
    } else {
      fetchResults(value);
    }
  }

  function fetchResults(company) {
    // TODO Loading
    removeLoadingState();
    empty(results);
    displayLoadingState();
    fetch(`${API_URL}${company}`)
      .then((result) => {
        if (!result.ok) {
          throw new Error('Non 200 status');
        }
        return result.json();
      })
      .then(data => addToDom(data.results))
      .catch(error => 
        {
          removeLoadingState();
          showMessage('Villa að sækja gögn');
        });   
  }

  function addToDom(data) {
    if (data.length === 0) {
      removeLoadingState();
      showMessage('Ekkert fannst');
    } else {
      data.forEach((item) => {
        intoHTML(item);
      })
    }
  }

  function showMessage(msg) {
    const text = document.createElement('div');
    text.append(document.createTextNode(msg));
    results.appendChild(text);
  }

  function intoHTML(data) {
    // Hefði getað notað nested for loop
    // til að stytta þetta en er núþegar kominn með þetta.
    const div = document.createElement('div');
    const dl = document.createElement('dl');
    const dt1 = document.createElement('dt');
    const dd1 = document.createElement('dd');
    const dt2 = document.createElement('dt');
    const dd2 = document.createElement('dd');
    dt1.append(document.createTextNode('Nafn'));
    dd1.append(document.createTextNode(data.name));
    dt2.append(document.createTextNode('Kennitala'));
    dd2.append(document.createTextNode(data.sn));
    dl.appendChild(dt1);
    dl.appendChild(dd1);
    dl.appendChild(dt2);
    dl.appendChild(dd2);
    if (data.active == '1') {
      div.setAttribute('class','company company--active');
      const dt3 = document.createElement('dt');
      const dd3 = document.createElement('dd');
      dt3.append(document.createTextNode('Heimilisfang'));
      dd3.append(document.createTextNode(data.address));
      dl.appendChild(dt3);
      dl.appendChild(dd3);
    } else {
      div.setAttribute('class','company company--inactive');
    }

    div.appendChild(dl);
    results.appendChild(div);
    removeLoadingState();
  }

  function displayLoadingState () {
    const results = document.querySelector('section');
    const imgElement = document.createElement('img');
    imgElement.setAttribute('class','loading');
    const div = document.createElement('div');
    div.setAttribute('class','load');
    const text = document.createElement('p');
    text.append(document.createTextNode('Leita að fyrirtækjum...'));
    imgElement.setAttribute('src','loading.gif');
    div.appendChild(imgElement);
    div.appendChild(text);
    results.appendChild(div);
  }

  function removeLoadingState () {
    const results = document.querySelector('section');
    if (results.querySelector('img')) {
      const imgElement = results.querySelector('.load');
      const parent = imgElement.parentNode;
      parent.removeChild(imgElement);
    }
  }

  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  /*  Gamall kóði:
  Það er eitthvað error sem ég fann ekki hérna.
  Byrjaði bara upp á nýtt.
  Vill halda þessu inni til öryggis ef það getur hækkað mig
   for(let i = 0; i < data.length ; i += 1) {
      console.log(data[i]);
      const resultDiv = document.createElement('div')
      if (data[i].active){
        data[i].Div.classList.add('company--active')
      }
      resultDivs.push(resultDiv)
    }
    taka data og appenda við skjalið
    resultDivs = result.map(result => {
      ...
    })
    for (let div of reultDivs) {
      resultsDom.appendChild(div)
    }
    resultDivs.forEach(resultsDOM.appendChild)
  
  const fetchData = async (event) => {
    fetch('url')
      .then((result) => {
        if (!result.ok) {
          throw new Error('Non 200 status');
        }
        return result.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
    const thing = event.target
    if (isEmpty(thing)) // skilar villu ef að thing er tómt
      return null;

    displayLoadingState()

    
    
    try {
      const response = await fetch(url + value)
      if (!response.ok) //birta villuskilaboð
      const result = await response.json()
      removeLoadingState()
      addToDom(result)
    } catch (e) {
      // villuskilaboð
    }

  }

  function displayLoadingState () {
    const imgElement = document.createElement('img')
    imgElement.setAttribute('src','/loading.gif')

    results.appendChild(imgElement)
    // ná í results
  }

  function removeLoadingState(){
    const imgElement = results.querySelector('img')
    results.removeChild(imgElement)
  }

  function addtoDom(data) {
    const { result } = data
    const resultDivs = []

    for(let result of results) {
      const resultDiv = document.createElement('div')
      if (result.active){
        result.Div.classList.add('company--active')
      }
      resultDivs.push(resultDiv)
    }
    //taka data og appenda við skjalið
    const resultDivs = results.map(result => {
      // ...
    })
    for (let div of reultDivs) {
      resultsDom.appendChild(div)
    }
    resultDivs.forEach(resultsDOM.appendChild)
  }

  function onSubmitHandle(event) {
    console.log(event)
    const thing = event.target
    const input = thing.querySelector('input')
    // const url = new URL(input.value, API_URL)
    const url = `${API_URL}${input.value}`
  // setLoadingState()
  const result = fetch(url).then((res, reject) => {
    return res.json
  }).then(res => input.value).catch(e => console.log(e))

  const result = await fetch(url)
  const json = await result.json()

  json.results
  // removeLoadingState(json)

  }*/

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector('section');
  program.init(companies);
});
