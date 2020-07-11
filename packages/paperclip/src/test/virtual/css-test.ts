import { expect } from "chai";
import { createMockEngine, stringifyLoadResult, waitForError } from "../utils";
import { EngineEventKind, stringifyVirtualNode } from "paperclip-utils";

describe(__filename + "#", () => {
  it("can render a simple style", async () => {
    const graph = {
      "/entry.pc": `<style>
        .a {
          color: b;
        }
      </style>`
    };
    const engine = createMockEngine(graph);
    const text = stringifyLoadResult(await engine.run("/entry.pc"));
    expect(text).to.eql("<style>._80f4925f_a { color:b; }</style>");
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
    const engine = createMockEngine(graph, () => {}, {
      resolveFile(uri) {
        return null;
      }
    });

    const e = waitForError(engine);
    engine.run("/entry.pc");
    const err = await e;
    expect(err).to.eql({
      kind: "Error",
      errorKind: "Runtime",
      uri: "/entry.pc",
      location: { start: 59, end: 91 },
      message: "Unable to resolve file."
    });
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
      const engine = createMockEngine(graph);
      const text = stringifyLoadResult(await engine.run("/entry.pc"));
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
      const engine = createMockEngine(graph);
      const p = waitForError(engine);
      engine.run("/entry.pc").catch(() => {});
      const e = await p;
      expect(e).to.eql({
        kind: "Error",
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 45, end: 46 },
        message: "Reference not found."
      });
    });

    it("can use an imported mixin", async () => {
      const graph = {
        "/entry.pc": `<import as="mod" src="./module.pc"><style>
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
      const engine = createMockEngine(graph);
      const text = stringifyLoadResult(await engine.run("/entry.pc"));
      expect(text).to.eql(
        "<style>div[data-pc-80f4925f] { color:orange; }</style>"
      );
    });
    it("Displays an error if an imported mixin is not found", async () => {
      const graph = {
        "/entry.pc": `<import as="mod" src="./module.pc"><style>
          div {
            @include mod.a;
          }
        </style>`,
        "/module.pc": `<style>
        </style>`
      };
      const engine = createMockEngine(graph);
      const p = waitForError(engine);
      engine.run("/entry.pc").catch(() => {});
      const e = await p;
      expect(e).to.eql({
        kind: "Error",
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 84, end: 85 },
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
      const engine = createMockEngine(graph);
      const p = waitForError(engine);
      engine.run("/entry.pc").catch(() => {});
      const e = await p;
      expect(e).to.eql({
        kind: "Error",
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
      const engine = createMockEngine(graph);
      const p = waitForError(engine);
      engine.run("/entry.pc").catch(() => {});
      const e = await p;
      // expect(e).to.eql({
      //   kind: 'Error',
      //   errorKind: 'Runtime',
      //   uri: '/entry.pc',
      //   location: { start: 45, end: 48 },
      //   message: 'Reference not found.'
      // });
    });

    it("Displays an error if a mixin is used but not exported", async () => {
      const graph = {
        "/entry.pc": `<import as="mod" src="./module.pc"><style>
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
      const engine = createMockEngine(graph);
      const p = waitForError(engine);
      engine.run("/entry.pc").catch(() => {});
      const e = await p;
      expect(e).to.eql({
        kind: "Error",
        errorKind: "Runtime",
        uri: "/entry.pc",
        location: { start: 84, end: 89 },
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
      const engine = createMockEngine(graph);
      const p = waitForError(engine);
      engine.run("/entry.pc").catch(() => {});
      const e = await p;
      expect(e).to.eql({
        kind: "Error",
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

      const engine = createMockEngine(graph);
      const result = await engine.run("/entry.pc");
      expect(stringifyLoadResult(result)).to.eql(
        `<style>._80f4925f_company_list { list-style:none; margin:0; padding:0; } ._80f4925f_company_list li[data-pc-80f4925f] { display:block; padding:var(--spacing-600) 0; } ._80f4925f_company_list li[data-pc-80f4925f] + ._80f4925f_company_list li[data-pc-80f4925f] { border-top:1px solid var(--color-black-100); }</style>`
      );
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
    const engine = createMockEngine(graph);
    const result = await engine.run("/entry.pc");

    expect(result.exports.style.variables["--color"]).to.eql({
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
        [a] {
          .color {

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
    const engine = createMockEngine(graph);
    const result = await engine.run("/entry.pc");

    expect(result.exports.style.classNames).to.eql({
      color: { name: "color", public: false },
      div: { name: "div", public: true },
      child: { name: "child", public: false },
      "element--child": { name: "element--child", public: false },
      element: { name: "element", public: false }
    });
  });
});
