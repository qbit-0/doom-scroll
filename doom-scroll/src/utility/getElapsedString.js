export const getElapsedString = (start) => {
    const dateStart = new Date(start * 1000);
    const dateNow = Date.now();
    const dateElapsed = dateNow - dateStart;

    const seconds = Math.floor(dateElapsed / 1000);
    if (seconds <= 60) {
      return `${seconds}s`;
    }

    const minutes = Math.floor(dateElapsed / 60000);
    if (minutes <= 60) {
      return `${minutes}m`;
    }

    const hours = Math.floor(dateElapsed / 3.6e6);
    if (hours <= 24) {
      return `${hours}h`;
    }

    const days = Math.floor(dateElapsed / 8.64e+7);
    if (days <= 7) {
      return `${days}d`;
    }

    const weeks = Math.floor(dateElapsed / 6.048e+8);
    if (weeks <= 4) {
      return `${weeks}w`;
    }

    const months = Math.floor(dateElapsed / 2.628e+9);
    if (months <= 12) {
      return `${months}w`;
    }

    return Math.floor(dateElapsed / 3.154e+10);
  };