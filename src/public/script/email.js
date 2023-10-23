const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  try {
    const response = await fetch("http://localhost:5000/email/send", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      form.reset();
    } else {
      console.error("Error sending the email. Status:", response.status);
    }
  } catch (error) {
    console.error("Error sending the email:", error);
  }
});
