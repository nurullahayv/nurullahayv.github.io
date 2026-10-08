# nurullahayv.github.io

Kişisel site — ders notları, yazılar ve yayınlar. Türkçe (ana dil) ve İngilizce.
Jekyll ile yazılmış, GitHub Pages tarafından otomatik derleniyor.

**<https://nurullahayv.github.io>**

## Yeni içerik eklemek

👉 **[content/README.md](content/README.md)** — adım adım rehber
(yazı, ders notu, PDF yükleme, yayın).

Claude Code ile çalışıyorsan repo kökündeki [`CLAUDE.md`](CLAUDE.md) dosyası
tüm şemaları ve kuralları içerir; `/add-content` komutu da kullanılabilir.

## Yapı

```
index.md, en/index.md Ders notları listesi (ana sayfa)  → /  ve  /en/
_notes/               Ders notları             → /notes/<slug>/
_thoughts/            Düşünceler (blog)        → /thoughts/
_data/papers.yml      Yayınlar                 → /papers/
_data/i18n.yml        Arayüz metinleri (TR/EN)
en/                   İngilizce liste sayfaları → /en/...
assets/notes/         PDF ve taranmış notlar
assets/css/main.css   Tema (renkler en üstteki :root bloğunda)
content/templates/    Kopyala-yapıştır içerik şablonları
```

## Yerel önizleme

```bash
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000
```

Şart değil — push edip canlı siteden de kontrol edebilirsin.
