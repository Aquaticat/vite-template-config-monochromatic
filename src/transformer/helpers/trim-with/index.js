const trimStartWith = (inputString, trimWhat) => inputString.startsWith(trimWhat) ? trimStartWith(inputString.slice(trimWhat.length)) : inputString;
const trimEndWith = (inputString, trimWhat) => inputString.endsWith(trimWhat) ? trimEndWith(inputString.slice(0, -trimWhat.length)) : inputString;

const trimWith = (inputString, trimWhat) => trimEndWith(trimStartWith(inputString, trimWhat), trimWhat);

export default trimWith;

export { trimStartWith, trimEndWith };
