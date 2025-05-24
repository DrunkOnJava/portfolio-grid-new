import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check authorization
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // In production, validate the token properly
  // For now, just check if it exists

  if (req.method === 'POST') {
    try {
      const { projects } = req.body;
      
      // Generate the TypeScript file content
      const fileContent = `import { Project } from '@/types';

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};`;

      // Write to the projects.ts file
      const filePath = path.join(process.cwd(), 'data', 'projects.ts');
      fs.writeFileSync(filePath, fileContent, 'utf-8');

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving projects:', error);
      res.status(500).json({ error: 'Failed to save projects' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}