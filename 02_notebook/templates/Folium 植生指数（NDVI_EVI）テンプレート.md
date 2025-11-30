---
title: "Folium 植生指数（NDVI/EVI）テンプレート"
description: "NASA MODIS NDVI/EVIを重ね合わせ、森林カバーや土地利用と組み合わせて都市緑化効果を分析するテンプレート。"
tags: ["folium", "NDVI", "EVI", "植生指数", "都市緑化", "環境モニタリング", "京都", "琵琶湖"]
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

# --- NDVI（植生指数） ---
# NASA GIBS の NDVI レイヤー（MODIS NDVI）
folium.TileLayer(
    tiles="https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_NDVI_16Day/default/{Time}/{TileMatrixSet}/{z}/{y}/{x}.png",
    attr="NASA MODIS NDVI (Normalized Difference Vegetation Index)",
    name="NDVI（植生指数）",
    overlay=True
).add_to(m)

# --- EVI（強化型植生指数） ---
# NASA GIBS の EVI レイヤー（MODIS EVI）
folium.TileLayer(
    tiles="https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_EVI_16Day/default/{Time}/{TileMatrixSet}/{z}/{y}/{x}.png",
    attr="NASA MODIS EVI (Enhanced Vegetation Index)",
    name="EVI（強化型植生指数）",
    overlay=True
).add_to(m)

# --- 森林カバー（Global Forest Change） ---
folium.TileLayer(
    tiles="https://storage.googleapis.com/global-forest-change/tiles/loss/{z}/{x}/{y}.png",
    attr="Global Forest Change (Hansen et al.)",
    name="森林減少",
    overlay=True
).add_to(m)

# --- 土地利用（ESA WorldCover 2020） ---
folium.TileLayer(
    tiles="https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ESA_WorldCover_2020/MapServer/tile/{z}/{y}/{x}",
    attr="ESA WorldCover 2020",
    name="土地利用（ESA WorldCover）",
    overlay=True
).add_to(m)

# --- レイヤーコントロール ---
folium.LayerControl().add_to(m)

# 保存
m.save("map_biwako_ndvi_evi.html")
```

---
🔍 活用イメージ
- NDVI/EVI → 植生の健全度や緑化効果を定量化
- 森林カバー・土地利用 → 都市化や農地拡大との関係を確認
- ヒートアイランド指標 と組み合わせ → 緑化による温度低減効果を評価
---
