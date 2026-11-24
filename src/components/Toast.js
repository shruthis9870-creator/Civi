/**
 * Toast Notification Utility
 */
export function showToast(message) {
  if (window.App && window.App.showToast) {
    window.App.showToast(message);
  }
}
