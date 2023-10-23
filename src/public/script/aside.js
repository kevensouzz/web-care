const aside = document.querySelector("aside");
const asideIcon = document.querySelector("aside header i");
const asideTitle = document.querySelector("aside header a");
const asideContent = document.querySelector("aside span");

asideIcon.addEventListener("click", () => {
  if (asideIcon.classList.contains("fa-arrow-left")) {
    toggleAside("Closed")
  } else if (asideIcon.classList.contains("fa-arrow-right")) {
    toggleAside("Opened")
  }
})

function toggleAside(status) {
  if (status == "Opened") {
    sessionStorage.setItem("Aside Status", status)
    aside.style.borderRight = "0.2rem solid var(--disable)";
    asideTitle.style.display = "inline"
    asideIcon.classList.remove("fa-arrow-right");
    asideIcon.classList.remove("a-r");
    asideIcon.classList.add("fa-arrow-left");
    asideIcon.classList.add("a-l");
    window.innerWidth <= 425 ? asideIcon.style.marginTop = "0" : asideIcon.style.marginTop = "0.3rem"
    asideContent.style.display = "flex";
  } else if (status == "Closed") {
    sessionStorage.setItem("Aside Status", status)
    aside.style.borderRight = "0.1rem solid var(--primary)";
    asideTitle.style.display = "none"
    asideIcon.classList.remove("fa-arrow-left");
    asideIcon.classList.remove("a-l");
    asideIcon.classList.add("fa-arrow-right");
    asideIcon.classList.add("a-r");
    window.innerWidth <= 425 ? asideIcon.style.marginTop = "0.7rem" : asideIcon.style.marginTop = "1.2rem"
    asideContent.style.display = "none";
  }
}

window.addEventListener("resize", () => {
  if (window.innerWidth <= 425) {
    asideIcon.classList.remove("fa-xl");
  } else {
    asideIcon.classList.add("fa-xl");
  }
})

window.innerWidth <= 425 ? asideIcon.classList.remove("fa-xl") : asideIcon.classList.add("fa-xl")

sessionStorage.getItem("Aside Status") == undefined ? toggleAside("Closed") : toggleAside(sessionStorage.getItem("Aside Status"));