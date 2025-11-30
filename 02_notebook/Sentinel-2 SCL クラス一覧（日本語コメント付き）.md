---
title: "Sentinel-2 Scene Classification Layer (SCL) クラス一覧"
description: "SCL バンドの値と意味を日本語で整理したテンプレート。マスク処理や分類抽出に利用可能。"
author: "Geo Insight Works Onboarding"
date: 2025-11-29
tags: ["Sentinel-2", "SCL", "Google_Earth_Engine", "マスク処理", "オンボーディング"]

---

// Sentinel-2 Scene Classification Layer (SCL) 値一覧
// 参考: ESA Sentinel-2 Level-2A Product Documentation

var sclClasses = {
  0: '未定義 (No data)',
  1: '飽和/欠損ピクセル (Saturated/Defective)',
  2: '暗い特徴 (Dark features, e.g. shadows)',
  3: '雲影 (Cloud shadows)',
  4: '植生 (Vegetation)',
  5: '裸地 (Bare soils)',
  6: '水域 (Water)',
  7: '未分類 (Unclassified)',
  8: '中間雲 (Cloud medium probability)',
  9: '高確度雲 (Cloud high probability)',
  10: '薄雲 (Thin cirrus)',
  11: '雪・氷 (Snow/Ice)'
};

// 使用例: SCL バンドから特定クラスを抽出
var scl = image.select('SCL');

// 例: 植生(4), 裸地(5), 水域(6)のみ抽出
var mask = scl.remap([4,5,6], [1,1,1], 0);
var filtered = image.updateMask(mask);

---
ポイント
- `remap`を使うと複数クラスをまとめてマスク化できるので便利です。
- クラス番号と意味をコメントで整理しておくと、オンボーディング資料や 1000問チャレンジのテンプレートに直結します。
- 例えば「都市緑化」分析なら, 植生④と裸地⑤を組み合わせて緑被率を算出できます。

---
