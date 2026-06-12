export const donors = [
  { 
    id: 1, 
    name: "Ali Khan", 
    bloodType: "O+", 
    location: "KDA Phase 1", 
    contact: "0300-1234567",
    donations: 12,
    lastDonation: "2 months ago",
    verified: true,
    available: true
  },
  { 
    id: 2, 
    name: "Sara Ahmed", 
    bloodType: "A-", 
    location: "City Center", 
    contact: "0333-7654321",
    donations: 8,
    lastDonation: "3 months ago",
    verified: true,
    available: true
  },
  { 
    id: 3, 
    name: "Usman Raza", 
    bloodType: "B+", 
    location: "University Road", 
    contact: "0312-9988776",
    donations: 15,
    lastDonation: "1 month ago",
    verified: true,
    available: false
  },
  { 
    id: 4, 
    name: "Zainab Bibi", 
    bloodType: "AB+", 
    location: "Old Town", 
    contact: "0345-1122334",
    donations: 6,
    lastDonation: "4 months ago",
    verified: false,
    available: true
  },
  { 
    id: 5, 
    name: "Bilal Malik", 
    bloodType: "O-", 
    location: "KDA Phase 2", 
    contact: "0301-4455667",
    donations: 20,
    lastDonation: "2 weeks ago",
    verified: true,
    available: true
  },
  { 
    id: 6, 
    name: "Fatima Noor", 
    bloodType: "A+", 
    location: "Main Boulevard", 
    contact: "0321-7788990",
    donations: 10,
    lastDonation: "2 months ago",
    verified: true,
    available: true
  },
];

export const urgentNeeds = [
  { hospital: "DHQ Hospital Kohat", blood: "O-", patients: 3, urgency: "critical", time: "2 hours ago" },
  { hospital: "City Medical Complex", blood: "A+", patients: 2, urgency: "high", time: "5 hours ago" },
  { hospital: "Al-Razi Hospital", blood: "B-", patients: 1, urgency: "medium", time: "1 day ago" }
];

export const bloodBanks = [
  { name: "Kohat Central Blood Bank", phone: "0922-123456", hours: "24/7", rating: 4.9 },
  { name: "Red Crescent Blood Center", phone: "0922-765432", hours: "8 AM - 10 PM", rating: 4.8 },
  { name: "District Hospital Blood Bank", phone: "0922-998877", hours: "24/7", rating: 4.7 }
];

export const stats = [
  { icon: 'Users', value: "2,847", label: "Registered Donors", change: "+124 this month" },
  { icon: 'Heart', value: "1,234", label: "Lives Saved", change: "+89 this month" },
  { icon: 'Droplet', value: "3,456", label: "Units Donated", change: "+234 this month" },
  { icon: 'Award', value: "98%", label: "Success Rate", change: "Verified donors" }
];

export const bloodTypeColors = {
  'O+': { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', gradient: 'from-red-500 to-red-600' },
  'O-': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', gradient: 'from-red-600 to-red-700' },
  'A+': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
  'A-': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', gradient: 'from-blue-600 to-blue-700' },
  'B+': { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', gradient: 'from-green-500 to-green-600' },
  'B-': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', gradient: 'from-green-600 to-green-700' },
  'AB+': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
  'AB-': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', gradient: 'from-purple-600 to-purple-700' }
};

export const urgencyColors = {
  critical: { bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-400/30' },
  high: { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-400/30' },
  medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-400/30' }
};
