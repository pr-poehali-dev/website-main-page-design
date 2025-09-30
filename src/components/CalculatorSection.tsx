import { Card, CardContent } from '@/components/ui/card';

const CalculatorSection = () => {
  return (
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
  );
};

export default CalculatorSection;