const ADMIN_EMAIL = "7modee511@gmail.com";
const ADMIN_PASS  = "81215711Ahmad$";

function login() {
  const email = document.getElementById("email").value;
  const pass  = document.getElementById("password").value;

  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    localStorage.setItem("user", JSON.stringify({email, role:"admin"}));
    location.href = "admin.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.pass === pass);

  if (!user) return alert("بيانات خاطئة");

  localStorage.setItem("user", JSON.stringify(user));
  location.href = "news.html";
}

function register() {
  const email = document.getElementById("email").value;
  const pass  = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push({email, pass, role:"user"});
  localStorage.setItem("users", JSON.stringify(users));

  alert("تم إنشاء الحساب");
  location.href = "login.html";
}