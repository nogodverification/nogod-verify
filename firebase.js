import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  push,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAXMI2qszoXXZv63nkrsV5vYhJY8Obflsc",
  authDomain: "student-demo-3891b.firebaseapp.com",
  databaseURL: "https://student-demo-3891b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "student-demo-3891b",
  storageBucket: "student-demo-3891b.firebasestorage.app",
  messagingSenderId: "105940009919",
  appId: "1:105940009919:web:68ab21742140c0b0ec170a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export async function startDemoProgress() {
  const result = await signInAnonymously(auth);
  return result.user.uid;
}

export async function updateDemoProgress(uid, step, status) {
  if (!uid || !Number.isInteger(step) || step < 1 || step > 4) {
    throw new Error("Invalid demo progress");
  }

  if (!["started", "in_progress", "completed"].includes(status)) {
    throw new Error("Invalid status");
  }

  await set(ref(db, "progress/" + uid), {
    step,
    status,
    updatedAt: serverTimestamp()
  });
}
export async function submitTrainingQuiz(consent, demoId, answers) {
  if (consent !== true) {
    throw new Error("Consent required");
  }

  if (
    typeof demoId !== "string" ||
    !/^[A-Za-z0-9_-]{1,40}$/.test(demoId.trim())
  ) {
    throw new Error("Invalid Demo ID");
  }

  if (!Array.isArray(answers) || answers.length !== 4) {
    throw new Error("Invalid answers");
  }

  const cleanAnswers = answers.map(a =>
    typeof a === "string" ? a.trim() : ""
  );

  if (cleanAnswers.some(a => !a || a.length > 500)) {
    throw new Error("প্রতিটি উত্তর লিখুন।");
  }

  const credential = await signInAnonymously(auth);
  const uid = credential.user.uid;

  const pages = ["Page 1", "Page 2", "Page 3", "Page 4"];

  for (let i = 0; i < 4; i++) {
    const recordRef = push(ref(db, "trainingAnswers"));

    await set(recordRef, {
      uid,
      demoId: demoId.trim(),
      page: pages[i],
      answer: cleanAnswers[i],
      submittedAt: serverTimestamp()
    });
  }

  return true;
}
