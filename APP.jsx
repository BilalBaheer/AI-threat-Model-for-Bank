// FraudDetectionDashboard.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, Clock, MapPin, DollarSign, Activity } from 'lucide-react';

const FraudDetectionDashboard = () => {
  // Sample transaction data
  const [transactions] = useState([
    {
      id: 1,
      user: "John Doe",
      amount: 5000,
      location: "New York, USA",
      threatScore: 85,
      flags: ["unusual_amount", "new_location"],
      timestamp: "2024-03-24 14:30:22"
    },
    {
      id: 2,
      user: "Sarah Smith",
      amount: 2500,
      location: "London, UK",
      threatScore: 45,
      flags: ["odd_hours"],
      timestamp: "2024-03-24 03:15:10"
    },
    {
      id: 3,
      user: "Mike Johnson",
      amount: 8000,
      location: "Dubai, UAE",
      threatScore: 92,
      flags: ["unusual_amount", "new_location", "unknown_device"],
      timestamp: "2024-03-24 10:45:33"
    }
  ]);

  // Helper function to determine threat level color
  const getThreatColor = (score) => {
    if (score >= 75) return "bg-red-100 text-red-800";
    if (score >= 50) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  // Helper function to get appropriate icon for each flag type
  const getFlagIcon = (flag) => {
    switch (flag) {
      case "unusual_amount":
        return <DollarSign className="w-4 h-4" />;
      case "new_location":
        return <MapPin className="w-4 h-4" />;
      case "odd_hours":
        return <Clock className="w-4 h-4" />;
      case "unknown_device":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold">Bank Guardian: Fraud Detection System</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">High Risk Alerts</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Transactions Monitored</p>
                <p className="text-2xl font-bold text-blue-600">1,245</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Threat Score</p>
                <p className="text-2xl font-bold text-yellow-600">74.0</p>
              </div>
              <Shield className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Banner */}
      <Alert className="mb-6 bg-red-50 border-red-200">
        <AlertTriangle className="w-4 h-4 text-red-600" />
        <AlertDescription className="text-red-800">
          2 high-risk transactions detected in the last hour requiring immediate attention
        </AlertDescription>
      </Alert>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Suspicious Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">User</th>
                  <th className="text-left p-3">Amount</th>
                  <th className="text-left p-3">Location</th>
                  <th className="text-left p-3">Threat Score</th>
                  <th className="text-left p-3">Risk Factors</th>
                  <th className="text-left p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{tx.user}</td>
                    <td className="p-3">${tx.amount.toLocaleString()}</td>
                    <td className="p-3">{tx.location}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-sm ${getThreatColor(tx.threatScore)}`}>
                        {tx.threatScore}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        {tx.flags.map((flag) => (
                          <div key={flag} className="tooltip" title={flag.replace('_', ' ')}>
                            {getFlagIcon(flag)}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudDetectionDashboard;

// threatDetection.js - Core logic for threat detection
class ThreatDetection {
  constructor() {
    this.thresholds = {
      amount: 1000,
      locationChange: true,
      oddHours: { start: 23, end: 5 }
    };
  }

  calculateThreatScore(transaction) {
    let score = 0;
    const flags = [];

    // Check amount
    if (transaction.amount > this.thresholds.amount) {
      score += 30;
      flags.push("unusual_amount");
    }

    // Check location
    if (transaction.isNewLocation) {
      score += 25;
      flags.push("new_location");
    }

    // Check time
    const hour = new Date(transaction.timestamp).getHours();
    if (hour >= this.thresholds.oddHours.start || hour <= this.thresholds.oddHours.end) {
      score += 20;
      flags.push("odd_hours");
    }

    // Check device
    if (transaction.isUnknownDevice) {
      score += 25;
      flags.push("unknown_device");
    }

    return {
      score: Math.min(score, 100),
      flags
    };
  }
}

// api.js - API endpoints
const API_ENDPOINTS = {
  getTransactions: '/api/transactions',
  updateThreatScore: '/api/threat-score',
  getFlaggedTransactions: '/api/flagged-transactions'
};

// Sample API functions
async function getTransactions() {
  try {
    const response = await fetch(API_ENDPOINTS.getTransactions);
    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

async function updateThreatScore(transactionId, score) {
  try {
    await fetch(API_ENDPOINTS.updateThreatScore, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transactionId, score }),
    });
  } catch (error) {
    console.error('Error updating threat score:', error);
  }
}
