export type ProjectStatus = 'success' | 'failed' | 'hidden';
export type ProjectSize = 'square' | 'tallrec' | 'widerec' | 'largesq' | 'tinywide' | 'tinytall';

export interface Project {
  id: number;
  title: string;
  description?: string;
  image?: string;
  icon?: string;
  content?: boolean;
  status: ProjectStatus;
  size?: ProjectSize;
  tags?: string[];
  hidden?: boolean;
  pexelsId?: number;
  photographer?: string;
  photographerUrl?: string;
  uploadedAt?: string;
  order?: number;
  filename?: string;
}