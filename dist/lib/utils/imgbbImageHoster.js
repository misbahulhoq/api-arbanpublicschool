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
exports.uploadImageToImgBB = void 0;
const uploadImageToImgBB = (image) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = new FormData();
    formData.append("image", image);
    const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const response = yield fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: formData,
    });
    const result = yield response.json();
    if (!response.ok) {
        throw new Error(result.error.message || "Failed to upload image");
    }
    return result.data.url; // Return the hosted image URL
});
exports.uploadImageToImgBB = uploadImageToImgBB;
