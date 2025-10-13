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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResetPasswordEmail;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const layout_1 = __importDefault(require("./layout"));
function ResetPasswordEmail({ recipientName, appName = "BluuPay", logoUrl, supportEmail, companyAddress, locale, resetUrl, }) {
    const preview = `Reset your ${appName} password`;
    return (React.createElement(layout_1.default, { appName: appName, logoUrl: logoUrl, supportEmail: supportEmail, companyAddress: companyAddress, locale: locale, preview: preview },
        React.createElement(components_1.Heading, { className: "mb-6 text-center text-2xl font-bold text-gray-900" }, "Reset your password"),
        React.createElement(components_1.Text, { className: "mb-6 text-base text-gray-700" }, recipientName ? `Hi ${recipientName},` : "Hello,"),
        React.createElement(components_1.Text, { className: "mb-6 text-base text-gray-700" },
            "We received a request to reset your password for ",
            appName,
            ". Click the button below to choose a new password."),
        React.createElement(components_1.Section, { className: "mb-8 text-center" },
            React.createElement(components_1.Link, { href: resetUrl, className: "inline-block rounded-lg bg-[#040CCC] px-6 py-3 text-center text-sm font-semibold text-white no-underline" }, "Reset Password")),
        React.createElement(components_1.Text, { className: "mb-6 text-sm text-gray-600" },
            "If the button doesn't work, copy and paste this URL into your browser:",
            React.createElement("br", null),
            React.createElement(components_1.Link, { href: resetUrl, className: "text-[#040CCC] underline" }, resetUrl)),
        React.createElement(components_1.Text, { className: "text-sm text-gray-500" }, "If you didn't request this, you can safely ignore this email.")));
}
//# sourceMappingURL=reset-password.js.map