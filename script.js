
const steps = [
  {
    title: "Demo Account",
    description: "কাল্পনিক ডেমো অ্যাকাউন্ট নাম লিখুন।",
    placeholder: "যেমন DEMO123"
  },
  {
    title: "Demo Password",
    description: "প্রশিক্ষণের জন্য কাল্পনিক পাসওয়ার্ড লিখুন।",
    placeholder: "Demo password"
  },
  {
    title: "Transaction Demo",
    html: `
      <p>ডেমো লেনদেনের তারিখ লিখুন</p>
      <input id="date" type="date">

      <p>কাল্পনিক ব্যালেন্স লিখুন</p>
      <input id="balance" type="text" placeholder="যেমন 500">
    `
  },
  {
    title: "OTP Safety Awareness",
    description: "প্রশিক্ষণে কোনো OTP প্রয়োজন নেই। কখনো নিজের আসল OTP কাউকে দেবেন না।"
  }
];

let currentStep = 0;

const title = document.getElementById("title");
const content = document.getElementById("content");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const next = document.getElementById("next");
const back = document.getElementById("back");
const message = document.getElementById("message");

function showStep() {
  const step = steps[currentStep];

  back.disabled = currentStep === 0;

  title.textContent = step.title;
  progress.textContent = `STEP ${currentStep + 1} / ${steps.length}`;
  progressBar.style.width =
    `${((currentStep + 1) / steps.length) * 100}%`;

  message.textContent = "";

  const logo = `
    <div class="demo-logo">
      <img src="images.png" alt="SafePay Logo">
      <p>SafePay Training Demo</p>
    </div>
  `;

  if (step.html) {
    content.innerHTML = logo + step.html;
  } else {
    content.innerHTML = `
      ${logo}
      <p>${step.description}</p>
      ${
        currentStep < 2
          ? `<input id="demoInput" type="text"
              placeholder="${step.placeholder}"
              autocomplete="off">`
          : ""
      }
    `;
  }

  next.textContent =
    currentStep === steps.length - 1 ? "Finish" : "Continue";
  next.style.display = "inline-block";
}

back.addEventListener("click", function () {
  if (currentStep > 0) {
    currentStep--;
    showStep();
  }
});

next.addEventListener("click", function () {
  if (currentStep === 0 || currentStep === 1) {
    const input = document.getElementById("demoInput");

    if (!input || !input.value.trim()) {
      message.textContent = "ডেমো তথ্য লিখুন।";
      return;
    }
  }

  if (currentStep === 2) {
    const date = document.getElementById("date");
    const balance = document.getElementById("balance");

    if (!date.value || !balance.value.trim()) {
      message.textContent = "ডেমো তথ্য পূরণ করুন।";
      return;
    }
  }

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep();
  } else {
    progress.textContent = "TRAINING COMPLETE";
    progressBar.style.width = "100%";
    title.textContent = "প্রশিক্ষণ সম্পন্ন";

    content.innerHTML = `
      <div class="demo-logo">
        <img src="images.png" alt="SafePay Logo">
        <p>SafePay Training Demo</p>
      </div>
      <p>প্রশিক্ষণ সফলভাবে সম্পন্ন হয়েছে।</p>
      <p>নিজের আসল PIN, পাসওয়ার্ড ও OTP গোপন রাখুন।</p>
    `;

    message.textContent = "";
    next.style.display = "none";
  }
});

showStep();
