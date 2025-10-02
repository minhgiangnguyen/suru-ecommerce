"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "__barrel_optimize__?names=Backdrop,CircularProgress!=!./node_modules/@mui/material/index.js":
/*!***************************************************************************************************!*\
  !*** __barrel_optimize__?names=Backdrop,CircularProgress!=!./node_modules/@mui/material/index.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Backdrop: () => (/* reexport default from dynamic */ _Backdrop__WEBPACK_IMPORTED_MODULE_0___default.a),\n/* harmony export */   CircularProgress: () => (/* reexport default from dynamic */ _CircularProgress__WEBPACK_IMPORTED_MODULE_1___default.a)\n/* harmony export */ });\n/* harmony import */ var _Backdrop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Backdrop */ \"./node_modules/@mui/material/node/Backdrop/index.js\");\n/* harmony import */ var _Backdrop__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Backdrop__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _CircularProgress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CircularProgress */ \"./node_modules/@mui/material/node/CircularProgress/index.js\");\n/* harmony import */ var _CircularProgress__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_CircularProgress__WEBPACK_IMPORTED_MODULE_1__);\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX19iYXJyZWxfb3B0aW1pemVfXz9uYW1lcz1CYWNrZHJvcCxDaXJjdWxhclByb2dyZXNzIT0hLi9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ2dEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3VydS1hZG1pbi1hcHAvLi9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9pbmRleC5qcz9kNzFkIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCYWNrZHJvcCB9IGZyb20gXCIuL0JhY2tkcm9wXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2lyY3VsYXJQcm9ncmVzcyB9IGZyb20gXCIuL0NpcmN1bGFyUHJvZ3Jlc3NcIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///__barrel_optimize__?names=Backdrop,CircularProgress!=!./node_modules/@mui/material/index.js\n");

/***/ }),

/***/ "./components/RouteLoading.tsx":
/*!*************************************!*\
  !*** ./components/RouteLoading.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ RouteLoading)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _barrel_optimize_names_Backdrop_CircularProgress_mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=Backdrop,CircularProgress!=!@mui/material */ \"__barrel_optimize__?names=Backdrop,CircularProgress!=!./node_modules/@mui/material/index.js\");\n// components/RouteLoading.tsx\n\n\n\n\nfunction RouteLoading() {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleStart = ()=>setLoading(true);\n        const handleComplete = ()=>setLoading(false);\n        router.events.on(\"routeChangeStart\", handleStart);\n        router.events.on(\"routeChangeComplete\", handleComplete);\n        router.events.on(\"routeChangeError\", handleComplete);\n        return ()=>{\n            router.events.off(\"routeChangeStart\", handleStart);\n            router.events.off(\"routeChangeComplete\", handleComplete);\n            router.events.off(\"routeChangeError\", handleComplete);\n        };\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Backdrop_CircularProgress_mui_material__WEBPACK_IMPORTED_MODULE_3__.Backdrop, {\n        open: loading,\n        sx: {\n            zIndex: 2000,\n            color: \"#fff\"\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Backdrop_CircularProgress_mui_material__WEBPACK_IMPORTED_MODULE_3__.CircularProgress, {\n            color: \"inherit\"\n        }, void 0, false, {\n            fileName: \"D:\\\\Work\\\\SuzuEcommerce\\\\admin-app\\\\components\\\\RouteLoading.tsx\",\n            lineNumber: 27,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\Work\\\\SuzuEcommerce\\\\admin-app\\\\components\\\\RouteLoading.tsx\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL1JvdXRlTG9hZGluZy50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw4QkFBOEI7O0FBQ2M7QUFDSjtBQUNtQjtBQUU1QyxTQUFTSztJQUN0QixNQUFNQyxTQUFTSixzREFBU0E7SUFDeEIsTUFBTSxDQUFDSyxTQUFTQyxXQUFXLEdBQUdQLCtDQUFRQSxDQUFDO0lBRXZDRCxnREFBU0EsQ0FBQztRQUNSLE1BQU1TLGNBQWMsSUFBTUQsV0FBVztRQUNyQyxNQUFNRSxpQkFBaUIsSUFBTUYsV0FBVztRQUV4Q0YsT0FBT0ssTUFBTSxDQUFDQyxFQUFFLENBQUMsb0JBQW9CSDtRQUNyQ0gsT0FBT0ssTUFBTSxDQUFDQyxFQUFFLENBQUMsdUJBQXVCRjtRQUN4Q0osT0FBT0ssTUFBTSxDQUFDQyxFQUFFLENBQUMsb0JBQW9CRjtRQUVyQyxPQUFPO1lBQ0xKLE9BQU9LLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLG9CQUFvQko7WUFDdENILE9BQU9LLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLHVCQUF1Qkg7WUFDekNKLE9BQU9LLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLG9CQUFvQkg7UUFDeEM7SUFDRixHQUFHO1FBQUNKO0tBQU87SUFFWCxxQkFDRSw4REFBQ0gsbUdBQVFBO1FBQUNXLE1BQU1QO1FBQVNRLElBQUk7WUFBRUMsUUFBUTtZQUFNQyxPQUFPO1FBQU87a0JBQ3pELDRFQUFDYiwyR0FBZ0JBO1lBQUNhLE9BQU07Ozs7Ozs7Ozs7O0FBRzlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3VydS1hZG1pbi1hcHAvLi9jb21wb25lbnRzL1JvdXRlTG9hZGluZy50c3g/YzU2MyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb21wb25lbnRzL1JvdXRlTG9hZGluZy50c3hcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQmFja2Ryb3AsIENpcmN1bGFyUHJvZ3Jlc3MgfSBmcm9tIFwiQG11aS9tYXRlcmlhbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUm91dGVMb2FkaW5nKCkge1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZVN0YXJ0ID0gKCkgPT4gc2V0TG9hZGluZyh0cnVlKTtcclxuICAgIGNvbnN0IGhhbmRsZUNvbXBsZXRlID0gKCkgPT4gc2V0TG9hZGluZyhmYWxzZSk7XHJcblxyXG4gICAgcm91dGVyLmV2ZW50cy5vbihcInJvdXRlQ2hhbmdlU3RhcnRcIiwgaGFuZGxlU3RhcnQpO1xyXG4gICAgcm91dGVyLmV2ZW50cy5vbihcInJvdXRlQ2hhbmdlQ29tcGxldGVcIiwgaGFuZGxlQ29tcGxldGUpO1xyXG4gICAgcm91dGVyLmV2ZW50cy5vbihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgaGFuZGxlQ29tcGxldGUpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKFwicm91dGVDaGFuZ2VTdGFydFwiLCBoYW5kbGVTdGFydCk7XHJcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKFwicm91dGVDaGFuZ2VDb21wbGV0ZVwiLCBoYW5kbGVDb21wbGV0ZSk7XHJcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKFwicm91dGVDaGFuZ2VFcnJvclwiLCBoYW5kbGVDb21wbGV0ZSk7XHJcbiAgICB9O1xyXG4gIH0sIFtyb3V0ZXJdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCYWNrZHJvcCBvcGVuPXtsb2FkaW5nfSBzeD17eyB6SW5kZXg6IDIwMDAsIGNvbG9yOiBcIiNmZmZcIiB9fT5cclxuICAgICAgPENpcmN1bGFyUHJvZ3Jlc3MgY29sb3I9XCJpbmhlcml0XCIgLz5cclxuICAgIDwvQmFja2Ryb3A+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJCYWNrZHJvcCIsIkNpcmN1bGFyUHJvZ3Jlc3MiLCJSb3V0ZUxvYWRpbmciLCJyb3V0ZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImhhbmRsZVN0YXJ0IiwiaGFuZGxlQ29tcGxldGUiLCJldmVudHMiLCJvbiIsIm9mZiIsIm9wZW4iLCJzeCIsInpJbmRleCIsImNvbG9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/RouteLoading.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/styles */ \"@mui/material/styles\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/CssBaseline */ \"@mui/material/CssBaseline\");\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _src_theme_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/theme/theme */ \"./src/theme/theme.ts\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _components_RouteLoading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/RouteLoading */ \"./components/RouteLoading.tsx\");\n\n\n\n\n\n\n\nfunction App({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    const [authChecked, setAuthChecked] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);\n    const [allowed, setAllowed] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(()=>{\n        const publicPaths = [\n            \"/login\"\n        ];\n        const isPublic = publicPaths.includes(router.pathname);\n        const token =  false ? 0 : null;\n        if (!isPublic && !token) {\n            setAllowed(false);\n            setAuthChecked(true);\n            router.replace(\"/login\");\n            return;\n        }\n        if (isPublic && token) {\n            setAllowed(false);\n            setAuthChecked(true);\n            router.replace(\"/dashboard\");\n            return;\n        }\n        setAllowed(true);\n        setAuthChecked(true);\n    }, [\n        router.pathname\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_1__.ThemeProvider, {\n        theme: _src_theme_theme__WEBPACK_IMPORTED_MODULE_3__.theme,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2___default()), {}, void 0, false, {\n                fileName: \"D:\\\\Work\\\\SuzuEcommerce\\\\admin-app\\\\pages\\\\_app.tsx\",\n                lineNumber: 38,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_RouteLoading__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                fileName: \"D:\\\\Work\\\\SuzuEcommerce\\\\admin-app\\\\pages\\\\_app.tsx\",\n                lineNumber: 39,\n                columnNumber: 7\n            }, this),\n            authChecked && allowed ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"D:\\\\Work\\\\SuzuEcommerce\\\\admin-app\\\\pages\\\\_app.tsx\",\n                lineNumber: 40,\n                columnNumber: 33\n            }, this) : null\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Work\\\\SuzuEcommerce\\\\admin-app\\\\pages\\\\_app.tsx\",\n        lineNumber: 37,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNxRDtBQUNEO0FBQ1Q7QUFDSDtBQUNJO0FBRVU7QUFFdkMsU0FBU08sSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUM1RCxNQUFNQyxTQUFTUCxzREFBU0E7SUFDeEIsTUFBTSxDQUFDUSxhQUFhQyxlQUFlLEdBQUdQLCtDQUFRQSxDQUFDO0lBQy9DLE1BQU0sQ0FBQ1EsU0FBU0MsV0FBVyxHQUFHVCwrQ0FBUUEsQ0FBQztJQUV2Q0QsZ0RBQVNBLENBQUM7UUFDUixNQUFNVyxjQUFjO1lBQUM7U0FBUztRQUM5QixNQUFNQyxXQUFXRCxZQUFZRSxRQUFRLENBQUNQLE9BQU9RLFFBQVE7UUFDckQsTUFBTUMsUUFBUSxNQUFrQixHQUFjQyxDQUFxQixHQUFXO1FBRTlFLElBQUksQ0FBQ0osWUFBWSxDQUFDRyxPQUFPO1lBQ3ZCTCxXQUFXO1lBQ1hGLGVBQWU7WUFDZkYsT0FBT1ksT0FBTyxDQUFDO1lBQ2Y7UUFDRjtRQUNBLElBQUlOLFlBQVlHLE9BQU87WUFDckJMLFdBQVc7WUFDWEYsZUFBZTtZQUNmRixPQUFPWSxPQUFPLENBQUM7WUFDZjtRQUNGO1FBQ0FSLFdBQVc7UUFDWEYsZUFBZTtJQUNqQixHQUFHO1FBQUNGLE9BQU9RLFFBQVE7S0FBQztJQUVwQixxQkFDRSw4REFBQ2xCLCtEQUFhQTtRQUFDRSxPQUFPQSxtREFBS0E7OzBCQUN6Qiw4REFBQ0Qsa0VBQVdBOzs7OzswQkFDWiw4REFBQ0ssZ0VBQVlBOzs7OztZQUNaSyxlQUFlRSx3QkFBVSw4REFBQ0w7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7dUJBQU87Ozs7Ozs7QUFHL0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdXJ1LWFkbWluLWFwcC8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICdAbXVpL21hdGVyaWFsL3N0eWxlcyc7XG5pbXBvcnQgQ3NzQmFzZWxpbmUgZnJvbSAnQG11aS9tYXRlcmlhbC9Dc3NCYXNlbGluZSc7XG5pbXBvcnQgeyB0aGVtZSB9IGZyb20gJy4uL3NyYy90aGVtZS90aGVtZSc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ3VhcmRSb3V0ZSB9IGZyb20gJy4uL3V0aWxzL2F1dGgnO1xuaW1wb3J0IFJvdXRlTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL1JvdXRlTG9hZGluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBbYXV0aENoZWNrZWQsIHNldEF1dGhDaGVja2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FsbG93ZWQsIHNldEFsbG93ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgcHVibGljUGF0aHMgPSBbJy9sb2dpbiddO1xuICAgIGNvbnN0IGlzUHVibGljID0gcHVibGljUGF0aHMuaW5jbHVkZXMocm91dGVyLnBhdGhuYW1lKTtcbiAgICBjb25zdCB0b2tlbiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgOiBudWxsO1xuXG4gICAgaWYgKCFpc1B1YmxpYyAmJiAhdG9rZW4pIHtcbiAgICAgIHNldEFsbG93ZWQoZmFsc2UpO1xuICAgICAgc2V0QXV0aENoZWNrZWQodHJ1ZSk7XG4gICAgICByb3V0ZXIucmVwbGFjZSgnL2xvZ2luJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc1B1YmxpYyAmJiB0b2tlbikge1xuICAgICAgc2V0QWxsb3dlZChmYWxzZSk7XG4gICAgICBzZXRBdXRoQ2hlY2tlZCh0cnVlKTtcbiAgICAgIHJvdXRlci5yZXBsYWNlKCcvZGFzaGJvYXJkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldEFsbG93ZWQodHJ1ZSk7XG4gICAgc2V0QXV0aENoZWNrZWQodHJ1ZSk7XG4gIH0sIFtyb3V0ZXIucGF0aG5hbWVdKTtcblxuICByZXR1cm4gKFxuICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICA8Q3NzQmFzZWxpbmUgLz5cbiAgICAgIDxSb3V0ZUxvYWRpbmcgLz5cbiAgICAgIHthdXRoQ2hlY2tlZCAmJiBhbGxvd2VkID8gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPiA6IG51bGx9XG4gICAgPC9UaGVtZVByb3ZpZGVyPlxuICApO1xufVxuXG5cbiJdLCJuYW1lcyI6WyJUaGVtZVByb3ZpZGVyIiwiQ3NzQmFzZWxpbmUiLCJ0aGVtZSIsInVzZVJvdXRlciIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiUm91dGVMb2FkaW5nIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicm91dGVyIiwiYXV0aENoZWNrZWQiLCJzZXRBdXRoQ2hlY2tlZCIsImFsbG93ZWQiLCJzZXRBbGxvd2VkIiwicHVibGljUGF0aHMiLCJpc1B1YmxpYyIsImluY2x1ZGVzIiwicGF0aG5hbWUiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJyZXBsYWNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./src/theme/theme.ts":
/*!****************************!*\
  !*** ./src/theme/theme.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   theme: () => (/* binding */ theme)\n/* harmony export */ });\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material/styles */ \"@mui/material/styles\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__);\n\nconst theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.createTheme)({\n    palette: {\n        primary: {\n            main: \"#1976d2\"\n        },\n        secondary: {\n            main: \"#dc004e\"\n        },\n        background: {\n            default: \"#f5f5f5\"\n        }\n    },\n    typography: {\n        h4: {\n            fontWeight: 600\n        },\n        h6: {\n            fontWeight: 500\n        }\n    },\n    components: {\n        MuiButton: {\n            styleOverrides: {\n                root: {\n                    textTransform: \"none\"\n                }\n            }\n        },\n        MuiCard: {\n            styleOverrides: {\n                root: {\n                    boxShadow: \"0 2px 8px rgba(0,0,0,0.1)\"\n                }\n            }\n        }\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGhlbWUvdGhlbWUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQW1EO0FBRTVDLE1BQU1DLFFBQVFELGlFQUFXQSxDQUFDO0lBQy9CRSxTQUFTO1FBQ1BDLFNBQVM7WUFDUEMsTUFBTTtRQUNSO1FBQ0FDLFdBQVc7WUFDVEQsTUFBTTtRQUNSO1FBQ0FFLFlBQVk7WUFDVkMsU0FBUztRQUNYO0lBQ0Y7SUFDQUMsWUFBWTtRQUNWQyxJQUFJO1lBQ0ZDLFlBQVk7UUFDZDtRQUNBQyxJQUFJO1lBQ0ZELFlBQVk7UUFDZDtJQUNGO0lBQ0FFLFlBQVk7UUFDVkMsV0FBVztZQUNUQyxnQkFBZ0I7Z0JBQ2RDLE1BQU07b0JBQ0pDLGVBQWU7Z0JBQ2pCO1lBQ0Y7UUFDRjtRQUNBQyxTQUFTO1lBQ1BILGdCQUFnQjtnQkFDZEMsTUFBTTtvQkFDSkcsV0FBVztnQkFDYjtZQUNGO1FBQ0Y7SUFDRjtBQUNGLEdBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdXJ1LWFkbWluLWFwcC8uL3NyYy90aGVtZS90aGVtZS50cz9kYmNiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVRoZW1lIH0gZnJvbSAnQG11aS9tYXRlcmlhbC9zdHlsZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRoZW1lID0gY3JlYXRlVGhlbWUoe1xyXG4gIHBhbGV0dGU6IHtcclxuICAgIHByaW1hcnk6IHtcclxuICAgICAgbWFpbjogJyMxOTc2ZDInLFxyXG4gICAgfSxcclxuICAgIHNlY29uZGFyeToge1xyXG4gICAgICBtYWluOiAnI2RjMDA0ZScsXHJcbiAgICB9LFxyXG4gICAgYmFja2dyb3VuZDoge1xyXG4gICAgICBkZWZhdWx0OiAnI2Y1ZjVmNScsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgdHlwb2dyYXBoeToge1xyXG4gICAgaDQ6IHtcclxuICAgICAgZm9udFdlaWdodDogNjAwLFxyXG4gICAgfSxcclxuICAgIGg2OiB7XHJcbiAgICAgIGZvbnRXZWlnaHQ6IDUwMCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICBNdWlCdXR0b246IHtcclxuICAgICAgc3R5bGVPdmVycmlkZXM6IHtcclxuICAgICAgICByb290OiB7XHJcbiAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAnbm9uZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBNdWlDYXJkOiB7XHJcbiAgICAgIHN0eWxlT3ZlcnJpZGVzOiB7XHJcbiAgICAgICAgcm9vdDoge1xyXG4gICAgICAgICAgYm94U2hhZG93OiAnMCAycHggOHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6WyJjcmVhdGVUaGVtZSIsInRoZW1lIiwicGFsZXR0ZSIsInByaW1hcnkiLCJtYWluIiwic2Vjb25kYXJ5IiwiYmFja2dyb3VuZCIsImRlZmF1bHQiLCJ0eXBvZ3JhcGh5IiwiaDQiLCJmb250V2VpZ2h0IiwiaDYiLCJjb21wb25lbnRzIiwiTXVpQnV0dG9uIiwic3R5bGVPdmVycmlkZXMiLCJyb290IiwidGV4dFRyYW5zZm9ybSIsIk11aUNhcmQiLCJib3hTaGFkb3ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/theme/theme.ts\n");

/***/ }),

/***/ "@mui/material/CssBaseline":
/*!********************************************!*\
  !*** external "@mui/material/CssBaseline" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/material/CssBaseline");

/***/ }),

/***/ "@mui/material/styles":
/*!***************************************!*\
  !*** external "@mui/material/styles" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@mui/material/styles");

/***/ }),

/***/ "@mui/system":
/*!******************************!*\
  !*** external "@mui/system" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@mui/system");

/***/ }),

/***/ "@mui/system/DefaultPropsProvider":
/*!***************************************************!*\
  !*** external "@mui/system/DefaultPropsProvider" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("@mui/system/DefaultPropsProvider");

/***/ }),

/***/ "@mui/system/colorManipulator":
/*!***********************************************!*\
  !*** external "@mui/system/colorManipulator" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@mui/system/colorManipulator");

/***/ }),

/***/ "@mui/system/createStyled":
/*!*******************************************!*\
  !*** external "@mui/system/createStyled" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@mui/system/createStyled");

/***/ }),

/***/ "@mui/system/createTheme":
/*!******************************************!*\
  !*** external "@mui/system/createTheme" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/system/createTheme");

/***/ }),

/***/ "@mui/system/styleFunctionSx":
/*!**********************************************!*\
  !*** external "@mui/system/styleFunctionSx" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@mui/system/styleFunctionSx");

/***/ }),

/***/ "@mui/utils/capitalize":
/*!****************************************!*\
  !*** external "@mui/utils/capitalize" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/capitalize");

/***/ }),

/***/ "@mui/utils/chainPropTypes":
/*!********************************************!*\
  !*** external "@mui/utils/chainPropTypes" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/chainPropTypes");

/***/ }),

/***/ "@mui/utils/composeClasses":
/*!********************************************!*\
  !*** external "@mui/utils/composeClasses" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/composeClasses");

/***/ }),

/***/ "@mui/utils/deepmerge":
/*!***************************************!*\
  !*** external "@mui/utils/deepmerge" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/deepmerge");

/***/ }),

/***/ "@mui/utils/elementAcceptingRef":
/*!*************************************************!*\
  !*** external "@mui/utils/elementAcceptingRef" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/elementAcceptingRef");

/***/ }),

/***/ "@mui/utils/formatMuiErrorMessage":
/*!***************************************************!*\
  !*** external "@mui/utils/formatMuiErrorMessage" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/formatMuiErrorMessage");

/***/ }),

/***/ "@mui/utils/generateUtilityClass":
/*!**************************************************!*\
  !*** external "@mui/utils/generateUtilityClass" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/generateUtilityClass");

/***/ }),

/***/ "@mui/utils/generateUtilityClasses":
/*!****************************************************!*\
  !*** external "@mui/utils/generateUtilityClasses" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/generateUtilityClasses");

/***/ }),

/***/ "@mui/utils/getReactElementRef":
/*!************************************************!*\
  !*** external "@mui/utils/getReactElementRef" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/getReactElementRef");

/***/ }),

/***/ "@mui/utils/useForkRef":
/*!****************************************!*\
  !*** external "@mui/utils/useForkRef" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useForkRef");

/***/ }),

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("clsx");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ "react-transition-group":
/*!*****************************************!*\
  !*** external "react-transition-group" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("react-transition-group");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/@mui","vendor-chunks/@babel"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();