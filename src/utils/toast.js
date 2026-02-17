import "./toast.css"

export const showToast = (message, type = "success") => {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `message ${type}`;
  toast.innerText = message;

  container.appendChild(toast);

  // 3000ms matches the CSS 'progress' animation
  setTimeout(() => {
    toast.style.animation = "slideOut 0.4s forwards";
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 2000);
};