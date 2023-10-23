const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    description: document.getElementById("description").value,
  };

  try {
    const response = await fetch("http://localhost:5000/services/faqs/new-ask", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      form.reset();
    } else {
      console.error("Error creating a new ask. Status:", response.status);
    }
  } catch (error) {
    console.error("Error creating a new ask:", error);
  }
});
