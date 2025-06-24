let dados = JSON.parse(localStorage.getItem('necessidades')) || [];
let filtrados = [...dados];

document.addEventListener('DOMContentLoaded', function() {
    carregar();
    
    const search = document.getElementById('search');
    if (search) {
        search.addEventListener('input', filtrar);
    }
});

function carregar() {
    if (dados.length === 0) {
        adicionarExemplos();
    }
    filtrados = [...dados];
    exibir();
}

function exibir() {
    const container = document.getElementById('cards');
    const empty = document.getElementById('empty');

    if (filtrados.length === 0) {
        container.style.display = 'none';
        empty.style.display = 'block';
        return;
    }

    container.style.display = 'grid';
    empty.style.display = 'none';

    container.innerHTML = filtrados.map(item => `
        <div class="card">
            <div class="card-title">${item.titulo}</div>
            <div class="card-org">${item.instituicao}</div>
            <div class="card-type">${item.tipo}</div>
            <div class="card-desc">${item.descricao}</div>
            <div class="card-info">${item.cidade || 'CEP: ' + item.cep}</div>
            <div class="card-info">${item.contato}</div>
        </div>
    `).join('');
}
function filtrar() {
    const search = document.getElementById('search').value.toLowerCase();
    const tipo = document.getElementById('filtro').value;

    filtrados = dados.filter(item => {
        const matchSearch = !search || 
            item.titulo.toLowerCase().includes(search) ||
            item.descricao.toLowerCase().includes(search);
        const matchTipo = !tipo || item.tipo === tipo;
        return matchSearch && matchTipo;
    });

    exibir();
}

function limparFiltros() {
    document.getElementById('search').value = '';
    document.getElementById('filtro').value = '';
    filtrados = [...dados];
    exibir();
}

