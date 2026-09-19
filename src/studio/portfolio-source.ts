import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, firebaseConfig, isConfigValid } from '../lib/firebase';

// Database text is rendered in the exhibition's trusted HTML templates.
const escape = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]!));
const imageUrl = (value: unknown) => {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value, window.location.origin);
    return ['https:', 'http:'].includes(url.protocol) ? escape(url.href) : '';
  } catch { return ''; }
};

const knownProjects = [
  ['남행열차', 'namhaeng', 'beverage'], ['소주', 'soju', 'beverage'],
  ['해피벌', 'happybirth', 'beverage'], ['그릭', 'greek', 'food'],
  ['COCONEST', 'greek', 'food'], ['한식바탕', 'hansik', 'food'],
  ['숙취', 'sukchwi', 'food'], ['비건', 'vegan', 'food'],
  ['아지야', 'ajiya', 'food'], ['감탄', 'gamtan', 'branding'],
  ['하나카드', 'hana', 'graphic'],
];

export function subscribeToPortfolio(onProjects: (projects: any[]) => void) {
  if (!isConfigValid(firebaseConfig)) return () => {};
  return onSnapshot(query(collection(db, 'projects'), orderBy('order', 'asc')), snapshot => {
    const usedIds = new Set<string>();
    const projects = snapshot.docs.flatMap(doc => {
      const data = doc.data();
      const thumbnail = imageUrl(data.imageUrl);
      if (!thumbnail || !data.title) return [];
      const known = knownProjects.find(([term]) => String(data.title).toUpperCase().includes(term));
      const candidateId = known?.[1] || doc.id;
      const id = usedIds.has(candidateId) ? doc.id : candidateId;
      usedIds.add(id);
      const category = String(data.category || 'Packaging');
      const packaging = /packag|패키지/i.test(category);
      const branding = /brand|브랜딩/i.test(category);
      const description = String(data.description || '').split(/\n+/).filter(Boolean);
      return [{
        id: escape(id), t: escape(data.title), en: escape(data.title), b: escape(data.title),
        cat: known?.[2] || (packaging ? 'food' : branding ? 'branding' : 'graphic'),
        field: packaging ? '패키지' : branding ? '브랜딩' : escape(category),
        scope: escape(category), y: '', img: thumbnail,
        intro: escape(description[0] || ''), d: description.map(escape),
        images: Array.isArray(data.images) ? data.images.map(imageUrl).filter(Boolean) : [],
      }];
    });
    onProjects(projects);
  }, () => { /* Keep the bundled approved work if the collection is unavailable. */ });
}
