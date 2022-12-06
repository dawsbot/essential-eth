"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateType", {
    enumerable: true,
    get: ()=>validateType
});
const validateType = (value, allowedTypes)=>{
    if (!allowedTypes.includes(typeof value)) {
        throw new Error(`${allowedTypes.join(' or ')} required. Received ${typeof value}`);
    }
};
