/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Instagram, 
  MapPin, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Leaf, 
  Droplets, 
  Layout, 
  Home, 
  Sun, 
  Trees,
  MessageCircle,
  Search,
  PenTool,
  Hammer,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Constants & Data ---

const WHATSAPP_NUMBER = "085921591870";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const HERO_SLIDES = [
  {
    image: "https://dpa79oyyyfxcd.cloudfront.net/laravel/design/20b70250-67fa-43ee-a247-41a22a23dd0f.png",
    subtitle: "Desain Landscape",
    title: "Wujudkan Taman Impian Anda",
    description: "Solusi lengkap desain dan pembuatan taman profesional untuk hunian modern."
  },
  {
    image: "https://platinumadisentosa.com/wp-content/uploads/2025/02/Ternyata-Begini-Cara-Membuat-Kolam-Ikan-Ideal-dan-Nyaman-1536x864.jpg",
    subtitle: "Kolam Koi & Hias",
    title: "Keindahan Air di Rumah Anda",
    description: "Pembuatan kolam koi dan air mancur dengan sistem filtrasi terbaik."
  }
];

const SERVICES = [
  {
    id: "minimalis",
    title: "Taman Minimalis",
    icon: <Leaf className="w-6 h-6" />,
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/658372854_1669863117531731_3178817597552396113_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=QnPadBH4fsMQ7kNvwFGklQf&_nc_oc=AdpsexyLgpye-M8H7Y3dLhLAvZ0Td_ma09ZyFDGGVk2B7En_eg2xr92JnUTizyq1-Y9OL_PDSp17VTSNvu3h2Ukp&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AHJqVj7fNrpj-Neq68ZhUfGZWd0nR0n8oSwJw7VEqyB0Q&oe=69F72CB0",
    description: "Desain taman yang bersih dan efisien untuk lahan terbatas namun tetap estetis."
  },
  {
    id: "tropis",
    title: "Taman Tropis",
    icon: <Trees className="w-6 h-6" />,
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/658917299_1254254786860905_4129162894248003456_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_ohc=K7J2P7Xd0TcQ7kNvwEmK3e3&_nc_oc=AdqizmnX7TZtC0wysxB92RVzme--Q81VphT0C5dw7LUREaGdzfJDX0XQj_aIRyw6g-OpIM8iE2UTIZ9nwq-u0UKe&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AFIJq2BOcWsY3XqVLDr1fdW1C5MTDabEFM4OVBhREN_FA&oe=69F75328",
    description: "Hadirkan nuansa hutan tropis yang rimbun dan menyegarkan di pekarangan Anda."
  },
  {
    id: "kering",
    title: "Taman Kering",
    icon: <Sun className="w-6 h-6" />,
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/661444452_823178730279611_7379588697716753328_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=IYxytN_cILoQ7kNvwFQ1kSC&_nc_oc=Adp0UMUqyX2-4zJldkvNyXdW5pytlW0QZy5Ioy5CozWzhL3BzThUlNwIjeBYHUfVBiof_5GNt41w076pwzRKVc3w&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AEroGxtv1QMAH_mDychaCJ2YztBIwnkelbPC0KIcw0wBg&oe=69F73EE8",
    description: "Taman rendah perawatan dengan kombinasi batuan dan tanaman sukulen yang elegan."
  },
  {
    id: "vertical",
    title: "Vertical Garden",
    icon: <Layout className="w-6 h-6" />,
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/661542538_2814491302258261_7081437908575069863_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_ohc=dOhvMHK4hU4Q7kNvwGWYoLu&_nc_oc=AdrfHAAPb1H_gbfUSxpzDx67EmUekwvcv-1DzbJZ2TfyqupLINdaop2q31E1IvsnnwGh_OFwA7Ju4VCY-8IV8Ja0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AE9JjZlZ97gz4kjze1xQJ5DZeuqubMl9jCR4lJqD9fMYA&oe=69F72DA9",
    description: "Solusi penghijauan pada dinding untuk area sempit atau interior bangunan."
  },
  {
    id: "kolam",
    title: "Kolam Hias / Air Mancur",
    icon: <Droplets className="w-6 h-6" />,
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/658327752_957342713534054_186065741987715165_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_ohc=y1PppfLH7zwQ7kNvwEu04nx&_nc_oc=AdqfarvT4MlFzROGfFzC2LcbmWkBxbC7rjoKxiZrBiqVrnpcHOUsjlqvAVQ7HQe0I9GkVgcVdY8KpVafKN9zEhhB&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AE71vZv7x2HW-16ws4GbC-Hj_eK2p8pP5GNTpAGMJZpmQ&oe=69F73AB7",
    description: "Elemen air yang menenangkan dengan desain kolam koi atau waterfall yang artistik."
  },
  {
    id: "hardscape",
    title: "Gazebo & Hardscape",
    icon: <Home className="w-6 h-6" />,
    image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/664731380_1857324728309573_836257247417149924_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=EC50d4os7eYQ7kNvwGGxkBv&_nc_oc=Adqz2lZI60sgg0OkkO8t9YsuA9NYJfgFywTNcbCWAdvwKyJbqeR8RF7GyhR2ytkpTNs8262oo-ct87D-m6k0dl-m&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AHQPb9k9trKg5ahicICWFjgEyjYpOwhvFVSVftFzlkpNA&oe=69F747BF",
    description: "Pembangunan gazebo, jalan setapak, dan elemen keras lainnya untuk melengkapi taman."
  }
];

const PORTFOLIO = [
  { id: 1, category: "Minimalis", image: "https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/657762933_1420976045996876_5059208154390473513_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=O6tSPjPnyDoQ7kNvwH16T7I&_nc_oc=AdpGZutdkhBO1X8ULfDbeJqJHoMBkqUV3Q854IqfEIOOycw3co2f74W7zvGPPNtzh580WI95fvj1KTApetXfLzqh&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AGfORrlpbuslnilOZTEdSqMO_V0zw72eOlQTQJjXpK0pQ&oe=69FB3AEC" },
  { id: 2, category: "Tropis", image: "https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/664112044_1107238804917949_4962049671179376389_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=109&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=q09EhcFDU0gQ7kNvwEkUf_M&_nc_oc=AdrD7Wz0RonDOUdzNLsssPcnRZt-d9h60EWfaOsQNocKPSqXCeObzPbG0eEONtQ2Y1Cn56cBwwESgHScNX1wgD9E&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AFYE84WEvD9ZMS6MIWAagPzd7NpkKB5UCJqsrozG2gWOw&oe=69FB1446" },
  { id: 3, category: "Hardscape", image: "https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/659650849_2908540809509293_3257047460079622925_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=104&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=TUfHFFOWgKEQ7kNvwF_7-WW&_nc_oc=AdrGSW-6JWg1tENjLe2a2oE8TNP5YPAZm0-s3RVndrjoLejKG4QE_M8gmFrOTXpXtv6p6Zj94OWlBWUoCvp6YoU2&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AFFRQqyENBEFTny3IDGz0LPoIHmJsUfewBtFgR7TZZKNA&oe=69FB2A88" },
  { id: 4, category: "Minimalis", image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/658372854_1669863117531731_3178817597552396113_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=QnPadBH4fsMQ7kNvwFGklQf&_nc_oc=AdpsexyLgpye-M8H7Y3dLhLAvZ0Td_ma09ZyFDGGVk2B7En_eg2xr92JnUTizyq1-Y9OL_PDSp17VTSNvu3h2Ukp&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AHJqVj7fNrpj-Neq68ZhUfGZWd0nR0n8oSwJw7VEqyB0Q&oe=69F72CB0" },
  { id: 5, category: "Kering", image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/661444452_823178730279611_7379588697716753328_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=IYxytN_cILoQ7kNvwFQ1kSC&_nc_oc=Adp0UMUqyX2-4zJldkvNyXdW5pytlW0QZy5Ioy5CozWzhL3BzThUlNwIjeBYHUfVBiof_5GNt41w076pwzRKVc3w&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AEroGxtv1QMAH_mDychaCJ2YztBIwnkelbPC0KIcw0wBg&oe=69F73EE8" },
  { id: 6, category: "Vertical Garden", image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/661542538_2814491302258261_7081437908575069863_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_ohc=dOhvMHK4hU4Q7kNvwGWYoLu&_nc_oc=AdrfHAAPb1H_gbfUSxpzDx67EmUekwvcv-1DzbJZ2TfyqupLINdaop2q31E1IvsnnwGh_OFwA7Ju4VCY-8IV8Ja0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AE9JjZlZ97gz4kjze1xQJ5DZeuqubMl9jCR4lJqD9fMYA&oe=69F72DA9" },
  { id: 7, category: "Kolam Hias", image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/658327752_957342713534054_186065741987715165_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_ohc=y1PppfLH7zwQ7kNvwEu04nx&_nc_oc=AdqfarvT4MlFzROGfFzC2LcbmWkBxbC7rjoKxiVrnpcHOUsjlqvAVQ7HQe0I9GkVgcVdY8KpVafKN9zEhhB&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AE71vZv7x2HW-16ws4GbC-Hj_eK2p8pP5GNTpAGMJZpmQ&oe=69F73AB7" },
  { id: 8, category: "Hardscape", image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/664731380_1857324728309573_836257247417149924_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=EC50d4os7eYQ7kNvwGGxkBv&_nc_oc=Adqz2lZI60sgg0OkkO8t9YsuA9NYJfgFywTNcbCWAdvwKyJbqeR8RF7GyhR2ytkpTNs8262oo-ct87D-m6k0dl-m&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_ss=7a32e&oh=03_Q7cD5AHQPb9k9trKg5ahicICWFjgEyjYpOwhvFVSVftFzlkpNA&oe=69F747BF" }
];

const USPs = [
  { title: "Konsultasi & Survey Gratis", description: "Kami berikan layanan survey lokasi tanpa dipungut biaya." },
  { title: "Desain Sesuai Budget", description: "Taman indah tidak harus mahal, kami sesuaikan dengan anggaran Anda." },
  { title: "Tim Profesional", description: "Dikerjakan oleh tenaga ahli berpengalaman di bidang landscape." },
  { title: "Pengerjaan Tepat Waktu", description: "Komitmen kami adalah menyelesaikan proyek sesuai jadwal yang disepakati." }
];

const TESTIMONIALS = [
  { name: "Bapak Andi", location: "BSD City", text: "Sangat puas dengan hasil taman minimalisnya. Pengerjaan rapi dan timnya sangat komunikatif." },
  { name: "Ibu Maya", location: "Gading Serpong", text: "Kolam koi yang dibuat sangat artistik. Sistem filtrasinya bagus, air tetap jernih sampai sekarang." },
  { name: "Bapak Rizky", location: "Alam Sutera", text: "Vertical garden di kantor kami jadi pusat perhatian. Perawatannya juga mudah karena sistem otomatisnya." }
];

const WORKFLOW = [
  { step: "01", title: "Konsultasi", icon: <MessageCircle className="w-6 h-6" />, desc: "Hubungi kami via WhatsApp untuk diskusi awal." },
  { step: "02", title: "Survey Lokasi", icon: <Search className="w-6 h-6" />, desc: "Tim kami akan datang untuk mengukur dan melihat kondisi lahan." },
  { step: "03", title: "Desain & Penawaran", icon: <PenTool className="w-6 h-6" />, desc: "Kami buatkan konsep desain dan rincian biaya transparan." },
  { step: "04", title: "Pengerjaan", icon: <Hammer className="w-6 h-6" />, desc: "Proses konstruksi dan penanaman oleh tim ahli kami." },
  { step: "05", title: "Finishing", icon: <Sparkles className="w-6 h-6" />, desc: "Pengecekan akhir dan serah terima taman impian Anda." }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "#home" },
    { name: "Tentang", href: "#about" },
    { name: "Layanan", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Kontak", href: "#contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://scontent.cdninstagram.com/v/t51.82787-19/504717527_17965639844930188_7062634381339114520_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=109&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy41MDAuQzMifQ%3D%3D&_nc_ohc=fcigUoTUUgIQ7kNvwFEipxc&_nc_oc=AdoPPY-YLxvCo1I5YzfO38aMBs_fmjq4jyT-SdrNpZeNE46G93pXK7HCfK78G1CB93cfn87TIhIVt9zRenQ5SafI&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=H5Um5zJT50ltTagvdVEGpw&_nc_ss=7a3a8&oh=00_Af1eCJZiKH2gY30GfTe_edjTp7bMTS75iUg7wDAivD9xqw&oe=69DC305C" 
            alt="Logo" 
            className="w-10 h-10 rounded-full object-cover border border-brand-olive/20"
            referrerPolicy="no-referrer"
          />
          <span className={cn(
            "font-serif text-xl font-semibold tracking-tight",
            isScrolled ? "text-brand-dark" : "text-white drop-shadow-md"
          )}>
            Nadhira Flora
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-olive",
                isScrolled ? "text-brand-dark" : "text-white drop-shadow-md"
              )}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-olive text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-brand-olive/90 transition-all"
          >
            Konsultasi Gratis
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? "text-brand-dark" : "text-white"} /> : <Menu className={isScrolled ? "text-brand-dark" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-brand-dark text-lg font-medium border-b border-gray-100 pb-2"
              >
                {link.name}
              </a>
            ))}
            <a 
              href={WHATSAPP_LINK}
              className="bg-brand-olive text-white text-center py-3 rounded-xl font-medium"
            >
              Chat WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 6000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_SLIDES[current].image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            {/* Left side empty as requested */}
            <div className="hidden md:block w-1/2" />
            
            {/* Right side content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-4"
              >
                <span className="inline-block text-white/90 text-sm uppercase tracking-[0.2em] font-medium border-l-2 border-brand-olive pl-3">
                  {HERO_SLIDES[current].subtitle}
                </span>
                <h1 className="text-4xl md:text-6xl text-white font-serif leading-tight">
                  {HERO_SLIDES[current].title}
                </h1>
                <p className="text-white/80 text-lg max-w-md mx-auto md:mx-0 font-light">
                  {HERO_SLIDES[current].description}
                </p>
                <div className="pt-6">
                  <a 
                    href="#services"
                    className="inline-block bg-brand-olive text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-white hover:text-brand-olive transition-all duration-300 shadow-lg"
                  >
                    Lihat Layanan
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        <button onClick={prevSlide} className="text-white/50 hover:text-white transition-colors">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <div className="flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                current === i ? "bg-white w-8" : "bg-white/30"
              )}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="text-white/50 hover:text-white transition-colors">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/657762933_1420976045996876_5059208154390473513_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=O6tSPjPnyDoQ7kNvwH16T7I&_nc_oc=AdpGZutdkhBO1X8ULfDbeJqJHoMBkqUV3Q854IqfEIOOycw3co2f74W7zvGPPNtzh580WI95fvj1KTApetXfLzqh&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AGfORrlpbuslnilOZTEdSqMO_V0zw72eOlQTQJjXpK0pQ&oe=69FB3AEC" 
              alt="About Us" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-brand-olive text-white p-8 rounded-3xl shadow-xl hidden lg:block">
            <p className="text-4xl font-serif font-bold">10+</p>
            <p className="text-sm uppercase tracking-widest opacity-80">Tahun Pengalaman</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="text-brand-olive font-medium uppercase tracking-widest text-sm">Tentang Kami</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Ahli Landscape & Taman Profesional
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Sanggar Nadhira Flora adalah penyedia jasa landscape yang berdedikasi untuk menciptakan ruang terbuka hijau yang indah, fungsional, dan menenangkan. Kami melayani mulai dari desain konsep, pembangunan, hingga perawatan rutin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Jasa Desain Taman",
              "Pembuatan Taman",
              "Perawatan Taman",
              "Custom Sesuai Kebutuhan"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-olive w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-600 italic border-l-4 border-brand-olive/20 pl-6 py-2">
            "Kami percaya setiap rumah berhak memiliki sudut hijau yang asri. Dengan pengerjaan profesional, kami wujudkan taman impian Anda."
          </p>

          <div className="pt-4">
            <a 
              href={WHATSAPP_LINK}
              className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full font-medium hover:bg-brand-olive transition-colors"
            >
              <Phone className="w-4 h-4" />
              Hubungi Kami Sekarang
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 bg-brand-earth">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-brand-olive font-medium uppercase tracking-widest text-sm">Layanan Kami</span>
          <h2 className="text-4xl md:text-5xl font-serif">Solusi Lengkap Untuk Taman Anda</h2>
          <p className="text-gray-600">Berbagai pilihan layanan landscape yang dapat disesuaikan dengan gaya dan kebutuhan hunian Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-sm">
                  {service.icon}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-serif font-semibold group-hover:text-brand-olive transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <a 
                  href={WHATSAPP_LINK}
                  className="inline-flex items-center gap-2 text-brand-olive font-semibold text-sm hover:gap-3 transition-all"
                >
                  Konsultasi Layanan <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState("Semua");
  const categories = ["Semua", "Minimalis", "Tropis", "Vertical Garden", "Kolam Hias", "Hardscape", "Kering"];

  const filteredItems = useMemo(() => {
    if (filter === "Semua") return PORTFOLIO;
    return PORTFOLIO.filter(item => item.category === filter);
  }, [filter]);

  return (
    <section id="portfolio" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <span className="text-brand-olive font-medium uppercase tracking-widest text-sm">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-serif">Proyek Terbaru Kami</h2>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-medium transition-all border",
                  filter === cat 
                    ? "bg-brand-olive text-white border-brand-olive" 
                    : "bg-transparent text-gray-500 border-gray-200 hover:border-brand-olive hover:text-brand-olive"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-like Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md"
              >
                <img 
                  src={item.image} 
                  alt={item.category} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white space-y-1">
                    <p className="text-xs uppercase tracking-widest font-medium opacity-80">{item.category}</p>
                    <p className="text-xl font-serif">Proyek {item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const USP = () => {
  return (
    <section className="py-24 px-6 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-brand-olive font-medium uppercase tracking-widest text-sm">Keunggulan Kami</span>
            <h2 className="text-4xl md:text-5xl font-serif">Mengapa Memilih Sanggar Nadhira Flora?</h2>
            <p className="text-gray-400 text-lg">Kami memberikan standar kualitas tinggi untuk setiap jengkal taman yang kami kerjakan.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {USPs.map((usp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-3"
              >
                <div className="w-12 h-12 bg-brand-olive/20 rounded-2xl flex items-center justify-center border border-brand-olive/30">
                  <CheckCircle2 className="text-brand-olive w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif font-semibold">{usp.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{usp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-full border-2 border-dashed border-brand-olive/30 absolute -inset-4 animate-[spin_20s_linear_infinite]" />
          <div className="aspect-square rounded-3xl overflow-hidden relative z-10 shadow-2xl">
            <img 
              src="https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/664112044_1107238804917949_4962049671179376389_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=109&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=q09EhcFDU0gQ7kNvwEkUf_M&_nc_oc=AdrD7Wz0RonDOUdzNLsssPcnRZt-d9h60EWfaOsQNocKPSqXCeObzPbG0eEONtQ2Y1Cn56cBwwESgHScNX1wgD9E&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AFYE84WEvD9ZMS6MIWAagPzd7NpkKB5UCJqsrozG2gWOw&oe=69FB1446" 
              alt="Professional Team" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-brand-earth">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-brand-olive font-medium uppercase tracking-widest text-sm">Testimoni</span>
          <h2 className="text-4xl md:text-5xl font-serif">Apa Kata Klien Kami</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-3xl shadow-sm space-y-6 relative"
            >
              <div className="text-brand-olive opacity-20 absolute top-8 right-8">
                <MessageCircle className="w-12 h-12" />
              </div>
              <p className="text-gray-600 italic leading-relaxed relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-olive rounded-full flex items-center justify-center text-white font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-brand-dark">{t.name}</p>
                  <p className="text-xs text-brand-olive uppercase tracking-widest">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Workflow = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-brand-olive font-medium uppercase tracking-widest text-sm">Cara Kerja</span>
          <h2 className="text-4xl md:text-5xl font-serif">Proses Pengerjaan Kami</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {WORKFLOW.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-6 group"
            >
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-brand-earth rounded-3xl flex items-center justify-center text-brand-olive group-hover:bg-brand-olive group-hover:text-white transition-all duration-500 shadow-sm">
                  {item.icon}
                </div>
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-brand-dark text-white rounded-full flex items-center justify-center text-xs font-bold border-4 border-white">
                  {item.step}
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-serif font-bold">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-olive rounded-[3rem] p-12 md:p-24 text-center text-white space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-dark rounded-full blur-3xl" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6 relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              Wujudkan Taman Impian <br className="hidden md:block" /> Anda Sekarang
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Konsultasikan kebutuhan landscape Anda dengan tim ahli kami. Kami siap memberikan solusi terbaik untuk hunian Anda.
            </p>
            <div className="pt-8">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-brand-olive px-10 py-5 rounded-full text-lg font-bold hover:bg-brand-dark hover:text-white transition-all duration-300 shadow-xl"
              >
                <MessageCircle className="w-6 h-6" />
                Chat WhatsApp Sekarang
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-dark text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
        <div className="space-y-6 lg:col-span-1">
          <div className="flex items-center gap-3">
            <img 
              src="https://scontent.cdninstagram.com/v/t51.82787-19/504717527_17965639844930188_7062634381339114520_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=109&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy41MDAuQzMifQ%3D%3D&_nc_ohc=fcigUoTUUgIQ7kNvwFEipxc&_nc_oc=AdoPPY-YLxvCo1I5YzfO38aMBs_fmjq4jyT-SdrNpZeNE46G93pXK7HCfK78G1CB93cfn87TIhIVt9zRenQ5SafI&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=H5Um5zJT50ltTagvdVEGpw&_nc_ss=7a3a8&oh=00_Af1eCJZiKH2gY30GfTe_edjTp7bMTS75iUg7wDAivD9xqw&oe=69DC305C" 
              alt="Logo" 
              className="w-12 h-12 rounded-full object-cover border border-brand-olive/50"
              referrerPolicy="no-referrer"
            />
            <span className="font-serif text-2xl font-bold tracking-tight">Nadhira Flora</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Penyedia jasa landscape dan pembuatan taman profesional di wilayah Tangerang Selatan dan sekitarnya.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/dhira_flora23/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-olive transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={WHATSAPP_LINK} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-olive transition-colors">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-serif font-bold">Layanan</h4>
          <ul className="space-y-3 text-gray-400">
            <li>Taman Minimalis</li>
            <li>Taman Tropis</li>
            <li>Vertical Garden</li>
            <li>Kolam Hias & Koi</li>
            <li>Gazebo & Hardscape</li>
          </ul>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <h4 className="text-xl font-serif font-bold">Lokasi & Kontak</h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <MapPin className="text-brand-olive w-6 h-6 flex-shrink-0" />
              <p className="text-gray-400 text-sm leading-relaxed">
                Taman Tirta Golf Bsd, Jalan S. Cimandiri, Lengkong Karya, Tukang Tanaman Hias No 15 ( Depan BANK MANDIRI) SERPONG UTARA, KOTA TANGERANG SELATAN, BANTEN, KODE POS 15320, Tangerang 15320
              </p>
            </div>
            <div className="flex gap-4">
              <Phone className="text-brand-olive w-6 h-6 flex-shrink-0" />
              <p className="text-gray-400 text-sm">0859 2159 1870</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-12 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Sanggar Nadhira Flora. All rights reserved.</p>
      </div>
    </footer>
  );
};

const FloatingWA = () => {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold whitespace-nowrap">
        Tanya Kami
      </span>
    </motion.a>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <USP />
      <Testimonials />
      <Workflow />
      <CTA />
      <Footer />
      <FloatingWA />
    </div>
  );
}
