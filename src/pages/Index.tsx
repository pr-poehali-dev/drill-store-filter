import { useMemo, useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/8b966214-44ce-4179-a204-cc2b78e87bcd/files/8673271d-7378-4979-a1f7-09268f77021a.jpg';

type Product = {
  id: number;
  name: string;
  sku: string;
  type: 'Фреза' | 'Сверло';
  material: string;
  brand: string;
  diameter: number;
  price: number;
  stock: number;
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'Фреза концевая 4-зуб.', sku: 'MF-1204-TIN', type: 'Фреза', material: 'Твердосплав', brand: 'GARANT', diameter: 12, price: 2840, stock: 124 },
  { id: 2, name: 'Сверло спиральное HSS-Co', sku: 'DR-0850-CO', type: 'Сверло', material: 'HSS-Co', brand: 'RUKO', diameter: 8.5, price: 690, stock: 410 },
  { id: 3, name: 'Фреза радиусная R3', sku: 'MF-0603-R', type: 'Фреза', material: 'Твердосплав', brand: 'SECO', diameter: 6, price: 4120, stock: 38 },
  { id: 4, name: 'Сверло по металлу TiN', sku: 'DR-1000-TIN', type: 'Сверло', material: 'HSS', brand: 'BOSCH', diameter: 10, price: 540, stock: 620 },
  { id: 5, name: 'Фреза торцевая Ø20', sku: 'MF-2004-F', type: 'Фреза', material: 'Сталь P6M5', brand: 'ЗУБР', diameter: 20, price: 1980, stock: 76 },
  { id: 6, name: 'Сверло центровочное A2.5', sku: 'DR-0250-C', type: 'Сверло', material: 'HSS', brand: 'RUKO', diameter: 2.5, price: 310, stock: 980 },
  { id: 7, name: 'Фреза дисковая 3-стор.', sku: 'MF-1600-D', type: 'Фреза', material: 'Твердосплав', brand: 'SECO', diameter: 16, price: 6750, stock: 22 },
  { id: 8, name: 'Сверло удлинённое Ø6', sku: 'DR-0600-L', type: 'Сверло', material: 'HSS-Co', brand: 'GARANT', diameter: 6, price: 880, stock: 244 },
];

const CATALOG_MENU = [
  {
    label: 'Токарная обработка',
    sub: [
      { label: 'Наружное и внутреннее точение (ISO)', sub: [] },
      { label: 'Отрезка и обработка канавок', sub: [] },
      { label: 'Инструмент для ЖД колес', sub: [] },
    ],
  },
  {
    label: 'Точение резьбы',
    sub: [
      { label: 'Резьбовые пластины', sub: [] },
      { label: 'Державки наружные', sub: [] },
      { label: 'Державки внутренние', sub: [] },
      { label: 'Комплектующие', sub: [] },
    ],
  },
  {
    label: 'Для автоматов продольного точения',
    sub: [
      { label: 'Пластины', sub: [] },
      { label: 'Державки', sub: [] },
    ],
  },
  {
    label: 'Минирезцы',
    sub: [
      { label: 'Расточные', sub: [] },
      { label: 'Резьбовые', sub: [] },
      { label: 'Канавочные', sub: [] },
    ],
  },
  {
    label: 'Сверление',
    sub: [
      { label: 'Расточные сверла', sub: [] },
      { label: 'Сверла со сменными пластинами', sub: [] },
      { label: 'Сверла со сменными головками', sub: [] },
      { label: 'Сверление больших диаметров', sub: [] },
      { label: 'Твердосплавные сверла', sub: [] },
      { label: 'Сверла HSS-Co', sub: [] },
      { label: 'Центровочные HSSE', sub: [] },
    ],
  },
  {
    label: 'Станочная оснастка',
    sub: [
      { label: 'Оправки BT', sub: [] },
      { label: 'Оправки SK', sub: [] },
      { label: 'Оправки HSK', sub: [] },
      { label: 'Оправки ISO (NT)', sub: [] },
      { label: 'Цилиндрический хвостовик', sub: [] },
      { label: 'Конус Морзе', sub: [] },
      { label: 'Цанги', sub: [] },
      { label: 'Вспомогательный инструмент', sub: [] },
      { label: 'Комплектующие', sub: [] },
      { label: 'Втулки переходные токарные', sub: [] },
      { label: 'Центры вращающиеся', sub: [] },
      { label: 'Токарные кулачки', sub: [] },
    ],
  },
  {
    label: 'Фрезы с СМП',
    sub: [],
  },
  {
    label: 'Твердосплавные фрезы',
    sub: [],
  },
  {
    label: 'Расточные системы',
    sub: [],
  },
  {
    label: 'Метчики, резьбофрезы, раскатники',
    sub: [],
  },
  {
    label: 'Специнструмент',
    sub: [],
  },
  {
    label: 'Твердосплавные столбики',
    sub: [],
  },
];

const TOP_NAV = ['О компании', 'Новинки', 'Вакансии', 'Тех. информация', 'Видео', 'Контакты'];

const TYPES = ['Фреза', 'Сверло', 'Токарный инструмент', 'Фрезерный инструмент СМП', 'Резьбовой инструмент', 'Канавочный инструмент', 'Инструмент для автоматов продольного точения'];
const MATERIALS = ['Твердосплав', 'HSS', 'HSS-Co', 'Сталь P6M5'];
const BRANDS = ['GARANT', 'SECO', 'RUKO', 'BOSCH', 'ЗУБР'];

const TIERS = [
  { qty: 1, off: 0 },
  { qty: 10, off: 5 },
  { qty: 50, off: 12 },
  { qty: 100, off: 20 },
];

const ruble = (n: number) => n.toLocaleString('ru-RU') + ' ₽';

function discountFor(qty: number) {
  let off = 0;
  for (const t of TIERS) if (qty >= t.qty) off = t.off;
  return off;
}

const Index = () => {
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [diameter, setDiameter] = useState([0, 20]);
  const [workLen, setWorkLen] = useState([5, 300]);
  const [totalLen, setTotalLen] = useState([30, 500]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (search && !`${p.name} ${p.sku}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (p.diameter < diameter[0] || p.diameter > diameter[1]) return false;
      return true;
    });
  }, [search, types, brands, diameter, workLen, totalLen]);

  const addToCart = (id: number, n = 1) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + n) }));

  const cartLines = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === Number(id))!;
      return { p, qty };
    });

  const totalQty = cartLines.reduce((s, l) => s + l.qty, 0);
  const subtotal = cartLines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const off = discountFor(totalQty);
  const total = Math.round(subtotal * (1 - off / 100));

  return (
    <div className="min-h-screen grid-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 shadow-md">
        {/* Верхняя строка — лого + поиск + контакты */}
        <div className="bg-background border-b border-border">
          <div className="container flex h-16 items-center gap-4">
            <div className="flex items-center gap-2 mr-6 shrink-0">
              <div className="font-display text-2xl font-700 tracking-wide">МЕТАЛЛО<span className="text-primary">РЕЗ</span></div>
              <div className="font-mono text-[9px] text-muted-foreground leading-tight hidden md:block">PRECISION<br/>TOOLS</div>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Input
                placeholder="Например, CNMG120408"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-mono h-10"
              />
              <Button className="shrink-0 h-10 font-display uppercase tracking-wider text-white" style={{background: 'hsl(213 94% 48%)'}}>
                <Icon name="Search" size={16} /> Найти
              </Button>
            </div>
            <Button variant="outline" className="shrink-0 font-display uppercase tracking-wider hidden md:flex">
              <Icon name="ShoppingCart" size={16} />
              {totalQty > 0 ? `Корзина (${totalQty})` : 'Корзина'}
            </Button>
          </div>
        </div>
        {/* Нижняя строка — кнопка Продукция + меню */}
        <div className="bg-card border-b border-border">
          <div className="container flex items-center h-12 gap-0">
            {/* Кнопка Продукция */}
            <div className="relative" ref={catalogRef}>
              <button
                onClick={() => setCatalogOpen((v) => !v)}
                className="flex items-center gap-2 h-12 px-5 font-display text-sm uppercase tracking-wider text-white transition-colors"
                style={{background: 'hsl(213 94% 48%)'}}
              >
                <Icon name="Menu" size={18} /> Продукция
              </button>
              {/* Выпадающее меню каталога */}
              {catalogOpen && (
                <div className="absolute left-0 top-full z-50 w-72 border border-border bg-card shadow-xl max-h-[80vh] overflow-y-auto">
                  {CATALOG_MENU.map((cat) => (
                    <div key={cat.label} className="border-b border-border/40 last:border-0">
                      <button
                        className="flex w-full items-center justify-between px-4 py-2.5 text-left font-display text-sm font-600 uppercase tracking-wide hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={() => setOpenCat(openCat === cat.label ? null : cat.label)}
                      >
                        {cat.label}
                        {cat.sub.length > 0 && <Icon name={openCat === cat.label ? 'Minus' : 'Plus'} size={14} className="text-primary shrink-0" />}
                      </button>
                      {cat.sub.length > 0 && openCat === cat.label && (
                        <div className="bg-background/60">
                          {cat.sub.map((s) => (
                            <a key={s.label} href="#Каталог" className="block px-6 py-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => { setCatalogOpen(false); }}>
                              — {s.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Верхнее меню */}
            <nav className="hidden md:flex items-center ml-4 gap-0">
              {TOP_NAV.map((item, i) => (
                <span key={item} className="flex items-center">
                  {i > 0 && <span className="text-border mx-1">|</span>}
                  <a href={`#${item}`} className="px-3 font-display text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground">
                    {item}
                  </a>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container grid items-center gap-8 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-in">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-3 py-1 font-mono text-xs text-accent">
              <span className="h-1.5 w-1.5 animate-glow rounded-full bg-accent" />
              5000+ позиций в наличии
            </div>
            <h1 className="font-display text-3xl font-700 uppercase leading-[0.95] tracking-tight md:text-5xl">
              Инструмент<br />для производительной<br /><span className="whitespace-nowrap">и качественной <span className="text-primary text-glow">металлообработки</span></span>
            </h1>
            <p className="mt-5 max-w-md text-muted-foreground">
              Фрезы и сверла ведущих брендов. Умный подбор по параметрам, оптовые скидки до 20% и загрузка прайса из Excel.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="font-display uppercase tracking-wider clip-tech" asChild>
                <a href="#Каталог"><Icon name="Search" size={18} />Подобрать инструмент</a>
              </Button>
              <Button size="lg" variant="outline" className="font-display uppercase tracking-wider" asChild>
                <a href="#Импорт прайса"><Icon name="FileSpreadsheet" size={18} />Загрузить Excel</a>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 font-mono">
              {[['18 лет', 'на рынке'], ['24 ч', 'доставка'], ['до 20%', 'опт. скидка']].map(([a, b]) => (
                <div key={a} className="border-l-2 border-primary/60 pl-3">
                  <div className="font-display text-2xl font-700">{a}</div>
                  <div className="text-xs text-muted-foreground">{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-in -mt-12 flex justify-center">
            <div className="absolute -inset-4 rounded-full bg-primary/20 blur-3xl" />
            <img src={HERO_IMG} alt="Режущий инструмент" className="relative w-2/3 rounded-lg border border-border neon-border" />
          </div>
        </div>
      </section>

      {/* Каталог + боковое меню */}
      <section id="Каталог" className="container py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl font-700 uppercase tracking-wide md:text-4xl">Каталог</h2>
          <div className="font-mono text-sm text-muted-foreground">найдено: {filtered.length}</div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Боковое меню категорий */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="px-4 py-2.5 font-display text-xs uppercase tracking-wider text-muted-foreground bg-background/60 border-b border-border">
                Продукция
              </div>
              {CATALOG_MENU.map((cat) => (
                <div key={cat.label} className="border-b border-border/50 last:border-0">
                  <button
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left font-display text-sm font-600 transition-colors hover:bg-primary/10 hover:text-primary ${openCat === cat.label ? 'text-primary bg-primary/5' : ''}`}
                    onClick={() => setOpenCat(openCat === cat.label ? null : cat.label)}
                  >
                    {cat.label}
                    {cat.sub.length > 0 && (
                      <Icon name={openCat === cat.label ? 'Minus' : 'Plus'} size={14} className="text-primary shrink-0" />
                    )}
                  </button>
                  {cat.sub.length > 0 && openCat === cat.label && (
                    <div className="bg-background/40">
                      {cat.sub.map((s) => (
                        <div key={s.label} className="flex items-center gap-2 px-5 py-1.5 font-mono text-xs text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                          <span className="text-primary shrink-0">—</span> {s.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Фильтры под боковым меню */}
            <div className="mt-4 rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2 font-display text-xs uppercase tracking-wider text-muted-foreground">
                <Icon name="SlidersHorizontal" size={14} className="text-primary" /> Фильтр
              </div>
              <FilterGroup title="Производитель" items={BRANDS} selected={brands} onToggle={(v) => toggle(brands, setBrands, v)} />
              <div className="mb-2 mt-4 flex items-center justify-between font-display text-xs uppercase tracking-wider text-muted-foreground">
                <span>Диаметр, мм</span>
                <span className="font-mono text-foreground">{diameter[0]}–{diameter[1]}</span>
              </div>
              <Slider min={0} max={20} step={0.5} value={diameter} onValueChange={setDiameter} className="mt-2" />
            </div>
          </aside>

          {/* Карточки */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <div key={p.id} className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:neon-border">
                <div className="mb-3 flex items-start justify-between">
                  <span className={`rounded px-2 py-0.5 font-mono text-[11px] ${p.type === 'Фреза' ? 'bg-primary/15 text-primary' : ''}`} style={p.type !== 'Фреза' ? {background: 'hsl(213 94% 48% / 0.12)', color: 'hsl(213 94% 40%)'} : {}}>
                    {p.type}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">{p.stock} шт</span>
                </div>
                <div className="mb-1 font-display text-lg font-600 leading-tight">{p.name}</div>
                <div className="mb-3 font-mono text-xs text-muted-foreground">{p.sku}</div>
                <div className="mb-4 grid grid-cols-2 gap-1 font-mono text-xs text-muted-foreground">
                  <span>Ø {p.diameter} мм</span>
                  <span className="text-right">{p.brand}</span>
                  <span className="col-span-2">{p.material}</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="font-display text-xl font-700">{ruble(p.price)}</div>
                  {cart[p.id] ? (
                    <div className="flex items-center gap-2 rounded border border-border">
                      <button onClick={() => addToCart(p.id, -1)} className="px-2 py-1 text-muted-foreground hover:text-foreground"><Icon name="Minus" size={14} /></button>
                      <span className="font-mono text-sm w-5 text-center">{cart[p.id]}</span>
                      <button onClick={() => addToCart(p.id, 1)} className="px-2 py-1 text-primary hover:text-foreground"><Icon name="Plus" size={14} /></button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" className="font-display uppercase tracking-wider" onClick={() => addToCart(p.id, 1)}>
                      <Icon name="Plus" size={14} /> В корзину
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
                <Icon name="SearchX" size={32} className="mx-auto mb-3" />
                Ничего не найдено. Измените параметры фильтра.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Корзина с калькулятором опта */}
      <section id="Калькулятор" className="border-y border-border bg-card/40">
        <div className="container grid gap-8 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-700 uppercase tracking-wide md:text-4xl">Корзина и опт-калькулятор</h2>
            <p className="mt-3 text-muted-foreground">Чем больше партия — тем ниже цена. Скидка применяется автоматически на всю корзину.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TIERS.map((t) => (
                <div key={t.qty} className={`rounded-lg border p-4 text-center transition-colors ${off === t.off && totalQty >= t.qty ? 'border-primary bg-primary/10 neon-border' : 'border-border bg-card'}`}>
                  <div className="font-display text-2xl font-700 text-primary">−{t.off}%</div>
                  <div className="font-mono text-xs text-muted-foreground">от {t.qty} шт</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 font-display uppercase tracking-wider">
              <Icon name="Calculator" size={18} className="text-accent" /> Расчёт заказа
            </div>
            {cartLines.length === 0 ? (
              <div className="py-10 text-center font-mono text-sm text-muted-foreground">Корзина пуста — добавьте товары из каталога</div>
            ) : (
              <>
                <div className="space-y-2">
                  {cartLines.map(({ p, qty }) => (
                    <div key={p.id} className="flex items-center justify-between gap-2 border-b border-border/60 py-2 text-sm">
                      <span className="truncate">{p.name}</span>
                      <span className="shrink-0 font-mono text-muted-foreground">{qty} × {ruble(p.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-1.5 font-mono text-sm">
                  <Row label="Позиций" value={`${totalQty} шт`} />
                  <Row label="Сумма" value={ruble(subtotal)} />
                  <Row label={`Опт. скидка (−${off}%)`} value={`−${ruble(subtotal - total)}`} accent />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-display uppercase tracking-wider text-muted-foreground">Итого</span>
                  <span className="font-display text-3xl font-700 text-primary text-glow">{ruble(total)}</span>
                </div>
                <Button className="mt-5 w-full font-display uppercase tracking-wider clip-tech text-white" size="lg" style={{background: 'hsl(213 94% 48%)'}}>
                  <Icon name="Send" size={16} /> Оформить заказ
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Импорт Excel */}
      <section id="Импорт прайса" className="container py-16">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 md:p-12">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 animate-spin-slow rounded-full border border-dashed border-accent/30" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs text-accent">
                <Icon name="FileSpreadsheet" size={14} /> XLSX / XLS / CSV
              </div>
              <h2 className="font-display text-3xl font-700 uppercase tracking-wide md:text-4xl">Импорт номенклатуры из Excel</h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Загрузите свой прайс-лист — система автоматически распознает артикулы, диаметры, цены и остатки и обновит каталог.
              </p>
              <ul className="mt-5 space-y-2 font-mono text-sm text-muted-foreground">
                {['Автоматическое сопоставление колонок', 'Проверка дубликатов по артикулу', 'Обновление цен и остатков одним кликом'].map((i) => (
                  <li key={i} className="flex items-center gap-2"><Icon name="Check" size={14} className="text-accent" />{i}</li>
                ))}
              </ul>
            </div>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background/50 p-10 text-center transition-colors hover:border-accent/60 hover:accent-glow">
              <Icon name="UploadCloud" size={40} className="mb-3 text-accent" />
              <div className="font-display uppercase tracking-wider">Перетащите файл сюда</div>
              <div className="mt-1 font-mono text-xs text-muted-foreground">или нажмите для выбора</div>
              <input type="file" accept=".xlsx,.xls,.csv" className="hidden" />
              <Button className="mt-5 font-display uppercase tracking-wider" type="button">Выбрать Excel-файл</Button>
            </label>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="Контакты" className="border-t border-border">
        <div className="container grid gap-8 py-12 md:grid-cols-4">
          <div>
            <div className="font-display text-xl font-700 tracking-wide">МЕТАЛЛО<span className="text-primary">РЕЗ</span></div>
            <p className="mt-3 font-mono text-xs text-muted-foreground">Режущий инструмент для профессионалов с 2007 года.</p>
          </div>
          {[
            ['Каталог', ['Фрезы концевые', 'Фрезы торцевые', 'Сверла спиральные', 'Центровочные']],
            ['Компания', ['О нас', 'Доставка', 'Оптовикам', 'Сертификаты']],
            ['Контакты', ['+7 (495) 000-00-00', 'sales@metallorez.ru', 'Москва, ул. Промышленная 5']],
          ].map(([title, items]) => (
            <div key={title as string}>
              <div className="mb-3 font-display uppercase tracking-wider text-sm">{title as string}</div>
              <ul className="space-y-2 font-mono text-xs text-muted-foreground">
                {(items as string[]).map((i) => <li key={i} className="hover:text-foreground transition-colors">{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border py-5 text-center font-mono text-xs text-muted-foreground">
          © 2026 МЕТАЛЛОРЕЗ. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

function FilterGroup({ title, items, selected, onToggle }: { title: string; items: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="mb-5 border-t border-border/60 pt-4">
      <div className="mb-2 font-display text-sm uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="space-y-2">
        {items.map((i) => (
          <label key={i} className="flex cursor-pointer items-center gap-2.5 text-sm">
            <Checkbox checked={selected.includes(i)} onCheckedChange={() => onToggle(i)} />
            <span className={selected.includes(i) ? 'text-foreground' : 'text-muted-foreground'}>{i}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? 'text-accent' : ''}>{value}</span>
    </div>
  );
}

export default Index;