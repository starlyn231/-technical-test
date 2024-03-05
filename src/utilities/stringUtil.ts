export const defaultString = {
    requiredText: 'Este campo es requerido',
    atLeastOneFile: ' Debe seleccionar almenos un archivo para continuar',
    atLeastSelectOneOption: ' Debe seleccionar almenos una opción continuar',
    validEmail: 'Favor digitar un email válido',
    validUrl: 'Favor digitar un URL válido',
    validPhone: 'Favor digitar un teléfono válido',
    validPassword: 'validPassword',
    passwordDoesntMatch: 'passwordDoesntMatch',
    passwordNeedBeDifferent: 'passwordNeedBeDifferent',
};
export function localToString(s: any) {
    if (!s) {
        return ""
    }
    return String(s)
}
export function removeGuionFromString(s: any) {
    if (!s) {
        return ''
    }
    return localToString(s).replace(/-/g, "")
}