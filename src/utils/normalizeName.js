
// supprime les espaces au début et à la fin ;
// met tout en minuscules ;
// remet la première lettre en majuscule.
export function normalizeName(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/^\p{L}/u, (letter) => letter.toUpperCase());
}