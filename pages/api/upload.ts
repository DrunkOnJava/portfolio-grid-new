import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { parseFileName } from '@/utils/fileNameParser';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface UploadedFile extends File {
  filepath: string;
  originalFilename: string | null;
  mimetype: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/photos'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      filter: ({ mimetype }) => {
        // Only allow image files
        return mimetype?.startsWith('image/') || false;
      },
    });

    const [fields, files] = await form.parse(req);
    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = uploadedFile as UploadedFile;
    
    // Use original filename or generate clean one
    const originalName = file.originalFilename || 'upload';
    const extension = path.extname(originalName);
    
    // If filename follows naming convention, keep it; otherwise add timestamp
    const hasValidFormat = /^\d+-(square|tallrec|widerec|largesq|tinywide|tinytall)-/.test(originalName);
    const newFileName = hasValidFormat 
      ? originalName
      : `${Date.now()}-square-${originalName.replace(extension, '').replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase()}${extension}`;
    const newFilePath = path.join(process.cwd(), 'public/photos', newFileName);

    // Move and rename the file
    fs.renameSync(file.filepath, newFilePath);

    // Add to git and commit
    try {
      const relativePath = `public/photos/${newFileName}`;
      execSync(`git add "${relativePath}"`, { cwd: process.cwd() });
      execSync(`git commit -m "Add uploaded image: ${newFileName}

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"`, { cwd: process.cwd() });
      
      // Push to GitHub
      execSync('git push origin main', { cwd: process.cwd() });
    } catch (gitError) {
      console.warn('Git operation failed:', gitError);
      // Don't fail the upload if git operations fail
    }

    // Parse filename for order and size information
    const parsed = parseFileName(newFileName);
    
    // Create new project entry
    const newProject = {
      id: Date.now(),
      title: parsed.name,
      description: 'User uploaded image',
      image: `/photos/${newFileName}`,
      status: 'success' as const,
      size: parsed.size,
      order: parsed.order,
      filename: parsed.originalFileName,
      tags: ['upload', 'user-content'],
      uploadedAt: new Date().toISOString(),
    };

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      filename: newFileName,
      path: `/photos/${newFileName}`,
      project: newProject,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Upload failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}