---
title: "Week 3 — Eigenvalues and eigenvectors"
course: "Linear Algebra"
date: 2026-08-20
tags: [linear-algebra]
excerpt: "Özdeğer/özvektör tanımı, karakteristik polinom ve köşegenleştirme."
math: true
---

Bu, **doğrudan metin olarak yazılmış** bir ders notu örneği — ek dosya yok.
`math: true` olduğu için LaTeX çalışıyor.

## Tanım

Bir $A \in \mathbb{R}^{n \times n}$ matrisi için $v \neq 0$ vektörü ve $\lambda$ skaleri

$$
A v = \lambda v
$$

eşitliğini sağlıyorsa, $v$ bir **özvektör**, $\lambda$ da karşılık gelen
**özdeğerdir**.

## Karakteristik polinom

Özdeğerler, karakteristik polinomun kökleridir:

$$
p(\lambda) = \det(A - \lambda I) = 0
$$

## Köşegenleştirme

$A$'nın $n$ tane doğrusal bağımsız özvektörü varsa, $P = [v_1 \; \cdots \; v_n]$
ve $D = \mathrm{diag}(\lambda_1, \dots, \lambda_n)$ için

$$
A = P D P^{-1}
$$

yazılabilir. Bu, $A^k = P D^k P^{-1}$ sayesinde matris kuvvetlerini ucuzlatır.
