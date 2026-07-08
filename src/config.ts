// Бэкенд бота, опубликованный через Tailscale Funnel (монтируется на путь /kopatel)
export const API_BASE = 'https://lighrtag-umbrel.tail8cf083.ts.net/kopatel';

export const skinUrl = (skinSystem: string | null | undefined, nickname: string) =>
  `${API_BASE}/skin/${skinSystem === 'tlauncher' ? 'tlauncher' : 'elyby'}/${nickname}`;
