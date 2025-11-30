---
title: "Folium 自然系タイル追加テンプレート"
description: "NASA Blue Marble, ESRI World Imagery, OpenTopoMapなど自然系タイルを追加した環境分析向けテンプレート。"
tags: ["folium", "衛星画像", "自然", "京都", "環境モニタリング"]
date: 2025-11-19
author: "Seiichi"
category: "GISテンプレート"
---
```python 
import folium

# 地図の中心座標（例：琵琶湖周辺）
latitude = 35.2
longitude = 135.0

# 基本の地図オブジェクトを作成
m = folium.Map(
    location=[latitude, longitude],
    zoom_start=10,
    tiles=None  # 最初はタイルを指定しない
)

# --- 標準タイル ---
folium.TileLayer('OpenStreetMap', name='OpenStreetMap').add_to(m)
folium.TileLayer('Stamen Terrain', name='Stamen Terrain').add_to(m)
folium.TileLayer('CartoDB positron', name='CartoDB Positron').add_to(m)

# --- 自然系タイル ---
# NASA Blue Marble（衛星画像）
folium.TileLayer(
    tiles="https://tiles.arcgis.com/tiles/arcgis/rest/services/NASA_BlueMarble/MapServer/tile/{z}/{y}/{x}",
    attr="NASA Blue Marble imagery",
    name="NASA Blue Marble"
).add_to(m)

# ESRI World Imagery（高解像度衛星写真）
folium.TileLayer(
    tiles="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attr="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
    name="ESRI World Imagery"
).add_to(m)

# OpenTopoMap（地形図）
folium.TileLayer(
    tiles="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attr="Map data © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)",
    name="OpenTopoMap"
).add_to(m)

# --- レイヤーコントロールを追加 ---
folium.LayerControl().add_to(m)

# 地図を保存
m.save("map_biwako_nature.html")
```

🔍 ポイント
- NASA Blue Marble → 地球全体の衛星画像（やや低解像度ですが雰囲気重視）
- ESRI World Imagery → 高解像度の衛星写真（都市や森林の詳細が見える）
- OpenTopoMap → 標高や地形の起伏を強調した地図


