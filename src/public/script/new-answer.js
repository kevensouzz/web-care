const form = document.getElementsByTagName("form")[1];

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = document.getElementById("id").value;
  const formData = {
    email: document.getElementById("email").value,
    answer: document.getElementById("answer").value,
  };

  try {
    const response = await fetch(`http://localhost:5000/services/faqs/ask/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      form.reset();
    } else {
      console.error("Error sending the answer. Status:", response.status);
    }
  } catch (error) {
    console.error("Error sending the answer:", error);
  }
});
