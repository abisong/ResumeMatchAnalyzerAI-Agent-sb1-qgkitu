import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

async function parsePDF(buffer: ArrayBuffer): Promise<string> {
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let text = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(' ');
    text += pageText + '\n';
  }
  
  return text;
}

export async function parseFile(file: File): Promise<string> {
  const fileType = file.type;
  const buffer = await file.arrayBuffer();

  try {
    // Parse PDF files
    if (fileType === 'application/pdf') {
      return await parsePDF(buffer);
    }
    
    // Parse DOC/DOCX files
    if (fileType === 'application/msword' || 
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      return result.value;
    }
    
    // Handle plain text files
    if (fileType === 'text/plain') {
      return new TextDecoder().decode(buffer);
    }

    throw new Error('Unsupported file type');
  } catch (error) {
    console.error('Error parsing file:', error);
    throw new Error('Failed to parse file. Please check the file format and try again.');
  }
}