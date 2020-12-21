export const onCloseDocument = () => {
  COScript.currentCOScript().setShouldKeepAround(false);
};
