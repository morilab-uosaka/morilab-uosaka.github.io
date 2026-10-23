#!/bin/bash
# ============================================================================
# Double-click this after editing anything in assets/ or data/
# (style.css, a .js file, data/news.js, data/papers.bib).
# It raises the ?v= number on every page so visitors' browsers fetch the
# new files instead of old cached copies. See GUIDE.md §5.
# ============================================================================
cd "$(dirname "$0")"
CUR=$(grep -o 'style\.css?v=[0-9]*' index.html | head -1 | sed 's/.*v=//')
if [ -z "$CUR" ]; then echo "Could not find the current version in index.html"; exit 1; fi
NEW=$((CUR + 1))
find . -path ./.git -prune -o \( -name '*.html' -o -name '*.js' \) -type f -print | while read -r f; do
  perl -pi -e 's/\?v=\d+(?=["\x27])/?v='"$NEW"'/g' "$f"
done
echo ""
echo "  ?v=$CUR  ->  ?v=$NEW"
echo ""
echo "  Check: every line below should show the SAME number."
grep -rhoE '\?v=[0-9]+' --include='*.html' --include='*.js' . | sort | uniq -c
echo ""
