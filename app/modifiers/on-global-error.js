import { modifier } from 'ember-modifier';

export default modifier(function onGlobalError(
  _element, [handler]
) {
  function listener(event) {
    try {
      const error = event.error || event.reason;
      return handler(error, ...arguments);
    } catch (e) {
      console.error("Error while running error handler:", e);
    }
  };

  window.addEventListener('error', listener);
  window.addEventListener('unhandledrejection', listener);

  return () => {
    window.removeEventListener('error', listener);
    window.removeEventListener('unhandledrejection', listener);
  }
});
