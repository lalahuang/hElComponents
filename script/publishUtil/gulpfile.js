/*
 * @Author: hzm
 * @Date: 2022-08-31 13:20:03
 * @Description:
 */
const { publish } = require("./publish.js");
const { series } = require("gulp");

exports.default = series(async () =>publish());
