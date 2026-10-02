// ==========================================
// ANIME PORTAL & TIME - SCRIPT PRINCIPAL
// ==========================================

const translations = {
    es: {
        headerTitle: "ANIME PORTAL & TIME",
        headerSub: "Tu centro de control y cálculo otaku definitivo",
        topWeeklyTitle: "🔥 Top Semanal",
        calcHeader: "ANIME TIME",
        calcSub: "Calculadora & Rangos",
        labelUser: "Tu Nombre o Apodo:",
        placeholderUser: "Ej. OtakuPro99, Carlos...",
        labelName: "Nombre del Anime:",
        placeholderName: "Ej. Naruto, Bleach...",
        labelFormat: "Formato / Duración:",
        optStandard: "Serie Estándar (24 min/cap)",
        optShort: "Formato Corto (12 min/cap)",
        optMovie: "Película (120 min)",
        labelEps: "Número de Capítulos:",
        placeholderEps: "Ej. 12, 24, 100...",
        labelPacing: "Capítulos por día que planeas ver:",
        btnCalc: "Calcular Maratón",
        resHeader: "Resumen del Maratón",
        resTime: "Tiempo total: --",
        resDays: "Días estimados: --",
        resBadge: "Rango: --",
        upcomingTitle: "📅 Próximos Estrenos",
        seasonTitle: "Temporada Otoño",
        alertError: "Por favor, ingresa un número válido de capítulos."
    },
    en: {
        headerTitle: "ANIME PORTAL & TIME",
        headerSub: "Your ultimate otaku control and calculation center",
        topWeeklyTitle: "🔥 Weekly Top",
        calcHeader: "ANIME TIME",
        calcSub: "Calculator & Ranks",
        labelUser: "Your Name or Nickname:",
        placeholderUser: "E.g. OtakuPro99, Carlos...",
        labelName: "Anime Name:",
        placeholderName: "E.g. Naruto, Bleach...",
        labelFormat: "Format / Duration:",
        optStandard: "Standard Series (24 min/ep)",
        optShort: "Short Format (12 min/ep)",
        optMovie: "Movie (120 min)",
        labelEps: "Number of Episodes:",
        placeholderEps: "E.g. 12, 24, 100...",
        labelPacing: "Episodes per day you plan to watch:",
        btnCalc: "Calculate Marathon",
        resHeader: "Marathon Summary",
        resTime: "Total time: --",
        resDays: "Estimated days: --",
        resBadge: "Rank: --",
        upcomingTitle: "📅 Upcoming Releases",
        seasonTitle: "Autumn Season",
        alertError: "Please enter a valid number of episodes."
    },
    jp: {
        headerTitle: "アニメポータル＆タイム",
        headerSub: "究極のオタクコントロール＆計算センター",
        topWeeklyTitle: "🔥 週間トップ",
        calcHeader: "アニメタイム",
        calcSub: "電卓 ＆ ランク",
        labelUser: "お名前またはニックネーム:",
        placeholderUser: "例: オタクプロ99, 太郎...",
        labelName: "アニメ名:",
        placeholderName: "例: ナルト, ブリーチ...",
        labelFormat: "フォーマット / 長さ:",
        optStandard: "標準シリーズ (24分/話)",
        optShort: "短編形式 (12分/話)",
        optMovie: "映画 (120分)",
        labelEps: "話数:",
        placeholderEps: "例: 12, 24, 100...",
        labelPacing: "1日に見る予定の話数:",
        btnCalc: "マラソンを計算",
        resHeader: "マラソン概要",
        resTime: "合計時間: --",
        resDays: "目安日数: --",
        resBadge: "ランク: --",
        upcomingTitle: "📅 今後のリリース",
        seasonTitle: "秋アニメ",
        alertError: "有効な話数を入力してください。"
    }
};

function calculateAnime() {
    const lang = document.getElementById('langSelect').value;
    
    const userAliasInput = document.getElementById('userName');
    const userAlias = userAliasInput ? userAliasInput.value.trim() : "";
    
    const animeInput = document.getElementById('animeName').value.trim();
    const animeName = animeInput || (lang === 'en' ? "Your anime" : lang === 'jp' ? "あなたのアニメ" : "Tu anime");
    
    const durationPerEp = parseInt(document.getElementById('episodeType').value);
    const eps = parseInt(document.getElementById('episodeCount').value);
    const epsPerDay = parseInt(document.getElementById('pacingRange').value);

    const alertMsg = translations[lang] ? translations[lang].alertError : "Por favor, ingresa un número válido de capítulos.";

    if (isNaN(eps) || eps <= 0) {
        alert(alertMsg);
        return;
    }

    const totalMinutes = eps * durationPerEp;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const daysNeeded = Math.ceil(eps / epsPerDay);

    let rank = "🌱 Principiante de Shonen";
    if (lang === 'en') {
        rank = "🌱 Shonen Beginner";
        if (eps > 50) rank = "⚡ Expert Marathoner";
        if (eps > 150) rank = "🔥 Legendary Otaku";
        if (eps > 300) rank = "👑 God of Anime and Leisure";
    } else if (lang === 'jp') {
        rank = "🌱 初心者アニメファン";
        if (eps > 50) rank = "⚡ エキスパート・マラソン";
        if (eps > 150) rank = "🔥 伝説のオタク";
        if (eps > 300) rank = "👑 アニメの神様";
    } else {
        if (eps > 50) rank = "⚡ Maratonista Experto";
        if (eps > 150) rank = "🔥 Otaku Legendario";
        if (eps > 300) rank = "👑 Dios del Anime y el Ocio";
    }

    let greetingPrefix = "";
    if (userAlias) {
        if (lang === 'en') greetingPrefix = `Hey, ${userAlias}! `;
        else if (lang === 'jp') greetingPrefix = `${userAlias}さん、`;
        else greetingPrefix = `¡Hola, ${userAlias}! `;
    }

    if (lang === 'en') {
        document.getElementById('resTitle').innerText = `${greetingPrefix}Marathon for: ${animeName}`;
        document.getElementById('resTotalTime').innerText = `⏱️ Total time: ${hours} hrs ${minutes} min`;
        document.getElementById('resDaysToFinish').innerText = `📅 You will finish in approx. ${daysNeeded} days watching ${epsPerDay} eps/day`;
        document.getElementById('resBadge').innerText = `Rank: ${rank}`;
    } else if (lang === 'jp') {
        document.getElementById('resTitle').innerText = `${greetingPrefix}アニメ「${animeName}」のマラソン`;
        document.getElementById('resTotalTime').innerText = `⏱️ 合計時間: ${hours}時間 ${minutes}分`;
        document.getElementById('resDaysToFinish').innerText = `📅 1日${epsPerDay}話見て、約${daysNeeded}日で終わります`;
        document.getElementById('resBadge').innerText = `ランク: ${rank}`;
    } else {
        document.getElementById('resTitle').innerText = `${greetingPrefix}Maratón para: ${animeName}`;
        document.getElementById('resTotalTime').innerText = `⏱️ Tiempo total: ${hours} hrs ${minutes} min`;
        document.getElementById('resDaysToFinish').innerText = `📅 Lo terminarás en aprox. ${daysNeeded} días viendo ${epsPerDay} caps/día`;
        document.getElementById('resBadge').innerText = `Rango: ${rank}`;
    }
    
    document.getElementById('resultsArea').style.display = "block";
}

// Lógica del cambio de idioma (incluyendo las nuevas etiquetas y placeholders)
document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('langSelect');
    
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            const t = translations[selectedLang];

            if (!t) return;

            document.querySelector('header h1').innerText = t.headerTitle;
            document.querySelector('header p').innerText = t.headerSub;
            
            const widgets = document.querySelectorAll('.card-widget');
            if (widgets.length >= 2) {
                widgets[0].querySelector('h3').innerText = t.topWeeklyTitle;
                widgets[1].querySelector('h3').innerText = t.upcomingTitle;
                if (widgets[1].querySelector('p')) {
                    widgets[1].querySelector('p').innerText = t.seasonTitle;
                }
            }

            document.querySelector('.card-calculator h2').innerText = t.calcHeader;
            document.querySelector('.card-calculator p').innerText = t.calcSub;
            
            // Actualizar etiquetas del formulario
            const labels = document.querySelectorAll('.card-calculator label');
            if (labels.length >= 4) {
                labels[0].innerText = t.labelUser;
                labels[1].innerText = t.labelName;
                labels[2].innerText = t.labelFormat;
                labels[3].innerText = t.labelEps;
            }

            // Actualizar placeholders de los inputs
            document.getElementById('userName').placeholder = t.placeholderUser;
            document.getElementById('animeName').placeholder = t.placeholderName;
            document.getElementById('episodeCount').placeholder = t.placeholderEps;
            document.querySelector('.btn-calculate').innerText = t.btnCalc;

            const options = document.getElementById('episodeType').options;
            if (options.length >= 3) {
                options[0].text = t.optStandard;
                options[1].text = t.optShort;
                options[2].text = t.optMovie;
            }
        });
    }
});