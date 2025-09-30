import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;