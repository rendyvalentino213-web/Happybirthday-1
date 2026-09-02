import { BirthdayConfig } from './types';

export const defaultConfig: BirthdayConfig = {
  passcode: "0309",
  giftMessage: "Ada hadiah spesial buat kamu...",
  finalTitle: "Happy Birthday dede sayang",
  finalMessage: "terimakasih sudah lahir di dunia ini, semoga kamu selalu menjadi pribadi yang lucu dan menggemaskan satu hal yang harus kamu tahu aku sangat berterimakasih kepada tuhan karna telah melahirkan kamu di hari ini sayang, i love u dede❤️",
  partyName: "Ziya 21th Birthday",
  outroTitle: "Happy Birthday",
  outroMessage: "Thank you for being part of my life.\n\nI hope this little gift can make your special day even more beautiful.\n\nForever Yours. ❤️",
  theme: 'rose',
  photoUrl: '/photo.jpg',
};

export function encodeConfig(config: BirthdayConfig): string {
  try {
    const json = JSON.stringify(config);
    const bytes = new TextEncoder().encode(json);
    const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join('');
    return btoa(binString);
  } catch (e) {
    return "";
  }
}

export function decodeConfig(hash: string): BirthdayConfig | null {
  try {
    const binString = atob(hash);
    const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
    const json = new TextDecoder().decode(bytes);
    return { ...defaultConfig, ...JSON.parse(json) };
  } catch (e) {
    return null;
  }
}

export function getConfigFromUrl(): BirthdayConfig {
  const params = new URLSearchParams(window.location.search);
  const data = params.get('data');
  if (data) {
    const parsed = decodeConfig(data);
    if (parsed) return parsed;
  }
  return defaultConfig;
}
