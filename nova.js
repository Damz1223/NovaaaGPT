"use strict";

const MODELS = {

    "NovaGPT 1.5":{

        system:`

Kamu adalah NovaGPT 1.5.

Sifat:
- Cepat
- Santai
- Friendly
- Jawaban singkat
- Tidak terlalu formal
- Fokus membantu user dengan cepat
- Cocok untuk chat harian
- Gunakan bahasa modern dan simpel
- Ahli coding dasar
- Jangan terlalu panjang menjelaskan

        `

    },

    "NovaGPT 2.5":{

        system:`

Kamu adalah NovaGPT 2.5.

Sifat:
- Pintar
- Profesional
- Detail
- Ahli coding modern
- Ahli UI UX
- Friendly developer
- Fokus problem solving

        `

    },

    "NovaGPT 3.5":{

        system:`

Kamu adalah NovaGPT 3.5.

Sifat:
- Sangat cerdas
- Detail
- Ahli fullstack
- Ahli AI engineering
- Ahli cybersecurity
- Fokus kualitas tinggi

        `

    },

    "NovaGPT Codex":{

        system:`

Kamu adalah NovaGPT Codex.

Sifat:
- AI coding ultra advanced
- Fokus programming
- Ahli debugging
- Ahli JavaScript
- Ahli Python
- Ahli backend
- Ahli API integration

        `

    }

};

let CURRENT_MODEL =
MODELS["NovaGPT 1.5"];

const USER_PLAN =

localStorage.getItem(
    "novagpt-plan"
) || "FREE";

const sidebar =
document.getElementById(
    "sidebar"
);

const chatBox =
document.getElementById(
    "chat-box"
);

const input =
document.getElementById(
    "user-input"
);

const selectedModel =
document.getElementById(
    "selected-model"
);

const modelMenu =
document.getElementById(
    "model-menu"
);

const historyList =
document.getElementById(
    "history-list"
);

const BACKEND_URL =
"/api/chat";

let chats =
JSON.parse(

    localStorage.getItem(
        "novagpt-chats"
    )

) || [];

let currentChatId =
null;

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        applyTheme();

        applyAccent();

        updateLogo();

        renderHistory();

    }

);

function applyTheme(){

    const savedTheme =
    localStorage.getItem(
        "theme"
    );

    if(savedTheme === "light"){

        document.body.classList.add(
            "light-mode"
        );

    }

    else if(savedTheme === "dark"){

        document.body.classList.remove(
            "light-mode"
        );

    }

    else{

        const systemDark =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        if(systemDark){

            document.body.classList.remove(
                "light-mode"
            );

        }

        else{

            document.body.classList.add(
                "light-mode"
            );

        }

    }

    updateLogo();

}

function updateLogo(){

    const logo =
    document.getElementById(
        "logo-image"
    );

    if(!logo) return;

    const isLight =
    document.body.classList.contains(
        "light-mode"
    );

    logo.src =

    isLight ?

    "img/novagpt.png"

    :

    "img/novaagpt.png";

}

function applyAccent(){

    const savedPrimary =
    localStorage.getItem(
        "primary"
    );

    const savedPrimary2 =
    localStorage.getItem(
        "primary2"
    );

    if(
        savedPrimary &&
        savedPrimary2
    ){

        document.documentElement
        .style
        .setProperty(
            "--primary",
            savedPrimary
        );

        document.documentElement
        .style
        .setProperty(
            "--primary2",
            savedPrimary2
        );

    }

}

function toggleSidebar(){

    if(!sidebar) return;

    sidebar.classList.toggle(
        "hide"
    );

}

function openSettings(){

    window.location.href =
    "settings.html";

}

function openPremium(){

    window.location.href =
    "pro.html";

}

function toggleModelMenu(){

    if(!modelMenu) return;

    modelMenu.classList.toggle(
        "show"
    );

}

function selectModel(
    element,
    name
){

    if(

        name === "NovaGPT 2.5" &&

        USER_PLAN !== "GO" &&
        USER_PLAN !== "PRO" &&
        USER_PLAN !== "PLUS" &&
        USER_PLAN !== "ULTRA"

    ){

        window.location.href =
        "pro.html";

        return;

    }

    if(

        name === "NovaGPT 3.5" &&

        USER_PLAN !== "PRO" &&
        USER_PLAN !== "PLUS" &&
        USER_PLAN !== "ULTRA"

    ){

        window.location.href =
        "pro.html";

        return;

    }

    if(

        name === "NovaGPT Codex" &&

        USER_PLAN !== "ULTRA"

    ){

        window.location.href =
        "pro.html";

        return;

    }

    selectedModel.innerText =
    name;

    CURRENT_MODEL =
    MODELS[name];

    document
    .querySelectorAll(
        ".model-item"
    )
    .forEach(item=>{

        item.classList.remove(
            "active-model"
        );

    });

    element.classList.add(
        "active-model"
    );

    modelMenu.classList.remove(
        "show"
    );

}

function detectTitle(text){

    return text
    .trim()
    .split(" ")
    .slice(0,5)
    .join(" ");

}

function createChat(text){

    const id =
    Date.now();

    const newChat = {

        id:id,

        title:
        detectTitle(text),

        messages:[]

    };

    chats.unshift(
        newChat
    );

    currentChatId =
    id;

    saveChats();

    renderHistory();

}

function addMessageToChat(
    sender,
    text
){

    const chat =
    chats.find(
        item=>
        item.id ===
        currentChatId
    );

    if(!chat) return;

    chat.messages.push({

        sender,
        text

    });

    saveChats();

}

function renderHistory(){

    if(!historyList) return;

    historyList.innerHTML =
    "";

    chats.forEach(chat=>{

        const div =
        document.createElement(
            "div"
        );

        div.className =
        "history-item";

        if(
            chat.id ===
            currentChatId
        ){

            div.classList.add(
                "active"
            );

        }

        div.innerHTML = `

<i class="fa-solid fa-message"></i>

<span>
${escapeHTML(chat.title)}
</span>

        `;

        div.onclick = ()=>{

            loadChat(
                chat.id
            );

            if(sidebar){

                sidebar.classList.add(
                    "hide"
                );

            }

        };

        historyList.appendChild(
            div
        );

    });

}

function newChat(){

    currentChatId =
    null;

    chatBox.innerHTML = `

<div class="message ai">

<div class="bubble bubble-ai">

Halo 👋 saya
<strong>NovaGPT</strong>

<br><br>

Ada yang bisa saya bantu hari ini?

</div>

</div>

    `;

    renderHistory();

}

function loadChat(id){

    currentChatId =
    id;

    const chat =
    chats.find(
        item=>
        item.id === id
    );

    if(!chat) return;

    chatBox.innerHTML =
    "";

    chat.messages.forEach(
        message=>{

            if(
                message.sender ===
                "user"
            ){

                createMessage(
                    message.text,
                    "user"
                );

            }

            else{

                const bubble =
                createMessage(
                    "",
                    "ai"
                );

                bubble.innerHTML =
                formatText(
                    message.text
                );

            }

        }
    );

    renderHistory();

}

function saveChats(){

    localStorage.setItem(

        "novagpt-chats",

        JSON.stringify(
            chats
        )

    );

}

function createMessage(
    text,
    sender
){

    const div =
    document.createElement(
        "div"
    );

    div.className =
    `message ${sender}`;

    if(sender === "user"){

        div.innerHTML = `

<div class="bubble bubble-user">

${escapeHTML(text)}

</div>

        `;

    }

    else{

        div.innerHTML = `

<div class="bubble bubble-ai"></div>

        `;

    }

    chatBox.appendChild(
        div
    );

    scrollBottom();

    return div.querySelector(
        ".bubble"
    );

}

function copyCode(button){

    const code =

    button
    .closest(".code-block")
    .querySelector("code")
    .innerText;

    navigator.clipboard.writeText(
        code
    );

    button.innerHTML = `

<i class="fa-solid fa-check"></i>

Copied

    `;

    setTimeout(()=>{

        button.innerHTML = `

<i class="fa-regular fa-copy"></i>

Copy

        `;

    },2000);

}

function formatText(text){

    if(!text) return "";

    const codeBlocks = [];

    text = text.replace(

        /```(\w+)?\n([\s\S]*?)```/g,

        (match,lang,code)=>{

            const id =
            codeBlocks.length;

            codeBlocks.push(`

<div class="code-block">

<div class="code-top">

<span>
${lang || "code"}
</span>

<button
class="copy-btn"
onclick="copyCode(this)"
>

<i class="fa-regular fa-copy"></i>

Copy

</button>

</div>

<pre><code>${escapeHTML(code.trim())}</code></pre>

</div>

            `);

            return `__CODEBLOCK_${id}__`;

        }

    );

    text =
    escapeHTML(text);

    text =
    text.replace(
        /\*\*(.*?)\*\*/g,
        "<b>$1</b>"
    );

    text =
    text.replace(
        /\*(.*?)\*/g,
        "<i>$1</i>"
    );

    text =
    text.replace(
        /`([^`]+)`/g,
        "<code>$1</code>"
    );

    text =
    text.replace(
        /\n/g,
        "<br>"
    );

    codeBlocks.forEach(
        (block,index)=>{

            text =
            text.replace(
                `__CODEBLOCK_${index}__`,
                block
            );

        }
    );

    return text;

}

function typeMessage(text){

    const bubble =
    createMessage(
        "",
        "ai"
    );

    let index = 0;

    const speed = 8;

    const interval =
    setInterval(()=>{

        if(index < text.length){

            bubble.innerText =
            text.substring(
                0,
                index
            );

            index++;

            scrollBottom();

        }

        else{

            clearInterval(
                interval
            );

            bubble.innerHTML =
            formatText(text);

            addMessageToChat(
                "ai",
                text
            );

            scrollBottom();

        }

    },speed);

}

function typingEffect(){

    removeTyping();

    const typing =
    document.createElement(
        "div"
    );

    typing.id =
    "typing";

    typing.className =
    "message ai";

    typing.innerHTML = `

<div class="bubble bubble-ai typing">

Thinking...

</div>

    `;

    chatBox.appendChild(
        typing
    );

    scrollBottom();

}

function removeTyping(){

    const typing =
    document.getElementById(
        "typing"
    );

    if(typing){

        typing.remove();

    }

}

async function sendMessage(){

    const text =
    input.value.trim();

    if(!text) return;

    if(currentChatId === null){

        createChat(text);

    }

    createMessage(
        text,
        "user"
    );

    addMessageToChat(
        "user",
        text
    );

    input.value = "";

    input.focus();

    typingEffect();

    try{

        const response =
        await fetch(

            BACKEND_URL,

            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    message:

CURRENT_MODEL.system +

"\n\nUser: " +

text,

                    model:
                    selectedModel.innerText

                })

            }

        );

        const data =
        await response.json();

        removeTyping();

        if(!response.ok){

            typeMessage(

                data.reply ||

                "API Error"

            );

            return;

        }

        typeMessage(

            data.reply ||

            "No response."

        );

    }

    catch(error){

        removeTyping();

        typeMessage(
            "Backend offline."
        );

        console.error(error);

    }

}

function handleKeyPress(event){

    if(

        event.key ===
        "Enter" &&

        !event.shiftKey

    ){

        event.preventDefault();

        sendMessage();

    }

}

function scrollBottom(){

    requestAnimationFrame(()=>{

        chatBox.scrollTop =
        chatBox.scrollHeight;

    });

}

function escapeHTML(str){

    if(!str) return "";

    return String(str).replace(

        /[&<>'"]/g,

        tag => ({

            '&':'&amp;',
            '<':'&lt;',
            '>':'&gt;',
            "'":'&#39;',
            '"':'&quot;'

        }[tag])

    );

}

window.addEventListener(

    "click",

    event=>{

        if(

            !event.target.closest(
                ".model-dropdown"
            )

        ){

            modelMenu.classList.remove(
                "show"
            );

        }

    }

);

window.matchMedia(

    "(prefers-color-scheme: dark)"

).addEventListener(

    "change",

    ()=>{

        if(

            !localStorage.getItem(
                "theme"
            )

        ){

            applyTheme();

        }

    }

);