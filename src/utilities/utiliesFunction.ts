export const formatCreditCardNumber = (value) => {
    // Verificar si el valor es una cadena y si tiene al menos 6 caracteres (2 iniciales + 4 finales)
    if (typeof value === 'string' && value.length >= 6) {
        // Obtener los primeros 2 dígitos y los últimos 4 dígitos
        const firstDigits = value.slice(0, 2);
        const lastDigits = value.slice(-4);
        // Calcular la cantidad de asteriscos intermedios
        const middleAsterisks = value.length - 6;
        // Construir la cadena de tarjeta de crédito formateada
        return `${firstDigits}${'*'.repeat(middleAsterisks)}${lastDigits}`;
    }
    // Si no cumple con los requisitos, devolver el valor original
    return value;
};