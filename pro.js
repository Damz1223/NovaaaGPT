function goBack(){

    window.location.href =
    "nova.html";

}

function buyPlan(plan){

    localStorage.setItem(
        "novagpt-plan",
        plan
    );

    window.location.href =
    "nova.html";

}

const freeButton =
document.querySelector(
    ".free-btn"
);

const goButton =
document.querySelector(
    ".go-btn"
);

const proButton =
document.querySelector(
    ".pro-btn"
);

const plusButton =
document.querySelector(
    ".plus-btn"
);

const ultraButton =
document.querySelector(
    ".ultra-btn"
);

if(freeButton){

    freeButton.onclick =
    ()=>{

        window.location.href =
        "nova.html";

    };

}

if(goButton){

    goButton.onclick =
    ()=>{

        window.location.href =
        "https://pay.google.com/";

    };

}

if(proButton){

    proButton.onclick =
    ()=>{

        window.location.href =
        "https://pay.google.com/";

    };

}

if(plusButton){

    plusButton.onclick =
    ()=>{

        window.location.href =
        "https://pay.google.com/";

    };

}

if(ultraButton){

    ultraButton.onclick =
    ()=>{

        window.location.href =
        "https://pay.google.com/";

    };

}

document.addEventListener(

    "keydown",

    event=>{

        if(event.key === "Escape"){

            goBack();

        }

    }

);