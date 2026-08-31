# Siteye içerik nasıl eklerim?

İki yol var. İkisi de aynı sonucu verir — dosyalar repoya girer, GitHub Pages
birkaç dakika içinde siteyi yeniden derler.

---

## Yol 1 — Claude Code ile (en kolay)

Repoyu Claude Code'da açıp ne istediğini söyle:

> "Yeni bir thought ekle: başlığı 'Transformer'ları neden anlamıyoruz', konusu …"

> "`~/Desktop/ppo-notlari.pdf` dosyasını RL kategorisine 'PPO' başlığıyla ekle."

> "Papers'a şu makaleyi ekle: <arxiv linki>"

Claude repo kökündeki `CLAUDE.md` dosyasını otomatik okur; oradaki şemalara göre
dosyayı doğru yere, doğru front matter ile oluşturur, derleyip commit eder.

`/add-content` yazarak da adım adım ilerleyebilirsin.

---

## Yol 2 — Elle

### Blog yazısı (Thoughts)

1. `content/templates/thought.md` dosyasını kopyala →
   `_thoughts/yazinin-adi.md`
   (dosya adı: küçük harf, tire, Türkçe karakter yok)
2. Front matter'ı doldur, `#` ile başlayan açıklama satırlarını sil.
3. Markdown olarak yaz.

### Çalışma notu (Study Notes)

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

İstersen üçünü birleştir: kısa bir özet yaz, altına PDF'i ekle.

`category:` alanına şu değerlerden birini yaz — not, Notes sayfasında o başlık
altında gruplanır:

| Yazacağın değer | Sayfada görünen ad |
|-----------------|--------------------|
| `rl`            | RL                 |
| `dl`            | DL                 |
| `llm`           | LLM                |
| `math`          | Math & Algebra     |

Boş bırakırsan ya da listede olmayan bir şey yazarsan not, sayfanın sonundaki
**Other** başlığı altına düşer. Yeni kategori eklemek için `_config.yml`
dosyasındaki `note_categories` listesine bir satır ekle.

### Yayın (Papers)

`content/templates/paper.yml` içindeki bloğu `_data/papers.yml` dosyasının
sonuna yapıştır ve doldur. Girintiler önemli.

### Proje (Projects)

`content/templates/project.yml` içindeki bloğu `_data/projects.yml` sonuna
yapıştır.

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
- Hakkımda metni → `index.md`
- Renkler ve fontlar → `assets/css/main.css` (en üstteki `:root` bloğu)
