import type Variables from './Variables.d.ts';

// side effects
const setVariables = (variables: Variables, document: Document): void => {
  variables.light
    && document.documentElement.style.setProperty('--light', variables.light);
  variables.dark
    && document.documentElement.style.setProperty('--dark', variables.dark);
};

export default setVariables;
