// get the html Elements 
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const logInForm = document.getElementById("loginForm");
const navLink = document.getElementById("navLink");
const holder = document.querySelector(".holder");
const loader = document.querySelector(".loader");


// handle Login Function
const logInFunc = async (e) => {
  e.preventDefault();
  
  // Get email and password values
  const emailValue = emailElement.value;
  const passwordValue = passwordElement.value;
  
  // API endpoint
  const apiUrl = "https://one-hand/login?uid=1231";
  
  // Parameters to be sent in the request body
  const params = {
    email: emailValue,
    password: passwordValue
  };
  
  // Custom headers, including your secret key
  const config = {
    headers: {
      "X-secret-key": "OH2024"
    }
  };
  // when the request is started i hide the form and show loading animation
  holder.style.display = 'none';
  loader.style.display = 'flex';

  try {
    // Send POST request using Axios
    const response = await axios.post(apiUrl, params , config);
    
    // Get the token from the API response
    const token = response.data.token;
    
    // Store the token in cookies with necessary attributes
    document.cookie = `token=${token}; path=/; SameSite=Lax; Secure`;

    
    
    // Redirect the user to the home page
    window.location.href = "home.html";

    
  } catch (e) {
    // holder.style.display = 'none';


    // Error handling - real world use
    // console.log("Error: " + e.response);
    // alert("Email or password are incorrect");
    
    // For testing purposes with a fake API
    const token = "one-hand1234";
    document.cookie = `token=${token}; path=/; SameSite=Lax; Secure`;
    window.location.href = "home.html";
  }
};

// Attach the submit event listener to the form
logInForm.addEventListener("submit", logInFunc);



// add event listener to navLink 
// check if the user is logged in & redirect to home page 
// if not then set alert message told him that he is not logged in
navLink.addEventListener("click" , () => {
    const cookies = document.cookie.split(';');
    const cookiesObj = {};
    cookies.forEach(cookie => {
      const [key, value] = cookie.trim().split('=');
      cookiesObj[key] = value;
    });
    const token = cookiesObj.token;
    if(!token) {
      alert("You must be logged in to access this page");
    } else {
      window.location.href = "home.html";
    }
  })
    


  