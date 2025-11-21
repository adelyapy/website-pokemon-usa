// =================================================================
// Maintainer's Code (Issue #1 - Area A)
// =================================================================
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=15';
const pokemonListElement = document.getElementById('pokemon-list'); // <div id="pokemon-list">
const pokemonCountElement = document.getElementById('pokemon-count'); 
const pokemonDetailElement = document.getElementById('pokemon-detail'); // <div id="pokemon-detail">

// *FUNGSI INI HANYA TEMPAT PENAMPUNG UNTUK DEVELOPER C (Issue #3)*
// =================================================================
// Developer C's Code: Mengambil dan Menampilkan Detail Pokemon
// =================================================================


/**
 * Fungsi untuk mengambil dan menampilkan detail Pokemon berdasarkan URL.
 * Fungsi ini dipanggil dari onclick pada kartu Pokemon.
 * @param {string} url - URL API spesifik untuk detail Pokemon (misalnya: '.../api/v2/pokemon/1/')
 */
async function fetchPokemonDetail(url) {
    const detailContainer = document.getElementById('pokemon-detail'); 
    
    // Tampilkan indikator loading
    detailContainer.innerHTML = '<p class="text-center text-muted">Loading detail...</p>'; 

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Kesalahan HTTP! Status: ${response.status}`);
        }

        const detail = await response.json();
        
        // Panggil fungsi display detail
        displayPokemonDetail(detail);

    } catch (error) {
        console.error("Gagal mengambil detail Pokemon:", error);
        detailContainer.innerHTML = `<div class="alert alert-danger">❌ Gagal memuat detail: ${error.message}</div>`;
    }
}

/**
 * Fungsi untuk menampilkan detail Pokemon ke UI (HTML).
 * @param {Object} detail - Objek data detail Pokemon dari PokeAPI
 */
function displayPokemonDetail(detail) {
    const detailContainer = document.getElementById('pokemon-detail');
    
    // Ambil dan konversi data
    const id = detail.id;
    const name = detail.name;
    // Konversi decimetres ke meter (10 dm = 1 m)
    const height = (detail.height / 10).toFixed(1); 
    // Konversi hectograms ke kilogram (10 hg = 1 kg)
    const weight = (detail.weight / 10).toFixed(1); 
    // Ambil semua tipe dan gabungkan
    const types = detail.types.map(t => t.type.name).join(', ');
    const imageUrl = detail.sprites.front_default; // Sprite default

    const htmlContent = `
        <div class="card shadow-lg">
            <div class="card-header bg-primary text-white text-center">
                <h4 class="text-capitalize mb-0">${name} - #${id.toString().padStart(3, '0')}</h4>
            </div>
            <div class="card-body row align-items-center">
                <div class="col-md-4 text-center">
                    <img src="${imageUrl}" alt="${name}" class="img-fluid" style="width: 150px; height: 150px;">
                    <p class="text-muted mt-2">Sprite Default</p>
                </div>
                <div class="col-md-8">
                    <h5>Spesifikasi Dasar:</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Tinggi:</strong> ${height} m</li>
                        <li class="list-group-item"><strong>Berat:</strong> ${weight} kg</li>
                        <li class="list-group-item"><strong>Tipe:</strong> <span class="text-capitalize">${types}</span></li>
                        <li class="list-group-item"><strong>Base XP:</strong> ${detail.base_experience}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    detailContainer.innerHTML = htmlContent;
}

// =================================================================
// Developer B's Code (Issue #2 - BAGIAN BARU)
// =================================================================

/**
 * Fungsi untuk menampilkan daftar Pokemon ke UI
 * @param {Array} pokemonData - Array objek {name, url}
 */
function displayPokemonList(pokemonData) {
    let htmlContent = '';

    pokemonData.forEach((pokemon, index) => {
        // Ambil ID dari index + 1
        const id = index + 1; 
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        // Pihak B menggunakan div class="col" karena container "#pokemon-list"
        // sudah memiliki class "row row-cols-md-3"
        htmlContent += `
            <div class="col">
                <div class="card shadow-sm pokemon-card" 
                     data-id="${id}" 
                     onclick="fetchPokemonDetail('${pokemon.url}')">
                    
                    <img src="${imageUrl}" class="card-img-top mx-auto mt-2" 
                         alt="${pokemon.name}" style="width: 80px; height: 80px;">
                    
                    <div class="card-body p-2 text-center">
                        <small class="text-muted">#${id.toString().padStart(3, '0')}</small>
                        <h6 class="card-title text-capitalize mb-0">${pokemon.name}</h6>
                    </div>
                </div>
            </div>
        `;
    });

    // Masukkan ke dalam container list
    pokemonListElement.innerHTML = htmlContent;
}

// =================================================================
// Modifikasi Fungsi Fetch (Pihak B memanggil display-nya di sini)
// =================================================================
async function fetchPokemonList() {
    try {
        pokemonListElement.innerHTML = '<p class="text-center text-muted">Mengambil data...</p>';
        
        const response = await fetch(POKEAPI_BASE_URL);
        
        if (!response.ok) {
            throw new Error(`Kesalahan HTTP! Status: ${response.status}`);
        }
        
        const data = await response.json();
        const results = data.results;

        // Panggil fungsi display yang baru dibuat oleh Pihak B
        displayPokemonList(results); 

        pokemonCountElement.textContent = results.length;
        
        return results; 

    } catch (error) {
        console.error("Gagal mengambil daftar Pokemon:", error);
        pokemonListElement.innerHTML = `<p class="col-12 alert alert-danger">❌ Gagal memuat data: ${error.message}</p>`;
        pokemonCountElement.textContent = 0;
    }
}

fetchPokemonList();

