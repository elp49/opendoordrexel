import { accessSync } from 'fs';
import path from 'path';

/**
 * FUNCTIONS IN THIS FILE MUST ONLY BE SERVER-SIDE FUNCTIONS.
 * The fs (file system) module is server-side only and cannot be ran from the client.
 * A server-side function is only ran during a page's pre-render at build time like getStaticProps.
 *
 * Adding a function to this file that is ran on client-side (even if it does not use fs)
 * will fail the build because the fs module is imported here.
 */

/**
 * Use the fs module to determine if a file path can be accessed. An empty string is considered a
 * valid file path because it won't break JSX.
 */
export const isFilePathValid = (file: string) => {
  let isValid = true;

  if (file !== '') {
    try {
      // Try to access file path.
      accessSync(path.join('public', file));
    } catch {
      isValid = false;
    }
  }

  return isValid;
};
