1. **Overpass Turbo クエリ例：主要道路だけ取得**
```overpass
[out:json][timeout:25];
(
  way["highway"~"motorway|trunk|primary|secondary"](35.0,135.6,35.1,135.9);
);
out body;
>;
out skel qt;
```
このクエリで取得できる道路種：

|OSM タグ	|意味                |
|---------|-------------------|
|motorway	|高速道路（名神高速など）|
|trunk	|幹線道路（主要国道）   |
|primary	|一般国道             |
|secondary|県道などの主要地方道   |
|tertiary	|市道・町道など        |
|residential|住宅街の道路        |
|footway	|歩道                |
|cycleway |自転車道             |
|path	|小道・山道など         |
