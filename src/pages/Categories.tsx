import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  productsCount: number;
  image?: string;
  parentId?: number;
  isActive: boolean;
}

const Categories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: 'Игрушки',
      slug: 'toys',
      description: 'Развивающие и обучающие игрушки для детей',
      productsCount: 24,
      isActive: true,
    },
    {
      id: 2,
      name: 'Творчество',
      slug: 'art',
      description: 'Товары для детского творчества и развития',
      productsCount: 18,
      isActive: true,
    },
    {
      id: 3,
      name: 'Книги',
      slug: 'books',
      description: 'Детские книги и развивающая литература',
      productsCount: 42,
      isActive: true,
    },
    {
      id: 4,
      name: 'Одежда',
      slug: 'clothes',
      description: 'Детская одежда и аксессуары',
      productsCount: 12,
      isActive: false,
    },
    {
      id: 5,
      name: 'Аксессуары',
      slug: 'accessories',
      description: 'Различные детские аксессуары',
      productsCount: 8,
      isActive: true,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => {
        const ru = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
        const en = 'abvgdeejzijklmnoprstufhccss_y_eua';
        const index = ru.indexOf(char);
        return index !== -1 ? en[index] : char;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({
        title: 'Ошибка',
        description: 'Введите название категории',
        variant: 'destructive',
      });
      return;
    }

    const category: Category = {
      id: categories.length + 1,
      name: newCategory.name,
      slug: newCategory.slug || generateSlug(newCategory.name),
      description: newCategory.description,
      productsCount: 0,
      isActive: true,
    };

    setCategories([...categories, category]);
    setIsAddDialogOpen(false);
    setNewCategory({
      name: '',
      slug: '',
      description: '',
    });

    toast({
      title: 'Категория добавлена',
      description: `Категория "${category.name}" успешно создана`,
    });
  };

  const handleEditCategory = () => {
    if (!editingCategory || !editingCategory.name) {
      toast({
        title: 'Ошибка',
        description: 'Введите название категории',
        variant: 'destructive',
      });
      return;
    }

    setCategories(categories.map(cat => 
      cat.id === editingCategory.id ? editingCategory : cat
    ));

    setIsEditDialogOpen(false);
    setEditingCategory(null);

    toast({
      title: 'Категория обновлена',
      description: `Категория "${editingCategory.name}" успешно обновлена`,
    });
  };

  const handleDeleteCategory = (id: number) => {
    const category = categories.find(c => c.id === id);
    
    if (category && category.productsCount > 0) {
      toast({
        title: 'Невозможно удалить',
        description: 'В категории есть товары. Сначала переместите или удалите их.',
        variant: 'destructive',
      });
      return;
    }

    setCategories(categories.filter(c => c.id !== id));
    toast({
      title: 'Категория удалена',
      description: 'Категория успешно удалена',
    });
  };

  const handleToggleActive = (id: number) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory({ ...category });
    setIsEditDialogOpen(true);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: categories.length,
    active: categories.filter(c => c.isActive).length,
    totalProducts: categories.reduce((sum, c) => sum + c.productsCount, 0),
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
                onClick={() => window.location.href = '/products'}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                К товарам
              </Button>
              <span className="text-neutral-dark/60">|</span>
              <h1 className="text-2xl font-poiret font-bold text-primary">Категории товаров</h1>
            </div>

            <Button
              className="bg-gradient-primary text-white hover:opacity-90"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить категорию
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-dark/70 mb-1">Всего категорий</p>
                  <p className="text-3xl font-poiret font-bold text-neutral-dark">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Icon name="FolderOpen" size={24} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-dark/70 mb-1">Активных</p>
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
                  <p className="text-sm text-neutral-dark/70 mb-1">Всего товаров</p>
                  <p className="text-3xl font-poiret font-bold text-neutral-dark">{stats.totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-primary-dark rounded-full flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-primary/20">
          <CardContent className="p-6">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-dark/40" />
              <Input
                placeholder="Поиск категорий..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredCategories.length === 0 ? (
            <Card className="md:col-span-2 border-primary/20">
              <CardContent className="p-12 text-center">
                <Icon name="FolderOpen" size={64} className="mx-auto text-neutral-dark/20 mb-4" />
                <p className="text-neutral-dark/60 text-lg">Категории не найдены</p>
                <p className="text-neutral-dark/40 text-sm mt-2">Измените параметры поиска или добавьте новую категорию</p>
              </CardContent>
            </Card>
          ) : (
            filteredCategories.map((category) => (
              <Card
                key={category.id}
                className={`border-primary/20 hover:shadow-lg transition-all ${
                  !category.isActive ? 'opacity-60' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Icon name="FolderOpen" size={32} className="text-white" />
                    </div>
                    <Badge variant={category.isActive ? 'default' : 'secondary'}>
                      {category.isActive ? 'Активна' : 'Неактивна'}
                    </Badge>
                  </div>
                  
                  <CardTitle className="font-poiret text-xl">{category.name}</CardTitle>
                  <CardDescription className="text-sm">
                    <span className="font-mono text-xs bg-neutral/50 px-2 py-1 rounded">
                      /{category.slug}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-neutral-dark/70 mb-4 min-h-[40px]">
                    {category.description || 'Описание отсутствует'}
                  </p>

                  <div className="flex items-center justify-between mb-4 p-3 bg-neutral/30 rounded-lg">
                    <span className="text-sm text-neutral-dark/70">Товаров в категории:</span>
                    <span className="text-xl font-poiret font-bold text-primary">
                      {category.productsCount}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary/20"
                      onClick={() => openEditDialog(category)}
                    >
                      <Icon name="Edit" size={16} className="mr-1" />
                      Изменить
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex-1 ${
                        category.isActive
                          ? 'border-amber-500/20 text-amber-600 hover:bg-amber-50'
                          : 'border-primary/20 text-primary hover:bg-primary-light/20'
                      }`}
                      onClick={() => handleToggleActive(category.id)}
                    >
                      <Icon name={category.isActive ? 'EyeOff' : 'Eye'} size={16} className="mr-1" />
                      {category.isActive ? 'Скрыть' : 'Показать'}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-destructive/20 text-destructive hover:bg-destructive hover:text-white"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-poiret text-2xl">Добавить категорию</DialogTitle>
            <DialogDescription>
              Создайте новую категорию товаров
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название категории *</Label>
              <Input
                id="name"
                placeholder="Например: Игрушки"
                value={newCategory.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setNewCategory({
                    ...newCategory,
                    name,
                    slug: generateSlug(name)
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL (slug)</Label>
              <Input
                id="slug"
                placeholder="toys"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
              />
              <p className="text-xs text-neutral-dark/50">
                Будет использоваться в адресе: /category/{newCategory.slug || 'slug'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Краткое описание категории..."
                rows={3}
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddCategory} className="bg-gradient-primary text-white">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-poiret text-2xl">Редактировать категорию</DialogTitle>
            <DialogDescription>
              Измените данные категории
            </DialogDescription>
          </DialogHeader>

          {editingCategory && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Название категории *</Label>
                <Input
                  id="edit-name"
                  placeholder="Например: Игрушки"
                  value={editingCategory.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setEditingCategory({
                      ...editingCategory,
                      name,
                      slug: generateSlug(name)
                    });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-slug">URL (slug)</Label>
                <Input
                  id="edit-slug"
                  placeholder="toys"
                  value={editingCategory.slug}
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                />
                <p className="text-xs text-neutral-dark/50">
                  Будет использоваться в адресе: /category/{editingCategory.slug || 'slug'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Описание</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Краткое описание категории..."
                  rows={3}
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleEditCategory} className="bg-gradient-primary text-white">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;