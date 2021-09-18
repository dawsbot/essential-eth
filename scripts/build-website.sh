# Necessary to not override website/versions
mv website/versions .versions
typedoc --options typedoc/options.js
mv .versions website/versions
