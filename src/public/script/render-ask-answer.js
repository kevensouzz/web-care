const id = document.getElementById("id").value;

fetch(`http://localhost:5000/services/faqs/ask/${id}`, {
  method: "GET",
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((ask) => {
    const answersContainer = document.querySelector(".answers");

    ask.answers.forEach((answer) => {
        const span = document.createElement("span");

        const h3 = document.createElement("h3");
        h3.textContent = answer.email;

        const p = document.createElement("p");
        p.textContent = answer.answer;

        span.appendChild(h3);
        span.appendChild(p);

        answersContainer.appendChild(span);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
