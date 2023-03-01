// convert object to string and store in localStorage
export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    const serialisedState = JSON.stringify(data);
    localStorage.setItem(key, serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

// load string from localStarage and convert into an Object
// invalid output must be undefined
export const getFromLocalStorage = (key: string): any | undefined => {
  try {
    const serialisedState = localStorage.getItem(key);
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
