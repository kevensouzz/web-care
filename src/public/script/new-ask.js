const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    description: document.getElementById("description").value,
  };

  fetch("http://localhost:5000/services/faqs/new-ask", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(form.reset());
})