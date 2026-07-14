document.addEventListener('DOMContentLoaded', function () {
    // ၁။ CMS က သိမ်းလိုက်တဲ့ data/menu.json ဖိုင်ကို လှမ်းဖတ်ခြင်း
    fetch('data/menu.json')
        .then(response => response.json())
        .then(data => {
            const bookContainer = document.getElementById('book');
            const items = data.items || [];

            // အစဉ်လိုက်နံပါတ် (Order) အတိုင်း စီစဉ်ခြင်း
            items.sort((a, b) => a.order - b.order);

            // ၂။ မျက်နှာဖုံး (Cover) တည်ဆောက်ခြင်း
            let htmlContent = `
                <div class="my-page cover">
                    <div class="page-content">
                        <img src="images/logo.png" alt="Logo" class="logo-image">
                        <h1>AI GURU TECH.</h1>
                        <p class="myanmar-text">သင့်အတွက် Digital Menu Book</p>
                        <span class="myanmar-text" style="margin-top: 20px;">စာမျက်နှာကို ဖိဆွဲပြီး လှန်ကြည့်ပါ ➔</span>
                    </div>
                </div>
            `;

            // ၃။ Admin က တင်လိုက်တဲ့ စာမျက်နှာများကို တစ်ရွက်ချင်း ပေါင်းထည့်ခြင်း
            items.forEach(item => {
                let linkHtml = item.link_url ? `<a href="${item.link_url}" target="_blank" class="btn-link myanmar-text">${item.link_text || 'လေ့လာရန်'}</a>` : '';

                htmlContent += `
                    <div class="my-page">
                        <div class="page-content">
                            <h2>${item.title}</h2>
                            <img src="${item.image}" alt="${item.title}" class="page-image">
                            <p class="myanmar-text">${item.description}</p>
                            ${linkHtml}
                        </div>
                    </div>
                `;
            });

            // ၄။ ကျောဖုံး (Back Cover) ဆက်ထည့်ခြင်း
            htmlContent += `
                <div class="my-page cover">
                    <div class="page-content">
                        <h2 class="myanmar-text" style="color: white; margin-bottom: 30px;">ကျေးဇူးတင်ပါသည်!</h2>
                        <p class="myanmar-text" style="margin-bottom: 20px;">ဆက်သွယ်စုံစမ်းရန်</p>
                        <div class="contact-links">
                            <a href="https://t.me/Leo_of_TheMars" target="_blank" class="btn-link myanmar-text telegram-btn">Telegram သို့ ဆက်သွယ်ရန်</a>
                            <a href="viber://chat?number=%2B959450064323" class="btn-link myanmar-text viber-btn">Viber သို့ ဆက်သွယ်ရန်</a>
                        </div>
                        <div class="footer">The End</div>
                        
                        <div class="footer">
                            <a href="/admin" target="_blank" style="color: inherit; text-decoration: none;">AI GURU</a>
                        </div>
                    </div>
                </div>
            `;

            // HTML ထဲသို့ အားလုံးပေါင်းထည့်လိုက်ခြင်း
            bookContainer.innerHTML = htmlContent;

            // ၅။ စာအုပ်လှန်သည့် (PageFlip) Library ကို စတင် အသက်သွင်းခြင်း
            const pageFlip = new St.PageFlip(bookContainer, {
                width: 350,
                height: 500,
                size: "fixed",
                minWidth: 300,
                maxWidth: 500,
                minHeight: 400,
                maxHeight: 700,
                showCover: true,
                maxShadowOpacity: 0.5,
                mobileScrollSupport: false
            });

            pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));
        })
        .catch(error => {
            console.error("Data ဖတ်ရာတွင် အခက်အခဲဖြစ်နေပါသည်:", error);
        });
});