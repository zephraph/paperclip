(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{107:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(7),o=(n(0),n(138)),s={id:"guide-why",title:"Why Paperclip?",sidebar_label:"Why Paperclip?"},i={unversionedId:"guide-why",id:"guide-why",isDocsHomePage:!1,title:"Why Paperclip?",description:"There are a number of reasons why Paperclip was created.",source:"@site/docs/guide-why.md",slug:"/guide-why",permalink:"/docs/guide-why",editUrl:"https://github.com/crcn/paperclip/edit/master/packages/paperclip-website/docs/guide-why.md",version:"current",sidebar_label:"Why Paperclip?"},l=[{value:"Web development is slow",id:"web-development-is-slow",children:[]},{value:"Visual regressions",id:"visual-regressions",children:[]}],c={toc:l};function p(e){var t=e.components,s=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},c,s,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"There are a number of reasons why Paperclip was created. "),Object(o.b)("h3",{id:"web-development-is-slow"},"Web development is slow"),Object(o.b)("p",null,"One of the big reasons why Paperclip was created is to eliminate the refresh rate of web application previews. Here's what I mean:"),Object(o.b)("p",null,Object(o.b)("img",{alt:"Slow HMR demo",src:n(224).default})),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"An example of using hot-module reloading for a large project running in a Docker container.")),Object(o.b)("p",null,"Web development is almost ",Object(o.b)("em",{parentName:"p"},"entirely visual"),", and also a very iterative process. All of that time spent tweaking CSS gets expensive, and personally I also find it to be a productivity drain. It really sucks to wait 5 seconds for the browser to see a preview each time a change is made. "),Object(o.b)("p",null,"To a reach a ",Object(o.b)("em",{parentName:"p"},"fidelity")," that designers want is another matter. There's usually a ",Object(o.b)("em",{parentName:"p"},"lot")," of time spent getting styles just right, and it gets even harder to do when projects get bigger. At this point in my career, I've found it pretty normal for web applications to visually be ",Object(o.b)("em",{parentName:"p"},"just about right"),", but not entirely. There just isn't enough justification to making UI perfect. "),Object(o.b)("p",null,"Paperclip was created primarily to increase visual development speed. Developers should be free to make user interfaces as fast as they can build them, and be unrestricted by their tooling. And with little effort, they should be able to iterate on their UIs for pixel-perfection. "),Object(o.b)("p",null,Object(o.b)("img",{alt:"alt faster UI",src:n(225).default})),Object(o.b)("h3",{id:"visual-regressions"},"Visual regressions"),Object(o.b)("p",null,"Visual regressions are a really tough problem in the web development space, especially when you consider the ",Object(o.b)("em",{parentName:"p"},"cascading")," nature of CSS. One small change to a style rule may introduce a new visual bug into your application. And when styles are global, I've noticed that developers that I've worked with don't feel ",Object(o.b)("em",{parentName:"p"},"confident")," about making CSS changes, and so they leave it alone. What you're left with over time is a large accumulation of magical heaping pile of tech debt that you can't remove. To mitigate that from happening requires social rules around CSS, and that's hard to enforce in my experience, especially as teams grow. "),Object(o.b)("p",null,"Granted, most of the cascading issues around CSS go away when you 1) bring CSS into code, and 2) use child selectors (",Object(o.b)("inlineCode",{parentName:"p"},".ancestor .descendent"),", ",Object(o.b)("inlineCode",{parentName:"p"},".parent > .child"),") sparingly. However, visual regressions still happen often enough when you refactor code (e.g: changing the theme). The way to fix this problem is with a tool like ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://percy.io/"}),"Percy")," that does visual regression tests. However, that requires manual setup that's time-intensive, and requires lots of energy to make into a process. "),Object(o.b)("p",null,"Confidence is a real concern of mine around developer tooling, and I've noticed that tools that are built around safety are only useful when they make an ",Object(o.b)("em",{parentName:"p"},"entire")," system safe, not just parts of it. When you have blind spots in your codebase, developers may feel like don't know what's safe and what isn't, so it's safer to assume that nothing is. Visual regression test coverage is no exception - you really need a lot of them in order to feel safe from CSS bugs. "),Object(o.b)("p",null,"Paperclip doesn't require you to set up visual regression tests since they're given to you automatically. That's because the language is centered around visual development - developers are encouraged to write previews of their components directly within Paperclip files, which in turn are used for visual regression tests. Take this button for example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-html",metastring:"live",live:!0}),'<style>\n  .button {\n    background: #333;\n    border: 2px solid #333;\n    border-radius: 4px;\n    padding: 8px 16px;\n    color: white;\n\n    &--secondary {\n      color: inherit;\n      background: transparent;\n    }\n    &--negate {\n      background: #C00;\n      border-color: #C00;\n    }\n    &--negate&--secondary {\n      background: transparent;\n      color: #C00;\n    }\n  }\n  .preview {\n    margin: 10px;\n  }\n</style>\n<button export component as="Button" \n  className="button {className?}"\n  className:secondary="button--secondary"\n  className:negate="button--negate">\n  {children}\n</button>\n\n<Button className="preview">\n  primary\n</Button>\n\n<Button className="preview" secondary>\n  Secondary\n</Button>\n\n<Button className="preview" negate>\n  Negate\n</Button>\n\n<Button className="preview" negate secondary>\n  Negate Secondary\n</Button>\n')),Object(o.b)("p",null,"\u261d The previews here are primarily for the developer to see what they're doing. And by doing this, they're also getting visual regression tests, basically for free. All that needs to be done at this point is to run the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/configure-percy"}),"Percy CLI tool"),"."),Object(o.b)("p",null,Object(o.b)("img",{alt:"alt percy button snapshot",src:n(226).default})),Object(o.b)("p",null,"Here's what you see in Percy:"),Object(o.b)("p",null,Object(o.b)("img",{alt:"alt percy snapshot",src:n(227).default})),Object(o.b)("p",null,"There's really no mistaking whether a button state is captured or not because each state needs to be displayed in order for the developer to ",Object(o.b)("em",{parentName:"p"},"create")," it, and the developer is also encouraged to display every visual state of the component since that means they'll get visual regression tests. A nice little feedback loop. "),Object(o.b)("p",null,"Assuming that we have the entire UI built in Paperclip, we can feel a bit more confident about making changes, which goes back to increasing the speed of developing web applications since a developers wouldn't need to smoke-test component style changes - it's done automatically for them. All they need to do is change a style and they're done. "))}p.isMDXComponent=!0},138:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),p=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),b=a,h=u["".concat(s,".").concat(b)]||u[b]||d[b]||o;return n?r.a.createElement(h,i(i({ref:t},c),{},{components:n})):r.a.createElement(h,i({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=b;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},224:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/slow-hmr-543bad0c09607b68267b866e272395c5.gif"},225:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/faster-ui-3785821fb6597077d7f05aa64caa093f.gif"},226:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/button-percy-demo-35185b1baba6cb2afa3fc4a4a5d65595.gif"},227:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/percy-button-snapshot-6fd8c11650e7be97a0b5b0130f8fbec3.png"}}]);