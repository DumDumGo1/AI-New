
/* =================================
   PERSONALITY TEST
================================= */

const questions = [
    {
        question: "Wie verbringst du am liebsten einen freien Tag?",
        answers: [
            ["🎨 Etwas Kreatives machen", "pixel"],
            ["🧩 Rätsel lösen und Neues entdecken", "tech"],
            ["🎉 Mit anderen etwas erleben", "glitch"],
            ["🌙 Musik hören und träumen", "dream"]
        ]
    },
    {
        question: "Welche Farbe passt am besten zu dir?",
        answers: [
            ["💗 Pink und Rosa", "dream"],
            ["💙 Blau und Türkis", "tech"],
            ["💜 Lila und Violett", "pixel"],
            ["💛 Gelb und Orange", "glitch"]
        ]
    },
    {
        question: "Du findest eine geheime Tür. Was machst du?",
        answers: [
            ["Sofort öffnen! 🔓", "glitch"],
            ["Erst herausfinden, was dahinter ist 🔍", "tech"],
            ["Mir vorstellen, was dahinter sein könnte 💭", "dream"],
            ["Die Tür kreativ gestalten 🎨", "pixel"]
        ]
    },
    {
        question: "Welche Fähigkeit hättest du gerne?",
        answers: [
            ["Die Zukunft erfinden 🚀", "tech"],
            ["Jede Idee zeichnen können 🖌️", "pixel"],
            ["In Traumwelten reisen 🌈", "dream"],
            ["Jeden Moment aufregend machen ⚡", "glitch"]
        ]
    },
    {
        question: "Welches digitale Gerät würdest du wählen?",
        answers: [
            ["Eine futuristische KI 🤖", "tech"],
            ["Eine Kamera für verrückte Bilder 📸", "pixel"],
            ["Einen Musikplayer mit magischen Songs 🎧", "dream"],
            ["Eine Spielkonsole mit Überraschungen 🎮", "glitch"]
        ]
    },
    {
        question: "Welches Wort beschreibt dich am besten?",
        answers: [
            ["Neugierig 🔎", "tech"],
            ["Fantasievoll 🦋", "dream"],
            ["Originell ✨", "pixel"],
            ["Unberechenbar ⚡", "glitch"]
        ]
    }
];

const personalityTypes = {
    pixel: {
        name: "PIXEL DREAM",
        emoji: "🎨",
        description: "Du bist kreativ, ideenreich und liebst es, Dinge auf deine eigene Art zu gestalten. Deine Fantasie kennt fast keine Grenzen."
    },
    tech: {
        name: "TECH GENIUS",
        emoji: "🤖",
        description: "Du bist neugierig, clever und willst verstehen, wie Dinge funktionieren. Neue Technologien und spannende Rätsel faszinieren dich."
    },
    dream: {
        name: "CYBER DREAMER",
        emoji: "🦋",
        description: "Du hast eine grosse Fantasie und eine verträumte Seite. Du entdeckst gerne neue Welten und hast deinen ganz eigenen Stil."
    },
    glitch: {
        name: "GLITCH ICON",
        emoji: "⚡",
        description: "Du bist originell, spontan und voller Überraschungen. Du magst das Aussergewöhnliche und gehst gerne deinen eigenen Weg."
    }
};

let currentQuestion = 0;
let scores = {
    pixel: 0,
    tech: 0,
    dream: 0,
    glitch: 0
};
let selectedAnswer = null;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextQuestion");
const resultElement = document.getElementById("testResult");
const restartButton = document.getElementById("restartTest");

function showQuestion() {
    const current = questions[currentQuestion];

    questionElement.textContent = current.question;
    answersElement.innerHTML = "";
    resultElement.hidden = true;
    nextButton.hidden = false;
    restartButton.hidden = true;
    nextButton.disabled = true;
    nextButton.textContent = "WEITER →";

    const progress = Math.round(currentQuestion / questions.length * 100);
    document.getElementById("questionNumber").textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / 06`;

    document.getElementById("progressText").textContent = progress + "%";
    document.getElementById("progressBar").style.width = progress + "%";

    selectedAnswer = null;

    current.answers.forEach(([answer, type]) => {
        const button = document.createElement("button");
        button.className = "answer-option";
        button.textContent = answer;

        button.addEventListener("click", () => {
            document.querySelectorAll(".answer-option").forEach(option => {
                option.classList.remove("selected");
            });

            button.classList.add("selected");
            selectedAnswer = type;
            nextButton.disabled = false;
        });

        answersElement.appendChild(button);
    });
}

nextButton.addEventListener("click", () => {
    if (!selectedAnswer) return;

    scores[selectedAnswer]++;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("questionNumber").textContent = "SCAN COMPLETE";
    document.getElementById("progressText").textContent = "100%";
    document.getElementById("progressBar").style.width = "100%";

    questionElement.textContent = "DEIN DIGITALER TYP IST ...";
    answersElement.innerHTML = "";
    nextButton.hidden = true;
    resultElement.hidden = false;
    restartButton.hidden = false;

    const winningType = Object.keys(scores).sort((a, b) =>
        scores[b] - scores[a]
    )[0];

    const result = personalityTypes[winningType];

    resultElement.innerHTML = `
        <div class="result-emoji">${result.emoji}</div>
        <h3>${result.name}</h3>
        <p>${result.description}</p>
        <p><strong>Dein Typ wurde erfolgreich gescannt! ✦</strong></p>
    `;

    document.getElementById("profileType").textContent = result.name;
    document.getElementById("profileDescription").textContent =
        result.description;

    resultElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    scores = { pixel: 0, tech: 0, dream: 0, glitch: 0 };
    showQuestion();
});

showQuestion();


/* =================================
   AVATAR CREATOR
================================= */

const faceSelect = document.getElementById("faceSelect");
const hairSelect = document.getElementById("hairSelect");
const avatarFace = document.getElementById("avatarFace");
const avatarCircle = document.querySelector(".avatar-circle");
const avatarName = document.getElementById("avatarName");

let avatarColor = "#f5a9db";

function updateAvatar() {
    avatarFace.textContent =
        faceSelect.value + " " + hairSelect.value;

    avatarCircle.style.background = avatarColor;

    const name = avatarName.value.trim() || "YOUR AVATAR";
    document.getElementById("avatarNamePreview").textContent = name;
}

faceSelect.addEventListener("change", updateAvatar);
hairSelect.addEventListener("change", updateAvatar);
avatarName.addEventListener("input", updateAvatar);

document.querySelectorAll(".color-choice").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".color-choice").forEach(color => {
            color.classList.remove("selected");
        });

        button.classList.add("selected");
        avatarColor = button.dataset.color;
        updateAvatar();
    });
});

document.getElementById("saveAvatar").addEventListener("click", () => {
    const name = avatarName.value.trim() || "PIXEL USER";

    document.getElementById("profileAvatar").textContent =
        avatarFace.textContent;

    document.getElementById("profileAvatar").style.background = avatarColor;
    document.getElementById("profileName").textContent = name;

    document.getElementById("avatarMessage").textContent =
        "✓ Dein Avatar wurde in deiner digitalen ID gespeichert!";

    document.getElementById("profile").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

updateAvatar();


/* =================================
   GAME 001: NEON REACTION
================================= */

const reactionBox = document.getElementById("reactionBox");
const reactionStart = document.getElementById("reactionStart");
const reactionResult = document.getElementById("reactionResult");

let reactionState = "idle";
let reactionTimer;
let startTime;

reactionStart.addEventListener("click", () => {
    clearTimeout(reactionTimer);
    reactionState = "waiting";

    reactionBox.className = "reaction-box waiting";
    reactionBox.textContent = "WARTEN ...";
    reactionResult.textContent = "Warte auf GRÜN!";

    reactionStart.disabled = true;

    const delay = 1500 + Math.random() * 3500;

    reactionTimer = setTimeout(() => {
        reactionState = "go";
        reactionBox.className = "reaction-box go";
        reactionBox.textContent = "JETZT KLICKEN!";
        startTime = performance.now();
    }, delay);
});

reactionBox.addEventListener("click", () => {
    if (reactionState === "waiting") {
        clearTimeout(reactionTimer);
        reactionState = "idle";
        reactionBox.className = "reaction-box too-soon";
        reactionBox.textContent = "ZU FRÜH!";
        reactionResult.textContent = "Ups! Starte eine neue Runde.";
        reactionStart.disabled = false;
    } else if (reactionState === "go") {
        const reactionTime = Math.round(performance.now() - startTime);

        reactionState = "idle";
        reactionBox.className = "reaction-box";
        reactionBox.textContent = "GUT GEMACHT!";
        reactionResult.textContent =
            `Deine Reaktionszeit: ${reactionTime} Millisekunden!`;

        reactionStart.disabled = false;
    }
});


/* =================================
   GAME 002: NUMBER HACK
================================= */

let secretNumber = Math.floor(Math.random() * 20) + 1;
let attempts = 0;

function resetNumberGame() {
    secretNumber = Math.floor(Math.random() * 20) + 1;
    attempts = 0;

    document.getElementById("numberGuess").value = "";
    document.getElementById("numberResult").textContent =
        "Neue Zahl wurde erstellt. Viel Glück!";
}

function checkNumber() {
    const input = document.getElementById("numberGuess");
    const guess = Number(input.value);
    const result = document.getElementById("numberResult");

    if (input.value === "" || !Number.isInteger(guess) || guess < 1 || guess > 20) {
        result.textContent = "Bitte gib eine ganze Zahl zwischen 1 und 20 ein.";
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        result.textContent =
            `RICHTIG! 🎉 Du hast es in ${attempts} Versuchen geschafft!`;
    } else if (guess < secretNumber) {
        result.textContent = "Die gesuchte Zahl ist GRÖSSER! ↑";
    } else {
        result.textContent = "Die gesuchte Zahl ist KLEINER! ↓";
    }
}

document.getElementById("guessButton").addEventListener("click", checkNumber);

document.getElementById("numberGuess").addEventListener("keydown", event => {
    if (event.key === "Enter") checkNumber();
});

document.getElementById("newNumber").addEventListener("click", resetNumberGame);


/* =================================
   EXTRA: KLEINER DIGITALER EFFEKT
================================= */

document.addEventListener("click", event => {
    if (event.target.closest("button, a, input, select")) return;

    const sparkle = document.createElement("div");
    sparkle.textContent = ["✦", "✧", "♡", "＋", "★"][
        Math.floor(Math.random() * 5)
    ];

    sparkle.className = "click-sparkle";
    sparkle.style.left = event.clientX + "px";
    sparkle.style.top = event.clientY + "px";

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 850);
});
