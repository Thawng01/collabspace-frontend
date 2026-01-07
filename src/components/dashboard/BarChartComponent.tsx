import {  ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';

interface WeeklyData {
  day: string;
  completed: number;
  inProgress: number;
  pending: number;
}

interface BarChartComponentProps {
  data: WeeklyData[];
}

export const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => (
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#E5E7EB" 
          vertical={false}
        />
        <XAxis 
          dataKey="day" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value) => [`${value} tasks`, 'Count']}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
          iconSize={10}
        />
        <Bar 
          dataKey="completed" 
          fill="#10B981" 
          name="Completed" 
          radius={[4, 4, 0, 0]} 
          maxBarSize={40}
        />
        <Bar 
          dataKey="inProgress" 
          fill="#F59E0B" 
          name="In Progress" 
          radius={[4, 4, 0, 0]} 
          maxBarSize={40}
        />
        <Bar 
          dataKey="pending" 
          fill="#3B82F6" 
          name="Pending" 
          radius={[4, 4, 0, 0]} 
          maxBarSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);