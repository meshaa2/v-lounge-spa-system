# V Lounge Spa Booking and Client Management System

A modern web-based booking and management system for V Lounge Spa, designed to replace manual Excel-based processes with a digital solution.

## Features

- 🔐 Secure Authentication System
- 📅 Appointment Booking System
- 👥 Client Management
- 📊 Daily Reports
- 📱 Responsive Design
- 🔄 Real-time Updates

## Technologies Used

- HTML5
- CSS3 (Bootstrap 5)
- JavaScript
- Firebase Authentication
- Firebase Firestore
- Firebase Hosting

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd v-lounge-spa-system
   ```

2. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your Firebase configuration from Project Settings
   - Paste the configuration in `firebase-config.js`

3. **Local Development**
   - Open `index.html` in your browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     # Using Node.js
     npx serve
     ```

4. **Deployment**
   - Install Firebase CLI:
     ```bash
     npm install -g firebase-tools
     ```
   - Login to Firebase:
     ```bash
     firebase login
     ```
   - Initialize Firebase:
     ```bash
     firebase init
     ```
   - Deploy:
     ```bash
     firebase deploy
     ```

## Default Admin Login

The following admin accounts are set up for staff/admin access:

| Email                   | Example Password |
|-------------------------|------------------|
| admin@vloungespa.com    | admin123         |
| admin@gmail.com         | admin123         |

> **Note:**
> - You must create these users in Firebase Authentication and set their passwords (e.g., `admin123`).
> - You can set any password you like, but be sure to remember it.
> - If you forget the password, use the "Forgot Password?" link on the login page or reset it in the Firebase Console.

**Admin Redirect:**
- When logging in as an admin (using the above emails), you will always be redirected to the dashboard page (`dashboard.html`).
- Other users will be redirected according to the logic in `js/auth.js`.

**How to add/change admin users:**
1. Go to Firebase Console → Authentication → Users.
2. Click "Add user" and enter the desired email and password.
3. To add more admin emails, update the `adminEmails` array in `js/auth.js`.

## Project Structure

```
v-lounge-spa-system/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── clients.html           # Client management
├── css/
│   └── styles.css         # Custom styles
├── js/
│   ├── firebase-config.js # Firebase configuration
│   ├── auth.js           # Authentication logic
│   ├── bookings.js       # Booking management
│   └── clients.js        # Client management
└── README.md
```

## Features in Detail

1. **Authentication**
   - Secure login system
   - Password reset functionality
   - Session management

2. **Booking System**
   - Service selection
   - Date and time picker
   - Real-time availability checking
   - Booking confirmation

3. **Client Management**
   - Client profiles
   - Booking history
   - Contact information
   - Service preferences

4. **Reports**
   - Daily booking summary
   - Service popularity
   - Revenue tracking

## Developers

This project was developed by students of BSIT231A – Information Technology at National University Laguna as part of the final project for IT Elective 1.

### Team Members:

| Name | Role |
|------|------|
| Cabugos, Arkin Jeiel D. | Project Lead |
| Camacho, Christine Joy L. | UI/UX Designer |
| Donadio, Aries S. | Backend Developer |
| Pua, Gian J. | Frontend Developer |

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 