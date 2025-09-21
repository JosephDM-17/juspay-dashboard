// Dashboard API data
export const dashboardData = {
  kpis: [
    {
      id: 'customers',
      title: 'Customers',
      value: '3,781',
      trend: '+11.01%',
      trendType: 'up',
      color: 'blue'
    },
    {
      id: 'orders',
      title: 'Orders',
      value: '1,219',
      trend: '-0.03%',
      trendType: 'down',
      color: 'yellow'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: '$695',
      trend: '+15.03%',
      trendType: 'up',
      color: 'blue'
    },
    {
      id: 'growth',
      title: 'Growth',
      value: '30.1%',
      trend: '+6.08%',
      trendType: 'up',
      color: 'white'
    }
  ],
  
  projectionsData: {
    title: 'Projections vs Actuals',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [15, 22, 18, 25, 28, 30]
  },
  
  revenueTrend: {
    title: 'Revenue',
    currentWeek: {
      label: 'Current Week $58,211',
      data: [12, 15, 18, 22, 25, 28],
      color: '#000'
    },
    previousWeek: {
      label: 'Previous Week $68,768',
      data: [10, 12, 15, 18, 20, 22],
      color: '#ccc'
    },
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  
  revenueByLocation: {
    title: 'Revenue by Location',
    locations: [
      { name: 'New York', revenue: '72K' },
      { name: 'San Francisco', revenue: '39K' },
      { name: 'Sydney', revenue: '25K' },
      { name: 'Singapore', revenue: '61K' }
    ]
  },
  
  topSellingProducts: [
    { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
    { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
    { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
    { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
    { name: 'Marco Shoes', price: '$79.49', quantity: 64, amount: '$1,965.81' }
  ],
  
  totalSales: {
    title: 'Total Sales',
    data: [
      { name: 'Direct', value: 300.56, percentage: 38.6, color: '#000' },
      { name: 'Affiliate', value: 135.18, percentage: 25.2, color: '#52c41a' },
      { name: 'Sponsored', value: 154.02, percentage: 28.7, color: '#722ed1' },
      { name: 'E-mail', value: 48.96, percentage: 7.5, color: '#1890ff' }
    ]
  }
};

export const orderListData = [
  {
    key: 'CM9801',
    orderId: '#CM9801',
    user: { name: 'Natali Craig' },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: 'Just now',
    status: 'In Progress',
  },
  {
    key: 'CM9802',
    orderId: '#CM9802',
    user: { name: 'Kate Morrison' },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: 'A minute ago',
    status: 'Complete',
  },
  {
    key: 'CM9803',
    orderId: '#CM9803',
    user: { name: 'Drew Cano' },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocala',
    date: '1 hour ago',
    status: 'Pending',
  },
  {
    key: 'CM9804',
    orderId: '#CM9804',
    user: { name: 'Orlando Diggs' },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: 'Yesterday',
    status: 'Approved',
  },
  {
    key: 'CM9805',
    orderId: '#CM9805',
    user: { name: 'Andi Lane' },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: 'Feb 2, 2023',
    status: 'Rejected',
    hasCalendar: true,
  }
];

// API functions
export const fetchDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dashboardData), 500);
  });
};

export const fetchOrderList = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(orderListData), 300);
  });
};
