import fs from 'fs';
import path from 'path';
import https from 'https';

const images = {
  // Hero
  'hero-breathtaking-portrait': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2560&auto=format&fit=crop',
  // Stories
  'story-iceland-aurora': 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1470&auto=format&fit=crop',
  'story-japan-kyoto': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1470&auto=format&fit=crop',
  'story-peru-andes': 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1476&auto=format&fit=crop',
  'story-morocco-market': 'https://images.unsplash.com/photo-1542038385-2e6f470557dd?q=80&w=1470&auto=format&fit=crop',
  'story-thailand-temple': 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1470&auto=format&fit=crop',
  // About
  'about-snowy-mountain': 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1470&auto=format&fit=crop',
  // Destinations
  'dest-iceland-waterfall': 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1559&auto=format&fit=crop',
  'dest-peru-machu-picchu': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop',
  'dest-italy-amalfi': 'https://images.unsplash.com/photo-1516483638261-f40af5ff1f25?q=80&w=1453&auto=format&fit=crop',
  'dest-namibia-dunes': 'https://images.unsplash.com/photo-1518544801976-3e159e50e58c?q=80&w=1527&auto=format&fit=crop',
  'dest-new-zealand-lake': 'https://images.unsplash.com/photo-1469521669194-babbdf9aa9bf?q=80&w=1632&auto=format&fit=crop',
  // Experiences
  'exp-nature-landscape': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1474&auto=format&fit=crop',
  'exp-culture-architecture': 'https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?q=80&w=1446&auto=format&fit=crop',
  'exp-adventure-climbing': 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1467&auto=format&fit=crop',
  'exp-food-market': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop',
  'exp-luxury-resort': 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1587&auto=format&fit=crop',
  'exp-roadtrip-van': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1421&auto=format&fit=crop',
  // Dream
  'dream-airplane-window': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1474&auto=format&fit=crop',
  'dream-passport-map': 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=1664&auto=format&fit=crop',
  'dream-camera-journal': 'https://images.unsplash.com/photo-1516007204481-b5f7ee281315?q=80&w=1470&auto=format&fit=crop',
  'dream-small-suitcase': 'https://images.unsplash.com/photo-1512413914565-1d428fa6935c?q=80&w=1470&auto=format&fit=crop',
  // Memories
  'memory-nostalgic-sunset': 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=1470&auto=format&fit=crop',
  'memory-paris-street': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1420&auto=format&fit=crop',
  'memory-forest-mist': 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1470&auto=format&fit=crop',
  // Journey
  'journey-train-window': 'https://images.unsplash.com/photo-1513519107127-1cb339fb73ce?q=80&w=1471&auto=format&fit=crop',
  'journey-local-cafe': 'https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=1470&auto=format&fit=crop',
  'journey-mountain-sunrise': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&auto=format&fit=crop',
  // CTA
  'cta-sunset-landscape': 'https://images.unsplash.com/photo-1472806426350-603610d85659?q=80&w=1470&auto=format&fit=crop'
};

const outputDir = path.join(process.cwd(), 'src', 'assets', 'images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadImage(name, url) {
  return new Promise((resolve, reject) => {
    // Force webp format through Unsplash's Imgix parameters
    const fetchUrl = url.includes('?') ? `${url}&fm=webp` : `${url}?fm=webp`;
    const dest = path.join(outputDir, `${name}.webp`);

    https.get(fetchUrl, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirects if any
        downloadImage(name, response.headers.location).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${name}, status code: ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(dest);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${name}.webp`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function main() {
  const tasks = Object.entries(images).map(async ([name, url]) => {
    try {
      await downloadImage(name, url);
    } catch (e) {
      console.error(`Error downloading ${name}:`, e);
    }
  });

  await Promise.all(tasks);
  console.log('All images processed!');
}

main();
