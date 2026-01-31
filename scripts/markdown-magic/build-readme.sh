npm run doc
npx tsx scripts/markdown-magic/generate-readme.ts
# add a newline above all markdown magic comments
# This was breaking the docusaurus jsx rendering otherwise
awk '{gsub(/<!--/,"\n<!--")}1' readme.md > tmp  && mv tmp readme.md
