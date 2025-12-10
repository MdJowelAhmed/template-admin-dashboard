import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Package, FolderTree, DollarSign, TrendingUp, TrendingDown, ShoppingCart, Clock } from 'lucide-react'
import { formatCurrency, formatCompactNumber, formatPercentage } from '@/utils/formatters'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

interface StatCardProps {
  title: string
  value: string | number
  change: number
  icon: React.ElementType
  description: string
  index: number
}

function StatCard({ title, value, change, icon: Icon, description, index }: StatCardProps) {
  const isPositive = change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={cn(
                'flex items-center text-xs font-medium',
                isPositive ? 'text-success' : 'text-destructive'
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {formatPercentage(change)}
            </span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: formatCompactNumber(12543),
      change: 12.5,
      icon: Users,
      description: 'vs last month',
    },
    {
      title: 'Total Products',
      value: formatCompactNumber(3420),
      change: 8.2,
      icon: Package,
      description: 'vs last month',
    },
    {
      title: 'Categories',
      value: '156',
      change: 3.1,
      icon: FolderTree,
      description: 'vs last month',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(845320),
      change: -2.4,
      icon: DollarSign,
      description: 'vs last month',
    },
  ]

  const recentActivity = [
    { id: 1, action: 'New user registered', user: 'John Doe', time: '2 min ago' },
    { id: 2, action: 'Product updated', user: 'Jane Smith', time: '15 min ago' },
    { id: 3, action: 'Order completed', user: 'Mike Johnson', time: '1 hour ago' },
    { id: 4, action: 'Category created', user: 'Sarah Williams', time: '2 hours ago' },
    { id: 5, action: 'User blocked', user: 'Admin', time: '3 hours ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Users, label: 'Add User', color: 'bg-blue-500/10 text-blue-500' },
                  { icon: Package, label: 'Add Product', color: 'bg-green-500/10 text-green-500' },
                  { icon: FolderTree, label: 'Add Category', color: 'bg-purple-500/10 text-purple-500' },
                  { icon: ShoppingCart, label: 'View Orders', color: 'bg-orange-500/10 text-orange-500' },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className={cn('p-2 rounded-lg', action.color)}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions in your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

