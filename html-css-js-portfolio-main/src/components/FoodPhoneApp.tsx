import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  Search,
  Star,
  Flame,
  Bike,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  Minus,
  Plus,
} from "lucide-react";
import {
  foodCategories,
  foodLocations,
  foodRestaurants,
  foodTrivia,
  type FoodDish,
  type FoodRestaurant,
} from "../data/foodApp";
import "./FoodPhoneApp.css";

type Screen = "home" | "restaurant" | "dish" | "checkout" | "placed";
type PayMethod = "card" | "apple" | "cash";

const slide = {
  initial: { opacity: 0, x: 18 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -14 },
};

function parsePrice(price: string) {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

function formatMoney(n: number) {
  return `$${n.toFixed(2)}`;
}

export function FoodPhoneApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [locationIdx, setLocationIdx] = useState(0);
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [restaurant, setRestaurant] = useState<FoodRestaurant | null>(null);
  const [dish, setDish] = useState<FoodDish | null>(null);
  const [triviaIdx, setTriviaIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [pay, setPay] = useState<PayMethod>("card");
  const [orderId, setOrderId] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return foodRestaurants.filter((r) => {
      const byCat =
        category === "all" ||
        category === "trivia" ||
        (category === "express" ? r.eta === "Express" : r.cuisine === category);
      const byQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.dishes.some((d) => d.name.toLowerCase().includes(q));
      return byCat && byQuery;
    });
  }, [category, query]);

  const totals = useMemo(() => {
    if (!dish || !restaurant) return null;
    const subtotal = parsePrice(dish.price) * qty;
    const delivery = parsePrice(restaurant.fee);
    const tax = subtotal * 0.0875;
    const total = subtotal + delivery + tax;
    return { subtotal, delivery, tax, total };
  }, [dish, restaurant, qty]);

  const openRestaurant = (r: FoodRestaurant) => {
    setRestaurant(r);
    setDish(null);
    setQty(1);
    setScreen("restaurant");
  };

  const openDish = (d: FoodDish) => {
    setDish(d);
    setQty(1);
    setScreen("dish");
  };

  const openCheckout = () => {
    setQty(1);
    setPay("card");
    setScreen("checkout");
  };

  const placeOrder = () => {
    setOrderId(`#${Math.floor(1000 + Math.random() * 9000)}`);
    setScreen("placed");
  };

  const goHome = () => {
    setScreen("home");
    setRestaurant(null);
    setDish(null);
    setQty(1);
    setOrderId("");
  };

  const goBack = () => {
    if (screen === "placed") {
      goHome();
      return;
    }
    if (screen === "checkout") {
      setScreen("dish");
      return;
    }
    if (screen === "dish") {
      setScreen("restaurant");
      setDish(null);
      return;
    }
    goHome();
  };

  return (
    <div className="food-phone" onPointerDown={(e) => e.stopPropagation()}>
      <div className="fp-status">
        <span>9:41</span>
        <span className="fp-notch" aria-hidden />
        <span className="fp-signal" aria-hidden>
          ●●●
        </span>
      </div>

      <div className="fp-body">
        <AnimatePresence mode="wait">
          {screen === "home" && (
            <motion.div key="home" className="fp-screen" {...slide} transition={{ duration: 0.22 }}>
              <button
                type="button"
                className="fp-deliver"
                onClick={() => setLocationIdx((i) => (i + 1) % foodLocations.length)}
                aria-label="Change delivery location"
              >
                <MapPin size={11} strokeWidth={2.2} />
                Delivering to → <strong>{foodLocations[locationIdx]}</strong>
              </button>

              <div className="fp-title-row">
                <h3 className="fp-discover">Discover</h3>
                <button
                  type="button"
                  className="fp-bike"
                  onClick={() => setCategory("express")}
                  aria-label="Show express delivery"
                >
                  <Bike size={14} />
                </button>
              </div>

              <button
                type="button"
                className={`fp-search${searchOpen ? " is-open" : ""}`}
                onClick={() => setSearchOpen(true)}
              >
                <Search size={13} strokeWidth={2.2} />
                {searchOpen ? (
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => {
                      if (!query) setSearchOpen(false);
                    }}
                    placeholder="Search restaurants & dishes"
                    aria-label="Search restaurants and dishes"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span>Search restaurants & dishes</span>
                )}
              </button>

              <div className="fp-chips" role="tablist" aria-label="Food categories">
                {foodCategories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={category === c.id}
                    className={category === c.id ? "on" : undefined}
                    onClick={() => {
                      setCategory(c.id);
                      if (c.id === "trivia") {
                        setTriviaIdx((i) => (i + 1) % foodTrivia.length);
                      }
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {category === "trivia" ? (
                <button
                  type="button"
                  className="fp-trivia"
                  onClick={() => setTriviaIdx((i) => (i + 1) % foodTrivia.length)}
                >
                  <span>Did you know?</span>
                  <p>{foodTrivia[triviaIdx]}</p>
                  <em>Tap for another →</em>
                </button>
              ) : null}

              <div className="fp-list">
                {filtered.length === 0 ? (
                  <p className="fp-empty">No matches. Try another filter.</p>
                ) : (
                  filtered.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className="fp-card"
                      onClick={() => openRestaurant(r)}
                    >
                      <img src={r.image} alt="" />
                      <div className="fp-card-meta">
                        <strong>{r.name}</strong>
                        <small>{r.type}</small>
                        <span>
                          <Star size={9} fill="currentColor" /> {r.rating} · {r.time}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {screen === "restaurant" && restaurant && (
            <motion.div
              key={`rest-${restaurant.id}`}
              className="fp-screen"
              {...slide}
              transition={{ duration: 0.22 }}
            >
              <div className="fp-topbar">
                <button type="button" className="fp-back" onClick={goBack} aria-label="Back">
                  <ArrowLeft size={15} />
                </button>
                <div>
                  <strong>{restaurant.name}</strong>
                  <small>
                    <Clock3 size={10} /> {restaurant.time} · {restaurant.fee} delivery
                  </small>
                </div>
              </div>

              <button
                type="button"
                className="fp-hero"
                onClick={() => openDish(restaurant.dishes[0])}
                aria-label={`Featured: ${restaurant.dishes[0].name}`}
              >
                <img src={restaurant.image} alt="" />
                <div>
                  <em>Featured</em>
                  <strong>{restaurant.dishes[0].name}</strong>
                  <span>{restaurant.dishes[0].price}</span>
                </div>
              </button>

              <p className="fp-section">Menu</p>
              <div className="fp-menu">
                {restaurant.dishes.map((d) => (
                  <button key={d.id} type="button" className="fp-dish" onClick={() => openDish(d)}>
                    <img src={d.image} alt="" />
                    <div>
                      <strong>
                        {d.name}
                        {d.spicy ? <Flame size={11} className="fp-flame" /> : null}
                      </strong>
                      <small>{d.desc}</small>
                      <span>{d.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {screen === "dish" && restaurant && dish && (
            <motion.div
              key={`dish-${dish.id}`}
              className="fp-screen"
              {...slide}
              transition={{ duration: 0.22 }}
            >
              <div className="fp-topbar">
                <button type="button" className="fp-back" onClick={goBack} aria-label="Back">
                  <ArrowLeft size={15} />
                </button>
                <div>
                  <strong>Item details</strong>
                  <small>{restaurant.name}</small>
                </div>
              </div>

              <button type="button" className="fp-dish-hero" aria-label={dish.name}>
                <img src={dish.image} alt="" />
              </button>

              <div className="fp-dish-info">
                <h4>
                  {dish.name}
                  {dish.spicy ? <Flame size={13} className="fp-flame" /> : null}
                </h4>
                <p>{dish.desc}</p>
                <div className="fp-dish-tags">
                  {dish.tags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="fp-tag"
                      onClick={() => {
                        setCategory(t.toLowerCase().includes("express") ? "express" : category);
                      }}
                    >
                      {t}
                    </button>
                  ))}
                  <button type="button" className="fp-tag muted">
                    {dish.calories}
                  </button>
                </div>
                <div className="fp-dish-foot">
                  <strong>{dish.price}</strong>
                  <button type="button" className="fp-buy" onClick={openCheckout}>
                    <ShoppingBag size={13} strokeWidth={2.4} /> Buy
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {screen === "checkout" && restaurant && dish && totals && (
            <motion.div
              key={`checkout-${dish.id}`}
              className="fp-screen"
              {...slide}
              transition={{ duration: 0.22 }}
            >
              <div className="fp-topbar">
                <button type="button" className="fp-back" onClick={goBack} aria-label="Back">
                  <ArrowLeft size={15} />
                </button>
                <div>
                  <strong>Checkout</strong>
                  <small>{restaurant.name}</small>
                </div>
              </div>

              <div className="fp-checkout-item">
                <img src={dish.image} alt="" />
                <div>
                  <strong>{dish.name}</strong>
                  <small>{dish.price} each</small>
                </div>
                <div className="fp-qty" role="group" aria-label="Quantity">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <Minus size={12} />
                  </button>
                  <span>{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(9, q + 1))}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="fp-row"
                onClick={() => setLocationIdx((i) => (i + 1) % foodLocations.length)}
              >
                <MapPin size={13} />
                <div>
                  <strong>Deliver to</strong>
                  <small>{foodLocations[locationIdx]}</small>
                </div>
                <em>Change</em>
              </button>

              <div className="fp-pay" role="radiogroup" aria-label="Payment method">
                {(
                  [
                    { id: "card", label: "Card ···· 4242" },
                    { id: "apple", label: "Apple Pay" },
                    { id: "cash", label: "Cash" },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    role="radio"
                    aria-checked={pay === m.id}
                    className={pay === m.id ? "on" : undefined}
                    onClick={() => setPay(m.id)}
                  >
                    <CreditCard size={12} />
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="fp-bill">
                <div>
                  <span>Subtotal</span>
                  <span>{formatMoney(totals.subtotal)}</span>
                </div>
                <div>
                  <span>Delivery</span>
                  <span>{formatMoney(totals.delivery)}</span>
                </div>
                <div>
                  <span>Tax</span>
                  <span>{formatMoney(totals.tax)}</span>
                </div>
                <div className="fp-bill-total">
                  <span>Total</span>
                  <strong>{formatMoney(totals.total)}</strong>
                </div>
              </div>

              <button type="button" className="fp-place" onClick={placeOrder}>
                Place order · {formatMoney(totals.total)}
              </button>
            </motion.div>
          )}

          {screen === "placed" && restaurant && dish && (
            <motion.div
              key={`placed-${orderId}`}
              className="fp-screen fp-placed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <div className="fp-success">
                <motion.span
                  className="fp-success-ring"
                  aria-hidden
                  initial={{ scale: 0.4, opacity: 0.7 }}
                  animate={{ scale: 1.85, opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="fp-success-ring fp-success-ring-delay"
                  aria-hidden
                  initial={{ scale: 0.45, opacity: 0.55 }}
                  animate={{ scale: 2.15, opacity: 0 }}
                  transition={{ duration: 1.15, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                />

                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.span
                    key={i}
                    className={`fp-spark fp-spark-${i}`}
                    aria-hidden
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.4, 1, 0.2],
                      x: Math.cos((i / 6) * Math.PI * 2) * 34,
                      y: Math.sin((i / 6) * Math.PI * 2) * 28,
                    }}
                    transition={{ duration: 0.75, delay: 0.18 + i * 0.04, ease: "easeOut" }}
                  />
                ))}

                <motion.div
                  className="fp-placed-icon"
                  aria-hidden
                  initial={{ scale: 0.2, opacity: 0, rotate: -18 }}
                  animate={{ scale: [0.2, 1.18, 1], opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 16, delay: 0.05 }}
                >
                  <CheckCircle2 size={36} strokeWidth={1.8} />
                </motion.div>
              </div>

              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                Order placed
              </motion.h4>
              <motion.p
                className="fp-placed-ok"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.3 }}
              >
                Successfully confirmed
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.3 }}
              >
                {dish.name} × {qty} from {restaurant.name}
              </motion.p>
              <motion.div
                className="fp-placed-meta"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <button type="button" className="fp-tag" onClick={() => undefined}>
                  {orderId}
                </button>
                <button type="button" className="fp-tag muted" onClick={() => undefined}>
                  <Clock3 size={10} /> {restaurant.time}
                </button>
                <button
                  type="button"
                  className="fp-tag"
                  onClick={() => setLocationIdx((i) => (i + 1) % foodLocations.length)}
                >
                  <MapPin size={10} /> {foodLocations[locationIdx]}
                </button>
              </motion.div>
              <motion.p
                className="fp-placed-note"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.58, duration: 0.35 }}
              >
                We’re preparing your order. You’ll get updates soon.
              </motion.p>
              <motion.button
                type="button"
                className="fp-place"
                onClick={goHome}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.66, type: "spring", stiffness: 320, damping: 20 }}
                whileTap={{ scale: 0.97 }}
              >
                Back to Discover
              </motion.button>
              <motion.button
                type="button"
                className="fp-linkish"
                onClick={() => setScreen("checkout")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.78, duration: 0.3 }}
              >
                View order summary
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
