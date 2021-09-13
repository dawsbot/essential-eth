# Necessary to not override website/versions
cp -a website/versions .versions
typedoc --options typedoc/options.js
mv .versions website/versions
