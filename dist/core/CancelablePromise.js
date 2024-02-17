"use strict";
var _CancelablePromise_isResolved, _CancelablePromise_isRejected, _CancelablePromise_isCancelled, _CancelablePromise_cancelHandlers, _CancelablePromise_promise, _CancelablePromise_resolve, _CancelablePromise_reject;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelablePromise = exports.CancelError = void 0;
const tslib_1 = require("tslib");
/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
class CancelError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CancelError';
    }
    get isCancelled() {
        return true;
    }
}
exports.CancelError = CancelError;
class CancelablePromise {
    constructor(executor) {
        _CancelablePromise_isResolved.set(this, void 0);
        _CancelablePromise_isRejected.set(this, void 0);
        _CancelablePromise_isCancelled.set(this, void 0);
        _CancelablePromise_cancelHandlers.set(this, void 0);
        _CancelablePromise_promise.set(this, void 0);
        _CancelablePromise_resolve.set(this, void 0);
        _CancelablePromise_reject.set(this, void 0);
        tslib_1.__classPrivateFieldSet(this, _CancelablePromise_isResolved, false, "f");
        tslib_1.__classPrivateFieldSet(this, _CancelablePromise_isRejected, false, "f");
        tslib_1.__classPrivateFieldSet(this, _CancelablePromise_isCancelled, false, "f");
        tslib_1.__classPrivateFieldSet(this, _CancelablePromise_cancelHandlers, [], "f");
        tslib_1.__classPrivateFieldSet(this, _CancelablePromise_promise, new Promise((resolve, reject) => {
            tslib_1.__classPrivateFieldSet(this, _CancelablePromise_resolve, resolve, "f");
            tslib_1.__classPrivateFieldSet(this, _CancelablePromise_reject, reject, "f");
            const onResolve = (value) => {
                if (tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isResolved, "f") || tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isRejected, "f") || tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isCancelled, "f")) {
                    return;
                }
                tslib_1.__classPrivateFieldSet(this, _CancelablePromise_isResolved, true, "f");
                if (tslib_1.__classPrivateFieldGet(this, _CancelablePromise_resolve, "f"))
                    tslib_1.__classPrivateFieldGet(this, _CancelablePromise_resolve, "f").call(this, value);
            };
            const onReject = (reason) => {
                if (tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isResolved, "f") || tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isRejected, "f") || tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isCancelled, "f")) {
                    return;
                }
                tslib_1.__classPrivateFieldSet(this, _CancelablePromise_isRejected, true, "f");
                if (tslib_1.__classPrivateFieldGet(this, _CancelablePromise_reject, "f"))
                    tslib_1.__classPrivateFieldGet(this, _CancelablePromise_reject, "f").call(this, reason);
            };
            const onCancel = (cancelHandler) => {
                if (tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isResolved, "f") || tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isRejected, "f") || tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isCancelled, "f")) {
                    return;
                }
                tslib_1.__classPrivateFieldGet(this, _CancelablePromise_cancelHandlers, "f").push(cancelHandler);
            };
            Object.defineProperty(onCancel, 'isResolved', {
                get: () => tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isResolved, "f"),
            });
            Object.defineProperty(onCancel, 'isRejected', {
                get: () => tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isRejected, "f"),
            });
            Object.defineProperty(onCancel, 'isCancelled', {
                get: () => tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isCancelled, "f"),
            });
            return executor(onResolve, onReject, onCancel);
        }), "f");
    }
    get [(_CancelablePromise_isResolved = new WeakMap(), _CancelablePromise_isRejected = new WeakMap(), _CancelablePromise_isCancelled = new WeakMap(), _CancelablePromise_cancelHandlers = new WeakMap(), _CancelablePromise_promise = new WeakMap(), _CancelablePromise_resolve = new WeakMap(), _CancelablePromise_reject = new WeakMap(), Symbol.toStringTag)]() {
        return "Cancellable Promise";
    }
    then(onFulfilled, onRejected) {
        return tslib_1.__classPrivateFieldGet(this, _CancelablePromise_promise, "f").then(onFulfilled, onRejected);
    }
    catch(onRejected) {
        return tslib_1.__classPrivateFieldGet(this, _CancelablePromise_promise, "f").catch(onRejected);
    }
    finally(onFinally) {
        return tslib_1.__classPrivateFieldGet(this, _CancelablePromise_promise, "f").finally(onFinally);
    }
    cancel() {
        if (tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isResolved, "f") || tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isRejected, "f") || tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isCancelled, "f")) {
            return;
        }
        tslib_1.__classPrivateFieldSet(this, _CancelablePromise_isCancelled, true, "f");
        if (tslib_1.__classPrivateFieldGet(this, _CancelablePromise_cancelHandlers, "f").length) {
            try {
                for (const cancelHandler of tslib_1.__classPrivateFieldGet(this, _CancelablePromise_cancelHandlers, "f")) {
                    cancelHandler();
                }
            }
            catch (error) {
                console.warn('Cancellation threw an error', error);
                return;
            }
        }
        tslib_1.__classPrivateFieldGet(this, _CancelablePromise_cancelHandlers, "f").length = 0;
        if (tslib_1.__classPrivateFieldGet(this, _CancelablePromise_reject, "f"))
            tslib_1.__classPrivateFieldGet(this, _CancelablePromise_reject, "f").call(this, new CancelError('Request aborted'));
    }
    get isCancelled() {
        return tslib_1.__classPrivateFieldGet(this, _CancelablePromise_isCancelled, "f");
    }
}
exports.CancelablePromise = CancelablePromise;
//# sourceMappingURL=CancelablePromise.js.map