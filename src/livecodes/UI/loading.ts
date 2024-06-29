export const loadingMessage = (
  message = window.deps.translateString('generic.loading', 'Loading...'),
) => {
  const loadingDiv = document.createElement('div');
  loadingDiv.innerHTML = message;
  loadingDiv.classList.add('modal-message');
  return loadingDiv;
};
