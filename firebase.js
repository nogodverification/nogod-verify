
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
  apiKey: "AIzaSyAXMIqszoXXZv63nkrsV5vYhJY8Obflsc",
  authDomain: "student-demo-3891.firebaseapp.com",
  databaseURL: "https://student-demo-3891-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "student-demo-3891",
  storageBucket: "student-demo-3891.firebasestorage.app",
  messagingSenderId: "105940009919",
  appId: "1:940009919:web:68ab21742140c0b0ec170a"
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
    throw new Error("Invalid progress");
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

export async function saveTrainingAnswer(studentId, page, answer) {
  if (!auth.currentUser) {
    throw new Error("Authentication required");
  }

  if (
    typeof studentId !== "string" ||
    typeof page !== "string" ||
    typeof answer !== "string" ||
    !studentId.trim() ||
    !page.trim() ||
    !answer.trim() ||
    studentId.length > 40 ||
    page.length > 50 ||
    answer.length > 500
  ) {
    throw new Error("Invalid training data");
  }

  const recordRef = push(ref(db, "trainingAnswers"));

  await set(recordRef, {
    uid: auth.currentUser.uid,
    studentId: studentId.trim(),
    page: page.trim(),
    answer: answer.trim(),
    submittedAt: serverTimestamp()
  });
}
