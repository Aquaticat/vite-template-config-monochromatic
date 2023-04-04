import numberAtEndOfString from '../number-at-end-of-string/index.js';

// Ensure the id to be assigned is unique in the document.
const uniqueId = (document, potentialId) => document.getElementById(potentialId)
  ? numberAtEndOfString(potentialId)
    ? `${potentialId.slice(0, -`${numberAtEndOfString(potentialId)}`.length)}${numberAtEndOfString(potentialId) + 1}`
    : `${potentialId}1`
  : potentialId;

export default uniqueId;
