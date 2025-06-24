function formatCEP(cep) {
    cep = cep.replace(/\D/g, '');
    return cep.length > 5 ? cep.substring(0, 5) + '-' + cep.substring(5, 8) : cep;
}

function validEmail(email) {
    return email.includes('@') && email.includes('.');
}

function validPhone(phone) {
    return phone.replace(/\D/g, '').length >= 10;
}

function validCEP(cep) {
    return cep.replace(/\D/g, '').length === 8;
}

function showError(field, msg) {
    const error = document.getElementById(field + 'Error');
    if (error) error.textContent = msg;
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(e => e.textContent = '');
}