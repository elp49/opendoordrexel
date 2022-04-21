import OrderedItem from '../models/shared/OrderedItem';

export const isDefined = (a: any) => typeof a !== 'undefined';

/**
 * Determines if the user is on a mobile device or the window width is less than 1000px.
 * NOTE: exceptions to the mobile device rule are iPad pros and some tablets.
 */
const USER_AGENT_REGEXP: RegExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
export const isMobileDevice = () => USER_AGENT_REGEXP.test(navigator.userAgent);

export const isMobileScreenSize = () => window.innerWidth < 1000;

export const atoi = (string: string, radix: number = 10) => parseInt(string, radix);

export const sortByOrder = <T extends OrderedItem>(list: T[]) => list.sort((a, b) => a.order - b.order);

export const sortByReverseOrder = <T extends OrderedItem>(list: T[]) => list.sort((a, b) => b.order - a.order);

// Replaces backslashes in a given file path with forward slashes.
const BACKSLASH_REGEXP: RegExp = /\\/g;
export const fixFilePath = (file: string) => file.replace(BACKSLASH_REGEXP, '/');

// Creates a custom style element uing the given styles and appends it to the DOM.
export const createStyle = (styles: string) => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
};

export const lockVerticalScroll = () => {
  document.querySelector('html')?.classList.add('verticalScrollLocked');
  document.querySelector('body')?.classList.add('verticalScrollLocked');
};

export const unlockVerticalScroll = () => {
  document.querySelector('html')?.classList.remove('verticalScrollLocked');
  document.querySelector('body')?.classList.remove('verticalScrollLocked');
};