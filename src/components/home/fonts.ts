import { Anton, VT323 } from 'next/font/google';

/* Les grands titres en capitales serrées, et la police des incrustations de magnétoscope. */
export const display = Anton({ weight: '400', subsets: ['latin'], variable: '--font-display' });
export const osd = VT323({ weight: '400', subsets: ['latin'], variable: '--font-osd' });
