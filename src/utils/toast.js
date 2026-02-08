export const showToast = (message, type = "success") => {
  const container = document.getElementById("toast-container");
  if (!container) return;

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `message ${type}`;
  toast.innerText = message;

  // Add to container
  container.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
};