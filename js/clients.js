import { db } from './firebase-config.js';

// DOM Elements
const clientsList = document.getElementById('clientsList');
const clientForm = document.getElementById('clientForm');
const searchInput = document.getElementById('clientSearch');

// Create new client
const createClient = async (clientData) => {
    try {
        const docRef = await db.collection('clients').add({
            ...clientData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastVisit: null,
            totalVisits: 0
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
};

// Get all clients
const getAllClients = async () => {
    try {
        const snapshot = await db.collection('clients').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting clients:', error);
        throw error;
    }
};

// Get client by ID
const getClientById = async (clientId) => {
    try {
        const doc = await db.collection('clients').doc(clientId).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            };
        }
        return null;
    } catch (error) {
        console.error('Error getting client:', error);
        throw error;
    }
};

// Update client
const updateClient = async (clientId, clientData) => {
    try {
        await db.collection('clients').doc(clientId).update({
            ...clientData,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
};

// Delete client
const deleteClient = async (clientId) => {
    try {
        await db.collection('clients').doc(clientId).delete();
    } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
    }
};

// Get client booking history
const getClientBookingHistory = async (clientId) => {
    try {
        const snapshot = await db.collection('bookings')
            .where('clientId', '==', clientId)
            .orderBy('date', 'desc')
            .get();
            
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting client history:', error);
        throw error;
    }
};

// Display clients
const displayClients = (clients) => {
    if (!clientsList) return;
    
    clientsList.innerHTML = '';
    
    clients.forEach(client => {
        const clientElement = document.createElement('div');
        clientElement.className = 'client-card';
        clientElement.innerHTML = `
            <div class="client-info">
                <h4>${client.name}</h4>
                <p>Phone: ${client.phone}</p>
                <p>Email: ${client.email || 'N/A'}</p>
                <p>Total Visits: ${client.totalVisits}</p>
                <p>Last Visit: ${client.lastVisit ? new Date(client.lastVisit).toLocaleDateString() : 'Never'}</p>
            </div>
            <div class="client-actions">
                <button onclick="viewClientHistory('${client.id}')">View History</button>
                <button onclick="editClient('${client.id}')">Edit</button>
                <button onclick="deleteClient('${client.id}')">Delete</button>
            </div>
        `;
        clientsList.appendChild(clientElement);
    });
};

// Search clients
const searchClients = async (searchTerm) => {
    try {
        const clients = await getAllClients();
        return clients.filter(client => 
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.phone.includes(searchTerm) ||
            (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    } catch (error) {
        console.error('Error searching clients:', error);
        throw error;
    }
};

// Event Listeners
if (clientForm) {
    clientForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const clientData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            notes: document.getElementById('notes').value
        };
        
        try {
            await createClient(clientData);
            alert('Client added successfully!');
            clientForm.reset();
            // Refresh clients list
            const clients = await getAllClients();
            displayClients(clients);
        } catch (error) {
            alert('Error adding client: ' + error.message);
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', async (e) => {
        const searchTerm = e.target.value;
        if (searchTerm.length >= 2) {
            const results = await searchClients(searchTerm);
            displayClients(results);
        } else if (searchTerm.length === 0) {
            const clients = await getAllClients();
            displayClients(clients);
        }
    });
}

// Export functions
export {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
    getClientBookingHistory,
    displayClients,
    searchClients
}; 