// 1. AOIの設定（例：簡単な矩形）
//var kyoto_aoi = ee.Geometry.Rectangle([135.29, 34.80, 136.30, 35.50]); // 京都市周辺のざっくりとした範囲

var kyoto_shi = ee.FeatureCollection('projects/earth-change-analysis/assets/kyoto_pref_2025')
    .filter(ee.Filter.eq('N03_004', '京都市'));

// 2. Landsat 8 Collection 2 Tier 1 を読み込み
var l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterBounds(kyoto_shi)
    .filterDate('2023-07-01', '2023-08-31')
    .filterMetadata('CLOUD_COVER', 'less_than', 20);
    
// CLOUD_COVER属性に基づいてコレクションをソートし、最初の画像（最も低い雲被覆率）を選択します。
var image = l8.sort('CLOUD_COVER').median().clip(kyoto_shi);


var LST = image.select('ST_B10').multiply(0.00341802)
    .add(149.0).subtract(273.15).rename('LST_Celsius');

 
    
// 5. 可視化パラメータの設定
var LST_vis = {
    min: 20, // 最小温度（例：20°C）
    max: 40, // 最大温度（例：40°C）
    palette: [ // 寒色から暖色へのパレット
        '000080', // 濃い青
        '0000ff', // 青
        '00ffff', // シアン
        '00ff00', // 緑
        'ffff00', // 黄色
        'ff0000', // 赤
        '800000'  // 濃い赤
    ],
    opacity: 0.7
};

// 6. 結果を地図に追加
// マップの中心とズームレベルを設定
Map.centerObject(kyoto_shi, 10);
Map.addLayer(LST, LST_vis, 'Kyoto LST (°C)');
Map.addLayer(kyoto_shi, {color: 'blue'}, '京都市');

// 7. （応用）凡例を追加する
// これは必須ではありませんが、実務では重要です。    
// legend_dictをJavaScriptのオブジェクト形式に変換します
var legend_dict = {
    '20°C': '#000080',
    '23°C': '#0000ff',
    '26°C': '#00ffff',
    '29°C': '#00ff00',
    '32°C': '#ffff00',
    '35°C': '#ff0000',
    '40°C': '#800000'
};

// ----------------------------------------------------
// 以下は凡例描画のための汎用関数と実装です。
// ----------------------------------------------------

// 凡例パネルを作成する関数
var addTemporalLegend = function(title, dict) {
  // 凡例パネルを作成
  var legend = ui.Panel({
    style: {
      position: 'bottom-right',
      padding: '8px 15px'
    }
  });

  // タイトルを追加
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '15px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  legend.add(legendTitle);

  // カラーとラベルのペアごとに凡例エントリを追加
  var loading = ui.Label('Loading legend...', {margin: '0 0 4px 0'});
  legend.add(loading);

  var generateLegend = function() {
    legend.remove(loading);
    
    // 古典的なJavaScriptのループを使用してキーと値を取得する
    for (var name in dict) {
      if (dict.hasOwnProperty(name)) {
        var color = dict[name];
        
        var entry = [
          ui.Label({
            style: {
              color: color,
              border: '1px solid black', // 色見本を見やすくするために枠線を追加
              minWidth: '20px',
              minHeight: '20px',
              margin: '0 0 4px 0',
              backgroundColor: color
            }
          }),
          ui.Label({
            value: name,
            style: {
              margin: '0 0 4px 6px'
            }
          })
        ];
        legend.add(ui.Panel({
          widgets: entry,
          layout: ui.Panel.Layout.flow('horizontal')
        }));
      }
    }
  };

  // 凡例の生成を実行
  generateLegend();
  
  // マップに凡例パネルを追加
  Map.add(legend);
};

// 関数を呼び出して凡例を地図に追加
addTemporalLegend("LST (°C)", legend_dict);
