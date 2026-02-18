let selectedMood = "";

// Emoji selection
function setMood(emoji) {
  document.querySelectorAll(".emoji-row span").forEach(e => e.classList.remove("selected"));
  emoji.classList.add("selected");
  selectedMood = emoji.innerText;
}

// Form submission
document.getElementById("happinessForm").addEventListener("submit", function(e){
  e.preventDefault();

  const feedback = this.querySelector("textarea").value.trim();
  const name = this.querySelector("input").value.trim();
  const department = this.querySelector("select").value;

  if(!selectedMood){
    alert("Please select your mood.");
    return;
  }

  if(!feedback || !name || !department){
    alert("Please fill all fields.");
    return;
  }

  const submitBtn = this.querySelector(".btn-submit");
  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  const data = { mood: selectedMood, feedback, name, department };

  fetch("https://script.google.com/macros/s/AKfycbxNo4k2AKqisv7Nk6uKHf5fwhLmXs9-RurWvigBztAEfZSSr4oV-VWIvfOz9p2ETJJE/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    document.getElementById("successMessage").style.display = "block";
    this.reset();
    selectedMood = "";
  })
  .catch(err => {
    console.error(err);
    alert("❌ Error submitting feedback. Try again.");
  })
  .finally(()=>{
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit";
  });
});
