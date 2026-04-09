import { useState } from "react";
import Icon from "@/components/ui/icon";
import ModelViewer from "@/components/ModelViewer";

const DEMO_GLB = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";

const MODELS = [
  {
    id: 1,
    name: "Классический крест",
    material: "Гранит чёрный",
    price: "от 45 000 ₽",
    tag: "Популярное",
    icon: "Cross",
    src: DEMO_GLB,
  },
  {
    id: 2,
    name: "Стела «Элегия»",
    material: "Мрамор белый",
    price: "от 62 000 ₽",
    tag: "Новинка",
    icon: "Columns",
    src: DEMO_GLB,
  },
  {
    id: 3,
    name: "Надгробие «Вечность»",
    material: "Гранит серый",
    price: "от 38 000 ₽",
    tag: null,
    icon: "Square",
    src: null,
  },
  {
    id: 4,
    name: "Арка «Светлая память»",
    material: "Гранит красный",
    price: "от 78 000 ₽",
    tag: "Премиум",
    icon: "Landmark",
    src: DEMO_GLB,
  },
  {
    id: 5,
    name: "Книга «Судьба»",
    material: "Мрамор чёрный",
    price: "от 55 000 ₽",
    tag: null,
    icon: "BookOpen",
    src: null,
  },
  {
    id: 6,
    name: "Обелиск «Путь»",
    material: "Габбро-диабаз",
    price: "от 90 000 ₽",
    tag: "Эксклюзив",
    icon: "Triangle",
    src: DEMO_GLB,
  },
];

const FEATURES = [
  { icon: "RotateCcw", title: "3D-вращение", desc: "Осмотрите памятник со всех сторон" },
  { icon: "Ruler", title: "Точные размеры", desc: "Масштабируемые чертежи каждой модели" },
  { icon: "Palette", title: "Выбор материала", desc: "Гранит, мрамор, габбро — любой цвет" },
  { icon: "Truck", title: "Доставка и установка", desc: "Работаем по всей России" },
];

export default function Index() {
  const [activeModel, setActiveModel] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-gold rounded-sm flex items-center justify-center">
              <span className="text-background font-bold text-sm font-body">М</span>
            </div>
            <span className="font-display text-xl tracking-wide text-foreground/90">
              Мемориал <span className="text-gradient-gold">3D</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#catalog" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
              Каталог
            </a>
            <a href="#features" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
              Возможности
            </a>
            <a href="#contact" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
              Контакты
            </a>
            <a
              href="/admin"
              className="text-sm font-body px-4 py-2 rounded-md border border-primary/30 text-primary hover:bg-primary/10 transition-all"
            >
              Админка
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(200,160,80,0.06) 0%, transparent 70%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(38,60%,68%) 1px, transparent 1px), linear-gradient(90deg, hsl(38,60%,68%) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="animate-slide-up stagger-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-body text-primary tracking-widest uppercase">Интерактивный каталог</span>
          </div>

          <h1 className="animate-slide-up stagger-2 font-display text-6xl md:text-8xl font-light text-foreground leading-none mb-6">
            Памятники
            <br />
            <span className="text-gradient-gold italic">в 3D</span>
          </h1>

          <p className="animate-slide-up stagger-3 font-body text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Выберите достойный памятник для близкого человека. Рассмотрите каждую деталь в трёхмерной модели перед заказом.
          </p>

          <div className="animate-slide-up stagger-4 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <a
              href="#catalog"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-lg gradient-gold text-background font-body font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Смотреть каталог
              <Icon name="ArrowDown" size={16} className="group-hover:translate-y-1 transition-transform" />
            </a>
            <button className="flex items-center gap-2 px-8 py-3.5 rounded-lg border border-white/10 text-foreground/70 font-body text-sm hover:border-primary/30 hover:text-foreground transition-all duration-300">
              <Icon name="Phone" size={16} />
              Консультация
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in stagger-6">
          <span className="text-xs font-body text-muted-foreground tracking-widest uppercase">Прокрутить</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="glass rounded-xl p-6 text-center group hover:border-primary/20 transition-all duration-300">
                <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Icon name={f.icon} size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-base text-foreground mb-1">{f.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl font-light text-foreground mb-4">
              Каталог <span className="text-gradient-gold italic">моделей</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-md mx-auto">
              Все модели доступны в 3D — вращайте, масштабируйте, изучайте детали
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODELS.map((model) => (
              <div
                key={model.id}
                className="card-hover glass rounded-2xl overflow-hidden group"
              >
                {/* 3D Viewer */}
                <div className="relative">
                  {model.src ? (
                    <ModelViewer src={model.src} name={model.name} height="240px" />
                  ) : (
                    <div className="relative h-[240px] gradient-stone flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 shimmer" />
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <Icon name={model.icon} fallback="Box" size={28} className="text-primary/40" />
                        </div>
                        <p className="font-body text-xs text-muted-foreground/60">Модель не загружена</p>
                      </div>
                    </div>
                  )}
                  {model.tag && (
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-[10px] font-body font-semibold tracking-wide uppercase backdrop-blur-sm">
                      {model.tag}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-display text-xl text-foreground mb-1">{model.name}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">{model.material}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-lg font-semibold text-primary">{model.price}</span>
                    <button
                      onClick={() => setActiveModel(model.id === activeModel ? null : model.id)}
                      className="flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon name={activeModel === model.id ? "ChevronUp" : "ShoppingBag"} size={14} />
                      {activeModel === model.id ? "Скрыть" : "Заказать"}
                    </button>
                  </div>
                </div>

                {/* Expanded order */}
                {activeModel === model.id && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4">
                    <button className="w-full py-2.5 rounded-lg gradient-gold text-background text-sm font-body font-semibold hover:opacity-90 transition-opacity">
                      Заказать консультацию
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass glow-gold rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 shimmer opacity-50" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
                Нужна помощь <span className="text-gradient-gold italic">с выбором?</span>
              </h2>
              <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
                Наши специалисты помогут подобрать памятник с учётом ваших пожеланий и бюджета
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3.5 rounded-lg gradient-gold text-background font-body font-semibold hover:opacity-90 transition-opacity">
                  Оставить заявку
                </button>
                <button className="px-8 py-3.5 rounded-lg border border-white/10 text-foreground font-body hover:border-primary/30 transition-colors">
                  +7 (800) 000-00-00
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg text-foreground/50">
            Мемориал <span className="text-gradient-gold">3D</span>
          </span>
          <p className="font-body text-xs text-muted-foreground">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}