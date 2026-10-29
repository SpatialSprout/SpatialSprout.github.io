# usage: dionames.sh <bookdir> -> runs mkpics with names used by dioramas that need pictures
d=$1
names=$(grep -oE "(prop\(sc,'[a-z ]+'|sc\.prop\('[a-z ]+'|STAGE\.prop\('[a-z ]+'|pic:'[a-z ]+')" $d/dioramas.js | grep -oE "'[a-z ]+'" | tr -d "'" | sort -u)
known=$(node -e "global.window={PM:null};const s=require('fs').readFileSync('/root/site/tools/bookkit/props3d.js','utf8');const m=[...s.matchAll(/^ ('?)([a-z ]+)\1:/gm)].map(x=>x[2]);console.log(m.join('\n'))")
need=()
while read -r n; do [ -z "$n" ] && continue; echo "$known" | grep -qx "$n" || need+=("$n"); done <<< "$names"
echo "picture names: ${need[*]}"
cp $d/pics.js /tmp/pics_old.js; python3 /root/work/mkpics.py $d "${need[@]}" | tail -2; python3 -c "import json,sys;o=json.loads(open(\"/tmp/pics_old.js\").read().split(\"=\",1)[1].rstrip().rstrip(\";\"));n=json.loads(open(sys.argv[1]).read().split(\"=\",1)[1].rstrip().rstrip(\";\"));o.update(n);open(sys.argv[1],\"w\").write(\"window.PICS=\"+json.dumps(o,separators=(\",\",\":\"))+\";\")" $d/pics.js
