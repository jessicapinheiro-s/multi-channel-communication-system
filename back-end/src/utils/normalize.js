export const normalizeName = (value) => {
    return value
    .toLowerCase()
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z\s]/g, "") // remove caracteres especiais
    .replace(/\s+/g, " ")
    .trim();
} 

export const normalizePhone = (value) => {
    return value.replace(/\D/g, "");
}