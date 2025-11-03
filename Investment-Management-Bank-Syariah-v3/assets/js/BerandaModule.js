/**
 * @fileoverview BerandaModule: Merender tab "Beranda" yang statis.
 *
 * Modul ini telah didesain ulang untuk mengubah konten "informasi"
 * menjadi "pengalaman" visual yang interaktif (sesuai Memo Desain).
 *
 * 1. Konten disimpan dalam objek `_contentData` yang terstruktur.
 * 2. Metode `render()` membangun HTML dari data ini menggunakan
 * fungsi helper untuk komponen visual (kartu, diagram alir, dll.).
 */

class BerandaModule {

    constructor(eventBus, kurikulumModule) {
        this.section = document.getElementById('beranda');
        this.eventBus = eventBus;
        this.kurikulumModule = kurikulumModule;
        this.hasInitialized = false;

        // --- 1. DATA (KONTEN) ---
        // Ini adalah "Single Source of Truth" yang telah direvisi penuh.
        this._contentData = {
            // "mainTitle" dan "intro" LAMA DIGANTI dengan "hero" BARU:
            hero: {
                title: "Mencari Berkah di Dalam Angka",
                subtitle: "Bagaimana Manajemen Investasi Syariah menyeimbangkan profit finansial (angka) dengan tujuan spiritual (berkah) untuk menciptakan kekayaan yang berkelanjutan dan bermakna.",
                keyStats: [
                    {
                        label: "Fokus Konvensional",
                        value: "Maksimalkan Profit",
                        icon: "💰"
                    },
                    {
                        label: "Fokus Syariah",
                        value: "Capai Falah (Berkah)",
                        icon: "🕌"
                    }
                ]
            },

            // "sections" tetap menjadi struktur utama
            sections: [
                // --- BAGIAN 1.1: REVISI ---
                {
                    title: "1.1 Definisi dan Paradigma Ganda Investasi",
                    content: [
                        {
                            type: 'heading',
                            text: 'Definisi Konvensional vs. Paradigma Syariah'
                        },
                        {
                            type: 'comparisonCards',
                            cards: [
                                {
                                    title: 'Paradigma Konvensional (OJK)',
                                    icon: '💼', // (Ikon disarankan)
                                    description: 'Berfokus pada maksimalisasi pengembalian finansial yang disesuaikan dengan risiko (utilitarian). Ini adalah proses teknis untuk memperoleh keuntungan.'
                                },
                                {
                                    title: 'Paradigma Syariah',
                                    icon: '📖', // (Ikon disarankan)
                                    description: 'Berfokus pada <strong>Falah</strong> (kesejahteraan holistik). Ini adalah aktivitas ibadah dan syukur untuk membuat kekayaan produktif bagi umat.'
                                }
                            ]
                        },
                        {
                            type: 'blockquote',
                            text: 'Suatu kegiatan atau seni mengelola modal... untuk masa depan, baik di dunia maupun di akhirat, sesuai dengan syariat dan ajaran Islam.'
                        },
                        {
                            type: 'paragraph',
                            text: 'Pendekatan ini secara eksplisit didorong dalam sumber-sumber utama hukum Islam. Al-Qur\'an, dalam <strong class="evidence-trigger" data-modal-id="modal-al-hasyr-18">Surah Al-Hasyr, ayat 18</strong>, memerintahkan orang-orang beriman untuk mempersiapkan masa depan. Demikian pula, <strong class="evidence-trigger" data-modal-id="modal-al-baqarah-261">Surah Al-Baqarah, ayat 261</strong>, menyamakan penggunaan kekayaan secara produktif dengan sebutir benih yang menumbuhkan tujuh bulir.'
                        },
                        {
                            type: 'heading',
                            text: 'Fungsi Tujuan Ganda (Dual-Objective Function)'
                        },
                        {
                            type: 'comparisonCards',
                            cards: [
                                {
                                    title: 'Fungsi Tujuan Tunggal (Konvensional)',
                                    icon: '🎯',
                                    description: 'Hanya satu tujuan: <strong>Maksimalisasi pengembalian</strong> yang disesuaikan dengan risiko.'
                                },
                                {
                                    title: 'Fungsi Tujuan Ganda (Syariah)',
                                    icon: '✨', // (Ikon dunia & akhirat)
                                    description: '1. Maksimalkan <strong>pengembalian finansial yang halal</strong>.<br>2. Penuhi <strong>kewajiban sosial-spiritual</strong>.'
                                }
                            ]
                        },
                        {
                            type: 'paragraph',
                            text: 'Setiap keputusan investasi oleh karena itu harus dievaluasi terhadap dua kriteria yang berbeda: kelayakan finansialnya serta diperbolehkannya secara syariah dan dampak sosialnya. Kerangka kerja tujuan ganda ini adalah akar filosofis dari semua perbedaan lainnya.'
                        }
                    ]
                },

                // --- BAGIAN 1.2: REVISI ---
                {
                    title: "1.2 Filosofi Inti dan Tujuan Investasi Islam",
                    content: [
                        {
                            type: 'paragraph',
                            text: 'Landasan ekonomi syariah dibangun di atas pandangan dunia filosofis dan ekonomi yang berbeda yang berasal dari prinsip-prinsip Islam.'
                        },
                        {
                            type: 'heading',
                            text: "Prinsip Filosofis Inti"
                        },
                        {
                            type: 'iconCards',
                            cards: [
                                {
                                    icon: '☝️',
                                    title: "Tauhid (Keesaan Allah)",
                                    text: 'Manusia bukanlah pemilik absolut tetapi wali amanat (khalifah) yang bertugas mengelola sumber daya secara bertanggung jawab.'
                                },
                                {
                                    icon: '⚖️',
                                    title: "'Adl (Keadilan)",
                                    text: 'Mencakup kewajaran, transparansi, dan keseimbangan dalam semua transaksi, serta bebas dari eksploitasi.'
                                },
                                {
                                    icon: '🌍',
                                    title: "Maslahah (Kesejahteraan Umum)",
                                    text: 'Mempromosikan kepentingan publik (manfa\'ah) dan mencegah kerugian (mudharat) bagi masyarakat luas.'
                                }
                            ]
                        },
                        {
                            type: 'heading',
                            text: 'Tujuan Tertinggi: Maqasid al-Shariah'
                        },
                        {
                            type: 'paragraph',
                            text: 'Sementara prinsip-prinsip di atas adalah fondasi, Maqasid al-Shariah (tujuan-tujuan tertinggi Hukum Islam) mengartikulasikan tujuan akhir dari sistem. Ini adalah lima nilai penting yang bertujuan untuk dilindungi oleh hukum:'
                        },
                        {
                            type: 'chipList',
                            items: [
                                'Perlindungan Agama (ad-din)',
                                'Perlindungan Jiwa (an-nafs)',
                                'Perlindungan Akal (al-\'aql)',
                                'Perlindungan Keturunan (an-nasl)',
                                'Perlindungan Harta (al-mal)'
                            ]
                        },
                        {
                            type: 'heading',
                            text: 'Empat Aspek Fundamental Investasi Syariah'
                        },
                        {
                            type: 'paragraph',
                            text: 'Untuk memastikan tercapainya tujuan-tujuan luhur tersebut, setiap investasi dalam Islam harus memenuhi empat aspek fundamental yang tidak terpisahkan:'
                        },
                        {
                            type: 'iconCards',
                            cards: [
                                {
                                    icon: '📊',
                                    title: 'Aspek Material (Finansial)',
                                    text: 'Harus mampu menghasilkan manfaat finansial yang kompetitif dan berkelanjutan.'
                                },
                                {
                                    icon: '✅',
                                    title: 'Aspek Kehalalan',
                                    text: 'Syarat mutlak. Harus terhindar dari segala bidang usaha atau akad yang haram dan syubhat.'
                                },
                                {
                                    icon: '🤝',
                                    title: 'Aspek Sosial & Lingkungan',
                                    text: 'Memberikan kontribusi positif bagi masyarakat luas dan menjaga kelestarian lingkungan.'
                                },
                                {
                                    icon: '🤲',
                                    title: 'Aspek Spiritual (Rida Allah)',
                                    text: 'Motivasi tertinggi dari setiap aktivitas investasi adalah untuk meraih keridaan Allah SWT.'
                                }
                            ]
                        }
                    ]
                },

                // --- BAGIAN 1.3: REVISI ---
                {
                    title: "1.3 Peran dan Fungsi Bank Syariah sebagai Manajer Investasi",
                    content: [
                        {
                            type: 'paragraph',
                            text: 'Dalam ekosistem ini, bank syariah memegang peran sentral sebagai lembaga perantara keuangan (financial intermediary).'
                        },
                        {
                            type: 'heading',
                            text: 'Fungsi Utama: Intermediasi dan Amanah'
                        },
                        {
                            type: 'paragraph',
                            text: 'Fungsi utamanya adalah menghimpun dana dari masyarakat (investor) dan menyalurkannya dalam bentuk pembiayaan atau investasi. Bank Syariah berfungsi sebagai manajer investasi yang profesional dan dapat dipercaya (amanah).'
                        },
                        {
                            type: 'paragraph',
                            text: 'Mandat yang menentukan aktivitas ini adalah prinsip halal. Bank harus secara aktif menyaring (screening), memilih, dan memantau investasinya untuk memastikan investasi tersebut secara eksklusif diarahkan pada proyek dan sektor bisnis yang diizinkan.'
                        },
                        {
                            type: 'heading',
                            text: 'Kewajiban Fidusia Ganda (Dual Fiduciary Duty)'
                        },
                        {
                            type: 'paragraph',
                            text: 'Mandat ini menciptakan kewajiban fidusia ganda yang melampaui manajer investasi konvensional.'
                        },
                        {
                            type: 'comparisonCards',
                            cards: [
                                {
                                    title: 'Kewajiban kepada Klien',
                                    icon: '📈',
                                    description: 'Sama seperti manajer konvensional, Bank Syariah memiliki kewajiban untuk memaksimalkan pengembalian finansial bagi kliennya.'
                                },
                                {
                                    title: 'Kewajiban kepada Prinsip Syariah',
                                    icon: '🕋',
                                    description: 'Secara bersamaan, bank terikat oleh kewajiban kedua yang utama untuk mematuhi prinsip-prinsip Syariah dan fatwa.'
                                }
                            ]
                        },
                        {
                            type: 'heading',
                            text: 'Peran sebagai Distributor dan Fasilitator'
                        },
                        {
                            type: 'paragraph',
                            text: 'Selain sebagai perantara, bank syariah juga berperan sebagai distributor produk-produk pasar modal syariah, menjembatani nasabahnya dengan instrumen seperti Sukuk Ritel dan Reksa Dana Syariah.'
                        },
                        {
                            type: 'calloutBox',
                            icon: '💡',
                            title: 'Inovasi Produk: Shariah Restricted Investment Account (SRIA)',
                            text: 'Bentuk kerja sama (akad Mudharabah Muqayyadah) di mana nasabah (shahibul mal) dapat menetapkan batasan spesifik atas penggunaan dana investasinya. Konsekuensinya, seluruh risiko ditanggung oleh nasabah, bukan oleh bank.'
                        }
                    ]
                },

                // --- BAGIAN 1.4: REVISI ---
                {
                    title: "1.4 Struktur Tata Kelola: Arsitektur Regulasi dan Kepatuhan",
                    content: [
                        {
                            type: 'paragraph',
                            text: 'Untuk memastikan tujuan ganda (finansial dan spiritual) ini tercapai, struktur tata kelola yang unik dan berlapis sangat penting.'
                        },
                        {
                            type: 'heading',
                            text: 'Arsitektur Kepatuhan Berlapis'
                        },
                        {
                            type: 'flowchart',
                            title: 'Alur Otoritas dan Kepatuhan Investasi Syariah',
                            nodes: [
                                {
                                    level: 1,
                                    title: 'DSN-MUI (Dewan Syariah Nasional)',
                                    text: 'Otoritas Fatwa Tertinggi. Memberi fatwa dan rekomendasi untuk anggota DPS.',
                                    span: 2
                                },
                                {
                                    level: 2,
                                    title: 'OJK (Otoritas Jasa Keuangan)',
                                    text: 'Regulator & Pengawas Sektor Jasa Keuangan (termasuk MI).',
                                    span: 1
                                },
                                {
                                    level: 2,
                                    title: 'Bank Indonesia (BI)',
                                    text: 'Otoritas Makroekonomi & Sistem Pembayaran.',
                                    span: 1
                                },
                                {
                                    level: 3,
                                    title: 'Bank Syariah / Manajer Investasi (MI)',
                                    text: 'Pelaksana Operasional Investasi. Bisa berbentuk Perusahaan penuh atau Unit (UPIS).',
                                    span: 2
                                },
                                {
                                    level: 4,
                                    title: 'DPS (Dewan Pengawas Syariah)',
                                    text: 'Pengawas Kepatuhan Internal & Penasihat. Diangkat RUPS atas rekomendasi DSN-MUI.',
                                    span: 2
                                }
                            ]
                        },
                        {
                            type: 'heading',
                            text: 'Komponen Kunci dalam Struktur'
                        },
                        {
                            type: 'comparisonCards',
                            cards: [
                                {
                                    title: 'MI Syariah (Penuh)',
                                    icon: '🏢',
                                    description: 'Perusahaan yang sejak awal didirikan dan menjalankan seluruh operasionalnya berdasarkan prinsip syariah.'
                                },
                                {
                                    title: 'Unit Pengelolaan Investasi Syariah (UPIS)',
                                    icon: '🧩',
                                    description: 'Sebuah unit khusus di dalam perusahaan manajer investasi konvensional yang dibentuk untuk mengelola produk syariah.'
                                }
                            ]
                        },
                        {
                            type: 'heading',
                            text: 'Peran Ganda Dewan Pengawas Syariah (DPS)'
                        },
                        {
                            type: 'comparisonCards',
                            cards: [
                                {
                                    title: 'Penasihat & Pengawas (Gatekeeper)',
                                    icon: '🛡️',
                                    description: 'Mengawasi seluruh kegiatan operasional untuk memastikan kesesuaiannya dengan prinsip syariah dan fatwa DSN-MUI.'
                                },
                                {
                                    title: 'Pendorong Inovasi (Enabler)',
                                    icon: '🚀',
                                    description: 'Berkolaborasi dengan manajemen untuk menemukan jalur yang sesuai syariah untuk memenuhi kebutuhan pasar.'
                                }
                            ]
                        }
                    ]
                },

                // --- BAGIAN 1.5: REVISI ---
                {
                    title: "1.5 Pembeda Utama dari Manajemen Investasi Konvensional",
                    content: [
                        {
                            type: 'paragraph',
                            text: 'Berdasarkan fondasi filosofis dan tata kelola ini, perbedaan utama antara manajemen investasi syariah dan konvensional dapat diringkas sebagai berikut:'
                        },
                        {
                            type: 'iconCards',
                            cards: [
                                {
                                    icon: '🎯',
                                    title: 'Pembeda: Tujuan Akhir',
                                    text: '<strong>Konvensional:</strong> Berfokus tunggal pada maksimalisasi kekayaan material.<br><strong>Syariah:</strong> Mengejar tujuan ganda (profit finansial halal + <strong>falah</strong>).'
                                },
                                {
                                    icon: '📜',
                                    title: 'Pembeda: Landasan Hukum & Etis',
                                    text: '<strong>Konvensional:</strong> Didasarkan pada hukum buatan manusia.<br><strong>Syariah:</strong> Didasarkan pada sumber-sumber ilahi dengan batasan etis yang tidak dapat diubah.'
                                },
                                {
                                    icon: '🛡️',
                                    title: 'Pembeda: Pendekatan Risiko',
                                    text: '<strong>Konvensional:</strong> Hanya mengelola risiko finansial.<br><strong>Syariah:</strong> Menambah lapisan risiko kepatuhan syariah, yang secara struktural cenderung lebih stabil.'
                                }
                            ]
                        }
                    ]
                }
            ]
        }; // Akhir dari _contentData

        // Subscribe to tab changes (Logika Asli Anda)
        this.eventBus.subscribe(AppConfig.EVENTS.TAB_CHANGED, (targetId) => this.handleTabChange(targetId));
    }

    /**
     * Menangani event 'tabChanged' dari AppShell.
     * --- REFACTORED ---
     * Menghapus semua logika 'style.display' untuk menyerahkan
     * kontrol visibilitas sepenuhnya kepada 'app.js' (CSS Router).
     */
    handleTabChange(targetId) {
        // Hanya jalankan jika tab ini yang aktif
        if (targetId !== 'beranda') {
            return;
        }

        // Jangan render ulang jika sudah diinisialisasi
        if (this.hasInitialized) {
            return;
        }

        // Render konten dan siapkan listener HANYA SEKALI
        this.render();
        this.setupModalListeners(); // Menambahkan pemicu untuk Modal
        this.hasInitialized = true;

        // Kirim event untuk memberitahu KurikulumModule agar merender kontennya.
        this.eventBus.publish('renderKurikulum', targetId);
    }

    /**
     * Merender konten untuk tab "Beranda".
     * Ini adalah "Mesin Renderer" baru untuk modul ini.
     */
    render() {
        // --- 2. LOGIKA PRESENTASI (RENDERER) ---
        let html = '';

        // --- 2a. Render Hero Section ---
        const hero = this._contentData.hero;
        if (hero) {
            html += `<div class="hero-section bg-brand-light p-8 md:p-12 text-center rounded-lg mb-8 border border-brand-accent/30 shadow-sm">`;
            html += `<h1 class="font-serif text-4xl md:text-5xl text-brand-dark mb-4">${hero.title}</h1>`;
            html += `<p class="font-sans text-xl text-brand-dark/80 max-w-3xl mx-auto mb-8">${hero.subtitle}</p>`;

            // Render Key Stats (Callouts)
            html += `<div class="flex flex-col md:flex-row justify-center gap-4">`;
            hero.keyStats.forEach(stat => {
                html += `<div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1">
                             <span class="text-2xl">${stat.icon}</span>
                             <p class="text-sm text-gray-500">${stat.label}</p>
                             <p class="font-semibold text-lg text-brand-dark">${stat.value}</p>
                         </div>`;
            });
            html += `</div></div>`;
        }

        // --- 2b. Render Content Sections ---
        this._contentData.sections.forEach(section => {
            // Buat "card" baru untuk setiap bagian
            html += `<div class="p-8 bg-white rounded-lg shadow-md mb-6">`;
            html += `<h3 class="font-serif text-2xl text-brand-dark mb-4">${section.title}</h3>`;

            // Loop melalui item konten di bagian itu
            section.content.forEach(item => {
                switch (item.type) {
                    // --- Tipe Asli ---
                    case 'paragraph':
                        html += `<p class="font-sans text-brand-dark/80 leading-relaxed mb-4">${item.text}</p>`;
                        break;
                    case 'heading':
                        html += `<h4 class="font-sans text-lg font-semibold text-brand-dark mt-6 mb-2">${item.text}</h4>`;
                        break;
                    case 'list':
                        html += `<ul class="list-disc list-inside space-y-2 mb-4 pl-4 font-sans text-brand-dark/80 leading-relaxed">`;
                        item.items.forEach(li => html += `<li>${li}</li>`);
                        html += `</ul>`;
                        break;
                    case 'blockquote':
                        html += `<blockquote class="border-l-4 border-brand-accent bg-brand-light p-4 my-4 italic text-brand-dark/90">
                                     ${item.text}
                                 </blockquote>`;
                        break;

                    // --- Tipe Komponen Baru ---
                    case 'comparisonCards':
                        html += this.buildComparisonCards(item.cards);
                        break;
                    case 'iconCards':
                        html += this.buildIconCards(item.cards);
                        break;
                    case 'chipList':
                        html += this.buildChipList(item.items);
                        break;
                    case 'calloutBox':
                        html += this.buildCalloutBox(item);
                        break;
                    case 'flowchart':
                        html += this.buildFlowchart(item.title, item.nodes);
                        break;
                }
            });

            html += `</div>`; // Tutup card
        });

        // --- 2c. Injeksi HTML dan Penyediaan Slot Kurikulum ---

        // 1. Injeksi konten utama "Beranda"
        this.section.innerHTML = html;

        // 2. (PERBAIKAN BUG) Hapus panggilan manual yang salah.
        // Panggilan ini redundan karena KurikulumModule sudah mendengarkan
        // event 'TAB_CHANGED' secara mandiri.
        // this.kurikulumModule._buildHTML(this.section, 'beranda'); // <-- DIHAPUS

        // 3. (PERBAIKAN ARSITEKTUR) Buat slot khusus.
        // Sesuai pembaruan kita di KurikulumModule, modul itu sekarang
        // akan secara otomatis mencari 'beranda-kurikulum-slot'
        // dan menempatkan kontennya di sini.
        const kurikulumSlot = document.createElement('div');
        kurikulumSlot.id = "beranda-kurikulum-slot";
        this.section.appendChild(kurikulumSlot);
    }

    // --- 3. FUNGSI HELPER BARU ---

    /**
     * Membangun 2 kartu perbandingan berdampingan.
     * @param {Array<object>} cards - Array (2) objek kartu.
     * @returns {string} HTML untuk grid kartu.
     */
    buildComparisonCards(cards) {
        let cardHtml = '<div class="grid md:grid-cols-2 gap-6 my-6">';
        cards.forEach(card => {
            let iconHtml = card.icon ? `<span class="text-2xl mr-3">${card.icon}</span>` : '';
            cardHtml += `<div class="border-l-4 border-brand-accent p-6 bg-brand-light rounded-r-lg shadow-sm">
                            <div class="flex items-center mb-2">
                                ${iconHtml}
                                <h5 class="font-semibold text-lg text-brand-dark">${card.title}</h5>
                            </div>
                            <p class="text-brand-dark/80">${card.description}</p>
                         </div>`;
        });
        cardHtml += '</div>';
        return cardHtml;
    }

    /**
     * Membangun grid kartu ikon (untuk 3 atau 4 item).
     * @param {Array<object>} cards - Array (3 atau 4) objek kartu.
     * @returns {string} HTML untuk grid kartu.
     */
    buildIconCards(cards) {
        // Otomatis menyesuaikan grid untuk 3 atau 4 kartu
        const colClass = cards.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3';
        let cardHtml = `<div class="grid ${colClass} gap-4 my-6">`;

        cards.forEach(card => {
            cardHtml += `<div class="bg-gray-50 p-6 rounded-lg text-center border border-gray-200 shadow-sm">
                            <span class="text-4xl">${card.icon}</span>
                            <h5 class="font-semibold text-lg text-brand-dark mt-2 mb-1">${card.title}</h5>
                            <p class="text-sm text-brand-dark/80">${card.text}</p>
                         </div>`;
        });
        cardHtml += '</div>';
        return cardHtml;
    }

    /**
     * Membangun daftar "chip" (pil/tag) visual.
     * @param {string[]} items - Array string untuk ditampilkan sebagai chip.
     * @returns {string} HTML untuk chip list.
     */
    buildChipList(items) {
        let listHtml = '<div class="flex flex-wrap gap-3 my-4">';
        items.forEach(item => {
            listHtml += `<span class="bg-brand-light text-brand-dark font-medium px-4 py-2 rounded-full border border-brand-accent/30 shadow-sm">
                             ${item}
                         </span>`;
        });
        listHtml += '</div>';
        return listHtml;
    }

    /**
     * Membangun "Callout Box" (Kotak Info) visual.
     * @param {object} item - Objek data dengan { icon, title, text }.
     * @returns {string} HTML untuk callout box.
     */
    buildCalloutBox(item) {
        let iconHtml = item.icon ? `<span class="text-3xl mr-4">${item.icon}</span>` : '';
        return `<div class="bg-brand-light/60 border-l-4 border-brand-accent p-6 my-6 rounded-r-lg shadow-sm">
                    <div class="flex items-center">
                        ${iconHtml}
                        <h5 class="font-semibold text-xl text-brand-dark">${item.title}</h5>
                    </div>
                    <p class="text-brand-dark/90 mt-2 ${item.icon ? 'pl-11' : ''}">
                        ${item.text}
                    </p>
                </div>`;
    }

    /**
     * Membangun diagram alir (flowchart) visual dari data node.
     * @param {string} title - Judul untuk diagram alir.
     * @param {Array<object>} nodes - Array objek node.
     * @returns {string} HTML untuk diagram alir.
     */
    buildFlowchart(title, nodes) {
        let chartHtml = `<div class="bg-gray-50 border border-gray-200 p-6 rounded-lg my-6">
                            <h5 class="font-semibold text-xl text-brand-dark text-center mb-6">${title}</h5>
                            <div class="grid grid-cols-2 gap-4">`;

        let currentLevel = 1;
        nodes.forEach((node) => {
            if (node.level > currentLevel) {
                chartHtml += `<div class="col-span-2 text-center text-gray-400 text-3xl font-light">↓</div>`;
                currentLevel = node.level;
            }

            const spanClass = node.span === 2 ? 'col-span-2' : 'col-span-1';

            let styleClass = '';
            switch(node.level) {
                case 1: styleClass = 'bg-brand-dark text-white shadow-lg'; break;
                case 2: styleClass = 'bg-brand-accent/60 text-brand-dark border border-brand-accent'; break;
                case 3: styleClass = 'bg-white border border-gray-300 shadow-sm'; break;
                case 4: styleClass = 'bg-brand-light border-l-4 border-brand-accent text-brand-dark'; break;
                default: styleClass = 'bg-gray-100';
            }

            chartHtml += `<div class="${spanClass}">
                              <div class="h-full p-4 rounded-lg ${styleClass}">
                                  <p class="font-semibold text-lg">${node.title}</p>
                                  <p class="text-sm">${node.text}</p>
                              </div>
                          </div>`;
        });

        chartHtml += `</div></div>`;
        return chartHtml;
    }

    /**
     * Menyiapkan listener untuk "Evidence Locker" (Modal).
     * Ini hanya dipanggil sekali saat inisialisasi.
     */
    setupModalListeners() {
        const backdrop = document.getElementById('modal-backdrop');
        const allModals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.modal-close-btn');

        const closeModal = () => {
            allModals.forEach(modal => modal.classList.add('hidden'));
            backdrop.classList.add('hidden');
        };

        // Pemicu untuk menutup
        backdrop.addEventListener('click', closeModal);
        closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

        // Pemicu untuk membuka (menggunakan event delegation)
        this.section.addEventListener('click', (e) => {
            const trigger = e.target.closest('.evidence-trigger');
            if (trigger) {
                const modalId = trigger.dataset.modalId;
                const modal = document.getElementById(modalId);
                if (modal) {
                    backdrop.classList.remove('hidden');
                    modal.classList.remove('hidden');
                }
            }
        });
    }
}
