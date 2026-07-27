import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const assetsDir = path.join(publicDir, 'assets');
const modelsDir = path.join(publicDir, 'models');
const texturesDir = path.join(publicDir, 'textures');

const siteUrl = 'https://meltmagic.co';

const productSlugs = [
  'floral-diya-candle',
  'sunlit-garden-candle',
  'melt-affair-latte-candle',
  'berry-bloom-candle',
  'matcha-garden-candle',
  'wrapped-bouquet-candle-set'
];

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeArtSvg({ title, subtitle, colors, seed, square = false }) {
  const rand = mulberry32(seed);
  const width = square ? 1080 : 1600;
  const height = square ? 1080 : 1200;
  const [black, deep, resin, gold, ivory] = colors;

  const waves = Array.from({ length: 8 }, (_, i) => {
    const y = height * (0.18 + i * 0.09) + rand() * 44;
    const c1 = width * (0.17 + rand() * 0.18);
    const c2 = width * (0.48 + rand() * 0.18);
    const c3 = width * (0.78 + rand() * 0.1);
    const strokeWidth = 10 + rand() * 34;
    const opacity = 0.16 + rand() * 0.28;
    const stroke = i % 3 === 0 ? gold : i % 3 === 1 ? resin : ivory;
    return `<path d="M -120 ${y.toFixed(1)} C ${c1.toFixed(1)} ${(y - 160).toFixed(1)}, ${c2.toFixed(1)} ${(y + 190).toFixed(1)}, ${c3.toFixed(1)} ${y.toFixed(1)} S ${(width + 180).toFixed(1)} ${(y - 120).toFixed(1)}, ${(width + 260).toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth.toFixed(1)}" stroke-linecap="round" opacity="${opacity.toFixed(2)}"/>`;
  }).join('\n');

  const inclusions = Array.from({ length: 34 }, (_, i) => {
    const cx = rand() * width;
    const cy = rand() * height;
    const r = 2 + rand() * 11;
    const color = i % 2 === 0 ? gold : ivory;
    return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${(0.12 + rand() * 0.48).toFixed(2)}"/>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)}</title>
  <desc id="desc">${escapeXml(subtitle)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${black}"/>
      <stop offset="0.42" stop-color="${deep}"/>
      <stop offset="1" stop-color="${black}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="35%" r="58%">
      <stop offset="0" stop-color="${resin}" stop-opacity="0.88"/>
      <stop offset="0.42" stop-color="${resin}" stop-opacity="0.25"/>
      <stop offset="1" stop-color="${black}" stop-opacity="0"/>
    </radialGradient>
    <filter id="softNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.09"/>
      </feComponentTransfer>
      <feBlend mode="soft-light" in2="SourceGraphic"/>
    </filter>
    <filter id="blurred">
      <feGaussianBlur stdDeviation="24"/>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)" opacity="0.9"/>
  <ellipse cx="${(width * 0.56).toFixed(1)}" cy="${(height * 0.48).toFixed(1)}" rx="${(width * 0.34).toFixed(1)}" ry="${(height * 0.22).toFixed(1)}" fill="${resin}" opacity="0.18" filter="url(#blurred)"/>
  ${waves}
  ${inclusions}
  <rect x="${width * 0.06}" y="${height * 0.07}" width="${width * 0.88}" height="${height * 0.86}" rx="${square ? 68 : 86}" stroke="${gold}" stroke-opacity="0.28" stroke-width="2"/>
  <rect width="${width}" height="${height}" fill="#fff" opacity="0.03" filter="url(#softNoise)"/>
  <g opacity="0.92">
    <text x="${width * 0.08}" y="${height * 0.82}" fill="${ivory}" font-family="Cormorant Garamond, Georgia, serif" font-size="${square ? 72 : 82}" font-weight="600" letter-spacing="-1">${escapeXml(title)}</text>
    <text x="${width * 0.08}" y="${height * 0.875}" fill="${gold}" font-family="Inter, Arial, sans-serif" font-size="${square ? 22 : 25}" font-weight="600" letter-spacing="4">${escapeXml(subtitle.toUpperCase())}</text>
  </g>
</svg>`;
}

function makeFaviconSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Melt Magic monogram">
  <defs>
    <radialGradient id="g" cx="50%" cy="35%" r="70%">
      <stop offset="0" stop-color="#f4dfaa"/>
      <stop offset="0.48" stop-color="#a98243"/>
      <stop offset="1" stop-color="#070606"/>
    </radialGradient>
  </defs>
  <rect width="128" height="128" rx="34" fill="#070606"/>
  <circle cx="64" cy="64" r="49" fill="url(#g)" opacity="0.38"/>
  <text x="64" y="82" fill="#fff8e7" font-family="Georgia, serif" font-size="52" font-weight="700" text-anchor="middle" letter-spacing="-2">MM</text>
</svg>`;
}

function clampByte(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function floatToRGBE(r, g, b) {
  const v = Math.max(r, g, b);
  if (v < 1e-32) return [0, 0, 0, 0];

  const exponent = Math.ceil(Math.log2(v));
  const scale = 256 / Math.pow(2, exponent);

  return [
    clampByte(r * scale),
    clampByte(g * scale),
    clampByte(b * scale),
    clampByte(exponent + 128)
  ];
}

async function writeHDR(filePath, width = 96, height = 48) {
  const header = Buffer.from(
    `#?RADIANCE
# Procedural warm studio HDRI generated for Melt Magic
FORMAT=32-bit_rle_rgbe
EXPOSURE=1.0000000000000

-Y ${height} +X ${width}
`,
    'ascii'
  );

  const encoded = [];

  for (let y = 0; y < height; y += 1) {
    encoded.push(2, 2, width >> 8, width & 255);

    const channels = [[], [], [], []];

    for (let x = 0; x < width; x += 1) {
      const u = x / width;
      const v = y / Math.max(1, height - 1);

      const warmHorizon = Math.exp(-Math.pow((v - 0.47) * 3.8, 2));
      const leftSoftbox = Math.exp(-Math.pow((u - 0.18) * 10.0, 2) - Math.pow((v - 0.36) * 8.0, 2));
      const rightStrip = Math.exp(-Math.pow((u - 0.78) * 18.0, 2) - Math.pow((v - 0.42) * 5.5, 2));
      const goldKick = Math.exp(-Math.pow((u - 0.55) * 11.0, 2) - Math.pow((v - 0.22) * 10.0, 2));
      const ceiling = Math.exp(-Math.pow((v - 0.06) * 6.0, 2));

      const r = 0.015 + warmHorizon * 0.22 + leftSoftbox * 5.6 + rightStrip * 2.2 + goldKick * 3.4 + ceiling * 0.35;
      const g = 0.013 + warmHorizon * 0.17 + leftSoftbox * 4.6 + rightStrip * 1.9 + goldKick * 2.4 + ceiling * 0.31;
      const b = 0.016 + warmHorizon * 0.14 + leftSoftbox * 3.4 + rightStrip * 1.55 + goldKick * 1.1 + ceiling * 0.36;

      const rgbe = floatToRGBE(r, g, b);
      channels[0].push(rgbe[0]);
      channels[1].push(rgbe[1]);
      channels[2].push(rgbe[2]);
      channels[3].push(rgbe[3]);
    }

    for (const channel of channels) {
      let i = 0;
      while (i < width) {
        const length = Math.min(128, width - i);
        encoded.push(length);
        for (let j = 0; j < length; j += 1) encoded.push(channel[i + j]);
        i += length;
      }
    }
  }

  await fs.writeFile(filePath, Buffer.concat([header, Buffer.from(encoded)]));
}

function superellipsePoint(angle, a, b, n = 4.2) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    a * Math.sign(c) * Math.pow(Math.abs(c), 2 / n),
    b * Math.sign(s) * Math.pow(Math.abs(s), 2 / n)
  ];
}

function createServingBoardMesh() {
  const seg = 128;
  const rings = 16;
  const a = 1.35;
  const b = 0.68;
  const thickness = 0.16;
  const crown = 0.055;

  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  function pushVertex(x, y, z, nx, ny, nz, u, v) {
    positions.push(x, y, z);
    normals.push(nx, ny, nz);
    uvs.push(u, v);
    return positions.length / 3 - 1;
  }

  pushVertex(0, thickness / 2 + crown, 0, 0, 1, 0, 0.5, 0.5);

  for (let r = 1; r <= rings; r += 1) {
    const radial = r / rings;
    const y = thickness / 2 + crown * (1 - radial * radial);
    for (let i = 0; i < seg; i += 1) {
      const angle = (i / seg) * Math.PI * 2;
      const [x, z] = superellipsePoint(angle, a * radial, b * radial);
      pushVertex(x, y, z, 0, 1, 0, 0.5 + x / (a * 2.2), 0.5 + z / (b * 2.2));
    }
  }

  for (let i = 0; i < seg; i += 1) {
    indices.push(0, 1 + i, 1 + ((i + 1) % seg));
  }

  for (let r = 1; r < rings; r += 1) {
    const current = 1 + (r - 1) * seg;
    const next = 1 + r * seg;

    for (let i = 0; i < seg; i += 1) {
      const ni = (i + 1) % seg;
      indices.push(current + i, next + i, current + ni);
      indices.push(current + ni, next + i, next + ni);
    }
  }

  const sideTopStart = positions.length / 3;

  for (let i = 0; i < seg; i += 1) {
    const angle = (i / seg) * Math.PI * 2;
    const [x, z] = superellipsePoint(angle, a, b);
    const len = Math.hypot(x / a, z / b) || 1;
    pushVertex(x, thickness / 2, z, (x / a) / len, 0, (z / b) / len, i / seg, 1);
  }

  const sideBottomStart = positions.length / 3;

  for (let i = 0; i < seg; i += 1) {
    const angle = (i / seg) * Math.PI * 2;
    const [x, z] = superellipsePoint(angle, a, b);
    const len = Math.hypot(x / a, z / b) || 1;
    pushVertex(x, -thickness / 2, z, (x / a) / len, 0, (z / b) / len, i / seg, 0);
  }

  for (let i = 0; i < seg; i += 1) {
    const ni = (i + 1) % seg;
    indices.push(sideTopStart + i, sideBottomStart + i, sideTopStart + ni);
    indices.push(sideTopStart + ni, sideBottomStart + i, sideBottomStart + ni);
  }

  const bottomCenter = pushVertex(0, -thickness / 2, 0, 0, -1, 0, 0.5, 0.5);
  const bottomRingStart = positions.length / 3;

  for (let i = 0; i < seg; i += 1) {
    const angle = (i / seg) * Math.PI * 2;
    const [x, z] = superellipsePoint(angle, a * 0.98, b * 0.98);
    pushVertex(x, -thickness / 2, z, 0, -1, 0, 0.5 + x / (a * 2.2), 0.5 + z / (b * 2.2));
  }

  for (let i = 0; i < seg; i += 1) {
    indices.push(bottomCenter, bottomRingStart + ((i + 1) % seg), bottomRingStart + i);
  }

  return { positions, normals, uvs, indices };
}

function floatBuffer(values) {
  const buffer = Buffer.alloc(values.length * 4);
  values.forEach((value, index) => buffer.writeFloatLE(value, index * 4));
  return buffer;
}

function uint16Buffer(values) {
  const buffer = Buffer.alloc(values.length * 2);
  values.forEach((value, index) => buffer.writeUInt16LE(value, index * 2));
  return buffer;
}

function padBuffer(buffer, fill = 0) {
  const pad = (4 - (buffer.length % 4)) % 4;
  return pad ? Buffer.concat([buffer, Buffer.alloc(pad, fill)]) : buffer;
}

function minMaxVec3(values) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  for (let i = 0; i < values.length; i += 3) {
    min[0] = Math.min(min[0], values[i]);
    min[1] = Math.min(min[1], values[i + 1]);
    min[2] = Math.min(min[2], values[i + 2]);

    max[0] = Math.max(max[0], values[i]);
    max[1] = Math.max(max[1], values[i + 1]);
    max[2] = Math.max(max[2], values[i + 2]);
  }

  return { min, max };
}

function createGLB(mesh) {
  const bufferViews = [];
  let bin = Buffer.alloc(0);

  function appendView(buffer, target) {
    bin = padBuffer(bin);
    const byteOffset = bin.length;
    bin = Buffer.concat([bin, buffer]);
    bufferViews.push({
      buffer: 0,
      byteOffset,
      byteLength: buffer.length,
      target
    });
    return bufferViews.length - 1;
  }

  const posView = appendView(floatBuffer(mesh.positions), 34962);
  const normView = appendView(floatBuffer(mesh.normals), 34962);
  const uvView = appendView(floatBuffer(mesh.uvs), 34962);
  const indexView = appendView(uint16Buffer(mesh.indices), 34963);

  bin = padBuffer(bin);
  const { min, max } = minMaxVec3(mesh.positions);

  const gltf = {
    asset: {
      version: '2.0',
      generator: 'Melt Magic procedural GLB generator'
    },
    extensionsUsed: ['KHR_materials_transmission', 'KHR_materials_ior', 'KHR_materials_volume'],
    scenes: [{ nodes: [0] }],
    scene: 0,
    nodes: [{ name: 'Aurora Tide Serving Board', mesh: 0 }],
    meshes: [
      {
        name: 'Placeholder candle vessel',
        primitives: [
          {
            attributes: {
              POSITION: 0,
              NORMAL: 1,
              TEXCOORD_0: 2
            },
            indices: 3,
            material: 0
          }
        ]
      }
    ],
    materials: [
      {
        name: 'Warm candle wax',
        alphaMode: 'BLEND',
        doubleSided: false,
        pbrMetallicRoughness: {
          baseColorFactor: [0.62, 0.88, 0.92, 0.78],
          metallicFactor: 0,
          roughnessFactor: 0.055
        },
        extensions: {
          KHR_materials_transmission: {
            transmissionFactor: 0.68
          },
          KHR_materials_ior: {
            ior: 1.48
          },
          KHR_materials_volume: {
            thicknessFactor: 0.16,
            attenuationDistance: 2.4,
            attenuationColor: [0.7, 0.92, 1]
          }
        }
      }
    ],
    buffers: [{ byteLength: bin.length }],
    bufferViews,
    accessors: [
      {
        bufferView: posView,
        byteOffset: 0,
        componentType: 5126,
        count: mesh.positions.length / 3,
        type: 'VEC3',
        min,
        max
      },
      {
        bufferView: normView,
        byteOffset: 0,
        componentType: 5126,
        count: mesh.normals.length / 3,
        type: 'VEC3'
      },
      {
        bufferView: uvView,
        byteOffset: 0,
        componentType: 5126,
        count: mesh.uvs.length / 2,
        type: 'VEC2'
      },
      {
        bufferView: indexView,
        byteOffset: 0,
        componentType: 5123,
        count: mesh.indices.length,
        type: 'SCALAR'
      }
    ]
  };

  const json = JSON.stringify(gltf);
  const jsonChunk = padBuffer(Buffer.from(json, 'utf8'), 0x20);
  const binChunk = padBuffer(bin);

  const totalLength = 12 + 8 + jsonChunk.length + 8 + binChunk.length;

  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(totalLength, 8);

  const jsonHeader = Buffer.alloc(8);
  jsonHeader.writeUInt32LE(jsonChunk.length, 0);
  jsonHeader.writeUInt32LE(0x4e4f534a, 4);

  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(binChunk.length, 0);
  binHeader.writeUInt32LE(0x004e4942, 4);

  return Buffer.concat([header, jsonHeader, jsonChunk, binHeader, binChunk]);
}

async function main() {
  await fs.mkdir(assetsDir, { recursive: true });
  await fs.mkdir(modelsDir, { recursive: true });
  await fs.mkdir(texturesDir, { recursive: true });

  const art = [
    {
      file: 'product-floral-diya.svg',
      title: 'Floral Diya Candle',
      subtitle: 'sunflower topped soy diya',
      colors: ['#1a1108', '#3a2410', '#e8a13c', '#c96f2e', '#fff3da'],
      seed: 11
    },
    {
      file: 'product-sunlit-garden.svg',
      title: 'Sunlit Garden Candle',
      subtitle: 'marigold pressed-flower soy candle',
      colors: ['#160f07', '#33220f', '#e8b83c', '#d67d3a', '#fff6e3'],
      seed: 22
    },
    {
      file: 'product-melt-affair-latte.svg',
      title: 'Melt Affair Latte Candle',
      subtitle: 'iced latte dessert soy candle',
      colors: ['#170f09', '#3a2818', '#c99361', '#8a5a34', '#fff3e2'],
      seed: 33
    },
    {
      file: 'product-berry-bloom.svg',
      title: 'Berry Bloom Candle',
      subtitle: 'strawberry berry scented soy candle',
      colors: ['#180a0c', '#3a1420', '#d9536b', '#a83250', '#ffe9ec'],
      seed: 44
    },
    {
      file: 'product-matcha-garden.svg',
      title: 'Matcha Garden Candle',
      subtitle: 'matcha green soy candle',
      colors: ['#0c1409', '#1f2f16', '#8fae5c', '#5a7a38', '#f4f7e6'],
      seed: 55
    },
    {
      file: 'product-wrapped-bouquet.svg',
      title: 'Wrapped Bouquet Candle Set',
      subtitle: 'gift-wrapped candle bouquet',
      colors: ['#160e08', '#3a2412', '#e8863c', '#c94f4f', '#fff3da'],
      seed: 66
    },
    {
      file: 'og-image.svg',
      title: 'Melt Magic',
      subtitle: 'handcrafted soy candles, eco and cozy vibes',
      colors: ['#160e08', '#3a2412', '#e8a13c', '#d67d3a', '#fff3da'],
      seed: 88
    }
  ];

  for (const item of art) {
    await fs.writeFile(path.join(assetsDir, item.file), makeArtSvg(item), 'utf8');
  }

  for (let i = 1; i <= 6; i += 1) {
    await fs.writeFile(
      path.join(assetsDir, `gallery-${i}.svg`),
      makeArtSvg({
        title: ['Private Pour', 'Gold Vein', 'Studio Light', 'River Edge', 'Pearl Inlay', 'Final Polish'][i - 1],
        subtitle: 'atelier process study',
        colors: ['#060606', '#17110e', i % 2 ? '#85d6df' : '#ead7a7', '#c99a55', '#fff8ea'],
        seed: 100 + i
      }),
      'utf8'
    );

    await fs.writeFile(
      path.join(assetsDir, `instagram-${i}.svg`),
      makeArtSvg({
        title: ['Mold', 'Pour', 'Bloom', 'Cure', 'Buff', 'Install'][i - 1],
        subtitle: 'melt magic studio',
        colors: ['#060606', '#16110d', i % 2 ? '#7ed7df' : '#f0dfbb', '#c89b55', '#fff6e1'],
        seed: 200 + i,
        square: true
      }),
      'utf8'
    );
  }

  await writeHDR(path.join(texturesDir, 'studio-champagne.hdr'));

  const glb = createGLB(createServingBoardMesh());
  await fs.writeFile(path.join(modelsDir, 'aurora-serving-board.glb'), glb);

  await fs.writeFile(path.join(publicDir, 'favicon.svg'), makeFaviconSvg(), 'utf8');

  await fs.writeFile(
    path.join(publicDir, 'robots.txt'),
    `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`,
    'utf8'
  );

  const sitemapUrls = [
    '',
    ...productSlugs.map((slug) => `product/${slug}`)
  ];

  await fs.writeFile(
    path.join(publicDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (url) => `  <url>
    <loc>${siteUrl}/${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url ? '0.82' : '1.00'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`,
    'utf8'
  );

  await fs.writeFile(
    path.join(publicDir, 'site.webmanifest'),
    JSON.stringify(
      {
        name: 'Melt Magic',
        short_name: 'Melt Magic',
        description: 'Handcrafted soy candles, eco and cozy vibes, small batch.',
        start_url: '/',
        display: 'standalone',
        background_color: '#070606',
        theme_color: '#070606',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      },
      null,
      2
    ),
    'utf8'
  );

  console.log('Melt Magic assets generated: SVG artwork, HDRI lighting, GLB model, SEO files.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
