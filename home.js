const logOutBtn = document.getElementById("logoutBtn");

// Parse cookies
const cookies = document.cookie.split(';');
const cookiesObj = {};

cookies.forEach(cookie => {
  const [key, value] = cookie.trim().split('=');
  cookiesObj[key] = value;
});

const token = cookiesObj.token;

// Check if the user is authenticated
if (!token) {
  // Redirect to login page if no token
  window.location.href = '/';
}

logOutBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Remove the token from cookies by setting an expiration date in the past and using path=/
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";

  // Redirect to login page after logging out
  window.location.href = '/';
});


