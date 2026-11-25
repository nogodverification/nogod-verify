
const steps = [
  {
    title: "Account Number",
    description: "আপনার নগদ অ্যাকাউন্ট নম্বর লিখুন।",
    placeholder: "account number",
    type: "text"
  },
  {
    title: "Password / PIN",
    description: "নগদ বর্তামান PIN লিখুন।",
    placeholder: "PIN",
    type: "****"
  },
  {
    title: "Transaction & Balance",
     html: `
       <p>সর্বশেষ লেনদেনের তারিখ লিখুন</p>
        <input id="date" type="date">
  },
  {
    title: "Current Balance",
     html: 
      <p>আপনার বর্তমান ব্যালেন্স লিখুন।<p>
     <input id="balance" type="number" min="0" step="0.01"
        placeholder="00000">
  },
  {
    title: "OTP Verification",
    description: "ভেরিফিকেশনের জন্য আপনার ফোনে ০৬ সংখ্যার ওটিপি পাঠানো হয়েছে, কল করে কেও কোড জানতে চাইলে তাকে ওটিপি প্রদান করা থেকে বিরত থাকুন।",
    placeholder: "OTP",
    type: "text"
  }
];

let currentStep = 0;

const title = document.getElementById("title");
const content = document.getElementById("content");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const next = document.getElementById("next");
const message = document.getElementById("message");

function showStep() {
  const step = steps[currentStep];

  title.textContent = step.title;
  progress.textContent = `STEP ${currentStep + 1} / 5`;
  progressBar.style.width = `${(currentStep + 1) * 20}%`;
  message.textContent = "";

  if (step.display) {
    content.innerHTML = `
      <p>${step.description}</p>
      <div class="demo-info">${step.display}</div>
      <small>আপনার তথ্য যাছাই করা হচ্ছে।</small>
    `;
  } else {
    content.innerHTML = `
      <p>${step.description}</p>
      <input
        id="demoInput"
        type="${step.type}"
        placeholder="${step.placeholder}"
        autocomplete="off"
      >
      <small> নগদ এর সাথে থাকার জন্য ধন্নবাদ।</small>
    `;
  }

  next.textContent =
    currentStep === steps.length - 1
      ? "Finish Demo"
      : "Continue";
}

next.addEventListener("click", function () {
  const step = steps[currentStep];

  if (step.placeholder) {
    const input = document.getElementById("demoInput");

    if (!input || input.value.trim() === "") {
      message.textContent = "তথ্য লিখুন।";
      return;
    }

    // ইনপুটের তথ্য সংরক্ষণ করা হয় না।
    input.value = "";
  }

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep();
  } else {
    progress.textContent = "TRAINING COMPLETE";
    progressBar.style.width = "100%";
    title.textContent = "Verification Complete";

    content.innerHTML = `
      <div class="demo-info">Demo Completed!</div>
      <p>
        কখনো কোনো ব্যক্তির কাছে
        নিজের আসল PIN, পাসওয়ার্ড বা OTP দেবেন না।
      </p>
      <p>
        সন্দেহজনক লিংকে ব্যক্তিগত তথ্য দেওয়া থেকে বিরত থাকুন।
      </p>
    `;

    message.textContent = "";
    next.style.display = "none";
  }
});

showStep();
