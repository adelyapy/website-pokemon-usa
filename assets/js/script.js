// =================================================================
// Maintainer's Code (Issue #1 - Area A)
// =================================================================
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=15';
const pokemonListElement = document.getElementById('pokemon-list'); // <div id="pokemon-list">
const pokemonCountElement = document.getElementById('pokemon-count'); 

// *FUNGSI INI HANYA TEMPAT PENAMPUNG UNTUK DEVELOPER C (Issue #3)*
function fetchPokemonDetail(url) {
    document.getElementById('pokemon-detail').innerHTML = '<p class="text-center text-muted">Loading detail...</p>';
    // Logic fetch detail akan ditambahkan oleh Developer C
    console.log(`Pihak C akan memproses URL: ${url}`);
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