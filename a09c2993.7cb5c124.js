(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{112:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return p}));var i=n(3),a=n(7),o=(n(0),n(145)),r={id:"introduction",title:"Introduction",sidebar_label:"Introduction"},l={unversionedId:"introduction",id:"introduction",isDocsHomePage:!0,title:"Introduction",description:"Paperclip is a tool that specializes in just the appearance of your application, and it only covers HTML, CSS, and primitive components.",source:"@site/docs/introduction.md",slug:"/",permalink:"/docs/",editUrl:"https://github.com/crcn/paperclip/edit/master/packages/paperclip-website/docs/introduction.md",version:"current",sidebar_label:"Introduction",sidebar:"docs",next:{title:"Configuring Webpack",permalink:"/docs/getting-started-webpack"}},s=[{value:"Motivation",id:"motivation",children:[{value:"Development speed",id:"development-speed",children:[]},{value:"Explicit CSS",id:"explicit-css",children:[]},{value:"Visual regressions",id:"visual-regressions",children:[]},{value:"Other motivations",id:"other-motivations",children:[]}]},{value:"Who is Paperclip intented for?",id:"who-is-paperclip-intented-for",children:[{value:"Small projects &amp; startups",id:"small-projects--startups",children:[]},{value:"Big projects and teams",id:"big-projects-and-teams",children:[]},{value:"But I&#39;m already using with Tailwind / Bulma / Bootstrap / etc.",id:"but-im-already-using-with-tailwind--bulma--bootstrap--etc",children:[]}]}],c={toc:s};function p(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(i.a)({},c,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Paperclip is a tool that specializes in just the appearance of your application, and it only covers HTML, CSS, and primitive components."),Object(o.b)("p",null,"I'd recommend that you play around with the ",Object(o.b)("a",Object(i.a)({parentName:"p"},{href:"https://playground.paperclip.dev"}),"Playground")," to get a feel for the tool. "),Object(o.b)("h2",{id:"motivation"},"Motivation"),Object(o.b)("p",null,"Bret Victor's talk on ",Object(o.b)("a",Object(i.a)({parentName:"p"},{href:"https://www.youtube.com/watch?v=PUv66718DII&t=130s"}),"inventing on principle"),' was a major influence for this project. The main question when starting this tool was "how can front-end development feel more like Figma or Sketch?". Front-end development ',Object(o.b)("em",{parentName:"p"},"is visual"),", so why not start there? Paperclip is the result of ",Object(o.b)("a",Object(i.a)({parentName:"p"},{href:"https://levelup.gitconnected.com/lessons-around-creating-ui-builders-46ceeaea327f"}),"many iterations trying to answer this question"),". "),Object(o.b)("h3",{id:"development-speed"},"Development speed"),Object(o.b)("p",null,"The main issue that Paperclip tries to solve is development speed. Typically you may to wait a few seconds for your HTML & CSS changes to appear in the browser, but with Paperclip, changes appear instantly. Here's a demo of Paperclip in action for a pretty large project:"),Object(o.b)("p",null,Object(o.b)("img",{alt:"Captec.io onboarding",src:n(238).default})),Object(o.b)("h3",{id:"explicit-css"},"Explicit CSS"),Object(o.b)("p",null,"One of the problems with CSS is that it's global, and hard to tell what elements its styling. Paperclip aims to solve that by making CSS scoped. This means that CSS defined within each document is only applied to that document. For example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-html"}),"<style>\n  div {\n    color: red;\n  }\n</style>\n\n<div>\n  I'm red text\n</div>\n")),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"div { }")," selector is only applied to the elements within this document. To make CSS global, you need to explicitly define ",Object(o.b)("inlineCode",{parentName:"p"},":global(div) { }"),"-like selectors. This way you know exactly what is and isn't global. "),Object(o.b)("h3",{id:"visual-regressions"},"Visual regressions"),Object(o.b)("p",null,"All previews defined within Paperclip are covered for visual regressions - you can think of this like type safety for UI development. This means that you can easily maintain any HTML & CSS that you write, regardless of how it's all written. "),Object(o.b)("h3",{id:"other-motivations"},"Other motivations"),Object(o.b)("p",null,"The other goal for Paperclip is to lower the barrier to front-end development for designers that want more control. As the project continues to evolve, there will be more tooling that will enable them to do that (through visual & sync tools)."),Object(o.b)("hr",null),Object(o.b)("h2",{id:"who-is-paperclip-intented-for"},"Who is Paperclip intented for?"),Object(o.b)("p",null,"Paperclip is intended for anyone looking to create Single Page Applications - big or small, and any team size. "),Object(o.b)("h3",{id:"small-projects--startups"},"Small projects & startups"),Object(o.b)("p",null,"Paperclip is great for small projects since it will enable you to iterate more quickly on your UIs, and get features out the door more quickly. This is especially useful for startups that depend on user feedback for driving feature development. "),Object(o.b)("h3",{id:"big-projects-and-teams"},"Big projects and teams"),Object(o.b)("p",null,"If you already have a big project, then the benefits of moving over to Paperclip are:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Paperclip wrangles any messy CSS you have by keeping it scoped, and covered for visual regression tests."),Object(o.b)("li",{parentName:"ul"},"Product development moves faster since UI development is faster in Paperclip (developers don't have to wait for their code to compile)."),Object(o.b)("li",{parentName:"ul"},"Paperclip gives developers complete freedom to write HTML & CSS however they want, and without the need for BEM, SNACSS, and other styling patterns.")),Object(o.b)("h3",{id:"but-im-already-using-with-tailwind--bulma--bootstrap--etc"},"But I'm already using with Tailwind / Bulma / Bootstrap / etc."),Object(o.b)("p",null,"Paperclip compliments existing frameworks like Tailwind and Bootstrap by keeping them ",Object(o.b)("em",{parentName:"p"},"scoped")," to the UI you want them applied to. For example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-html"}),'<import src="./tailwind.css" inject-styles />\n\n\n\x3c!--\n  @frame { width: 768, height: 768, x: 0, y: 0 }\n--\x3e\n\n<div class="font-sans bg-gray-500 h-screen w-screen">\n  <div class="bg-gray-100 rounded-lg p-8 md:p-0">\n    <div class="pt-6 text-center space-y-4">\n      <blockquote>\n        <p class="text-lg font-semibold">\n          Lorem ipsum dolor sit amet, consectetur adipiscing elit, \n          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n        </p>\n      </blockquote>\n      <figcaption class="font-medium">\n        <div class="text-blue-600">\n          sit voluptatem\n        </div>\n      </figcaption>\n    </div>\n  </div>\n</div>\n')),Object(o.b)("p",null,"\ud83d\udc46 Tailwind in this case is only applied to this document. The benefits to this approach are that:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"You know exactly what's being styled"),Object(o.b)("li",{parentName:"ul"},"You can avoid vendor lock-in with third-party CSS"),Object(o.b)("li",{parentName:"ul"},"You can avoid CSS collisions")),Object(o.b)("p",null,"Paperclip doesn't replace CSS frameworks, it greatly compliments them, and helps keep your codebase in a state that can continue to scale and grow depending on your users' needs. "))}p.isMDXComponent=!0},145:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var i=n(0),a=n.n(i);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),p=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,r=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),b=i,m=d["".concat(r,".").concat(b)]||d[b]||u[b]||o;return n?a.a.createElement(m,l(l({ref:t},c),{},{components:n})):a.a.createElement(m,l({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=b;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var c=2;c<o;c++)r[c]=n[c];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},238:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/super-fast-c6df95cbfe8faa35686132968ab728b3.gif"}}]);