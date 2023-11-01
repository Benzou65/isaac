"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const server = (0, fastify_1.default)();
server.get('/ping', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return 'pong\n';
}));
server.get('/scrape', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = 'https://bindingofisaacrebirth.fandom.com/wiki/Items'; // URL of the website page to scrape
        // Make an HTTP GET request to the website page
        const response = yield axios_1.default.get(url);
        // Load the HTML response into Cheerio for easy DOM traversal
        const $ = cheerio.load(response.data);
        const table = $('table');
        const tableRows = table.find('tr');
        const items = tableRows
            .map((i, element) => {
            const id = $(element).find('td').eq(1).attr('data-sort-value');
            const name = $(element).find('td').eq(0).text().replace(/\n/g, '');
            return { id, name };
        })
            .get();
        const result = { items };
        // send the response back to the client
        reply.send(result);
    }
    catch (error) {
        reply.code(500).send({ error: 'Failed to scrape data from the website' });
    }
}));
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
