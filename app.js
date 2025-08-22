// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCUb5ySGCLuNwBlCbZx_VuaDfqMtWno1cs",
  authDomain: "tttr-dbde2.firebaseapp.com",
  projectId: "tttr-dbde2",
  storageBucket: "tttr-dbde2.firebasestorage.app",
  messagingSenderId: "296112669273",
  appId: "1:296112669273:web:ae6f583e15705a688be748",
  measurementId: "G-GP1C50C9E9"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// عناصر من الصفحة
const donateBtn = document.getElementById("donateBtn");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const donorsList = document.getElementById("donors");
const totalElem = document.getElementById("total");
const thanksElem = document.getElementById("thanks");

// إضافة تبرع
donateBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!name || !amount) {
    alert("الرجاء إدخال الاسم والمبلغ");
    return;
  }

  await addDoc(collection(db, "donations"), {
    name: name,
    amount: amount,
    time: new Date()
  });

  thanksElem.textContent = `شكراً ${name} على تبرعك الكريم! 🌹`;
  nameInput.value = "";
  amountInput.value = "";
});

// تحديث القائمة لحظياً
onSnapshot(collection(db, "donations"), (snapshot) => {
  donorsList.innerHTML = "";
  let total = 0;
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.name} - ${data.amount} ليرة`;
    donorsList.appendChild(li);
    total += data.amount;
  });
  totalElem.textContent = total;
});