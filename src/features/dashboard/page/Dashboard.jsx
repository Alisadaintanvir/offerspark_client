import React from "react";
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Activity,
  Clock,
} from "lucide-react";

const statCards = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12.5%",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "+8.2%",
    icon: DollarSign,
    color: "bg-green-500",
  },
  {
    title: "Orders",
    value: "1,234",
    change: "+3.1%",
    icon: ShoppingCart,
    color: "bg-purple-500",
  },
  {
    title: "Growth",
    value: "23.1%",
    change: "+2.4%",
    icon: TrendingUp,
    color: "bg-orange-500",
  },
];

const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "placed a new order",
    time: "2 minutes ago",
    icon: ShoppingCart,
  },
  {
    id: 2,
    user: "Sarah Smith",
    action: "registered as a new user",
    time: "5 minutes ago",
    icon: Users,
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "completed payment",
    time: "10 minutes ago",
    icon: DollarSign,
  },
  {
    id: 4,
    user: "Emma Wilson",
    action: "updated profile",
    time: "15 minutes ago",
    icon: Activity,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock size={16} />
          <span>Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  from last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              Add New User
            </button>
            <button className="p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
              Create Report
            </button>
            <button className="p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
              View Analytics
            </button>
            <button className="p-4 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
              Manage Orders
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            System Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Server Load</span>
              <span className="text-green-600">Normal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <span className="text-green-600">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Backup</span>
              <span className="text-gray-600">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="text-gray-600">99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
