const chatWindow = document.getElementById("chat-window");
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

// Boje za svakog sudionika u chatu

const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff"];
let colorIndex = 0;
// promjenjiva koja ce se koristiti za odabir boje


// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Prva poruka
function firstBotMessage() {
    let firstMessage = "Kako si?"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Odgovor
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

// Dohvaća tekstualni tekst iz okvira za unos i obrađuje ga
function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "Volim kodiranje!";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

// Rukuje slanjem teksta putem klikova na gumb
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    // Odkomentirajte ovo ako želite da bot odgovori na ovaj događaj buttonSendText
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText("Heart clicked!")
}

// Pritisnite enter za slanje poruke
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});

// Kreiranje novog Scaledrone kanala

const drone = new Scaledrone("JJTeCvafHh1WJ0DE");

// Funkcija koja kreira novi element i dodaje ga na kraj liste

function addMessage(author, message, color) {
    const li = document.createElement("li");
    li.style.color = color;
    li.innerHtml = `<b>${author}:</b> ${message}`;
    chatMessages.appendChild(li);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll na dno
}

// Subscribing na chat room

drone.subscribe("chat-room", function(data){
    addMessage(data.author, data.message, colors[colorIndex % colors.length]);
    colorIndex++;
})

//Event listener za submit forme

chatForm.addEventListener("submit", function(event){
    event.preventDefault(); // Sprijecavanje podrazumjevanog submita forme

    const message = chatInput.ariaValueMax; // Dohvacanje unesene poruke

    if (message){
        drone.publich({
            room: "chat-room",
            message: {
                author: "You",
                message: "message"
            }
        });
        chatInput.value = ""; // Ciscenje inputa
    }
});

//Event listener za enter u input polju

chatInput.addEventListener("keydown", function(event){
    if (event.keyCode === 13) {
        chatForm.dispatchEvent(new Event("submit)"));
    }
});
 
drone.connect();

const drone = new Scaledrone('JJTeCvafHh1WJ0DE');
const roomName = 'observable-myroom';
const room = drone.subscribe(roomName);

room.on('data', (message, member) => {
  const chatContainer = document.getElementById('chat');
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${member.clientData.username}:</strong> ${message}`;
  chatContainer.appendChild(messageElement);
});

