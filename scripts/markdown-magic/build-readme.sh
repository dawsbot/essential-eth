npm run doc
npx markdown-magic
# add a newline above all markdown magic comments
# This was breaking the docusaurus jsx rendering otherwise
awk '{gsub(/<!--/,"\n<!--")}1' readme.md > tmp  && mv tmp readme.md

npx prettier --write readme.md
