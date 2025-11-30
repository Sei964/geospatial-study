---
title: "Folium マルチタイル切替テンプレート"
description: "OpenStreetMap, Stamen, CartoDBなど複数タイルを切り替え可能な基本テンプレート。琵琶湖周辺を例に設定。"
tags: ["folium", "地図", "オンボーディング", "琵琶湖", "タイル切替"]
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
    tiles=None  # 最初はタイルを指定しない（後で追加）
)

# --- タイルレイヤーを追加 ---
# OpenStreetMap（標準）
folium.TileLayer(
    'OpenStreetMap',
    name='OpenStreetMap'
).add_to(m)

# Stamen Terrain（地形図）
folium.TileLayer(
    'Stamen Terrain',
    name='Stamen Terrain'
).add_to(m)

# Stamen Toner（白黒の強調地図）
folium.TileLayer(
    'Stamen Toner',
    name='Stamen Toner'
).add_to(m)

# CartoDB Positron（淡色の背景）
folium.TileLayer(
    'CartoDB positron',
    name='CartoDB Positron'
).add_to(m)

# CartoDB Dark Matter（暗色の背景）
folium.TileLayer(
    'CartoDB dark_matter',
    name='CartoDB Dark Matter'
).add_to(m)

# --- レイヤーコントロールを追加 ---
folium.LayerControl().add_to(m)

# 地図を保存（HTMLファイルとして出力）
m.save("map_biwako.html")
```

🔍 ポイント解説
- tiles=None にしておくと、後から複数のタイルを追加できます。
- TileLayer を複数追加し、LayerControl() を入れることで、地図上でスタイルを切り替え可能になります。
- 出力は map_biwako.html として保存され、ブラウザで開くとインタラクティブに切り替えできます。


