// =========================
// CONFIG
// =========================

let FINAL_HEADER_TEXT = "loading...";

async function loadHeaderTextFromGitHub() {
    try {
        const res = await fetch(
            "https://raw.githubusercontent.com/call30-sketch/paduaimage/main/header.txt?cache=" + Date.now()
        );

        FINAL_HEADER_TEXT = (await res.text()).trim();
    } catch (e) {
        console.log("Failed to load header text:", e);
        FINAL_HEADER_TEXT = "day something";
    }
}

// =========================
// 🔥 REMOVE TILE ICONS ONLY
// =========================

function removeTileIcons() {
    const tiles = document.querySelectorAll("#tileList-5813 .tile");

    tiles.forEach(tile => {
        // Remove background images (MAIN icon source)
        tile.style.backgroundImage = "none";

        // Remove any <img> inside tiles (just in case)
        tile.querySelectorAll("img").forEach(img => img.remove());

        // Remove SVGs inside tiles
        tile.querySelectorAll("svg").forEach(svg => svg.remove());
    });

    // Strong CSS override
    let style = document.getElementById("kill-tiles-style");
    if (!style) {
        style = document.createElement("style");
        style.id = "kill-tiles-style";
        document.head.appendChild(style);
    }

    style.textContent = `
        #tileList-5813 .tile {
            background-image: none !important;
        }
    `;
}

// =========================
// SAFE TEXT REPLACER
// =========================

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceTextGlobally(find, replace) {
    const regex = new RegExp(escapeRegExp(find), "gi");

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
    );

    let node;
    while ((node = walker.nextNode())) {
        if (!node.parentNode) continue;

        const tag = node.parentNode.nodeName;
        if (tag === "SCRIPT" || tag === "STYLE") continue;

        // Prevent emoji stacking
        if (node.nodeValue.includes(replace)) continue;

        if (regex.test(node.nodeValue)) {
            node.nodeValue = node.nodeValue.replace(regex, replace);
        }
    }
}

// =========================
// NOTICES HEADER
// =========================

function modifyNoticesHeader() {
    document.querySelectorAll("h2.subheader").forEach(el => {
        if (el.textContent.toLowerCase().includes("notices")) {
            el.textContent = "things no one reads";
            el.style.fontSize = "32px";
            el.style.color = "black";
            el.style.fontWeight = "bold";
        }
    });
}

// =========================
// BUTTON CLEAN
// =========================

function removePortraitImages() {
    const images = document.querySelectorAll('img[src*="portrait.php"]');

    images.forEach(img => {
        img.remove();
    });
}

function cleanButtons() {
    const notificationBtn = document.querySelector("#notification-toggle");
    if (notificationBtn) notificationBtn.innerHTML = "";

    const searchBtn = document.querySelector("button.c-search-input__button");
    if (searchBtn) searchBtn.innerHTML = "";

    const timetableLink = document.querySelector("a.icon-timetable");
    if (timetableLink) timetableLink.innerHTML = "train_schedule";
}

// =========================
// BACKGROUND
// =========================

let bgStarted = false;

function changeBackgroundColor() {
    if (bgStarted) return;
    bgStarted = true;

    const style = document.createElement("style");
    document.head.appendChild(style);

    let hue = 0;

    function updateColor() {
        hue = (hue + 1) % 360;

        style.textContent = `
            html, body {
                background-color: hsl(${hue}, 100%, 50%) !important;
            }
        `;

        requestAnimationFrame(updateColor);
    }

    updateColor();
}

// =========================
// TEXT REPLACEMENTS
// =========================

function replaceTilesWithEmojis() {
    const emojis = [
        "🤢","🤕","🤬","😡","🥶","🥵","😩","🤯","😮‍💨","🤑",
        "😓","😌","😂","🤣","😋","😎","😘","😍","🤩","🫥",
        "😶‍🌫️","🥱","🤐"
    ];

    // 🔥 ONLY target main tile grid
    const tileContainer = document.querySelector("#tileList-5813");
    if (!tileContainer) return;

    const tiles = tileContainer.querySelectorAll("li.tile");

    tiles.forEach(tile => {

        // prevent reruns
        if (tile.dataset.emojiSet === "true") return;

        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        tile.innerHTML = "";

        const emojiSpan = document.createElement("span");
        emojiSpan.textContent = randomEmoji;

        emojiSpan.style.display = "flex";
        emojiSpan.style.alignItems = "center";
        emojiSpan.style.justifyContent = "center";
        emojiSpan.style.width = "119.99px";
        emojiSpan.style.height = "120px";
        emojiSpan.style.fontSize = "80px";

        tile.style.width = "119.99px";
        tile.style.height = "120px";

        tile.appendChild(emojiSpan);

        tile.dataset.emojiSet = "true";
    });
}

function replacePaduaLogo() {
    const newLogo = "https://raw.githubusercontent.com/call30-sketch/paduaimage/main/padualogo.png";

    const logos = document.querySelectorAll('img[src*="logo.php"]');

    logos.forEach(img => {
        img.src = newLogo;

        // Remove srcset so it doesn't override your image
        img.removeAttribute("srcset");

        // Set exact size
        img.style.width = "196px";
        img.style.height = "264px";
        img.width = 196;
        img.height = 264;
    });
}

function removeHelpButton() {
    const helpButtons = document.querySelectorAll('a.icon-help');

    helpButtons.forEach(btn => {
        btn.remove();
    });
}

function replaceNotificationBellIcon() {
    const imgURL = "https://raw.githubusercontent.com/call30-sketch/paduaimage/main/bell.png";

    const buttons = document.querySelectorAll('#notification-toggle');

    buttons.forEach(btn => {
        // Remove icon class so CSS icon disappears
        btn.classList.remove("icon-notifications");

        // Clear any existing content
        btn.innerHTML = "";

        // Remove any background icon sprite
        btn.style.backgroundImage = "none";

        // Create image
        const img = document.createElement("img");
        img.src = imgURL;

        // 🔥 SCALE TO 72x72
        img.style.width = "72px";
        img.style.height = "72px";

        img.style.objectFit = "contain";
        img.style.display = "block";

        // Center inside button
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";

        btn.appendChild(img);
    });
}

function replaceSearchButtonIcon() {
    const imgURL = "https://raw.githubusercontent.com/call30-sketch/paduaimage/main/magnyfying%20glass.png";

    const buttons = document.querySelectorAll('button.c-search-input__button');

    buttons.forEach(btn => {
        // Remove icon-related classes
        btn.classList.remove("icon-search", "no-text");

        // Clear existing content
        btn.innerHTML = "";

        // Remove CSS background icon if present
        btn.style.backgroundImage = "none";

        // Create image
        const img = document.createElement("img");
        img.src = imgURL;

        // 🔥 SCALE HERE
        img.style.width = "72px";
        img.style.height = "72px";

        img.style.objectFit = "contain";
        img.style.display = "block";

        // Center it
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";

        btn.appendChild(img);
    });
}

function replaceTimetableIcon() {
    const newIcon = "https://raw.githubusercontent.com/call30-sketch/paduaimage/main/train.png";

    const links = document.querySelectorAll('a.icon-timetable');

    links.forEach(link => {
        // Remove default icon class
        link.classList.remove("icon-timetable");

        // Clear existing content
        link.innerHTML = "";

        // Make layout vertical (image on top, text below)
        link.style.display = "flex";
        link.style.flexDirection = "column";
        link.style.alignItems = "center";
        link.style.justifyContent = "center";
        link.style.gap = "4px";
        link.style.textAlign = "center";

        // Create image
        const img = document.createElement("img");
        img.src = newIcon;
        img.style.width = "30px";
        img.style.height = "30px";
        img.style.objectFit = "contain";
        img.style.display = "block";

        // Create text
        const text = document.createElement("span");
        text.textContent = "Train Schedule";

        link.appendChild(img);
        link.appendChild(text);
    });
}

function replaceText() {
    replaceTextGlobally("Adam Calleja", "Adam CALLeja 💵💰");
    replaceTextGlobally("Good Morning", "BAD Morning");
    replaceTextGlobally("Good Afternoon", "BAD Afternoon");

    document.querySelectorAll("[data-timetable-header]").forEach(header => {
        if (header.textContent !== FINAL_HEADER_TEXT) {
            header.textContent = FINAL_HEADER_TEXT;
            header.style.color = "black";
        }
    });
}

function renameGradesLink() {
    const links = document.querySelectorAll('a.icon-approve');

    links.forEach(link => {
        const span = link.querySelector("span");

        if (span) {
            span.textContent = "Your A+'s";
        }
    });
}


// =========================
// RUNNER
// =========================

let scheduled = false;

function runAll() {
    scheduled = false;

    removeTileIcons(); // 🔥 ONLY tiles affected now
    cleanButtons();
    replaceTilesWithEmojis();
    replaceText();
    modifyNoticesHeader();
    changeBackgroundColor();
    removePortraitImages();
    replacePaduaLogo();
    replaceTimetableIcon();
    removeHelpButton();
    replaceSearchButtonIcon();
    replaceNotificationBellIcon();
    renameGradesLink();
    
}

// =========================
// OBSERVER
// =========================

const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(runAll);
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// =========================
// FORCE LOOP
// =========================

setInterval(() => {
    removeTileIcons();
    replaceText();
}, 1000);

// =========================
// INIT
// =========================

(async function init() {
    await loadHeaderTextFromGitHub();
    runAll();
})();