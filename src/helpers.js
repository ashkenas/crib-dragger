// const englishRegex = /^[!-\/:-@[-`{-~]?(?:[a-z 0-9]+[!-\/:-@[-`{-~]?)*$/i;
const englishRegex = /^[.,!?'\-]?(?:[a-z 0-9]+[.,!?'\-]?)*$/i;

export const toCells = (data) => data.map((d, i) => <td key={i}>{d}</td>);

export const changeIndex = (array, i, value) => array.map((a, j) => j === i ? value : a);

export const change2DIndex = (array, i, j, value) => {
    return array.map((a, k) => a.map((b, l) => i === k && j === l ? value : b));
};

export const clamp = (value, min, max) => value < min ? min : (value > max ? max : value);

export const oToC = (ord) => String.fromCharCode(Number(ord));

export const cToO = (char) => BigInt(char.charCodeAt(0));

export const encode = (message) => {
    return [...message].reduce((encoded, char) => (encoded << 8n) + cToO(char), 0n);
};

export const decode = (message) => {
    let strMessage = oToC(message & 255n);
    while ((message >>= 8n) > 0)
        strMessage = oToC(message & 255n) + strMessage;
    return strMessage;
}

export const isEnglish = (message) => {
    return englishRegex.test(message);
};
