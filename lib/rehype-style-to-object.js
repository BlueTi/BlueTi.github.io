function rehypeStyleToObject() {
  return (tree) => {
    // unist-util-visit을 동적으로 import
    const visit = require('unist-util-visit');
    
    function parseStyleString(styleString) {
      if (!styleString || typeof styleString !== 'string') {
        return {};
      }
      
      const styles = {};
      styleString.split(';').forEach((rule) => {
        const trimmedRule = rule.trim();
        if (!trimmedRule) return;
        
        const colonIndex = trimmedRule.indexOf(':');
        if (colonIndex === -1) return;
        
        const property = trimmedRule.substring(0, colonIndex).trim();
        const value = trimmedRule.substring(colonIndex + 1).trim();
        
        if (property && value) {
          // kebab-case를 camelCase로 변환
          const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          styles[camelProperty] = value;
        }
      });
      
      return styles;
    }
    
    function traverse(node) {
      if (node.type === 'element' && node.properties) {
        // style 속성을 객체로 변환
        if (node.properties.style && typeof node.properties.style === 'string') {
          node.properties.style = parseStyleString(node.properties.style);
        }
        
        // br 태그를 self-closing으로 변환
        if (node.tagName === 'br' && node.children) {
          node.children = [];
        }
      }
      
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(traverse);
      }
    }
    
    traverse(tree);
    return tree;
  };
}

module.exports = rehypeStyleToObject;

