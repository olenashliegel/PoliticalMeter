//Business logic
function countScore(answer, saOption, aOption, dOption, sdOption) {
  let score = 0;
  switch (answer) {
    case saOption:
      return score += 2;
    case aOption:
      return score += 1;
    case dOption:
      return score -= 1;
    case sdOption:
      return score -= 2;
    default:
      return score;
  }
}

function countLiberalScore(firstAnswer, secondAnswer, thirdAnswer) {
  let liberalScore = 0;
  liberalScore += countScore(firstAnswer, 'saTaxes', 'aTaxes', 'dTaxes', 'sdTaxes');
  liberalScore += countScore(secondAnswer, 'saSocial', 'aSocial', 'dSocial', 'sdSocial');
  liberalScore += countScore(thirdAnswer, 'saHealthcare', 'aHealthcare', 'dHealthcare', 'sdHealthcare');

  return liberalScore;
}

function countConservativeScore(firstAnswer, secondAnswer, thirdAnswer) {
  let conservativeScore = 0;

  console.log(firstAnswer, secondAnswer, thirdAnswer);
  conservativeScore += countScore(firstAnswer, 'saGovernance', 'aGovernance', 'dGovernance', 'sdGovernance');
  conservativeScore += countScore(secondAnswer, 'saInterests', 'aInterests', 'dInterests', 'sdInterests');
  conservativeScore += countScore(thirdAnswer, 'saEducation', 'aEducation', 'dEducation', 'sdEducation');

  return conservativeScore;
}

function getResult(liberalScore, conservativeScore) {
  console.log(liberalScore);
  console.log(conservativeScore);
  if ((liberalScore > 0 && conservativeScore <= 0) ||
    (liberalScore === 0 && conservativeScore < 0)) {
    return 1;
  } else if ((liberalScore < 0 && conservativeScore >= 0) ||
    (liberalScore === 0 && conservativeScore > 0)) {
    return -1;
  } else
    return 0;
}


//UI logic
function displayResult(liberalScore, conservativeScore) {
  let result = getResult(liberalScore, conservativeScore);
  document.getElementById("result").classList.remove("hidden");
  document.querySelector("button[type=button]").classList.remove("hidden");
  document.getElementById("liberalScore").innerText = " " + liberalScore + ".";
  document.getElementById("conservativeScore").innerText = " " + conservativeScore + ".";
  if (result === 1) {
    document.getElementById("liberalResult").classList.remove("hidden");
  } else if (result === -1) {
    document.getElementById("conservativeResult").classList.remove("hidden");
  } else document.getElementById("moderateResult").classList.remove("hidden");
}

function resetResult() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("liberalResult").classList.add("hidden");
  document.getElementById("conservativeResult").classList.add("hidden");
  document.getElementById("moderateResult").classList.add("hidden");
  document.querySelector("button[type=button]").classList.add("hidden");
}

function resetDropDowns() {
  document.getElementById("taxes").value = "saTaxes";
  document.getElementById("social").value = "saSocial";
  document.getElementById("governance").value = "saGovernance";
  document.getElementById("healthcare").value = "saHealthcare";
  document.getElementById("interests").value = "saInterests";
  document.getElementById("education").value = "saEducation";
}


window.onload = function () {
  document.querySelector("form").onsubmit = function (e) {
    e.preventDefault();
    resetResult();
    const taxesAnswer = document.getElementById("taxes").value;
    const socialAnswer = document.getElementById("social").value;
    const governanceAnswer = document.getElementById("governance").value;
    const healthcareAnswer = document.getElementById("healthcare").value;
    const interestsAnswer = document.getElementById("interests").value;
    const educationAnswer = document.getElementById("education").value;
    let liberalScore = countLiberalScore(taxesAnswer, socialAnswer, healthcareAnswer);
    let conservativeScore = countConservativeScore(governanceAnswer, interestsAnswer, educationAnswer);
    displayResult(liberalScore, conservativeScore);
  }

  document.querySelector("button[type=button]").onclick = function () {
    resetResult();
    resetDropDowns();
  }
}