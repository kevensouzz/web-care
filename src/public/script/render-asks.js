fetch("http://localhost:5000/services/faqs/asks", {
  method: "GET",
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((data) => {
    const faqLinksContainer = document.getElementById("faq-links");

    data.forEach((ask) => {
      const link = document.createElement("a");
      link.href = `/services/faqs/askPage/${ask._id}`;
      link.textContent = ask.subject;

      faqLinksContainer.appendChild(link);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
