---
title: "Folium ヒートアイランド指標付きテンプレート"
description: "夜間光（VIIRS）、地表面温度（MODIS LST）、森林カバーや土地利用を組み合わせた都市熱環境分析用テンプレート。"
tags: ["folium", "ヒートアイランド", "夜間光", "地表面温度", "環境モニタリング", "京都"]
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

# --- 紅葉シーズンの雰囲気（衛星画像） ---
folium.TileLayer(
    tiles="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attr="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
    name="ESRI World Imagery（紅葉雰囲気）"
).add_to(m)

# --- 森林カバー（Global Forest Change） ---
folium.TileLayer(
    tiles="https://storage.googleapis.com/global-forest-change/tiles/loss/{z}/{x}/{y}.png",
    attr="Global Forest Change (Hansen et al.)",
    name="森林減少",
    overlay=True
).add_to(m)

folium.TileLayer(
    tiles="https://storage.googleapis.com/global-forest-change/tiles/gain/{z}/{x}/{y}.png",
    attr="Global Forest Change (Hansen et al.)",
    name="森林増加",
    overlay=True
).add_to(m)

# --- 土地利用（ESA WorldCover 2020） ---
folium.TileLayer(
    tiles="https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ESA_WorldCover_2020/MapServer/tile/{z}/{y}/{x}",
    attr="ESA WorldCover 2020",
    name="土地利用（ESA WorldCover）",
    overlay=True
).add_to(m)

# --- ヒートアイランド指標 ---
# 夜間光データ（VIIRS Night Lights）
folium.TileLayer(
    tiles="https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/{Time}/{TileMatrixSet}/{z}/{y}/{x}.png",
    attr="NASA VIIRS Black Marble Night Lights",
    name="夜間光（都市化指標）",
    overlay=True
).add_to(m)

# 地表面温度（MODIS LST）
folium.TileLayer(
    tiles="https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Land_Surface_Temp_Day/default/{Time}/{TileMatrixSet}/{z}/{y}/{x}.png",
    attr="NASA MODIS Land Surface Temperature",
    name="地表面温度（昼間）",
    overlay=True
).add_to(m)

# --- レイヤーコントロール ---
folium.LayerControl().add_to(m)

# 保存
m.save("map_biwako_heat_island.html")
```

---
🔍 レイヤーの意味
- 夜間光（VIIRS Black Marble） → 都市化の進展や人口密度を示す指標
- 地表面温度（MODIS LST） → ヒートアイランド現象を直接的に把握できるデータ
- 森林カバー・土地利用 → 都市化や農地拡大による環境変化を補足

🎯 活用イメージ
- 京都市街地と琵琶湖周辺の 夜間光の強度 を比較 → 都市化の度合いを把握
- 地表面温度レイヤー を重ねて、ヒートアイランドの強いエリアを確認
- 森林減少や土地利用変化と組み合わせて、都市緑化の効果を評価
---



