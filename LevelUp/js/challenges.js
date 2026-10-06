let allChallenges = [];

document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth('user')) return;

    allChallenges = data(KEYS.challenges);
    render(allChallenges);

    document.getElementById('search').addEventListener('input', filter);
    document.getElementById('category').addEventListener('change', filter);
});

function filter() {
    const q = document.getElementById('search').value.toLowerCase();
    const cat = document.getElementById('category').value;

    render(
        allChallenges.filter(c =>
            c.title.toLowerCase().includes(q) &&
            (!cat || c.category === cat)
        )
    );
}

const challengeImages = {
    "30 Menit Membaca": "assets/images/membaca.png",
    "Olahraga Pagi": "assets/images/olahraga.png",
    "Belajar Skill Baru": "assets/images/belajar.png",
    "Digital Detox": "assets/images/detox.png",
    "nonton anime": "assets/images/anime.png",
    "jogging": "assets/images/jogging.png"
};

function render(items) {
    document.getElementById('challengeList').innerHTML =
        items.length
            ? items.map(c => `
                <div class="card challenge-card">

                    <img 
                        src="${challengeImages[c.title] || 'assets/images/logo.png'}"
                        alt="${c.title}"
                        class="challenge-image"
                    >

                    <span class="badge">${c.category}</span>

                    <h3>${c.title}</h3>

                    <p class="muted">${c.description}</p>

                    <p>
                        <b>${c.points} poin</b> · ${c.difficulty}
                    </p>

                    <a class="btn btn-primary" href="challenge-detail.html?id=${c.id}">
                        Lihat Detail
                    </a>

                </div>
            `).join('')
            : '<div class="empty">Challenge tidak ditemukan.</div>';
}