let dados = JSON.parse(localStorage.getItem('necessidades')) || [];

document.addEventListener('DOMContentLoaded', function() {
    const cep = document.getElementById('cep');
    const form = document.getElementById('form');
    
    
    if (cep) {
        cep.addEventListener('input', e => e.target.value = formatCEP(e.target.value));
        cep.addEventListener('blur', () => {
            const c = cep.value.replace(/\D/g, '');
            if (c.length === 8) buscarCEP(c);
        });
    }

    
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (validar()) salvar();
        });
    }
});

async function buscarCEP(cep) {
    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
            document.getElementById('cidade').value = data.localidade + ', ' + data.uf;
            clearErrors();
        } else {
            throw new Error('CEP não encontrado');
        }
    } catch {
        document.getElementById('cidade').value = '';
        showError('cep', 'CEP inválido');
    }
}