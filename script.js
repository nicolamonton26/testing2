let selectedMood = "😐"; // default
const bigEmojiPreview = document.getElementById("bigEmojiPreview");

// Emoji selection
function setMood(emoji) {
  document.querySelectorAll(".emoji-row span").forEach(e => e.classList.remove("selected"));
  emoji.classList.add("selected");
  selectedMood = emoji.innerText;
  bigEmojiPreview.innerText = selectedMood; // update big emoji
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

  console.log("Sending data:", data); // Debug log

  fetch("https://script.google.com/macros/library/d/1VFegCXbdrhsQ8nQU7JqVhhUSOec7yLMxOuojBbTFC62MBBi6NAZLMzRk/3", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    console.log("Apps Script response:", response); // Debug log
    document.getElementById("successMessage").style.display = "block";
    this.reset();
    selectedMood = "😐";
    bigEmojiPreview.innerText = selectedMood;
  })
  .catch(err => {
    console.error("Error:", err);
    alert("❌ Error submitting feedback. Try again.");
  })
  .finally(()=>{
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit";
  });
});
