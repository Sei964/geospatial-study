import yaml
from pathlib import Path

def list_templates(index_path):
    with open(index_path, "r", encoding="utf-8") as f:
        index = yaml.safe_load(f)

    print("テンプレート一覧:\n")
    for tpl in index["templates"]:
        print(f"{tpl['title']}")
        print(f"   説明: {tpl['description']}")
        print(f"   ファイル: {tpl['file']}")
        print(f"   タグ: {', '.join(tpl['tags'])}")
        print()

if __name__ == "__main__":
    index_file = Path("templates/index.yaml")
    if not index_file.exists():
        print("❌ index.yaml が見つかりません")
    else:
        list_templates(index_file)
