/**
 * Generates a valid multi-resolution Windows ICO file containing PNG streams.
 * Modern browsers and OSes (Windows Vista+, macOS, Linux, Chrome, Edge, Safari, Firefox)
 * natively parse PNG-encoded ICO files.
 */

export interface IcoImageSource {
  size: number;
  pngBuffer: Uint8Array;
}

export function createIcoBinary(images: IcoImageSource[]): Blob {
  const count = images.length;
  const HEADER_SIZE = 6;
  const ENTRY_SIZE = 16;
  const dirSize = HEADER_SIZE + count * ENTRY_SIZE;

  // Calculate total file size and offsets
  let totalSize = dirSize;
  for (const img of images) {
    totalSize += img.pngBuffer.byteLength;
  }

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const uint8View = new Uint8Array(buffer);

  // 1. Write ICONDIR Header (6 bytes)
  view.setUint16(0, 0, true);       // idReserved: Must always be 0
  view.setUint16(2, 1, true);       // idType: 1 for ICO, 2 for CUR
  view.setUint16(4, count, true);   // idCount: Number of images

  // 2. Write ICONDIRENTRY for each image (16 bytes each)
  let currentOffset = dirSize;

  images.forEach((img, index) => {
    const entryOffset = HEADER_SIZE + index * ENTRY_SIZE;
    const width = img.size >= 256 ? 0 : img.size;
    const height = img.size >= 256 ? 0 : img.size;

    view.setUint8(entryOffset + 0, width);             // bWidth
    view.setUint8(entryOffset + 1, height);            // bHeight
    view.setUint8(entryOffset + 2, 0);                 // bColorCount (0 if >=8bpp)
    view.setUint8(entryOffset + 3, 0);                 // bReserved
    view.setUint16(entryOffset + 4, 1, true);          // wPlanes (1)
    view.setUint16(entryOffset + 6, 32, true);         // wBitCount (32 bpp RGBA)
    view.setUint32(entryOffset + 8, img.pngBuffer.byteLength, true); // dwBytesInRes
    view.setUint32(entryOffset + 12, currentOffset, true);           // dwImageOffset

    // 3. Copy image PNG payload to currentOffset
    uint8View.set(img.pngBuffer, currentOffset);
    currentOffset += img.pngBuffer.byteLength;
  });

  return new Blob([buffer], { type: 'image/x-icon' });
}

/**
 * Converts a list of PNG blobs into an ICO Blob
 */
export async function convertPngBlobsToIco(
  items: { size: number; blob: Blob }[]
): Promise<Blob> {
  const images: IcoImageSource[] = [];

  for (const item of items) {
    const arrayBuffer = await item.blob.arrayBuffer();
    images.push({
      size: item.size,
      pngBuffer: new Uint8Array(arrayBuffer),
    });
  }

  return createIcoBinary(images);
}

