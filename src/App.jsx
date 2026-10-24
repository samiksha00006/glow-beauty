import { useMemo, useState } from "react";
import {
  Search, ShoppingBag, Heart, Menu, X, Star, ArrowRight,
  Sparkles, Leaf, Truck, ShieldCheck, Plus, Minus, Trash2
} from "lucide-react";

const products = [
  { id: 1, name: "Dew Drop Hydrating Serum", category: "Skincare", price: 699, oldPrice: 899, rating: 4.8, tag: "BESTSELLER", color: "peach", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=85", description: "A lightweight daily boost for fresh, hydrated-looking skin." },
  { id: 2, name: "Rose Glow Face Cream", category: "Skincare", price: 549, oldPrice: 699, rating: 4.7, tag: "CUSTOMER LOVE", color: "pink", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=85", description: "A soft, comforting cream for your everyday routine." },
  { id: 3, name: "Velvet Matte Lip Tint", category: "Makeup", price: 399, oldPrice: 499, rating: 4.9, tag: "NEW", color: "rose", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=85", description: "A comfortable pop of colour with a velvety finish." },
  { id: 4, name: "Everyday Glow Sunscreen", category: "Skincare", price: 499, oldPrice: 599, rating: 4.6, tag: "DAILY ESSENTIAL", color: "cream", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=85", description: "A smooth, easy-to-layer step for your morning routine." },
  { id: 5, name: "Silky Smooth Hair Oil", category: "Haircare", price: 449, oldPrice: 549, rating: 4.7, tag: "NOURISHING", color: "sage", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=85", description: "A simple finishing touch for soft-looking, glossy hair." },
  { id: 6, name: "Cloud Soft Body Lotion", category: "Bodycare", price: 379, oldPrice: 449, rating: 4.5, tag: "SOFT SKIN", color: "lilac", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=85", description: "A daily moisturising favourite with a silky feel." },
  { id: 7, name: "Calm & Clean Face Wash", category: "Skincare", price: 329, oldPrice: 399, rating: 4.6, tag: "GENTLE CARE", color: "mint", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=85", description: "A fresh-feeling cleanse to start or end your day." },
  { id: 8, name: "Blush Crush Cheek Tint", category: "Makeup", price: 429, oldPrice: 499, rating: 4.8, tag: "GLOW PICK", color: "coral", image: "https://images.unsplash.com/photo-1522335789203-aabak1fc2a1b?auto=format&fit=crop&w=800&q=85", description: "A buildable touch of colour for a fresh everyday look." }
];

const categories = ["All Products", "Skincare", "Makeup", "Haircare", "Bodycare"];
const money = (amount) => `₹${amount.toLocaleString("en-IN")}`;

function App() {
  const [category, setCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "All Products" || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [category, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function changeQuantity(id, amount) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  }

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function subscribe(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setNotice("Thanks for joining the Glow Beauty list!");
    setEmail("");
    window.setTimeout(() => setNotice(""), 2600);
  }

  function chooseCategory(value) {
    setCategory(value);
    setMobileMenu(false);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="site-shell">
      <div className="announcement">A little self-care goes a long way <span>✦</span> Free delivery on orders over ₹999</div>
      <header className="header">
        <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
        <a className="brand" href="#home" aria-label="Glow Beauty home"><span className="brand-mark"><Sparkles size={20} /></span><span>glow<span className="brand-light">beauty</span><small>BEAUTY, MADE SIMPLE</small></span></a>
        <nav className={mobileMenu ? "nav nav-open" : "nav"}>
          <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#shop" onClick={() => setMobileMenu(false)}>Shop all</a>
          <a href="#story" onClick={() => setMobileMenu(false)}>Our story</a>
          <a href="#newsletter" onClick={() => setMobileMenu(false)}>Glow notes</a>
        </nav>
        <div className="header-actions">
          <label className="search-box"><Search size={18} /><input aria-label="Search products" placeholder="Search beauty..." value={search} onChange={(e) => { setSearch(e.target.value); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} /></label>
          <button className="icon-button bag-button" aria-label="Open shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag /><span className="bag-count">{cartCount}</span></button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> YOUR DAILY DOSE OF GLOW</div>
            <h1>Feel good.<br /><em>Look like you.</em></h1>
            <p>Beauty that fits your real life. Thoughtful essentials, feel-good formulas, and little moments just for you.</p>
            <div className="hero-buttons"><a className="button button-dark" href="#shop">Shop the collection <ArrowRight size={17} /></a><a className="text-link" href="#story">Our little story <span>↗</span></a></div>
            <div className="hero-note"><div className="avatar-stack"><span>✿</span><span>♡</span><span>✦</span></div><span>Loved by <strong>10,000+</strong> happy faces</span></div>
          </div>
          <div className="hero-art">
            <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=90" alt="Beauty products arranged in a warm, minimal setting" /></div>
            <div className="floating-note note-top"><Sparkles size={17} /><span>Little rituals,<br /><strong>big feelings.</strong></span></div>
            <div className="floating-note note-bottom"><span className="round-flower">✿</span><span>Made for your<br /><strong>everyday glow</strong></span></div>
            <div className="hero-stamp">GLOW<br />YOUR<br />OWN WAY</div>
          </div>
          <div className="hero-scribble">a little more you ✳</div>
        </section>

        <section className="benefits" aria-label="Our promises">
          <div><span className="benefit-icon"><Leaf /></span><span><strong>Feel-good essentials</strong><small>Made for everyday routines</small></span></div>
          <div><span className="benefit-icon"><Truck /></span><span><strong>Easy delivery</strong><small>Free over ₹999</small></span></div>
          <div><span className="benefit-icon"><ShieldCheck /></span><span><strong>Care you can trust</strong><small>Thoughtfully picked products</small></span></div>
          <div><span className="benefit-icon"><Heart /></span><span><strong>A little self-love</strong><small>Always included</small></span></div>
        </section>

        <section className="shop-section section-pad" id="shop">
          <div className="section-heading">
            <div><div className="eyebrow">THE GOOD STUFF</div><h2>Your new <em>favourites.</em></h2><p>Little things that make your routine feel special.</p></div>
            <a className="text-link desktop-link" href="#newsletter">Find your glow <span>↗</span></a>
          </div>
          <div className="shop-controls">
            <div className="category-tabs">{categories.map((item) => <button key={item} className={category === item ? "category-tab active" : "category-tab"} onClick={() => setCategory(item)}>{item}</button>)}</div>
            <span className="result-count">{visibleProducts.length} products</span>
          </div>
          {visibleProducts.length ? <div className="product-grid">
            {visibleProducts.map((product) => <article className="product-card" key={product.id}>
              <div className={`product-image ${product.color}`}>
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="product-tag">{product.tag}</span>
                <button className={favorites.includes(product.id) ? "favorite-button is-favorite" : "favorite-button"} aria-label={favorites.includes(product.id) ? "Remove from favourites" : "Add to favourites"} onClick={() => toggleFavorite(product.id)}><Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
                <button className="quick-add" onClick={() => addToCart(product)}><Plus size={17} /> Quick add</button>
              </div>
              <div className="product-info"><div className="product-category">{product.category}</div><h3>{product.name}</h3><p className="product-description">{product.description}</p><div className="product-bottom"><div className="price">{money(product.price)} <del>{money(product.oldPrice)}</del></div><div className="rating"><Star size={14} fill="currentColor" /> {product.rating}</div></div></div>
            </article>)}
          </div> : <div className="empty-state"><Sparkles size={28} /><h3>No products found just yet</h3><p>Try another search or choose a different category.</p><button className="button button-dark" onClick={() => { setSearch(""); setCategory("All Products"); }}>Show all products</button></div>}
        </section>

        <section className="story-section section-pad" id="story">
          <div className="story-image"><img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1100&q=85" alt="A calm skincare ritual with beauty products" /><span className="story-sticker">A moment<br />for you ♡</span></div>
          <div className="story-copy"><div className="eyebrow">A NOTE FROM US</div><h2>Beauty should feel like <em>you.</em></h2><p>Not another rule to follow. Not a hundred-step routine. Just good products, small rituals, and the freedom to show up exactly as you are.</p><p>Glow Beauty is your friendly reminder that taking care of yourself can be simple, joyful, and entirely your own.</p><a className="button button-outline" href="#shop">Find your everyday essentials <ArrowRight size={17} /></a><div className="signature">with love, <span>Glow Beauty ✿</span></div></div>
        </section>

        <section className="newsletter section-pad" id="newsletter"><div className="newsletter-flower">✿</div><div className="eyebrow">A LITTLE NOTE IN YOUR INBOX</div><h2>Good things are <em>glowing.</em></h2><p>Join our list for beauty tips, new arrivals, and little treats just for you.</p><form className="newsletter-form" onSubmit={subscribe}><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-label="Your email address" required /><button type="submit">Count me in <ArrowRight size={16} /></button></form><small>No spam, just the good stuff. Unsubscribe anytime.</small></section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Sparkles size={20} /></span><span>glow<span className="brand-light">beauty</span><small>BEAUTY, MADE SIMPLE</small></span></a><p>A little glow, a lot of you. ♡</p><div className="footer-links"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="#newsletter">Contact</a></div><small className="copyright">© 2026 Glow Beauty · Student demo project</small></footer>

      {notice && <div className="toast" role="status"><span>✓</span>{notice}</div>}

      {cartOpen && <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setCartOpen(false); }}>
        <aside className="cart-drawer" aria-label="Shopping bag">
          <div className="cart-header"><div><span className="eyebrow">YOUR LITTLE HAUL</span><h2>Shopping bag <span>({cartCount})</span></h2></div><button className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}><X /></button></div>
          {cart.length ? <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-info"><h3>{item.name}</h3><span>{money(item.price)}</span><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => changeQuantity(item.id, -1)}><Minus size={14} /></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => changeQuantity(item.id, 1)}><Plus size={14} /></button></div></div><button className="remove-item" aria-label="Remove one item" onClick={() => changeQuantity(item.id, -item.quantity)}><Trash2 size={16} /></button></div>)}</div><div className="cart-footer"><div className="shipping-message">{subtotal >= 999 ? "Lovely! Your order qualifies for free delivery." : `You're ${money(999 - subtotal)} away from free delivery.`}</div><div className="subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><button className="button button-dark checkout-button" onClick={() => { setCartOpen(false); setNotice("Demo checkout only — no payment was taken."); window.setTimeout(() => setNotice(""), 3000); }}>Continue to checkout <ArrowRight size={17} /></button><small>Demo checkout · No payment will be collected</small></div></> : <div className="empty-cart"><span className="empty-bag"><ShoppingBag size={28} /></span><h3>Your bag is taking a little nap.</h3><p>Add something lovely to get started.</p><button className="button button-dark" onClick={() => { setCartOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>Explore products</button></div>}
        </aside>
      </div>}
    </div>
  );
}

export default App;