function submitForm() {

  const data = {
    mood: document.getElementById("bigEmoji").innerText,
    feedback: document.querySelector("textarea").value,
    name: document.querySelector("input").value,
    department: document.querySelector("select").value
  };

  fetch("https://script.google.com/macros/s/AKfycbxSjPTcG0LO7CEHkE0wfixEfbrptKNqxLQjWPtsNT9XMHz5BqYuAp_f_Iv8kwAsqSfX/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    alert("Feedback Submitted!");
  })
  .catch(error => {
    alert("Error submitting feedback");
  });
}
