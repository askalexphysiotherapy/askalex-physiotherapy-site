import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
const out = process.argv[3];

const orientedBuf = await sharp(src).rotate().png().toBuffer();
const meta = await sharp(orientedBuf).metadata();
const width = meta.width;
const height = meta.height;
console.log(`oriented ${width}x${height}`);

// Sample clean wall from top-right for edge fill after shift.
const sample = await sharp(orientedBuf)
	.extract({
		left: Math.floor(width * 0.7),
		top: Math.floor(height * 0.03),
		width: Math.floor(width * 0.25),
		height: Math.floor(height * 0.1)
	})
	.resize(1, 1, { fit: "fill" })
	.raw()
	.toBuffer();
const [r, g, b] = sample;

// Subject sits slightly left — shift content right ~5% to center.
const shiftX = Math.round(width * 0.035);
console.log(`shiftX=${shiftX}, wall rgb(${r},${g},${b})`);

const background = await sharp({
	create: {
		width,
		height,
		channels: 3,
		background: { r, g, b }
	}
})
	.png()
	.toBuffer();

await fs.mkdir(path.dirname(out), { recursive: true });
await sharp(background)
	.composite([{ input: orientedBuf, left: shiftX, top: 0 }])
	.png({ compressionLevel: 9 })
	.toFile(out);

console.log(`wrote ${out}`);
