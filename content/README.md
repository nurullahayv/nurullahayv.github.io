# Siteye içerik nasıl eklerim?

İki yol var. İkisi de aynı sonucu verir — dosyalar repoya girer, GitHub Pages
birkaç dakika içinde siteyi yeniden derler.

---

## Yol 1 — Claude Code ile (en kolay)

Repoyu Claude Code'da açıp ne istediğini söyle:

> "Yeni bir thought ekle: başlığı 'Transformer'ları neden anlamıyoruz', konusu …"

> "`~/Desktop/ppo-notlari.pdf` dosyasını RL kategorisine 'PPO' başlığıyla ekle."

> "Yayınlar'a şu makaleyi ekle: <arxiv linki>"

Claude repo kökündeki `CLAUDE.md` dosyasını otomatik okur; oradaki şemalara göre
dosyayı doğru yere, doğru front matter ile oluşturur, derleyip commit eder.

`/add-content` yazarak da adım adım ilerleyebilirsin.

---

## Yol 2 — Elle

### Düşünce / blog yazısı (Thoughts)

1. `content/templates/thought.md` dosyasını kopyala →
   `_thoughts/yazinin-adi.md`
   (dosya adı: küçük harf, tire, Türkçe karakter yok)
2. Front matter'ı doldur, `#` ile başlayan açıklama satırlarını sil.
3. Markdown olarak yaz.

### Ders notu (Lecture Notes)

`content/templates/note.md` → `_notes/notun-adi.md`

Üç kullanım biçimi var:

**a) Doğrudan metin yazmak** — `pdf` ve `images` satırlarını hiç ekleme, notu
Markdown olarak yaz.

**b) PDF yüklemek** — PDF'i `assets/notes/` içine koy, front matter'a ekle:
```yaml
pdf: /assets/notes/ppo-notlari.pdf
```
PDF sayfaya gömülü görünür, ayrıca indirme butonu çıkar.

**c) Taranmış/fotoğraflanmış sayfalar** — görselleri `assets/notes/` içine koy:
```yaml
images:
  - /assets/notes/ppo-s1.jpg
  - /assets/notes/ppo-s2.jpg
```

**d) HTML ders sayfası** — kendi içinde çalışan tek bir `.html` dosyasını (ör. animasyonlu
ders eşlikçisi) `assets/notes/` içine koy, front matter'a ekle:
```yaml
html: /assets/notes/boole-cebri.html
```
Sayfa notun altına geniş bir pencere olarak gömülür; ayrıca "Tam ekranda aç" butonu çıkar.

İstersen birleştir: kısa bir özet yaz, altına PDF'i ya da HTML'i ekle.

Aynı kategorideki notları bölüm sırasıyla göstermek için `order: 3` gibi bir sıra numarası ver.

### Test (etkileşimli alıştırma)

1. `content/templates/quiz.yml` → `_data/quizzes/<ad>.yml` olarak kopyala ve soruları yaz.
2. `_notes/<ad>-testi.md` oluştur:
   ```yaml
   ---
   title: "Test — Konu adı"
   category: sayisal
   date: 2026-10-08
   layout: quiz
   quiz: <ad>
   ---
   Kısa bir açıklama.
   ```
Öğrenciler her soruyu tek tek kontrol eder, sonunda puanlarını görür. Cevap anahtarı
sayfanın kaynağında görünür; sınıf içi alıştırma içindir, not verilen sınav için değildir.

`category:` alanına şu değerlerden birini yaz — not, Notes sayfasında o başlık
altında gruplanır:

| Yazacağın değer | Türkçe ad          | İngilizce ad   |
|-----------------|--------------------|----------------|
| `sayisal`       | Sayısal Tasarım    | Digital Design |
| `rl`            | RL                 | RL             |
| `dl`            | DL                 | DL             |
| `llm`           | LLM                | LLM            |
| `math`          | Matematik ve Cebir | Math & Algebra |

Boş bırakırsan ya da listede olmayan bir şey yazarsan not, sayfanın sonundaki
**Diğer / Other** başlığı altına düşer. Yeni kategori eklemek için `_config.yml`
dosyasındaki `note_categories` listesine `key`, `name_tr` ve `name_en` ile bir blok ekle.

**Dil:** Not ya da yazı İngilizce ise front matter'a `lang: en` ekle (varsayılan `tr`).
İki dilli sitede liste sayfaları her iki dilde de tüm içeriği gösterir; dili
sayfadan farklı olanın yanında `TR`/`EN` etiketi çıkar. Aynı içeriğin çevirisini
yazarsan, iki dosyaya da birbirinin yolunu `alt_url:` olarak yaz — dil değiştirme
bağlantısı doğrudan çeviriye gider.

### Yayın (Papers)

`content/templates/paper.yml` içindeki bloğu `_data/papers.yml` dosyasının
sonuna yapıştır ve doldur. Girintiler önemli.

---

## Yayınlamadan önce gizlemek

Front matter'a `published: false` ekle — dosya repoda durur ama site derlenirken
hiç üretilmez, yani kimse URL'i bilse bile açamaz. Hazır olunca `true` yap veya
satırı sil.

## Matematik

Sayfanın front matter'ına `math: true` ekle. Sonra `$x^2$` (satır içi) ve
`$$ ... $$` (blok) çalışır.

## Siteyi bilgisayarında önizlemek (opsiyonel)

Ruby kuruluysa:

```bash
bundle install          # ilk seferde
bundle exec jekyll serve
```

Sonra <http://127.0.0.1:4000> adresini aç. Dosyaları kaydettikçe otomatik
yenilenir. Bu adım şart değil — doğrudan push edip canlı siteden de
kontrol edebilirsin.

## Kişisel bilgileri değiştirmek

- İsim, açıklama, e-posta, sosyal linkler → `_config.yml`
- Menü ve arayüz metinleri (TR/EN) → `_data/i18n.yml`
- Renkler ve fontlar → `assets/css/main.css` (en üstteki `:root` bloğu)
