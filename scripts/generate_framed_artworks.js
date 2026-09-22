import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { ARTWORKS } from '../src/data/artworks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../public/images/framed');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processArtwork(artwork) {
  const imageRelPath = artwork.originalImage || artwork.image;
  const inputPath = path.join(__dirname, '../public', imageRelPath);

  if (!fs.existsSync(inputPath)) {
    console.warn(`[WARN] File not found: ${inputPath}`);
    return null;
  }

  const original = sharp(inputPath);
  const { data, info } = await original.raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  // 1. Detect dark scanner / table background edges if present
  // Sample border pixels to see if there is dark table backdrop
  let minX = w, maxX = 0, minY = h, maxY = 0;
  let hasDarkBorders = false;

  // Check 4 corners
  const cornerIndices = [0, (w - 1), (h - 1) * w, (h - 1) * w + (w - 1)];
  for (const c of cornerIndices) {
    const idx = c * info.channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    if (r < 75 && g < 70 && b < 65) {
      hasDarkBorders = true;
      break;
    }
  }

  let cropLeft = 0, cropTop = 0, cropWidth = w, cropHeight = h;

  if (hasDarkBorders) {
    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        const idx = (y * w + x) * info.channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 80 && g > 70 && b > 65) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const pad = 2;
    cropLeft = Math.max(0, Math.min(minX + pad, Math.floor(w * 0.08)));
    cropTop = Math.max(0, Math.min(minY + pad, Math.floor(h * 0.08)));
    const cropRight = Math.min(w, Math.max(maxX - pad, Math.floor(w * 0.92)));
    const cropBottom = Math.min(h, Math.max(maxY - pad, Math.floor(h * 0.92)));
    cropWidth = cropRight - cropLeft;
    cropHeight = cropBottom - cropTop;
  }

  // 2. Extract cleaned artwork
  const cleanedBuffer = await sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .toBuffer();

  // 3. Proportional high-resolution sizing
  const isLandscape = cropWidth > cropHeight;
  let targetArtWidth, targetArtHeight;

  if (isLandscape) {
    targetArtWidth = 1400;
    targetArtHeight = Math.round(targetArtWidth * (cropHeight / cropWidth));
  } else {
    targetArtHeight = 1350;
    targetArtWidth = Math.round(targetArtHeight * (cropWidth / cropHeight));
  }

  const resizedArtBuffer = await sharp(cleanedBuffer)
    .resize(targetArtWidth, targetArtHeight, { fit: 'contain' })
    .toBuffer();

  // 4. Proportional museum matting and frame moulding
  const baseDim = Math.min(targetArtWidth, targetArtHeight);
  const matSize = Math.round(Math.max(54, Math.min(96, baseDim * 0.09)));
  const matHorizontal = matSize;
  // Weighted bottom matting (traditional 8% extra at bottom for optical balance)
  const matTop = matSize;
  const matBottom = Math.round(matSize * 1.08);

  const frameMoulding = Math.round(Math.max(40, Math.min(52, baseDim * 0.048)));
  const goldFillet = 3;

  const totalWidth = targetArtWidth + (matHorizontal * 2) + (frameMoulding * 2);
  const totalHeight = targetArtHeight + matTop + matBottom + (frameMoulding * 2);

  const artX = frameMoulding + matHorizontal;
  const artY = frameMoulding + matTop;

  // 5. High-resolution SVG frame moulding overlay
  const svgFrame = `
  <svg width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Walnut Moulding Bevel Gradients -->
      <linearGradient id="walnutTop" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#4E311D" />
        <stop offset="30%" stop-color="#3D2415" />
        <stop offset="85%" stop-color="#26150C" />
        <stop offset="100%" stop-color="#180C07" />
      </linearGradient>
      <linearGradient id="walnutBottom" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#24130A" />
        <stop offset="15%" stop-color="#351D0F" />
        <stop offset="70%" stop-color="#2A160C" />
        <stop offset="100%" stop-color="#140A05" />
      </linearGradient>
      <linearGradient id="walnutLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#462A17" />
        <stop offset="50%" stop-color="#341E11" />
        <stop offset="100%" stop-color="#1C0E07" />
      </linearGradient>
      <linearGradient id="walnutRight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1C0E07" />
        <stop offset="50%" stop-color="#2C190E" />
        <stop offset="100%" stop-color="#180B05" />
      </linearGradient>

      <!-- Gold Fillet Liner -->
      <linearGradient id="goldFilletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E5C158" />
        <stop offset="50%" stop-color="#C5A059" />
        <stop offset="100%" stop-color="#8E6F2D" />
      </linearGradient>

      <!-- Mat Inner Bevel & Depth Shadows -->
      <linearGradient id="matShadowTop" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(0,0,0,0.32)" />
        <stop offset="100%" stop-color="rgba(0,0,0,0.0)" />
      </linearGradient>
      <linearGradient id="matShadowLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(0,0,0,0.28)" />
        <stop offset="100%" stop-color="rgba(0,0,0,0.0)" />
      </linearGradient>

      <!-- Ambient Gallery Spotlight -->
      <radialGradient id="gallerySpotlight" cx="50%" cy="12%" r="75%">
        <stop offset="0%" stop-color="rgba(255, 248, 235, 0.14)" />
        <stop offset="50%" stop-color="rgba(255, 248, 235, 0.03)" />
        <stop offset="100%" stop-color="rgba(0, 0, 0, 0.0)" />
      </radialGradient>
    </defs>

    <!-- 1. Archival Ivory Mat Board with Cutout Window -->
    <path d="M ${frameMoulding} ${frameMoulding} 
             H ${totalWidth - frameMoulding} 
             V ${totalHeight - frameMoulding} 
             H ${frameMoulding} Z 
             M ${artX} ${artY} 
             H ${artX + targetArtWidth} 
             V ${artY + targetArtHeight} 
             H ${artX} Z" 
          fill="#FAF7F2" 
          fill-rule="evenodd" />

    <path d="M ${frameMoulding} ${frameMoulding} 
             H ${totalWidth - frameMoulding} 
             V ${totalHeight - frameMoulding} 
             H ${frameMoulding} Z 
             M ${artX} ${artY} 
             H ${artX + targetArtWidth} 
             V ${artY + targetArtHeight} 
             H ${artX} Z" 
          fill="#F5F0E6" 
          opacity="0.4"
          fill-rule="evenodd" />

    <!-- 2. Mat Bevel Cut Window Shadow (Around the Artwork) -->
    <rect x="${artX - 2}" y="${artY - 2}" 
          width="${targetArtWidth + 4}" height="${targetArtHeight + 4}" 
          fill="none" stroke="#D1C7B7" stroke-width="1.5" />
    <rect x="${artX}" y="${artY}" width="${targetArtWidth}" height="10" fill="url(#matShadowTop)" />
    <rect x="${artX}" y="${artY}" width="10" height="${targetArtHeight}" fill="url(#matShadowLeft)" />

    <!-- 3. Outer Walnut Moulding (4 Mitred Trapezoids for 3D realism) -->
    <polygon points="0,0 ${totalWidth},0 ${totalWidth - frameMoulding},${frameMoulding} ${frameMoulding},${frameMoulding}" 
             fill="url(#walnutTop)" />
    <polygon points="0,${totalHeight} ${totalWidth},${totalHeight} ${totalWidth - frameMoulding},${totalHeight - frameMoulding} ${frameMoulding},${totalHeight - frameMoulding}" 
             fill="url(#walnutBottom)" />
    <polygon points="0,0 ${frameMoulding},${frameMoulding} ${frameMoulding},${totalHeight - frameMoulding} 0,${totalHeight}" 
             fill="url(#walnutLeft)" />
    <polygon points="${totalWidth},0 ${totalWidth},${totalHeight} ${totalWidth - frameMoulding},${totalHeight - frameMoulding} ${totalWidth - frameMoulding},${frameMoulding}" 
             fill="url(#walnutRight)" />

    <!-- Outer Frame Highlight Lines -->
    <line x1="0" y1="1" x2="${totalWidth}" y2="1" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" />
    <line x1="1" y1="0" x2="1" y2="${totalHeight}" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" />
    
    <!-- 4. Inner Gold Fillet Liner -->
    <rect x="${frameMoulding - goldFillet}" y="${frameMoulding - goldFillet}" 
          width="${totalWidth - (frameMoulding - goldFillet) * 2}" height="${totalHeight - (frameMoulding - goldFillet) * 2}" 
          fill="none" stroke="url(#goldFilletGrad)" stroke-width="${goldFillet}" />

    <!-- Inner Moulding Rebate Shadow onto Mat -->
    <rect x="${frameMoulding}" y="${frameMoulding}" width="${totalWidth - frameMoulding * 2}" height="12" fill="url(#matShadowTop)" opacity="0.8" />
    <rect x="${frameMoulding}" y="${frameMoulding}" width="12" height="${totalHeight - frameMoulding * 2}" fill="url(#matShadowLeft)" opacity="0.7" />

    <!-- 5. Warm Gallery Spotlight Glow -->
    <rect x="0" y="0" width="${totalWidth}" height="${totalHeight}" fill="url(#gallerySpotlight)" pointer-events="none" />
  </svg>
  `;

  // 6. Composite base canvas + artwork + frame overlay
  const baseCanvas = await sharp({
    create: {
      width: totalWidth,
      height: totalHeight,
      channels: 3,
      background: { r: 250, g: 247, b: 242 }
    }
  }).png().toBuffer();

  const outputFileName = `framed_${artwork.id}.jpg`;
  const outputPath = path.join(outputDir, outputFileName);

  await sharp(baseCanvas)
    .composite([
      { input: resizedArtBuffer, top: artY, left: artX },
      { input: Buffer.from(svgFrame), top: 0, left: 0 }
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outputPath);

  console.log(`[OK] Generated: ${outputFileName} (${totalWidth}x${totalHeight})`);
  return `/images/framed/${outputFileName}`;
}

async function main() {
  console.log(`=== Generating Museum Framed Artworks for ${ARTWORKS.length} items ===\n`);
  let count = 0;
  for (const artwork of ARTWORKS) {
    try {
      const res = await processArtwork(artwork);
      if (res) count++;
    } catch (err) {
      console.error(`[ERROR] Failed to process ${artwork.id}:`, err);
    }
  }
  console.log(`\n=== Finished: ${count}/${ARTWORKS.length} artworks framed successfully! ===`);
}

main();
