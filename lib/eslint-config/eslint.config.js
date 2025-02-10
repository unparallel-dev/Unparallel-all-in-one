import pluginNext from "@next/eslint-plugin-next";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginNext.configs["core-web-vitals"],
  {
    plugins: { boundaries: require("eslint-plugin-boundaries") },
    settings: {
      boundaries: {
        include: ["src/**/*"],
        elements: [
          {
            mode: "full",
            type: "shared",
            pattern: [
              "src/components/**/*",
              "src/data/**/*",
              "src/drizzle/**/*",
              "src/hooks/**/*",
              "lib/**/*"
            ]
          },
          {
            mode: "full",
            type: "feature",
            capture: ["featureName"],
            pattern: ["src/features/*/**/*"]
          },
          {
            mode: "full",
            type: "app",
            capture: ["_", "fileName"],
            pattern: ["src/app/**/*"]
          },
          {
            mode: "full",
            type: "neverImport",
            pattern: ["src/*", "src/tasks/**/*"]
          }
        ]
      }
    },
    rules: {
      "boundaries/no-unknown": "error",
      "boundaries/no-unknown-files": "error",
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: ["shared"],
              allow: ["shared"]
            },
            {
              from: ["feature"],
              allow: [
                "shared",
                ["feature", { featureName: "${from.featureName}" }]
              ]
            },
            {
              from: ["app", "neverImport"],
              allow: ["shared", "feature"]
            },
            {
              from: ["app"],
              allow: [["app", { fileName: "*.css" }]]
            }
          ]
        }
      ]
    }
  },
  prettier.configs.recommended,
  configPrettier
];
