import './style.css';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const SITE = {
  name: 'Elysian Resin Atelier',
  url: 'https://elysianresinatelier.com',
  email: 'concierge@elysianresinatelier.com',
  phone: '+1 212 555 0186',
  instagram: 'https://www.instagram.com/elysianresinatelier/'
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const products = [
  {
    slug: 'aurora-tide-serving-board',
    name: 'Aurora Tide Serving Board',
    category: 'Serveware',
    price: 420,
    image: '/assets/product-aurora-tide.svg',
    alt: 'Aurora Tide resin serving board with blue transparent resin and champagne metallic currents',
    tagline: 'Translucent ocean resin with champagne leaf',
    description:
      'A hand-poured serving board with suspended champagne leaf, translucent tide lines, and a mirror-polished food-safe finish.',
    dimensions: '46 × 21 × 3 cm',
    finish: 'Food-safe gloss resin, hand-polished edges',
    leadTime: 'Ships in 12 studio days',
    colors: ['#8edfea', '#d6b06a', '#fff7e6']
  },
  {
    slug: 'obsidian-bloom-wall-panel',
    name: 'Obsidian Bloom Wall Panel',
    category: 'Wall Art',
    price: 1280,
    image: '/assets/product-obsidian-bloom.svg',
    alt: 'Obsidian Bloom wall panel in smoked black resin with botanical metallic bloom details',
    tagline: 'Smoked black resin with botanical gold bloom',
    description:
      'A gallery-scale wall panel poured in translucent black resin with botanical veining, mineral bloom, and subtle gold leaf.',
    dimensions: '70 × 52 × 4 cm',
    finish: 'High-gloss face with satin black shadow frame',
    leadTime: 'Ships in 4 studio weeks',
    colors: ['#1a1517', '#c99c55', '#fff0d2']
  },
  {
    slug: 'champagne-current-coasters',
    name: 'Champagne Current Coasters',
    category: 'Table Objects',
    price: 240,
    image: '/assets/product-champagne-current.svg',
    alt: 'Champagne Current coaster set with translucent warm resin and gold current patterns',
    tagline: 'Four sculptural coasters with luminous gold drift',
    description:
      'A collectible set of four resin coasters with poured champagne currents, polished bevels, and soft protective feet.',
    dimensions: '10 × 10 × 1.4 cm each',
    finish: 'Crystal gloss resin with cork-backed feet',
    leadTime: 'Ships in 7 studio days',
    colors: ['#d6bf8c', '#f1c86c', '#fff8e7']
  },
  {
    slug: 'lumen-river-console',
    name: 'Lumen River Console',
    category: 'Furniture',
    price: 6200,
    image: '/assets/product-lumen-river.svg',
    alt: 'Lumen River console table with luminous resin river and dark architectural base',
    tagline: 'Architectural console with luminous resin river',
    description:
      'A made-to-order console table pairing sculptural hardwood edges with a deep translucent resin river and bronze detailing.',
    dimensions: '150 × 38 × 82 cm',
    finish: 'Hand-rubbed oil, resin polish, bronze base',
    leadTime: 'Ships in 10 studio weeks',
    colors: ['#8fd0c8', '#bd8f4a', '#fff6df']
  },
  {
    slug: 'ivory-veil-jewelry-dish',
    name: 'Ivory Veil Jewelry Dish',
    category: 'Decor',
    price: 310,
    image: '/assets/product-ivory-veil.svg',
    alt: 'Ivory Veil pearl resin jewelry dish with champagne edges',
    tagline: 'Pearl resin with a soft champagne rim',
    description:
      'A sculptural jewelry dish with pearl resin depth, champagne edging, and a soft concave silhouette for daily ritual objects.',
    dimensions: '18 × 15 × 3 cm',
    finish: 'Pearl gloss resin with hand-gilded rim',
    leadTime: 'Ships in 9 studio days',
    colors: ['#f3e8cf', '#cda965', '#fffaf0']
  },
  {
    slug: 'nocturne-marble-tray',
    name: 'Nocturne Marble Tray',
    category: 'Serveware',
    price: 540,
    image: '/assets/product-nocturne-marble.svg',
    alt: 'Nocturne Marble smoked black resin tray with stone-like veining',
    tagline: 'Smoked resin marble with polished black depth',
    description:
      'A luxury tray poured in smoked black resin, veined by hand, and finished with a deep lacquered sheen.',
    dimensions: '42 × 28 × 3 cm',
    finish: 'Gloss resin with velvet base protection',
    leadTime: 'Ships in 14 studio days',
    colors: ['#6c7280', '#c39a57', '#fff3da']
  }
];

const materialOptions = [
  {
    key: 'aurora',
    label: 'Aurora Blue',
    color: '#8edfea',
    accent: '#d6b06a',
    description: 'Cool translucent resin with champagne mineral currents.'
  },
  {
    key: 'obsidian',
    label: 'Obsidian Smoke',
    color: '#161719',
    accent: '#c99c55',
    description: 'Smoked black resin with high-contrast gilded depth.'
  },
  {
    key: 'champagne',
    label: 'Champagne Pearl',
    color: '#ead7a7',
    accent: '#fff7e6',
    description: 'Warm pearl resin with soft ivory refraction.'
  }
];

const categories = [
  {
    title: 'Serveware',
    text: 'Boards, trays, and elevated tabletop objects created for intimate dining rituals and private hosting.'
  },
  {
    title: 'Wall Art',
    text: 'Large-format resin panels with luminous depth, mineral blooms, and gallery-grade hanging systems.'
  },
  {
    title: 'Bespoke Interiors',
    text: 'Console tables, installation pieces, and architectural resin commissions for collectors and designers.'
  }
];

const craft = [
  {
    title: 'Pigment Composition',
    text: 'Every pour begins with a custom palette mixed by weight, temperature, and translucency to create depth without visual noise.'
  },
  {
    title: 'Controlled Pouring',
    text: 'Resin is layered in precise windows of viscosity, allowing champagne leaf, mineral bloom, and bubbles to suspend naturally.'
  },
  {
    title: 'Museum Polish',
    text: 'Each cured object is sanded through progressive grits, polished by hand, inspected under raking light, and sealed.'
  }
];

const processSteps = [
  {
    title: 'Private Briefing',
    text: 'We define dimensions, palette, finish, personalization, interior context, and installation requirements.'
  },
  {
    title: 'Material Study',
    text: 'The atelier prepares pigment swatches and resin samples so the final object feels intentional in your space.'
  },
  {
    title: 'Cinematic Pour',
    text: 'Your piece is poured in controlled layers with temperature, humidity, and viscosity documented throughout.'
  },
  {
    title: 'Cure & Reveal',
    text: 'After a slow cure, the mold is released, edges are refined, and the resin is inspected for depth and clarity.'
  },
  {
    title: 'Final Polish',
    text: 'The surface is hand-polished, signed, packed in archival wrapping, and prepared for insured delivery.'
  }
];

const testimonials = [
  {
    quote:
      'The Aurora board feels like a piece of ocean captured under glass. It is functional, but it reads as sculpture.',
    author: 'Mara Ellison',
    role: 'Private Collector, Tribeca'
  },
  {
    quote:
      'Elysian translated our hotel palette into three wall panels with incredible restraint. They feel quiet, expensive, and alive.',
    author: 'Theo Laurent',
    role: 'Interior Director, Maison Ardent'
  },
  {
    quote:
      'The process was precise from the first sample to installation. The resin has a depth that photography cannot fully capture.',
    author: 'Anika Shah',
    role: 'Residential Designer'
  }
];

const faqs = [
  {
    question: 'Is each resin artwork one of a kind?',
    answer:
      'Yes. Pigments, metallic inclusions, micro-bubbles, and flow lines move differently in every pour. We can control palette and composition, but each finished object remains singular.'
  },
  {
    question: 'Are the serving pieces food-safe?',
    answer:
      'Serveware pieces use a food-safe finishing system after full cure. They are intended for dry or room-temperature presentation and should be hand-washed with a soft cloth.'
  },
  {
    question: 'Do you accept custom colors and dimensions?',
    answer:
      'Yes. Bespoke commissions can be matched to interior palettes, stone samples, event styling, hospitality projects, and personal monograms.'
  },
  {
    question: 'How are large pieces shipped?',
    answer:
      'Large wall panels and furniture commissions are packed in custom crates with edge protection, insured freight, and installation guidance.'
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
          <span class="brand-mark">ER</span>
          <span class="brand-copy">
            <span class="brand-name">Elysian Resin</span>
            <span class="brand-sub">Atelier Objects</span>
          </span>
        </a>

        <nav class="nav-links" id="mobile-menu" aria-label="Primary navigation">
          <a class="nav-link" href="/#collection">Collection</a>
          <a class="nav-link" href="/#craft">Craft</a>
          <a class="nav-link" href="/#gallery">Gallery</a>
          <a class="nav-link" href="/#custom">Custom</a>
          <a class="nav-link" href="/#contact">Contact</a>
          <a class="nav-bag" href="/product/aurora-tide-serving-board" aria-label="Reserved artworks">
            <span>Reservations</span>
            <span class="bag-count" id="bag-count">0</span>
          </a>
          <a class="btn nav-cta magnetic" href="/product/aurora-tide-serving-board">Design yours</a>
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
              <p class="eyebrow reveal">Handcrafted Luxury Resin</p>
              <h1 class="display reveal" id="hero-title">Liquid light, poured by hand.</h1>
              <p class="lead reveal">
                Museum-quality resin objects created for collectors, designers, and private interiors — shaped through slow pours,
                champagne metals, suspended pigment, and hand-polished clarity.
              </p>

              <div class="btn-row reveal">
                <a class="btn magnetic" href="/#collection">Explore collection <span class="icon-arrow">→</span></a>
                <a class="btn btn--ghost magnetic" href="/#custom">Commission an artwork</a>
              </div>

              <div class="hero-metrics reveal">
                <div class="metric">
                  <strong data-count="240">0</strong>
                  <span>Private pieces</span>
                </div>
                <div class="metric">
                  <strong data-count="18">0</strong>
                  <span>Layer checks</span>
                </div>
                <div class="metric">
                  <strong data-count="96">0</strong>
                  <span>Hour cure cycle</span>
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
            <h2 class="reveal">A quiet atelier for luminous resin work.</h2>
            <p class="lead reveal">
              Elysian Resin Atelier creates collectible resin objects for interiors that value tactility, silence, and cinematic material presence.
              The studio treats resin as a luxury medium: transparent, volatile, precise, and deeply expressive.
            </p>

            <div class="stat-list reveal">
              <div><strong>12</strong><span>Controlled finishing stages before a piece leaves the studio.</span></div>
              <div><strong>4</strong><span>Palette studies prepared for most bespoke commissions.</span></div>
              <div><strong>1</strong><span>Signed artwork certificate archived for every collector.</span></div>
            </div>
          </div>

          <figure class="editorial-panel reveal image-reveal">
            <img src="/assets/gallery-3.svg" alt="Studio light over a polished handcrafted resin artwork" loading="lazy" decoding="async" />
            <figcaption class="signature-card">
              <strong>Signed by the pour.</strong>
              <span>No two currents, inclusions, or suspended bubbles resolve the same way.</span>
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
              const labels = ['Pigment', 'Gilding', 'Light Test', 'Edge Work', 'Pearl Inlay', 'Final Polish'];
              return `
                <figure class="gallery-item image-reveal reveal">
                  <img src="/assets/gallery-${index + 1}.svg" alt="${labels[index]} stage of handcrafted resin artwork" loading="lazy" decoding="async" />
                  <figcaption class="gallery-caption"><span>${labels[index]}</span><span>Atelier 0${index + 1}</span></figcaption>
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
              <p class="section-kicker">Custom Orders</p>
              <h2>Commission a piece with private material language.</h2>
              <p class="lead">
                Bespoke projects are designed around palette, scale, room tone, lighting, and ritual use. We create resin objects that feel born for the space.
              </p>
              <div class="btn-row">
                <a class="btn magnetic" href="/#contact">Begin commission <span class="icon-arrow">→</span></a>
                <a class="btn btn--ghost magnetic" href="/product/aurora-tide-serving-board">Open 3D viewer</a>
              </div>
            </div>

            <ul class="custom-list" aria-label="Custom order options">
              <li>Interior palette matching</li>
              <li>Monograms and date inscriptions</li>
              <li>Architectural sizing</li>
              <li>Collector certificate and archive record</li>
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
            <a class="btn btn--ghost magnetic reveal" href="${SITE.instagram}" target="_blank" rel="noreferrer">Follow @elysianresinatelier</a>
          </div>

          <div class="instagram-grid">
            ${Array.from({ length: 6 }, (_, index) => `
              <a class="instagram-tile reveal image-reveal" href="${SITE.instagram}" target="_blank" rel="noreferrer" aria-label="Open Elysian Resin Atelier Instagram post ${index + 1}">
                <img src="/assets/instagram-${index + 1}.svg" alt="Instagram studio image ${index + 1} from Elysian Resin Atelier" loading="lazy" decoding="async" />
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
          <p class="section-kicker">Elysian Resin Atelier</p>
          <h2>Hand-poured objects for luminous interiors.</h2>
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
        <span>© ${new Date().getFullYear()} ${SITE.name}. All resin artworks handcrafted in small studio runs.</span>
        <span>Luxury resin objects · Bespoke commissions · Collectible interiors</span>
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
      ? `${product.name} — Luxury Resin Product Viewer | ${SITE.name}`
      : `${SITE.name} — Luxury Handcrafted Resin Art`;

  const description =
    route.type === 'product'
      ? `${product.name}: ${product.description} Explore material colors, personalization, 360° rotation, and bespoke order options.`
      : 'Elysian Resin Atelier creates museum-quality handcrafted resin serveware, wall art, trays, and bespoke sculptural commissions.';

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
    localStorage.setItem('elysian-reservations', JSON.stringify(reservations));
    updateReservationCount();
    showToast(`${product.name} has been added to your private reservations.`);
  });
}

function readReservations() {
  try {
    return JSON.parse(localStorage.getItem('elysian-reservations') || '[]');
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
  camera.position.set(3.3, 2.1, 4.2);

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
  controls.minDistance = 2.25;
  controls.maxDistance = 6.2;
  controls.target.set(0, 0.1, 0);

  const productRoot = new THREE.Group();
  productRoot.rotation.y = -0.2;
  scene.add(productRoot);

  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(1.75, 1.9, 0.08, 96),
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

  new GLTFLoader().load(
    '/models/aurora-serving-board.glb',
    (gltf) => {
      if (disposed) return;

      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = resinMaterial;
          modelMeshes.push(child);
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      model.position.sub(center);
      model.scale.setScalar(2.55 / Math.max(size.x, size.z));
      productRoot.add(model);
      addInclusions(productRoot);
    },
    undefined,
    () => {
      if (disposed) return;
      const fallback = createFallbackProduct(resinMaterial);
      productRoot.add(fallback);
      fallback.traverse((child) => {
        if (child.isMesh) modelMeshes.push(child);
      });
      addInclusions(productRoot);
    }
  );

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
          x: 3.3,
          y: 2.1,
          z: 4.2,
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
  const accent = new THREE.Color(option.accent);

  return new THREE.MeshPhysicalMaterial({
    color: selected,
    roughness: key === 'obsidian' ? 0.06 : 0.035,
    metalness: 0,
    transmission: key === 'obsidian' ? 0.38 : 0.72,
    thickness: 0.75,
    transparent: true,
    opacity: key === 'obsidian' ? 0.88 : 0.78,
    ior: 1.48,
    clearcoat: 1,
    clearcoatRoughness: 0.025,
    attenuationColor: accent,
    attenuationDistance: key === 'obsidian' ? 1.4 : 2.4
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

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.3), material);
  mesh.position.set(0, 0.18, 0.16);
  mesh.rotation.x = -Math.PI / 2;

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

  const board = new THREE.Mesh(new RoundedBoxGeometry(2.55, 0.16, 1.22, 18, 0.18), material);
  board.castShadow = true;
  board.receiveShadow = true;
  group.add(board);

  const vein = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 0.08),
    new THREE.MeshBasicMaterial({
      color: 0xd6ad66,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide
    })
  );
  vein.rotation.x = -Math.PI / 2;
  vein.rotation.z = -0.18;
  vein.position.y = 0.095;
  group.add(vein);

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
