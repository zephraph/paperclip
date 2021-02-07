(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{132:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),r=(a(139),a(144)),o=a(22),l=a(188),i=a.n(l),s={"button.pc":i()('\n    <import src="./button-styles.pc" as="styles" />\n      \n    \x3c!-- This is exported to code --\x3e  \n    <div export component as="Button"\n      className="$styles.Button"\n      className:secondary="$styles.Button--secondary"\n      className:negate="$styles.Button--negate">\n      {children}\n    </div>\n    \n    \x3c!-- This is a preview --\x3e\n    <div className="$styles.preview">\n      <Button>\n        Primary button\n      </Button>\n    \n      <Button negate>\n        Negate\n      </Button>\n\n      <Button secondary>\n        Secondary Button\n      </Button>\n      \n      <Button secondary negate>\n        Secondary Negate\n      </Button>\n    </div>\n  '),"button-styles.pc":i()('\n    \x3c!-- Styles would typically go in the same file --\x3e\n    <import src="./colors.pc" />\n    <import src="./typography.pc" as="typography" />\n    <style>\n      @export {\n        .Button {\n          @include typography.text-default;\n          border: 2px solid var(--color-grey-100);\n          display: inline-block;\n          border-radius: 4px;\n          padding: 8px 16px;\n          background: var(--color-grey-100);\n          color: var(--color-grey-200);\n          &--negate {\n            background-color: var(--color-red-100);\n            border-color: var(--color-red-100);\n            color: var(--color-red-200);\n          }\n          &--secondary {\n            background: transparent;\n            color: var(--color-grey-100);\n          }\n          &--secondary&--negate {\n            color: var(--color-red-100);\n          }\n        }\n        \n        .preview {\n          display: flex;\n          flex-direction: column;\n          align-items: flex-start;\n          .Button {\n            margin-bottom: 10px;\n          }\n        }\n      }\n    </style>  \n    Nothing to see here!\n  '),"typography.pc":i()('\n      \x3c!-- Typography styles --\x3e\n      <import src="./colors.pc" />\n\n      <style>\n        @export {\n          @mixin text-default {\n            font-family: sans-serif;\n            color: var(--color-grey-200);\n            font-size: 18px;\n          }\n          .text-default {\n            @include text-default;\n          }    \n          .text-color-danger {\n            color: var(--color-red-100);\n          }    \n        }\n        .text-preview {\n          margin-top: 10px;\n        }\n      </style>\n      \n      \x3c!-- previews --\x3e\n      \n      <div className="text-default text-preview">\n        Default text\n      </div>\n      <div className="text-default text-preview text-color-danger">\n        Danger text\n      </div>\n  '),"colors.pc":i()('\n      \x3c!-- All colors --\x3e\n\n      <style>\n        :root {\n          --color-grey-100: #999;\n          --color-grey-200: #333;\n          --color-red-100: #F00;\n          --color-red-200: #900;\n        }\n        .ColorPreview {\n          font-family: Helvetica;\n          margin-top: 10px;\n          font-size: 18px;\n        }\n      </style>\n\n      <div component as="ColorPreview" className="ColorPreview" style="color: {value}">  \n        {value}\n      </div>\n\n      <ColorPreview value="var(--color-grey-100)" />\n      <ColorPreview value="var(--color-grey-200)" />\n      <ColorPreview value="var(--color-red-100)" />\n      <ColorPreview value="var(--color-red-200)" />\n      \n  ')},d='\nimport * as styles from "./styles.pc";\n\nfunction GroceryList() {\n\n  const groceries = [\n    "Milk \ud83e\udd5b", \n    "Water \ud83d\udca7", \n    "Taco seasoning \ud83c\udf2e"\n  ];\n\n  return <styles.List>\n    {\n      groceries.map(item => (\n        <styles.ListItem>{item}</styles.ListItem>;\n      ))\n    }\n  </styles.List>;  \n}\n'.trim(),p='\n<ol export component as="List">\n  <style>\n    padding-left: 1em;\n    font-family: Open Sans;\n  </style>\n  {children}\n</ol>\n\n<li export component as="ListItem">\n  <style>\n    margin-top: 6px;\n  </style>\n  {children}\n</li>\n\n\x3c!-- \n  Preview\n--\x3e\n\n<List>\n  <ListItem>Bagels \ud83e\udd6f</ListItem>\n  <ListItem>Yakitori \ud83c\udf62</ListItem>\n  <ListItem>Tofurky \ud83e\udd83</ListItem>\n  <ListItem>Skittles \ud83c\udf08</ListItem>\n</List>\n'.trim(),m=a(149);a(115);a(116);const f=e=>{const t=typeof e;return"object"===t||"string"!==t?e:e.trim().split(";").reduce(((e,t)=>{const[a,c]=t.split(":");if(!c||"undefined"===c)return e;return"undefined"===c.trim()||(e[a.trim()]=c&&c.trim()),e}),{})},u=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-1598c38":!0,"data-pc-2ee04b36":!0,ref:t,key:"1598c38",className:"_2ee04b36_font font "+(a=e.className,a?"_2ee04b36_"+a+" "+a:"")},"A quick brown fox jumped over the lazy dog\n");var a})));c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-e83a290d":!0,"data-pc-2ee04b36":!0,ref:t,key:"e83a290d",style:f("font-family: "+e.fontFamily)},c.createElement(u,{"data-pc-b03676a7":!0,"data-pc-2ee04b36":!0,key:"b03676a7",className:"_2ee04b36_extra-light extra-light"}),c.createElement(u,{"data-pc-c7314631":!0,"data-pc-2ee04b36":!0,key:"c7314631",className:"_2ee04b36_light light"}),c.createElement(u,{"data-pc-5e38178b":!0,"data-pc-2ee04b36":!0,key:"5e38178b"}),c.createElement(u,{"data-pc-293f271d":!0,"data-pc-2ee04b36":!0,key:"293f271d",className:"_2ee04b36_medium medium"}),c.createElement(u,{"data-pc-b75bb2be":!0,"data-pc-2ee04b36":!0,key:"b75bb2be",className:"_2ee04b36_bold bold"}),c.createElement(u,{"data-pc-c05c8228":!0,"data-pc-2ee04b36":!0,key:"c05c8228",className:"_2ee04b36_extra-bold extra-bold"}))}))),a(117);a(118);a(119);a(120);const y="_3151939d_semi-bold semi-bold";a(121);const g=e=>e?"_3043d893_"+e+" "+e:"",b=(c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-e491a4ea":!0,"data-pc-3043d893":!0,ref:t,key:"e491a4ea",className:"_3043d893__col _col _3043d893__col3 _col3 "+g(e.className&&e.className)},e.children)}))),c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-df201df":!0,"data-pc-3043d893":!0,ref:t,key:"df201df",className:"_3043d893__col _col _3043d893__col6 _col6 "+g(e.className&&e.className)},e.children)}))),c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-e3fc60f3":!0,"data-pc-3043d893":!0,ref:t,key:"e3fc60f3",className:"_3043d893__col _col _3043d893__col9 _col9 "+g(e.className&&e.className)},e.children)}))),c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-4444df4":!0,"data-pc-3043d893":!0,ref:t,key:"4444df4",className:"_3043d893__col _col _3043d893__col12 _col12 "+g(e.className&&e.className)},e.children)}))),c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-9fcd1620":!0,"data-pc-3043d893":!0,ref:t,key:"9fcd1620",className:"_3043d893__row _row "+g(e.className&&e.className)},e.children)})))),_=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-71c3770c":!0,"data-pc-3043d893":!0,ref:t,key:"71c3770c",className:"_3043d893__container _container "+g(e.className&&e.className)},e.children)})));a(122);const h=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"a",{"data-pc-149dda8c":!0,"data-pc-1d429790":!0,ref:t,key:"149dda8c",className:"_1d429790__button _button "+(a=e.className&&e.className,a?"_1d429790_"+a+" "+a:"")+(e.secondary?" _1d429790__button--secondary _button--secondary":"")+(e.strong?" _1d429790__button--strong _button--strong":""),href:e.href},e.children);var a})));a(123);const v=e=>e?"_b1c0b4ab_"+e+" "+e:"",k=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-296d0dd3":!0,"data-pc-b1c0b4ab":!0,ref:t,key:"296d0dd3",className:"_b1c0b4ab_icon icon "+v(e.name)+" "+v(e.className&&e.className)})})));a(124);const N=e=>e.default||e,w=(e,t)=>({...t,className:t.className?t.className+" "+e:e}),E=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"span",{"data-pc-39ec88e8":!0,"data-pc-81da3f7c":!0,ref:t,key:"39ec88e8",className:"_81da3f7c__highlight _highlight"+(e.noBreak?" _81da3f7c_noBreak noBreak":"")+(e.darker?" _81da3f7c_darker darker":"")+(e.bold?" _81da3f7c_bold bold":"")},e.children)}))),x=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-8bf1e2aa":!0,"data-pc-81da3f7c":!0,ref:t,key:"8bf1e2aa",className:"_81da3f7c__home _home _3151939d_text-default text-default"},e.children)}))),j=c.memo(c.forwardRef((function(e,t){return c.createElement(_,w("_65ff8386",{"data-pc-65ff8386":!0,"data-pc-81da3f7c":!0,ref:t,key:"65ff8386",className:"_81da3f7c__header _header _81da3f7c__main _main"}),c.createElement(b,w("_b04c9138",{"data-pc-b04c9138":!0,"data-pc-81da3f7c":!0,key:"b04c9138"}),c.createElement(e.tagName||"div",{"data-pc-a0bae74f":!0,"data-pc-81da3f7c":!0,key:"a0bae74f"},c.createElement(e.tagName||"img",{"data-pc-79a2cc81":!0,"data-pc-81da3f7c":!0,key:"79a2cc81",src:N(a(228))}),"\n      Paperclip\n    ")),c.createElement(b,w("_c74ba1ae",{"data-pc-c74ba1ae":!0,"data-pc-81da3f7c":!0,key:"c74ba1ae"}),c.createElement(e.tagName||"div",{"data-pc-a1788d78":!0,"data-pc-81da3f7c":!0,key:"a1788d78",className:"_81da3f7c__blurb _blurb"},c.createElement(e.tagName||"div",{"data-pc-44c2e531":!0,"data-pc-81da3f7c":!0,key:"44c2e531",className:"_81da3f7c__title _title"},e.title),c.createElement(e.tagName||"div",{"data-pc-ddcbb48b":!0,"data-pc-81da3f7c":!0,key:"ddcbb48b",className:"_81da3f7c__subtext _subtext"},e.description),c.createElement(e.tagName||"div",{"data-pc-aacc841d":!0,"data-pc-81da3f7c":!0,key:"aacc841d",className:"_81da3f7c__cta _cta"},e.cta))),c.createElement(b,{"data-pc-592f340d":!0,"data-pc-81da3f7c":!0,key:"592f340d"},c.createElement(e.tagName||"div",{"data-pc-d330ab6b":!0,"data-pc-81da3f7c":!0,key:"d330ab6b",className:"_81da3f7c__preview _preview"},e.preview)))}))),S=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-8c9c26b3":!0,"data-pc-81da3f7c":!0,ref:t,key:"8c9c26b3",className:"_81da3f7c__code-preview _code-preview"})}))),P=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-6292479f":!0,"data-pc-81da3f7c":!0,ref:t,key:"6292479f",className:"_81da3f7c__summary _summary _3043d893__row _row"},c.createElement(e.tagName||"div",{"data-pc-2e4c685e":!0,"data-pc-81da3f7c":!0,key:"2e4c685e",className:"_3043d893__col12 _col12"},c.createElement(e.tagName||"div",{"data-pc-207bcf40":!0,"data-pc-81da3f7c":!0,key:"207bcf40",className:"_81da3f7c__title _title"},e.title),c.createElement(e.tagName||"div",{"data-pc-577cffd6":!0,"data-pc-81da3f7c":!0,key:"577cffd6",className:"_81da3f7c__text _text"},e.text)))}))),C=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-852a6a98":!0,"data-pc-81da3f7c":!0,ref:t,key:"852a6a98",className:"_81da3f7c__main-features _main-features _3043d893__row _row"},e.children)}))),L=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-a0dcb169":!0,"data-pc-81da3f7c":!0,ref:t,key:"a0dcb169",className:"_81da3f7c__item _item _3043d893__col _col _3043d893__col6 _col6"},c.createElement(e.tagName||"div",{"data-pc-3874bb02":!0,"data-pc-81da3f7c":!0,key:"3874bb02",className:"_81da3f7c__heading _heading"},c.createElement(k,w("_5ea878d8",{"data-pc-5ea878d8":!0,"data-pc-81da3f7c":!0,key:"5ea878d8",name:e.iconName,className:"_81da3f7c__icon _icon"})),c.createElement(e.tagName||"div",{"data-pc-c7a12962":!0,"data-pc-81da3f7c":!0,key:"c7a12962",className:"_81da3f7c__info _info"},c.createElement(e.tagName||"div",{"data-pc-25541ec2":!0,"data-pc-81da3f7c":!0,key:"25541ec2",className:"_81da3f7c__title _title"},c.createElement(e.tagName||"span",{"data-pc-33eee5d1":!0,"data-pc-81da3f7c":!0,key:"33eee5d1"},e.title)),c.createElement(e.tagName||"div",{"data-pc-bc5d4f78":!0,"data-pc-81da3f7c":!0,key:"bc5d4f78",className:"_81da3f7c__details _details"},e.description))),c.createElement(e.tagName||"div",{"data-pc-a17deab8":!0,"data-pc-81da3f7c":!0,key:"a17deab8",className:"_81da3f7c__example _example"},e.example))}))),O=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-4ed2d045":!0,"data-pc-81da3f7c":!0,ref:t,key:"4ed2d045",className:"_81da3f7c__various-features _various-features _3043d893__row _row"},e.children)}))),T=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-a7b17570":!0,"data-pc-81da3f7c":!0,ref:t,key:"a7b17570",className:"_81da3f7c__item _item _3043d893__col _col _3043d893__col3 _col3"},c.createElement(k,w("_3f7d13de",{"data-pc-3f7d13de":!0,"data-pc-81da3f7c":!0,key:"3f7d13de",name:e.iconName,className:"_81da3f7c__icon _icon"})),c.createElement(e.tagName||"div",{"data-pc-a6744264":!0,"data-pc-81da3f7c":!0,key:"a6744264",className:"_81da3f7c__info _info"},c.createElement(e.tagName||"div",{"data-pc-de6950d7":!0,"data-pc-81da3f7c":!0,key:"de6950d7",className:"_81da3f7c__title _title"},c.createElement(e.tagName||"span",{"data-pc-953f946f":!0,"data-pc-81da3f7c":!0,key:"953f946f"},e.title)),c.createElement(e.tagName||"div",{"data-pc-a96e6041":!0,"data-pc-81da3f7c":!0,key:"a96e6041",className:"_81da3f7c__details _details"},e.description)))}))),B=c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-49bf145c":!0,"data-pc-81da3f7c":!0,ref:t,key:"49bf145c",className:"_81da3f7c__big-feature _big-feature _3043d893__section _section _3043d893__row _row"+(e.ctaText?" _81da3f7c_has_cta has_cta":"")},c.createElement(e.tagName||"div",{"data-pc-3cf9c7b0":!0,"data-pc-81da3f7c":!0,key:"3cf9c7b0",className:"_3043d893__col _col _3043d893__col3 _col3"},c.createElement(k,w("_48e1dcc2",{"data-pc-48e1dcc2":!0,"data-pc-81da3f7c":!0,key:"48e1dcc2",name:"grow",className:"_81da3f7c__icon _icon"})),c.createElement(e.tagName||"div",{"data-pc-3fe6ec54":!0,"data-pc-81da3f7c":!0,key:"3fe6ec54",clasName:"_info"},c.createElement(e.tagName||"div",{"data-pc-30417159":!0,"data-pc-81da3f7c":!0,key:"30417159",className:"_81da3f7c__title _title"},e.title),c.createElement(e.tagName||"div",{"data-pc-474641cf":!0,"data-pc-81da3f7c":!0,key:"474641cf",className:"_81da3f7c__details _details"},e.description),c.createElement(e.tagName||"a",{"data-pc-de4f1075":!0,"data-pc-81da3f7c":!0,key:"de4f1075",className:"_81da3f7c__mini-cta-link _mini-cta-link",href:e.ctaHref&&e.ctaHref},e.ctaText,c.createElement(k,{"data-pc-e6db5a08":!0,"data-pc-81da3f7c":!0,key:"e6db5a08",name:"chevron-right",className:"_81da3f7c__mini-cta-icon _mini-cta-icon"})))),c.createElement(e.tagName||"div",{"data-pc-a5f0960a":!0,"data-pc-81da3f7c":!0,key:"a5f0960a",className:"_81da3f7c__preview _preview _3043d893__col _col _3043d893__col9 _col9"},e.preview))}))),I=(c.memo(c.forwardRef((function(e,t){return c.createElement(x,{"data-pc-ae07395b":!0,"data-pc-81da3f7c":!0,ref:t,key:"ae07395b"},c.createElement(j,{"data-pc-4160da2c":!0,"data-pc-81da3f7c":!0,key:"4160da2c",title:c.createElement(c.Fragment,{children:["Use plain HTML & CSS to build web applications in ",c.createElement(E,{"data-pc-adec955f":!0,"data-pc-81da3f7c":!0,key:"adec955f",noBreak:!0},"record time.")]}),description:c.createElement(c.Fragment,{children:["With tooling for ",c.createElement(E,{"data-pc-ac2eff68":!0,"data-pc-81da3f7c":!0,key:"ac2eff68"},"realtime previews")," & ",c.createElement(E,{"data-pc-42209e44":!0,"data-pc-81da3f7c":!0,key:"42209e44"},"automatic visual regresion testing"),", you can build UIs in no time using the language you already know."]}),cta:c.createElement(c.Fragment,{children:[c.createElement(h,{"data-pc-ae684131":!0,"data-pc-81da3f7c":!0,key:"ae684131",className:"_3151939d_semi-bold semi-bold",strong:!0},"Sign up for early access")]}),preview:c.createElement(e.tagName||"video",{"data-pc-5f4b82a2":!0,"data-pc-81da3f7c":!0,key:"5f4b82a2",src:N(a(229)),autoplay:!0,loop:!0})}),c.createElement(P,{"data-pc-3667eaba":!0,"data-pc-81da3f7c":!0,key:"3667eaba",title:"Iterate faster",text:"You shouldn't have to be bogged down by developer tooling in order to make simple HTML & CSS changes. And you should be able to make style changes confidently without needing to worry about introducing bugs. "}),c.createElement(C,{"data-pc-af6ebb00":!0,"data-pc-81da3f7c":!0,key:"af6ebb00"},c.createElement(L,{"data-pc-1b99bdd6":!0,"data-pc-81da3f7c":!0,key:"1b99bdd6",iconName:"shapes",title:"A minimalistic UI language",description:"Paperclip just covers the visuals. No logic -  just HTML, CSS, and basic component.",example:c.createElement(S,{"data-pc-27960c7":!0,"data-pc-81da3f7c":!0,key:"27960c7"})}),c.createElement(L,{"data-pc-6c9e8d40":!0,"data-pc-81da3f7c":!0,key:"6c9e8d40",iconName:"reactjs",title:"Import directly into React code",description:"Paperclip documents compile to plain code that you can import directly into your code.",example:c.createElement(S,{"data-pc-1b625186":!0,"data-pc-81da3f7c":!0,key:"1b625186"})})),c.createElement(O,{"data-pc-d8698b96":!0,"data-pc-81da3f7c":!0,key:"d8698b96"},c.createElement(T,{"data-pc-1a5bd7e1":!0,"data-pc-81da3f7c":!0,key:"1a5bd7e1",iconName:"chaotic-1",title:"No global CSS",description:"CSS styles are explicitly referenced within Paperclip, so you don't have to have to worry about styles leaking out."}),c.createElement(T,{"data-pc-6d5ce777":!0,"data-pc-81da3f7c":!0,key:"6d5ce777",iconName:"link",title:"Strongly typed",description:"UIs compile to strongly typed code, so worry less about breaking changes."}),c.createElement(T,{"data-pc-f455b6cd":!0,"data-pc-81da3f7c":!0,key:"f455b6cd",iconName:"grow",title:"Works with your existing codebase",description:"Paperclip compliments your existing codebase, so use it as you go."})),c.createElement(B,{"data-pc-a8037f19":!0,"data-pc-81da3f7c":!0,key:"a8037f19",title:"See all of your UIs in one spot",description:"No more digging around for UI elements. Open the birds-eye view to see all of your application UIs, and easily find what you're looking for.",preview:c.createElement(e.tagName||"video",{"data-pc-7e1615b2":!0,"data-pc-81da3f7c":!0,key:"7e1615b2",src:N(a(230)),autoplay:!0,loop:!0})}),c.createElement(B,{"data-pc-df044f8f":!0,"data-pc-81da3f7c":!0,key:"df044f8f",title:"Cross-browser testing made easy",description:"Launch any browser directly within Paperclip and design against them in realtime.",preview:c.createElement(e.tagName||"video",{"data-pc-670d24f3":!0,"data-pc-81da3f7c":!0,key:"670d24f3",src:N(a(231)),autoplay:!0,loop:!0})}),c.createElement(B,{"data-pc-4fbb521e":!0,"data-pc-81da3f7c":!0,key:"4fbb521e",title:"Never miss a CSS Bug",description:"Use the visual regression tool to catch every visual state of your UI. Feel more confident about maintaining your styles.",preview:c.createElement(e.tagName||"video",{"data-pc-e095383c":!0,"data-pc-81da3f7c":!0,key:"e095383c",src:N(a(232)),autoplay:!0,loop:!0}),ctaText:"View the API"}),c.createElement(I,{"data-pc-38bc6288":!0,"data-pc-81da3f7c":!0,key:"38bc6288"}))}))),c.memo(c.forwardRef((function(e,t){return c.createElement(e.tagName||"div",{"data-pc-b9c78028":!0,"data-pc-81da3f7c":!0,ref:t,key:"b9c78028"},c.createElement(e.tagName||"div",{"data-pc-80c8dc67":!0,"data-pc-81da3f7c":!0,key:"80c8dc67"},c.createElement(e.tagName||"div",{"data-pc-95f4ab7d":!0,"data-pc-81da3f7c":!0,key:"95f4ab7d"},"  \n        Paperclip is currently in closed beta, but sign up if you're interested and we'll reach out soon!\n      "),c.createElement(h,{"data-pc-cfdfac7":!0,"data-pc-81da3f7c":!0,key:"cfdfac7",className:"_3151939d_semi-bold semi-bold",strong:!0,href:"https://forms.gle/FATDYcAVUdRVJvQaA"},"Sign up for early access")))}))));Object.keys(s)[0];t.default=function(){var e=Object(o.default)().siteConfig,t=void 0===e?{}:e;return n.a.createElement("div",{className:"home"},n.a.createElement(r.a,{noFooter:!0,className:"dograg",title:t.title+" - build React apps live in VS Code",description:"Paperclip is a language for UI primitives that helps you build web apps more quickly."},n.a.createElement(x,null,n.a.createElement(j,{title:n.a.createElement(n.a.Fragment,null,"A hybrid approach between designing & coding UIs"),description:n.a.createElement(n.a.Fragment,null,"Paperclip is a free & open-source tool that gives you a designer-like experience for creating web interfaces."),cta:n.a.createElement(n.a.Fragment,null,n.a.createElement(h,{className:y,href:"https://forms.gle/FATDYcAVUdRVJvQaA",strong:!0},"Sign up for early access")),preview:n.a.createElement("video",{src:"vid/paperclip-fast-demo.mp4",autoPlay:!0,loop:!0})}),n.a.createElement(P,{title:"Build UIs faster",text:n.a.createElement(n.a.Fragment,null,"You shouldn't be bogged down by developer tooling in order to see your UIs. With Paperclip, you see what you're creating ",n.a.createElement("i",null,"as you're typing"),", no matter how large your project is. Other features such as artboards, measuring tools, and responsive testing are also there to help you build pixel-perfect UIs in no-time. Your designers will love you. \u2764\ufe0f")}),n.a.createElement(C,null,n.a.createElement(L,{iconName:"shapes",title:"Just covers presentational components",description:n.a.createElement(n.a.Fragment,null,"Paperclip focuses purely on your application appearance using a syntax similar to HTML & CSS."),example:n.a.createElement(m.a,{className:"language-html",style:{height:500}},p)}),n.a.createElement(L,{iconName:"reactjs",title:"Import directly into your React app",description:"After you quickly crank out all of your HTML & CSS, you can import your Paperclip files like regular code. No runtime needed.",example:n.a.createElement(m.a,{className:"language-jsx"},d)})),n.a.createElement(O,null,n.a.createElement(T,{iconName:"grow",title:"Just like CSS-in-JS",description:"Try it out! Paperclip works just like other CSS-in-JS libraries such as Emotion, and Styled Components. If you don't like Paperclip, you can easily switch back."}),n.a.createElement(T,{iconName:"chaotic-1",title:"HTML & CSS your way",description:"Write HTML & CSS however you want. Paperclip comes with loads of safety features to make sure that your code stays maintainble, and you can confidently make updates without introducing visual regressions."}),n.a.createElement(T,{iconName:"link",title:"Live VS Code extension",description:["Conveniently build UIs ",n.a.createElement("i",null,"live")," within VS Code. No more need to switch back and forth between the browser."]})),n.a.createElement(B,{title:"Pairs well with existing CSS",description:["Paperclip enhances the existing CSS framework you're using by keeping it ",n.a.createElement("i",null,"scoped"),", so you have absolute control over how it's used in your app, and never have to worry about styles leaking out."],preview:n.a.createElement(m.a,{className:"language-html"},'\n<import src="tailwind.css" as="tw"  />\n\n\n\x3c!--\n  @frame { width: 768, height: 768, x: 0, y: 0 }\n--\x3e\n\n<div class="$tw.font-sans $tw.bg-gray-500 $tw.h-screen $tw.w-screen">\n  <div class="$tw.bg-gray-100 $tw.rounded-lg $tw.p-8 $tw.md:p-0">\n    <div class="$tw.pt-6 $tw.text-center $tw.space-y-4">\n      <blockquote>\n        <p class="$tw.text-lg $tw.font-semibold">\n          Lorem ipsum dolor sit amet, consectetur adipiscing elit, \n          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n        </p>\n      </blockquote>\n      <figcaption class="$tw.font-medium">\n        <div class="$tw.text-blue-600">\n          sit voluptatem\n        </div>\n      </figcaption>\n    </div>\n  </div>\n</div>')}),n.a.createElement(B,{title:"Everything in one spot",description:["Use the birds-eye view to see ",n.a.createElement("i",null,"all")," of your components, and find exactly what you're looking for."],preview:n.a.createElement("video",{src:"vid/grid-demo.mp4",autoPlay:!0,loop:!0})}),n.a.createElement(B,{title:"Cross-browser testing made easy",description:["Launch ",n.a.createElement("i",null,"any browser")," you want directly from Paperclip to catch those elusive CSS bugs more quickly."],preview:n.a.createElement("video",{src:"vid/cross-browser-testing.mp4",autoPlay:!0,loop:!0})}),n.a.createElement(B,{title:"Easy visual regression test setup",description:"Paperclip comes with visual regression tooling that takes less than 10 minutes to setup and gives you nearly 100% visual regression coverage, so you can feel confident about making big style changes in your application, and without breaking production.",preview:n.a.createElement("video",{src:"vid/visual-regression-testing.mp4",autoPlay:!0,loop:!0})}),n.a.createElement(I,null))))}},147:function(e,t,a){"use strict";var c={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]},n=a(154),r=a(140);t.a=function(){var e=Object(r.useThemeConfig)().prism,t=Object(n.a)().isDarkTheme,a=e.theme||c,o=e.darkTheme||a;return t?o:a}},149:function(e,t,a){"use strict";var c=a(3),n=a(0),r=a.n(n),o=a(139),l={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},i={Prism:a(24).a,theme:l};function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(e[c]=a[c])}return e}).apply(this,arguments)}var p=/\r\n|\r|\n/,m=function(e){0===e.length?e.push({types:["plain"],content:"",empty:!0}):1===e.length&&""===e[0].content&&(e[0].empty=!0)},f=function(e,t){var a=e.length;return a>0&&e[a-1]===t?e:e.concat(t)},u=function(e,t){var a=e.plain,c=Object.create(null),n=e.styles.reduce((function(e,a){var c=a.languages,n=a.style;return c&&!c.includes(t)||a.types.forEach((function(t){var a=d({},e[t],n);e[t]=a})),e}),c);return n.root=a,n.plain=d({},a,{backgroundColor:null}),n};function y(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&-1===t.indexOf(c)&&(a[c]=e[c]);return a}var g=function(e){function t(){for(var t=this,a=[],c=arguments.length;c--;)a[c]=arguments[c];e.apply(this,a),s(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var a=e.theme?u(e.theme,e.language):void 0;return t.themeDict=a})),s(this,"getLineProps",(function(e){var a=e.key,c=e.className,n=e.style,r=d({},y(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),o=t.getThemeDict(t.props);return void 0!==o&&(r.style=o.plain),void 0!==n&&(r.style=void 0!==r.style?d({},r.style,n):n),void 0!==a&&(r.key=a),c&&(r.className+=" "+c),r})),s(this,"getStyleForToken",(function(e){var a=e.types,c=e.empty,n=a.length,r=t.getThemeDict(t.props);if(void 0!==r){if(1===n&&"plain"===a[0])return c?{display:"inline-block"}:void 0;if(1===n&&!c)return r[a[0]];var o=c?{display:"inline-block"}:{},l=a.map((function(e){return r[e]}));return Object.assign.apply(Object,[o].concat(l))}})),s(this,"getTokenProps",(function(e){var a=e.key,c=e.className,n=e.style,r=e.token,o=d({},y(e,["key","className","style","token"]),{className:"token "+r.types.join(" "),children:r.content,style:t.getStyleForToken(r),key:void 0});return void 0!==n&&(o.style=void 0!==o.style?d({},o.style,n):n),void 0!==a&&(o.key=a),c&&(o.className+=" "+c),o}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,a=e.language,c=e.code,n=e.children,r=this.getThemeDict(this.props),o=t.languages[a];return n({tokens:function(e){for(var t=[[]],a=[e],c=[0],n=[e.length],r=0,o=0,l=[],i=[l];o>-1;){for(;(r=c[o]++)<n[o];){var s=void 0,d=t[o],u=a[o][r];if("string"==typeof u?(d=o>0?d:["plain"],s=u):(d=f(d,u.type),u.alias&&(d=f(d,u.alias)),s=u.content),"string"==typeof s){var y=s.split(p),g=y.length;l.push({types:d,content:y[0]});for(var b=1;b<g;b++)m(l),i.push(l=[]),l.push({types:d,content:y[b]})}else o++,t.push(d),a.push(s),c.push(0),n.push(s.length)}o--,t.pop(),a.pop(),c.pop(),n.pop()}return m(l),i}(void 0!==o?t.tokenize(c,o,a):[c]),className:"prism-code language-"+a,style:void 0!==r?r.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(n.Component),b=a(161),_=a.n(b),h=a(162),v=a.n(h),k=a(147),N=a(60),w=a.n(N),E=a(140),x=/{([\d,-]+)}/,j=function(e){void 0===e&&(e=["js","jsBlock","jsx","python","html"]);var t={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},python:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},a=["highlight-next-line","highlight-start","highlight-end"].join("|"),c=e.map((function(e){return"(?:"+t[e].start+"\\s*("+a+")\\s*"+t[e].end+")"})).join("|");return new RegExp("^\\s*(?:"+c+")\\s*$")},S=/(?:title=")(.*)(?:")/;t.a=function(e){var t=e.children,a=e.className,l=e.metastring,s=Object(E.useThemeConfig)().prism,d=Object(n.useState)(!1),p=d[0],m=d[1],f=Object(n.useState)(!1),u=f[0],y=f[1];Object(n.useEffect)((function(){y(!0)}),[]);var b=Object(n.useRef)(null),h=[],N="",P=Object(k.a)(),C=Array.isArray(t)?t.join(""):t;if(l&&x.test(l)){var L=l.match(x)[1];h=v()(L).filter((function(e){return e>0}))}l&&S.test(l)&&(N=l.match(S)[1]);var O=a&&a.replace(/language-/,"");!O&&s.defaultLanguage&&(O=s.defaultLanguage);var T=C.replace(/\n$/,"");if(0===h.length&&void 0!==O){for(var B,I="",F=function(e){switch(e){case"js":case"javascript":case"ts":case"typescript":return j(["js","jsBlock"]);case"jsx":case"tsx":return j(["js","jsBlock","jsx"]);case"html":return j(["js","jsBlock","html"]);case"python":case"py":return j(["python"]);default:return j()}}(O),R=C.replace(/\n$/,"").split("\n"),$=0;$<R.length;){var A=$+1,M=R[$].match(F);if(null!==M){switch(M.slice(1).reduce((function(e,t){return e||t}),void 0)){case"highlight-next-line":I+=A+",";break;case"highlight-start":B=A;break;case"highlight-end":I+=B+"-"+(A-1)+","}R.splice($,1)}else $+=1}h=v()(I),T=R.join("\n")}var U=function(){_()(T),m(!0),setTimeout((function(){return m(!1)}),2e3)};return r.a.createElement(g,Object(c.a)({},i,{key:String(u),theme:P,code:T,language:O}),(function(e){var t,a=e.className,n=e.style,l=e.tokens,i=e.getLineProps,s=e.getTokenProps;return r.a.createElement(r.a.Fragment,null,N&&r.a.createElement("div",{style:n,className:w.a.codeBlockTitle},N),r.a.createElement("div",{className:w.a.codeBlockContent},r.a.createElement("div",{tabIndex:0,className:Object(o.a)(a,w.a.codeBlock,"thin-scrollbar",(t={},t[w.a.codeBlockWithTitle]=N,t))},r.a.createElement("div",{className:w.a.codeBlockLines,style:n},l.map((function(e,t){1===e.length&&""===e[0].content&&(e[0].content="\n");var a=i({line:e,key:t});return h.includes(t+1)&&(a.className=a.className+" docusaurus-highlight-code-line"),r.a.createElement("div",Object(c.a)({key:t},a),e.map((function(e,t){return r.a.createElement("span",Object(c.a)({key:t},s({token:e,key:t})))})))})))),r.a.createElement("button",{ref:b,type:"button","aria-label":"Copy code to clipboard",className:Object(o.a)(w.a.copyButton),onClick:U},p?"Copied":"Copy")))}))}},161:function(e,t,a){"use strict";const c=(e,{target:t=document.body}={})=>{const a=document.createElement("textarea"),c=document.activeElement;a.value=e,a.setAttribute("readonly",""),a.style.contain="strict",a.style.position="absolute",a.style.left="-9999px",a.style.fontSize="12pt";const n=document.getSelection();let r=!1;n.rangeCount>0&&(r=n.getRangeAt(0)),t.append(a),a.select(),a.selectionStart=0,a.selectionEnd=e.length;let o=!1;try{o=document.execCommand("copy")}catch(l){}return a.remove(),r&&(n.removeAllRanges(),n.addRange(r)),c&&c.focus(),o};e.exports=c,e.exports.default=c},162:function(e,t){function a(e){let t,a=[];for(let c of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(c))a.push(parseInt(c,10));else if(t=c.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,c,n,r]=t;if(c&&r){c=parseInt(c),r=parseInt(r);const e=c<r?1:-1;"-"!==n&&".."!==n&&"\u2025"!==n||(r+=e);for(let t=c;t!==r;t+=e)a.push(t)}}return a}t.default=a,e.exports=a},188:function(e,t,a){"use strict";e.exports=function(e){var t=void 0;t="string"==typeof e?[e]:e.raw;for(var a="",c=0;c<t.length;c++)a+=t[c].replace(/\\\n[ \t]*/g,"").replace(/\\`/g,"`"),c<(arguments.length<=1?0:arguments.length-1)&&(a+=arguments.length<=c+1?void 0:arguments[c+1]);var n=a.split("\n"),r=null;return n.forEach((function(e){var t=e.match(/^(\s+)\S+/);if(t){var a=t[1].length;r=r?Math.min(r,a):a}})),null!==r&&(a=n.map((function(e){return" "===e[0]?e.slice(r):e})).join("\n")),(a=a.trim()).replace(/\\n/g,"\n")}},228:function(e,t,a){"use strict";a.r(t),a.d(t,"ReactComponent",(function(){return u}));var c=a(0);function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(e[c]=a[c])}return e}).apply(this,arguments)}function r(e,t){if(null==e)return{};var a,c,n=function(e,t){if(null==e)return{};var a,c,n={},r=Object.keys(e);for(c=0;c<r.length;c++)a=r[c],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(c=0;c<r.length;c++)a=r[c],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=c.createElement("path",{fill:"#FF8080",d:"M24 15h6v4h-6z"}),l=c.createElement("path",{fill:"#8094FF",d:"M33 15h3v4h-3z"}),i=c.createElement("path",{fill:"#80FFB2",d:"M21 22h8v4h-8z"}),s=c.createElement("path",{fill:"#DE80FF",d:"M16 29h9v4h-9zM27 8h5v4h-5z"}),d=c.createElement("path",{fill:"#FFE380",d:"M28 29h4v4h-4z"}),p=c.createElement("path",{fill:"#8094FF",d:"M14 36h8v4h-8z"}),m=c.createElement("path",{fill:"#80FFB2",d:"M25 36h9v4h-9z"}),f=c.createElement("path",{d:"M52.838 33.321l-13.424-23.25c-2.694-4.666-9.43-4.666-12.124 0l-13.857 24c-2.694 4.667.674 10.5 6.063 10.5h17.699m3.147-32.892l13.75 23.816a5.5 5.5 0 11-9.526 5.5l-9.625-16.671",stroke:"#FFF",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round"});function u(e){var t=e.title,a=e.titleId,u=r(e,["title","titleId"]);return c.createElement("svg",n({width:64,height:62,viewBox:"0 0 64 62",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-labelledby":a},u),t?c.createElement("title",{id:a},t):null,o,l,i,s,d,p,m,f)}t.default=a.p+"9cec8c5fd90d28aef5b40f66f90c4b6d.svg"},229:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/medias/paperclip-fast-demo-c2b6969df90230ac2918a59bfb42a2b0.mp4"},230:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/medias/grid-demo-33c65dbdf058fd67661b6bc7221e3e7c.mp4"},231:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/medias/cross-browser-testing-ad84afdd569764285fc06dff2b1e55c6.mp4"},232:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/medias/visual-regression-testing-e47de56ac5c99316145fd2e81cbc0582.mp4"}}]);