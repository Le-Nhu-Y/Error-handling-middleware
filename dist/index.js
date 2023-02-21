"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/one', (req, res, next) => {
    fs_1.default.promises.readFile('./one.txt')
        .then(data => res.send(data))
        .catch(err => next(err));
});
app.use((error, req, res, next) => {
    console.error('Error 1111: ', error.type);
    if (error.type == 'time-out')
        res.status(408).send(error);
    else
        res.status(500).send(error);
});
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:3000/one");
});
//# sourceMappingURL=index.js.map