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
    localStorage.setItem('Theme', theme);
    document.getElementById("favicon").href = "icon/blue-icon.ico"
    document.getElementById("logo").src = "icon/blue-icon-32x32.png"
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    document.documentElement.style.setProperty('--color', '#fff');
    document.documentElement.style.setProperty('--background', '#000');
    document.documentElement.style.setProperty('--background-less-opacity', '#000000e6');
    document.documentElement.style.setProperty('--primary', '#4b4bff');
    document.documentElement.style.setProperty('--secondary', '#ff4b4b');
    document.documentElement.style.setProperty('--disable', '#4b4bff66');

    try {
      document.getElementById("welcome-image").src = "svg/blue-care.svg"
      document.getElementById("invite-image").src = "svg/blue-auth.svg"
      document.getElementById("us-image").src = "svg/blue-us.svg"
    } catch (error) {
      console.clear();
    }
  } else if (theme == 'Light') {
    localStorage.setItem('Theme', theme);
    document.getElementById("favicon").href = "icon/red-icon.ico"
    document.getElementById("logo").src = "icon/red-icon-32x32.png"
    themeIcon.classList.add("fa-sun");
    themeIcon.classList.remove("fa-moon");
    document.documentElement.style.setProperty('--color', '#000');
    document.documentElement.style.setProperty('--background', '#fff');
    document.documentElement.style.setProperty('--background-less-opacity', '#ffffffe6');
    document.documentElement.style.setProperty('--primary', '#ff4b4b');
    document.documentElement.style.setProperty('--secondary', '#4b4bff');
    document.documentElement.style.setProperty('--disable', '#ff4b4b66');

    try {
      document.getElementById("welcome-image").src = "svg/red-care.svg"
      document.getElementById("invite-image").src = "svg/red-auth.svg"
      document.getElementById("us-image").src = "svg/red-us.svg"
    } catch (error) {
      console.clear();
    }
  }
}

if (localStorage.getItem('Theme') == undefined) {
  setTheme('Dark');
} else {
  setTheme(localStorage.getItem('Theme'));
}