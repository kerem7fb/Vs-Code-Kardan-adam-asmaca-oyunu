class HangmanGame {
  constructor() {
    this.words = [
      "PROGRAMLAMA",
      "BİLGİSAYAR",
      "JAVASCRIPT",
      "PYTHON",
      "YAZILIM",
      "İNTERNET",
      "TEKNOLOJİ",
      "ALGORİTMA",
      "VERİTABANI",
      "UYGULAMA",
      "KLAVYE",
      "FARE",
      "MONİTÖR",
      "DONANIM",
      "YAZICI",
      "TARAYICI",
      "BELLEK",
      "İŞLEMCİ",
      "AĞ",
      "GÜVENLİK",
      "OYUN",
      "GRAFİK",
      "ANİMASYON",
      "TASARIM",
      "KODLAMA",
      "FRAMEWORK",
      "SUNUCU",
      "İSMİL",
      "DEPOLAMA",
      "BULUT",
    ];
    this.word = "";
    this.guessedLetters = new Set();
    this.remainingGuesses = 6;
    this.gameStatus = "playing"; // 'playing', 'won', 'lost'
    this.usedWords = new Set(); // Kullanılan kelimeleri takip etmek için
  }

  initGame() {
    // Tüm kelimeler kullanıldıysa sıfırla
    if (this.usedWords.size === this.words.length) {
      this.usedWords.clear();
    }

    // Kullanılmamış rastgele bir kelime seç
    let availableWords = this.words.filter((word) => !this.usedWords.has(word));
    this.word =
      availableWords[Math.floor(Math.random() * availableWords.length)];
    this.usedWords.add(this.word);

    this.guessedLetters.clear();
    this.remainingGuesses = 6;
    this.gameStatus = "playing";
    this.updateSnowman();
  }

  guessLetter(letter) {
    if (this.gameStatus !== "playing") return;

    letter = letter.toUpperCase();
    if (!this.guessedLetters.has(letter)) {
      this.guessedLetters.add(letter);
      if (!this.word.includes(letter)) {
        this.remainingGuesses--;
        this.updateSnowman();
      }
    }

    this.checkGameStatus();
  }

  updateSnowman() {
    const snowman = document.querySelector(".snowman");
    if (!snowman) return;

    snowman.innerHTML = `
      <defs>
        <radialGradient id="snowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color:#ffffff" />
          <stop offset="70%" style="stop-color:#f8f9fa" />
          <stop offset="100%" style="stop-color:#e9ecef" />
        </radialGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="0.2"/>
        </filter>
      </defs>
    `;

    if (this.remainingGuesses >= 1) {
      snowman.innerHTML += `
        <circle 
          cx="100" cy="250" r="45" 
          fill="url(#snowGradient)" 
          stroke="#dee2e6" 
          stroke-width="3"
          filter="url(#shadow)"
        >
          <animate attributeName="r" values="44;45;44" dur="4s" repeatCount="indefinite" />
        </circle>
      `;
    } else {
      snowman.innerHTML += `
        <path 
          d="M40,280 Q100,250 160,280" 
          stroke="#dee2e6" 
          stroke-width="5" 
          stroke-linecap="round"
          fill="none"
          filter="url(#shadow)"
        />
      `;
      return;
    }

    if (this.remainingGuesses >= 2) {
      snowman.innerHTML += `
        <circle 
          cx="100" cy="180" r="35" 
          fill="url(#snowGradient)" 
          stroke="#dee2e6" 
          stroke-width="3"
          filter="url(#shadow)"
        >
          <animate attributeName="r" values="34;35;34" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="180" r="4" fill="#495057" />
        <circle cx="100" cy="200" r="4" fill="#495057" />
      `;
    }

    if (this.remainingGuesses >= 3) {
      snowman.innerHTML += `
        <circle 
          cx="100" cy="120" r="30" 
          fill="url(#snowGradient)" 
          stroke="#dee2e6" 
          stroke-width="3"
          filter="url(#shadow)"
        >
          <animate attributeName="r" values="29;30;29" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="160" r="4" fill="#495057" />
      `;
    }

    if (this.remainingGuesses >= 4) {
      snowman.innerHTML += `
        <!-- Sol göz -->
        <circle cx="90" cy="110" r="4" fill="#212529" />
        <circle cx="90" cy="109" r="1" fill="white" />
        <!-- Sağ göz -->
        <circle cx="110" cy="110" r="4" fill="#212529" />
        <circle cx="110" cy="109" r="1" fill="white" />
        
        <!-- Havuç burun -->
        <path 
          d="M98,117 C98,117 100,118 102,117 L100,127" 
          fill="#fd7e14" 
          stroke="#fd7e14"
          stroke-width="0.5"
        />
        
        <!-- Gülümseme -->
        <path 
          d="M88,125 Q100,138 112,125" 
          stroke="#212529" 
          stroke-width="3" 
          stroke-linecap="round"
          fill="none"
        />
        
        <!-- Yanaklar -->
        <circle cx="85" cy="122" r="3" fill="#ffb3b3" opacity="0.5" />
        <circle cx="115" cy="122" r="3" fill="#ffb3b3" opacity="0.5" />
      `;
    }

    if (this.remainingGuesses >= 5) {
      snowman.innerHTML += `
        <line 
          x1="65" y1="180" x2="20" y2="150" 
          stroke="#795548" 
          stroke-width="4" 
          stroke-linecap="round"
        />
        <line 
          x1="135" y1="180" x2="180" y2="150" 
          stroke="#795548" 
          stroke-width="4" 
          stroke-linecap="round"
        />
      `;
    }

    if (this.remainingGuesses >= 6) {
      snowman.innerHTML += `
        <path 
          d="M70,85 L130,85 L130,80 L115,80 L115,50 L85,50 L85,80 L70,80 Z" 
          fill="#212529"
          filter="url(#shadow)"
        />
        <rect x="65" y="85" width="70" height="8" fill="#dc3545" />
      `;
    }

    // Parça göstergelerini güncelle
    const parts = document.querySelectorAll(".snowman-part");
    parts.forEach((part, index) => {
      part.classList.toggle("active", index < this.remainingGuesses);
    });
  }

  getWordDisplay() {
    return this.word
      .split("")
      .map((letter) => (this.guessedLetters.has(letter) ? letter : "_"))
      .join(" ");
  }

  checkGameStatus() {
    if (
      this.word.split("").every((letter) => this.guessedLetters.has(letter))
    ) {
      this.gameStatus = "won";
    } else if (this.remainingGuesses <= 0) {
      this.gameStatus = "lost";
    }
  }
}

// Kar taneleri oluşturma fonksiyonu
function createSnowflakes() {
  const container = document.querySelector(".snowman-container");
  for (let i = 0; i < 30; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(snowflake);
  }
}

// initGame fonksiyonuna ekle
function initGame() {
  game.initGame();
  createKeyboard();
  updateDisplay();
  createSnowflakes(); // Kar tanelerini oluştur
}

function showGameStatus(status) {
  const container = document.createElement("div");
  container.className = `game-status ${status}`;

  const message =
    status === "win"
      ? `
      <h2>🎉 Tebrikler! 🎉</h2>
      <p>Kelimeyi doğru bildiniz: <strong>${game.word}</strong></p>
      <button onclick="this.parentElement.remove(); initGame()" class="new-game-btn">
        Yeni Oyun
      </button>
    `
      : `
      <h2>❄️ Oyun Bitti ❄️</h2>
      <p>Doğru kelime: <strong>${game.word}</strong></p>
      <button onclick="this.parentElement.remove(); initGame()" class="new-game-btn">
        Tekrar Dene
      </button>
    `;

  container.innerHTML = message;
  document.body.appendChild(container);
}

// updateDisplay fonksiyonunu güncelle
function updateDisplay() {
  document.getElementById("wordDisplay").textContent = game.getWordDisplay();
  document.getElementById("remainingGuesses").textContent =
    game.remainingGuesses;

  if (game.gameStatus !== "playing") {
    setTimeout(() => {
      showGameStatus(game.gameStatus === "won" ? "win" : "lose");
    }, 500);
  }
}
