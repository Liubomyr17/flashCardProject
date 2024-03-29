// const showBtn = document.getElementById("show-btn");
// const questionCard = document.querySelector(".question-card");
// const closeBtn = document.querySelector(".close-btn");
// const form = document.getElementById("question-form");
// const feedback = document.querySelector(".feedback");
// const questionInput = document.getElementById("question-input");
// const answerInput = document.getElementById("answer-input");
// const questionList = document.getElementById("questions-list");
// let data = [];
// let id = 1;

// event listeners
function eventListeners() {
    const showBtn = document.getElementById("show-btn");
    const questionCard = document.querySelector(".question-card");
    const closeBtn = document.querySelector(".close-btn");
    const form = document.getElementById("question-form");
    const feedback = document.querySelector(".feedback");
    const questionInput = document.getElementById("question-input");
    const answerInput = document.getElementById("answer-input");
    const questionList = document.getElementById("questions-list");
    let data = [];
    let id = 1;

    // new ui instance
    const ui = new UI();
    // show question form
    showBtn.addEventListener('click', function () {
        ui.showQuestion(questionCard);
    });
    // hide question form
    closeBtn.addEventListener('click', function () {
        ui.hideQuestion(questionCard);
    });
    // add question
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const questionValue = questionInput.value;
        const answerValue = answerInput.value;

        if (questionValue === '' || answerValue === '') {
            feedback.classList.add('showItem', 'alert-danger');
            feedback.textContent = 'cannot add empty values';

            setTimeout(function () {
                feedback.classList.remove("alert-danger", "showItem");
            }, 4000)
        } else {
            const question = new Question(id, questionValue, answerValue);
            data.push(question);
            id++;
            //console.log(data, id);
            ui.addQuestion(questionList, question);
            ui.clearFields(questionInput, answerInput);
        }
    });
    // work with a question
    questionList.addEventListener('click', function (event) {
        event.preventDefault();
        //console.log(event.target);
        if (event.target.classList.contains('delete-flashcard')) {
            let id = event.target.dataset.id;
            console.log(data);
            //console.log('hello');
            questionList.removeChild(
                event.target.parentElement.parentElement.parentElement
            );
            //console.log(event.target.parentElement.parentElement.parentElement); 
            //console.log(data); 
            // rest of the data        
            let tempData = data.filter(function (item) {
                return item.id !== parseInt(id);
            });
            data = tempData;

        } else if (event.target.classList.contains('show-answer')) {
            event.target.nextElementSibling.classList.toggle('showItem');
        } else if (event.target.classList.contains('edit-flashcard')) {
            // delete question
            let id = event.target.dataset.id;
            // delete question from the dom
            questionList.removeChild(
                event.target.parentElement.parentElement.parentElement
            );
            // show the question card
            ui.showQuestion(questionCard);
            // specific question
            const tempQuestion = data.filter(function (item) {
                return item.id === parseInt(id);
            });
            // rest of the data
            let tempData = data.filter(function (item) {
                return item.id !== parseInt(id);
            });
            data = tempData;
            questionInput.value = tempQuestion[0].title;
            answerInput.value = tempQuestion[0].answer;
        }
    });
}

// ui constructor

function UI() {}
// show question card


UI.prototype.showQuestion = function(element) {
    element.classList.add('showItem')
};
//hide question card
UI.prototype.hideQuestion = function (element) {
    element.classList.remove('showItem');
};

// add question
UI.prototype.addQuestion = function (element, question) {
    const div = document.createElement('div');
    div.classList.add('col-md-4');
    div.innerHTML = `

    <div class="card card-body flashcard my-3">
    <h4 class="text-capitalize">${question.title}</h4>

    <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
    <h5 class="answer mb-3">${question.answer}</h5>

    <div class="flashcard-btn d-flex justify-content-between">

     <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard 
     text-uppercase" data-id="${
        question.id
        }">edit</a>
     <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard 
     text-uppercase"
     data-id="${question.id}"
     >delete</a>
    </div>    
    </div>
    `;
    element.appendChild(div);
};

// clear fields
UI.prototype.clearFields = function (question, answer) {
    question.value = '';
    answer.value = '';
};

// question constructor
function Question(id, title, answer) {
    this.id = id;
    this.title = title;
    this.answer = answer;
}

// dom event listener
document.addEventListener("DOMContentLoaded", function () {
    eventListeners();
});
