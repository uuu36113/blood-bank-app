import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Droplet, Clock } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  // Dummy Data for charts
  const barData = [
    { name: 'Jan', donations: 400 },
    { name: 'Feb', donations: 600 },
    { name: 'Mar', donations: 800 },
    { name: 'Apr', donations: 500 },
    { name: 'May', donations: 900 },
    { name: 'Jun', donations: 1200 },
  ];

  const pieData = [
    { name: 'A+', value: 400 },
    { name: 'O+', value: 600 },
    { name: 'B+', value: 300 },
    { name: 'AB+', value: 200 },
    { name: 'O-', value: 100 },
    { name: 'Other', value: 150 },
  ];
  
  const COLORS = ['#e63946', '#1d3557', '#457b9d', '#a8dadc', '#f1faee', '#8d99ae'];

  return (
    <div className="dashboard-page container">
      <div className="page-header">
        <h1>Overview Dashboard</h1>
        <p>Real-time insights and analytics of blood bank inventory.</p>
      </div>

      <div className="dashboard-metrics">
        <div className="metric-card">
          <div className="metric-icon"><Users size={28}/></div>
          <div className="metric-details">
            <p>Total Registered Donors</p>
            <h3>24,591</h3>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon alert-icon"><Droplet size={28}/></div>
          <div className="metric-details">
            <p>Available Blood Units</p>
            <h3>8,142</h3>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon success-icon"><Clock size={28}/></div>
          <div className="metric-details">
            <p>Recent Donations (Today)</p>
            <h3>145</h3>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h3>Donations Over Time</h3>
          <div className="chart-canvas">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="donations" fill="var(--primary-red)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-wrapper">
          <h3>Blood Group Distribution</h3>
          <div className="chart-canvas">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
