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
exports.default = LoginNotifyEmail;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const layout_1 = __importDefault(require("./layout"));
function LoginNotifyEmail({ recipientName, appName = "BluuPay", logoUrl, supportEmail, companyAddress, locale, loginLocation, loginDevice, loginTime, securityUrl, }) {
    const preview = `Your ${appName} account was accessed from a new device`;
    const formattedTime = loginTime instanceof Date
        ? loginTime.toLocaleString(locale)
        : loginTime;
    return (React.createElement(layout_1.default, { appName: appName, logoUrl: logoUrl, supportEmail: supportEmail, companyAddress: companyAddress, locale: locale, preview: preview },
        React.createElement(components_1.Heading, { className: "mb-6 text-center text-2xl font-bold text-gray-900" }, "New login detected"),
        React.createElement(components_1.Text, { className: "mb-6 text-base text-gray-700" },
            recipientName ? `Hi ${recipientName},` : "Hello,",
            " your ",
            appName,
            " account was just accessed."),
        React.createElement(components_1.Section, { className: "mb-8" },
            React.createElement("div", { className: "overflow-hidden rounded-lg border border-gray-200" },
                React.createElement("table", { className: "w-full" },
                    React.createElement("tbody", null,
                        React.createElement("tr", { className: "border-b border-gray-200" },
                            React.createElement("td", { className: "bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500" }, "Device"),
                            React.createElement("td", { className: "px-4 py-2 text-sm text-gray-900" }, loginDevice)),
                        React.createElement("tr", { className: "border-b border-gray-200" },
                            React.createElement("td", { className: "bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500" }, "Location"),
                            React.createElement("td", { className: "px-4 py-2 text-sm text-gray-900" }, loginLocation)),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500" }, "Time"),
                            React.createElement("td", { className: "px-4 py-2 text-sm text-gray-900" }, formattedTime)))))),
        React.createElement(components_1.Text, { className: "mb-6 text-base text-gray-700" }, "If this was you, no action is needed. If not, secure your account immediately."),
        securityUrl && (React.createElement(components_1.Section, { className: "mb-8 text-center" },
            React.createElement(components_1.Link, { href: securityUrl, className: "inline-block rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 no-underline shadow-sm hover:bg-gray-50" }, "Review Security Settings")))));
}
//# sourceMappingURL=login-notify.js.map