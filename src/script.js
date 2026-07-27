import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const SITE = {
  name: 'Melt Magic',
  url: 'https://meltmagic.co',
  email: 'hello@meltmagic.co',
  phone: '+91 98765 43210',
  instagram: 'https://www.instagram.com/meltmagic.co/'
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

const products = [
  {
    slug: 'floral-diya-candle',
    name: 'Floral Diya Candle',
    category: 'Diya Candles',
    price: 450,
    image: '/assets/product-floral-diya.svg',
    alt: 'Floral Diya soy candle with a pressed sunflower set in a terracotta diya bowl',
    tagline: 'Sunflower-topped soy wax, poured in a clay diya',
    description:
      'A hand-poured soy candle set in a traditional terracotta diya, finished with a real pressed sunflower and a warm sandalwood scent.',
    dimensions: '9 \u00d7 9 \u00d7 4 cm',
    finish: '100% soy wax, cotton wick, dried florals',
    leadTime: 'Ships in 3\u20135 days',
    colors: ['#e8a13c', '#c96f2e', '#fff3da']
  },
  {
    slug: 'sunlit-garden-candle',
    name: 'Sunlit Garden Candle',
    category: 'Floral Candles',
    price: 550,
    image: '/assets/product-sunlit-garden.svg',
    alt: 'Sunlit Garden soy candle topped with marigold petals in a wooden bowl',
    tagline: 'Marigold and citrus soy candle in a rustic bowl',
    description:
      'A garden-inspired soy candle layered with dried marigold petals and a bright citrus-floral fragrance, hand-poured in small batches.',
    dimensions: '10 \u00d7 10 \u00d7 5 cm',
    finish: '100% soy wax, cotton wick, dried florals',
    leadTime: 'Ships in 3\u20135 days',
    colors: ['#e8b83c', '#d67d3a', '#fff6e3']
  },
  {
    slug: 'melt-affair-latte-candle',
    name: 'Melt Affair Latte Candle',
    category: 'Dessert Candles',
    price: 380,
    image: '/assets/product-melt-affair-latte.svg',
    alt: 'Melt Affair latte-inspired soy candle in a glass cup with layered cream wax',
    tagline: 'Iced-latte soy candle from the Melt Affair collection',
    description:
      'Layered soy wax poured to look like a cold latte, finished with a whipped wax "foam" top and a warm vanilla-coffee scent.',
    dimensions: '8 \u00d7 8 \u00d7 9 cm',
    finish: '100% soy wax, cotton wick, glass vessel',
    leadTime: 'Ships in 3\u20135 days',
    colors: ['#c99361', '#8a5a34', '#fff3e2']
  },
  {
    slug: 'berry-bloom-candle',
    name: 'Berry Bloom Candle',
    category: 'Dessert Candles',
    price: 420,
    image: '/assets/product-berry-bloom.svg',
    alt: 'Berry Bloom soy candle with dried berries and a strawberry fragrance',
    tagline: 'Strawberry and wild berry scented soy candle',
    description:
      'A sweet, fruity soy candle finished with dried berries on top \u2014 part of the Melt Affair dessert-inspired collection.',
    dimensions: '8 \u00d7 8 \u00d7 6 cm',
    finish: '100% soy wax, cotton wick, dried botanicals',
    leadTime: 'Ships in 3\u20135 days',
    colors: ['#d9536b', '#a83250', '#ffe9ec']
  },
  {
    slug: 'matcha-garden-candle',
    name: 'Matcha Garden Candle',
    category: 'Dessert Candles',
    price: 400,
    image: '/assets/product-matcha-garden.svg',
    alt: 'Matcha green soy candle with a soft green ombre finish',
    tagline: 'Matcha-green soy candle, earthy and calming',
    description:
      'A soft green soy candle blended to smell like fresh matcha, with a gentle earthy warmth \u2014 perfect for a cozy corner.',
    dimensions: '8 \u00d7 8 \u00d7 6 cm',
    finish: '100% soy wax, cotton wick',
    leadTime: 'Ships in 3\u20135 days',
    colors: ['#8fae5c', '#5a7a38', '#f4f7e6']
  },
  {
    slug: 'wrapped-bouquet-candle-set',
    name: 'Wrapped Bouquet Candle Set',
    category: 'Gift Sets',
    price: 1200,
    image: '/assets/product-wrapped-bouquet.svg',
    alt: 'Set of flower-shaped soy candles wrapped like a bouquet for gifting',
    tagline: 'A bouquet of flower candles, wrapped and ready to gift',
    description:
      'Five flower-shaped soy candles in mixed shades, wrapped kraft-paper bouquet style \u2014 a ready-to-gift set for any occasion.',
    dimensions: 'Bouquet of 5, 6 cm each',
    finish: '100% soy wax, cotton wicks, gift wrap',
    leadTime: 'Ships in 5\u20137 days',
    colors: ['#e8863c', '#c94f4f', '#fff3da']
  }
];

const materialOptions = [
  {
    key: 'aurora',
    label: 'Golden Amber',
    color: '#e0a34a',
    accent: '#d6b06a',
    description: 'Warm amber soy wax with a soft honey glow.'
  },
  {
    key: 'obsidian',
    label: 'Charcoal Ash',
    color: '#3a342e',
    accent: '#c99c55',
    description: 'Deep charcoal soy wax with warm gold accents.'
  },
  {
    key: 'champagne',
    label: 'Ivory Cream',
    color: '#ead7a7',
    accent: '#fff7e6',
    description: 'Soft ivory soy wax with a smooth matte finish.'
  }
];

const categories = [
  {
    title: 'Diya & Festival Candles',
    text: 'Soy candles set in terracotta diyas and bowls, finished with real dried flowers \u2014 made for Diwali and festive gifting.'
  },
  {
    title: 'Floral & Dessert Candles',
    text: 'The Melt Affair collection \u2014 latte cups, berry blooms, and matcha greens, poured to look good enough to eat.'
  },
  {
    title: 'Gift Sets & Bulk Orders',
    text: 'Wrapped bouquets, custom favors, and bulk batches for weddings, events, and corporate gifting.'
  }
];

const craft = [
  {
    title: 'Wax Blending',
    text: 'Every batch starts with 100% soy wax, hand-blended with skin-safe fragrance oils at the right temperature for a clean, even burn.'
  },
  {
    title: 'Hand Pouring',
    text: 'Wax is poured slowly into diyas, glass cups, and molds, with dried flowers and petals placed by hand while it sets.'
  },
  {
    title: 'Cure & Finish',
    text: 'Each candle cures fully before the wick is trimmed, the vessel is cleaned, and it is wrapped ready for gifting.'
  }
];

const processSteps = [
  {
    title: 'Tell Us Your Vision',
    text: 'Share the scent, colors, occasion, and quantity \u2014 festival gifting, wedding favors, or a bulk order for your event.'
  },
  {
    title: 'Sample & Approve',
    text: 'We share a sample scent and finish so you know exactly what you are getting before the full batch is poured.'
  },
  {
    title: 'Small-Batch Pour',
    text: 'Your order is hand-poured in small batches, with dried florals and finishes added while the wax is still soft.'
  },
  {
    title: 'Cure & Cool',
    text: 'Every candle cures fully at room temperature so the scent throw and burn quality are exactly right.'
  },
  {
    title: 'Wrapped & Shipped',
    text: 'Candles are wrapped, boxed securely, and shipped out \u2014 usually within 3\u20135 days for standard orders.'
  }
];

const testimonials = [
  {
    quote:
      'The Floral Diya candles were the highlight of our Diwali gifting this year. Every guest asked where we got them.',
    author: 'Priya Mehta',
    role: 'Customer, Ahmedabad'
  },
  {
    quote:
      'Ordered the Wrapped Bouquet set for a friend\u2019s birthday and it looked better in person than in the photos. Smells incredible too.',
    author: 'Rohan Shah',
    role: 'Customer, Mumbai'
  },
  {
    quote:
      'We placed a bulk order for our wedding favors and Melt Magic delivered on time with every candle perfectly finished.',
    author: 'Ananya Desai',
    role: 'Bulk Order Customer'
  }
];

const faqs = [
  {
    question: 'What are your candles made of?',
    answer:
      'Every candle is made with 100% soy wax and cotton wicks, scented with skin-safe fragrance oils. No paraffin, no lead wicks \u2014 just clean-burning, eco-friendly wax.'
  },
  {
    question: 'Do you take bulk or custom orders?',
    answer:
      'Yes. DM us on Instagram with your occasion, quantity, and preferred scents \u2014 we regularly do bulk orders for weddings, festivals, and corporate gifting.'
  },
  {
    question: 'How long does a candle burn for?',
    answer:
      'Burn time depends on size, but most of our candles give 15\u201325 hours of burn time. Trim the wick to about 5mm before each burn for the cleanest results.'
  },
  {
    question: 'How do I place an order?',
    answer:
      'Right now, ordering is handled through Instagram DM \u2014 tap the Instagram button anywhere on this site to message us directly and place your order.'
  }
];

const app = document.querySelector('#app');
let cleanupFns = [];
let lenis;

function formatPrice(value) {
  return currency.format(value);
}

function productBySlug(slug) {
  return products.find((product) => product.slug === slug) || products[0];
}

function listen(target, event, handler, options) {
  target.addEventListener(event, handler, options);
  cleanupFns.push(() => target.removeEventListener(event, handler, options));
}

function navTemplate() {
  return `
    <a href="#main" class="skip-link">Skip to content</a>
    <header class="nav-wrap" id="site-nav">
      <div class="nav-inner">
        <a href="/" class="brand magnetic" aria-label="${SITE.name} home">
          <span class="brand-mark">MM</span>
          <span class="brand-copy">
            <span class="brand-name">Melt Magic</span>
            <span class="brand-sub">Soy Candles</span>
          </span>
        </a>

        <nav class="nav-links" id="mobile-menu" aria-label="Primary navigation">
          <a class="nav-link" href="/#collection">Collection</a>
          <a class="nav-link" href="/#craft">Craft</a>
          <a class="nav-link" href="/#gallery">Gallery</a>
          <a class="nav-link" href="/#custom">Custom</a>
          <a class="nav-link" href="/#contact">Contact</a>
          <a class="nav-bag" href="/product/floral-diya-candle" aria-label="Reserved candles">
            <span>Reservations</span>
            <span class="bag-count" id="bag-count">0</span>
          </a>
          <a class="btn nav-cta magnetic" href="/product/floral-diya-candle">Shop candles</a>
        </nav>

        <button class="nav-toggle magnetic" id="nav-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `;
}

function productCard(product) {
  return `
    <article class="product-card tilt-card reveal" style="--card-accent:${product.colors[1]}">
      <a class="product-link" href="/product/${product.slug}" aria-label="View ${product.name}">
        <figure class="product-media image-reveal">
          <img src="${product.image}" alt="${product.alt}" loading="lazy" decoding="async" width="1600" height="1200" />
        </figure>
        <div class="product-body">
          <div class="product-meta">
            <span>${product.category}</span>
            <span>${formatPrice(product.price)}</span>
          </div>
          <h3>${product.name}</h3>
          <p>${product.tagline}</p>
          <div class="product-footer">
            <span>View piece</span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
      </a>
    </article>
  `;
}

function homeTemplate() {
  return `
    ${navTemplate()}

    <main id="main">
      <section class="hero" id="hero" aria-labelledby="hero-title">
        <div class="hero-scrub" id="hero-scrub">
          <div class="hero-scrub-sticky">
            <div class="hero-canvas-wrap" aria-hidden="true">
              <canvas id="hero-frames"></canvas>
            </div>
            <div class="hero-shade" aria-hidden="true"></div>

            <div class="hero-copy">
              <p class="eyebrow reveal">Handcrafted Soy Candles</p>
              <h1 class="display reveal" id="hero-title">Melted slow, poured by hand.</h1>
              <p class="lead reveal">
                Small-batch soy candles made for cozy interiors and thoughtful gifting — hand-poured with real dried florals,
                clean fragrance oils, and an eco-friendly finish.
              </p>

              <div class="btn-row reveal">
                <a class="btn magnetic" href="/#collection">Explore collection <span class="icon-arrow">→</span></a>
                <a class="btn btn--ghost magnetic" href="/#custom">Commission an artwork</a>
              </div>

              <div class="hero-metrics reveal">
                <div class="metric">
                  <strong data-count="500">0</strong>
                  <span>Candles poured</span>
                </div>
                <div class="metric">
                  <strong data-count="12">0</strong>
                  <span>Signature scents</span>
                </div>
                <div class="metric">
                  <strong data-count="24">0</strong>
                  <span>Hour cure time</span>
                </div>
              </div>
            </div>

            <div class="scroll-cue" aria-hidden="true"><span></span> Scroll to pour</div>
          </div>
        </div>
      </section>

      <section class="section" id="collection">
        <div class="section-container">
          <div class="section-heading">
            <div>
              <p class="section-kicker reveal">Featured Collection</p>
              <h2 class="reveal">Objects with depth, glow, and restraint.</h2>
            </div>
            <p class="lead reveal">
              Each edition is hand-poured in small batches, then finished as an heirloom object rather than a decorative trend.
            </p>
          </div>

          <div class="collection-grid">
            ${products.map(productCard).join('')}
          </div>
        </div>
      </section>

      <section class="section" id="about">
        <div class="section-container editorial-grid">
          <div class="editorial-copy">
            <p class="section-kicker reveal">About The Brand</p>
            <h2 class="reveal">A cozy little studio for handcrafted candles.</h2>
            <p class="lead reveal">
              Melt Magic makes small-batch soy candles for people who love slow, cozy moments at home.
              Every candle is hand-poured, finished with real dried florals, and made with eco-friendly, sustainable scents.
            </p>

            <div class="stat-list reveal">
              <div><strong>12</strong><span>Signature scents blended in-studio.</span></div>
              <div><strong>60+</strong><span>Candle designs poured and shared so far.</span></div>
              <div><strong>1</strong><span>Small batch at a time — never mass produced.</span></div>
            </div>
          </div>

          <figure class="editorial-panel reveal image-reveal">
            <img src="/assets/gallery-3.svg" alt="Studio light over a freshly poured handcrafted soy candle" loading="lazy" decoding="async" />
            <figcaption class="signature-card">
              <strong>Poured with care.</strong>
              <span>Every candle is finished by hand, so no two are ever quite the same.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section class="section" id="craft">
        <div class="section-container">
          <div class="section-heading">
            <div>
              <p class="section-kicker reveal">Our Craftsmanship</p>
              <h2 class="reveal">Precision disguised as fluidity.</h2>
            </div>
            <p class="lead reveal">
              The luxury is in what cannot be rushed: viscosity, temperature, timing, cure, sanding, and polish.
            </p>
          </div>

          <div class="craft-grid">
            ${craft
              .map(
                (item, index) => `
                  <article class="craft-card reveal">
                    <span>0${index + 1}</span>
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="section" id="categories">
        <div class="section-container">
          <div class="section-heading">
            <div>
              <p class="section-kicker reveal">Product Categories</p>
              <h2 class="reveal">For tables, walls, rituals, and rooms.</h2>
            </div>
          </div>

          <div class="category-grid">
            ${categories
              .map(
                (category, index) => `
                  <article class="category-card tilt-card reveal">
                    <span class="category-index">0${index + 1}</span>
                    <div>
                      <h3>${category.title}</h3>
                      <p>${category.text}</p>
                    </div>
                    <a class="btn btn--ghost magnetic" href="/#collection">View ${category.title}</a>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="section" id="gallery">
        <div class="section-container">
          <div class="section-heading">
            <div>
              <p class="section-kicker reveal">Gallery</p>
              <h2 class="reveal">Studio fragments from pour to polish.</h2>
            </div>
          </div>

          <div class="gallery-grid">
            ${Array.from({ length: 6 }, (_, index) => {
              const labels = ['Wax Melt', 'Fragrance Mix', 'Hand Pour', 'Floral Set', 'Cure & Cool', 'Final Wrap'];
              return `
                <figure class="gallery-item image-reveal reveal">
                  <img src="/assets/gallery-${index + 1}.svg" alt="${labels[index]} stage of handcrafted soy candle making" loading="lazy" decoding="async" />
                  <figcaption class="gallery-caption"><span>${labels[index]}</span><span>Studio 0${index + 1}</span></figcaption>
                </figure>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <section class="section" id="custom">
        <div class="section-container">
          <div class="custom-panel reveal">
            <div>
              <p class="section-kicker">Custom &amp; Bulk Orders</p>
              <h2>Get a batch made just for your event.</h2>
              <p class="lead">
                Weddings, festivals, corporate gifting, or your own celebration — we design scent, color, and vessel around your occasion.
              </p>
              <div class="btn-row">
                <a class="btn magnetic" href="/#contact">Start your order <span class="icon-arrow">→</span></a>
                <a class="btn btn--ghost magnetic" href="/product/floral-diya-candle">View a candle</a>
              </div>
            </div>

            <ul class="custom-list" aria-label="Custom order options">
              <li>Custom scent blending</li>
              <li>Personalized labels and tags</li>
              <li>Bulk quantity discounts</li>
              <li>Same-week festival delivery</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section" id="process">
        <div class="section-container">
          <div class="section-heading">
            <div>
              <p class="section-kicker reveal">Process Timeline</p>
              <h2 class="reveal">From private brief to final polish.</h2>
            </div>
          </div>

          <ol class="timeline">
            ${processSteps
              .map(
                (step, index) => `
                  <li class="timeline-step reveal">
                    <span class="timeline-number">0${index + 1}</span>
                    <div class="timeline-content">
                      <h3>${step.title}</h3>
                      <p>${step.text}</p>
                    </div>
                  </li>
                `
              )
              .join('')}
          </ol>
        </div>
      </section>

      <section class="section" id="testimonials">
        <div class="section-container">
          <div class="section-heading">
            <div>
              <p class="section-kicker reveal">Testimonials</p>
              <h2 class="reveal">Collected by private clients and designers.</h2>
            </div>
          </div>

          <div class="testimonial-grid">
            ${testimonials
              .map(
                (testimonial) => `
                  <article class="testimonial-card reveal">
                    <div>
                      <div class="stars" aria-label="Five star review">★★★★★</div>
                      <p>"${testimonial.quote}"</p>
                    </div>
                    <div class="testimonial-author">
                      <strong>${testimonial.author}</strong>
                      <span>${testimonial.role}</span>
                    </div>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="section" id="faq">
        <div class="section-container">
          <div class="section-heading">
            <div>
              <p class="section-kicker reveal">FAQ</p>
              <h2 class="reveal">Material notes before commissioning.</h2>
            </div>
          </div>

          <div class="faq-list">
            ${faqs
              .map(
                (item, index) => `
                  <article class="faq-item reveal">
                    <button class="faq-button" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
                      <span>${item.question}</span>
                      <span class="faq-icon" aria-hidden="true">+</span>
                    </button>
                    <div class="faq-panel">
                      <p>${item.answer}</p>
                    </div>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="section" id="instagram">
        <div class="section-container">
          <div class="section-heading">
            <div>
              <p class="section-kicker reveal">Instagram Feed</p>
              <h2 class="reveal">Fresh pours from the atelier.</h2>
            </div>
            <a class="btn btn--ghost magnetic reveal" href="${SITE.instagram}" target="_blank" rel="noreferrer">Follow @meltmagic.co</a>
          </div>

          <div class="instagram-grid">
            ${Array.from({ length: 6 }, (_, index) => `
              <a class="instagram-tile reveal image-reveal" href="${SITE.instagram}" target="_blank" rel="noreferrer" aria-label="Open Melt Magic Instagram post ${index + 1}">
                <img src="/assets/instagram-${index + 1}.svg" alt="Instagram studio image ${index + 1} from Melt Magic" loading="lazy" decoding="async" />
                <span>Studio 0${index + 1}</span>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="section" id="contact">
        <div class="section-container contact-grid">
          <div class="contact-card reveal">
            <p class="section-kicker">Contact</p>
            <h2>Begin with a private note.</h2>
            <p class="lead">
              Share your room, palette, intended use, and timeline. The atelier responds with a concise direction, pricing path, and material proposal.
            </p>
            <address>
              ${SITE.email}<br />
              ${SITE.phone}<br />
              Consultations by appointment
            </address>
          </div>

          <form class="contact-card contact-form reveal" id="contact-form">
            <div class="form-row">
              <label for="name">Name</label>
              <input id="name" name="name" autocomplete="name" required />
            </div>
            <div class="form-row">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" autocomplete="email" required />
            </div>
            <div class="form-row">
              <label for="project">Project Type</label>
              <select id="project" name="project" required>
                <option value="Serving object">Serving object</option>
                <option value="Wall art">Wall art</option>
                <option value="Furniture commission">Furniture commission</option>
                <option value="Interior installation">Interior installation</option>
              </select>
            </div>
            <div class="form-row">
              <label for="message">Commission Details</label>
              <textarea id="message" name="message" required>Palette direction, approximate dimensions, desired completion date, and interior context.</textarea>
            </div>
            <button class="btn magnetic" type="submit">Draft inquiry <span class="icon-arrow">→</span></button>
          </form>
        </div>
      </section>
    </main>

    ${footerTemplate()}
  `;
}

function productPageTemplate(product) {
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return `
    ${navTemplate()}

    <main id="main" class="product-page">
      <section class="section">
        <div class="section-container product-shell">
          <div class="viewer-card reveal">
            <div class="viewer-stage">
              <canvas id="product-viewer" aria-label="Interactive 3D viewer for ${product.name}"></canvas>
              <div class="viewer-actions" aria-label="3D viewer controls">
                <button type="button" data-viewer-action="zoom-in" aria-label="Zoom in">+</button>
                <button type="button" data-viewer-action="zoom-out" aria-label="Zoom out">−</button>
                <button type="button" data-viewer-action="reset" aria-label="Reset view">↺</button>
              </div>
            </div>
          </div>

          <div class="product-info">
            <article class="product-detail-card reveal">
              <p class="section-kicker">${product.category}</p>
              <h1 class="display">${product.name}</h1>
              <p class="lead">${product.description}</p>
              <p class="product-price">${formatPrice(product.price)}</p>

              <div class="option-group">
                <span class="option-label">Material selector</span>
                <div class="chip-row" role="group" aria-label="Material selector">
                  ${materialOptions
                    .map(
                      (option, index) => `
                        <button class="material-chip ${index === 0 ? 'is-active' : ''}" type="button" data-material="${option.key}" aria-pressed="${index === 0}">
                          <span class="chip-color" style="--chip:${option.color}"></span>
                          ${option.label}
                        </button>
                      `
                    )
                    .join('')}
                </div>
              </div>

              <div class="option-group">
                <span class="option-label">Color selector</span>
                <div class="color-row" role="group" aria-label="Color tint selector">
                  ${product.colors
                    .map(
                      (color, index) => `
                        <button class="color-dot ${index === 0 ? 'is-active' : ''}" type="button" data-color="${color}" style="--swatch:${color}" aria-label="Select tint ${index + 1}" aria-pressed="${index === 0}"></button>
                      `
                    )
                    .join('')}
                </div>
              </div>

              <div class="option-group">
                <label class="option-label" for="personalization-input">Personalization preview</label>
                <div class="form-row">
                  <input id="personalization-input" maxlength="24" value="A.L. — 24 MAY" aria-describedby="personalization-note" />
                </div>
                <p id="personalization-note" class="text-muted">The inscription appears as a refined translucent overlay in the 3D viewer.</p>
              </div>

              <dl class="product-specs">
                <div><dt>Dimensions</dt><dd>${product.dimensions}</dd></div>
                <div><dt>Finish</dt><dd>${product.finish}</dd></div>
                <div><dt>Lead time</dt><dd>${product.leadTime}</dd></div>
              </dl>

              <div class="btn-row">
                <button class="btn magnetic" id="reserve-product" type="button">Reserve this piece <span class="icon-arrow">→</span></button>
                <a class="btn btn--ghost magnetic" href="/#contact">Request customization</a>
              </div>
            </article>

            <article class="product-detail-card reveal">
              <p class="section-kicker">Reviews</p>
              <div class="review-list">
                <div class="review-card">
                  <div class="stars">★★★★★</div>
                  <p>"The polish is extraordinary. The piece changes with morning and evening light."</p>
                  <strong>Celeste R.</strong>
                </div>
                <div class="review-card">
                  <div class="stars">★★★★★</div>
                  <p>"The 3D preview helped us choose the exact material direction before commissioning."</p>
                  <strong>Julian M.</strong>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="section-container related-strip">
          <div class="section-heading">
            <div>
              <p class="section-kicker reveal">Related Products</p>
              <h2 class="reveal">Continue the collection.</h2>
            </div>
          </div>

          <div class="collection-grid">
            ${related.map(productCard).join('')}
          </div>
        </div>
      </section>
    </main>

    ${footerTemplate()}
  `;
}

function footerTemplate() {
  return `
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <p class="section-kicker">Melt Magic</p>
          <h2>Hand-poured candles for cozy interiors.</h2>
        </div>
        <nav class="footer-links" aria-label="Footer navigation">
          <a href="/#collection">Collection</a>
          <a href="/#custom">Custom Orders</a>
          <a href="/#faq">FAQ</a>
          <a href="mailto:${SITE.email}">${SITE.email}</a>
          <a href="${SITE.instagram}" target="_blank" rel="noreferrer">Instagram</a>
        </nav>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${SITE.name}. All candles handcrafted in small studio batches.</span>
        <span>Handcrafted soy candles · Custom orders · Festive gifting</span>
      </div>
    </footer>
  `;
}

function getRoute() {
  const productMatch = window.location.pathname.match(/^\/product\/([^/]+)/);
  if (productMatch) {
    return {
      type: 'product',
      product: productBySlug(productMatch[1])
    };
  }

  return { type: 'home' };
}

function clearPage() {
  cleanupFns.forEach((fn) => {
    try {
      fn();
    } catch (error) {
      console.warn(error);
    }
  });
  cleanupFns = [];

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

function setMeta(route) {
  const product = route.product;
  const title =
    route.type === 'product'
      ? `${product.name} — Candle Details | ${SITE.name}`
      : `${SITE.name} — Handcrafted Soy Candles`;

  const description =
    route.type === 'product'
      ? `${product.name}: ${product.description} Explore material colors, personalization, 360° rotation, and bespoke order options.`
      : 'Melt Magic creates handcrafted soy candles — diya candles, floral candles, dessert-inspired candles, and gift sets, made in small batches in Ahmedabad.';

  document.title = title;
  setMetaTag('description', description);
  setMetaTag('og:title', title, 'property');
  setMetaTag('og:description', description, 'property');
  setMetaTag('og:url', `${SITE.url}${window.location.pathname}`, 'property');
  setMetaTag('twitter:title', title);
  setMetaTag('twitter:description', description);

  const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = `${SITE.url}${window.location.pathname}`;
  document.head.appendChild(canonical);

  const schema = document.querySelector('#route-schema');
  if (schema) {
    schema.textContent = JSON.stringify(
      route.type === 'product'
        ? {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: `${SITE.url}${product.image}`,
            description: product.description,
            brand: {
              '@type': 'Brand',
              name: SITE.name
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: product.price,
              availability: 'https://schema.org/InStock',
              url: `${SITE.url}/product/${product.slug}`
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              reviewCount: '18'
            }
          }
        : {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.url,
            logo: `${SITE.url}/favicon.svg`,
            email: SITE.email,
            sameAs: [SITE.instagram]
          }
    );
  }
}

function setMetaTag(name, content, attr = 'name') {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function render() {
  clearPage();

  const route = getRoute();
  setMeta(route);

  app.innerHTML = route.type === 'product' ? productPageTemplate(route.product) : homeTemplate();

  requestAnimationFrame(() => {
    initNav();
    initCommonAnimations();
    initAccordions();
    initContactForm();
    updateReservationCount();

    if (route.type === 'product') {
      initProductViewer(route.product);
      initReservation(route.product);
    } else {
      initHeroFrames();
      initCounters();
    }

    if (window.location.hash) {
      scrollToHash(window.location.hash);
    } else {
      scrollToTop();
    }

    ScrollTrigger.refresh();
  });
}

function initLenis() {
  if (prefersReducedMotion) return;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo({ top: 0, behavior: 'auto' });
}

function scrollToHash(hash) {
  const id = hash.replace('#', '');
  const target = document.getElementById(id);
  if (!target) return;

  setTimeout(() => {
    if (lenis) lenis.scrollTo(target, { offset: -92 });
    else target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, 70);
}

function initRouter() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || link.target || link.hasAttribute('download')) return;

    if (href.startsWith('#')) {
      event.preventDefault();
      history.replaceState({}, '', href);
      scrollToHash(href);
      return;
    }

    const url = new URL(link.href);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();

    if (url.pathname === window.location.pathname && url.hash) {
      history.replaceState({}, '', `${url.pathname}${url.hash}`);
      scrollToHash(url.hash);
      return;
    }

    history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
    render();
  });

  window.addEventListener('popstate', render);
}

function initNav() {
  const nav = document.querySelector('#site-nav');
  const toggle = document.querySelector('#nav-toggle');

  if (toggle && nav) {
    listen(toggle, 'click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    document.querySelectorAll('.nav-link, .nav-bag, .nav-cta').forEach((link) => {
      listen(link, 'click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const update = () => {
    nav?.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  update();
  listen(window, 'scroll', update, { passive: true });
}

function initCommonAnimations() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal, .image-reveal img').forEach((item) => {
      item.classList.add('is-visible');
    });
    initMagneticButtons();
    initTiltCards();
    return;
  }

  gsap.fromTo(
    'main',
    { autoAlpha: 0, y: 22 },
    { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
  );

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  document.querySelectorAll('.image-reveal img').forEach((image) => revealObserver.observe(image));
  cleanupFns.push(() => revealObserver.disconnect());

  initMagneticButtons();
  initTiltCards();
}

function initMagneticButtons() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.magnetic').forEach((element) => {
    const move = (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.22;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.22;
      gsap.to(element, { x, y, duration: 0.42, ease: 'power3.out' });
    };

    const leave = () => gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' });

    listen(element, 'pointermove', move);
    listen(element, 'pointerleave', leave);
  });
}

function initTiltCards() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.tilt-card').forEach((card) => {
    const move = (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1100px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-4px)`;
    };

    const leave = () => {
      card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)';
    };

    listen(card, 'pointermove', move);
    listen(card, 'pointerleave', leave);
  });
}

function initCursor() {
  const cursor = document.querySelector('#lux-cursor');
  if (!cursor || prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

  gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 1 });

  window.addEventListener('pointermove', (event) => {
    gsap.to(cursor, {
      x: event.clientX,
      y: event.clientY,
      duration: 0.18,
      ease: 'power2.out'
    });
  });

  document.addEventListener('pointerover', (event) => {
    if (event.target.closest('a, button, input, textarea, select, .tilt-card')) {
      cursor.classList.add('is-hovering');
    }
  });

  document.addEventListener('pointerout', (event) => {
    if (event.target.closest('a, button, input, textarea, select, .tilt-card')) {
      cursor.classList.remove('is-hovering');
    }
  });
}

const HERO_FRAME_COLS = 10;
const HERO_FRAME_ROWS = 6;
const HERO_FRAME_COUNT = HERO_FRAME_COLS * HERO_FRAME_ROWS;

function initHeroFrames() {
  const canvas = document.querySelector('#hero-frames');
  const scrubEl = document.querySelector('#hero-scrub');
  if (!canvas || !scrubEl) return;

  const ctx = canvas.getContext('2d');
  const image = new Image();
  image.src = '/images/resin-frames.webp';

  let ready = false;
  let frameWidth = 0;
  let frameHeight = 0;
  let currentFrame = -1;

  function drawFrame(index) {
    if (!ready) return;
    const col = index % HERO_FRAME_COLS;
    const row = Math.floor(index / HERO_FRAME_COLS);
    const sx = col * frameWidth;
    const sy = row * frameHeight;
    const cw = canvas.width;
    const ch = canvas.height;
    const frameAspect = frameWidth / frameHeight;
    const canvasAspect = cw / ch;
    let drawW;
    let drawH;
    if (canvasAspect > frameAspect) {
      drawW = cw;
      drawH = cw / frameAspect;
    } else {
      drawH = ch;
      drawW = ch * frameAspect;
    }
    const dx = (cw - drawW) / 2;
    const dy = (ch - drawH) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(image, sx, sy, frameWidth, frameHeight, dx, dy, drawW, drawH);
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    if (currentFrame >= 0) drawFrame(currentFrame);
  }

  function frameForScroll() {
    if (prefersReducedMotion) return 0;
    const rect = scrubEl.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    return Math.min(HERO_FRAME_COUNT - 1, Math.floor(progress * HERO_FRAME_COUNT));
  }

  function updateFromScroll() {
    const nextFrame = frameForScroll();
    if (nextFrame !== currentFrame) {
      currentFrame = nextFrame;
      drawFrame(currentFrame);
    }
  }

  image.onload = () => {
    ready = true;
    frameWidth = image.naturalWidth / HERO_FRAME_COLS;
    frameHeight = image.naturalHeight / HERO_FRAME_ROWS;
    resizeCanvas();
    currentFrame = frameForScroll();
    drawFrame(currentFrame);
  };

  if (!prefersReducedMotion) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateFromScroll();
        ticking = false;
      });
    };
    listen(window, 'scroll', onScroll, { passive: true });
  }

  listen(window, 'resize', resizeCanvas);
}

function initCounters() {
  document.querySelectorAll('[data-count]').forEach((element) => {
    const end = Number(element.dataset.count || 0);
    const state = { value: 0 };

    if (prefersReducedMotion) {
      element.textContent = String(end);
      return;
    }

    gsap.to(state, {
      value: end,
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 92%'
      },
      onUpdate: () => {
        element.textContent = Math.round(state.value).toLocaleString('en-US');
      }
    });
  });
}

function initAccordions() {
  document.querySelectorAll('.faq-item').forEach((item, index) => {
    const button = item.querySelector('.faq-button');
    const panel = item.querySelector('.faq-panel');

    const setState = (expanded) => {
      button.setAttribute('aria-expanded', String(expanded));
      panel.style.maxHeight = expanded ? `${panel.scrollHeight}px` : '0px';
    };

    setState(index === 0);

    listen(button, 'click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      setState(!expanded);
    });
  });
}

function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  listen(form, 'submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const subject = encodeURIComponent(`Commission inquiry from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}
Email: ${data.email}
Project type: ${data.project}

${data.message}`
    );

    showToast(
      `Your inquiry is ready. <a href="mailto:${SITE.email}?subject=${subject}&body=${body}">Open email draft</a>`
    );
  });
}

function initReservation(product) {
  const button = document.querySelector('#reserve-product');
  if (!button) return;

  listen(button, 'click', () => {
    const reservations = readReservations();
    reservations.push({
      slug: product.slug,
      name: product.name,
      price: product.price,
      reservedAt: new Date().toISOString()
    });
    localStorage.setItem('meltmagic-reservations', JSON.stringify(reservations));
    updateReservationCount();
    showToast(`${product.name} has been added to your private reservations.`);
  });
}

function readReservations() {
  try {
    return JSON.parse(localStorage.getItem('meltmagic-reservations') || '[]');
  } catch {
    return [];
  }
}

function updateReservationCount() {
  const count = readReservations().length;
  document.querySelectorAll('#bag-count').forEach((element) => {
    element.textContent = String(count);
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.innerHTML = message;
  toast.classList.add('is-visible');

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 5200);
}

function createResinMaterial(color = 0x8edfea, opacity = 0.78) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.035,
    metalness: 0,
    transmission: 0.72,
    thickness: 1.2,
    transparent: true,
    opacity,
    ior: 1.48,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    attenuationColor: new THREE.Color(color),
    attenuationDistance: 2.4
  });
}

function initProductViewer(product) {
  const canvas = document.querySelector('#product-viewer');
  const stage = document.querySelector('.viewer-stage');
  if (!canvas || !stage) return;

  let disposed = false;
  let modelMeshes = [];
  let activeMaterial = 'aurora';
  let activeColor = product.colors[0];
  let resinMaterial = makeViewerMaterial(activeMaterial, activeColor);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080706, 0.04);

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
  camera.position.set(2.1, 1.5, 2.7);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x070606, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = false;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = !prefersReducedMotion;
  controls.autoRotateSpeed = 0.6;
  controls.minDistance = 1.6;
  controls.maxDistance = 4.4;
  controls.target.set(0, 0.45, 0);

  const productRoot = new THREE.Group();
  productRoot.rotation.y = -0.2;
  scene.add(productRoot);

  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(1.15, 1.25, 0.08, 96),
    new THREE.MeshPhysicalMaterial({
      color: 0x0a0908,
      roughness: 0.22,
      metalness: 0.16,
      clearcoat: 0.55
    })
  );
  plinth.position.y = -0.14;
  plinth.receiveShadow = true;
  scene.add(plinth);

  const ambientViewer = new THREE.AmbientLight(0xfff1dc, 0.6);
  scene.add(ambientViewer);

  const key = new THREE.DirectionalLight(0xffeed7, 1.8);
  key.position.set(-2.4, 3.8, 3.5);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x90e2eb, 1.0);
  rim.position.set(3.6, 2.1, -2.5);
  scene.add(rim);

  const gold = new THREE.PointLight(0xd6ad66, 3, 6);
  gold.position.set(1.4, 1.35, 1.9);
  scene.add(gold);

  const label = createPersonalizationLabel();
  productRoot.add(label.mesh);

  const fallback = createFallbackProduct(resinMaterial);
  productRoot.add(fallback);
  fallback.traverse((child) => {
    if (child.isMesh && child.userData.swappable) modelMeshes.push(child);
  });

  const resize = () => {
    const rect = stage.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  resize();

  document.querySelectorAll('[data-material]').forEach((button) => {
    listen(button, 'click', () => {
      activeMaterial = button.dataset.material;
      document.querySelectorAll('[data-material]').forEach((item) => {
        item.classList.toggle('is-active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      applyViewerMaterial();
    });
  });

  document.querySelectorAll('[data-color]').forEach((button) => {
    listen(button, 'click', () => {
      activeColor = button.dataset.color;
      document.querySelectorAll('[data-color]').forEach((item) => {
        item.classList.toggle('is-active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      applyViewerMaterial();
    });
  });

  const input = document.querySelector('#personalization-input');
  if (input) {
    label.update(input.value);
    listen(input, 'input', () => label.update(input.value));
  }

  document.querySelectorAll('[data-viewer-action]').forEach((button) => {
    listen(button, 'click', () => {
      const action = button.dataset.viewerAction;

      if (action === 'reset') {
        gsap.to(camera.position, {
          x: 2.1,
          y: 1.5,
          z: 2.7,
          duration: 0.8,
          ease: 'power3.out',
          onUpdate: () => controls.update()
        });
        gsap.to(productRoot.rotation, { y: -0.2, duration: 0.8, ease: 'power3.out' });
      }

      if (action === 'zoom-in') {
        camera.position.setLength(Math.max(controls.minDistance, camera.position.length() * 0.82));
      }

      if (action === 'zoom-out') {
        camera.position.setLength(Math.min(controls.maxDistance, camera.position.length() * 1.18));
      }
    });
  });

  function applyViewerMaterial() {
    const next = makeViewerMaterial(activeMaterial, activeColor);
    modelMeshes.forEach((mesh) => {
      mesh.material = next;
    });
    resinMaterial.dispose();
    resinMaterial = next;
  }

  renderer.setAnimationLoop(() => {
    controls.update();
    label.mesh.lookAt(camera.position.x, label.mesh.position.y + 0.35, camera.position.z);
    renderer.render(scene, camera);
  });

  cleanupFns.push(() => {
    disposed = true;
    observer.disconnect();
    controls.dispose();
    renderer.setAnimationLoop(null);
    disposeObject(scene);
    renderer.dispose();
  });
}

function makeViewerMaterial(key, color) {
  const option = materialOptions.find((item) => item.key === key) || materialOptions[0];
  const selected = new THREE.Color(color || option.color);

  return new THREE.MeshPhysicalMaterial({
    color: selected,
    roughness: key === 'obsidian' ? 0.55 : 0.42,
    metalness: 0,
    transmission: 0,
    transparent: false,
    ior: 1.3,
    clearcoat: key === 'obsidian' ? 0.25 : 0.12,
    clearcoatRoughness: 0.4,
    sheen: 0.4,
    sheenColor: new THREE.Color(option.accent),
    sheenRoughness: 0.7
  });
}

function createPersonalizationLabel() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    opacity: 0.92
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.18), material);
  mesh.position.set(0, 0.42, 1.02);

  function update(text) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const value = String(text || '').trim();
    if (!value) {
      material.opacity = 0;
      texture.needsUpdate = true;
      return;
    }

    material.opacity = 0.92;

    ctx.fillStyle = 'rgba(255, 248, 234, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(214, 173, 102, 0.48)';
    ctx.lineWidth = 4;
    roundRect(ctx, 34, 40, canvas.width - 68, canvas.height - 80, 38);
    ctx.stroke();

    ctx.font = '600 78px Cormorant Garamond, Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 248, 234, 0.92)';
    ctx.fillText(value.toUpperCase(), canvas.width / 2, canvas.height / 2 + 4);

    texture.needsUpdate = true;
  }

  return { mesh, update };
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function addInclusions(root) {
  const group = new THREE.Group();

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xd6ad66,
    roughness: 0.28,
    metalness: 0.85
  });

  const pearlMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xfff7e6,
    roughness: 0.12,
    metalness: 0,
    transmission: 0.3,
    transparent: true,
    opacity: 0.7
  });

  for (let i = 0; i < 22; i += 1) {
    const isGold = i % 3 !== 0;
    const geometry = isGold
      ? new THREE.IcosahedronGeometry(0.012 + seeded(i) * 0.02, 0)
      : new THREE.SphereGeometry(0.01 + seeded(i) * 0.018, 12, 8);

    const inclusion = new THREE.Mesh(geometry, isGold ? goldMaterial : pearlMaterial);
    inclusion.position.set((seeded(i + 1) - 0.5) * 2.1, 0.08 + seeded(i + 5) * 0.09, (seeded(i + 2) - 0.5) * 0.88);
    inclusion.rotation.set(seeded(i + 3) * Math.PI, seeded(i + 4) * Math.PI, seeded(i + 6) * Math.PI);
    group.add(inclusion);
  }

  root.add(group);
}

function createFallbackProduct(material) {
  const group = new THREE.Group();

  const jar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.92, 0.98, 1.05, 64, 1, true),
    new THREE.MeshPhysicalMaterial({
      color: 0xd8cdb8,
      roughness: 0.08,
      metalness: 0,
      transmission: 0.92,
      thickness: 0.4,
      transparent: true,
      opacity: 0.32,
      ior: 1.45,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide
    })
  );
  jar.position.y = 0.52;
  jar.castShadow = false;
  jar.receiveShadow = true;
  group.add(jar);

  const jarBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.98, 0.98, 0.05, 64),
    new THREE.MeshPhysicalMaterial({
      color: 0xd8cdb8,
      roughness: 0.1,
      transmission: 0.85,
      transparent: true,
      opacity: 0.4,
      ior: 1.45
    })
  );
  jarBase.position.y = 0.02;
  group.add(jarBase);

  const wax = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.88, 0.86, 64), material);
  wax.userData.swappable = true;
  wax.position.y = 0.46;
  wax.castShadow = true;
  wax.receiveShadow = true;
  group.add(wax);

  const waxTop = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.86, 0.03, 64), material);
  waxTop.userData.swappable = true;
  waxTop.position.y = 0.9;
  waxTop.castShadow = true;
  group.add(waxTop);

  const wick = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.018, 0.16, 12),
    new THREE.MeshStandardMaterial({ color: 0x2a2018, roughness: 0.9 })
  );
  wick.position.y = 1.0;
  wick.castShadow = true;
  group.add(wick);

  const flame = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffb85c })
  );
  flame.scale.set(1, 1.6, 1);
  flame.position.y = 1.1;
  group.add(flame);

  const flameLight = new THREE.PointLight(0xffb35a, 1.4, 2.2);
  flameLight.position.y = 1.1;
  group.add(flameLight);

  return group;
}

function disposeMaterial(material) {
  Object.values(material).forEach((value) => {
    if (value?.isTexture) value.dispose();
  });
  material.dispose();
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose();

    if (Array.isArray(child.material)) {
      child.material.forEach(disposeMaterial);
    } else if (child.material) {
      disposeMaterial(child.material);
    }
  });
}

function seeded(index) {
  const value = Math.sin(index * 999.131) * 10000;
  return value - Math.floor(value);
}

initLenis();
initCursor();
initRouter();
render();

