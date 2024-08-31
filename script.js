var correctAnswer;
var correctAnswers = 0;
var wrongAnswers = 0;
var apiURL = 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean';

//creates and populates the dropdown element
function populateCat(data){
    console.log(data);
    let select = document.createElement('select')
    select.setAttribute('id', 'catSelect');
    select.style.width = "21px" ;
    let option = document.createElement('option');
    option.setAttribute('value', 0);
    option.innerHTML = '-- Any Category --';
    select.appendChild(option);
    data.trivia_categories.forEach(element => {
        option = document.createElement('option');
        option.setAttribute('value', element.id);
        option.innerHTML = element.name;
        select.appendChild(option);
    });
    
    let before = document.getElementById('select');
    document.getElementById('categorybox').insertBefore(select, before);
    select.onchange = changeCategory;
    
}

//changes the current category of questions reseting the score
function changeCategory(){
    correctAnswers = 0;
    wrongAnswers = 0;
    let category = document.getElementById('catSelect');
    let selectedOption = category.options[category.selectedIndex];
    if(selectedOption.value === 'Any Any Category'){
        apiURL = 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean';
    }
    else{
        apiURL = `https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean&category=${selectedOption.value}`
        console.log(apiURL);
    }
    getQuestion();
}

//initializes the website
function init(){
    let url = 'https://opentdb.com/api_category.php';
    fetch(url)
        .then(response => response.json())
        .then(categories => populateCat(categories));
    getQuestion();
}

//creates the question given the fetch data and formats some elements
function createQuestions(data){
    console.log(data)
    let category = document.getElementById("category");
    category.innerHTML = data.results[0].category;
    let question = document.getElementById("question");
    question.innerHTML = data.results[0].question;
    correctAnswer = data.results[0].correct_answer.toLowerCase();
    let buttonNext = document.getElementById("buttonnext");
    buttonNext.style.borderRadius = "0px 0px 0px 0px";
    buttonNext.style.backgroundColor = "#EE9322";
    document.getElementById("buttontrue").hidden=false;
    document.getElementById("buttonfalse").hidden=false;
    document.getElementById("correctAswers").innerHTML = correctAnswers;
    document.getElementById('wrongAnswers').innerHTML = wrongAnswers;
}

//gets a question using the api
function getQuestion(){
    let result = document.getElementById("result");
    result.innerHTML = "";
    fetch(apiURL)
        .then(response => response.json())
        .then(question => createQuestions(question));
}

//checks if the correct option was selected updating the consequencial elements
function validate(answer){
    let result = document.getElementById("result");
    let buttonNext = document.getElementById("buttonnext");

    if(correctAnswer===answer){
        correctAnswers++;
        result.innerHTML = "CORRECT!";
        result.style.color = "#219C90"
        buttonNext.style.backgroundColor = "#219C90"
    }
    else {
        wrongAnswers++;
        result.innerHTML ="WRONG!";
        result.style.color = "#D83F31"
        buttonNext.style.backgroundColor = "#D83F31"
    }
    buttonNext.style.borderRadius = "0px 0px 10px 10px";
    document.getElementById("buttontrue").hidden=true;
    document.getElementById("buttonfalse").hidden=true;
    document.getElementById("correctAswers").innerHTML = correctAnswers;
    document.getElementById("wrongAswers").innerHTML = wrongAnswers;
}

window.addEventListener('load', init);
