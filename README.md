<!-- SCSS order Banner -->

<h1 align="center">SCSS Property Sorter</h1>

<p align="center">
    <!-- Badge for Github Actions Build Status for Prod -->
    <a href="https://github.com/yunse0909/scss-order/actions/workflows/nodejs.yml">
        <img alt="Github Actions Build Status" src="https://img.shields.io/github/actions/workflow/status/yunse0909/scss-order/prod-test.yml?label=Prod&style=flat-square"></a>
    </a>
    <!-- Badge for repo lint -->
    <a href="https://github.com/yunse0909/scss-order/actions/workflows/nodejs.yml">
        <img alt="Github Link Check" src="https://img.shields.io/github/actions/workflow/status/yunse0909/scss-order/lint.yml?label=lint&style=flat-square"></a>
    </a>
    <!-- Badge for test coverage -->
    <a href="https://codecov.io/gh/yunse0909/scss-order" >
        <img src="https://codecov.io/gh/yunse0909/scss-order/graph/badge.svg?token=YB5S7Z7P27"/>
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
