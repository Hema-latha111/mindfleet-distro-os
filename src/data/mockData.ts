// Mock data for MindFleet Distributor OS

export const staffList = [
  { id: 1, name: "Ravi Kumar", capacity: 45, stops: 38, distance: "28 km", performance: 92, risk: false },
  { id: 2, name: "Suresh Babu", capacity: 40, stops: 36, distance: "24 km", performance: 88, risk: false },
  { id: 3, name: "Venkat Reddy", capacity: 42, stops: 42, distance: "31 km", performance: 95, risk: false },
  { id: 4, name: "Ganesh M.", capacity: 38, stops: 34, distance: "22 km", performance: 85, risk: true },
  { id: 5, name: "Prakash S.", capacity: 40, stops: 37, distance: "26 km", performance: 90, risk: false },
  { id: 6, name: "Arun D.", capacity: 44, stops: 40, distance: "30 km", performance: 93, risk: false },
  { id: 7, name: "Karthik V.", capacity: 36, stops: 32, distance: "20 km", performance: 82, risk: true },
  { id: 8, name: "Manoj P.", capacity: 42, stops: 39, distance: "27 km", performance: 91, risk: false },
  { id: 9, name: "Srinivas R.", capacity: 40, stops: 35, distance: "25 km", performance: 87, risk: false },
  { id: 10, name: "Deepak K.", capacity: 38, stops: 36, distance: "23 km", performance: 89, risk: false },
  { id: 11, name: "Rajesh N.", capacity: 41, stops: 38, distance: "29 km", performance: 90, risk: false },
  { id: 12, name: "Vijay S.", capacity: 39, stops: 33, distance: "21 km", performance: 84, risk: true },
];

export const shopsList = [
  { id: 1, name: "Sri Lakshmi Store", owner: "P. Lakshmi", area: "T. Nagar", cadence: "Daily", lastDelivery: "16 Feb", outstanding: "₹12,400" },
  { id: 2, name: "Kumar Provisions", owner: "R. Kumar", area: "Mylapore", cadence: "Daily", lastDelivery: "16 Feb", outstanding: "₹8,200" },
  { id: 3, name: "Annapoorna Mart", owner: "S. Devi", area: "Anna Nagar", cadence: "Alternate", lastDelivery: "15 Feb", outstanding: "₹0" },
  { id: 4, name: "Balaji Store", owner: "V. Balaji", area: "Adyar", cadence: "Daily", lastDelivery: "16 Feb", outstanding: "₹24,600" },
  { id: 5, name: "New Vasanth Store", owner: "M. Vasanth", area: "Velachery", cadence: "Weekly", lastDelivery: "14 Feb", outstanding: "₹5,100" },
  { id: 6, name: "Mahalakshmi Shop", owner: "G. Maha", area: "Chromepet", cadence: "Daily", lastDelivery: "16 Feb", outstanding: "₹0" },
  { id: 7, name: "Ganesh Provision", owner: "K. Ganesh", area: "Tambaram", cadence: "Alternate", lastDelivery: "15 Feb", outstanding: "₹18,300" },
  { id: 8, name: "Saravana Stores", owner: "S. Ravi", area: "KK Nagar", cadence: "Daily", lastDelivery: "16 Feb", outstanding: "₹3,400" },
  { id: 9, name: "Murugan Mart", owner: "T. Murugan", area: "Porur", cadence: "Daily", lastDelivery: "16 Feb", outstanding: "₹7,800" },
  { id: 10, name: "Sakthi Store", owner: "P. Sakthi", area: "Guindy", cadence: "Alternate", lastDelivery: "15 Feb", outstanding: "₹0" },
  { id: 11, name: "Ayyappan Shop", owner: "R. Ayyappan", area: "Perungudi", cadence: "Daily", lastDelivery: "16 Feb", outstanding: "₹11,200" },
  { id: 12, name: "Venkat Stores", owner: "N. Venkat", area: "Sholinganallur", cadence: "Weekly", lastDelivery: "12 Feb", outstanding: "₹45,000" },
  { id: 13, name: "Padma Provision", owner: "L. Padma", area: "Thoraipakkam", cadence: "Daily", lastDelivery: "16 Feb", outstanding: "₹2,100" },
  { id: 14, name: "Raja Store", owner: "D. Raja", area: "OMR", cadence: "Alternate", lastDelivery: "15 Feb", outstanding: "₹9,600" },
  { id: 15, name: "Selvi Mart", owner: "M. Selvi", area: "Pallavaram", cadence: "Daily", lastDelivery: "16 Feb", outstanding: "₹0" },
];

export const inventoryItems = [
  { id: 1, name: "Milk 500ml", available: 120, threshold: 200, avgDaily: 85, lowStock: true },
  { id: 2, name: "Aavin Curd 200g", available: 340, threshold: 150, avgDaily: 62, lowStock: false },
  { id: 3, name: "Bread White", available: 80, threshold: 100, avgDaily: 45, lowStock: true },
  { id: 4, name: "Rice 5kg", available: 520, threshold: 200, avgDaily: 38, lowStock: false },
  { id: 5, name: "Sugar 1kg", available: 310, threshold: 150, avgDaily: 42, lowStock: false },
  { id: 6, name: "Oil 1L Sunflower", available: 245, threshold: 100, avgDaily: 30, lowStock: false },
  { id: 7, name: "Toor Dal 1kg", available: 180, threshold: 80, avgDaily: 25, lowStock: false },
  { id: 8, name: "Biscuit Variety Pack", available: 410, threshold: 200, avgDaily: 55, lowStock: false },
  { id: 9, name: "Tea Powder 250g", available: 290, threshold: 120, avgDaily: 35, lowStock: false },
  { id: 10, name: "Soap Bar", available: 560, threshold: 200, avgDaily: 40, lowStock: false },
];

export const invoicesList = [
  { id: "INV-2401", shop: "Sri Lakshmi Store", total: "₹18,400", outstanding: "₹12,400", status: "Partial" as const },
  { id: "INV-2402", shop: "Kumar Provisions", total: "₹12,600", outstanding: "₹8,200", status: "Partial" as const },
  { id: "INV-2403", shop: "Annapoorna Mart", total: "₹9,800", outstanding: "₹0", status: "Paid" as const },
  { id: "INV-2404", shop: "Balaji Store", total: "₹32,100", outstanding: "₹24,600", status: "Overdue" as const },
  { id: "INV-2405", shop: "New Vasanth Store", total: "₹5,100", outstanding: "₹5,100", status: "Overdue" as const },
  { id: "INV-2406", shop: "Mahalakshmi Shop", total: "₹7,400", outstanding: "₹0", status: "Paid" as const },
  { id: "INV-2407", shop: "Ganesh Provision", total: "₹22,800", outstanding: "₹18,300", status: "Partial" as const },
  { id: "INV-2408", shop: "Saravana Stores", total: "₹14,200", outstanding: "₹3,400", status: "Partial" as const },
  { id: "INV-2409", shop: "Murugan Mart", total: "₹7,800", outstanding: "₹7,800", status: "Overdue" as const },
  { id: "INV-2410", shop: "Sakthi Store", total: "₹11,500", outstanding: "₹0", status: "Paid" as const },
];

export const dispatchJournal = [
  { time: "08:00", event: "Draft Created", detail: "AI generated dispatch plan for 428 shops", type: "info" as const },
  { time: "08:02", event: "Approved by Admin", detail: "Plan approved with 91% confidence score", type: "success" as const },
  { time: "09:15", event: "Override – Shop Reassigned", detail: "Balaji Store moved from Ravi to Suresh due to proximity", type: "warning" as const },
  { time: "09:30", event: "Dispatch Started", detail: "12 staff dispatched to assigned routes", type: "info" as const },
  { time: "11:45", event: "SLA Warning", detail: "4 shops at risk of missing delivery window", type: "warning" as const },
  { time: "14:20", event: "Stock Alert", detail: "Milk 500ml may stock out in Zone 3", type: "warning" as const },
];
