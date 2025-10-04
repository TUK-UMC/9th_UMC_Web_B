import { PUSHSTATE_EVENT } from './types';

export const getCurrentPath = (): string => {
  return window.location.pathname;
};

export const navigateTo = (path: string): void => {
  window.history.pushState({}, '', path);

  const pushStateEvent = new CustomEvent(PUSHSTATE_EVENT, {
    detail: { path },
  });
  window.dispatchEvent(pushStateEvent);
};
