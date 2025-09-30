import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TemplatesSection = () => {
  const templates = [
    { id: 1, name: 'Модный', description: 'одежды и обуви' },
    { id: 2, name: 'Электроника', description: 'техники и гаджетов' },
    { id: 3, name: 'Косметика', description: 'красоты и ухода' },
    { id: 4, name: 'Мебель', description: 'дома и интерьера' },
    { id: 5, name: 'Универсальный', description: 'любого бизнеса' }
  ];

  return (
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
          {templates.map((template) => (
            <Card key={template.id} className="border-primary/20 overflow-hidden hover:shadow-xl transition-all hover-scale group">
              <div className="relative overflow-hidden">
                <img 
                  src="/img/fe5cfff6-dd04-475d-8aa6-d436352cd42a.jpg" 
                  alt={`Шаблон ${template.id}`} 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <Button className="bg-white text-primary hover:bg-white/90">
                    Попробовать
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="font-poiret text-xl">Шаблон "{template.name}"</CardTitle>
                <CardDescription>
                  Профессиональный дизайн для {template.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;