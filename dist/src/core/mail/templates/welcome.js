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
exports.default = WelcomeEmail;
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const layout_1 = __importDefault(require("./layout"));
const n = [
    {
        title: 'Step One',
        description: 'Start Step One'
    }
];
function WelcomeEmail({ recipientName, appName = "BluuPay", logoUrl, supportEmail, companyAddress, locale, nextSteps = n, ctaUrl, }) {
    const preview = `Start exploring ${appName} with these quick next steps`;
    return (React.createElement(layout_1.default, { appName: appName, logoUrl: logoUrl, supportEmail: supportEmail, companyAddress: companyAddress, locale: locale, preview: preview },
        React.createElement(components_1.Heading, { className: "mb-6 text-center text-2xl font-bold text-gray-900" },
            "Welcome to ",
            appName,
            "!"),
        React.createElement(components_1.Text, { className: "mb-6 text-base text-gray-700" },
            recipientName ? `Hi ${recipientName},` : "Hello,",
            " we're excited to have you on board. Let's get you started with your new account."),
        React.createElement(components_1.Section, { className: "mb-8" }, nextSteps.map((step, index) => (React.createElement("div", { key: index, className: "mb-4" },
            React.createElement(components_1.Text, { className: "m-0 font-semibold text-gray-900" }, step.title),
            React.createElement(components_1.Text, { className: "m-0 text-gray-700" }, step.description))))),
        ctaUrl && (React.createElement(components_1.Section, { className: "mb-8 text-center" },
            React.createElement(components_1.Link, { href: ctaUrl, className: "inline-block rounded-lg bg-[#040CCC] px-6 py-3 text-center text-sm font-semibold text-white no-underline" }, "Get Started")))));
}
//# sourceMappingURL=welcome.js.map