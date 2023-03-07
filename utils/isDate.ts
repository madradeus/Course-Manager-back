export const isDate = (s: string) => {
    return !isNaN(Date.parse(s))

}
