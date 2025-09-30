import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poiret font-bold bg-gradient-to-r from-primary-dark via-accent-blue to-primary-light bg-clip-text text-transparent leading-tight">
              Создай свой интернет-магазин за минуты
            </h1>
            <p className="text-xl text-neutral-dark/70 leading-relaxed">
              Визуальный конструктор с готовыми шаблонами и полной панелью управления. Без программирования.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white px-8 py-6 text-lg font-poiret shadow-xl">
                <Icon name="Sparkles" size={20} className="mr-2" />
                Начать бесплатно
              </Button>
              <Button size="lg" variant="outline" className="border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white px-8 py-6 text-lg font-poiret">
                <Icon name="Play" size={20} className="mr-2" />
                Смотреть демо
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-poiret font-bold text-primary-dark">5</div>
                <div className="text-sm text-neutral-dark/60">Шаблонов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-poiret font-bold text-accent-blue">15 мин</div>
                <div className="text-sm text-neutral-dark/60">До запуска</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-poiret font-bold text-primary-light">24/7</div>
                <div className="text-sm text-neutral-dark/60">Поддержка</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20"></div>
            <Card className="relative border-primary-light/50 shadow-2xl overflow-hidden">
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
  );
};

export default HeroSection;