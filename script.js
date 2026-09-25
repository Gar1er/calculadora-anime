// Diccionario de traducciones
const translations = {
    es: {
        subtitle: "Calculadora de Maratones & Ociosidad",
        labelName: "Nombre del Anime (Opcional):",
        placeholderName: "Ej. Jujutsu Kaisen, One Piece...",
        labelEpisodes: "Número de capítulos:",
        placeholderEpisodes: "Ej. 12, 24, 100...",
        labelPace: "Capítulos por día que planeas ver:",
        btnCalculate: "Calcular mi Maratón",
        note: "Nota: Se calcula usando un promedio estándar de 24 minutos por capítulo.",
        totalTimeLabel: "Tiempo Total:",
        relaxPace: "Modo Relax (3 caps/día):",
        godPace: "Modo Dios (10 caps/día):",
        alertError: "Por favor, introduce un número válido de capítulos.",
        daysUnit: "días aprox.",
        oneDay: "1 día exacto"
    },
    en: {
        subtitle: "Marathon & Binge Calculator",
        labelName: "Anime Name (Optional):",
        placeholderName: "E.g. Jujutsu Kaisen, One Piece...",
        labelEpisodes: "Number of episodes:",
        placeholderEpisodes: "E.g. 12, 24, 100...",
        labelPace: "Episodes per day you plan to watch:",
        btnCalculate: "Calculate My Marathon",
        note: "Note: Calculated using a standard average of 24 minutes per episode.",
        totalTimeLabel: "Total Time:",
        relaxPace: "Relax Mode (3 eps/day):",
        godPace: "God Mode (10 eps/day):",
        alertError: "Please enter a valid number of episodes.",
        daysUnit: "days approx.",
        oneDay: "1 exact day"
    },
    ja: {
        subtitle: "一気見・暇つぶし計算機",
        labelName: "アニメ名（任意）:",
        placeholderName: "例：呪術廻戦、ONE PIECE...",
        labelEpisodes: "エピソード数:",
        placeholderEpisodes: "例：12, 24, 100...",
        labelPace: "1日に視聴するエピソード数:",
        btnCalculate: "マラソン時間を計算",
        note: "注：1話あたり平均24分として計算しています。",
        totalTimeLabel: "合計時間:",
        relaxPace: "リラックス (3話/日):",
        godPace: "神モード (10話/日):",
        alertError: "有効なエピソード数を入力してください。",
        daysUnit: "日程度",
        oneDay: "ちょうど1日"
    }
};

let currentLang = 'es';

// Función para cambiar el idioma de la interfaz
function cambiarIdioma(lang) {
    currentLang = lang;
    const t = translations[lang];

    document.getElementById('textSubtitle').innerText = t.subtitle;
    document.getElementById('textLabelName').innerText = t.labelName;
    document.getElementById('animeName').placeholder = t.placeholderName;
    document.getElementById('textLabelEpisodes').innerText = t.labelEpisodes;
    document.getElementById('episodes').placeholder = t.placeholderEpisodes;
    document.getElementById('textLabelPace').innerText = t.labelPace;
    document.getElementById('textBtnCalculate').innerText = t.btnCalculate;
    document.getElementById('textNote').innerText = t.note;
    document.getElementById('textRelaxPace').innerText = t.relaxPace;
    document.getElementById('textGodPace').innerText = t.godPace;

    const episodesInput = document.getElementById('episodes').value;
    if (episodesInput && !isNaN(episodesInput)) {
        calcularTiempo();
    }
}

// Actualiza el número del slider en vivo
function actualizarSlider(valor) {
    document.getElementById('paceValue').innerText = valor;
    const episodesInput = document.getElementById('episodes').value;
    if (episodesInput && !isNaN(episodesInput)) {
        calcularTiempo();
    }
}

function calcularTiempo() {
    const t = translations[currentLang];
    const nameInput = document.getElementById('animeName').value.trim();
    const episodesInput = document.getElementById('episodes').value;
    const customPace = parseInt(document.getElementById('customPace').value);
    const resultsSection = document.getElementById('resultsSection');

    const episodes = parseInt(episodesInput);
    const minutesPerEp = 24;

    if (isNaN(episodes) || episodes <= 0) {
        alert(t.alertError);
        return;
    }

    const animeTitle = nameInput !== "" ? nameInput : (currentLang === 'ja' ? "このアニメ" : currentLang === 'en' ? "your anime" : "tu anime");
    document.getElementById('titleTotal').innerText = `${t.totalTimeLabel} (${animeTitle}):`;

    const totalMinutes = episodes * minutesPerEp;
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    let timeString = `${totalHours} hrs`;
    if (currentLang === 'ja') timeString = `${totalHours}時間`;
    if (remainingMinutes > 0) {
        timeString += currentLang === 'ja' ? ` ${remainingMinutes}分` : ` y ${remainingMinutes} min`;
    }
    const totalHoursDecimal = (totalMinutes / 60).toFixed(1);
    document.getElementById('totalTime').innerText = `${timeString} (${totalHoursDecimal}h)`;

    // Ritmo personalizado
    const customLabelText = currentLang === 'ja' ? `自分のペース (${customPace}話/日):` : currentLang === 'en' ? `Your pace (${customPace} eps/day):` : `A tu ritmo (${customPace} caps/día):`;
    document.getElementById('customPaceLabel').innerText = customLabelText;
    document.getElementById('customDaysResult').innerText = calcularDias(episodes, customPace, t);

    // Rangos
    let badgeText = "";
    let badgeColor = "";
    let comment = "";

    if (episodes <= 15) {
        badgeText = currentLang === 'ja' ? "🔥 週末一気見ランク" : currentLang === 'en' ? "🔥 Weekend Marathon Rank" : "🔥 Rango: Maratón de Fin de Semana";
        badgeColor = "#10b981";
        comment = currentLang === 'ja' ? "簡単！あっという間に見終わります。" : currentLang === 'en' ? "Easy peasy! You'll finish it in no time." : "¡Facilísimo! Te lo acabas en un par de días.";
    } else if (episodes <= 50) {
        badgeText = currentLang === 'ja' ? "🔥 標準シーズンランク" : currentLang === 'en' ? "⚡ Standard Season Rank" : "⚡ Rango: Temporada Estándar";
        badgeColor = "#3b82f6";
        comment = currentLang === 'ja' ? "ちょうどいいボリューム！毎日ハラハラしますね。" : currentLang === 'en' ? "A solid dose of story. Enjoy the daily cliffhangers!" : "Una dosis perfecta de historia. ¡A sufrir con los capítulos!";
    } else if (episodes <= 150) {
        badgeText = currentLang === 'ja' ? "🌀 本気オタクランク" : currentLang === 'en' ? "🌀 Committed Otaku Rank" : "🌀 Rango: Otaku de Compromiso";
        badgeColor = "#8b5cf6";
        comment = currentLang === 'ja' ? "ここから本格的になります。寝不足に注意！" : currentLang === 'en' ? "Things get serious here. Sleep is optional!" : "Aquí la cosa se pone seria. ¡A no dormir!";
    } else {
        badgeText = currentLang === 'ja' ? "👑 アニメの怪物 / 終わらない旅ランク" : currentLang === 'en' ? "👑 Anime Monster / Never-ending Journey" : "👑 Rango: Monstruo del Anime / Misión Imposible";
        badgeColor = "#ec4899";
        comment = currentLang === 'ja' ? "ワンピ級！コーヒーと覚悟が必要です。" : currentLang === 'en' ? "Legendary territory. Stock up on coffee!" : "¡Terrenos legendarios tipo One Piece. Prepara café!";
    }

    const badge = document.getElementById('rankBadge');
    badge.innerText = badgeText;
    badge.style.backgroundColor = badgeColor;

    // Equivalentes divertidos traducidos
    let funFact = "";
    if (currentLang === 'ja') {
        if (totalHoursDecimal < 5) funFact = "🍿 映画3部作を見るか、ゲームを丸一日プレイするのに相当します。";
        else if (totalHoursDecimal < 15) funFact = "🍕 ピザを4枚完食しながら、早く寝るフリをするのに相当します。";
        else if (totalHoursDecimal < 40) funFact = "☕ 友達から「まだ生きてる？」と心配されるほど夜更かしするのに相当します。";
        else funFact = "🌌 伝説級！アルバイトを始めるか、ゼロからギターをマスターするのに相当します。";
    } else if (currentLang === 'en') {
        if (totalHoursDecimal < 5) funFact = "🍿 Equivalent to watching a movie trilogy or spending a whole afternoon gaming.";
        else if (totalHoursDecimal < 15) funFact = "🍕 Equivalent to eating 4 whole pizzas while pretending you'll go to sleep early.";
        else if (totalHoursDecimal < 40) funFact = "☕ Equivalent to staying up late so many nights your friends start checking if you're alive.";
        else funFact = "🌌 Epic level! Equivalent to starting a part-time job or learning the guitar from scratch.";
    } else {
        if (totalHoursDecimal < 5) {
            funFact = "🍿 Equivalente a ver una trilogía de películas o pasarte una tarde entera jugando videojuegos.";
        } else if (totalHoursDecimal < 15) {
            funFact = "🍕 Equivalente a comerte unas 4 pizzas enteras mientras finges que vas a dormir temprano.";
        } else if (totalHoursDecimal < 40) {
            funFact = "☕ Equivalente a desvelarte tantas noches que tus amigos empezarán a preguntar si sigues vivo.";
        } else {
            funFact = "🌌 ¡Nivel épico! Equivale a trabajar en un empleo de medio tiempo o aprender a tocar la guitarra desde cero.";
        }
    }

    document.getElementById('funFactText').innerText = funFact;
    document.getElementById('commentText').innerText = comment;

    document.getElementById('pace3').innerText = calcularDias(episodes, 3, t);
    document.getElementById('pace10').innerText = calcularDias(episodes, 10, t);

    resultsSection.classList.add('active');
}

function calcularDias(totalEp, capsPorDia, t) {
    const diasDecimal = totalEp / capsPorDia;
    const diasCompletos = Math.ceil(diasDecimal);
    if (diasCompletos === 1) return t.oneDay;
    return `${diasCompletos} ${t.daysUnit}`;
}