import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  article: string;
  price: number;
  oldPrice?: number;
  stock: number;
  category: string;
  image?: string;
  description?: string;
  status: 'active' | 'draft' | 'out_of_stock';
}

const Products = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Игрушка "Мишка"',
      article: 'TOY-001',
      price: 1500,
      oldPrice: 2000,
      stock: 15,
      category: 'Игрушки',
      status: 'active',
      description: 'Плюшевый мишка ручной работы'
    },
    {
      id: 2,
      name: 'Набор для творчества',
      article: 'ART-102',
      price: 850,
      stock: 0,
      category: 'Творчество',
      status: 'out_of_stock',
      description: 'Полный набор для детского творчества'
    },
    {
      id: 3,
      name: 'Конструктор "Замок"',
      article: 'TOY-203',
      price: 3200,
      stock: 8,
      category: 'Игрушки',
      status: 'active',
      description: 'Деревянный конструктор из 150 деталей'
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [newProduct, setNewProduct] = useState({
    name: '',
    article: '',
    price: '',
    oldPrice: '',
    stock: '',
    category: '',
    description: '',
  });

  const categories = ['Все категории', 'Игрушки', 'Творчество', 'Книги', 'Одежда', 'Аксессуары'];
  
  const statuses = [
    { value: 'all', label: 'Все статусы' },
    { value: 'active', label: 'Активные' },
    { value: 'draft', label: 'Черновики' },
    { value: 'out_of_stock', label: 'Нет в наличии' },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      active: { variant: 'default', label: 'Активен' },
      draft: { variant: 'secondary', label: 'Черновик' },
      out_of_stock: { variant: 'destructive', label: 'Нет в наличии' },
    };
    return variants[status] || variants.active;
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    const product: Product = {
      id: products.length + 1,
      name: newProduct.name,
      article: newProduct.article || `ART-${Date.now()}`,
      price: parseFloat(newProduct.price),
      oldPrice: newProduct.oldPrice ? parseFloat(newProduct.oldPrice) : undefined,
      stock: parseInt(newProduct.stock),
      category: newProduct.category || 'Без категории',
      description: newProduct.description,
      status: parseInt(newProduct.stock) > 0 ? 'active' : 'out_of_stock',
    };

    setProducts([...products, product]);
    setIsAddDialogOpen(false);
    setNewProduct({
      name: '',
      article: '',
      price: '',
      oldPrice: '',
      stock: '',
      category: '',
      description: '',
    });

    toast({
      title: 'Товар добавлен',
      description: `Товар "${product.name}" успешно добавлен в каталог`,
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: 'Товар удален',
      description: 'Товар успешно удален из каталога',
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.article.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    outOfStock: products.filter(p => p.status === 'out_of_stock').length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-secondary to-primary-light">
      <header className="bg-white/80 backdrop-blur-md border-b border-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/dashboard'}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <span className="text-neutral-dark/60">|</span>
              <h1 className="text-2xl font-poiret font-bold text-primary">Управление товарами</h1>
            </div>

            <Button
              className="bg-gradient-primary text-white hover:opacity-90"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить товар
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-dark/70 mb-1">Всего товаров</p>
                  <p className="text-3xl font-poiret font-bold text-neutral-dark">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-dark/70 mb-1">Активные</p>
                  <p className="text-3xl font-poiret font-bold text-neutral-dark">{stats.active}</p>
                </div>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-dark/70 mb-1">Нет в наличии</p>
                  <p className="text-3xl font-poiret font-bold text-neutral-dark">{stats.outOfStock}</p>
                </div>
                <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center">
                  <Icon name="XCircle" size={24} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-dark/70 mb-1">Стоимость товаров</p>
                  <p className="text-3xl font-poiret font-bold text-neutral-dark">{stats.totalValue.toLocaleString()} ₽</p>
                </div>
                <div className="w-12 h-12 bg-primary-dark rounded-full flex items-center justify-center">
                  <Icon name="Wallet" size={24} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-primary/20">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-dark/40" />
                  <Input
                    placeholder="Поиск по названию или артикулу..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.slice(1).map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="font-poiret text-2xl">Каталог товаров</CardTitle>
            <CardDescription>Список всех товаров в магазине</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Package" size={64} className="mx-auto text-neutral-dark/20 mb-4" />
                  <p className="text-neutral-dark/60 text-lg">Товары не найдены</p>
                  <p className="text-neutral-dark/40 text-sm mt-2">Измените параметры поиска или добавьте новый товар</p>
                </div>
              ) : (
                filteredProducts.map((product) => {
                  const statusInfo = getStatusBadge(product.status);
                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-neutral/30 hover:bg-primary-light/20 transition-colors"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Icon name="Package" size={32} className="text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-medium text-neutral-dark text-lg">{product.name}</h3>
                            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                            <span className="text-sm text-neutral-dark/50">#{product.article}</span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-neutral-dark/70">
                            <span className="flex items-center">
                              <Icon name="Tag" size={14} className="mr-1" />
                              {product.category}
                            </span>
                            <span className="flex items-center">
                              <Icon name="Box" size={14} className="mr-1" />
                              На складе: {product.stock} шт
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-2xl font-poiret font-bold text-neutral-dark">
                            {product.price.toLocaleString()} ₽
                          </div>
                          {product.oldPrice && (
                            <div className="text-sm text-neutral-dark/50 line-through">
                              {product.oldPrice.toLocaleString()} ₽
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="border-primary/20">
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-destructive/20 text-destructive hover:bg-destructive hover:text-white"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-poiret text-2xl">Добавить новый товар</DialogTitle>
            <DialogDescription>
              Заполните информацию о товаре для добавления в каталог
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название товара *</Label>
                <Input
                  id="name"
                  placeholder="Например: Игрушка Мишка"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="article">Артикул</Label>
                <Input
                  id="article"
                  placeholder="TOY-001"
                  value={newProduct.article}
                  onChange={(e) => setNewProduct({ ...newProduct, article: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Цена *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="1500"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="oldPrice">Старая цена</Label>
                <Input
                  id="oldPrice"
                  type="number"
                  placeholder="2000"
                  value={newProduct.oldPrice}
                  onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Количество на складе *</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="10"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Подробное описание товара..."
                rows={3}
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddProduct} className="bg-gradient-primary text-white">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить товар
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;