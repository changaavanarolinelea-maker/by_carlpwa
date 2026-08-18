const JOURS_AVANT_PURGE = 30;

export function joursDepuis(dateISO: string): number {
  const diffMs = Date.now() - new Date(dateISO).getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function estExpire(dateISO: string): boolean {
  return joursDepuis(dateISO) >= JOURS_AVANT_PURGE;
}

export function joursRestants(dateISO: string): number {
  return Math.max(JOURS_AVANT_PURGE - joursDepuis(dateISO), 0);
}
