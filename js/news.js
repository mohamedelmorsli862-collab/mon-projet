// دالة لجلب البيانات من localStorage وضمان تحديثها
function getLatestPosts() {
    return JSON.parse(localStorage.getItem("posts") || "[]");
}

const box = document.getElementById("posts");

// دالة عرض الأخبار بتنسيق أسطوري
function displayPosts() {
    // جلب أحدث نسخة من البيانات عند كل عملية عرض
    const currentPosts = getLatestPosts();
    
    box.innerHTML = ""; 

    if (currentPosts.length === 0) {
        box.innerHTML = `<p style="text-align:center; opacity:0.5; padding:50px;">لا توجد أخبار منشورة في ديوان المملكة حالياً...</p>`;
        return;
    }

    // عكس المصفوفة لعرض الأحدث في الأعلى دون التأثير على المصفوفة الأصلية
    [...currentPosts].reverse().forEach((p, originalIndex) => {
        // بما أننا عكسنا المصفوفة، نحتاج للوصول للمؤشر الأصلي (الترتيب في المصفوفة الحقيقية)
        const i = currentPosts.length - 1 - originalIndex;

        const postCard = document.createElement("article");
        postCard.className = "news-card";
        postCard.style.animationDelay = `${originalIndex * 0.1}s`;
        postCard.style.opacity = "1"; // التأكد من الظهور

        postCard.innerHTML = `
            ${p.image ? `<img src="${p.image}" style="width:100%; height:250px; object-fit:cover; border-radius:10px; margin-bottom:15px; border: 1px solid var(--border);">` : ''}
            
            <div class="news-meta">
                <span>📅 ${p.date || 'اليوم'}</span>
                <span>👤 بواسطة: ديوان المملكة</span>
            </div>

            <div class="news-content">
                <p style="white-space: pre-wrap; font-size: 1.1rem; line-height: 1.8;">${p.text}</p>
            </div>

            <div class="actions" style="margin-top:20px; display:flex; gap:15px; border-top: 1px solid var(--border); padding-top:15px;">
                <button onclick="like(${i})" style="background:none; border:1px solid var(--primary); color:var(--primary); padding:8px 20px; border-radius:20px; cursor:pointer; transition:0.3s; font-family:'Cairo';">
                    ❤️ ${p.likes || 0} إعجاب
                </button>
                <button onclick="comment(${i})" style="background:none; border:1px solid var(--gold); color:var(--gold); padding:8px 20px; border-radius:20px; cursor:pointer; transition:0.3s; font-family:'Cairo';">
                    💬 تعليق (${p.comments ? p.comments.length : 0})
                </button>
            </div>

            ${p.comments && p.comments.length > 0 ? `
                <div class="comments-preview" style="margin-top:15px; font-size:13px; opacity:0.8; background:rgba(255,255,255,0.05); padding:12px; border-radius:10px; border-right: 3px solid var(--gold);">
                    <strong>آخر صدى للمواطنين:</strong>
                    <p style="margin-top:5px;">${p.comments[p.comments.length - 1]}</p>
                </div>
            ` : ''}
        `;
        box.appendChild(postCard);
    });
}

// دالة الإعجاب (Like)
window.like = function(i) {
    let currentPosts = getLatestPosts();
    currentPosts[i].likes = (currentPosts[i].likes || 0) + 1;
    localStorage.setItem("posts", JSON.stringify(currentPosts));
    displayPosts(); 
};

// دالة التعليق (Comment)
window.comment = function(i) {
    const c = prompt("اكتب تعليقك ليوضع في سجلات المملكة:");
    if (!c) return;
    
    let currentPosts = getLatestPosts();
    if (!currentPosts[i].comments) currentPosts[i].comments = [];
    currentPosts[i].comments.push(c);
    
    localStorage.setItem("posts", JSON.stringify(currentPosts));
    displayPosts(); 
};

// تشغيل العرض عند التحميل
document.addEventListener('DOMContentLoaded', displayPosts);