export const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localISOTime = new Date(now.getTime() - (offset*60*1000)).toISOString().slice(0,16);
    return localISOTime;
  };