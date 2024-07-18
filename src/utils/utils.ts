import { NextFont } from 'next/dist/compiled/@next/font';
import localFont from 'next/font/local';

export const Krypton: NextFont = localFont({
 src: [
  {
   path:
    '../../public/assets/fonts/MonospaceKrypton/MonospaceKrypton-Regular.otf',
   weight: '400',
   style: 'normal',
  },
  {
   path: '../../public/assets/fonts/MonospaceKrypton/MonospaceKrypton-Bold.otf',
   weight: '700',
   style: 'bold',
  },
 ],
});

export const Inter: NextFont = localFont({
 src: [
  {
   path: '../../public/assets/fonts/Inter/Inter-Regular.ttf',
   weight: '400',
   style: 'normal',
  },
  {
   path: '../../public/assets/fonts/Inter/Inter-Bold.ttf',
   weight: '700',
   style: 'bold',
  },
 ],
});
