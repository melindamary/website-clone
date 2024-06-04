define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.imageBaseUrl = exports.url = exports.apiKey = void 0;
    exports.apiKey = "68878f95957e5338131429885d26e879";
    exports.url = `https://api.themoviedb.org/3/discover/movie?api_key=${exports.apiKey}&adult="false"`;
    exports.imageBaseUrl = "http://image.tmdb.org/t/p/w1280";
});
