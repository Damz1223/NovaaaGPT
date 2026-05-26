const appearanceBox =
document.getElementById(
    "appearance-box"
);

const accentBox =
document.getElementById(
    "accent-box"
);

const personalizationBox =
document.getElementById(
    "personalization-box"
);

const reportBox =
document.getElementById(
    "report-box"
);

const aboutBox =
document.getElementById(
    "about-box"
);

const dataBox =
document.getElementById(
    "data-box"
);

const accentColors =
document.querySelectorAll(
    ".accent-color"
);

const accentDropdown =
document.getElementById(
    "accent-dropdown"
);

const accentArrow =
document.getElementById(
    "accent-arrow"
);

const themeDropdown =
document.getElementById(
    "theme-dropdown"
);

const themeArrow =
document.getElementById(
    "theme-arrow"
);

const themeText =
document.getElementById(
    "theme-text"
);

function goBack(){

    document.body.style.opacity =
    "0";

    setTimeout(()=>{

        window.location.href =
        "nova.html";

    },300);

}

function openDataPage(){

    window.location.href =
    "data.html";

}

function toggleAccentDropdown(event){

    if(event){

        event.stopPropagation();

    }

    accentDropdown.classList.toggle(
        "show"
    );

    accentArrow.classList.toggle(
        "rotate"
    );

}

function toggleThemeDropdown(event){

    if(event){

        event.stopPropagation();

    }

    themeDropdown.classList.toggle(
        "show"
    );

    themeArrow.classList.toggle(
        "rotate"
    );

}

function applySystemTheme(){

    const systemDark =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    if(systemDark){

        document.body.setAttribute(
            "data-theme",
            "dark"
        );

    }

    else{

        document.body.setAttribute(
            "data-theme",
            "light"
        );

    }

}

function setTheme(mode){

    if(mode === "light"){

        document.body.setAttribute(
            "data-theme",
            "light"
        );

        themeText.innerText =
        "Light";

    }

    else if(mode === "dark"){

        document.body.setAttribute(
            "data-theme",
            "dark"
        );

        themeText.innerText =
        "Dark";

    }

    else{

        applySystemTheme();

        themeText.innerText =
        "System (Default)";

    }

    localStorage.setItem(
        "theme",
        mode
    );

}

accentColors.forEach(color=>{

    color.onclick = event=>{

        event.stopPropagation();

        accentColors.forEach(item=>{

            item.classList.remove(
                "active"
            );

        });

        color.classList.add(
            "active"
        );

        const primary =
        color.dataset.primary;

        const secondary =
        color.dataset.secondary;

        document.documentElement
        .style
        .setProperty(
            "--primary",
            primary
        );

        document.documentElement
        .style
        .setProperty(
            "--primary2",
            secondary
        );

        localStorage.setItem(
            "primary",
            primary
        );

        localStorage.setItem(
            "primary2",
            secondary
        );

    };

});

if(personalizationBox){

    personalizationBox.onclick = ()=>{

        alert(
            "Personalization feature coming soon 🚀"
        );

    };

}

if(reportBox){

    reportBox.onclick = ()=>{

        window.open(
            "https://github.com",
            "_blank"
        );

    };

}

if(aboutBox){

    aboutBox.onclick = ()=>{

        alert(

`NovaGPT Beta v1.0

Advanced AI Assistant
Powered by Gemini AI

Developer:
Sawit`

        );

    };

}

if(dataBox){

    dataBox.onclick = ()=>{

        openDataPage();

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

const boxes =
document.querySelectorAll(
    ".settings-box"
);

boxes.forEach(box=>{

    box.addEventListener(

        "touchstart",

        ()=>{

            box.style.transform =
            "scale(.98)";

        }

    );

    box.addEventListener(

        "touchend",

        ()=>{

            box.style.transform =
            "";

        }

    );

    box.addEventListener(

        "mousedown",

        ()=>{

            box.style.transform =
            "scale(.98)";

        }

    );

    box.addEventListener(

        "mouseup",

        ()=>{

            box.style.transform =
            "";

        }

    );

});

window.addEventListener(

    "click",

    event=>{

        if(

            !event.target.closest(
                ".accent-wrapper"
            )

        ){

            accentDropdown.classList.remove(
                "show"
            );

            accentArrow.classList.remove(
                "rotate"
            );

        }

        if(

            !event.target.closest(
                "#appearance-box"
            )

        ){

            themeDropdown.classList.remove(
                "show"
            );

            themeArrow.classList.remove(
                "rotate"
            );

        }

    }

);

window.matchMedia(

    "(prefers-color-scheme: dark)"

).addEventListener(

    "change",

    ()=>{

        const savedTheme =
        localStorage.getItem(
            "theme"
        );

        if(

            savedTheme ===
            "system" ||

            !savedTheme

        ){

            applySystemTheme();

        }

    }

);

window.addEventListener(

    "load",

    ()=>{

        document.body.style.opacity =
        "0";

        document.body.style.transition =
        ".3s";

        setTimeout(()=>{

            document.body.style.opacity =
            "1";

        },50);

        const savedTheme =
        localStorage.getItem(
            "theme"
        );

        if(savedTheme){

            if(savedTheme === "light"){

                document.body.setAttribute(
                    "data-theme",
                    "light"
                );

                themeText.innerText =
                "Light";

            }

            else if(savedTheme === "dark"){

                document.body.setAttribute(
                    "data-theme",
                    "dark"
                );

                themeText.innerText =
                "Dark";

            }

            else{

                applySystemTheme();

                themeText.innerText =
                "System (Default)";

            }

        }

        else{

            applySystemTheme();

            themeText.innerText =
            "System (Default)";

        }

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

            accentColors.forEach(color=>{

                if(

                    color.dataset.primary ===
                    savedPrimary

                ){

                    color.classList.add(
                        "active"
                    );

                }

            });

        }

    }

);