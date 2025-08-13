import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Receipt, CreditCard, Calendar } from 'lucide-react';

const FinancialPanel: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock financial data
  const financialData = {
    revenue: {
      total: 156780.50,
      change: 15.2,
      target: 150000
    },
    orders: {
      total: 2340,
      change: 8.7,
      average: 67.04
    },
    expenses: {
      total: 42150.75,
      change: -3.2,
      categories: [
        { name: 'Inventory', amount: 25000, percentage: 59 },
        { name: 'Marketing', amount: 8500, percentage: 20 },
        { name: 'Operations', amount: 5650, percentage: 13 },
        { name: 'Other', amount: 3000, percentage: 8 }
      ]
    },
    transactions: [
      {
        id: 'TXN-001',
        type: 'order',
        amount: 299.99,
        customer: 'John Doe',
        date: new Date('2024-01-20T10:30:00'),
        status: 'completed',
        method: 'Credit Card'
      },
      {
        id: 'TXN-002',
        type: 'refund',
        amount: -79.99,
        customer: 'Jane Smith',
        date: new Date('2024-01-20T09:15:00'),
        status: 'processed',
        method: 'Credit Card'
      },
      {
        id: 'TXN-003',
        type: 'order',
        amount: 149.50,
        customer: 'Bob Johnson',
        date: new Date('2024-01-20T08:45:00'),
        status: 'completed',
        method: 'PayPal'
      },
      {
        id: 'TXN-004',
        type: 'order',
        amount: 89.99,
        customer: 'Alice Brown',
        date: new Date('2024-01-19T16:20:00'),
        status: 'pending',
        method: 'Credit Card'
      }
    ]
  };

  const metrics = [
    {
      title: 'Total Revenue',
      value: `$${financialData.revenue.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      change: `+${financialData.revenue.change}%`,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Orders',
      value: financialData.orders.total.toLocaleString(),
      change: `+${financialData.orders.change}%`,
      icon: Receipt,
      color: 'blue'
    },
    {
      title: 'Average Order',
      value: `$${financialData.orders.average.toFixed(2)}`,
      change: '+2.3%',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Total Expenses',
      value: `$${financialData.expenses.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      change: `${financialData.expenses.change}%`,
      icon: CreditCard,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Financial Metrics */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Financial Overview</h2>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = !metric.change.includes('-');
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${metric.color}-100`}>
                  <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">vs last {selectedPeriod}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Progress</h3>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Current</span>
              <span className="text-sm font-bold text-gray-900">
                ${financialData.revenue.total.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Target</span>
              <span className="text-sm font-bold text-gray-900">
                ${financialData.revenue.target.toLocaleString()}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-green-600 h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                style={{ width: `${Math.min((financialData.revenue.total / financialData.revenue.target) * 100, 100)}%` }}
              >
                <span className="text-xs font-medium text-white">
                  {Math.round((financialData.revenue.total / financialData.revenue.target) * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-green-600 font-medium">
              ${(financialData.revenue.total - financialData.revenue.target).toLocaleString()} over target!
            </p>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Expense Breakdown</h3>
          
          <div className="space-y-4">
            {financialData.expenses.categories.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{category.name}</span>
                  <span className="text-sm font-bold text-gray-900">
                    ${category.amount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">{category.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Transaction ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {financialData.transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm">{transaction.id}</span>
                  </td>
                  <td className="py-3 px-4">{transaction.customer}</td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4">{transaction.method}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {transaction.date.toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'pending'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialPanel;