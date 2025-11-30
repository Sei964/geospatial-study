
|メソッド	                    |役割・機能	              |よく使う場面             |
|-----------------------------|-----------------------|-----------------------|
|plt.plot(x, y)               |折れ線グラフを描く	    |時系列や傾向の可視化      |
|plt.scatter(x, y)	          |散布図を描く	    |相関や分布の確認         |
|plt.bar(x, height)	          |棒グラフを描く	    |カテゴリ別の比較         |
|plt.hist(data)	          |ヒストグラム（分布）を描く |データのばらつき確認      |
|plt.xlabel('ラベル')          |x軸のラベルを設定	    |軸の意味を明示           |
|plt.ylabel('ラベル')          |y軸のラベルを設定	    |同上                   |
|plt.title('タイトル')         |グラフのタイトルを設定	    |グラフの目的を示す        |
|plt.legend()	          |凡例（線の説明）を表示	    |複数の線を区別           |
|plt.grid(True)	          |グリッド線を表示	    |見やすさアップ           |
|plt.xlim(min, max)	          |x軸の範囲を指定	    |拡大・縮小              |
|plt.ylim(min, max)	          |y軸の範囲を指定	    |同上                   |
|plt.tight_layout()	          |レイアウト調整	    |ラベルが重ならないように   |
|plt.savefig('ファイル名.png')  |グラフを画像として保存    |レポートや資料用          |
|plt.show()	          |グラフを表示	    |最後に必ず使う！          |

---

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))        # グラフサイズを指定
plt.plot(x, y, label='売上')       # 折れ線グラフ
plt.xlabel('月')                   # x軸ラベル
plt.ylabel('売上高')               # y軸ラベル
plt.title('月別売上推移')          # タイトル
plt.legend()                       # 凡例
plt.grid(True)                     # グリッド線
plt.tight_layout()                 # レイアウト調整
plt.savefig('sales_trend.png')     # 保存
plt.show()                         # 表示
```
---

