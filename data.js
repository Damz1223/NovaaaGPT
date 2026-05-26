const modelSwitch =
document.getElementById(
    "model-switch"
);

const deleteModal =
document.getElementById(
    "delete-modal"
);

function goBack(){

    window.location.href =
    "settings.html";

}

function toggleSwitch(){

    if(!modelSwitch) return;

    modelSwitch.classList.toggle(
        "active"
    );

    const enabled =
    modelSwitch.classList.contains(
        "active"
    );

    localStorage.setItem(
        "improve-model",
        enabled
    );

}

function openDeleteModal(){

    if(!deleteModal) return;

    deleteModal.classList.add(
        "show"
    );

}

function closeDeleteModal(){

    if(!deleteModal) return;

    deleteModal.classList.remove(
        "show"
    );

}

function deleteChats(){

    localStorage.removeItem(
        "novagpt-chats"
    );

    localStorage.removeItem(
        "current-chat"
    );

    closeDeleteModal();

    setTimeout(()=>{

        alert(
            "Riwayat obrolan berhasil dihapus"
        );

        window.location.href =
        "nova.html";

    },300);

}

window.addEventListener(

    "load",

    ()=>{

        const enabled =
        localStorage.getItem(
            "improve-model"
        );

        if(

            enabled === "true" &&

            modelSwitch

        ){

            modelSwitch.classList.add(
                "active"
            );

        }

    }

);

window.addEventListener(

    "click",

    event=>{

        if(

            deleteModal &&
            event.target === deleteModal

        ){

            closeDeleteModal();

        }

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

}

applyTheme();

window.matchMedia(
    "(prefers-color-scheme: dark)"
).addEventListener(

    "change",

    ()=>{

        if(

            !localStorage.getItem(
                "theme"
            ) ||

            localStorage.getItem(
                "theme"
            ) === "system"

        ){

            applyTheme();

        }

    }

);