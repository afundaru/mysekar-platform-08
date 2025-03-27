
/**
 * Utilities for handling network state and errors
 */

/**
 * Formats a date string using the Indonesian locale
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string if formatting fails
  }
};

/**
 * Formats a relative time (e.g., "5 minutes ago")
 */
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `${diffMins} menit lalu`;
  } else if (diffHours < 24) {
    return `${diffHours} jam lalu`;
  } else {
    return `${diffDays} hari lalu`;
  }
};

/**
 * Checks if the current device has network connectivity
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * Determines if an error is related to network connectivity
 */
export const isNetworkError = (error: any): boolean => {
  if (!error) return false;
  
  const errorMessage = error.message?.toLowerCase() || '';
  
  return (
    errorMessage.includes('failed to fetch') || 
    errorMessage.includes('networkerror') ||
    errorMessage.includes('network request failed') || 
    errorMessage.includes('network timeout') ||
    errorMessage.includes('waktu permintaan habis') ||
    errorMessage.includes('tidak dapat terhubung ke server')
  );
};
