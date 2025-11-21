import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, ShoppingBag, Users, DollarSign, Clock, ChefHat } from 'lucide-react';

const data = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 2000, orders: 12 },
  { name: 'Thu', sales: 2780, orders: 20 },
  { name: 'Fri', sales: 5890, orders: 45 },
  { name: 'Sat', sales: 8390, orders: 60 },
  { name: 'Sun', sales: 6490, orders: 50 },
];

const StatCard = ({ title, value, trend, icon: Icon, trendUp }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-dawn-200">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${trendUp ? 'bg-green-50 text-green-700' : 'bg-dawn-50 text-dawn-600'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-500'}`}>
        {trend}
        {trendUp && <ArrowUpRight className="w-3 h-3" />}
      </div>
    </div>
    <h3 className="text-dawn-600 text-sm font-medium mb-1 uppercase tracking-wide">{title}</h3>
    <p className="text-3xl font-serif font-bold text-dawn-900">{value}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dawn-900 font-serif">Good Morning, Chef</h1>
          <p className="text-dawn-600 mt-1">The ovens are hot and the orders are rolling in.</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-cream-200 flex items-center justify-center text-dawn-600 border border-cream-300">
          <ChefHat className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$24,500" trend="+12.5%" icon={DollarSign} trendUp={true} />
        <StatCard title="Active Orders" value="145" trend="Processing" icon={ShoppingBag} trendUp={false} />
        <StatCard title="New Patrons" value="32" trend="+4.2%" icon={Users} trendUp={true} />
        <StatCard title="Avg Prep Time" value="42m" trend="-2m" icon={Clock} trendUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-cream-200 shadow-sm">
          <h3 className="text-xl font-bold text-dawn-900 mb-8 font-serif">Weekly Sales Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5e6d3" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9c6644', fontSize: 12}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9c6644', fontSize: 12}} 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{fill: '#fffbf2'}}
                  contentStyle={{
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 20px -2px rgba(192, 86, 33, 0.1)',
                    backgroundColor: '#fff',
                    fontFamily: 'Inter'
                  }}
                  formatter={(value: number) => [`$${value}`, 'Sales']}
                />
                <Bar 
                  dataKey="sales" 
                  fill="#c05621" 
                  radius={[6, 6, 0, 0]} 
                  barSize={32}
                  activeBar={{fill: '#9c4221'}}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-cream-200 shadow-sm">
          <h3 className="text-xl font-bold text-dawn-900 mb-8 font-serif">Best Sellers</h3>
          <div className="space-y-6">
            {[
              { name: "Artisan Sourdough", sold: 842, price: "$8.50" },
              { name: "Butter Croissant", sold: 654, price: "$4.25" },
              { name: "Double Choco Muffin", sold: 421, price: "$3.75" },
              { name: "Everything Bagel", sold: 332, price: "$2.50" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between group p-2 hover:bg-cream-50 rounded-xl transition-colors -mx-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center text-dawn-600 font-serif font-bold text-lg group-hover:bg-dawn-600 group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-dawn-900 text-sm">{item.name}</p>
                    <p className="text-xs text-dawn-500">{item.sold} units sold</p>
                  </div>
                </div>
                <span className="font-medium text-dawn-700 bg-cream-100 px-3 py-1 rounded-full text-sm">{item.price}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-medium text-dawn-600 hover:text-dawn-700 hover:bg-cream-50 rounded-xl transition-colors border border-dashed border-cream-300">
            View Full Menu Report
          </button>
        </div>
      </div>
    </div>
  );
};