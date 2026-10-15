import mammoth from 'mammoth';

/**
 * Extracts plain text from an uploaded document buffer based on file name or mime type.
 */
export async function extractTextFromBuffer(
  buffer: Buffer,
  fileName: string,
  mimeType?: string
): Promise<{ text: string; detectedType: string }> {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  // Plain text / Markdown
  if (extension === 'txt' || extension === 'md' || extension === 'rtf' || mimeType?.includes('text/plain')) {
    const text = buffer.toString('utf-8').trim();
    return { text, detectedType: 'Text Document' };
  }

  // DOCX files using mammoth
  if (extension === 'docx' || mimeType?.includes('wordprocessingml')) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value.trim();
      if (!text) {
        throw new Error('DOCX file appears empty or unreadable.');
      }
      return { text, detectedType: 'Microsoft Word (DOCX)' };
    } catch (err: any) {
      throw new Error(`Failed to parse DOCX: ${err.message || 'Corrupted file'}`);
    }
  }

  // PDF files using pdfjs-dist
  if (extension === 'pdf' || mimeType?.includes('application/pdf')) {
    try {
      // Dynamic import to support ES module in Node
      const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
      
      const uint8Array = new Uint8Array(buffer);
      const loadingTask = pdfjsLib.getDocument({
        data: uint8Array,
        useSystemFonts: true,
        disableFontFace: true,
      });

      const doc = await loadingTask.promise;
      const numPages = doc.numPages;
      const pageTexts: string[] = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await doc.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        let lastY: number | null = null;
        let pageString = '';

        for (const item of textContent.items as any[]) {
          if ('str' in item) {
            // Add newline if vertical position shifted significantly
            if (lastY !== null && Math.abs(item.transform[5] - lastY) > 8) {
              pageString += '\n';
            } else if (pageString.length > 0 && !pageString.endsWith(' ') && !pageString.endsWith('\n')) {
              pageString += ' ';
            }
            pageString += item.str;
            lastY = item.transform[5];
          }
        }

        if (pageString.trim()) {
          pageTexts.push(pageString.trim());
        }
      }

      const extractedText = pageTexts.join('\n\n');
      if (!extractedText || extractedText.length < 20) {
        throw new Error(
          'Could not extract text from this PDF. It may be a scanned image-only PDF without OCR, or password-protected. Please copy and paste your resume text directly.'
        );
      }

      return { text: extractedText, detectedType: `PDF Document (${numPages} page${numPages > 1 ? 's' : ''})` };
    } catch (err: any) {
      throw new Error(err.message || 'PDF extraction failed. Please use the text paste option.');
    }
  }

  throw new Error(`Unsupported file format (.${extension}). Please upload a PDF, DOCX, or TXT file, or paste text directly.`);
}
