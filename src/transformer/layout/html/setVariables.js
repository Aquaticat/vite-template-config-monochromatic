// side effects
const setVariables = (variables, document) => {
  variables.light && document.documentElement.style.setProperty('--light', variables.light);
  variables.dark && document.documentElement.style.setProperty('--dark', variables.dark);
};

export default setVariables;
