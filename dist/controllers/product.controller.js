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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
class ProductController {
    constructor() {
        // 상품 목록 조회
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // 임시 데이터
                const products = [
                    { id: 1, name: '상품1', price: 1000 },
                    { id: 2, name: '상품2', price: 2000 },
                ];
                res.status(200).json({
                    success: true,
                    data: products,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: '상품 목록 조회 실패',
                });
            }
        });
        // 상품 상세 조회
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // 임시 데이터
                const product = {
                    id: parseInt(id),
                    name: `상품${id}`,
                    price: 1000 * parseInt(id),
                };
                res.status(200).json({
                    success: true,
                    data: product,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: '상품 상세 조회 실패',
                });
            }
        });
    }
}
exports.ProductController = ProductController;
