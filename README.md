<!-- SCSS order Banner -->

<h1 align="center">SCSS Property Sorter</h1>

<p align="center">
    <!-- Badge for Github Actions Build Status for Prod -->
    <a href="https://github.com/yunse0909/scss-order/actions/workflows/nodejs.yml">
        <img alt="Github Actions Build Status" src="https://img.shields.io/github/actions/workflow/status/yunsecode/scss-order/prod-test.yml?label=Prod&style=flat-square"></a>
    </a>
    <!-- Badge for repo lint -->
    <a href="https://github.com/yunse0909/scss-order/actions/workflows/nodejs.yml">
        <img alt="Github Link Check" src="https://img.shields.io/github/actions/workflow/status/yunsecode/scss-order/lint.yml?label=lint&style=flat-square">
    </a>
    </a>
    <!-- Badge for test coverage -->
    <a href="https://codecov.io/gh/yunse0909/scss-order" >
        <img src="https://img.shields.io/codecov/c/github/yunse0909/scss-order?token=YB5S7Z7P27"/>
    </a>
    <!-- Npm versioin -->
    <a href="https://www.npmjs.com/package/scss-order">
        <img alt="npm version" src="https://img.shields.io/npm/v/scss-order?style=flat-square">
    </a>
    <!-- Download -->
    <a href="https://www.npmjs.com/package/scss-order">
        <img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/scss-order?style=flat-square">
    </a>
    <!-- Lang scss -->
    <img alt="language SCSS" src="https://img.shields.io/badge/format lang-SCSS-cf649a?style=flat-square">
</p>

# Intro

SCSS-Order is a dedicated property order formatter for SCSS. It aims to ensure consistency across projects by analyzing your SCSS code and reordering properties according to a predefined or customizable set of rules. This tool facilitates a uniform property sequence, making it easier for all users to follow a consistent style and improve code readability. By structuring properties in a predictable order, SCSS-Order helps in maintaining a clean and organized codebase, which is especially beneficial in collaborative environments.

### Input 1

```scss
.class1 {
    height: 100px;
    display: flex;
    width: 20px;
    font-size: 12px;

    .class2 {
        font-size: 12px;
        width: 20px;
        height: 100px;
        display: flex;
    }
}
```

### Input 2

```scss
.class1 {height: 100px
            display: flex;width: 20px;
        font-size: 12px;
.class2 {font-size: 12px;width: 20px;
        height: 100px
        display: flex;}}
```

### Output

```scss
.class1 {
    width: 20px;
    height: 100px;
    display: flex;
    font-size: 12px;

    .class2 {
        width: 20px;
        height: 100px;
        display: flex;
        font-size: 12px;
    }
}
```

SCSS-Order can be integrated into your editor to automatically organize SCSS properties on-save, included in a pre-commit hook, or run in CI environments to guarantee a uniform property order across your codebase. This ensures that your SCSS files are always neatly organized, eliminating the need for detailed style reviews or manual organization efforts from developers.

---
<!-- Documentation in wiki? -->


# How to use ?

## Using via CLI Globally

This module can be directly executed through the Command Line Interface (CLI):

You can install the module globally on your system using npm. This makes the module's commands available from anywhere in your terminal. To do so, run:

```
npm list -g
```
Once installed globally, you can simply run `scss-order`followed by any commands or options your module supports from any directory.

## Installing Locally to Your Project
For project-specific use, you can add the module to your `package.json` file. This is particularly useful for ensuring that everyone working on the project has access to the same version of the module. To add it, run:

```
npm install --save-dev scss-order
```

Then, you can add a script in your package.json to run your module's commands. For example:

```
"scripts": {
  "scss-order": "scss-order"
}
```
This allows anyone with the project to run npm run your-command to execute your module.


## Using as a Pre-commit Hook

Additionally, this module can be utilized as a Git pre-commit hook, allowing automatic execution of specific tasks before committing. To use this feature, add the following script to your `.git/hooks/pre-commit` file:
```
npm run scss-order -- --orderCheck=true
```

This enhancement aims to ensure the codebase adheres to specified styling conventions, further bolstering the quality and consistency of your source code before commits.

## ⚠️ Execution on Save
Currently, direct support for automatically executing this module when a file is saved in a code editor is not provided. However, this functionality is available through a [Scss-Order Visual Studio Code Extension](https://marketplace.visualstudio.com/items?itemName=yunsecode.scss-order-vscode). By installing this extension, you can configure it to execute the module automatically upon file save.

This extension can be installed via the Visual Studio Code Marketplace, and after installation, it allows you to use the 'execute on save' feature without additional configuration. Plans are in place to extend direct support to other editors or IDEs in the future, and updates will be communicated through our documentation.

# Config File
You can configure the following settings in your config file to tailor the scss-order tool to your project's needs:



- `orderList` string[]: Specifies the order in which CSS properties should be sorted.
- `changeOnSave` boolean: Determines whether the SCSS files should be automatically formatted on save.
- `showErrorMessages` boolean: Controls whether error messages are displayed for sorting violations.
- `autoFormat` boolean: Enables automatic formatting of SCSS files to adhere to the specified order.
- `tabSize` number: Sets the number of spaces to be used for indentation.
- `spaceBeforeClass` boolean: Configures whether a space should be inserted before a class name.
- `insertFinalNewline` boolean: Specifies whether to insert a newline at the end of the file.

To apply your configuration, use the command `scss-order --config [filename]`. This command tells the scss-order tool to use the settings from the specified file, enabling you to customize its behavior according to your project's standards.

example of a config file:
```JSON
{
  "orderList": [
    "height",
    "width"
  ],
  "tabSize": 2,
  "spaceBeforeClass": false,
  "insertFinalNewline": true
}
```

default value:
```JSON
{
  "orderList": [
    "position",
    "z-index",
    "top",
    "right",
    "bottom",
    "left",
    "margin",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "border",
    "border-width",
    "border-radius",
    "border-color",
    "width",
    "height",
    "display",
    "flex-direction",
    "flex-shrink",
    "flex-wrap",
    "justify-content",
    "align-items",
    "background-color",
    "padding",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "color",
    "font-family",
    "font-weight",
    "font-size",
  ],
  "changeOnSave": false,
  "showErrorMessages": false,
  "autoFormat": true,
  "tabSize": 4,
  "spaceBeforeClass": true,
  "insertFinalNewline": true
}
```

If you set `"orderList": ["height", "width"]`, the orderList will going th be: `"orderList": ["height", "width", "position", "z-indez", ...]`

⚠️ The `changeOnSave` `autoFormat` option is currently not in use. It's included in the configuration settings as a placeholder for future functionality that may be introduced to enhance the tool's capabilities. Please keep an eye on future updates for when this feature becomes available !
