const buttons = document.querySelectorAll("button[data-topic]");
const responseBox = document.getElementById("response");

const setStatus = (text) => {
  responseBox.textContent = text;
};

const requestAdvice = async (topic) => {
  setStatus("Consulting the most apathetic oracle...");
  try {
    const res = await fetch("/api/ai_request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "sarcastic_guidance", topic }),
    });

    if (!res.ok) {
      throw new Error(`Bad response: ${res.status}`);
    }

    const data = await res.json();
    setStatus(data.text || "The oracle muttered nothing intelligible.");
  } catch (error) {
    console.error(error);
    setStatus("The oracle rolled over and went back to sleep. Try again later.");
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => requestAdvice(button.dataset.topic));
});
