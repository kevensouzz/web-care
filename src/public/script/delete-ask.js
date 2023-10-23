document.querySelector(".delete-ask").addEventListener("click", () => {
  const id = document.getElementById("id").value;
  const email = document.getElementsByTagName("input")[3].value;

  fetch(`http://localhost:5000/services/faqs/ask/${id}/${email}`, {
    method: "DELETE"
  })
  .then(response => {
    if (response.ok) {
      window.location.href = 'http://localhost:5000/services/faqs/';
    } else {
      window.location.href = `http://localhost:5000/services/faqs/askPage/${id}`;
      console.error("Erro na solicitação:", response.statusText);
    }
  })
  .catch(error => {
    console.error("Erro na solicitação:", error);
  });
});
