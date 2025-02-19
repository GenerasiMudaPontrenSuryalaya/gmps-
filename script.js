// Mengambil daftar ID Admin dari localStorage atau menggunakan default jika kosong
const validAdminIds = JSON.parse(localStorage.getItem('adminIds')) || ['admin1', 'admin2', 'admin3'];

// Fungsi untuk login
function login(event) {
    event.preventDefault();
    const adminId = document.getElementById('adminId').value;
    if (validAdminIds.includes(adminId)) {
        window.location.href = 'admin.html';
    } else {
        alert('ID Admin tidak valid!');
    }
}

// Fungsi untuk menambah berita baru
function addNews(event) {
    event.preventDefault();
    const newsTitle = document.getElementById('newsTitle').value;
    const newsContent = document.getElementById('newsContent').value;
    const newsDate = new Date().toLocaleDateString();

    const news = { title: newsTitle, content: newsContent, date: newsDate };
    let newsList = JSON.parse(localStorage.getItem('newsList')) || [];
    
    // Tambahkan berita baru ke daftar
    newsList.push(news);

    // Batasi jumlah berita menjadi tiga
    if (newsList.length > 3) {
        newsList.shift();
    }

    localStorage.setItem('newsList', JSON.stringify(newsList));

    alert(`Berita "${newsTitle}" berhasil ditambahkan!`);
    // Mengosongkan form
    document.getElementById('newsTitle').value = '';
    document.getElementById('newsContent').value = '';
}

// Fungsi untuk memuat berita
function loadNews() {
    const newsList = JSON.parse(localStorage.getItem('newsList')) || [];
    const columns = ['newsContainer1', 'newsContainer2', 'newsContainer3'];
    
    columns.forEach((columnId, index) => {
        const column = document.getElementById(columnId);
        column.innerHTML = ''; // Bersihkan konten kolom
        if (newsList[index]) {
            const news = newsList[index];
            const newsElement = document.createElement('div');
            newsElement.classList.add('news-item');
            newsElement.innerHTML = `
                <h3>${news.title}</h3>
                <p>${news.content}</p>
                <small>${news.date}</small>
            `;
            column.appendChild(newsElement);
        }
    });
}
