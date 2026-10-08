---
# Konum:  _notes/<slug>.md        (örn. _notes/policy-gradients.md)
# URL:    /notes/<slug>/
# Dosya adı ASCII olmalı: küçük harf + tire. Türkçe karakter kullanma.

title: "Notun başlığı"          # ZORUNLU
category: rl                    # opsiyonel — geçerli değerler: rl, dl, llm, math
                                # (liste _config.yml > note_categories içinde;
                                #  eşleşmeyen not "Diğer / Other" başlığı altına düşer)
date: 2026-01-01                # ZORUNLU — YYYY-MM-DD
tags: [etiket]                  # opsiyonel
excerpt: "Liste sayfasında görünecek kısa özet."   # opsiyonel
math: true                      # LaTeX kullanacaksan true
lang: tr                        # tr (varsayılan) | en — notun yazıldığı dil
# alt_url: /notes/baska-dilde-slug/   # opsiyonel — çevirisi varsa yolu
published: true                 # false yaparsan sayfa hiç üretilmez (taslak)

# --- Ek dosyalar (üçü de opsiyonel, birlikte de kullanılabilir) ---
# PDF: dosyayı assets/notes/ içine koy, sonra yolunu buraya yaz.
# pdf: /assets/notes/ders-4.pdf
#
# Taranmış/fotoğraflanmış sayfalar: dosyaları assets/notes/ içine koy.
# images:
#   - /assets/notes/ders-4-s1.jpg
#   - /assets/notes/ders-4-s2.jpg
---

Gövde metni opsiyonel.

- Sadece PDF/görsel yüklüyorsan burayı boş bırakabilirsin.
- Notu doğrudan yazıyorsan pdf/images satırlarını hiç ekleme.
- İkisini birden de yapabilirsin: kısa bir özet yaz, altına PDF'i ekle.
