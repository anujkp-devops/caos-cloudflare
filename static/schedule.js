const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const scoreLine = document.getElementById("score");

let score = 0;
let tasks = [];
let idCounter = 0;

const updateScore = (delta) => {
  score += delta;
  scoreLine.textContent = `Score: ${score}`;
};

const renderTasks = () => {
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.style.border = "1px solid #fff";
    li.style.padding = "0.75rem";

    const title = document.createElement("p");
    title.textContent = task.text;
    li.appendChild(title);

    const controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.gap = "0.5rem";
    controls.style.marginTop = "0.5rem";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete Now (-10)";
    completeBtn.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      updateScore(-10);
      renderTasks();
    });

    const postponeBtn = document.createElement("button");
    postponeBtn.textContent = "Postpone (+5)";
    postponeBtn.addEventListener("click", () => {
      updateScore(5);
      li.classList.add("postponed");
      postponeBtn.disabled = true;
      postponeBtn.textContent = "Postponed";
    });

    controls.appendChild(completeBtn);
    controls.appendChild(postponeBtn);
    li.appendChild(controls);
    list.appendChild(li);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: idCounter++, text });
  input.value = "";
  renderTasks();
});

renderTasks();
