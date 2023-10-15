const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  fetch("http://localhost:5000/send", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(form.reset());
})