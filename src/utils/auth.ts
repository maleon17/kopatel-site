export interface UserData {
  telegram_id: number;
  username: string;
  minecraft: string;
  faction: string;
  kit: string;
  banned: boolean;
  ender_chest_slots?: number;
  skin_system?: 'elyby' | 'tlauncher';
}

const STORAGE_KEY = 'kp_user';

export function getSession(): UserData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as UserData;
  } catch {
    return null;
  }
}

export function setSession(user: UserData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
}
