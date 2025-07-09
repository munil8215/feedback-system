const form = document.getElementById("feedbackForm");
const list = document.getElementById("feedbackList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const course = document.getElementById("course").value.trim();
  const rating = document.getElementById("rating").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (!name || !course || !rating || !comment) {
    alert("Please fill all fields.");
    return;
  }

  const response = await fetch("http://localhost:5000/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, course, rating, comment }),
  });

  const result = await response.json();
  alert(result.message);

  form.reset();
  fetchFeedback();
});

async function fetchFeedback() {
  const res = await fetch("http://localhost:5000/api/feedback");
  const data = await res.json();

  list.innerHTML = data.map(f => `
    <div class="feedback-item">
      <strong>${f.name}</strong> rated <strong>${f.course}</strong> with ${f.rating}/5
      <p>${f.comment}</p>
    </div>
  `).join('');
}

// Initial fetch
fetchFeedback();
