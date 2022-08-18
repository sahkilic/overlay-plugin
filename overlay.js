console.log("Overlay Infobox");
console.log("1. Create a div with a class called 'overlay-content'");
console.log("2. Add any other classes to adjust the settings");

// DOM Elements
const overlay = document.querySelector(".overlay-content");

// State
const STATE = {
  visible: false,
};

// Styles
const STYLES = {
  BOX: {
    width: "50vw",
    height: "100%",
    maxHeight: "50vh",
    backgroundColor: "white",
    cursor: "default",
    borderRadius: "10px",
    padding: "10px",
  },
  CONTAINER: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "none",
    zIndex: "1000",
    cursor: "pointer",
    position: "fixed",
  },
  BUTTON: {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    width: "60px",
    height: "60px",
    fontSize: "20px",
    backgroundColor: "#bae1ff",
    borderRadius: "10px 10px",
    cursor: "pointer",
    zIndex: "1010",
  },
  BODY: {
    OVERFLOW: "hidden",
  },
};

const USER_STYLES = { BODY: {} };

// Memory Keeping Track Of Users CSS
const saveUserCss = () => {
  const overflow = document.getElementsByTagName("BODY")[0].style.overflow;
  USER_STYLES.BODY.OVERFLOW = overflow;
  console.log(USER_STYLES.BODY.OVERFLOW);
};

// Helpers
// Takes Object of Styles, and Element
const applyCSS = (styles, element) => {
  Object.keys(styles).forEach((key) => {
    element.style[key] = styles[key];
  });
};

// Element Creation

// Create Overlay Container // Append overlay content to it, Append the whole thing to the DOM
const createOverlayContainer = (overlay) => {
  const overlayContainer = document.createElement("DIV");
  overlayContainer.classList.add("overlay-container");
  // Add Styles
  applyCSS(STYLES.CONTAINER, overlayContainer);
  overlayContainer.appendChild(overlay);
  document.body.insertAdjacentElement("afterbegin", overlayContainer);
};

const createBtn = (text) => {
  const btn = document.createElement("BUTTON");
  btn.innerHTML = text;
  btn.classList.add("overlay-btn");
  // Add Styles
  applyCSS(STYLES.BUTTON, btn);
  document.body.appendChild(btn);
};

// Init - CSS
(() => {
  if (!overlay) {
    return;
  }
  // Adding a container to the overlay content
  createOverlayContainer(overlay);
  createBtn("&#128195;");

  // Add Styles
  applyCSS(STYLES.BOX, overlay);

  // Save User Initial CSS
  saveUserCss();
})();

// Event Controllers
function handleOverlayContainerClick(e) {
  if (!e.target.classList.contains("overlay-container")) {
    return;
  }
  STYLES.CONTAINER.display = "none";
  applyCSS(STYLES.CONTAINER, document.querySelector(".overlay-container"));
  STATE.visible = false;
  document.getElementsByTagName("BODY")[0].style.overflow =
    USER_STYLES.BODY.OVERFLOW;
  this.removeEventListener("click", this);
}

// Handle Button Click
document.querySelector(".overlay-btn").addEventListener("click", (e) => {
  STATE.visible = !STATE.visible;
  if (STATE.visible) {
    STYLES.CONTAINER.display = "flex";
    document
      .querySelector(".overlay-container")
      .addEventListener("click", handleOverlayContainerClick);
    document.getElementsByTagName("BODY")[0].style.overflow =
      STYLES.BODY.OVERFLOW;
  } else {
    STYLES.CONTAINER.display = "none";
    document.getElementsByTagName("BODY")[0].style.overflow =
      USER_STYLES.BODY.OVERFLOW;
  }
  // Could make this more efficient by not looping when we specify the one we want to update.
  applyCSS(STYLES.CONTAINER, document.querySelector(".overlay-container"));
});
