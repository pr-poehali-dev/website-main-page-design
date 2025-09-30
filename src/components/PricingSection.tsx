import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const PricingSection = () => {
  return (
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
  );
};

export default PricingSection;