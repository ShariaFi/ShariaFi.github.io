import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  LineChart, 
  Mail, 
  Linkedin, 
  MapPin, 
  ChevronRight,
  Landmark,
  Calculator,
  PieChart
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-serif font-bold text-xl text-unisma-green">
              Nida.<span className="text-unisma-gold">Finance</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
              <a href="#about" className="hover:text-unisma-green transition-colors">Tentang Saya</a>
              <a href="#education" className="hover:text-unisma-green transition-colors">Pendidikan</a>
              <a href="#skills" className="hover:text-unisma-green transition-colors">Keahlian</a>
              <a href="#contact" className="hover:text-unisma-green transition-colors">Kontak</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <div className="inline-flex items-center space-x-2 bg-unisma-light text-unisma-green px-3 py-1 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-unisma-green"></span>
            <span>Mahasiswi Perbankan</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-gray-900">
            Membangun Masa Depan <br/>
            <span className="text-unisma-green">Keuangan & Perbankan</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
            Halo! Saya adalah mahasiswi program studi Perbankan di <span className="font-semibold text-gray-900">Universitas Islam Malang (UNISMA)</span>. Saya memiliki ketertarikan mendalam pada analisis keuangan, perbankan syariah, dan inovasi finansial.
          </p>
          <div className="flex space-x-4 pt-4">
            <a href="#contact" className="bg-unisma-green text-white px-6 py-3 rounded-lg font-medium hover:bg-unisma-green/90 transition-colors shadow-sm shadow-unisma-green/20">
              Hubungi Saya
            </a>
            <a href="#about" className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
              Selengkapnya <ChevronRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 relative"
        >
          {/* Decorative background shape */}
          <div className="absolute inset-0 bg-unisma-green/10 rounded-full blur-3xl transform scale-90 translate-x-4 translate-y-4"></div>
          {/* Main portrait image (placeholder for a professional student portrait) */}
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" 
            alt="Mahasiswi Perbankan UNISMA" 
            className="w-full max-w-md mx-auto aspect-[4/5] object-cover rounded-2xl shadow-xl relative z-10"
          />
          {/* Floating badge */}
          <div className="absolute bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-3">
            <div className="p-3 bg-unisma-light text-unisma-green rounded-full">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Fokus Studi</p>
              <p className="text-sm font-bold text-gray-900">Perbankan Syariah</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Tentang Saya</h2>
            <div className="w-16 h-1 bg-unisma-green mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Sebagai seorang mahasiswi yang berdedikasi, saya selalu antusias dalam mempelajari dinamika pasar keuangan, regulasi perbankan, dan operasional layanan finansial modern.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 bg-gray-50 rounded-2xl border border-gray-100"
            >
              <BookOpen className="w-8 h-8 text-unisma-green mb-4" />
              <h3 className="font-bold text-xl mb-2 text-gray-900">Akademik Kuat</h3>
              <p className="text-gray-600">Aktif dalam diskusi dan riset terkait kebijakan moneter dan manajemen risiko perbankan.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 bg-gray-50 rounded-2xl border border-gray-100"
            >
              <LineChart className="w-8 h-8 text-unisma-green mb-4" />
              <h3 className="font-bold text-xl mb-2 text-gray-900">Data & Analisis</h3>
              <p className="text-gray-600">Terampil dalam menganalisis laporan keuangan untuk menilai kesehatan dan profitabilitas entitas bisnis.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 bg-gray-50 rounded-2xl border border-gray-100"
            >
              <Briefcase className="w-8 h-8 text-unisma-green mb-4" />
              <h3 className="font-bold text-xl mb-2 text-gray-900">Siap Kerja</h3>
              <p className="text-gray-600">Mengikuti berbagai sertifikasi dan magang untuk mempersiapkan diri menjadi profesional bankir andal.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <GraduationCap className="w-8 h-8 text-unisma-green" />
            <h2 className="text-3xl font-serif font-bold text-gray-900">Riwayat Pendidikan</h2>
          </div>

          <div className="relative border-l-2 border-unisma-green/20 ml-4 pl-8 pb-8 space-y-12">
            <div className="relative">
              <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-unisma-green ring-4 ring-white"></span>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <span className="text-sm font-medium text-unisma-gold bg-unisma-gold/10 px-3 py-1 rounded-full mb-3 inline-block">2021 - Sekarang</span>
                <h3 className="text-xl font-bold text-gray-900">S1 Perbankan</h3>
                <p className="text-lg font-medium text-gray-700 mb-2">Universitas Islam Malang (UNISMA)</p>
                <p className="text-gray-600 leading-relaxed">
                  Mempelajari manajemen perbankan, ekonomi syariah, akuntansi lembaga keuangan, dan analisis investasi. Aktif di Himpunan Mahasiswa Jurusan dan Kelompok Studi Ekonomi Islam.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1 text-unisma-green"/> Malang, Jawa Timur
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Keahlian Profesi</h2>
            <div className="w-16 h-1 bg-unisma-green mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Hard Skills */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-unisma-gold" /> Hard Skills
              </h3>
              <div className="space-y-4">
                <SkillBar name="Analisis Laporan Keuangan" percent={90} />
                <SkillBar name="Operasional Perbankan" percent={85} />
                <SkillBar name="Akuntansi" percent={80} />
                <SkillBar name="Prinsip Perbankan Syariah" percent={95} />
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-unisma-gold" /> Soft Skills
              </h3>
              <div className="space-y-4">
                <SkillBar name="Komunikasi Interpersonal" percent={95} />
                <SkillBar name="Pemecahan Masalah" percent={85} />
                <SkillBar name="Kerja Tim" percent={90} />
                <SkillBar name="Service Excellence" percent={85} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section & Footer */}
      <section id="contact" className="bg-gray-900 pt-20 pb-10 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Mari Berjejaring!</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Saya selalu terbuka untuk diskusi mengenai investasi, perbankan, atau peluang magang di perusahaan yang bergerak di bidang finansial.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a href="mailto:hello@example.com" className="flex items-center justify-center px-6 py-3 bg-unisma-green hover:bg-unisma-green/90 text-white rounded-lg transition-colors font-medium">
              <Mail className="w-5 h-5 mr-2" /> Email Saya
            </a>
            <a href="#" className="flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium">
              <Linkedin className="w-5 h-5 mr-2" /> LinkedIn Profile
            </a>
          </div>

          <div className="border-t border-white/10 pt-8 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Mahasiswi Perbankan UNISMA. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SkillBar({ name, percent }: { name: string, percent: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-sm text-gray-500">{percent}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-unisma-green h-2 rounded-full"
        ></motion.div>
      </div>
    </div>
  );
}
