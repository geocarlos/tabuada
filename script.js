const numberList = document.querySelector("#number-list");

for(let i = 1; i < 10; i++){
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    if(i === Number(5)) option.selected = true;
    numberList.appendChild(option);
}

let randomNumber = Math.round(Math.random() * 10);

let previousNumber = randomNumber;

let canSubmit = true;

const answerForm = document.querySelector("#answer-form");

const answerBtn = document.querySelector("#answer-btn");

const questionLabel = document.querySelector(".question-label");

const answer = document.querySelector("#answer")

const feedback = document.querySelector(".feedback");

const continueDiv = document.createElement("div");

const continueBtn = document.createElement("button");

const numberAcertos = document.querySelector("#number-acertos");

const numberErros = document.querySelector("#number-erros");

continueBtn.textContent = "Continuar";

continueDiv.appendChild(continueBtn);

questionLabel.appendChild(setQuestion(randomNumber));

answer.focus();

numberList.onchange = () => {
    resetQuestion();
}

answerForm.onsubmit = e => {
    e.preventDefault();
    if(answer.value.length < 1) return;
    if(!canSubmit) return;
    canSubmit = false;
    feedback.textContent = emitFeedback(answer.value, numberList.value, randomNumber);
    feedback.appendChild(continueDiv);
    continueBtn.focus();
    continueBtn.onclick = () => {
        resetQuestion();
    }
}

answer.onkeyup = () => {
    if(isNaN(answer.value[answer.value.length - 1])){
        answer.value = answer.value.substring(0, answer.value.length - 1);
    }
}

function setQuestion(randomNumber){
    const question = document.createElement("h3");    
    question.textContent = `Quanto é ${numberList.value} x ${randomNumber}?`;
    return question;
}

function emitFeedback(answer, option, randomNumber){
    if(Number(answer) === Number(option) * Number(randomNumber)){
        feedback.style.color = "green";
        numberAcertos.textContent = Number(numberAcertos.textContent) + 1;
        return `Sua resposta está correta! ${option} x ${randomNumber} = ${answer}`;
    }
    feedback.style.color = "red";
    numberErros.textContent = Number(numberErros.textContent) + 1;
    return `Resposta incorreta! ${option} x ${randomNumber} = ${Number(option) * Number(randomNumber)}`;
}

function resetQuestion(){
        do {
            randomNumber = Math.round(Math.random() * 10);
        } while(randomNumber === previousNumber);
        
        previousNumber = randomNumber;
        
        questionLabel.removeChild(questionLabel.children[0]);
        questionLabel.appendChild(setQuestion(randomNumber));
        try{ feedback.removeChild(continueDiv); }catch(e){console.log("No such a node");}
        feedback.textContent = "";
        answer.value = "";
        answer.focus();
        canSubmit = true;
}

