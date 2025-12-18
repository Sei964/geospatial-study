---
title: "NDVI_map_geemap_temp"
description: "Google Earth Engineとgeemapを使い、Landsat/Sentinel-2データからNDVIマップを作成するテンプレート。雲マスク処理やデータのエクスポート機能も含む。"
tags: ["geemap", "GEE", "NDVI", "Landsat", "Sentinel-2", "雲マスク"]
date: 2025-12-16
author: "Seiichi"
category: "GEEテンプレート"
---

```python
import ee
import geemap

# Earth Engine 初期化
ee.Initialize()

# ---------------------
# 1. パラメータ設定
# ---------------------
# --- 解析対象の衛星を選択 ---
# "LANDSAT/LC08/C02/T1_L2" or "COPERNICUS/S2_SR_HARMONIZED"
SATELLITE = "LANDSAT/LC08/C02/T1_L2"

# --- 解析対象領域 ---
# 京都市周辺を囲む矩形を定義 [min_lon, min_lat, max_lon, max_lat]
region = ee.Geometry.Rectangle([135.60, 34.90, 135.90, 35.10])

# --- 解析期間 ---
date_range = ("2022-04-01", "2022-04-30")
CLOUD_FILTER = 20  # 雲被覆率の上限 (%)

# --- NDVI 表示パラメータ ---
vis_params = {
    "min": 0.0,
    "max": 1.0,
    "palette": ["white", "blue", "yellow", "green"]
}

# ---------------------
# 2. 関数定義 (雲マスク、NDVI計算など)
# ---------------------
def mask_clouds(image):
    """衛星データに応じて雲マスクを適用する"""
    if "LANDSAT" in SATELLITE:
        # Landsat 8/9 の QA_PIXEL バンドを使った雲マスク
        qa = image.select("QA_PIXEL")
        # Dilated Cloud, Cirrus, Cloud, Cloud Shadow のビットをマスク
        cloud_mask = (1 << 1) | (1 << 2) | (1 << 3) | (1 << 4)
        mask = qa.bitwiseAnd(cloud_mask).eq(0)
        return image.updateMask(mask)
    elif "S2_SR_HARMONIZED" in SATELLITE:
        # Sentinel-2 の QA60 バンドを使った雲マスク
        qa = image.select("QA60")
        # Cloud, Cirrus のビットをマスク
        cloud_mask = (1 << 10) | (1 << 11)
        mask = qa.bitwiseAnd(cloud_mask).eq(0)
        return image.updateMask(mask)
    return image

def get_ndvi(image):
    """衛星データに応じてNDVIを計算する"""
    if "LANDSAT" in SATELLITE:
        # Landsat 8/9: NIR=SR_B5, Red=SR_B4
        return image.normalizedDifference(["SR_B5", "SR_B4"]).rename("NDVI")
    elif "S2_SR_HARMONIZED" in SATELLITE:
        # Sentinel-2: NIR=B8, Red=B4
        return image.normalizedDifference(["B8", "B4"]).rename("NDVI")
    return None

def scale_image(image):
    """衛星データに応じてスケールファクターを適用する"""
    if "LANDSAT" in SATELLITE:
        # Landsat 8/9 C2 L2: apply scaling factors
        optical_bands = image.select("SR_B.").multiply(0.0000275).add(-0.2)
        thermal_bands = image.select("ST_B.*").multiply(0.00341802).add(149.0)
        return image.addBands(optical_bands, overwrite=True).addBands(thermal_bands, overwrite=True)
    elif "S2_SR_HARMONIZED" in SATELLITE:
        # Sentinel-2 L2A: apply scaling factor
        return image.divide(10000)
    return image

# ---------------------
# 3. データ取得 & 前処理
# ---------------------
collection = (
    ee.ImageCollection(SATELLITE)
    .filterBounds(region)
    .filterDate(*date_range)
    .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", CLOUD_FILTER))
    .map(scale_image)
    .map(mask_clouds)
)

# 中央値合成
image = collection.median()

# ---------------------
# 4. NDVI 計算
# ---------------------
ndvi = get_ndvi(image)

# ---------------------
# 5. マップ表示
# ---------------------
# 矩形領域の中心座標を計算して地図の中心に設定
center_coords = region.centroid().coordinates().getInfo()
map_center = [center_coords[1], center_coords[0]]  # [lat, lon] 形式に変換

map = geemap.Map(center=map_center, zoom=11)
map.add_layer(ndvi, vis_params, "NDVI")
map.add_layer(region, {"color": "red"}, "Region")
map.add_colorbar(vis_params, label="NDVI")
map

# ---------------------
# 6. (オプション) 画像のエクスポート
# ---------------------
# geemap.ee_export_image(
#     ndvi, filename="ndvi_kyoto.tif", scale=30, region=region, file_per_band=False
# )
```