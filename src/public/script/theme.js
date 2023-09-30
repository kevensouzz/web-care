const themeIcon = document.querySelectorAll("#theme i")[0];

document.getElementById("theme").addEventListener("click", () => {
  if (themeIcon.classList.contains("fa-moon")) {
    setTheme("Light");
  } else if (themeIcon.classList.contains("fa-sun")) {
    setTheme("Dark");
  }
})

function setTheme(theme) {
  if (theme == 'Dark') {
    localStorage.setItem('Tema', theme);

    document.getElementById("favicon").href = "icon/blue-icon.ico"

    document.getElementById("logo").src = "icon/blue-icon-32x32.png"

    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");

    document.documentElement.style.setProperty('--color', '#fff');
    document.documentElement.style.setProperty('--background', '#000');
    document.documentElement.style.setProperty('--primary', '#4b4bff');
    document.documentElement.style.setProperty('--secondary', '#ff4b4b');
  }
  if (theme == 'Light') {
    localStorage.setItem('Tema', theme);

    document.getElementById("favicon").href = "icon/red-icon.ico"

    document.getElementById("logo").src = "icon/red-icon-32x32.png"

    themeIcon.classList.add("fa-sun");
    themeIcon.classList.remove("fa-moon");

    document.documentElement.style.setProperty('--color', '#000');
    document.documentElement.style.setProperty('--background', '#fff');
    document.documentElement.style.setProperty('--primary', '#ff4b4b');
    document.documentElement.style.setProperty('--secondary', '#4b4bff');
  }
}

if (localStorage.getItem('Tema') == undefined) {
  setTheme('Dark');
} else {
  setTheme(localStorage.getItem('Tema'));
}