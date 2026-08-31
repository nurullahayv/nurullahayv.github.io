# nurullahayv.github.io

Kişisel site — hakkımda, ders notları, yazılar, yayınlar ve projeler.
Jekyll ile yazılmış, GitHub Pages tarafından otomatik derleniyor.

**<https://nurullahayv.github.io>**

## Yeni içerik eklemek

👉 **[content/README.md](content/README.md)** — adım adım rehber
(yazı, ders notu, PDF yükleme, yayın, proje).

Claude Code ile çalışıyorsan repo kökündeki [`CLAUDE.md`](CLAUDE.md) dosyası
tüm şemaları ve kuralları içerir; `/add-content` komutu da kullanılabilir.

## Yapı

```
index.md              Hakkımda (landing)
_notes/               Çalışma notları          → /notes/
_thoughts/            Blog yazıları            → /thoughts/
_data/papers.yml      Yayınlar                 → /papers/
_data/projects.yml    Projeler                 → /projects/
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
