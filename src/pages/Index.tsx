import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-secondary to-primary-light">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <a href="/" className="text-2xl font-poiret font-bold text-primary">
                AllTrades
              </a>
              
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-sm font-medium text-neutral-dark hover:text-primary transition-colors">
                  Главная
                </a>
                
                <div className="relative group">
                  <button className="text-sm font-medium text-neutral-dark hover:text-primary transition-colors flex items-center space-x-1">
                    <span>Платформа</span>
                    <Icon name="ChevronDown" size={16} />
                  </button>
                  
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-primary/10">
                    <div className="py-2">
                      <a href="#possibilities" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-primary-light hover:text-primary transition-colors">
                        Возможности
                      </a>
                      <a href="#modules" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-primary-light hover:text-primary transition-colors">
                        Модули и интеграции
                      </a>
                      <a href="#templates" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-primary-light hover:text-primary transition-colors">
                        Примеры магазинов
                      </a>
                      <a href="#video" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-primary-light hover:text-primary transition-colors">
                        Видео-уроки
                      </a>
                      <a href="#guide" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-primary-light hover:text-primary transition-colors">
                        Пошаговая инструкция
                      </a>
                    </div>
                  </div>
                </div>
                
                <a href="#pricing" className="text-sm font-medium text-neutral-dark hover:text-primary transition-colors">
                  Тарифы
                </a>
              </nav>
            </div>
            
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Вход
              </Button>
              <Button className="bg-primary hover:bg-primary-dark text-white">
                Создать магазин
              </Button>
            </div>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <a href="#" className="text-lg font-medium text-neutral-dark hover:text-primary">Главная</a>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="platform">
                      <AccordionTrigger className="text-lg font-medium">Платформа</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2 pl-4">
                          <a href="#possibilities" className="text-sm text-neutral-dark hover:text-primary">Возможности</a>
                          <a href="#modules" className="text-sm text-neutral-dark hover:text-primary">Модули и интеграции</a>
                          <a href="#templates" className="text-sm text-neutral-dark hover:text-primary">Примеры магазинов</a>
                          <a href="#video" className="text-sm text-neutral-dark hover:text-primary">Видео-уроки</a>
                          <a href="#guide" className="text-sm text-neutral-dark hover:text-primary">Пошаговая инструкция</a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <a href="#pricing" className="text-lg font-medium text-neutral-dark hover:text-primary">Тарифы</a>
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button variant="outline" className="w-full border-primary text-primary">Вход</Button>
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white">Создать магазин</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-poiret font-bold text-neutral-dark leading-tight">
                Создай свой интернет-магазин за минуты
              </h1>
              <p className="text-xl text-neutral-dark/70 leading-relaxed">
                Визуальный конструктор с готовыми шаблонами и полной панелью управления. Без программирования.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg">
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Начать бесплатно
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg">
                  <Icon name="Play" size={20} className="mr-2" />
                  Смотреть демо
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-poiret font-bold text-primary">5</div>
                  <div className="text-sm text-neutral-dark/60">Шаблонов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-poiret font-bold text-primary">15 мин</div>
                  <div className="text-sm text-neutral-dark/60">До запуска</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-poiret font-bold text-primary">24/7</div>
                  <div className="text-sm text-neutral-dark/60">Поддержка</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light rounded-3xl blur-3xl opacity-20"></div>
              <Card className="relative border-primary/20 shadow-2xl overflow-hidden">
                <img 
                  src="/img/2e5df807-ce77-4202-a353-180ed106e7ac.jpg" 
                  alt="Конструктор сайтов" 
                  className="w-full h-auto rounded-lg"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="possibilities" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poiret font-bold text-neutral-dark mb-4">
              Всё для профессионального магазина
            </h2>
            <p className="text-xl text-neutral-dark/70">
              Мощные инструменты в простом интерфейсе
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary transition-all hover:shadow-lg hover-scale">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Palette" size={28} className="text-white" />
                </div>
                <CardTitle className="font-poiret text-2xl">Визуальный редактор</CardTitle>
                <CardDescription className="text-base">
                  Перетаскивайте элементы, меняйте дизайн в реальном времени без кода
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary transition-all hover:shadow-lg hover-scale">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Layout" size={28} className="text-white" />
                </div>
                <CardTitle className="font-poiret text-2xl">5 готовых шаблонов</CardTitle>
                <CardDescription className="text-base">
                  Профессиональные дизайны для любой ниши. Настройте под себя за минуты
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary transition-all hover:shadow-lg hover-scale">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Settings" size={28} className="text-white" />
                </div>
                <CardTitle className="font-poiret text-2xl">Панель управления</CardTitle>
                <CardDescription className="text-base">
                  Управляйте заказами, товарами и клиентами из единого интерфейса
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary transition-all hover:shadow-lg hover-scale">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Icon name="ShoppingCart" size={28} className="text-white" />
                </div>
                <CardTitle className="font-poiret text-2xl">E-commerce функции</CardTitle>
                <CardDescription className="text-base">
                  Корзина, оплата, доставка, промокоды и всё для продаж
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary transition-all hover:shadow-lg hover-scale">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Smartphone" size={28} className="text-white" />
                </div>
                <CardTitle className="font-poiret text-2xl">Адаптивный дизайн</CardTitle>
                <CardDescription className="text-base">
                  Ваш магазин идеально выглядит на всех устройствах
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary transition-all hover:shadow-lg hover-scale">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Zap" size={28} className="text-white" />
                </div>
                <CardTitle className="font-poiret text-2xl">Быстрая загрузка</CardTitle>
                <CardDescription className="text-base">
                  Оптимизированный код для максимальной скорости сайта
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poiret font-bold text-neutral-dark mb-4">
              Готовые шаблоны магазинов
            </h2>
            <p className="text-xl text-neutral-dark/70">
              Выберите подходящий и настройте под свой бизнес
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((template) => (
              <Card key={template} className="border-primary/20 overflow-hidden hover:shadow-xl transition-all hover-scale group">
                <div className="relative overflow-hidden">
                  <img 
                    src="/img/fe5cfff6-dd04-475d-8aa6-d436352cd42a.jpg" 
                    alt={`Шаблон ${template}`} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <Button className="bg-white text-primary hover:bg-white/90">
                      Попробовать
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-poiret text-xl">Шаблон "{template === 1 ? 'Модный' : template === 2 ? 'Электроника' : template === 3 ? 'Косметика' : template === 4 ? 'Мебель' : 'Универсальный'}"</CardTitle>
                  <CardDescription>
                    Профессиональный дизайн для {template === 1 ? 'одежды и обуви' : template === 2 ? 'техники и гаджетов' : template === 3 ? 'красоты и ухода' : template === 4 ? 'дома и интерьера' : 'любого бизнеса'}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poiret font-bold text-neutral-dark mb-4">
              Простая арифметика
            </h2>
            <p className="text-xl text-neutral-dark/70">
              Посчитайте потенциальную прибыль вашего магазина
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                      <span className="text-neutral-dark/70">Средний чек:</span>
                      <span className="font-bold text-xl text-primary font-poiret">5 000 ₽</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                      <span className="text-neutral-dark/70">Реклама:</span>
                      <span className="font-bold text-xl text-primary font-poiret">700 ₽</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                      <span className="text-neutral-dark/70">Закупка:</span>
                      <span className="font-bold text-xl text-primary font-poiret">2 500 ₽</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                      <span className="text-neutral-dark/70">Доставка:</span>
                      <span className="font-bold text-xl text-primary font-poiret">250 ₽</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                      <span className="text-neutral-dark/70">Налоги (УСН):</span>
                      <span className="font-bold text-xl text-primary font-poiret">300 ₽</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                      <span className="text-neutral-dark/70">Прибыль с заказа:</span>
                      <span className="font-bold text-xl text-primary font-poiret">1 250 ₽</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                      <span className="text-neutral-dark/70">Заказов в день:</span>
                      <span className="font-bold text-xl text-primary font-poiret">10</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                      <span className="text-neutral-dark/70">Прибыль в день:</span>
                      <span className="font-bold text-xl text-primary font-poiret">12 500 ₽</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-primary rounded-xl text-center">
                  <div className="text-white text-sm mb-2">Прибыль в месяц</div>
                  <div className="text-white text-5xl font-poiret font-bold">375 000 ₽</div>
                  <div className="text-white/80 text-sm mt-2">С одного интернет-магазина!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poiret font-bold text-neutral-dark mb-4">
              Тарифы
            </h2>
            <p className="text-xl text-neutral-dark/70">
              При оплате за год
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-primary/20 hover:border-primary transition-all hover:shadow-xl hover-scale">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={32} className="text-white" />
                </div>
                <CardTitle className="font-poiret text-3xl mb-2">Базовый</CardTitle>
                <CardDescription>Для старта</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="text-5xl font-poiret font-bold text-primary mb-2">1 020 ₽</div>
                  <div className="text-neutral-dark/60">в месяц</div>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <Icon name="Check" size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">До 1 000 товаров</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Все функции магазина</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">5 шаблонов на выбор</span>
                  </li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                  Выбрать план
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-primary text-white px-4 py-1 text-sm font-medium">
                Популярный
              </div>
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Rocket" size={32} className="text-white" />
                </div>
                <CardTitle className="font-poiret text-3xl mb-2">Бизнес</CardTitle>
                <CardDescription>Для роста</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="text-5xl font-poiret font-bold text-primary mb-2">1 620 ₽</div>
                  <div className="text-neutral-dark/60">в месяц</div>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <Icon name="Check" size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">До 10 000 товаров</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Все функции магазина</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Приоритетная поддержка</span>
                  </li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                  Выбрать план
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary transition-all hover:shadow-xl hover-scale">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Crown" size={32} className="text-white" />
                </div>
                <CardTitle className="font-poiret text-3xl mb-2">Безлимит</CardTitle>
                <CardDescription>Для масштаба</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="text-5xl font-poiret font-bold text-primary mb-2">2 370 ₽</div>
                  <div className="text-neutral-dark/60">в месяц</div>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <Icon name="Check" size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Безлимит товаров</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Все функции магазина</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="Check" size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Персональный менеджер</span>
                  </li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                  Выбрать план
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-poiret font-bold text-white mb-6">
            Готовы начать?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Создайте свой первый магазин бесплатно и получите доступ ко всем функциям на 7 дней
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Ваш email" 
              className="bg-white/90 border-0 text-lg py-6"
            />
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg whitespace-nowrap">
              Начать бесплатно
            </Button>
          </div>
          
          <p className="text-white/70 text-sm mt-4">
            Кредитная карта не требуется
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-dark text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-poiret text-2xl font-bold mb-4">AllTrades</h3>
              <p className="text-white/70 text-sm">
                Профессиональный сервис по созданию и продвижению интернет-магазинов
              </p>
            </div>
            
            <div>
              <h4 className="font-poiret text-lg font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">О компании</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Новости</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-poiret text-lg font-bold mb-4">Платформа</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#possibilities" className="text-white/70 hover:text-white transition-colors">Возможности</a></li>
                <li><a href="#templates" className="text-white/70 hover:text-white transition-colors">Шаблоны</a></li>
                <li><a href="#pricing" className="text-white/70 hover:text-white transition-colors">Тарифы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-poiret text-lg font-bold mb-4">Контакты</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-primary-light" />
                  <a href="mailto:support@alltrades.ru" className="text-white/70 hover:text-white transition-colors">
                    support@alltrades.ru
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} className="text-primary-light" />
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Telegram поддержка
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              © 2007-2024 «AllTrades». Все права защищены.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Icon name="Send" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;