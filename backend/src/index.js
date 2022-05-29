"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express_1 = require("express");
var fs_1 = require("fs");
var path_1 = require("path");
var dotenv_1 = require("dotenv");
var os_1 = require("os");
var database_1 = require("./config/database");
if (process.env.NODE_ENV !== "production")
    dotenv_1["default"].config();
var PORT = process.env.PORT || 1234;
(0, typeorm_1.createConnection)(database_1.dbConfig)
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        app = (0, express_1["default"])();
        app.use(express_1["default"].json());
        app.use(function (req, res, next) {
            console.log("".concat(req.method, " -> ").concat(req.originalUrl));
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-mac");
            res.header("Access-Control-Expose-Headers", "x-mac, x-host");
            next();
        });
        fs_1["default"].readdir(path_1["default"].join(__dirname, "routes"), function (error, items) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                items.forEach(function (file) { return __awaiter(void 0, void 0, void 0, function () {
                    var route, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("import ".concat(file));
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, Promise.resolve().then(function () { return require("./routes/".concat(file)); })];
                            case 2:
                                route = _a.sent();
                                route["default"](app);
                                return [3 /*break*/, 4];
                            case 3:
                                err_1 = _a.sent();
                                console.error("error reading file ".concat(file), err_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                if (error) {
                    console.error("error reading directories", error);
                }
                return [2 /*return*/];
            });
        }); });
        app.get("/", function (_req, res) {
            res.setHeader("x-host", "server-".concat(os_1["default"].hostname()));
            res.send("We live boys");
        });
        app.listen(PORT, function () { return console.log("API listening on PORT ".concat(PORT, "!")); });
        return [2 /*return*/];
    });
}); })["catch"](function (error) { return console.log(error); });
