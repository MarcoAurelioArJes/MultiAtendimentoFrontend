const generateColorFromInitial = (inicialNome) => {
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5',
        '#FFAF33', '#FF33E3', '#B8FF33', '#33FFB5'
    ];
    const index = (inicialNome.charCodeAt(0) - 65) % colors.length;
    return colors[index];
};

const getInicial = (nome) => {
    if (!nome) return '?';
    return nome.trim().charAt(0).toUpperCase();
};

const getIniciaisPrimeiroEUltimoNome = (nome) => {
    if (!nome) return '?';
    let nomeSplit = nome.split(' ');
    return `${nomeSplit[0].charAt(0)}${nomeSplit[nomeSplit.length - 1].charAt(0)}`;
};

module.exports = {
    generateColorFromInitial,
    getInicial,
    getIniciaisPrimeiroEUltimoNome
}