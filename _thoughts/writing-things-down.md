---
title: "Writing things down"
date: 2026-08-31
tags: [meta, notes]
excerpt: "Neden not tutuyorum ve bu sitenin ne işe yaradığı üzerine kısa bir yazı."
math: false
---

Bu, sitedeki örnek yazı. Silebilirsin ya da üzerine kendi yazını yazabilirsin —
tema kontrolü için buradaki her öğe bilerek kullanıldı.

## Neden yazıyorum

Bir şeyi anladığımı sanmakla gerçekten anlamak arasındaki farkı en hızlı
yazarken görüyorum. Cümle kurulmuyorsa, düşünce de kurulmamış demektir.

> Notlar geleceğe yazılmış mektuplardır — ve gelecekteki sen, bugünkü senin
> neyi kastettiğini hatırlamayacak.

## Biçimler

- **Lectures** — ders ve çalışma notları, uzun ve teknik
- **Thoughts** — buradaki gibi, daha serbest yazılar
- **Papers** — yayınlar
- **Projects** — yapılmış işler

Kod da düzgün görünüyor:

```python
def summarize(notes: list[str]) -> str:
    return "\n".join(f"- {n.strip()}" for n in notes if n.strip())
```

Ve satır içi `kod`, [bağlantı](https://jekyllrb.com/) ve tablolar:

| Bölüm    | Kaynak            | Biçim    |
|----------|-------------------|----------|
| Thoughts | `_thoughts/`      | Markdown |
| Lectures | `_lectures/`      | Markdown + PDF/JPG |
| Papers   | `_data/papers.yml`| YAML     |
