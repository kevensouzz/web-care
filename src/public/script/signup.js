const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const userData = Object.fromEntries(formData);

  fetch("http://localhost:5000/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((token) => {
      localStorage.setItem("Authorization", token);
    })
    .catch((error) => {
      console.error(`Request Error: ${error}`);
    });
});
