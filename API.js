const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fraudDetection', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Sample Models (You will need to define these according to your schema)
const User = mongoose.model('User', new mongoose.Schema({
    userId: String,
    knownLocations: [String],
    devices: [String],
}));

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    userId: String,
    amount: Number,
    location: String,
    device: String,
    timestamp: Date,
    threatScore: Number,
}));

const Alert = mongoose.model('Alert', new mongoose.Schema({
    userId: String,
    transactionId: String,
    alertMessage: String,
    timestamp: Date,
}));

// Transaction Monitoring API
app.post('/api/transactions/monitor', async (req, res) => {
    const { userId, amount, location, device, timestamp } = req.body;

    // Calculate threat score (placeholder logic)
    const threatScore = Math.random() * 100;

    const transaction = new Transaction({
        userId,
        amount,
        location,
        device,
        timestamp,
        threatScore,
    });

    await transaction.save();

    // If threat score exceeds threshold, create alert
    if (threatScore > 75) {
        const alert = new Alert({
            userId,
            transactionId: transaction._id,
            alertMessage: 'High threat score detected',
            timestamp: new Date(),
        });
        await alert.save();
    }

    res.status(201).json({ message: 'Transaction monitored', threatScore });
});

// Dashboard Summary API
app.get('/api/dashboard/summary', async (req, res) => {
    const highRiskAlertsCount = await Alert.countDocuments();
    const totalTransactionsMonitored = await Transaction.countDocuments();
    const averageThreatScore = await Transaction.aggregate([
        { $group: { _id: null, avgScore: { $avg: '$threatScore' } } },
    ]);

    res.json({
        highRiskAlertsCount,
        totalTransactionsMonitored,
        averageThreatScore: averageThreatScore[0]?.avgScore || 0,
    });
});

// Suspicious Transactions API
app.get('/api/transactions/suspicious', async (req, res) => {
    const suspiciousTransactions = await Transaction.find({ threatScore: { $gt: 75 } });
    res.json(suspiciousTransactions);
});

// User Location History API
app.get('/api/users/:userId/locations', async (req, res) => {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.knownLocations);
});

// Device Verification API
app.post('/api/verify/device', async (req, res) => {
    const { userId, device } = req.body;
    const user = await User.findOne({ userId });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isKnownDevice = user.devices.includes(device);
    res.json({ isKnownDevice });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
