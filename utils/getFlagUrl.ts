const getFlagUrl = (TwoDigitCountry: string) => {
    return `https://catamphetamine.gitlab.io/country-flag-icons/3x2/${TwoDigitCountry}.svg`
}

export const flagUrlMap = {
    "san francisco": getFlagUrl("US"),
    "new york": getFlagUrl('US'),
    "singapore": getFlagUrl("SG"),
    "london": getFlagUrl("GB"),
    "amsterdam": getFlagUrl("NL"),
    "frankfurt": getFlagUrl("DE"),
    "toronto": getFlagUrl('CA'),
    'bangalore': getFlagUrl('IN')
}