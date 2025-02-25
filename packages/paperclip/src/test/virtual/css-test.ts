import { expect } from "chai";
import { createMockEngine, stringifyLoadResult } from "../utils";

import { noop } from "../../core/utils";
import { LoadedPCData, stringifyCSSSheet } from "../../core";

describe(__filename + "#", () => {
  it("can render a simple style", async () => {
    const graph = {
      "/entry.pc": `<style>
        .a {
          color: b;
        }
      </style>`
    };
    const engine = await createMockEngine(graph);
    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql("<style>[class]._80f4925f_a { color:b; }</style>");
  });

  it("displays an error if style url not found", async () => {
    const graph = {
      "/entry.pc": `
        <style>
          .rule {
            background: url('/not/found.png')
          }
        </style>
      `
    };
    const engine = await createMockEngine(graph, noop, {
      resolveFile() {
        return null;
      }
    });

    let err;
    try {
      engine.open("/entry.pc");
    } catch (e) {
      err = e;
    }
    expect(err).to.eql({
      errorKind: "Runtime",
      uri: "/entry.pc",
      location: { start: 59, end: 91 },
      message: "Unable to resolve file: /not/found.png from /entry.pc"
    });
  });

  it("can resolve some relative urls", async () => {
    const graph = {
      "/entry.pc": `
        <style>
          .rule {
            background: url('./test.woff');
            color: url("./test.woff");
            src: url("http://google.com");
          }
        </style>
      `,
      "/test.woff": ""
    };
    const engine = await createMockEngine(graph, noop, {
      resolveFile() {
        return "/test.woooof";
      }
    });

    const result = engine.open("/entry.pc");
    expect(stringifyCSSSheet(result.sheet).replace(/[\n\s]+/g, " ")).to.eql(
      `[class]._80f4925f_rule { background:url(/test.woooof); color:url(/test.woooof); src:url("http://google.com"); }`
    );
  });

  describe("Mixins", () => {
    it("can be created & used", async () => {
      const graph = {
        "/entry.pc": `<style>
          @mixin a {
            color: blue;
          }
          div {
            @include a;
          }
        </style>`
      };
      const engine = await createMockEngine(graph);
      const text = stringifyLoadResult(await engine.open("/entry.pc"));
      expect(text).to.eql(
        "<style>div[data-pc-80f4925f] { color:blue; }</style>"
      );
    });

    it("Displays an error if a mixin is not found", async () => {
      const graph = {
        "/entry.pc": `<style>
          div {
            @include a;
          }
        </style>`
      };
      const engine = await createMockEngine(graph);
      let err;
      try {
        await engine.open("/entry.pc");
      } catch (e) {
        err = e;
      }
      expect(err).to.eql({
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 45, end: 46 },
        message: "Reference not found."
      });
    });

    it("can use an imported mixin", async () => {
      const graph = {
        "/entry.pc": `<import as="mod" src="./module.pc"  /><style>
          div {
            @include mod.a;
          }
        </style>`,
        "/module.pc": `<style>
          @export {
            @mixin a {
              color: orange;
            }
          }
        </style>`
      };
      const engine = await createMockEngine(graph);
      const text = stringifyLoadResult(await engine.open("/entry.pc"));
      expect(text).to.eql(
        "<style>div[data-pc-80f4925f] { color:orange; }</style>"
      );
    });
    it("Displays an error if an imported mixin is not found", async () => {
      const graph = {
        "/entry.pc": `<import as="mod" src="./module.pc"  /><style>
          div {
            @include mod.a;
          }
        </style>`,
        "/module.pc": `<style>
        </style>`
      };
      const engine = await createMockEngine(graph);
      let err;
      try {
        await engine.open("/entry.pc");
      } catch (e) {
        err = e;
      }
      expect(err).to.eql({
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 87, end: 88 },
        message: "Reference not found."
      });
    });
    it("Displays an error if the import is not found", async () => {
      const graph = {
        "/entry.pc": `<style>
          div {
            @include mod.a;
          }
        </style>`
      };
      const engine = await createMockEngine(graph);
      let err;
      try {
        await engine.open("/entry.pc");
      } catch (e) {
        err = e;
      }
      expect(err).to.eql({
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 45, end: 48 },
        message: "Reference not found."
      });
    });

    // expectation is still incorrect, just want to make sure that this doesn't break the engine
    it("Smoke -- can use nested refs", async () => {
      const graph = {
        "/entry.pc": `<style>
          div {
            @include a.b.c;
          }
        </style>`
      };
      const engine = await createMockEngine(graph);
      let err;
      try {
        await engine.open("/entry.pc");
      } catch (e) {
        err = e;
      }
      expect(err).to.eql({
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 45, end: 46 },
        message: "Reference not found."
      });
    });

    it("Displays an error if a mixin is used but not exported", async () => {
      const graph = {
        "/entry.pc": `<import as="mod" src="./module.pc"  /><style>
          div {
            @include mod.abcde;
          }
        </style>`,
        "/module.pc": `<style>
          @mixin abcde {
            color: orange;
          }
        </style>`
      };
      const engine = await createMockEngine(graph);
      let err;
      try {
        await engine.open("/entry.pc");
      } catch (e) {
        err = e;
      }
      expect(err).to.eql({
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 87, end: 92 },
        message: "This mixin is private."
      });
    });

    it("Display an error if a mixins is already defined in the upper scope", async () => {
      const graph = {
        "/entry.pc": `<style>
          @mixin abcde {
            color: blue;
          }
          
          @mixin abcde {
            color: orange;
          }
        </style>`
      };
      const engine = await createMockEngine(graph);
      let err;
      try {
        await engine.open("/entry.pc");
      } catch (e) {
        err = e;
      }
      expect(err).to.eql({
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 98, end: 103 },
        message: "This mixin is already declared in the upper scope."
      });
    });

    it("properly concats using multiple &", async () => {
      const graph = {
        "/entry.pc": `<style>
          .company_list {
            list-style: none;
            margin: 0;
            padding: 0;
        
            & li {
        
              display: block;
              padding: var(--spacing-600) 0;
        
              & + & {
                border-top: 1px solid var(--color-black-100);
              }
            }
          }
        </style>`
      };

      const engine = await createMockEngine(graph);
      const result = await engine.open("/entry.pc");
      expect(stringifyLoadResult(result)).to.eql(
        `<style>[class]._80f4925f_company_list { list-style:none; margin:0; padding:0; } [class]._80f4925f_company_list li[data-pc-80f4925f] { display:block; padding:var(--spacing-600) 0; } [class]._80f4925f_company_list li[data-pc-80f4925f] + [class]._80f4925f_company_list li[data-pc-80f4925f] { border-top:1px solid var(--color-black-100); }</style>`
      );
    });
  });

  it("can use escape key in classname", async () => {
    const graph = {
      "/entry.pc": `<style>
        .a\\:b {
          color: blue;
        }
      </style>`
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");
    expect(stringifyLoadResult(result)).to.eql(
      `<style>[class]._80f4925f_a\\:b { color:blue; }</style>`
    );
  });

  it("can use single line comment", async () => {
    const graph = {
      "/entry.pc": `<style>


      // :checked
      input:checked {
        & + .tab-label {
          background: var(--midnight-darker);
          &::after {
            transform: rotate(90deg);
          }
        }
        & ~ .tab-content {
          max-height: 100vh;
          padding: 1em;
        }
      }
      
      </style>`
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");
    expect(stringifyLoadResult(result)).to.eql(
      `<style>input[data-pc-80f4925f]:checked + [class]._80f4925f_tab-label { background:var(--midnight-darker); } input[data-pc-80f4925f]:checked + [class]._80f4925f_tab-label::after { transform:rotate(90deg); } input[data-pc-80f4925f]:checked ~ [class]._80f4925f_tab-content { max-height:100vh; padding:1em; }</style>`
    );
  });

  it("errors if comment is unterminated", async () => {
    const graph = {
      "/entry.pc": `<style>
        /* foreverrrrrr
      </style>`
    };

    const engine = await createMockEngine(graph);
    let err;
    try {
      await engine.open("/entry.pc");
    } catch (e) {
      err = e;
    }
    expect(err).to.eql({
      errorKind: "Graph",
      uri: "/entry.pc",
      info: {
        kind: "Unterminated",
        message: "Unterminated element.",
        location: { start: 0, end: 7 }
      }
    });
  });

  it("CSS vars are collected in the evaluated output", async () => {
    const graph = {
      "/entry.pc": `<style>
        .element {
          --color: test;
        }
      </style>ab`
    };
    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect((result as LoadedPCData).exports.style.variables["--color"]).to.eql({
      name: "--color",
      value: "test",
      source: {
        uri: "/entry.pc",
        location: {
          start: 37,
          end: 51
        }
      }
    });
  });

  it("CSS class names are pulled out", async () => {
    const graph = {
      "/entry.pc": `<style>

        // comment test
        [a] {
          & .color {

          }
        }
        @export {
          .div {

          }
        }
        .element {
          &.child {

          }
          &--child {

          }
        }
      </style>ab`
    };
    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect((result as LoadedPCData).exports.style.classNames).to.eql({
      color: { name: "color", public: false, scopedName: "_80f4925f_color" },
      div: { name: "div", public: true, scopedName: "_pub-80f4925f_div" },
      child: { name: "child", public: false, scopedName: "child" },
      "element--child": {
        name: "element--child",
        public: false,
        scopedName: "_80f4925f_element--child"
      },
      element: {
        name: "element",
        public: false,
        scopedName: "_80f4925f_element"
      }
    });
  });

  it("maintains space with & selector", async () => {
    const graph = {
      "/entry.pc": `<style>
      .todo {
        &:hover .destroy {
            display: inline-block;
        }
        & .todo {
          &--item .destroy {
            display: inline-block;
          }
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");
    expect(stringifyLoadResult(result)).to.eql(
      `<style>[class]._80f4925f_todo:hover [class]._80f4925f_destroy { display:inline-block; } [class]._80f4925f_todo [class]._80f4925f_todo--item [class]._80f4925f_destroy { display:inline-block; }</style>`
    );
  });

  it("can parse nested tag selectors", async () => {
    const graph = {
      "/entry.pc": `<style>
      a {
        & svg:a {
          margin-right: 4px;
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");
    expect(stringifyLoadResult(result)).to.eql(
      `<style>a[data-pc-80f4925f] svg[data-pc-80f4925f]:a { margin-right:4px; }</style>`
    );
  });

  it("can render keyframes with a dash in the name", async () => {
    const graph = {
      "/entry.pc": `<style>
      @keyframes lds-something3 {

      }

      div {
        animation: lds-something3 1s;
      }
    </style>`
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");
    expect(stringifyLoadResult(result)).to.eql(
      `<style>@keyframes _80f4925f_lds-something3 { } div[data-pc-80f4925f] { animation:_80f4925f_lds-something3 1s; }</style>`
    );
  });

  it("can evaluated multiple nested selectors without &", async () => {
    const graph = {
      "/entry.pc": `<style>
      a {
        > b {
          color: blue;
        }
        + c {
          color: black;
        }
        ~ d {
          color: red;
        }
        :not(.div) {
          color: voilet;
        }
        ::active {
          color: green;
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");
    expect(stringifyLoadResult(result)).to.eql(
      `<style>a[data-pc-80f4925f] > b[data-pc-80f4925f] { color:blue; } a[data-pc-80f4925f] + c[data-pc-80f4925f] { color:black; } a[data-pc-80f4925f] ~ d[data-pc-80f4925f] { color:red; } a[data-pc-80f4925f] [data-pc-80f4925f]:not([class].div) { color:voilet; } a[data-pc-80f4925f] [data-pc-80f4925f]::active { color:green; }</style>`
    );
  });

  it("AST location is correct with unicode characters", async () => {
    const graph = {
      "/entry.pc": `<style>
      /* 👍🏻 */
      // 👍🏻
      .div {
        content: "👌"
      }
      .another {
      }
    </style>`
    };
    const engine = await createMockEngine(graph);
    await engine.open("/entry.pc");
    const ast = (await engine.getLoadedAst("/entry.pc")) as any;
    expect(ast.children[0].sheet.rules[1].location).to.eql({
      start: 88,
      end: 111
    });
  });

  it("includes keyframes in export", async () => {
    const graph = {
      "/entry.pc": `<style>
      @keyframes a {

      }
      @export {
        @keyframes b {

        }
      }

    </style>`
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");
    expect((result as LoadedPCData).exports.style.keyframes).to.eql({
      b: {
        name: "b",
        public: true,
        source: {
          uri: "/entry.pc",
          location: {
            start: 73,
            end: 94
          }
        }
      },
      a: {
        name: "a",
        public: false,
        source: {
          uri: "/entry.pc",
          location: {
            start: 25,
            end: 44
          }
        }
      }
    });
  });

  it("can export class names with _ prefix", async () => {
    const graph = {
      "/entry.pc": `<style>
      @export {
        ._b {

        }
      }

    </style>`
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");
    expect((result as LoadedPCData).exports.style.classNames).to.eql({
      _b: { name: "_b", scopedName: "_pub-80f4925f__b", public: true }
    });
  });

  // Addresses https://github.com/crcn/paperclip/issues/319
  it("shows an error if including a mixin that doesn't exist within a mixin that's exported", async () => {
    const graph = {
      "/entry.pc": `<style>
      @export {
        @mixin ab {
          @include no-boom;
        }
      }

      .test {
        @include ab;
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    let err;

    try {
      await engine.open("/entry.pc");
    } catch (e) {
      err = e;
    }
    expect(err).to.eql({
      errorKind: "Runtime",
      uri: "/entry.pc",
      location: { start: 63, end: 70 },
      message: "Reference not found."
    });
  });

  // Addresses https://github.com/crcn/paperclip/issues/326
  it("can have nested pseudo selectors", async () => {
    const graph = {
      "/entry.pc": `<style>
      .parent {
        .child:first-child {
          color: blue
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      "<style>[class]._80f4925f_parent [class].child[data-pc-80f4925f]:first-child { color:blue ; }</style>"
    );
  });

  // Addresses: https://github.com/crcn/paperclip/issues/340
  it("Can use mixins in other style blocks defined in the same page", async () => {
    const graph = {
      "/entry.pc": `<style>
      @mixin a {
        color: blue;
      }
    </style>
    <style>
      .div {
        @include a;
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql("<style>[class]._80f4925f_div { color:blue; }</style>");
  });

  // Addresses https://github.com/crcn/paperclip/issues/417
  it("properly renders global * selector", async () => {
    const graph = {
      "/entry.pc": `<style>
      div {
        > :global(*) {
          color: blue;
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      "<style>div[data-pc-80f4925f] > * { color:blue; }</style>"
    );
  });

  it("Certain declarations are auto-prefixed", async () => {
    const graph = {
      "/entry.pc": `<style>
      div {
        mask-image: d;
        
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      "<style>div[data-pc-80f4925f] { mask-image:d; -webkit-mask-image:d; }</style>"
    );
  });

  it("Properly renders nested selectors", async () => {
    const graph = {
      "/entry.pc": `<style>
      .a {
        .b {
          &--c&--d {
            color: blue;
          }
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      "<style>[class]._80f4925f_a [class]._80f4925f_b--c[class]._80f4925f_a [class]._80f4925f_b--d { color:blue; }</style>"
    );
  });

  it("Can include style rules within mixins", async () => {
    const graph = {
      "/entry.pc": `<style>
      @mixin test {
        .a {
          color: blue;
        }
      }

      @include test;
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql("<style>[class]._80f4925f_a { color:blue; }</style>");
  });

  it("Can include mixin rules into a style rule", async () => {
    const graph = {
      "/entry.pc": `<style>
      @mixin test {
        .e {
          color: blue;
        }
      }

      a {
        b, c, d {
          @include test;
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      "<style>a[data-pc-80f4925f] b[data-pc-80f4925f] [class]._80f4925f_e { color:blue; } a[data-pc-80f4925f] c[data-pc-80f4925f] [class]._80f4925f_e { color:blue; } a[data-pc-80f4925f] d[data-pc-80f4925f] [class]._80f4925f_e { color:blue; }</style>"
    );
  });

  it("Can include media declarations within style rule", async () => {
    const graph = {
      "/entry.pc": `<style>
      a {
        @media screen and (max-width: 450px) {
          color: red;
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      "<style>@media screen and (max-width: 450px) { a[data-pc-80f4925f] { color:red; } }</style>"
    );
  });

  it("Can include a nested rule within a media rule", async () => {
    const graph = {
      "/entry.pc": `<style>
      a {
        @media screen and (max-width: 450px) {
          color: red;
          b {
            color: orange;
          }
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      "<style>@media screen and (max-width: 450px) { a[data-pc-80f4925f] b[data-pc-80f4925f] { color:orange; } a[data-pc-80f4925f] { color:red; } }</style>"
    );
  });

  it("Can define a selector mixin with @content", async () => {
    const graph = {
      "/entry.pc": `<style>
      @mixin div {
        div {
          @content;
        }
      }

      @include div {
        color: red;
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql("<style>div[data-pc-80f4925f] { color:red; }</style>");
  });

  it("Can include @content with a rule", async () => {
    const graph = {
      "/entry.pc": `<style>
      @mixin desktop {
        b {
          @content;
        }
      }
      a {
        @include desktop {
          c {
            color: red;
          }
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      "<style>a[data-pc-80f4925f] b[data-pc-80f4925f] c[data-pc-80f4925f] { color:red; }</style>"
    );
  });

  it("Can include @content within @media", async () => {
    const graph = {
      "/entry.pc": `<style>
      @mixin desktop {
        @media a {
          @content;
        }
      }

      @include desktop {
        b {
          color: red;
        }
        c {
          color: red;
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      "<style>@media a { b[data-pc-80f4925f] { color:red; } c[data-pc-80f4925f] { color:red; } { } }</style>"
    );
  });

  it("can include a media query mixin", async () => {
    const graph = {
      "/entry.pc": `<style>
      @mixin desktop {
        @media screen and (max-width: 400px) {
          @content;
        }
      }
    
      .test {
        font-family: sans-serif;
        @include desktop {
          font-size: 40px;
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      "<style>[class]._80f4925f_test { font-family:sans-serif; } @media screen and (max-width: 400px) { [class]._80f4925f_test { font-size:40px; } }</style>"
    );
  });

  // Fix https://github.com/crcn/paperclip/issues/529
  it(`can use & in media query include`, async () => {
    const graph = {
      "/entry.pc": `
      <style>
        @mixin desktop {
          @media screen and (max-width: 900px) {
            @content;
          }
        }
      </style>
      <div component as="Test">
        <style>
          a {
            @include desktop {
              &:nth-child(2n) {
                color: red;
              }
            }
          }
        </style>
      </div>
      
      <Test />
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");
    expect(stringifyLoadResult(result)).to.eql(
      "<style>@media screen and (max-width: 900px) { [data-pc-376a18c0] a[data-pc-80f4925f]:nth-child(2n) { color:red; } [data-pc-376a18c0] a[data-pc-80f4925f] { } }</style><div data-pc-376a18c0 data-pc-80f4925f data-pc-pub-80f4925f></div>"
    );
  });

  // sanity after #529
  it(`can use & in media query include`, async () => {
    const graph = {
      "/entry.pc": `
      <style>
        @mixin mixin-a {
          @media screen and (max-width: 900px) {
            @content
            b {
              c {
                @content
              }
            }
          }
        }

        a {
          @include mixin-a {
            background: blue;
            ee {
              color: red;
            }

            &.ff {
              color: orange;
            }
          }
        }

      </style>
      
      <Test />
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");
    expect(stringifyLoadResult(result)).to.eql(
      "<style>@media screen and (max-width: 900px) { a[data-pc-80f4925f] b[data-pc-80f4925f] c[data-pc-80f4925f] { background:blue; } a[data-pc-80f4925f] b[data-pc-80f4925f] c[data-pc-80f4925f] ee[data-pc-80f4925f] { color:red; } a[data-pc-80f4925f] b[data-pc-80f4925f] c[data-pc-80f4925f][class].ff { color:orange; } a[data-pc-80f4925f] ee[data-pc-80f4925f] { color:red; } a[data-pc-80f4925f][class].ff { color:orange; } a[data-pc-80f4925f] { background:blue; } }</style><Test data-pc-80f4925f data-pc-pub-80f4925f></Test>"
    );
  });

  it("properly orders include with nested selector", async () => {
    const graph = {
      "/entry.pc": `<style>
      @mixin desktop {
        @media screen and (max-width: 400px) {
          @content;
        }
      }
    
      .test {
        font-family: sans-serif;
        .b {
          color: blue;
        }
        @include desktop {
          .b {
            font-size: 40px;
          }
        }
      }
    </style>`
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      "<style>[class]._80f4925f_test { font-family:sans-serif; } [class]._80f4925f_test [class]._80f4925f_b { color:blue; } @media screen and (max-width: 400px) { [class]._80f4925f_test [class]._80f4925f_b { font-size:40px; } [class]._80f4925f_test { } }</style>"
    );
  });

  // fix https://github.com/crcn/paperclip/issues/535
  it("multiple :not selectors work", async () => {
    const graph = {
      "/entry.pc": `<style>

        .a {
          &.hover {
            color: blue;
          }
          &:not(:disabled):not(.transparent) {
            &.hover {
              color: red;
            }
          }
        }
    </style>
    <div class="a hover">I'm red</div>
    <div class="a transparent hover">I'm blue</div>
    
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[class]._80f4925f_a[class].hover { color:blue; } [class]._80f4925f_a:not(:disabled):not([class].transparent)[class].hover { color:red; }</style><div class="_80f4925f_a _pub-80f4925f_a a _80f4925f_hover _pub-80f4925f_hover hover" data-pc-80f4925f data-pc-pub-80f4925f>I'm red</div><div class="_80f4925f_a _pub-80f4925f_a a _80f4925f_transparent _pub-80f4925f_transparent transparent _80f4925f_hover _pub-80f4925f_hover hover" data-pc-80f4925f data-pc-pub-80f4925f>I'm blue</div>`
    );
  });

  // Fixes https://github.com/crcn/paperclip/issues/534
  it("can add extra specificty for nested elements", async () => {
    const graph = {
      "/entry.pc": `
    
      <div>
        <style>
          ._button {
            &&& {
              color: red;
            }
          }
        </style>
        <div class="_button">I'm a button</div>
      </div>
    
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[data-pc-406d2856] [class]._80f4925f__button[class]._80f4925f__button[class]._80f4925f__button { color:red; }</style><div data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f><div class="_80f4925f__button _pub-80f4925f__button _button" data-pc-80f4925f data-pc-pub-80f4925f>I'm a button</div></div>`
    );
  });

  // Fixes https://github.com/crcn/paperclip/issues/534
  it("ensures that :self selectors are given higher priority", async () => {
    const graph = {
      "/entry.pc": `
    
      <div>
        <style>
          color: blue;
          :self {
            ._button {
              && {
                color: red;
              }
            }
          }
        </style>
        <div class="_button">I'm a button</div>
      </div>
    
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[data-pc-406d2856][data-pc-406d2856] { color:blue; } [data-pc-406d2856][data-pc-406d2856] [class]._80f4925f__button[data-pc-406d2856][data-pc-406d2856] [class]._80f4925f__button { color:red; }</style><div data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f><div class="_80f4925f__button _pub-80f4925f__button _button" data-pc-80f4925f data-pc-pub-80f4925f>I'm a button</div></div>`
    );
  });

  it(":self is given higher priority than declarations", async () => {
    const graph = {
      "/entry.pc": `
    
      <div>
        <style>
          color: red;
          :self {
            color: blue;
          }
        </style>
      </div>
    
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[data-pc-406d2856][data-pc-406d2856] { color:red; } [data-pc-406d2856][data-pc-406d2856] { color:blue; }</style><div data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(":within applies styles when div is within ancestor", async () => {
    const graph = {
      "/entry.pc": `
    
      <div>
        <style>
          color: red;
          &:within(.variant) {
            color: blue;
          }
        </style>
      </div>
    
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[data-pc-406d2856][data-pc-406d2856] { color:red; } [class]._80f4925f_variant [data-pc-406d2856][data-pc-406d2856] { color:blue; }</style><div data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it("can nest selectors in :within", async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <div className="test">
          <style>
            color: red;
            
            &:within(.variant) {
              &.a {
                color: red;
              }
              .b {
                color: blue;
              }
            }
          </style>
        </div>
      </div>
    
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[data-pc-9e7e6af9][data-pc-9e7e6af9] { color:red; } [class]._80f4925f_variant [data-pc-9e7e6af9][data-pc-9e7e6af9][class].a { color:red; } [class]._80f4925f_variant [data-pc-9e7e6af9][data-pc-9e7e6af9] [class]._80f4925f_b { color:blue; }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-80f4925f data-pc-pub-80f4925f><div class="_80f4925f_test _pub-80f4925f_test test" data-pc-80f4925f data-pc-9e7e6af9 data-pc-pub-80f4925f></div></div>`
    );
  });

  it("can nest group selectors in :within", async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <div className="test">
          <style>
            &:within(.variant) {
              &.a, &.b {
                color: blue;
              }
            }
          </style>
        </div>
      </div>
    
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[class]._80f4925f_variant [data-pc-9e7e6af9][data-pc-9e7e6af9][class].a { color:blue; } [class]._80f4925f_variant [data-pc-9e7e6af9][data-pc-9e7e6af9][class].b { color:blue; }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-80f4925f data-pc-pub-80f4925f><div class="_80f4925f_test _pub-80f4925f_test test" data-pc-80f4925f data-pc-9e7e6af9 data-pc-pub-80f4925f></div></div>`
    );
  });

  it(`:within(:global()) works`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <div className="test">
          <style>
            &:within(:global(.variant)) {
              color: orange;
            }
          </style>
        </div>
      </div>
    
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[class].variant [data-pc-9e7e6af9][data-pc-9e7e6af9] { color:orange; }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-80f4925f data-pc-pub-80f4925f><div class="_80f4925f_test _pub-80f4925f_test test" data-pc-80f4925f data-pc-9e7e6af9 data-pc-pub-80f4925f></div></div>`
    );
  });

  it(`nested & works`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <div className="test">
          <style>
            &:within(.variant) {
              &:empty {
                display: block;
              }
              && {
                color: red;
              }
            }
          </style>
        </div>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[class]._80f4925f_variant [data-pc-9e7e6af9][data-pc-9e7e6af9]:empty { display:block; } [class]._80f4925f_variant [data-pc-9e7e6af9][data-pc-9e7e6af9][data-pc-9e7e6af9][data-pc-9e7e6af9] { color:red; }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-80f4925f data-pc-pub-80f4925f><div class="_80f4925f_test _pub-80f4925f_test test" data-pc-80f4925f data-pc-9e7e6af9 data-pc-pub-80f4925f></div></div>`
    );
  });

  it(`:within works as combo selector`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <div className="test">
          <style>
            &.variant:within(.light) {
              color: blue;
            }
            :self(.variant:within(.light)) {
              color: blue;
            }
          </style>
        </div>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[class]._80f4925f_light [data-pc-9e7e6af9][data-pc-9e7e6af9][class].variant { color:blue; } [class]._80f4925f_light [data-pc-9e7e6af9][data-pc-9e7e6af9][class].variant { color:blue; }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-80f4925f data-pc-pub-80f4925f><div class="_80f4925f_test _pub-80f4925f_test test" data-pc-80f4925f data-pc-9e7e6af9 data-pc-pub-80f4925f></div></div>`
    );
  });

  it(`:self:empty works`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <div className="test">
          <style>
            :self {
              &:empty {
                color: red;
              }
            }
          </style>
        </div>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[data-pc-9e7e6af9][data-pc-9e7e6af9]:empty { color:red; }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-80f4925f data-pc-pub-80f4925f><div class="_80f4925f_test _pub-80f4925f_test test" data-pc-80f4925f data-pc-9e7e6af9 data-pc-pub-80f4925f></div></div>`
    );
  });

  it(`Can include @media in scoped :style`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <style>
          :self {
              
            @media screen and (min-width: 100px) {
              color: red;
            }
          }
        </style>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>@media screen and (min-width: 100px) { [data-pc-406d2856][data-pc-406d2856] { color:red; } }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`Can include @media in scoped :style()`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <style>
          :self(:empty) {
            @media screen and (min-width: 100px) {
              color: red;
            }
          }
        </style>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>@media screen and (min-width: 100px) { [data-pc-406d2856][data-pc-406d2856]:empty { color:red; } }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`Can include @media in :within()`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <style>
          &:within(:empty) {
            @media screen and (min-width: 100px) {
              color: red;
            }
          }
        </style>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>@media screen and (min-width: 100px) { [data-pc-80f4925f]:empty [data-pc-406d2856][data-pc-406d2856] { color:red; } }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`Can use & without :self & stay ordered`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <style>
          color: orange;
          &.red {
            color: blue;
          }
        </style>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[data-pc-406d2856][data-pc-406d2856] { color:orange; } [data-pc-406d2856][data-pc-406d2856][class].red { color:blue; }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`Can use & without :self`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <style>
          && {
            color: orange;
          }
        </style>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[data-pc-406d2856][data-pc-406d2856][data-pc-406d2856][data-pc-406d2856] { color:orange; }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`Single & in scoped styled provides the same specificty`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <style>
          color: orange;
          & {
            color: red;
          }
        </style>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[data-pc-406d2856][data-pc-406d2856] { color:orange; } [data-pc-406d2856][data-pc-406d2856] { color:red; }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`Can :within within :self`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <style>
          :self(.variant) {
            :within(.blue) {
              color: orange;
            }
          }
        </style>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[class]._80f4925f_blue [data-pc-406d2856][data-pc-406d2856][class].variant [data-pc-80f4925f] { color:orange; }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`Can define :within within &`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <style>
          &.variant {
            :within(.blue) {
              color: orange;
            }
          }
        </style>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[class]._80f4925f_blue [data-pc-406d2856][data-pc-406d2856][class].variant [data-pc-80f4925f] { color:orange; }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`url vars work`, async () => {
    const graph = {
      "/entry.pc": `
      <div className="variant">
        <style>
          div {
            background: url(var(--test));
          }
        </style>
      </div>
    `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[data-pc-406d2856] div[data-pc-80f4925f] { background:url(var(--test)); }</style><div class="_80f4925f_variant _pub-80f4925f_variant variant" data-pc-406d2856 data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`can load CSS files directly`, async () => {
    const graph = {
      "/entry.pc": `
        <import src="./styles.css" as="styles" />

        <div className="$styles.test">
          Hello world
        </div>
      `,
      "/styles.css": `
        .test {
          color: red;
        }
      `
    };

    const engine = await createMockEngine(graph);

    const text = stringifyLoadResult(await engine.open("/entry.pc"));
    expect(text).to.eql(
      `<style>[class]._pub-8f1a5142_test { color:red; }</style><div class="_pub-8f1a5142_test test" data-pc-80f4925f data-pc-pub-80f4925f>Hello world </div>`
    );
  });

  it(`breaks if ; is missing from decl`, async () => {
    const graph = {
      "/entry.pc": `
        <div>
          <style>
            div {
              color: red
              background: blue;
            }
          </style>
          Hello world
        </div>
      `
    };

    const engine = await createMockEngine(graph);

    let err;

    try {
      await engine.open("/entry.pc");
    } catch (e) {
      err = e;
    }

    expect(err).to.eql({
      errorKind: "Graph",
      uri: "/entry.pc",
      info: {
        kind: "Unexpected",
        message: "Unexpected token",
        location: {
          start: 100,
          end: 101
        }
      }
    });
  });

  // don't need to solve this right now
  xit(`Can include mixins in mixins`, async () => {
    const graph = {
      "/entry.pc": `
        <import src="/breakpoints.pc" as="breakpoints" />
        <style>
          @mixin b {
            color: red;
          }

          div {
            @include breakpoints.medium {
              @include b;
            }
          }
        </style>
      `,
      "/breakpoints.pc": `
        <style>
          @export {
            @mixin medium {
              @media screen and (max-width: 500px) {
                @content;
              }
            }
          }
        </style>
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect(stringifyLoadResult(result)).to.eql("a");
  });

  // TODO - this is broken with CSS patcher
  xit(`breaks if inline declaration is defined without semicolon`, async () => {
    const graph = {
      "/entry.pc": `
        <style>
          text-align: left
          img {
            width: 100px;
          }
        </style>
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect(stringifyLoadResult(result)).to.eql("a");
  });

  // TODO - this is broken with CSS patcher
  it(`styles are  sorted correctly`, async () => {
    const graph = {
      "/entry.pc": `
        <import src="./a.pc" />
        <style>
          div {
            color: orange;
          }
        </style>
      `,
      "/a.pc": `
        <import src="./b.pc" />
        <style>
          div {
            color: blue;
          }
        </style>
      `,
      "/b.pc": `
        <style>
          div {
            color: red;
          }
        </style>
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect(stringifyLoadResult(result)).to.eql(
      `<style>div[data-pc-8ae793af] { color:red; } div[data-pc-98523c41] { color:blue; } div[data-pc-80f4925f] { color:orange; }</style>`
    );
  });

  it(`keyframes can have multiple percentages`, async () => {
    const graph = {
      "/entry.pc": `
        <style>
          @keyframes abc {
            50%, 75%, 100% {
              color: red;
            }
          }
        </style>
        <div></div>
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect(stringifyLoadResult(result)).to.eql(
      `<style>@keyframes _80f4925f_abc { 50%, 75%, 100% { color:red; } }</style><div data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`media rule can have nested media rules`, async () => {
    const graph = {
      "/entry.pc": `
        <style>
          @media screen {
            .a {
              color: blue;
            }
            @media b {
              .a {
                color: blue;
              }
            }
          }
        </style>
        <div></div>
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect(stringifyLoadResult(result)).to.eql(
      `<style>@media screen { [class]._80f4925f_a { color:blue; } @media b { [class]._80f4925f_a { color:blue; } } { } }</style><div data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`@-webkit-keyframes works`, async () => {
    const graph = {
      "/entry.pc": `
        <style>
          @-webkit-keyframes abc {
            50%, 75%, 100% {
              color: red;
            }
          }
        </style>
        <div></div>
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect(stringifyLoadResult(result)).to.eql(
      `<style>@keyframes _80f4925f_abc { 50%, 75%, 100% { color:red; } }</style><div data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`can escape class names`, async () => {
    const graph = {
      "/entry.pc": `
        <style>
          @export {
            .a\\:b {
              color: red;
            }
            .a\\/b {
              color: red;
            }
            .a\\.b {
              color: red;
            }
          }
        </style>
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect(result.exports).to.eql({
      style: {
        kind: "Exports",
        classNames: {
          "a.b": {
            name: "a.b",
            scopedName: "_pub-80f4925f_a.b",
            public: true
          },
          "a/b": {
            name: "a/b",
            scopedName: "_pub-80f4925f_a/b",
            public: true
          },
          "a:b": {
            name: "a:b",
            scopedName: "_pub-80f4925f_a:b",
            public: true
          }
        },
        mixins: {},
        variables: {},
        keyframes: {}
      },
      components: {}
    });
  });

  it(`colon can be added on classname`, async () => {
    const graph = {
      "/entry.pc": `
        <import src="./test.css" as="t" />
        <div className="$t.test:container $t.sm:p-3.5"></div>
      `,
      "/test.css": `
        .test\\:container {
          color: red;
        }
        .sm\\:p-3\\.5 {
          color: blue;
        }
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect(stringifyLoadResult(result)).to.eql(
      `<style>[class]._pub-b8a55827_test\\:container { color:red; } [class]._pub-b8a55827_sm\\:p-3\\.5 { color:blue; }</style><div class="_pub-b8a55827_test:container test:container _pub-b8a55827_sm:p-3.5 _80f4925f_sm:p-3.5 _pub-80f4925f_sm:p-3.5 sm:p-3.5" data-pc-80f4925f data-pc-pub-80f4925f></div>`
    );
  });

  it(`keyframes that are exported also include a private scoped one`, async () => {
    const graph = {
      "/entry.pc": `
        <style>
          @export {
            @keyframes a {
              to {
                color: red;
              }
            }
          }
        </style>
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect(stringifyLoadResult(result)).to.eql(
      `<style>@keyframes _pub-80f4925f_a { to { color:red; } } @keyframes _80f4925f_a { to { color:red; } }</style>`
    );
  });

  it(`Can inject scopes into the document`, async () => {
    const graph = {
      "/entry.pc": `
        <import src="./test.css" inject-styles />
        <div className="test"></div>
      `,
      "/test.css": `
        .test {
          color: red;
        }
      `
    };

    const engine = await createMockEngine(graph);
    const result = await engine.open("/entry.pc");

    expect(stringifyLoadResult(result)).to.eql(
      `<style>[class]._pub-b8a55827_test { color:red; }</style><div class="_80f4925f_test _pub-80f4925f_test _pub-b8a55827_test test" data-pc-80f4925f data-pc-pub-80f4925f data-pc-pub-b8a55827></div>`
    );
  });
});
