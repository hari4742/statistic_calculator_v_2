var lowerBound = [];
var upperBound = [];
var frequency = [];
function totalFrequency(arr) {
  let fr = 0;
  for (let val of arr) {
    fr += val;
  }
  return fr;
}
/**
 *
 * @param {Array} lb lower boundary of grouped data
 * @param {Array} ub upper bounday of grouped data
 * @param {Array} freq  frequency of grouped data
 * @returns Mean,Total sum, MidValues
 */
function meanGroupedEx(lb, ub, freq) {
  let md = [];
  let sum = 0;
  for (let i = 0; i < lb.length; i++) {
    md[i] = (lb[i] + ub[i]) / 2;
  }
  for (let i = 0; i < md.length; i++) {
    sum += Number((md[i] * freq[i]).toFixed(3));
  }
  let meanEx = Number(sum / totalFrequency(freq).toFixed(3));
  return [meanEx, sum, md];
}
/**
 *
 * @param {number} x indexOfContainerThatYouWantToDisplay
 */
function selectCalContainer(x) {
  let calContainer = document.getElementsByClassName("cal_container");
  let categories = document.getElementsByClassName("categories");
  categories[0].style.display = "none";
  for (let i = 0; i < calContainer.length; i++) {
    if (i == x) {
      calContainer[i].style.display = "grid";
    }
  }
}
function getBack() {
  let calContainer = document.getElementsByClassName("cal_container");
  let categories = document.getElementsByClassName("categories");
  categories[0].style.display = "grid";
  for (let i = 0; i < calContainer.length; i++) {
    calContainer[i].style.display = "none";
  }
}

function expandDiv(index) {
  let subContainer = document.getElementsByClassName("sub_container");
  let downArrow = document.getElementsByClassName("down");
  for (let i = 0; i < subContainer.length; i++) {
    if (i == index) {
      subContainer[i].classList.toggle("active_sub_container");
      downArrow[i].classList.toggle("active_down");
    } else {
      subContainer[i].classList.remove("active_sub_container");
      downArrow[i].classList.remove("active_down");
    }
  }
}

let calculate = document.getElementsByClassName("calculate");
for (let i = 0; i < calculate.length; i++) {
  calculate[i].addEventListener("click", function () {
    selectCalContainer(i);
  });
}
let back = document.getElementsByClassName("back");
for (let i = 0; i < back.length; i++) {
  back[i].addEventListener("click", function () {
    getBack();
  });
}
let downArrow = document.getElementsByClassName("down");
for (let i = 0; i < downArrow.length; i++) {
  downArrow[i].tabIndex = "1";
  downArrow[i].addEventListener("keypress", () => {
    expandDiv(i);
  });
  downArrow[i].addEventListener("click", function () {
    expandDiv(i);
  });
}

// discrete data mean
/**
 *
 * @param {string} string data as a string
 * @returns mean sum totalFrequency
 */
function meanDiscrete(string) {
  let discreteData = string.split(",");
  let sum = 0;
  let discreteFrequency = discreteData.length;
  for (let num of discreteData) {
    sum += Number(num);
  }
  let mean = sum / discreteFrequency;
  return [mean, sum, discreteFrequency];
}

function reset(child) {
  let input = document.getElementById("discrete_data_mean");
  input.value = "";
  child.parentNode.removeChild(child);
}

let btnDiscreteMean = document.getElementById("btn_discrete_mean");
btnDiscreteMean.addEventListener("click", function () {
  let discreteMeanData = document.getElementById("discrete_data_mean").value;
  let result = meanDiscrete(discreteMeanData);

  let discreteContainer = document.querySelector(".discrete");
  let para = document.createElement("p");
  para.classList.add('result_container');
  para.innerHTML = `<p>Total sum = ${result[1]}</p> <p>Total Values = ${result[2]}</p> <p>Mean = ${result[0]}</p> <p>Click on reset data to enter new data.</p>`;
  if (discreteContainer.lastChild.childNodes.length != 5) {
    discreteContainer.replaceChild(para, discreteContainer.lastChild);
  } else {
    discreteContainer.appendChild(para, discreteContainer.lastChild);
  }
});

let btnResetDataMean = document.getElementById("btn_reset_data");
btnResetDataMean.addEventListener("click", function () {
  let discreteContainer = document.querySelector(".discrete");
  if (discreteContainer.lastChild.childNodes.length == 7) {
    reset(discreteContainer.lastChild);
  }
});

//           Exclusive Mean

let lbInputEx = document.getElementById("lbEx");
let ubInputEx = document.getElementById("ubEx");
let numRowsEx = document.getElementById("rowsEx");
let btnMakeTableEx = document.getElementById("make_table_Ex");
let tableEx = document.getElementById("data_table_Ex_mean");
let check = true;

numRowsEx.onchange = function () {
  if (check == false) {
    alert("click on reset table before you click on make table");
  }
};

btnMakeTableEx.onclick = function () {
  let classLength = Number(ubInputEx.value) - Number(lbInputEx.value);
  for (let i = 0; i < Number(numRowsEx.value); i++) {
    let row = document.createElement("tr");
    row.classList.add("rows");
    row.innerHTML =
      '<td class="lbvalueEx"></td> <td class="ubvalueEx"></td> <td><input type="number" class="frvalueEx"></td> <td class="midvalueEx"></td> <td class="productEx"></td>';
    if (check) {
      tableEx.appendChild(row);
    }
    lowerBound[i] = Number(lbInputEx.value) + classLength * i;
    upperBound[i] = Number(ubInputEx.value) + classLength * i;
  }
  let lbvalues = document.getElementsByClassName("lbvalueEx");
  let ubvalues = document.getElementsByClassName("ubvalueEx");
  for (let i = 0; i < Number(numRowsEx.value); i++) {
    lbvalues[i].innerHTML = lowerBound[i];
    ubvalues[i].innerHTML = upperBound[i];
  }
  check = false;
};

let btnResetTableEx = document.getElementById("btn_reset_table_Ex");
btnResetTableEx.onclick = function () {
  check = true;
  let rows = document.getElementsByClassName("rows");
  if (rows[0] != undefined) {
    for (let i = 0; i < Number(numRowsEx.value); i++) {
      rows[0].remove();
    }
  }
};

let btnCalculateMeanEx = document.getElementById("cal_mean_Ex");
btnCalculateMeanEx.onclick = function () {
  let frvalues = document.getElementsByClassName("frvalueEx");
  for (let i = 0; i < frvalues.length; i++) {
    frequency[i] = Number(frvalues[i].value);
  }
  let result = meanGroupedEx(lowerBound, upperBound, frequency);
  let midvalues = document.getElementsByClassName("midvalueEx");
  let productvalues = document.getElementsByClassName("productEx");
  for (let i = 0; i < Number(numRowsEx.value); i++) {
    midvalues[i].innerHTML = result[2][i];
    productvalues[i].innerHTML = result[2][i] * frequency[i];
  }
  let meanContainerEx = document.querySelector(".groupEx");
  let resultContainerEx = document.createElement("p");
  resultContainerEx.classList.add('result_container');
  resultContainerEx.innerHTML = `<p>Total Sum = ${
    result[1]
  }</p> <p>Total Frequency = ${totalFrequency(frequency)}</p> <p>Mean = ${
    result[0].toFixed(3)
  }</p>`;
  if (meanContainerEx.lastChild.childNodes.length != 5) {
    meanContainerEx.appendChild(resultContainerEx);
  } else {
    meanContainerEx.replaceChild(resultContainerEx, meanContainerEx.lastChild);
  }
};

// Inclusive mean
var lowerBoundIn = [];
var upperBoundIn = [];
var frequencyIn = [];
let lbInputIn = document.getElementById("lbIn");
let ubInputIn = document.getElementById("ubIn");
let numRowsIn = document.getElementById("rowsIn");
let btnMakeTableIn = document.getElementById("make_table_In");
let tableIn = document.getElementById("data_table_In_mean");
var checkIn = true;

btnMakeTableIn.onclick = function () {
  let classLengthIn = Number(ubInputIn.value) - Number(lbInputIn.value);
  for (let i = 0; i < Number(numRowsIn.value); i++) {
    let row = document.createElement("tr");
    row.classList.add("rowsIn");
    row.innerHTML =
      '<td class="lbValueIn"></td> <td class="ubValueIn"></td> <td><input type="number" class="frValueIn"</td> <td class="midValuesIn"></td> <td class="productValuesIn"></td>';
    if (checkIn) {
      tableIn.appendChild(row);
    }
    lowerBoundIn[i] = Number(lbInputIn.value) + (classLengthIn + 1) * i;
    upperBoundIn[i] = Number(ubInputIn.value) + (classLengthIn + 1) * i;
  }
  let lbvaluesIn = document.getElementsByClassName("lbValueIn");
  let ubvaluesIn = document.getElementsByClassName("ubValueIn");
  for (let i = 0; i < Number(numRowsIn.value); i++) {
    lbvaluesIn[i].innerHTML = lowerBoundIn[i];
    ubvaluesIn[i].innerHTML = upperBoundIn[i];
  }
  checkIn = false;
};

let btnResetTableIn = document.getElementById("btn_reset_table_In");
btnResetTableIn.onclick = function () {
  checkIn = true;
  let rows = document.getElementsByClassName("rowsIn");
  if (rows[0] != undefined) {
    for (let i = 0; i < Number(numRowsIn.value); i++) {
      rows[0].remove();
    }
  }
};

let btnCalculateMeanIn = document.getElementById("cal_mean_In");
btnCalculateMeanIn.onclick = function () {
  let frvaluesIn = document.getElementsByClassName("frValueIn");
  for (let i = 0; i < Number(numRowsIn.value); i++) {
    frequencyIn[i] = Number(frvaluesIn[i].value);
  }
  let resultIn = meanGroupedEx(lowerBoundIn, upperBoundIn, frequencyIn);
  let midvaluesIn = document.getElementsByClassName("midValuesIn");
  let productvaluesIn = document.getElementsByClassName("productValuesIn");
  for (let i = 0; i < Number(numRowsIn.value); i++) {
    midvaluesIn[i].innerHTML = resultIn[2][i];
    productvaluesIn[i].innerHTML = resultIn[2][i] * frequencyIn[i];
  }
  let meanContainerIn = document.querySelector(".groupIn");
  let resultContainerIn = document.createElement("p");
  resultContainerIn.classList.add('result_container');
  resultContainerIn.innerHTML = `<p>Total Sum = ${
    resultIn[1]
  }</p> <p>Total Frequency = ${totalFrequency(frequencyIn)}</p> <p>Mean = ${
    resultIn[0]
  }</p>`;
  if (meanContainerIn.lastChild.childNodes.length != 5) {
    meanContainerIn.appendChild(resultContainerIn);
  } else {
    meanContainerIn.replaceChild(resultContainerIn, meanContainerIn.lastChild);
  }
};

//              Median

/**
 *
 * @param {Array} lb lowerboundary
 * @param {Number} clsHeight ClassLength
 * @param {Array} fr Frequency Array
 * @returns {Array} Median CummulativeFr Totalfrequency
 */
function calculateMedian(lb, clsHeight, fr) {
  let cummulativeFrequency = [];
  cummulativeFrequency[0] = fr[0];
  for (let i = 1; i < fr.length; i++) {
    cummulativeFrequency[i] = fr[i] + cummulativeFrequency[i - 1];
  }
  let N = totalFrequency(fr);
  function midClassIndex(cf, n) {
    for (let i = 0; i < cf.length; i++) {
      if (n / 2 < cf[i]) {
        return i;
      }
    }
  }
  let midIndex = midClassIndex(cummulativeFrequency, N);
  let MedianEx =
    lb[midIndex] +
    (clsHeight * (N / 2 - cummulativeFrequency[midIndex - 1])) / fr[midIndex];
  return [MedianEx, cummulativeFrequency, N];
}

/**
 *
 * @param {Array} lb lowerboundary
 * @param {Number} clsHeight ClassLength
 * @param {Array} fr Frequency Array
 */
function calculateMedianIn(lb, clsHeight, fr) {
  let cummulativeFrequency = [];
  cummulativeFrequency[0] = fr[0];
  for (let i = 1; i < fr.length; i++) {
    cummulativeFrequency[i] = fr[i] + cummulativeFrequency[i - 1];
  }
  let N = totalFrequency(fr);
  function midClassIndex(cf, n) {
    for (let i = 0; i < cf.length; i++) {
      if (n / 2 < cf[i]) {
        return i;
      }
    }
  }
  let midIndex = midClassIndex(cummulativeFrequency, N);
  let MedianEx =
    lb[midIndex] -
    0.5 +
    ((clsHeight + 1) * (N / 2 - cummulativeFrequency[midIndex - 1])) /
      fr[midIndex];
  return [MedianEx, cummulativeFrequency, N];
}
// discrete data median

let btnDiscreteMedian = document.getElementById("btn_discrete_median");
let discreteDataMedianArr = [];
let discreteMedian = 0;
btnDiscreteMedian.onclick = function () {
  let discreteDataMedian = document.getElementById(
    "discrete_data_median"
  ).value;
  discreteDataMedianArr = discreteDataMedian.split(",");
  let asdOrder = discreteDataMedianArr.sort(function (a, b) {
    return Number(a) - Number(b);
  });
  if (discreteDataMedianArr.length % 2 == 0) {
    discreteMedian =
      (Number(asdOrder[discreteDataMedianArr.length / 2 - 1]) +
        Number(asdOrder[discreteDataMedianArr.length / 2])) /
      2;
  } else {
    discreteMedian = asdOrder[(discreteDataMedianArr.length + 1) / 2 - 1];
  }
  let resultDiscreteMedianContainer = document.createElement("p");
  resultDiscreteMedianContainer.classList.add("result_median_container");
  resultDiscreteMedianContainer.classList.add('result_container');
  resultDiscreteMedianContainer.innerHTML = `<p>Ascending Order = ${asdOrder}</p> <p>Median = ${discreteMedian}</p>`;
  let discreteMedianContainer = document.getElementById(
    "discrete_median_container"
  );
  if (discreteMedianContainer.lastChild.childNodes.length != 3) {
    discreteMedianContainer.appendChild(resultDiscreteMedianContainer);
  } else {
    discreteMedianContainer.replaceChild(
      resultDiscreteMedianContainer,
      discreteMedianContainer.lastChild
    );
  }
};

let btnResetDiscreteMedian = document.getElementById("btn_reset_median");
btnResetDiscreteMedian.onclick = function () {
  let discreteDataMedian = document.getElementById("discrete_data_median");
  discreteDataMedian.value = "";
  let discreteMedianContainer = document.getElementById(
    "discrete_median_container"
  );
  if (discreteMedianContainer.lastChild.childNodes.length == 3) {
    let childContainer = document.querySelector(".result_median_container");
    childContainer.parentNode.removeChild(childContainer);
  }
};

//      Exclusive Grouped Data Median

let lbInputMedianEx = document.getElementById("lbMedianEx");
let ubInputMedianEx = document.getElementById("ubMedianEx");
let numRowsMedianEx = document.getElementById("rowsMedianEx");
let btnMakeTableMedianEx = document.getElementById("make_table_median_Ex");
let tableMedianEx = document.getElementById("data_table_Ex_median");
let checkMedianEx = true;
let lowerBoundMedianEx = [];
let upperBoundMedianEx = [];
let frequencyMedianEx = [];

numRowsMedianEx.onchange = function () {
  if (checkMedianEx == false) {
    alert("click on reset table before you click on make table");
  }
};

btnMakeTableMedianEx.onclick = function () {
  let classLength =
    Number(ubInputMedianEx.value) - Number(lbInputMedianEx.value);
  for (let i = 0; i < Number(numRowsMedianEx.value); i++) {
    let row = document.createElement("tr");
    row.classList.add("rowsMedianEx");
    row.innerHTML =
      '<td class="lbvaluesMedianEx"></td> <td class="ubvaluesMedianEx"></td> <td><input type="number" class="frvaluesMedianEx"></td> <td class="CumFrMedianEx"></td> ';
    if (checkMedianEx) {
      tableMedianEx.appendChild(row);
    }
    lowerBoundMedianEx[i] = Number(lbInputMedianEx.value) + classLength * i;
    upperBoundMedianEx[i] = Number(ubInputMedianEx.value) + classLength * i;
  }
  let lbvaluesMedianEx = document.getElementsByClassName("lbvaluesMedianEx");
  let ubvaluesMedianEx = document.getElementsByClassName("ubvaluesMedianEx");
  for (let i = 0; i < Number(numRowsMedianEx.value); i++) {
    lbvaluesMedianEx[i].innerHTML = lowerBoundMedianEx[i];
    ubvaluesMedianEx[i].innerHTML = upperBoundMedianEx[i];
  }
  checkMedianEx = false;
};

let btnResetTableMedianEx = document.getElementById(
  "btn_reset_table_Median_Ex"
);
btnResetTableMedianEx.onclick = function () {
  checkMedianEx = true;
  let rows = document.getElementsByClassName("rowsMedianEx");
  if (rows[0] != undefined) {
    for (let i = 0; i < Number(numRowsMedianEx.value); i++) {
      rows[0].remove();
    }
  }
};

let btnCalculateMedianEx = document.getElementById("cal_Medina_Ex");
btnCalculateMedianEx.onclick = function () {
  let frvaluesMedianEx = document.getElementsByClassName("frvaluesMedianEx");
  for (let i = 0; i < frvaluesMedianEx.length; i++) {
    frequencyMedianEx[i] = Number(frvaluesMedianEx[i].value);
  }
  let classLength =
    Number(ubInputMedianEx.value) - Number(lbInputMedianEx.value);

  let result = calculateMedian(
    lowerBoundMedianEx,
    classLength,
    frequencyMedianEx
  );
  let cumFrValuesEx = document.getElementsByClassName("CumFrMedianEx");
  for (let i = 0; i < Number(numRowsMedianEx.value); i++) {
    cumFrValuesEx[i].innerHTML = result[1][i];
  }
  let medianContainerEx = document.querySelector("#medianContainer");
  medianContainerEx.classList.add('result_container');
  let resultContainerEx = document.createElement("p");
  resultContainerEx.innerHTML = `<p>Total Frequency = ${result[2]}</p> <p>Median = ${result[0]}</p>`;
  if (medianContainerEx.lastChild.childNodes.length != 3) {
    medianContainerEx.appendChild(resultContainerEx);
  } else {
    medianContainerEx.replaceChild(
      resultContainerEx,
      medianContainerEx.lastChild
    );
  }
};

//          Inclusive Class Median

let lbInputMedianIn = document.getElementById("lbMedianIn");
let ubInputMedianIn = document.getElementById("ubMedianIn");
let numRowsMedianIn = document.getElementById("rowsMedianIn");
let btnMakeTableMedianIn = document.getElementById("make_table_median_In");
let tableMedianIn = document.getElementById("data_table_In_median");
let checkMedianIn = true;
let lowerBoundMedianIn = [];
let upperBoundMedianIn = [];
let frequencyMedianIn = [];

numRowsMedianIn.onchange = function () {
  if (checkMedianIn == false) {
    alert("click on reset table before you click on make table");
  }
};

btnMakeTableMedianIn.onclick = function () {
  let classLength =
    Number(ubInputMedianIn.value) - Number(lbInputMedianIn.value);
  for (let i = 0; i < Number(numRowsMedianIn.value); i++) {
    let row = document.createElement("tr");
    row.classList.add("rowsMedianIn");
    row.innerHTML =
      '<td class="lbvaluesMedianIn"></td> <td class="ubvaluesMedianIn"></td> <td><input type="number" class="frvaluesMedianIn"></td> <td class="CumFrMedianIn"></td> ';
    if (checkMedianIn) {
      tableMedianIn.appendChild(row);
    }
    lowerBoundMedianIn[i] =
      Number(lbInputMedianIn.value) + (classLength + 1) * i;
    upperBoundMedianIn[i] =
      Number(ubInputMedianIn.value) + (classLength + 1) * i;
  }
  let lbvaluesMedianIn = document.getElementsByClassName("lbvaluesMedianIn");
  let ubvaluesMedianIn = document.getElementsByClassName("ubvaluesMedianIn");
  for (let i = 0; i < Number(numRowsMedianIn.value); i++) {
    lbvaluesMedianIn[i].innerHTML = lowerBoundMedianIn[i];
    ubvaluesMedianIn[i].innerHTML = upperBoundMedianIn[i];
  }
  checkMedianIn = false;
};

let btnResetTableMedianIn = document.getElementById(
  "btn_reset_table_Median_In"
);
btnResetTableMedianIn.onclick = function () {
  checkMedianIn = true;
  let rows = document.getElementsByClassName("rowsMedianIn");
  if (rows[0] != undefined) {
    for (let i = 0; i < Number(numRowsMedianIn.value); i++) {
      rows[0].remove();
    }
  }
};

let btnCalculateMedianIn = document.getElementById("cal_Median_In");
btnCalculateMedianIn.onclick = function () {
  let frvaluesMedianIn = document.getElementsByClassName("frvaluesMedianIn");
  for (let i = 0; i < frvaluesMedianIn.length; i++) {
    frequencyMedianIn[i] = Number(frvaluesMedianIn[i].value);
  }
  let classLength =
    Number(ubInputMedianIn.value) - Number(lbInputMedianIn.value);

  let result = calculateMedianIn(
    lowerBoundMedianIn,
    classLength,
    frequencyMedianIn
  );
  let cumFrValuesIn = document.getElementsByClassName("CumFrMedianIn");
  for (let i = 0; i < Number(numRowsMedianIn.value); i++) {
    cumFrValuesIn[i].innerHTML = result[1][i];
  }
  let medianContainerIn = document.querySelector("#medianContainerIn");
  let resultContainerIn = document.createElement("p");
  resultContainerIn.innerHTML = `<p>Total Frequency = ${result[2]}</p> <p>Median = ${result[0]}</p>`;
  if (medianContainerIn.lastChild.childNodes.length != 3) {
    medianContainerIn.appendChild(resultContainerIn);
  } else {
    medianContainerIn.replaceChild(
      resultContainerIn,
      medianContainerIn.lastChild
    );
  }
};

//              STANDARD DEVIATION AND VARIANCE

// Discrete Data
/**
 *
 * @param {string} string data as a string
 * @returns stdDev,Variance,mean,totalValues
 */
function stdDiscrete(string) {
  let discreteData = string.split(",");
  let mean = meanDiscrete(string);
  let sum = 0;
  for (let i = 0; i < discreteData.length; i++) {
    sum += Math.pow(Number(discreteData[i]) - mean[0], 2);
  }
  let variance = sum / discreteData.length;
  let stdDev = Math.sqrt(variance);
  return [stdDev, variance, mean[0], mean[2]];
}

let popStd = document.getElementById("pop");
let sampleStd = document.getElementById("sam");
let noteData = document.getElementById("noteData");
let stdDiscreteData = document.getElementById("discrete_data_std");
let btnClaculateStdDiscrete = document.getElementById("btn_discrete_std");
let btnSubmitData = document.getElementById("btn_submit_data");
btnSubmitData.onclick = function () {
  if (popStd.checked == true) {
    noteData.innerText = "You have selected Population Data.";
  } else if (sampleStd.checked == true) {
    noteData.innerText = "You have selected Sample Data.";
  }
};
btnClaculateStdDiscrete.onclick = function () {
  let stdResult = stdDiscrete(stdDiscreteData.value);
  let stdDiscreteResultContainer = document.createElement("p");
  stdDiscreteResultContainer.classList.add('result_container');
  if (popStd.checked == true) {
    stdDiscreteResultContainer.innerHTML = `<p>Total Values= ${stdResult[3]}</p> <p>Mean = ${stdResult[2]}</p> <p>Variance = ${stdResult[1]}</p> <p>Standard Deviation = ${stdResult[0]}</p>`;
  } else if (sampleStd.checked == true) {
    stdDiscreteResultContainer.innerHTML = `<p>Total Values= ${
      stdResult[3]
    }</p> <p>Mean = ${stdResult[2]}</p> <p>Variance = ${
      (stdResult[1] * stdResult[3]) / (stdResult[3] - 1)
    }</p> <p>Standard Deviation = ${Math.sqrt(
      (stdResult[1] * stdResult[3]) / (stdResult[3] - 1)
    )}</p>`;
  }
  let stdDiscreteContainer = document.getElementById("std_discrete_container");
  if (stdDiscreteContainer.lastChild.childNodes.length == 7) {
    stdDiscreteContainer.replaceChild(
      stdDiscreteResultContainer,
      stdDiscreteContainer.lastChild
    );
  } else {
    stdDiscreteContainer.appendChild(stdDiscreteResultContainer);
  }
};

let btnResetStdDiscrete = document.getElementById("btn_reset_data_std");
btnResetStdDiscrete.onclick = function () {
  stdDiscreteData.value = "";
};

//          Type Of Class

let ExStd = document.getElementById("ExStd");
let InStd = document.getElementById("InStd");
let btnMakeTableStdEx = (document.getElementById(
  "make_table_Std_Ex"
).disabled = true);

let classSelected = false;
let btnSumbitCls = document.getElementById("btn_submit_cls");
btnSumbitCls.onclick = function () {
  btnMakeTableStdEx = document.getElementById(
    "make_table_Std_Ex"
  ).disabled = false;

  let note = document.getElementById("note");
  if (ExStd.checked == true) {
    classSelected = true;
    note.innerText = "You Have Selected Exclusive Classes";
  } else if (InStd.checked == true) {
    classSelected = true;
    note.innerText = "You Have Selected Inclusive Classes";
  } else {
    alert("Please select Which type of class you want.");
  }
};

//              Std Grouped Exclusive Data
let lbValuesStdEx = [];
let ubValuesStdEx = [];
let frequencyStdEx = [];
let lbInputStdEx = document.getElementById("std_lb_inputEx");
let ubInputStdEx = document.getElementById("std_ub_inputEx");
let numRowsStdEx = document.getElementById("rowsStdEx");
btnMakeTableStdEx = document.getElementById("make_table_Std_Ex");
let tableStdEx = document.getElementById("data_table_Ex_Std");
let checkStdEx = true;

numRowsStdEx.onchange = function () {
  if (checkStdEx == false) {
    alert("click on reset table before you click on make table");
  }
};

btnMakeTableStdEx.onclick = function () {
  let classLengthStd = Number(ubInputStdEx.value) - Number(lbInputStdEx.value);
  for (let i = 0; i < Number(numRowsStdEx.value); i++) {
    let row = document.createElement("tr");
    row.classList.add("rowsStdEx");
    row.innerHTML =
      '<td class="lbvalueStdEx"></td> <td class="ubvalueStdEx"></td> <td><input type="number" class="frvalueStdEx"></td> <td class="midvalueStdEx"></td> <td class="productStdEx"></td>';
    if (checkStdEx) {
      tableStdEx.appendChild(row);
    }

    if (ExStd.checked == true) {
      lbValuesStdEx[i] = Number(lbInputStdEx.value) + classLengthStd * i;
      ubValuesStdEx[i] = Number(ubInputStdEx.value) + classLengthStd * i;
    } else if (InStd.checked == true) {
      lbValuesStdEx[i] =
        Number(lbInputStdEx.value) + (classLengthStd + 1) * i - 0.5;
      ubValuesStdEx[i] =
        Number(ubInputStdEx.value) + (classLengthStd + 1) * i + 0.5;
    }
  }
  let lbvalues = document.getElementsByClassName("lbvalueStdEx");
  let ubvalues = document.getElementsByClassName("ubvalueStdEx");
  for (let i = 0; i < Number(numRowsStdEx.value); i++) {
    lbvalues[i].innerHTML = lbValuesStdEx[i];
    ubvalues[i].innerHTML = ubValuesStdEx[i];
  }
  checkStdEx = false;
};

let btnResetTableStdEx = document.getElementById("btn_reset_table_Std_Ex");
btnResetTableStdEx.onclick = function () {
  checkStdEx = true;

  let rowsStdEx = document.getElementsByClassName("rowsStdEx");
  if (rowsStdEx[0] != undefined) {
    for (let i = 0; i < Number(numRowsStdEx.value); i++) {
      rowsStdEx[0].remove();
    }
  }
};

let btnCalculateStdEx = document.getElementById("cal_Std_Ex");
btnCalculateStdEx.onclick = function () {
  let frvalues = document.getElementsByClassName("frvalueStdEx");
  for (let i = 0; i < frvalues.length; i++) {
    frequencyStdEx[i] = Number(frvalues[i].value);
  }
  let result = meanGroupedEx(lbValuesStdEx, ubValuesStdEx, frequencyStdEx);
  let midvalues = document.getElementsByClassName("midvalueStdEx");
  let productvalues = document.getElementsByClassName("productStdEx");
  let stdSumEx = 0;
  for (let i = 0; i < Number(numRowsStdEx.value); i++) {
    midvalues[i].innerHTML = result[2][i];
    productvalues[i].innerHTML = (
      Math.pow(result[2][i] - result[0], 2) * frequencyStdEx[i]
    ).toFixed(3);
    stdSumEx += Number(
      (Math.pow(result[2][i] - result[0], 2) * frequencyStdEx[i]).toFixed(3)
    );
  }
  let StdContainerEx = document.getElementById("std_Ex_Container");
  let resultContainerStdEx = document.createElement("p");
  resultContainerStdEx.classList.add('result_container');
  let VarianceEx = Number(stdSumEx / totalFrequency(frequencyStdEx).toFixed(3));
  let stdDeviationEx = Math.sqrt(VarianceEx).toFixed(3);
  resultContainerStdEx.innerHTML = `<p>Total Frequency = ${totalFrequency(
    frequencyStdEx
  )}</p> <p>Mean=${result[0].toFixed(3)}</p> <p>Variance = ${VarianceEx.toFixed(
    2
  )}</p>  <p>Standard Deviation = ${stdDeviationEx}</p>`;
  if (StdContainerEx.lastChild.childNodes.length != 7) {
    StdContainerEx.appendChild(resultContainerStdEx);
  } else {
    StdContainerEx.replaceChild(resultContainerStdEx, StdContainerEx.lastChild);
  }
};

//          Combined Standard Deviation

let btnCalStdComb = document.getElementById("cal_Std_Comb");
btnCalStdComb.onclick = function () {
  let n1 = document.getElementById("n1").value;
  let n2 = document.getElementById("n2").value;
  let x1 = document.getElementById("x1").value;
  let x2 = document.getElementById("x2").value;
  let s1 = document.getElementById("s1").value;
  let s2 = document.getElementById("s2").value;
  let x =
    (Number(n1) * Number(x1) + Number(n2) * Number(x2)) /
    (Number(n1) + Number(n2));
  let d1 = Number(x1) - Number(x);
  let d2 = Number(x2) - Number(x);
  let combVar =
    (Number(n1) * (Math.pow(Number(s1), 2) + Math.pow(Number(d1), 2)) +
      Number(n2) * (Math.pow(Number(s2), 2) + Math.pow(Number(d2), 2))) /
    (Number(n1) + Number(n2));
  let combStd = Math.sqrt(combVar);
  let combStdresultContainer = document.createElement("p");
  combStdresultContainer.classList.add('result_container');
  combStdresultContainer.innerHTML = `<p>Combined Mean = ${x.toFixed(
    3
  )}</p> <p>Combined Variance = ${combVar.toFixed(
    3
  )}</p> <p>Combined S.D = ${combStd.toFixed(3)}</p> `;
  let StdcombContainer = document.querySelector(".StdComb");
  if (StdcombContainer.lastChild.childNodes.length != 6) {
    StdcombContainer.appendChild(combStdresultContainer);
  } else {
    StdcombContainer.replaceChild(
      combStdresultContainer,
      StdcombContainer.lastChild
    );
  }
};

let btnResetStdcomb = document.getElementById("btn_reset_data_Std_comb");
btnResetStdcomb.onclick = function () {
  let StdCombInput = document.getElementsByClassName("StdCombInput");
  for (let i = 0; i < StdCombInput.length; i++) {
    StdCombInput[i].value = "";
  }
};

//                         MOMENTS

let discreteMomentContainer = document.getElementById(
  "discrete_moments_container"
);
let discreteMomentInput = document.getElementById("discrete_data_moments");
let btnDiscreteMoments = document.getElementById("btn_discrete_moments");
let btnResetDataMoments = document.getElementById("btn_reset_moments");

btnDiscreteMoments.onclick = function () {
  let disMomentData = discreteMomentInput.value.split(",");
  let momentMean = meanDiscrete(discreteMomentInput.value);
  let sumdisM1 = 0;
  let sumdisM2 = 0;
  let sumdisM3 = 0;
  let sumdisM4 = 0;
  for (num of disMomentData) {
    sumdisM1 += Math.pow(Number(num) - momentMean[0], 1);
    sumdisM2 += Math.pow(Number(num) - momentMean[0], 2);
    sumdisM3 += Math.pow(Number(num) - momentMean[0], 3);
    sumdisM4 += Math.pow(Number(num) - momentMean[0], 4);
  }
  let N = disMomentData.length;
  let disMomentsResultContainer = document.createElement("p");
  disMomentsResultContainer.classList.add('result_container');
  disMomentsResultContainer.innerHTML = `<p>Moments about Mean</p> <p>Mean =${
    momentMean[0]
  }</p> <p>First Moment(&#956<sub>1</sub>) =${(sumdisM1 / N).toFixed(
    3
  )}</p> <p>Second Moment(&#956<sub>2</sub>) = ${(sumdisM2 / N).toFixed(
    3
  )}</p> <p>Third Moment(&#956<sub>3</sub>) = ${(sumdisM3 / N).toFixed(
    3
  )}</p> <p>Fourth Moment(&#956<sub>4</sub>) = ${(sumdisM4 / N).toFixed(
    3
  )}</p>`;
  if (discreteMomentContainer.lastChild.childNodes.length != 11) {
    discreteMomentContainer.appendChild(disMomentsResultContainer);
  } else {
    discreteMomentContainer.replaceChild(
      disMomentsResultContainer,
      discreteMomentContainer.lastChild
    );
  }
};

//          Grouped Data

let ExMomentCls = document.getElementById("ExMoment");
let InMomentCls = document.getElementById("InMoment");
let btnTypeClsMoment = document.getElementById("btn_submit_moment");
let noteTypeCls = document.getElementById("noteMoment");
let btnMakeTableMoment = document.getElementById("make_table_Moment");
btnMakeTableMoment.disabled = true;

btnTypeClsMoment.onclick = function () {
  if (ExMomentCls.checked == true) {
    noteTypeCls.innerHTML = "You have Selected <b>Exclusive Classes</b>.";
    btnMakeTableMoment.disabled = false;

  } else if (InMomentCls.checked == true) {
    noteTypeCls.innerHTML = "You have Selected <b>Inclusive Classes</b>.";
    btnMakeTableMoment.disabled = false;
  }
};

let lbValuesMoment = [];
let ubValuesMoment = [];
let frequencyMoment = [];
let lbInputMoment = document.getElementById("moment_lb_input");
let ubInputMoment = document.getElementById("moment_ub_input");
let numRowsMoment = document.getElementById("rowsMoment");
let tableMoment = document.getElementById("data_table_Moment");
let checkMoment = true;

numRowsMoment.onchange = function () {
  if (checkMoment == false) {
    alert("click on reset table before you click on make table.");
  }
};

btnMakeTableMoment.onclick = function () {
  let classLengthMoment =
    Number(ubInputMoment.value) - Number(lbInputMoment.value);
  for (let i = 0; i < Number(numRowsMoment.value); i++) {
    let row = document.createElement("tr");
    row.classList.add("rowsClsMoment");
    row.innerHTML =
      '<td class="lbvalueMoment"></td> <td class="ubvalueMoment"></td> <td><input type="number" class="frvalueMoment"></td> <td class="midvalueMoment"></td> <td class="productFirstMoment"></td> <td class="productSecondMoment"></td> <td class="productThirdMoment"></td> <td class="productFourthMoment"></td>';
    if (checkMoment) {
      tableMoment.appendChild(row);
    }

    if (ExMomentCls.checked == true) {
      lbValuesMoment[i] = Number(lbInputMoment.value) + classLengthMoment * i;
      ubValuesMoment[i] = Number(ubInputMoment.value) + classLengthMoment * i;
    } else if (InMomentCls.checked == true) {
      lbValuesMoment[i] =
        Number(lbInputMoment.value) + (classLengthMoment + 1) * i - 0.5;
      ubValuesMoment[i] =
        Number(ubInputMoment.value) + (classLengthMoment + 1) * i + 0.5;
    }
  }
  let lbvalues = document.getElementsByClassName("lbvalueMoment");
  let ubvalues = document.getElementsByClassName("ubvalueMoment");
  for (let i = 0; i < Number(numRowsMoment.value); i++) {
    lbvalues[i].innerHTML = lbValuesMoment[i];
    ubvalues[i].innerHTML = ubValuesMoment[i];
  }
  checkMoment = false;
};

let btnResetTableMoment = document.getElementById("btn_reset_table_Moment");
btnResetTableMoment.onclick = function () {
  checkMoment = true;

  let rowsClsMoment = document.getElementsByClassName("rowsClsMoment");
  if (rowsClsMoment[0] != undefined) {
    for (let i = 0; i < Number(numRowsMoment.value); i++) {
      rowsClsMoment[0].remove();
    }
  }
};

let btnCalculateMoment = document.getElementById("cal_Moment_grp");
btnCalculateMoment.onclick = function () {
  let frvalues = document.getElementsByClassName("frvalueMoment");
  for (let i = 0; i < frvalues.length; i++) {
    frequencyMoment[i] = Number(frvalues[i].value);
  }
  let result = meanGroupedEx(lbValuesMoment, ubValuesMoment, frequencyMoment);
  let midvalues = document.getElementsByClassName("midvalueMoment");
  let firstMoment = document.getElementsByClassName("productFirstMoment");
  let secondMoment = document.getElementsByClassName("productSecondMoment");
  let thirdMoment = document.getElementsByClassName("productThirdMoment");
  let fourthMoment = document.getElementsByClassName("productFourthMoment");
  let sum1stM = 0;
  let sum2ndM = 0;
  let sum3rdM = 0;
  let sum4thM = 0;
  let N = totalFrequency(frequencyMoment);
  for (let i = 0; i < Number(numRowsMoment.value); i++) {
    midvalues[i].innerHTML = result[2][i];
    firstMoment[i].innerHTML =
      frequencyMoment[i] * Math.pow(result[2][i] - result[0], 1);
    secondMoment[i].innerHTML =
      frequencyMoment[i] * Math.pow(result[2][i] - result[0], 2);
    thirdMoment[i].innerHTML =
      frequencyMoment[i] * Math.pow(result[2][i] - result[0], 3);
    fourthMoment[i].innerHTML =
      frequencyMoment[i] * Math.pow(result[2][i] - result[0], 4);
    sum1stM += frequencyMoment[i] * Math.pow(result[2][i] - result[0], 1);
    sum2ndM += frequencyMoment[i] * Math.pow(result[2][i] - result[0], 2);
    sum3rdM += frequencyMoment[i] * Math.pow(result[2][i] - result[0], 3);
    sum4thM += frequencyMoment[i] * Math.pow(result[2][i] - result[0], 4);
  }
  let momentResultContainer = document.createElement("p");
  momentResultContainer.classList.add('result_container');
  momentResultContainer.innerHTML = `<p>First Four Moments About Mean</p>
                                        <p>Mean = ${result[0]}</p> 
                                        <p>First Moment(&#956<sub>1</sub>) =${
                                          sum1stM / N
                                        }</p>
                                        <p>Second Moment(&#956<sub>2</sub>) =${
                                          sum2ndM / N
                                        }</p>
                                        <p>Third Moment(&#956<sub>3</sub>) =${
                                          sum3rdM / N
                                        }</p>
                                        <p>Fourth Moment(&#956<sub>4</sub>) =${
                                          sum4thM / N
                                        }</p>`;
  let momentGrpContainer = document.getElementById("Moments_grp_Container");
  if (momentGrpContainer.lastChild.childNodes.length != 11) {
    momentGrpContainer.appendChild(momentResultContainer);
  } else {
    momentGrpContainer.replaceChild(
      momentResultContainer,
      momentGrpContainer.lastChild
    );
  }
};

//              Moment Formulae

//          moment about point(MAP)

let mapm = document.getElementById("MAPM");
let mapPoint = document.getElementById("point");
let mapm1 = 0;
let mapm2 = document.getElementById("MAPM2");
let mapm3 = document.getElementById("MAPM3");
let mapm4 = document.getElementById("MAPM4");
let btnCalMap = document.getElementById("cal_MAP");
let btnResetMap = document.getElementById("btn_reset_MAP");

btnCalMap.onclick = function () {
  let map1stM = Number(mapm.value) - Number(mapPoint.value);
  let map2ndM = Number(mapm2.value) + Math.pow(map1stM, 2);
  let map3rdM =
    Number(mapm3.value) +
    3 * Number(mapm2.value) * map1stM +
    Math.pow(map1stM, 3);
  let map4thM =
    Number(mapm4.value) +
    4 * Number(mapm3.value) * map1stM +
    6 * Number(mapm2.value) * Math.pow(map1stM, 2) +
    Math.pow(map1stM, 4);
  let mapResultContainer = document.createElement("p");
  mapResultContainer.classList.add('result_container');
  mapResultContainer.innerHTML = `<p>Moments about the point ${mapPoint.value} are: </p> 
                                    <p>First Moment(&#956'<sub>1</sub>) = ${map1stM}</p> 
                                    <p>Second Moment(&#956'<sub>2</sub>) = ${map2ndM}</p> 
                                    <p>Third Moment(&#956'<sub>3</sub>) = ${map3rdM}</p> 
                                    <p>Fourth Moment(&#956'<sub>4</sub>) = ${map4thM}</p>`;
  let mapContainer = document.getElementById("mapContainer");
  if (mapContainer.lastChild.childNodes.length != 9) {
    mapContainer.appendChild(mapResultContainer);
  } else {
    mapContainer.replaceChild(mapResultContainer, mapContainer.lastChild);
  }
};

btnResetMap.onclick = function () {
  let mapInputs = document.getElementsByClassName("map_input");
  for (input of mapInputs) {
    input.value = "";
  }
};

//          Moments about mean(MAM)

let mamPoint = document.getElementById("pointMam");
let mamm1 = document.getElementById("MAMM1");
let mamm2 = document.getElementById("MAMM2");
let mamm3 = document.getElementById("MAMM3");
let mamm4 = document.getElementById("MAMM4");
let btnCalMam = document.getElementById("cal_MAM");
let btnResetMam = document.getElementById("btn_reset_MAM");

btnCalMam.onclick = function () {
  let mamMean = 0;
  let mam1stM = 0;
  let mam2ndM = Number(mamm2.value) - Math.pow(Number(mamm1.value), 2);
  let mam3rdM =
    Number(mamm3.value) -
    3 * Number(mamm2.value) * Number(mamm1.value) +
    2 * Math.pow(Number(mamm1.value), 3);
  let mam4thM =
    Number(mamm4.value) -
    4 * Number(mamm3.value) * Number(mamm1.value) +
    6 * Number(mamm2.value) * Math.pow(Number(mamm1.value), 2) -
    3 * Math.pow(Number(mamm1.value), 4);
  if (mamPoint.value == "") {
    mamMean = "Enter 'A' value to calculate Mean.";
  } else {
    mamMean = Number(mamPoint.value) + Number(mamm1.value);
  }
  let mamResultContainer = document.createElement("p");
  mamResultContainer.classList.add('result_container');
  mamResultContainer.innerHTML = `<p>Moments about Mean are: </p>
                                    <p> First Moment(&#956<sub>1</sub>) = ${mam1stM}</p>
                                    <p> Second Moment(&#956<sub>2</sub>) =${mam2ndM}</p>
                                    <p> Third Moment(&#956<sub>3</sub>) =${mam3rdM}</p>
                                    <p> Fourth Moment(&#956<sub>4</sub>) =${mam4thM}</p>
                                    <p> Mean = ${mamMean}</p>`;
  let mamContainer = document.getElementById("mamContainer");
  if (mamContainer.lastChild.childNodes.length != 11) {
    mamContainer.appendChild(mamResultContainer);
  } else {
    mamContainer.replaceChild(mamResultContainer, mamContainer.lastChild);
  }
};
btnResetMam.onclick = function () {
  let mamInputs = document.getElementsByClassName("mam_input");
  for (input of mamInputs) {
    input.value = "";
  }
};

//                      MODE
/**
 *
 * @param {string} string data as a string seperated by ','
 * @returns Mode as a array
 */
function modeDis(string) {
  disData = string.split(",");
  let FrData = {};
  FrDatalen = 0;
  for (let i = 0; i < disData.length; i++) {
    let rep = 0;
    for (num of disData) {
      if (disData[i] == num) {
        rep++;
      }
    }
    FrData[disData[i]] = rep;
  }
  let highFr = [];
  let FrCount = FrData[disData[0]];
  for (let num in FrData) {
    if (FrData[num] == FrCount) {
      highFr.push(num);
    } else if (FrData[num] > FrCount) {
      while (highFr.length != 0) {
        highFr.pop();
      }
      FrCount = FrData[num];
      highFr.push(num);
    }
  }
  // calculating the length of the dictionary
  for (n in FrData) {
    FrDatalen++;
  }
  // checking if every is repeated the same time or not
  if (highFr.length == FrDatalen) {
    return 0;
  } else {
    return highFr;
  }
}

//          Discrete Mode
let modeDiscreteData = document.getElementById("discrete_data_mode");
let modeDiscreteDataContainer = document.getElementById(
  "discrete_mode_container"
);
let btnCalModeDis = document.getElementById("btn_discrete_mode");
let btnResetModeDis = document.getElementById("btn_reset_mode");

btnCalModeDis.onclick = function () {
  let resultModeDis = modeDis(modeDiscreteData.value);
  let modDisResultContainer = document.createElement("p");
  if (resultModeDis != 0) {
    modDisResultContainer.innerHTML = `Mode = ${resultModeDis}`;
  } else {
    modDisResultContainer.innerText = "There is no Mode in the Given data.";
  }
  if (modeDiscreteDataContainer.lastChild.childNodes.length != 1) {
    modeDiscreteDataContainer.appendChild(modDisResultContainer);
  } else {
    modeDiscreteDataContainer.replaceChild(
      modDisResultContainer,
      modeDiscreteDataContainer.lastChild
    );
  }
};
btnResetModeDis.onclick = function () {
  modeDiscreteData.value = "";
};
/**
 *
 * @param {Array} lbarr Lower Boundaries
 * @param {Array} frarr Upper Boundaries
 * @param {Number} clsLen Class Height
 * @returns Mode
 */

function modeGrp(lbarr, frarr, clsLen) {
  let maxFrindex = 0;
  let frLen = frarr.length;
  for (num of frarr) {
    if (num > frarr[maxFrindex]) {
      maxFrindex = frarr.indexOf(num);
    }
  }
  let f1 = frarr[maxFrindex];
  let f0 = 0;
  let f2 = 0;
  if (maxFrindex != frLen - 1) {
    f2 = frarr[maxFrindex + 1];
  }
  if (maxFrindex != 0) {
    f0 = frarr[maxFrindex - 1];
  }
  let mode = lbarr[maxFrindex] + ((f1 - f0) / (2 * f1 - f0 - f2)) * clsLen;
  return mode;
}

//          Grouped Data
let modeExCls = document.getElementById("ExMode");
let modeInCls = document.getElementById("InMode");
let modeNoteCls = document.getElementById("noteMode");
let btnOkClsMode = document.getElementById("btn_submit_cls_mode");
btnOkClsMode.onclick = function () {
  if (modeExCls.checked == true) {
    modeNoteCls.innerHTML = "You have selected <b>Exclusive </b>Classes.";
  } else if (modeInCls.checked == true) {
    modeNoteCls.innerHTML = "You have selected <b>Inclusive </b>Classes.";
  }
};
lbvaluesModeGrp = [];
ubvaluesModeGrp = [];
frvaluesModeGrp = [];
cumFrModeGrp = [];
checkModeGrp = true;
let modeLbInput = document.getElementById("mode_lb_inputGrp");
let modeUbInput = document.getElementById("mode_ub_inputGrp");
let modeRowsInput = document.getElementById("rowsModeGrp");
let modeTableGrp = document.getElementById("data_table_ModeGrp");
let btnMakeTableModeGrp = document.getElementById("make_table_ModeGrp");
btnMakeTableModeGrp.onclick = function () {
  let classLengthMode = Number(modeUbInput.value) - Number(modeLbInput.value);
  for (let i = 0; i < Number(modeRowsInput.value); i++) {
    let row = document.createElement("tr");
    row.classList.add("rowsModeGrp");
    row.innerHTML =
      '<td class="lbvalueModeGrp"></td> <td class="ubvaluesModeGrp"></td> <td><input type="number" class="frvalueModeGrp"></td>'; // <td class="cmfMode"></td> ';
    if (checkModeGrp) {
      modeTableGrp.appendChild(row);
    }

    if (modeExCls.checked == true) {
      lbvaluesModeGrp[i] = Number(modeLbInput.value) + classLengthMode * i;
      ubvaluesModeGrp[i] = Number(modeUbInput.value) + classLengthMode * i;
    } else if (modeInCls.checked == true) {
      lbvaluesModeGrp[i] =
        Number(modeLbInput.value) + (classLengthMode + 1) * i - 0.5;
      ubvaluesModeGrp[i] =
        Number(modeUbInput.value) + (classLengthMode + 1) * i + 0.5;
    }
  }
  let lbvalues = document.getElementsByClassName("lbvalueModeGrp");
  let ubvalues = document.getElementsByClassName("ubvaluesModeGrp");
  for (let i = 0; i < Number(modeRowsInput.value); i++) {
    lbvalues[i].innerHTML = lbvaluesModeGrp[i];
    ubvalues[i].innerHTML = ubvaluesModeGrp[i];
  }
  checkModeGrp = false;
};
let btnResetTableModeGrp = document.getElementById("btn_reset_table_ModeGrp");
btnResetTableModeGrp.onclick = function () {
  checkModeGrp = true;
  let rowsModeGrp = document.getElementsByClassName("rowsModeGrp");
  while (rowsModeGrp.length != 0) {
    rowsModeGrp[0].remove();
  }
};

let btnCalModeGrp = document.getElementById("cal_ModeGrp");
btnCalModeGrp.onclick = function () {
  let frvaluesMode = document.getElementsByClassName("frvalueModeGrp");
  let classLengthMode = Number(modeUbInput.value) - Number(modeLbInput.value);
  for (let i = 0; i < Number(modeRowsInput.value); i++) {
    frvaluesModeGrp[i] = Number(frvaluesMode[i].value);
  }
  let modeResult = modeGrp(lbvaluesModeGrp, frvaluesModeGrp, classLengthMode);
  let modeGrpContainer = document.getElementById("mode_Grp_Container");
  let modeResultContainer = document.createElement("p");
  modeResultContainer.innerHTML = `Mode = ${modeResult.toFixed(3)}`;
  if (modeGrpContainer.lastChild.childNodes.length != 1) {
    modeGrpContainer.appendChild(modeResultContainer);
  } else {
    modeGrpContainer.replaceChild(
      modeResultContainer,
      modeGrpContainer.lastChild
    );
  }
};

/**
 *
 * @param {string} string data as string seperated by ','
 * @returns Median
 */
function medianDiscrete(string) {
  let discreteMedian = 0;
  let disData = string.split(",");
  let asdOrder = disData.sort(function (a, b) {
    return Number(a) - Number(b);
  });
  if (disData.length % 2 == 0) {
    discreteMedian =
      (Number(asdOrder[disData.length / 2 - 1]) +
        Number(asdOrder[disData.length / 2])) /
      2;
  } else {
    discreteMedian = asdOrder[(disData.length + 1) / 2 - 1];
  }
  return discreteMedian;
}

/**
 *
 * @param {String} string data as a string seperated by ','
 * @returns kurtosis
 */
function kurtosisDis(string) {
  let disData = string.split(",");
  let momentMean = meanDiscrete(string);
  let sumdisM2 = 0;
  let sumdisM4 = 0;
  for (num of disData) {
    sumdisM2 += Math.pow(Number(num) - momentMean[0], 2);
    sumdisM4 += Math.pow(Number(num) - momentMean[0], 4);
  }
  let N = disData.length;
  let kurt = sumdisM4 / N / Math.pow(sumdisM2 / N, 2);
  return kurt;
}

//                  COMPLETE ANALYSIS

//          Discrete Data

let popComp = document.getElementById("pop_comp");
let samComp = document.getElementById("sam_comp");
let noteDataComp = document.getElementById("noteDataComp");
let btnDataTypeComp = document.getElementById("btn_submit_data_comp");
btnDataTypeComp.onclick = function () {
  if (popComp.checked == true) {
    noteDataComp.innerHTML = "You have Selected <b>Population</b> data.";
  } else if (samComp.checked == true) {
    noteDataComp.innerHTML = "You have Selected <b>Sample</b> data.";
  }
};

let disDataComp = document.getElementById("discrete_data_comp");
let btnCaldisDataComp = document.getElementById("btn_discrete_comp");

btnCaldisDataComp.onclick = function () {
  let disData = disDataComp.value;
  let meanResult = meanDiscrete(disData);
  let medianResult = medianDiscrete(disData);
  let modeResult = modeDis(disData);
  let [stdResult, varianceResult, mean, Fr] = stdDiscrete(disData);
  if (samComp.checked == true) {
    varianceResult = (varianceResult * Fr) / (Fr - 1);
    stdResult = Math.sqrt(varianceResult);
  }
  let skewness = (meanResult[0] - modeResult[0]) / stdResult;
  if (modeResult.length != 1 || modeResult == 0) {
    skewness = (3 * (meanResult[0] - medianResult)) / stdResult;
  }
  let kurt = kurtosisDis(disData);

  let compDisResult = document.createElement("p");
  compDisResult.classList.add('result_container');
  compDisResult.innerHTML = `<p>Total Sum = ${meanResult[1]}</p>
                               <p>Total Numbers = ${Fr}</p>
                               <p>Mean = ${mean.toFixed(3)}</p>
                               <p>Median = ${medianResult}</p>
                               <p>Mode = ${modeResult}</p>
                               <p>Standard Deviation = ${stdResult.toFixed(
                                 3
                               )}</p>
                               <p>Variance = ${varianceResult.toFixed(3)}</p>
                               <p>Skewness = ${skewness.toFixed(3)}</p>
                               <p>Kurtosis = ${kurt.toFixed(3)}</p>`;
  let compDisContainer = document.getElementById("comp_dis_container");
  if (compDisContainer.lastChild.childNodes.length != 17) {
    compDisContainer.appendChild(compDisResult);
  } else {
    compDisContainer.replaceChild(compDisResult, compDisContainer.lastChild);
  }
};

let btnCompDisReset = document.getElementById("btn_reset_data_comp");
btnCompDisReset.onclick = function () {
  disDataComp.value = "";
};

//                  Complete Analysis Grouped Data

let ExCompCls = document.getElementById("ExComp");
let InCompCls = document.getElementById("InComp");
let btnTypeClsComp = document.getElementById("btn_submit_Comp");
let noteTypeClsComp = document.getElementById("noteComp");

btnTypeClsComp.onclick = function () {
  if (ExCompCls.checked == true) {
    noteTypeClsComp.innerHTML = "You have Selected <b>Exclusive Classes</b>.";
  } else if (InCompCls.checked == true) {
    noteTypeClsComp.innerHTML = "You have Selected <b>Inclusive Classes</b>.";
  }
};

let lbValuesComp = [];
let ubValuesComp = [];
let frequencyComp = [];
let lbInputComp = document.getElementById("comp_lb_input");
let ubInputComp = document.getElementById("comp_ub_input");
let numRowsComp = document.getElementById("rowsComp");
btnMakeTableComp = document.getElementById("make_table_Comp");
let tableComp = document.getElementById("data_table_Comp");
let checkComp = true;

numRowsComp.onchange = function () {
  if (checkComp == false) {
    alert("click on reset table before you click on make table.");
  }
};

btnMakeTableComp.onclick = function () {
  let classLengthComp = Number(ubInputComp.value) - Number(lbInputComp.value);
  for (let i = 0; i < Number(numRowsComp.value); i++) {
    let row = document.createElement("tr");
    row.classList.add("rowsClsComp");
    row.innerHTML =
      '<td class="lbvalueComp"></td> <td class="ubvalueComp"></td> <td><input type="number" class="frvalueComp"></td>';
    if (checkComp) {
      tableComp.appendChild(row);
    }

    if (ExCompCls.checked == true) {
      lbValuesComp[i] = Number(lbInputComp.value) + classLengthComp * i;
      ubValuesComp[i] = Number(ubInputComp.value) + classLengthComp * i;
    } else if (InCompCls.checked == true) {
      lbValuesComp[i] =
        Number(lbInputComp.value) + (classLengthComp + 1) * i - 0.5;
      ubValuesComp[i] =
        Number(ubInputComp.value) + (classLengthComp + 1) * i + 0.5;
    }
  }
  let lbvalues = document.getElementsByClassName("lbvalueComp");
  let ubvalues = document.getElementsByClassName("ubvalueComp");
  for (let i = 0; i < Number(numRowsComp.value); i++) {
    lbvalues[i].innerHTML = lbValuesComp[i];
    ubvalues[i].innerHTML = ubValuesComp[i];
  }
  checkComp = false;
};

let btnResetTableComp = document.getElementById("btn_reset_table_Comp");
btnResetTableComp.onclick = function () {
  checkComp = true;

  let rowsClsComp = document.getElementsByClassName("rowsClsComp");
  if (rowsClsComp[0] != undefined) {
    for (let i = 0; i < Number(numRowsComp.value); i++) {
      rowsClsComp[0].remove();
    }
  }
};

let btnCalculateComp = document.getElementById("cal_Comp_grp");
btnCalculateComp.onclick = function () {
  let classLengthComp = Number(ubInputComp.value) - Number(lbInputComp.value);
  let frvalues = document.getElementsByClassName("frvalueComp");
  for (let i = 0; i < frvalues.length; i++) {
    frequencyComp[i] = Number(frvalues[i].value);
  }
  let resultCompMean = meanGroupedEx(lbValuesComp, ubValuesComp, frequencyComp);
  let resultCompMedian = calculateMedian(
    lbValuesComp,
    classLengthComp,
    frequencyComp
  );
  let reusltCompMode = modeGrp(lbValuesComp, frequencyComp, classLengthComp);
  let stdSumComp = 0;
  let sum4thMComp = 0;
  for (let i = 0; i < Number(numRowsComp.value); i++) {
    stdSumComp += Number(
      Math.pow(resultCompMean[2][i] - resultCompMean[0], 2) * frequencyComp[i]
    );
    sum4thMComp +=
      frequencyComp[i] * Math.pow(resultCompMean[2][i] - resultCompMean[0], 4);
  }
  let N = totalFrequency(frequencyComp);
  let resultCompVariance = stdSumComp / N;
  let resultCompStdDev = Number(Math.sqrt(resultCompVariance)).toFixed(3);
  let resultCompSkew = (
    (resultCompMean[0] - reusltCompMode) /
    resultCompStdDev
  ).toFixed(3);
  let resultCompKurt = Number(
    sum4thMComp / N / Math.pow(resultCompVariance, 2)
  ).toFixed(3);
  let compResultContainer = document.createElement("p");
  compResultContainer.classList.add('result_container');
  compResultContainer.innerHTML = `
                                    <p>Sum of Frequency = ${N}</p>
                                    <p>Mean = ${resultCompMean[0].toFixed(
                                      3
                                    )}</p>
                                    <p>Median = ${resultCompMedian[0].toFixed(
                                      3
                                    )}</p>
                                    <p>Mode = ${reusltCompMode.toFixed(3)}</p>
                                    <p>Variance = ${resultCompVariance.toFixed(
                                      3
                                    )}</p>
                                    <p>Standard Deviation = ${resultCompStdDev}</p>
                                    <p>Skewness = ${resultCompSkew}</p>
                                    <p>Kurtosis = ${resultCompKurt}</p>`;
  let CompGrpContainer = document.getElementById("Comp_grp_Container");
  if (CompGrpContainer.lastChild.childNodes.length != 16) {
    CompGrpContainer.appendChild(compResultContainer);
  } else {
    CompGrpContainer.replaceChild(
      compResultContainer,
      CompGrpContainer.lastChild
    );
  }
};
