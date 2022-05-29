"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Languages = void 0;
var typeorm_1 = require("typeorm");
var Recipes_1 = require("./Recipes");
var Languages = /** @class */ (function () {
    function Languages() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" })
    ], Languages.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "iso_code", unique: true, length: 2 })
    ], Languages.prototype, "isoCode");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Recipes_1.Recipes; }, function (recipes) { return recipes.language; })
    ], Languages.prototype, "recipes");
    Languages = __decorate([
        (0, typeorm_1.Index)("languages_pkey", ["id"], { unique: true }),
        (0, typeorm_1.Index)("languages_iso_code_key", ["isoCode"], { unique: true }),
        (0, typeorm_1.Entity)("languages", { schema: "public" })
    ], Languages);
    return Languages;
}());
exports.Languages = Languages;
