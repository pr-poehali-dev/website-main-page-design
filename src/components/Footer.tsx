import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
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
  );
};

export default Footer;