import type { DocFormValues, DocTemplateId, DocumentDraft, SmartFillProfile } from './types';

const SESSION_PROFILE: SmartFillProfile = {
  updatedAt: 0,
  values: {},
  fieldUsage: {},
};

const STORAGE_KEY = 'pdfwindows-doc-studio-profile';
const DRAFTS_KEY = 'pdfwindows-doc-studio-drafts';
const PERSIST_PREF_KEY = 'pdfwindows-doc-studio-persist';

export function getPersistPreference(): boolean {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(PERSIST_PREF_KEY) === '1';
}

export function setPersistPreference(enabled: boolean): void {
  if (typeof localStorage === 'undefined') return;
  if (enabled) {
    localStorage.setItem(PERSIST_PREF_KEY, '1');
    syncSessionToStorage();
  } else {
    localStorage.removeItem(PERSIST_PREF_KEY);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DRAFTS_KEY);
  }
}

function syncSessionToStorage(): void {
  if (typeof localStorage === 'undefined' || !getPersistPreference()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SESSION_PROFILE));
}

export function loadPersistedProfile(): SmartFillProfile | null {
  if (typeof localStorage === 'undefined' || !getPersistPreference()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SmartFillProfile;
  } catch {
    return null;
  }
}

export function hydrateSessionFromStorage(): void {
  const persisted = loadPersistedProfile();
  if (!persisted) return;
  SESSION_PROFILE.values = { ...persisted.values };
  SESSION_PROFILE.fieldUsage = { ...persisted.fieldUsage };
  SESSION_PROFILE.updatedAt = persisted.updatedAt;
}

export function rememberFieldValues(values: DocFormValues, keys: string[]): void {
  const now = Date.now();
  for (const key of keys) {
    const value = values[key]?.trim();
    if (!value) continue;
    SESSION_PROFILE.values[key] = value;
    SESSION_PROFILE.fieldUsage[key] = (SESSION_PROFILE.fieldUsage[key] ?? 0) + 1;
  }
  SESSION_PROFILE.updatedAt = now;
  syncSessionToStorage();
}

export function getSmartFillSuggestions(keys: string[]): DocFormValues {
  const suggestions: DocFormValues = {};
  for (const key of keys) {
    const value = SESSION_PROFILE.values[key];
    if (value) suggestions[key] = value;
  }
  return suggestions;
}

export function getTopUsedFields(limit = 6): string[] {
  return Object.entries(SESSION_PROFILE.fieldUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key]) => key);
}

export function clearAllLocalData(): void {
  SESSION_PROFILE.values = {};
  SESSION_PROFILE.fieldUsage = {};
  SESSION_PROFILE.updatedAt = 0;
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DRAFTS_KEY);
    localStorage.removeItem(PERSIST_PREF_KEY);
  }
}

export function saveDraft(templateId: DocTemplateId, values: DocFormValues): void {
  if (!getPersistPreference() || typeof localStorage === 'undefined') return;
  const drafts = loadDrafts();
  const draft: DocumentDraft = { templateId, values, savedAt: Date.now() };
  drafts[templateId] = draft;
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function loadDraft(templateId: DocTemplateId): DocFormValues | null {
  const drafts = loadDrafts();
  return drafts[templateId]?.values ?? null;
}

function loadDrafts(): Record<string, DocumentDraft> {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
