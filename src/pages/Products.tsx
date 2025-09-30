import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const products: Product[] = [
    { id: 1, name: 'Смартфон Galaxy S24', price: 89990, stock: 15, category: 'Электроника', image: '📱' },
    { id: 2, name: 'Ноутбук MacBook Pro', price: 199990, stock: 8, category: 'Компьютеры', image: '💻' },
    { id: 3, name: 'Наушники AirPods Pro', price: 24990, stock: 32, category: 'Аксессуары', image: '🎧' },
    { id: 4, name: 'Умные часы Apple Watch', price: 49990, stock: 12, category: 'Носимые устройства', image: '⌚' },
    { id: 5, name: 'Планшет iPad Air', price: 69990, stock: 20, category: 'Планшеты', image: '📲' },
    { id: 6, name: 'Камера Canon EOS R5', price: 299990, stock: 5, category: 'Фото', image: '📷' },
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-poiret">Управление товарами</h1>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-poiret shadow-lg">
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить товар
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="border-purple-200 hover:bg-purple-50 hover:border-purple-600 font-poiret">
            <Icon name="Filter" size={20} className="mr-2" />
            Фильтры
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-5xl mb-2">{product.image}</div>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreVertical" size={20} />
                  </Button>
                </div>
                <CardTitle className="text-lg font-poiret">{product.name}</CardTitle>
                <p className="text-sm text-gray-500">{product.category}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Цена:</span>
                    <span className="text-lg font-bold text-purple-600">{product.price.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">В наличии:</span>
                    <span className={`font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                      {product.stock} шт.
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 border-purple-200 hover:bg-purple-50 hover:border-purple-600 font-poiret">
                      <Icon name="Edit" size={16} className="mr-1" />
                      Изменить
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-pink-200 hover:bg-pink-50 hover:border-pink-600 font-poiret">
                      <Icon name="Trash2" size={16} className="mr-1" />
                      Удалить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;