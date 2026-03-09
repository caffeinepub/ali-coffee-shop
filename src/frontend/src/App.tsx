import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ChevronDown,
  Clock,
  Coffee,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { MenuItem } from "./backend";
import { Category, useGetMenu, useGetShopInfo } from "./hooks/useQueries";

const queryClient = new QueryClient();

const FALLBACK_MENU: MenuItem[] = [
  {
    id: 1n,
    name: "Signature Espresso",
    description:
      "Rich double shot with velvety crema, sourced from Ethiopian highlands",
    category: Category.coffee,
    price: 3.5,
  },
  {
    id: 2n,
    name: "Cardamom Latte",
    description:
      "Silky steamed milk, espresso, and hand-ground cardamom — an ALI classic",
    category: Category.coffee,
    price: 5.0,
  },
  {
    id: 3n,
    name: "Pour-Over Single Origin",
    description:
      "Kenya AA beans, bright and fruity, brewed to order by our baristas",
    category: Category.coffee,
    price: 5.5,
  },
  {
    id: 4n,
    name: "Cold Brew Reserve",
    description:
      "18-hour slow-steeped Sumatra blend, served over hand-chipped ice",
    category: Category.coffee,
    price: 5.0,
  },
  {
    id: 5n,
    name: "Avocado Toast",
    description:
      "Sourdough with smashed avocado, cherry tomatoes, microgreens, sea salt",
    category: Category.food,
    price: 9.0,
  },
  {
    id: 6n,
    name: "Shakshuka Plate",
    description:
      "Eggs poached in spiced tomato sauce, served with warm pita bread",
    category: Category.food,
    price: 11.0,
  },
  {
    id: 7n,
    name: "Grilled Halloumi Wrap",
    description:
      "Golden halloumi, roasted peppers, arugula, and za'atar in a warm wrap",
    category: Category.food,
    price: 10.5,
  },
  {
    id: 8n,
    name: "Tiramisu",
    description:
      "House-made with espresso-soaked ladyfingers and mascarpone cream",
    category: Category.dessert,
    price: 7.0,
  },
  {
    id: 9n,
    name: "Baklava Cheesecake",
    description:
      "New York-style cheesecake topped with honey-glazed pistachio baklava",
    category: Category.dessert,
    price: 7.5,
  },
  {
    id: 10n,
    name: "Date & Walnut Tart",
    description:
      "Buttery pastry shell with Medjool date caramel and candied walnuts",
    category: Category.dessert,
    price: 6.5,
  },
];

const FALLBACK_SHOP = {
  name: "ALI Coffee Shop",
  address: "H#774-f46 Khokhar Mohalla, Hyderabad",
  phone: "0301-9382952",
  hours: "Mon–Fri: 7:00 AM – 9:00 PM | Sat–Sun: 8:00 AM – 10:00 PM",
};

const GALLERY_IMAGES = [
  {
    src: "/assets/generated/gallery-1.dim_600x600.jpg",
    alt: "Latte art and coffee moments",
  },
  {
    src: "/assets/generated/gallery-2.dim_600x600.jpg",
    alt: "Cozy shop corner",
  },
  {
    src: "/assets/generated/gallery-3.dim_600x600.jpg",
    alt: "Coffee brewing essentials",
  },
  {
    src: "/assets/generated/menu-coffee.dim_800x600.jpg",
    alt: "Our signature coffees",
  },
  {
    src: "/assets/generated/menu-food.dim_800x600.jpg",
    alt: "Fresh food offerings",
  },
  {
    src: "/assets/generated/menu-desserts.dim_800x600.jpg",
    alt: "House-made desserts",
  },
];

const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const CONTACT_INFO = [
  {
    icon: <MapPin className="w-6 h-6" />,
    label: "Address",
    ocid: "contact.address.card",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    label: "Phone",
    ocid: "contact.phone.card",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    label: "Hours",
    ocid: "contact.hours.card",
  },
] as const;

const STAT_ITEMS = [
  { stat: "50+", label: "Single Origins" },
  { stat: "12", label: "Years of Craft" },
  { stat: "∞", label: "Good Vibes" },
];

const CATEGORY_IMAGE: Record<string, string> = {
  coffee: "/assets/generated/menu-coffee.dim_800x600.jpg",
  food: "/assets/generated/menu-food.dim_800x600.jpg",
  dessert: "/assets/generated/menu-desserts.dim_800x600.jpg",
};

const MENU_TABS = ["coffee", "food", "dessert"] as const;

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-warm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          data-ocid="nav.link"
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Coffee className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground tracking-tight">
            ALI Coffee
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          data-ocid="nav.visit_button"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:opacity-90 active:scale-95 transition-all"
        >
          Visit Us
        </a>

        <button
          type="button"
          data-ocid="nav.toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-card border-b border-border px-6 pb-6"
          >
            <ul className="flex flex-col gap-4 pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1200x700.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-900/70 via-espresso-800/50 to-espresso-900/80" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Badge className="mb-6 bg-amber-DEFAULT/20 text-amber-light border-amber-DEFAULT/40 text-xs tracking-widest uppercase backdrop-blur-sm">
            Artisan Coffee & More
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
        >
          Welcome to{" "}
          <span className="italic" style={{ color: "oklch(0.85 0.12 72)" }}>
            ALI Coffee
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Where every cup tells a story. Hand-crafted coffees, wholesome food,
          and a space to gather — made with love, served with warmth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a
            href="#menu"
            data-ocid="hero.primary_button"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base tracking-wide transition-all hover:scale-105 active:scale-95"
            style={{
              background: "oklch(0.72 0.13 68)",
              color: "oklch(0.18 0.02 45)",
            }}
          >
            View Our Menu
          </a>
          <a
            href="#about"
            data-ocid="hero.secondary_button"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base tracking-wide border border-white/40 text-white hover:bg-white/10 transition-all"
          >
            Our Story
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16"
        >
          <a
            href="#menu"
            className="text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronDown className="w-6 h-6 mx-auto animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-ocid={`menu.item.${index + 1}`}
      className="bg-card rounded-2xl p-6 shadow-warm hover:shadow-warm-lg transition-all duration-300 group border border-border/50"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
        <span
          className="text-lg font-bold font-display shrink-0"
          style={{ color: "oklch(0.42 0.09 50)" }}
        >
          ${item.price.toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
}

function MenuTabContent({ tab, items }: { tab: string; items: MenuItem[] }) {
  return (
    <TabsContent value={tab}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.length === 0 ? (
            <div
              data-ocid="menu.empty_state"
              className="col-span-2 text-center py-16 text-muted-foreground"
            >
              <Coffee className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No items available in this category yet.</p>
            </div>
          ) : (
            items.map((item, i) => (
              <MenuCard key={String(item.id)} item={item} index={i} />
            ))
          )}
        </div>
        <div className="hidden lg:block">
          <motion.div
            key={tab}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="sticky top-24 rounded-3xl overflow-hidden shadow-warm-lg"
          >
            <img
              src={CATEGORY_IMAGE[tab]}
              alt={`${tab} items`}
              className="w-full h-80 object-cover"
            />
          </motion.div>
        </div>
      </div>
    </TabsContent>
  );
}

function MenuSection() {
  const { data: allMenu, isLoading } = useGetMenu();
  const menu = allMenu && allMenu.length > 0 ? allMenu : FALLBACK_MENU;

  const coffees = menu.filter((i) => i.category === Category.coffee);
  const foods = menu.filter((i) => i.category === Category.food);
  const desserts = menu.filter((i) => i.category === Category.dessert);

  const tabItems: Record<string, MenuItem[]> = {
    coffee: coffees,
    food: foods,
    dessert: desserts,
  };

  return (
    <section id="menu" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-secondary text-secondary-foreground border-border text-xs tracking-widest uppercase">
            What We Serve
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Menu
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From morning espresso to evening treats, every item is crafted with
            care and the finest ingredients.
          </p>
        </motion.div>

        <Tabs defaultValue="coffee" className="w-full">
          <TabsList
            className="mx-auto mb-10 grid w-full max-w-md grid-cols-3 rounded-2xl p-1"
            style={{ background: "oklch(0.93 0.018 75)" }}
          >
            <TabsTrigger
              value="coffee"
              data-ocid="menu.coffee.tab"
              className="rounded-xl font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              ☕ Coffee
            </TabsTrigger>
            <TabsTrigger
              value="food"
              data-ocid="menu.food.tab"
              className="rounded-xl font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              🍳 Food
            </TabsTrigger>
            <TabsTrigger
              value="dessert"
              data-ocid="menu.dessert.tab"
              className="rounded-xl font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              🍰 Desserts
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div
              data-ocid="menu.loading_state"
              className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4"
            >
              <Skeleton className="h-28 rounded-2xl" />
              <Skeleton className="h-28 rounded-2xl" />
              <Skeleton className="h-28 rounded-2xl" />
              <Skeleton className="h-28 rounded-2xl" />
            </div>
          ) : (
            MENU_TABS.map((tab) => (
              <MenuTabContent key={tab} tab={tab} items={tabItems[tab] ?? []} />
            ))
          )}
        </Tabs>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 px-6"
      style={{ background: "oklch(0.25 0.04 45)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div
            className="absolute -top-4 -left-4 w-full h-full rounded-3xl"
            style={{ background: "oklch(0.72 0.13 68 / 0.25)" }}
          />
          <img
            src="/assets/generated/about-coffee.dim_600x700.jpg"
            alt="ALI Coffee story"
            className="relative rounded-3xl w-full object-cover shadow-warm-lg"
            style={{ maxHeight: "520px" }}
          />
          <div className="absolute bottom-6 right-6 bg-card/90 backdrop-blur-sm rounded-2xl p-5 shadow-warm">
            <p className="font-display text-3xl font-bold text-foreground">
              2015
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Founded with love
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Badge
            className="mb-6 border text-xs tracking-widest uppercase"
            style={{
              background: "oklch(0.72 0.13 68 / 0.2)",
              color: "oklch(0.85 0.10 70)",
              borderColor: "oklch(0.72 0.13 68 / 0.35)",
            }}
          >
            Our Story
          </Badge>
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ color: "oklch(0.96 0.008 72)" }}
          >
            A Passion Brewed
            <br />
            <em className="italic" style={{ color: "oklch(0.85 0.12 72)" }}>
              Into Every Cup
            </em>
          </h2>
          <div
            className="space-y-4 text-base leading-relaxed"
            style={{ color: "oklch(0.80 0.02 65)" }}
          >
            <p>
              ALI Coffee was born in 2015 from a simple conviction: that great
              coffee deserves great company. Founded by Ali Hasan after years
              apprenticing at specialty roasters across Istanbul and Addis
              Ababa, our shop brings those worldly flavors home.
            </p>
            <p>
              Every bean we use is ethically sourced, single-origin, and roasted
              in small batches by our in-house roastmaster. We believe in
              transparency — from farm to cup, you'll always know where your
              coffee comes from.
            </p>
            <p>
              Beyond coffee, ALI is a community space. A place to work, think,
              share a meal, and feel at home.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {STAT_ITEMS.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="font-display text-3xl font-bold"
                  style={{ color: "oklch(0.85 0.12 72)" }}
                >
                  {s.stat}
                </p>
                <p
                  className="text-xs tracking-wide uppercase mt-1"
                  style={{ color: "oklch(0.65 0.025 60)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge className="mb-4 bg-secondary text-secondary-foreground border-border text-xs tracking-widest uppercase">
            Moments
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            The ALI Experience
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              data-ocid={`gallery.item.${i + 1}`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`overflow-hidden rounded-2xl shadow-warm group cursor-pointer ${
                i === 0 || i === 3 ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ minHeight: i === 0 || i === 3 ? "320px" : "180px" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { data: shopInfo, isLoading } = useGetShopInfo();
  const info = shopInfo ?? FALLBACK_SHOP;

  const contactData = [
    { ...CONTACT_INFO[0], value: info.address },
    { ...CONTACT_INFO[1], value: info.phone },
    { ...CONTACT_INFO[2], value: info.hours },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: "oklch(0.97 0.012 75)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-secondary text-secondary-foreground border-border text-xs tracking-widest uppercase">
            Find Us
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Come Say Hello
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            We'd love to see you. Drop by for a coffee — no reservations needed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {isLoading ? (
            <>
              <Skeleton
                className="h-48 rounded-2xl"
                data-ocid="contact.loading_state"
              />
              <Skeleton className="h-48 rounded-2xl" />
              <Skeleton className="h-48 rounded-2xl" />
            </>
          ) : (
            contactData.map((item, i) => (
              <motion.div
                key={item.label}
                data-ocid={item.ocid}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-warm text-center border border-border/50 group hover:shadow-warm-lg transition-all"
              >
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                  style={{
                    background: "oklch(0.88 0.035 72)",
                    color: "oklch(0.42 0.09 50)",
                  }}
                >
                  {item.icon}
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                  {item.label}
                </p>
                <p className="text-foreground font-medium leading-relaxed">
                  {item.value}
                </p>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-warm-lg border border-border"
        >
          <div
            className="h-72 flex items-center justify-center"
            style={{ background: "oklch(0.93 0.025 72)" }}
          >
            <div className="text-center">
              <MapPin
                className="w-10 h-10 mx-auto mb-3"
                style={{ color: "oklch(0.42 0.09 50)" }}
              />
              <p className="font-display text-xl font-semibold text-foreground mb-1">
                {info.name}
              </p>
              <p className="text-muted-foreground">{info.address}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );
  return (
    <footer
      className="py-10 px-6 border-t border-border"
      style={{ background: "oklch(0.22 0.028 48)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <Coffee className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span
            className="font-display font-bold"
            style={{ color: "oklch(0.93 0.015 72)" }}
          >
            ALI Coffee
          </span>
        </div>
        <p className="text-sm" style={{ color: "oklch(0.58 0.02 55)" }}>
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.72 0.10 68)" }}
          >
            caffeine.ai
          </a>
        </p>
        <nav className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{ color: "oklch(0.58 0.02 55)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <HeroSection />
        <MenuSection />
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
