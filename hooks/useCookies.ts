// Define the options for setting a cookie
interface CookieOptions {
  path?: string;
  maxAge?: number; // in seconds
  expires?: Date | string; // Can be a Date object or a valid date string
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
}

// This hook provides methods to interact with browser cookies
const useCookies = () => {
  // Get a cookie value by its name
  const getCookie = (name: string): string | undefined => {
    if (typeof window !== 'undefined') {
      const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
      );
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
  };

  // Set a cookie with a name, value, and optional options
  const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
    if (typeof window !== 'undefined') {
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

      // Append each option to the cookie string
      Object.entries(options).forEach(([key, val]) => {
        cookieString += `; ${key}`;
        if (val !== true) {
          // Check if 'expires' is a Date object and convert to UTC string
          if (key === 'expires' && val instanceof Date) {
            cookieString += `=${val.toUTCString()}`;
          } else {
            cookieString += `=${val}`;
          }
        }
      });

      document.cookie = cookieString;
    }
  };

  // Delete a cookie by its name
  const deleteCookie = (name: string): void => {
    if (typeof window !== 'undefined') {
      // Setting maxAge to -1 to expire the cookie immediately
      setCookie(name, '', { maxAge: -1 });
    }
  };

  return { getCookie, setCookie, deleteCookie };
};

export default useCookies;
