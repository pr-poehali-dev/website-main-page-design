import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Analytics = () => {
  const salesData = [
    { month: 'Янв', sales: 450000, orders: 45 },
    { month: 'Фев', sales: 520000, orders: 52 },
    { month: 'Мар', sales: 610000, orders: 61 },
    { month: 'Апр', sales: 580000, orders: 58 },
    { month: 'Май', sales: 720000, orders: 72 },
    { month: 'Июн', sales: 890000, orders: 89 },
    { month: 'Июл', sales: 950000, orders: 95 },
    { month: 'Авг', sales: 1020000, orders: 102 },
    { month: 'Сен', sales: 880000, orders: 88 },
  ];

  const categoryData = [
    { name: 'Электроника', value: 35, color: '#a675a8' },
    { name: 'Одежда', value: 25, color: '#d5b8d8' },
    { name: 'Аксессуары', value: 20, color: '#f9f6e4' },
    { name: 'Косметика', value: 15, color: '#c4a4c6' },
    { name: 'Прочее', value: 5, color: '#e8dce9' },
  ];

  const topProducts = [
    { name: 'Смартфон Galaxy S24', sales: 156, revenue: 14034400 },
    { name: 'Ноутбук MacBook Pro', sales: 48, revenue: 9599520 },
    { name: 'Планшет iPad Air', sales: 89, revenue: 6229110 },
    { name: 'Наушники AirPods Pro', sales: 234, revenue: 5847660 },
    { name: 'Умные часы Apple Watch', sales: 112, revenue: 5598880 },
  ];

  const stats = [
    { title: 'Общая выручка', value: '8 880 000 ₽', change: '+12.5%', icon: 'TrendingUp', color: 'text-green-600' },
    { title: 'Средний чек', value: '10 090 ₽', change: '+3.2%', icon: 'DollarSign', color: 'text-blue-600' },
    { title: 'Заказов за месяц', value: '880', change: '+8.7%', icon: 'ShoppingCart', color: 'text-purple-600' },
    { title: 'Новых клиентов', value: '324', change: '+15.3%', icon: 'Users', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-secondary to-primary-light">
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Аналитика и отчеты</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Icon name="Download" size={20} className="mr-2" />
                Экспорт
              </Button>
              <Button variant="outline">
                <Icon name="Calendar" size={20} className="mr-2" />
                Период
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <Icon name={stat.icon as any} size={20} className={stat.color} />
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className={`text-sm ${stat.color} flex items-center gap-1`}>
                  <Icon name="TrendingUp" size={14} />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Динамика продаж</CardTitle>
              <CardDescription>Выручка и количество заказов по месяцам</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="#a675a8"
                    strokeWidth={2}
                    name="Выручка (₽)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke="#d5b8d8"
                    strokeWidth={2}
                    name="Заказов"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Продажи по категориям</CardTitle>
              <CardDescription>Распределение выручки по категориям товаров</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Сравнение по месяцам</CardTitle>
              <CardDescription>Динамика заказов за последние 9 месяцев</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#a675a8" name="Заказов" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Топ-5 товаров</CardTitle>
              <CardDescription>Самые продаваемые товары по выручке</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">Продано: {product.sales} шт.</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{product.revenue.toLocaleString()} ₽</p>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <Icon name="TrendingUp" size={12} />
                        {index === 0 ? '+24%' : index === 1 ? '+18%' : index === 2 ? '+15%' : index === 3 ? '+12%' : '+9%'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Target" size={24} className="text-primary" />
              Ключевые метрики
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Конверсия</p>
                <p className="text-3xl font-bold text-primary">3.8%</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '38%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Возврат клиентов</p>
                <p className="text-3xl font-bold text-primary">42%</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Средний рейтинг</p>
                <p className="text-3xl font-bold text-primary">4.7/5</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;