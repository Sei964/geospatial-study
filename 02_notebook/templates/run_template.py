import yaml
import subprocess
import sys
from pathlib import Path

def run_template(yaml_path):
    with open(yaml_path, "r", encoding="utf-8") as f:
        config = yaml.safe_load(f)

    script_path = Path(config["script"])
    if not script_path.exists():
        print(f"❌ スクリプトが見つかりません: {script_path}")
        return

    print(f"実行中: {config['title']}")
    print(f"説明: {config['description']}")
    subprocess.run(["python", str(script_path)])

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("使い方: python run_template.py templates/テンプレート.yaml")
    else:
        run_template(sys.argv[1])
