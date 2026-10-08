# nurullahayv.github.io — repo rehberi

Bu, GitHub Pages üzerinde yayınlanan kişisel bir Jekyll sitesidir.
Ana dala (`main`) push edilen her değişiklik GitHub tarafından otomatik derlenir.
**Ekstra bir CI/build adımı yoktur ve eklenmemelidir.**

Site: <https://nurullahayv.github.io>

## Site yapısı

| Ne                        | Nereye                | Biçim              | URL                    |
|---------------------------|-----------------------|--------------------|------------------------|
| Ders notları (ana sayfa)  | `_notes/*.md`         | Markdown + PDF/JPG | `/` (liste), `/notes/<slug>/` |
| Düşünceler (blog)         | `_thoughts/*.md`      | Markdown           | `/thoughts/<slug>/`    |
| Yayınlar                  | `_data/papers.yml`    | YAML kaydı         | `/papers/` (liste)     |
| Arayüz metinleri (TR/EN)  | `_data/i18n.yml`      | YAML               | —                      |
| Testler (soru listesi)    | `_data/quizzes/*.yml` | YAML               | bir `_notes/` sayfası üzerinden |
| PDF / HTML / taranmış notlar | `assets/notes/`    | dosya              | `/assets/notes/<dosya>` |
| Görseller                 | `assets/img/`         | dosya              | —                      |

Site iki dillidir: Türkçe sayfalar kökte (`/`, `/thoughts/`, `/papers/`), İngilizce
sayfalar `/en/` altında (`en/index.md`, `en/thoughts.html`, `en/papers.html`).
Listeleme mantığı `_includes/list-*.html` içinde ortaktır; arayüz metinleri
`_data/i18n.yml`'dedir. Bu sitede "About" ve "Projects" sayfaları yoktur.

Şablonlar `content/templates/` içindedir. Yeni içerik eklerken **her zaman ilgili
şablondan başla** — alan adları ve zorunlu alanlar orada tanımlı.

Diğer dosyalar: `_layouts/` (sayfa iskeletleri), `_includes/` (nav, footer,
liste bileşeni), `assets/css/main.css` (tek stil dosyası, tema renkleri en üstte),
`_config.yml` (site ayarları ve sosyal linkler), `feed.xml` (elle yazılmış Atom akışı).

## Dosya adlandırma

Slug'lar **ASCII, küçük harf, tire ayraçlı** olmalı — URL'e doğrudan girer.
Türkçe karakterleri çevir:

    ı → i    ş → s    ğ → g    ü → u    ö → o    ç → c
    İ → i    Ş → s    Ğ → g    Ü → u    Ö → o    Ç → c

Örnek: "Doğrusal Cebir — 4. Hafta" → `_notes/dogrusal-cebir-4-hafta.md`

Dosya adına tarih ÖNEKİ ekleme (`2026-01-01-...` gibi) — tarih front matter'daki
`date` alanından okunur, dosya adına girerse URL'i çirkinleştirir.

## Yeni içerik ekleme adımları

1. `content/templates/` içinden doğru şablonu al.
2. Hedef dizine kopyala (`_thoughts/`, `_notes/`) ya da ilgili YAML dosyasının
   sonuna kaydı ekle (`_data/papers.yml`).
3. Front matter'ı doldur. Şablondaki açıklama satırlarını (`#` ile başlayanları) sil.
4. PDF/görsel varsa dosyayı `assets/notes/` veya `assets/img/` altına koy,
   yolunu `/assets/...` şeklinde (baştaki `/` ile) yaz.
5. Derleyip doğrula:
   ```
   bundle exec jekyll build --strict_front_matter
   ```
   Sıfır hata vermeli. Yerel Ruby yoksa en azından YAML front matter'ın geçerli
   olduğunu kontrol et.
6. Anlamlı bir commit mesajıyla commit et ve push et.

## Front matter şemaları

### `_thoughts/<slug>.md`
| Alan      | Zorunlu | Not |
|-----------|---------|-----|
| `title`   | evet    | tırnak içinde |
| `date`    | evet    | `YYYY-MM-DD` |
| `tags`    | hayır   | `[a, b]` |
| `excerpt` | hayır   | yoksa ilk paragraf otomatik kullanılır |
| `math`    | hayır   | `true` ise KaTeX yüklenir |
| `lang`    | hayır   | `tr` (varsayılan) veya `en` — içeriğin yazıldığı dil |
| `alt_url` | hayır   | Aynı içeriğin diğer dildeki çevirisinin yolu; dil değiştirme bağlantısı oraya gider |
| `published` | hayır | `false` ise sayfa hiç üretilmez (taslak) |

Liste sayfaları iki dilde de tüm içeriği gösterir; içeriğin dili sayfanın dilinden
farklıysa yanında küçük bir `TR`/`EN` etiketi çıkar.

### `_notes/<slug>.md`  (Ders Notları / Lecture Notes)
Yukarıdakilerin tümü, artı:

| Alan       | Zorunlu | Not |
|------------|---------|-----|
| `category` | hayır   | `sayisal`, `rl`, `dl`, `llm` veya `math` — ana sayfadaki gruplama |
| `order`    | hayır   | Kategori içindeki sıra (ör. bölüm numarası). `order` olan notlar küçükten büyüğe öne dizilir, olmayanlar tarihe göre (yeniden eskiye) arkadan gelir |
| `pdf`      | hayır   | tek dosya yolu — sayfaya gömülür + indirme butonu |
| `html`     | hayır   | kendi içinde çalışan tek bir `.html` dosyasının yolu — sayfaya geniş bir iframe olarak gömülür + "Tam ekranda aç" butonu |
| `images`   | hayır   | dosya yolları listesi — sırayla gösterilir |
| `layout: quiz` + `quiz` | hayır | Not yerine etkileşimli test sayfası üretir; `quiz:` değeri `_data/quizzes/<ad>.yml` dosyasının adıdır |

Kullanım biçimleri: sadece metin, sadece PDF/HTML/görsel, ya da metin ve ek dosya birlikte.

**HTML ders sayfaları** (ör. animasyonlu ders eşlikçileri) dosya olarak `assets/notes/<slug>.html`
altına konur ve dokunulmadan yayınlanır; front matter'ı olmadığı için Jekyll onları işlemez.
Not sayfası `html: /assets/notes/<slug>.html` ile gömer.

**Testler**: sorular `_data/quizzes/<ad>.yml` dosyasındadır (şema: `content/templates/quiz.yml`).
Sayfa `_notes/<ad>-testi.md` olarak açılır, front matter'da `layout: quiz` ve `quiz: <ad>` olur.
Cevaplar tarayıcıda denetlenir; cevap anahtarı sayfanın kaynağında görünür (sınıf içi alıştırma
içindir, not verilen sınav için değildir). Soru eklerken cevapları mutlaka hesaplayarak doğrula.

`_config.yml > quiz_endpoint` doluysa testlerde öğrenci numarası alanı ve "Cevapları gönder"
düğmesi çıkar; cevaplar o adresteki Google Apps Script'e (`content/google-apps-script/test-cevaplari.gs`)
gönderilir ve öğretmenin Google Sheets tablosuna yazılır. Boşsa bu özellik görünmez.
Kurulum: `content/README.md` > "Öğrenci cevaplarını toplamak".

**Kategoriler** `_config.yml` içindeki `note_categories` listesinde tanımlı.
Ana sayfa bu listedeki sırayla gruplar; boş kategori başlığı basılmaz.
Geçerli bir `key` ile eşleşmeyen (veya `category` alanı olmayan) notlar sayfanın
sonunda **Diğer / Other** başlığı altına düşer.

| `key`     | Türkçe ad          | İngilizce ad   |
|-----------|--------------------|----------------|
| `sayisal` | Sayısal Tasarım    | Digital Design |
| `rl`   | RL                 | RL             |
| `dl`   | DL                 | DL             |
| `llm`  | LLM                | LLM            |
| `math` | Matematik ve Cebir | Math & Algebra |

Yeni kategori gerekiyorsa `_config.yml > note_categories` listesine `key`,
`name_tr` ve `name_en` alanlarıyla ekle — başka hiçbir yeri değiştirmen gerekmez.

### `_data/papers.yml`
`title` ve `year` zorunlu. `authors`, `venue`, `month`, `abstract`, `links` opsiyonel.
`month` İngilizce ay adı olarak yazılır (`August`); Türkçe sayfada otomatik `Ağustos` görünür.
`month` verilirse venue satırının sonuna `· Ağustos 2026` biçiminde eklenir.
`links` altındaki her anahtar (pdf, arxiv, code, doi…) sayfada bir buton olur;
anahtar adı butonun etiketidir. Başlık; `pdf`, `arxiv` ya da `doi` linklerinden
ilk bulunana bağlanır.

## Matematik (LaTeX)

Front matter'da `math: true` olan sayfalarda KaTeX yüklenir.
- Satır içi: `$x^2$` veya `\(x^2\)`
- Blok: `$$ ... $$` veya `\[ ... \]`

`math: true` olmayan sayfada `$` işareti düz metin olarak kalır. Para birimi vb.
nedenlerle `$` geçen bir yazıda `math: true` kullanma.

## Yapma

- `_site/` klasörünü commit etme (`.gitignore`'da zaten var).
- `_config.yml` içindeki `plugins:` listesine yeni eklenti ekleme — GitHub Pages
  sadece `jekyll-seo-tag` ve `jekyll-sitemap` gibi beyaz listedeki eklentileri
  çalıştırır; başkası eklenirse site sessizce eski halinde kalır.
- Kök dizine elle `index.html`, `style.css` gibi dosyalar koyma; sayfalar
  `_layouts/` + `_includes/` üzerinden üretilir.
- GitHub Actions workflow'u ekleme — GitHub Pages derlemeyi kendisi yapar.
- `.md` dosyalarında ham `<div>` içine Markdown yazma; kramdown onu işlemez
  (gerekiyorsa etikete `markdown="1"` ekle).

## Tema

Renkler ve fontlar `assets/css/main.css` başındaki `:root` değişkenlerinde.
Açık/koyu tema `prefers-color-scheme` ile otomatik. Fontlar Google Fonts'tan
gelir (Newsreader / Inter / JetBrains Mono) ve hepsinin sistem yedeği vardır.
