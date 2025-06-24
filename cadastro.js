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
function validar() {
    clearErrors();
    let ok = true;

    const campos = [
        { id: 'instituicao', nome: 'Instituição' },
        { id: 'tipo', nome: 'Tipo' },
        { id: 'titulo', nome: 'Título' },
        { id: 'descricao', nome: 'Descrição' },
        { id: 'cep', nome: 'CEP' },
        { id: 'contato', nome: 'Contato' }
    ];

    campos.forEach(campo => {
        const valor = document.getElementById(campo.id).value.trim();
        if (!valor) {
            showError(campo.id, campo.nome + ' é obrigatório');
            ok = false;
        }
    });

    const cep = document.getElementById('cep').value.trim();
    if (cep && !validCEP(cep)) {
        showError('cep', 'CEP inválido');
        ok = false;
    }

    const contato = document.getElementById('contato').value.trim();
    if (contato && !validEmail(contato) && !validPhone(contato)) {
        showError('contato', 'Email ou telefone inválido');
        ok = false;
    }

    return ok;
}
function salvar() {
    const item = {
        id: Date.now(),
        instituicao: document.getElementById('instituicao').value.trim(),
        tipo: document.getElementById('tipo').value,
        titulo: document.getElementById('titulo').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        cep: document.getElementById('cep').value.trim(),
        cidade: document.getElementById('cidade').value.trim(),
        contato: document.getElementById('contato').value.trim(),
        data: new Date().toLocaleDateString('pt-BR')
    };

    dados.push(item);
    localStorage.setItem('necessidades', JSON.stringify(dados));
    
    document.getElementById('form').style.display = 'none';
    document.getElementById('success').style.display = 'block';
}

function limpar() {
    document.getElementById('form').reset();
    document.getElementById('cidade').value = '';
    clearErrors();
}