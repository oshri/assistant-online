"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var control_1 = require("../../common/pojo/control");
var controlSchema = new mongoose.Schema(control_1.Control);
var ControlModel = mongoose.model('Cat', controlSchema);
exports.default = ControlModel;
//# sourceMappingURL=control.js.map