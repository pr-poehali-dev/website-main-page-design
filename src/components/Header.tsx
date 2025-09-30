import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-primary-light/30 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-3xl font-poiret font-bold bg-gradient-to-r from-primary-dark to-primary-light bg-clip-text text-transparent">
              AllTrades
            </a>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm font-poiret font-medium text-neutral-dark hover:text-primary-dark transition-colors">
                Главная
              </a>
              
              <div className="relative group">
                <button className="text-sm font-poiret font-medium text-neutral-dark hover:text-primary-dark transition-colors flex items-center space-x-1">
                  <span>Платформа</span>
                  <Icon name="ChevronDown" size={16} />
                </button>
                
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-primary-light/50">
                  <div className="py-2">
                    <a href="#possibilities" className="block px-4 py-2 text-sm font-poiret text-neutral-dark hover:bg-primary-light/20 hover:text-primary-dark transition-colors">
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
              
              <a href="#pricing" className="text-sm font-poiret font-medium text-neutral-dark hover:text-primary-dark transition-colors">
                Тарифы
              </a>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white font-poiret"
              onClick={() => window.location.href = '/login'}
            >
              Вход
            </Button>
            <Button 
              className="bg-gradient-primary hover:opacity-90 text-white font-poiret shadow-lg"
              onClick={() => window.location.href = '/#create-account'}
            >
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
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary"
                    onClick={() => window.location.href = '/login'}
                  >
                    Вход
                  </Button>
                  <Button 
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                    onClick={() => window.location.href = '/#create-account'}
                  >
                    Создать магазин
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;