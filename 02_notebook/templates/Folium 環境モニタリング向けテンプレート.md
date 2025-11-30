---
title: "Folium 環境モニタリング向けテンプレート"
description: "森林カバー（Global Forest Change）、土地利用（ESA WorldCover）、紅葉シーズンの衛星画像を重ね合わせる多層地図。"
tags: ["folium", "森林カバー", "土地利用", "ESA", "環境モニタリング"]
date: 2025-11-19
author: "Seiichi"
category: "GISテンプレート"
---
```python
import folium

# 琵琶湖周辺を中心に設定
latitude = 35.2
longitude = 135.0

# 基本マップ（タイルなしで初期化）
m = folium.Map(location=[latitude, longitude], zoom_start=10, tiles=None)

# --- 標準タイル ---
folium.TileLayer('OpenStreetMap', name='OpenStreetMap').add_to(m)
folium.TileLayer('Stamen Terrain', name='Stamen Terrain').add_to(m)

# --- 紅葉シーズンの雰囲気を出す衛星画像 ---
# （例：ESRI World Imagery → 高解像度の衛星写真）
folium.TileLayer(
    tiles="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attr="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
    name="ESRI World Imagery（紅葉雰囲気）"
).add_to(m)

# --- 森林カバー（Global Forest Change データ） ---
folium.TileLayer(
    tiles="https://storage.googleapis.com/global-forest-change/tiles/gain/{z}/{x}/{y}.png",
    attr="Global Forest Change (Hansen et al.)",
    name="森林カバー（森林増加）",
    overlay=True
).add_to(m)

folium.TileLayer(
    tiles="https://storage.googleapis.com/global-forest-change/tiles/loss/{z}/{x}/{y}.png",
    attr="Global Forest Change (Hansen et al.)",
    name="森林カバー（森林減少）",
    overlay=True
).add_to(m)

# --- 土地利用データ（ESA WorldCover 2020） ---
folium.TileLayer(
    tiles="https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ESA_WorldCover_2020/MapServer/tile/{z}/{y}/{x}",
    attr="ESA WorldCover 2020",
    name="土地利用（ESA WorldCover）",
    overlay=True
).add_to(m)

# --- レイヤーコントロール ---
folium.LayerControl().add_to(m)

# 保存
m.save("map_biwako_env_monitor.html")
```

---
🔍 レイヤーの意味
• 	ESRI World Imagery → 紅葉シーズンの雰囲気を感じられる高解像度衛星写真
• 	Global Forest Change (Hansen) → 森林の増加・減少を色分けして表示
• 	ESA WorldCover 2020 → 土地利用分類（農地、森林、都市など）を表示

🎯 活用イメージ
• 	都市緑化の効果を「森林カバー」レイヤーで確認
• 	紅葉シーズンの衛星画像で観光資源や景観を評価
• 	土地利用データを重ねて「都市化による森林減少」や「農地拡大」を分析

---