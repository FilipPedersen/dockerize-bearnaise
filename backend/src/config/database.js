"use strict";
exports.__esModule = true;
exports.dbConfig = void 0;
var dotenv_1 = require("dotenv");
var Ingredients_1 = require("../entities/Ingredients");
var Languages_1 = require("../entities/Languages");
var Metrics_1 = require("../entities/Metrics");
var RecipeComments_1 = require("../entities/RecipeComments");
var RecipeHasIngredients_1 = require("../entities/RecipeHasIngredients");
var RecipeHasTags_1 = require("../entities/RecipeHasTags");
var Recipes_1 = require("../entities/Recipes");
var RecipeSteps_1 = require("../entities/RecipeSteps");
var Tags_1 = require("../entities/Tags");
var UserFollowsTag_1 = require("../entities/UserFollowsTag");
var UserFollowsUser_1 = require("../entities/UserFollowsUser");
var UserLikesRecipe_1 = require("../entities/UserLikesRecipe");
var UserRoles_1 = require("../entities/UserRoles");
var Users_1 = require("../entities/Users");
if (process.env.NODE_ENV !== "production")
    dotenv_1["default"].config();
exports.dbConfig = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "example",
    database: process.env.POSTGRES_DB || "bearnaisee",
    synchronize: true,
    entities: [
        Ingredients_1.Ingredients,
        Languages_1.Languages,
        Metrics_1.Metrics,
        RecipeComments_1.RecipeComments,
        RecipeHasIngredients_1.RecipeHasIngredients,
        RecipeHasTags_1.RecipeHasTags,
        Recipes_1.Recipes,
        RecipeSteps_1.RecipeSteps,
        Tags_1.Tags,
        UserFollowsTag_1.UserFollowsTag,
        UserFollowsUser_1.UserFollowsUser,
        UserLikesRecipe_1.UserLikesRecipe,
        UserRoles_1.UserRoles,
        Users_1.Users,
    ]
};
