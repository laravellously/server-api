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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmailLayout;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
function EmailLayout({ children, appName = "BluuPay", logoUrl, supportEmail = 'support@bluupay.co', companyAddress = 'Abuja, Nigeria', locale = "en-US", preview, }) {
    return (React.createElement(components_1.Html, { lang: locale },
        React.createElement(components_1.Head, null,
            React.createElement("title", null, appName)),
        React.createElement(components_1.Preview, null, preview),
        React.createElement(components_1.Tailwind, null,
            React.createElement(components_1.Body, { className: "bg-gray-50 font-sans" },
                React.createElement(components_1.Container, { className: "mx-auto my-10 max-w-[600px] rounded-lg bg-white p-8 shadow-sm" },
                    React.createElement(components_1.Section, { className: "mb-8" },
                        React.createElement("div", { className: "flex items-center justify-center" }, logoUrl && (React.createElement(components_1.Img, { src: logoUrl, alt: `${appName} logo`, width: "140", height: "50", className: "mb-4" })))),
                    children,
                    React.createElement(components_1.Section, { className: "mt-8 border-t border-gray-200 pt-8" },
                        supportEmail && (React.createElement(components_1.Text, { className: "mb-4 text-center text-sm text-gray-500" },
                            "Need help?",
                            " ",
                            React.createElement(components_1.Link, { href: `mailto:${supportEmail}`, className: "text-[#040CCC] underline" }, "Contact support"))),
                        companyAddress && (React.createElement(components_1.Text, { className: "text-center text-xs text-gray-400" }, companyAddress))))))));
}
//# sourceMappingURL=layout.js.map