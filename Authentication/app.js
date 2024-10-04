// Function for Sign Up
function signUp() {
    const role = document.getElementById('signupRole').value;
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const profileImgUrl = document.getElementById('signupImg').value; // Handling the image

    // Check if all fields are filled in
    if (!role || !name || !email || !password || !profileImgUrl) {
        alert('Please fill in all fields and upload a profile image');
        return;
    }

    // Retrieve users from localStorage or create a new array if no users exist
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert('User already exists with this email');
        return;
    }

    // Add the new user
    const newUser = { 
        role, 
        name, 
        email, 
        password, 
        profileImgUrl // Store the local URL or dummy path for the image
    };
    users.push(newUser);

    // Store users back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign Up successful! Welcome ' + name);
    location.href='./signIn.html'; // Redirect to the sign-in page
}

// Function for Sign In
function signIn() {
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    // Check if all fields are filled in
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Validate user credentials
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Store the current user's name and profile image URL in localStorage
        localStorage.setItem('currentUserName', user.name);
        localStorage.setItem('currentUserImg', user.profileImgUrl);

        // Redirect based on the user's role
        if (user.role === "Admin") {
            location.href = "./admin.html";
        } else {
            location.href = "./user.html";
        }
    } else {
        // Display error message if the email or password is incorrect
        alert('Invalid email or password');
    }
}
