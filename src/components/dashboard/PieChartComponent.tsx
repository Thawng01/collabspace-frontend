import { 
  PieChart, Pie, Cell, ResponsiveContainer,  Tooltip
} from 'recharts';

export const PieChartComponent: React.FC<any> = ({ data }) => {
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const total = data.reduce((sum: number, d: any) => sum + d.value, 0);
      const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';
      
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <span className="font-medium text-gray-900">{item.name}</span>
          </div>
          <p className="text-sm text-gray-600">
            {item.value} task{item.value !== 1 ? 's' : ''}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={data.length > 1 ? 5 : 0}
            dataKey="value"
            label={({ name, percent }) => 
              `${name}: ${(percent! * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry: any, index: number) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                strokeWidth={2}
                stroke="#fff"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};