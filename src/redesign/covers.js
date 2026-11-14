// Compatibility export: covers now use one intentional overview per project.
import { projectMedia } from './projectMedia';
export const projectCovers = Object.fromEntries(Object.entries(projectMedia).map(([slug, media]) => [slug, [{ src: media.image, fit: 'contain' }]]));
