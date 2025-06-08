import { db } from './firebase-config.js';

// DOM Elements
const bookingForm = document.getElementById('bookingForm');
const serviceSelect = document.getElementById('service');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const clientNameInput = document.getElementById('clientName');
const clientPhoneInput = document.getElementById('clientPhone');
const bookingsList = document.getElementById('bookingsList');
const dailyStats = document.getElementById('dailyStats');

// Services data
const services = [
    { id: 'massage', name: 'Massage', duration: 60, price: 80 },
    { id: 'facial', name: 'Facial', duration: 45, price: 60 },
    { id: 'manicure', name: 'Manicure', duration: 30, price: 40 },
    { id: 'pedicure', name: 'Pedicure', duration: 45, price: 50 }
];

// Populate services dropdown
if (serviceSelect) {
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.name} - $${service.price} (${service.duration}min)`;
        serviceSelect.appendChild(option);
    });
}

// Create booking
const createBooking = async (bookingData) => {
    try {
        const docRef = await db.collection('bookings').add({
            ...bookingData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'confirmed'
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

// Get bookings for a specific date
const getBookingsByDate = async (date) => {
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        
        const snapshot = await db.collection('bookings')
            .where('date', '>=', startOfDay)
            .where('date', '<=', endOfDay)
            .get();
            
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting bookings:', error);
        throw error;
    }
};

// Update booking status
const updateBookingStatus = async (bookingId, status) => {
    try {
        await db.collection('bookings').doc(bookingId).update({
            status: status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating booking:', error);
        throw error;
    }
};

// Delete booking
const deleteBooking = async (bookingId) => {
    try {
        await db.collection('bookings').doc(bookingId).delete();
    } catch (error) {
        console.error('Error deleting booking:', error);
        throw error;
    }
};

// Calculate daily statistics
const calculateDailyStats = (bookings) => {
    const stats = {
        totalBookings: bookings.length,
        totalRevenue: 0,
        serviceBreakdown: {}
    };
    
    bookings.forEach(booking => {
        const service = services.find(s => s.id === booking.service);
        if (service) {
            stats.totalRevenue += service.price;
            stats.serviceBreakdown[service.name] = (stats.serviceBreakdown[service.name] || 0) + 1;
        }
    });
    
    return stats;
};

// Display bookings
const displayBookings = (bookings) => {
    if (!bookingsList) return;
    
    bookingsList.innerHTML = '';
    
    bookings.forEach(booking => {
        const service = services.find(s => s.id === booking.service);
        const bookingElement = document.createElement('div');
        bookingElement.className = 'booking-card';
        bookingElement.innerHTML = `
            <h4>${service ? service.name : 'Unknown Service'}</h4>
            <p>Client: ${booking.clientName}</p>
            <p>Time: ${new Date(booking.date).toLocaleTimeString()}</p>
            <p>Status: ${booking.status}</p>
            <button onclick="updateBookingStatus('${booking.id}', 'completed')">Complete</button>
            <button onclick="deleteBooking('${booking.id}')">Cancel</button>
        `;
        bookingsList.appendChild(bookingElement);
    });
};

// Display daily statistics
const displayDailyStats = (stats) => {
    if (!dailyStats) return;
    
    dailyStats.innerHTML = `
        <div class="stat-card">
            <h3>Today's Summary</h3>
            <p>Total Bookings: ${stats.totalBookings}</p>
            <p>Total Revenue: $${stats.totalRevenue}</p>
            <h4>Service Breakdown:</h4>
            ${Object.entries(stats.serviceBreakdown)
                .map(([service, count]) => `<p>${service}: ${count}</p>`)
                .join('')}
        </div>
    `;
};

// Event Listeners
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const bookingData = {
            service: serviceSelect.value,
            date: new Date(`${dateInput.value}T${timeInput.value}`),
            clientName: clientNameInput.value,
            clientPhone: clientPhoneInput.value
        };
        
        try {
            await createBooking(bookingData);
            alert('Booking created successfully!');
            bookingForm.reset();
            // Refresh bookings list
            const bookings = await getBookingsByDate(dateInput.value);
            displayBookings(bookings);
            displayDailyStats(calculateDailyStats(bookings));
        } catch (error) {
            alert('Error creating booking: ' + error.message);
        }
    });
}

// Initialize date input with today's date
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
}

// Export functions
export {
    createBooking,
    getBookingsByDate,
    updateBookingStatus,
    deleteBooking,
    calculateDailyStats,
    displayBookings,
    displayDailyStats
}; 