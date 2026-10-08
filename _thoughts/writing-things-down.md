---
title: "Yazıya dökmek"
date: 2026-08-31
tags: [meta, notes]
excerpt: "Neden not tutuyorum ve bu sitenin ne işe yaradığı üzerine kısa bir yazı."
math: false
lang: tr
---

Bu, sitedeki örnek yazı. Silebilirsin ya da üzerine kendi yazını yazabilirsin —
tema kontrolü için buradaki her öğe bilerek kullanıldı.

## Neden yazıyorum

Bir şeyi anladığımı sanmakla gerçekten anlamak arasındaki farkı en hızlı
yazarken görüyorum. Cümle kurulmuyorsa, düşünce de kurulmamış demektir.

> Notlar geleceğe yazılmış mektuplardır — ve gelecekteki sen, bugünkü senin
> neyi kastettiğini hatırlamayacak.

## Biçimler

- **Ders Notları** — ders ve çalışma notları, uzun ve teknik
- **Düşünceler** — buradaki gibi, daha serbest yazılar
- **Yayınlar** — makaleler ve ön baskılar

Kod da düzgün görünüyor:

```python
def summarize(notes: list[str]) -> str:
    return "\n".join(f"- {n.strip()}" for n in notes if n.strip())
```

Ve satır içi `kod`, [bağlantı](https://jekyllrb.com/) ve tablolar:

| Bölüm       | Kaynak             | Biçim              |
|-------------|--------------------|--------------------|
| Düşünceler  | `_thoughts/`       | Markdown           |
| Ders Notları| `_notes/`          | Markdown + PDF/JPG |
| Yayınlar    | `_data/papers.yml` | YAML               |
