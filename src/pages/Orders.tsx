import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
}

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const orders: Order[] = [
    { id: 10245, customer: 'Иван Петров', date: '2025-09-28', total: 89990, status: 'delivered', items: 1 },
    { id: 10244, customer: 'Мария Сидорова', date: '2025-09-28', total: 274980, status: 'shipped', items: 3 },
    { id: 10243, customer: 'Алексей Иванов', date: '2025-09-27', total: 49990, status: 'processing', items: 1 },
    { id: 10242, customer: 'Елена Смирнова', date: '2025-09-27', total: 149980, status: 'pending', items: 2 },
    { id: 10241, customer: 'Дмитрий Козлов', date: '2025-09-26', total: 199990, status: 'delivered', items: 1 },
    { id: 10240, customer: 'Ольга Новикова', date: '2025-09-26', total: 24990, status: 'cancelled', items: 1 },
  ];

  const statusConfig = {
    pending: { label: 'Новый', color: 'bg-yellow-500' },
    processing: { label: 'В обработке', color: 'bg-blue-500' },
    shipped: { label: 'Отправлен', color: 'bg-purple-500' },
    delivered: { label: 'Доставлен', color: 'bg-green-500' },
    cancelled: { label: 'Отменен', color: 'bg-red-500' },
  };

  const filteredOrders = orders.filter(o => 
    o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-cream via-primary-light/20 to-accent-light-blue/30">
      <header className="bg-white/90 backdrop-blur-sm border-b border-primary-light/30 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-dark to-accent-blue bg-clip-text text-transparent font-poiret">Заказы</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-primary-light/50 hover:bg-primary-light/20 hover:border-primary-dark font-poiret">
                <Icon name="Download" size={20} className="mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Всего заказов</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <Icon name="ShoppingCart" size={32} className="text-primary-dark" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Новые</p>
                  <p className="text-2xl font-bold">{orders.filter(o => o.status === 'pending').length}</p>
                </div>
                <Icon name="Clock" size={32} className="text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">В обработке</p>
                  <p className="text-2xl font-bold">{orders.filter(o => o.status === 'processing').length}</p>
                </div>
                <Icon name="Package" size={32} className="text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Доставлено</p>
                  <p className="text-2xl font-bold">{orders.filter(o => o.status === 'delivered').length}</p>
                </div>
                <Icon name="CheckCircle" size={32} className="text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-poiret">Список заказов</CardTitle>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="border-primary-light/50 hover:bg-primary-light/20 hover:border-primary-dark">
                  <Icon name="Filter" size={20} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">№ Заказа</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Клиент</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Дата</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Товаров</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Сумма</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Статус</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm text-gray-600">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-mono text-sm">#{order.id}</td>
                      <td className="py-4 px-4">{order.customer}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{order.date}</td>
                      <td className="py-4 px-4 text-sm">{order.items} шт.</td>
                      <td className="py-4 px-4 font-semibold">{order.total.toLocaleString()} ₽</td>
                      <td className="py-4 px-4">
                        <Badge className={`${statusConfig[order.status].color} text-white`}>
                          {statusConfig[order.status].label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Edit" size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Orders;