# V-Lounge Spa System

A web-based spa booking system that allows users to book spa services online.

## Features

- User authentication using Firebase
- Online booking system for spa services
- Responsive design for all devices
- Real-time booking management

## Setup

1. Clone the repository
2. Create a Firebase project and enable Authentication and Firestore
3. Replace the Firebase configuration in `firebase-config.js` with your own
4. Add the Firebase SDK to your HTML files:
   ```html
   <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js"></script>
   ```

## Project Structure

```
v-lounge-spa-system/
│
├── index.html                  # Login or Home Page
├── dashboard.html             # Booking Form / Dashboard
├── styles/
│   └── style.css             # Custom CSS styling
├── scripts/
│   ├── auth.js              # Firebase login logic
│   └── booking.js           # Booking form logic
├── assets/                   # Images, icons, etc.
│   └── logo.png
├── firebase-config.js        # Firebase initialization
└── README.md                 # Project documentation
```

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Firebase (Authentication & Firestore)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 