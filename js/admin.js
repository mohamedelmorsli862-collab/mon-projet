// 1. نظام حماية الدخول (Admin Guard)
const currentAdmin = JSON.parse(localStorage.getItem("user"));
if (!currentAdmin || currentAdmin.role !== "admin") {
    alert("تنبيه: لا تملك صلاحيات الوصول لهذا الديوان!");
    location.href = "login.html";
}

// 2. دالة النشر الأساسية
function publish() {
    const textInput = document.getElementById("text");
    const imgInput = document.getElementById("img");
    const preview = document.getElementById("imagePreview");

    // التحقق من وجود نص
    if (!textInput.value.trim()) {
        alert("يرجى كتابة مرسوم (وصف) للحدث!");
        return;
    }

    const file = imgInput.files[0];

    // حالة وجود صورة
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            savePost(reader.result, textInput.value);
            // تصفير الحقول بعد النجاح
            textInput.value = "";
            imgInput.value = "";
            preview.style.display = 'none';
        };
        reader.readAsDataURL(file);
    } else {
        // نشر بدون صورة
        savePost("", textInput.value);
        textInput.value = "";
    }
}

// 3. دالة الحفظ في Storage
function savePost(imageData, postText) {
    try {
        let posts = JSON.parse(localStorage.getItem("posts") || "[]");

        const newPost = {
            image: imageData,
            text: postText,
            likes: 0,
            comments: [],
            date: new Date().toLocaleDateString('ar-EG')
        };

        // unshift تضع الخبر في بداية المصفوفة (أعلى الصفحة)
        posts.unshift(newPost);
        
        localStorage.setItem("posts", JSON.stringify(posts));
        alert("✅ تم بث الخبر في أرجاء المملكة!");
    } catch (e) {
        alert("❌ خطأ: المساحة ممتلئة! يرجى استخدام صورة أصغر حجماً.");
        console.error("Storage Error:", e);
    }
}

// 4. دالة إضافة مسؤول جديد
function addAdmin() {
    const email = document.getElementById("adminEmail").value;
    const pass = document.getElementById("adminPass").value;

    if (!email || !pass) {
        alert("يرجى ملء بيانات المسؤول الجديد.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({
        email: email,
        pass: pass,
        role: "admin"
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("✅ تم منح صلاحيات المسؤول لـ " + email);
    
    document.getElementById("adminEmail").value = "";
    document.getElementById("adminPass").value = "";
}