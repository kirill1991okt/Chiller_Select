class Chillers {
  link = ' http://31.130.206.73:3004/chillers';
  get() {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.link);
      xhr.onload = () => {
        resolve(JSON.parse(xhr.response));
      };
      xhr.send();
    });
  }
  calculate(params) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.link);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        resolve(JSON.parse(xhr.response));
      };
      xhr.send(JSON.stringify(params));
    });
  }
}

export default () => {
  const header = document.querySelector('.header__container'),
    logout = document.querySelector('.dropdown'),
    ch = new Chillers();

  // header.addEventListener('click', () => {
  //   logout.classList.add('open');
  // });

  // document.body.addEventListener('click', (event) => {
  //   if (event.target.className !== 'header__container-user-name') {
  //     logout.classList.remove('open');
  //   }
  // });

  const btnFilter = document.querySelector('.container__btn-filter'),
    continueBtn = document.querySelectorAll('.continue'),
    btnSeries = document.querySelector('.container__btn-series'),
    characteristicsBlock = document.querySelector(
      '.container__characteristics'
    ),
    containerSelectionBtn = document.querySelector('.container__rightBtn'),
    continueSelectionBtn = document.querySelector('.container__rightBtn-btn'),
    resultBox = document.querySelector('.container__result'),
    application = document.querySelector(
      '.container__characteristics-wrap-option'
    ),
    evaporators = document.querySelector(
      '.container__characteristics-wrap-evaporates'
    ),
    calculate = document.querySelector('.container__calculate-btn'),
    series = document.getElementById('series'),
    models = document.getElementById('models'),
    waterOutChiller = document.getElementById('waterOutChiller'),
    paramFluid = document.getElementById('paramFluid'),
    outdoorAir = document.getElementById('outdoorAir'),
    tableContainer = document.getElementById('tableContainer'),
    imgBlock = document.querySelector('.container__result-machine-img'); // див, где расположена картинка, его надо поменять

  btnFilter.addEventListener('click', () => {
    btnFilter.classList.add('active');
    characteristicsBlock.classList.add('active');
    containerSelectionBtn.classList.add('active');
    continueSelectionBtn.classList.add('active');
    btnSeries.classList.remove('active');
    resultBox.classList.remove('active');
  });

  continueBtn.forEach((item) => {
    item.addEventListener('click', () => {
      btnSeries.classList.add('active');
      resultBox.classList.add('active');
      btnFilter.classList.remove('active');
      characteristicsBlock.classList.remove('active');
      containerSelectionBtn.classList.remove('active');
      continueSelectionBtn.classList.remove('active');
    });
  });

  const paramScrew = document.querySelector('#paramScrew'),
    shellAndTube = document.querySelector('#shellAndTube'),
    selectFamily = document.querySelector('#family'),
    selectType = document.querySelector('#type');


  btnSeries.addEventListener('click', () => {

    if (paramScrew.checked && shellAndTube.checked && selectType.value == 'Air Cooled' && selectFamily.value == 'Liquid chillers') {
      const option = document.createElement('option');
      option.innerText = 'TASD110.1AC1÷TASD405.2AC1';
      series.appendChild(option);
    }
  });

  application.addEventListener('click', (event) => {
    if (event.target.tagName === 'LABEL' || event.target.tagName === 'INPUT') {
      application.querySelectorAll('input').forEach((elem) => {
        elem.checked = false;
      });
      event.target.checked = true;
    }
  });

  evaporators.addEventListener('click', (event) => {
    if (event.target.tagName === 'LABEL' || event.target.tagName === 'INPUT') {
      evaporators.querySelectorAll('input').forEach((elem) => {
        elem.checked = false;
      });
      event.target.checked = true;
    }
  });

  let chillers;

  series.addEventListener('change', (e) => {
    ch.get().then((data) => {
      chillers = data;
      drawModels(models, data);
    });

    imgBlock.style.visibility = 'visible'; //Для демонстрации реализован такой способ, в дальнейшем лучше менять урлы картинок
  });

  calculate.addEventListener('click', () => {
    let request,
      selModels = [];

    for (let i = 0; i < models.options.length; i++) {
      if (models.options[i].selected) {
        selModels.push(models.options[i].value);
      }
    }
    const woc = waterOutChiller.value,
      pf = paramFluid.value,
      oa = outdoorAir.value;
    request = {
      id: selModels,
      waterOutChiller: woc,
      paramFluid: pf,
      outdoorAir: oa,
    };
    ch.calculate(request).then((data) => {
      // console.log(data, tableHTML(data));
      if (data.length) {
        tableContainer.innerHTML = tableHTML(data);
      }
    });
  });

  function drawModels(container, data) {
    for (let i = 0; i < data.length; i++) {
      let option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].id;
      container.append(option);
    }
  }

  function tableHTML(data) {
    let code =
      '\n' +
      '<table class="">\n' +
      '  <thead>\n' +
      '    <tr>\n' +
      '      <th>Model</th>\n' +
      '      <th>CC [kW]</th>\n' +
      '      <th>Pi [kW]</th>\n' +
      '      <th>EER</th>\n' +
      '      <th>Refr</th>\n' +
      '      <th>Price [EUR]</th>\n' +
      '    </tr>\n' +
      '  </thead>\n' +
      '  <tbody>\n';
    for (let i = 0; i < data.length; i++) {
      code += `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].cooling_capacity}</td>
                        <td>${data[i].power}</td>
                        <td>${(
                          data[i].cooling_capacity / data[i].power
                        ).toFixed(2)}</td>
                        <td>R134a</td>
                        <td>${data[i].price}</td>
                    </tr>`;
    }
    code += '  </tbody>\n' + '</table>';
    return code;
  }
};