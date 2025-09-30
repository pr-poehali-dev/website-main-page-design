import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;