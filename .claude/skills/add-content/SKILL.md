---
name: add-content
description: Bu kişisel siteye yeni içerik ekler — blog yazısı (thought), çalışma notu (study note; metin ya da PDF/görsel), yayın (paper) veya proje. Kullanıcı yeni bir yazı, not, makale, PDF veya proje eklemek istediğinde kullan.
---

# Siteye içerik ekle

Bu repo bir Jekyll sitesidir. Dizin yapısı, front matter şemaları ve
adlandırma kuralları için önce repo kökündeki `CLAUDE.md` dosyasını oku.

## Adımlar

### 1. Ne eklendiğini belirle

Kullanıcının isteğinden çıkar. Belirsizse `AskUserQuestion` ile sor:

| Tür | Hedef | Şablon |
|-----|-------|--------|
| Blog yazısı / deneme | `_thoughts/<slug>.md` | `content/templates/thought.md` |
| Çalışma notu (Study Notes) | `_notes/<slug>.md` | `content/templates/note.md` |
| Yayın / makale | `_data/papers.yml` (sona ekle) | `content/templates/paper.yml` |
| Proje | `_data/projects.yml` (sona ekle) | `content/templates/project.yml` |

### 2. Slug üret

Başlıktan ASCII slug türet: küçük harf, boşluk → tire, Türkçe karakterleri
çevir (`ı→i ş→s ğ→g ü→u ö→o ç→c`), noktalama at.
Dosya adına tarih öneki KOYMA.

Aynı adda dosya varsa üzerine yazma — kullanıcıya sor.

### 3. Dosyayı oluştur

Şablonu kopyala, front matter'ı doldur, açıklama (`#`) satırlarını sil.

- `date` verilmediyse bugünün tarihini kullan (`YYYY-MM-DD`).
- `excerpt` verilmediyse yazma — Jekyll ilk paragrafı kullanır.
- İçerikte LaTeX varsa `math: true` yap. `$` sadece para birimi olarak
  geçiyorsa yapma.
- Çalışma notunda `category` alanını doldur. Geçerli değerler `_config.yml`
  içindeki `note_categories` listesinden gelir: `rl`, `dl`, `llm`, `math`.
  Konudan hangisi olduğu açık değilse kullanıcıya sor — uydurma bir değer yazma,
  eşleşmeyen not "Other" altına düşer.

### 4. Ek dosyalar (PDF / görsel)

Kullanıcı bir PDF veya görsel verdiyse:

- PDF ve taranmış notlar → `assets/notes/`
- Proje/yazı görselleri → `assets/img/`

Dosya adını slug ile uyumlu tut (`assets/notes/<slug>.pdf`). Front matter'a
yolu baştaki `/` ile yaz: `pdf: /assets/notes/<slug>.pdf`.
Birden fazla taranmış sayfa varsa `images:` listesini sırayla doldur.

Kullanıcı dosyanın yolunu söyledi ama dosya repoda yoksa, kopyalanması
gerektiğini söyle — var olmayan bir dosyaya link verme.

### 5. Doğrula

```bash
bundle exec jekyll build --strict_front_matter
```

Sıfır hata bekle. Sonra üretilen sayfanın `_site/` altında oluştuğunu ve ilgili
liste sayfasında (`_site/thoughts/index.html`, `_site/notes/index.html` vb.)
göründüğünü kontrol et.

Ruby/Jekyll kurulu değilse derlemeyi atla, ama YAML front matter'ın geçerli
olduğunu doğrula ve kullanıcıya derlemeyi çalıştıramadığını söyle.

### 6. Commit ve push

Anlamlı bir mesajla commit et (örn. `Add lecture note: Probability lecture 6`)
ve mevcut dala push et. Kullanıcı istemedikçe PR açma.

## Dikkat

- `_site/` commit etme.
- `_config.yml` içindeki `plugins:` listesine dokunma.
- Taslak isteniyorsa `published: false` ekle — dosya repoda kalır ama sayfa hiç
  üretilmez. (Jekyll'in kendi alanı; `draft` diye bir alan yok.)
