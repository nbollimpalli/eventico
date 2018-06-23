(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/zone.js/dist/zone.js":
/*!*******************************************!*\
  !*** ./node_modules/zone.js/dist/zone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	 true ? factory() :
	undefined;
}(this, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Zone$1 = (function (global) {
    var FUNCTION = 'function';
    var performance = global['performance'];
    function mark(name) {
        performance && performance['mark'] && performance['mark'](name);
    }
    function performanceMeasure(name, label) {
        performance && performance['measure'] && performance['measure'](name, label);
    }
    mark('Zone');
    if (global['Zone']) {
        throw new Error('Zone already loaded.');
    }
    var Zone = /** @class */ (function () {
        function Zone(parent, zoneSpec) {
            this._properties = null;
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global['Promise'] !== patches['ZoneAwarePromise']) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "root", {
            get: function () {
                var zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZoneFrame.zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        Zone.__load_patch = function (name, fn) {
            if (patches.hasOwnProperty(name)) {
                throw Error('Already loaded patch: ' + name);
            }
            else if (!global['__Zone_disable_' + name]) {
                var perfName = 'Zone:' + name;
                mark(perfName);
                patches[name] = fn(global, Zone, _api);
                performanceMeasure(perfName, perfName);
            }
        };
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== FUNCTION) {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = undefined; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            if (task.zone != this) {
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            }
            // https://github.com/angular/zone.js/issues/778, sometimes eventTask
            // will run in notScheduled(canceled) state, we should not try to
            // run such kind of task but just return
            // we have to define an variable here, if not
            // typescript compiler will complain below
            var isNotScheduled = task.state === notScheduled;
            if (isNotScheduled && task.type === eventTask) {
                return;
            }
            var reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            var previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = null;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                // if the task's state is notScheduled or unknown, then it has already been cancelled
                // we should not reset the state to scheduled
                if (task.state !== notScheduled && task.state !== unknown) {
                    if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                    else {
                        task.runCount = 0;
                        this._updateTaskCount(task, -1);
                        reEntryGuard &&
                            task._transitionTo(notScheduled, running, notScheduled);
                    }
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleTask = function (task) {
            if (task.zone && task.zone !== this) {
                // check if the task was rescheduled, the newZone
                // should not be the children of the original zone
                var newZone = this;
                while (newZone) {
                    if (newZone === task.zone) {
                        throw Error("can not reschedule task to " + this
                            .name + " which is descendants of the original zone " + task.zone.name);
                    }
                    newZone = newZone.parent;
                }
            }
            task._transitionTo(scheduling, notScheduled);
            var zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task._zone = this;
            try {
                task = this._zoneDelegate.scheduleTask(this, task);
            }
            catch (err) {
                // should set task's state to unknown when scheduleTask throw error
                // because the err may from reschedule, so the fromState maybe notScheduled
                task._transitionTo(unknown, scheduling, notScheduled);
                // TODO: @JiaLiPassion, should we check the result from handleError?
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, null));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            if (task.zone != this)
                throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            task._transitionTo(canceling, scheduled, running);
            try {
                this._zoneDelegate.cancelTask(this, task);
            }
            catch (err) {
                // if error occurs when cancelTask, transit the state to unknown
                task._transitionTo(unknown, canceling);
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        };
        Zone.prototype._updateTaskCount = function (task, count) {
            var zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
    }());
    var DELEGATE_ZS = {
        name: '',
        onHasTask: function (delegate, _, target, hasTaskState) {
            return delegate.hasTask(target, hasTaskState);
        },
        onScheduleTask: function (delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) { return delegate.invokeTask(target, task, applyThis, applyArgs); },
        onCancelTask: function (delegate, _, target, task) {
            return delegate.cancelTask(target, task);
        }
    };
    var ZoneDelegate = /** @class */ (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt =
                zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ?
                this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            var returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ?
                this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                if (!task.cancelFn) {
                    throw Error('Task is not cancelable');
                }
                value = task.cancelFn(task);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            // hasTask should not throw error so other ZoneDelegate
            // can still trigger hasTask callback
            try {
                return this._hasTaskZS &&
                    this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
            }
            catch (err) {
                this.handleError(targetZone, err);
            }
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts['microTask'] > 0,
                    macroTask: counts['macroTask'] > 0,
                    eventTask: counts['eventTask'] > 0,
                    change: type
                };
                this.hasTask(this.zone, isEmpty);
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = /** @class */ (function () {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            this._zone = null;
            this.runCount = 0;
            this._zoneDelegates = null;
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            // TODO: @JiaLiPassion options should have interface
            if (type === eventTask && options && options.useG) {
                this.invoke = ZoneTask.invokeTask;
            }
            else {
                this.invoke = function () {
                    return ZoneTask.invokeTask.call(global, self, this, arguments);
                };
            }
        }
        ZoneTask.invokeTask = function (task, target, args) {
            if (!task) {
                task = this;
            }
            _numberOfNestedTaskFrames++;
            try {
                task.runCount++;
                return task.zone.runTask(task, target, args);
            }
            finally {
                if (_numberOfNestedTaskFrames == 1) {
                    drainMicroTaskQueue();
                }
                _numberOfNestedTaskFrames--;
            }
        };
        Object.defineProperty(ZoneTask.prototype, "zone", {
            get: function () {
                return this._zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoneTask.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function () {
            this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ?
                    ' or \'' + fromState2 + '\'' :
                    '') + ", was '" + this._state + "'.");
            }
        };
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId;
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        ZoneTask.prototype.toJSON = function () {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
            };
        };
        return ZoneTask;
    }());
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  MICROTASK QUEUE
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var nativeMicroTaskQueuePromise;
    function scheduleMicroTask(task) {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (!nativeMicroTaskQueuePromise) {
                if (global[symbolPromise]) {
                    nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                }
            }
            if (nativeMicroTaskQueuePromise) {
                nativeMicroTaskQueuePromise[symbolThen](drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
        task && _microTaskQueue.push(task);
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        _api.onUnhandledError(error);
                    }
                }
            }
            _api.microtaskDrainDone();
            _isDrainingMicrotaskQueue = false;
        }
    }
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  BOOTSTRAP
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var NO_ZONE = { name: 'NO ZONE' };
    var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
    var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    var patches = {};
    var _api = {
        symbol: __symbol__,
        currentZoneFrame: function () { return _currentZoneFrame; },
        onUnhandledError: noop,
        microtaskDrainDone: noop,
        scheduleMicroTask: scheduleMicroTask,
        showUncaughtError: function () { return !Zone[__symbol__('ignoreConsoleErrorUncaughtError')]; },
        patchEventTarget: function () { return []; },
        patchOnProperties: noop,
        patchMethod: function () { return noop; },
        bindArguments: function () { return null; },
        setNativePromise: function (NativePromise) {
            // sometimes NativePromise.resolve static function
            // is not ready yet, (such as core-js/es6.promise)
            // so we need to check here.
            if (NativePromise && typeof NativePromise.resolve === FUNCTION) {
                nativeMicroTaskQueuePromise = NativePromise.resolve(0);
            }
        },
    };
    var _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
    var _currentTask = null;
    var _numberOfNestedTaskFrames = 0;
    function noop() { }
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    performanceMeasure('Zone', 'Zone');
    return global['Zone'] = Zone;
})(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

Zone.__load_patch('ZoneAwarePromise', function (global, Zone, api) {
    var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ObjectDefineProperty = Object.defineProperty;
    function readableObjectToString(obj) {
        if (obj && obj.toString === Object.prototype.toString) {
            var className = obj.constructor && obj.constructor.name;
            return (className ? className : '') + ': ' + JSON.stringify(obj);
        }
        return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    var __symbol__ = api.symbol;
    var _uncaughtPromiseErrors = [];
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var creationTrace = '__creationTrace__';
    api.onUnhandledError = function (e) {
        if (api.showUncaughtError()) {
            var rejection = e && e.rejection;
            if (rejection) {
                console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
            }
            else {
                console.error(e);
            }
        }
    };
    api.microtaskDrainDone = function () {
        while (_uncaughtPromiseErrors.length) {
            var _loop_1 = function () {
                var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(function () {
                        throw uncaughtPromiseError;
                    });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            };
            while (_uncaughtPromiseErrors.length) {
                _loop_1();
            }
        }
    };
    var UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
    function handleUnhandledRejection(e) {
        api.onUnhandledError(e);
        try {
            var handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
            if (handler && typeof handler === 'function') {
                handler.call(this, e);
            }
        }
        catch (err) {
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var symbolFinally = __symbol__('finally');
    var symbolParentPromiseValue = __symbol__('parentPromiseValue');
    var symbolParentPromiseState = __symbol__('parentPromiseState');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    var once = function () {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    var TYPE_ERROR = 'Promise resolved with itself';
    var CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError(TYPE_ERROR);
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(function () {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                }
                catch (err) {
                    onceWrapper(function () {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                if (promise[symbolFinally] === symbolFinally) {
                    // the promise is generated by Promise.prototype.finally          
                    if (state === RESOLVED) {
                        // the state is resolved, should ignore the value
                        // and use parent promise value
                        promise[symbolState] = promise[symbolParentPromiseState];
                        promise[symbolValue] = promise[symbolParentPromiseValue];
                    }
                }
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    // check if longStackTraceZone is here
                    var trace = Zone.currentTask && Zone.currentTask.data &&
                        Zone.currentTask.data[creationTrace];
                    if (trace) {
                        // only keep the long stack trace into error when in longStackTraceZone
                        ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                    }
                }
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        // try to print more readable error log
                        throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        var error_1 = err;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    var REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[REJECTION_HANDLED_HANDLER];
                if (handler && typeof handler === 'function') {
                    handler.call(this, { rejection: promise[symbolValue], promise: promise });
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var promiseState = promise[symbolState];
        var delegate = promiseState ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                var parentPromiseValue = promise[symbolValue];
                var isFinallyPromise = chainPromise && symbolFinally === chainPromise[symbolFinally];
                if (isFinallyPromise) {
                    // if the promise is generated from finally call, keep parent promise's state and value
                    chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                    chainPromise[symbolParentPromiseState] = promiseState;
                }
                // should not pass value to finally callback
                var value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
                resolvePromise(chainPromise, true, value);
            }
            catch (error) {
                // if error occurs, should always return this error
                resolvePromise(chainPromise, false, error);
            }
        }, chainPromise);
    }
    var ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
    var ZoneAwarePromise = /** @class */ (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        ZoneAwarePromise.toString = function () {
            return ZONE_AWARE_PROMISE_TO_STRING;
        };
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            function onResolve(value) {
                promise && (promise = null || resolve(value));
            }
            function onReject(error) {
                promise && (promise = null || reject(error));
            }
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then(onResolve, onReject);
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            var count = 0;
            var resolvedValues = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var value = values_2[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then((function (index) { return function (value) {
                    resolvedValues[index] = value;
                    count--;
                    if (!count) {
                        resolve(resolvedValues);
                    }
                }; })(count), reject);
                count++;
            }
            if (!count)
                resolve(resolvedValues);
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        ZoneAwarePromise.prototype.finally = function (onFinally) {
            var chainPromise = new this.constructor(null);
            chainPromise[symbolFinally] = symbolFinally;
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
            }
            return chainPromise;
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];
    var ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');
    var desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');
    if (!desc || desc.configurable) {
        desc && delete desc.writable;
        desc && delete desc.value;
        if (!desc) {
            desc = { configurable: true, enumerable: true };
        }
        desc.get = function () {
            // if we already set ZoneAwarePromise, use patched one
            // otherwise return native one.
            return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
        };
        desc.set = function (NewNativePromise) {
            if (NewNativePromise === ZoneAwarePromise) {
                // if the NewNativePromise is ZoneAwarePromise
                // save to global
                global[ZONE_AWARE_PROMISE] = NewNativePromise;
            }
            else {
                // if the NewNativePromise is not ZoneAwarePromise
                // for example: after load zone.js, some library just
                // set es6-promise to global, if we set it to global
                // directly, assertZonePatched will fail and angular
                // will not loaded, so we just set the NewNativePromise
                // to global[symbolPromise], so the result is just like
                // we load ES6 Promise before zone.js
                global[symbolPromise] = NewNativePromise;
                if (!NewNativePromise.prototype[symbolThen]) {
                    patchThen(NewNativePromise);
                }
                api.setNativePromise(NewNativePromise);
            }
        };
        ObjectDefineProperty(global, 'Promise', desc);
    }
    global['Promise'] = ZoneAwarePromise;
    var symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var prop = ObjectGetOwnPropertyDescriptor(proto, 'then');
        if (prop && (prop.writable === false || !prop.configurable)) {
            // check Ctor.prototype.then propertyDescriptor is writable or not
            // in meteor env, writable is false, we should ignore such case
            return;
        }
        var originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function (onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function (resolve, reject) {
                originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    function zoneify(fn) {
        return function () {
            var resultPromise = fn.apply(this, arguments);
            if (resultPromise instanceof ZoneAwarePromise) {
                return resultPromise;
            }
            var ctor = resultPromise.constructor;
            if (!ctor[symbolThenPatched]) {
                patchThen(ctor);
            }
            return resultPromise;
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        var fetch_1 = global['fetch'];
        if (typeof fetch_1 == 'function') {
            global['fetch'] = zoneify(fetch_1);
        }
    }
    // This is not part of public API, but it is useful for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis,missingRequire}
 */
// issue #989, to reduce bundle size, use short name
/** Object.getOwnPropertyDescriptor */
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
/** Object.defineProperty */
var ObjectDefineProperty = Object.defineProperty;
/** Object.getPrototypeOf */
var ObjectGetPrototypeOf = Object.getPrototypeOf;
/** Object.create */
var ObjectCreate = Object.create;
/** Array.prototype.slice */
var ArraySlice = Array.prototype.slice;
/** addEventListener string const */
var ADD_EVENT_LISTENER_STR = 'addEventListener';
/** removeEventListener string const */
var REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
/** zoneSymbol addEventListener */
var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
/** zoneSymbol removeEventListener */
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
/** true string const */
var TRUE_STR = 'true';
/** false string const */
var FALSE_STR = 'false';
/** __zone_symbol__ string const */
var ZONE_SYMBOL_PREFIX = '__zone_symbol__';
function wrapWithCurrentZone(callback, source) {
    return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
    return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = Zone.__symbol__;
var isWindowExists = typeof window !== 'undefined';
var internalWindow = isWindowExists ? window : undefined;
var _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
var REMOVE_ATTRIBUTE = 'removeAttribute';
var NULL_ON_PROP_VALUE = [null];
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
        }
    }
    return args;
}
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function (i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name_1);
            if (!isPropertyWritable(prototypeDesc)) {
                return "continue";
            }
            prototype[name_1] = (function (delegate) {
                var patched = function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
                attachOriginToPatched(patched, delegate);
                return patched;
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
function isPropertyWritable(propertyDesc) {
    if (!propertyDesc) {
        return true;
    }
    if (propertyDesc.writable === false) {
        return false;
    }
    return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
}
var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isMix = typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
    !!(isWindowExists && internalWindow['HTMLElement']);
var zoneSymbolEventNames = {};
var wrapFn = function (event) {
    // https://github.com/angular/zone.js/issues/911, in IE, sometimes
    // event will be undefined, so we need to use window.event
    event = event || _global.event;
    if (!event) {
        return;
    }
    var eventNameSymbol = zoneSymbolEventNames[event.type];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
    }
    var target = this || event.target || _global;
    var listener = target[eventNameSymbol];
    var result = listener && listener.apply(this, arguments);
    if (result != undefined && !result) {
        event.preventDefault();
    }
    return result;
};
function patchProperty(obj, prop, prototype) {
    var desc = ObjectGetOwnPropertyDescriptor(obj, prop);
    if (!desc && prototype) {
        // when patch window object, use prototype to check prop exist or not
        var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
        if (prototypeDesc) {
            desc = { enumerable: true, configurable: true };
        }
    }
    // if the descriptor not exists or is not configurable
    // just return
    if (!desc || !desc.configurable) {
        return;
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    var originalDescGet = desc.get;
    var originalDescSet = desc.set;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var eventNameSymbol = zoneSymbolEventNames[eventName];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
    }
    desc.set = function (newValue) {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return;
        }
        var previousValue = target[eventNameSymbol];
        if (previousValue) {
            target.removeEventListener(eventName, wrapFn);
        }
        // issue #978, when onload handler was added before loading zone.js
        // we should remove it with originalDescSet
        if (originalDescSet) {
            originalDescSet.apply(target, NULL_ON_PROP_VALUE);
        }
        if (typeof newValue === 'function') {
            target[eventNameSymbol] = newValue;
            target.addEventListener(eventName, wrapFn, false);
        }
        else {
            target[eventNameSymbol] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return null;
        }
        var listener = target[eventNameSymbol];
        if (listener) {
            return listener;
        }
        else if (originalDescGet) {
            // result will be null when use inline event attribute,
            // such as <button onclick="func();">OK</button>
            // because the onclick function is internal raw uncompiled handler
            // the onclick will be evaluated when first time event was triggered or
            // the property is accessed, https://github.com/angular/zone.js/issues/525
            // so we should use original native get to retrieve the handler
            var value = originalDescGet && originalDescGet.call(this);
            if (value) {
                desc.set.call(this, value);
                if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                    target.removeAttribute(prop);
                }
                return value;
            }
        }
        return null;
    };
    ObjectDefineProperty(obj, prop, desc);
}
function patchOnProperties(obj, properties, prototype) {
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i], prototype);
        }
    }
    else {
        var onProperties = [];
        for (var prop in obj) {
            if (prop.substr(0, 2) == 'on') {
                onProperties.push(prop);
            }
        }
        for (var j = 0; j < onProperties.length; j++) {
            patchProperty(obj, onProperties[j], prototype);
        }
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global[className];
    if (!OriginalClass)
        return;
    // keep original class in global
    _global[zoneSymbol(className)] = OriginalClass;
    _global[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    // attach original delegate to patched function
    attachOriginToPatched(_global[className], OriginalClass);
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                ObjectDefineProperty(_global[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                            // keep callback in wrapped function so we can
                            // use it in Function.prototype.toString to return
                            // the native one.
                            attachOriginToPatched(this[originalInstanceKey][prop], fn);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global[className][prop] = OriginalClass[prop];
        }
    }
}
function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && !proto.hasOwnProperty(name)) {
        proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        // check whether proto[name] is writable
        // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
        var desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
        if (isPropertyWritable(desc)) {
            var patchDelegate_1 = patchFn(delegate, delegateName, name);
            proto[name] = function () {
                return patchDelegate_1(this, arguments);
            };
            attachOriginToPatched(proto[name], delegate);
        }
    }
    return delegate;
}
// TODO: @JiaLiPassion, support cancel task later if necessary
function patchMacroTask(obj, funcName, metaCreator) {
    var setNative = null;
    function scheduleTask(task) {
        var data = task.data;
        data.args[data.cbIdx] = function () {
            task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
    }
    setNative = patchMethod(obj, funcName, function (delegate) { return function (self, args) {
        var meta = metaCreator(self, args);
        if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
            return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask, null);
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(self, args);
        }
    }; });
}

function attachOriginToPatched(patched, original) {
    patched[zoneSymbol('OriginalDelegate')] = original;
}
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIEOrEdge() {
    if (isDetectedIEOrEdge) {
        return ieOrEdge;
    }
    isDetectedIEOrEdge = true;
    try {
        var ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
            ieOrEdge = true;
        }
        return ieOrEdge;
    }
    catch (error) {
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// override Function.prototype.toString to make zone.js patched function
// look like native function
Zone.__load_patch('toString', function (global) {
    // patch Func.prototype.toString to let them look like native
    var originalFunctionToString = Function.prototype.toString;
    var ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
    var PROMISE_SYMBOL = zoneSymbol('Promise');
    var ERROR_SYMBOL = zoneSymbol('Error');
    var newFunctionToString = function toString() {
        if (typeof this === 'function') {
            var originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
            if (originalDelegate) {
                if (typeof originalDelegate === 'function') {
                    return originalFunctionToString.apply(this[ORIGINAL_DELEGATE_SYMBOL], arguments);
                }
                else {
                    return Object.prototype.toString.call(originalDelegate);
                }
            }
            if (this === Promise) {
                var nativePromise = global[PROMISE_SYMBOL];
                if (nativePromise) {
                    return originalFunctionToString.apply(nativePromise, arguments);
                }
            }
            if (this === Error) {
                var nativeError = global[ERROR_SYMBOL];
                if (nativeError) {
                    return originalFunctionToString.apply(nativeError, arguments);
                }
            }
        }
        return originalFunctionToString.apply(this, arguments);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    // patch Object.prototype.toString to let them look like native
    var originalObjectToString = Object.prototype.toString;
    var PROMISE_OBJECT_TO_STRING = '[object Promise]';
    Object.prototype.toString = function () {
        if (this instanceof Promise) {
            return PROMISE_OBJECT_TO_STRING;
        }
        return originalObjectToString.apply(this, arguments);
    };
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
// an identifier to tell ZoneTask do not create a new invoke closure
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    useG: true
};
var zoneSymbolEventNames$1 = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = /^__zone_symbol__(\w+)(true|false)$/;
var IMMEDIATE_PROPAGATION_SYMBOL = ('__zone_symbol__propagationStopped');
function patchEventTarget(_global, apis, patchOptions) {
    var ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
    var REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
    var LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
    var REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
    var zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
    var ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
    var PREPEND_EVENT_LISTENER = 'prependListener';
    var PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
    var invokeTask = function (task, target, event) {
        // for better performance, check isRemoved which is set
        // by removeEventListener
        if (task.isRemoved) {
            return;
        }
        var delegate = task.callback;
        if (typeof delegate === 'object' && delegate.handleEvent) {
            // create the bind version of handleEvent when invoke
            task.callback = function (event) { return delegate.handleEvent(event); };
            task.originalDelegate = delegate;
        }
        // invoke static task.invoke
        task.invoke(task, target, [event]);
        var options = task.options;
        if (options && typeof options === 'object' && options.once) {
            // if options.once is true, after invoke once remove listener here
            // only browser need to do this, nodejs eventEmitter will cal removeListener
            // inside EventEmitter.once
            var delegate_1 = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate_1, options);
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = false
    var globalZoneAwareCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = true
    var globalZoneAwareCaptureCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    function patchEventTargetMethods(obj, patchOptions) {
        if (!obj) {
            return false;
        }
        var useGlobalCallback = true;
        if (patchOptions && patchOptions.useG !== undefined) {
            useGlobalCallback = patchOptions.useG;
        }
        var validateHandler = patchOptions && patchOptions.vh;
        var checkDuplicate = true;
        if (patchOptions && patchOptions.chkDup !== undefined) {
            checkDuplicate = patchOptions.chkDup;
        }
        var returnTarget = false;
        if (patchOptions && patchOptions.rt !== undefined) {
            returnTarget = patchOptions.rt;
        }
        var proto = obj;
        while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && obj[ADD_EVENT_LISTENER]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = obj;
        }
        if (!proto) {
            return false;
        }
        if (proto[zoneSymbolAddEventListener]) {
            return false;
        }
        // a shared global taskData to pass data for scheduleEventTask
        // so we do not need to create a new object just for pass some data
        var taskData = {};
        var nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
        var nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
            proto[REMOVE_EVENT_LISTENER];
        var nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
            proto[LISTENERS_EVENT_LISTENER];
        var nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
        var nativePrependEventListener;
        if (patchOptions && patchOptions.prepend) {
            nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                proto[patchOptions.prepend];
        }
        var customScheduleGlobal = function () {
            // if there is already a task for the eventName + capture,
            // just return, because we use the shared globalZoneAwareCallback here.
            if (taskData.isExisting) {
                return;
            }
            return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
        };
        var customCancelGlobal = function (task) {
            // if task is not marked as isRemoved, this call is directly
            // from Zone.prototype.cancelTask, we should remove the task
            // from tasksList of target first
            if (!task.isRemoved) {
                var symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                var symbolEventName = void 0;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = symbolEventName && task.target[symbolEventName];
                if (existingTasks) {
                    for (var i = 0; i < existingTasks.length; i++) {
                        var existingTask = existingTasks[i];
                        if (existingTask === task) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            task.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                task.allRemoved = true;
                                task.target[symbolEventName] = null;
                            }
                            break;
                        }
                    }
                }
            }
            // if all tasks for the eventName + capture have gone,
            // we will really remove the global event callback,
            // if not, return
            if (!task.allRemoved) {
                return;
            }
            return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
        };
        var customScheduleNonGlobal = function (task) {
            return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customSchedulePrepend = function (task) {
            return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customCancelNonGlobal = function (task) {
            return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
        };
        var customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
        var customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
        var compareTaskCallbackVsDelegate = function (task, delegate) {
            var typeOfDelegate = typeof delegate;
            return (typeOfDelegate === 'function' && task.callback === delegate) ||
                (typeOfDelegate === 'object' && task.originalDelegate === delegate);
        };
        var compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
        var blackListedEvents = Zone[Zone.__symbol__('BLACK_LISTED_EVENTS')];
        var makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget, prepend) {
            if (returnTarget === void 0) { returnTarget = false; }
            if (prepend === void 0) { prepend = false; }
            return function () {
                var target = this || _global;
                var delegate = arguments[1];
                if (!delegate) {
                    return nativeListener.apply(this, arguments);
                }
                // don't create the bind delegate function for handleEvent
                // case here to improve addEventListener performance
                // we will create the bind delegate when invoke
                var isHandleEvent = false;
                if (typeof delegate !== 'function') {
                    if (!delegate.handleEvent) {
                        return nativeListener.apply(this, arguments);
                    }
                    isHandleEvent = true;
                }
                if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                    return;
                }
                var eventName = arguments[0];
                var options = arguments[2];
                if (blackListedEvents) {
                    // check black list
                    for (var i = 0; i < blackListedEvents.length; i++) {
                        if (eventName === blackListedEvents[i]) {
                            return nativeListener.apply(this, arguments);
                        }
                    }
                }
                var capture;
                var once = false;
                if (options === undefined) {
                    capture = false;
                }
                else if (options === true) {
                    capture = true;
                }
                else if (options === false) {
                    capture = false;
                }
                else {
                    capture = options ? !!options.capture : false;
                    once = options ? !!options.once : false;
                }
                var zone = Zone.current;
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                var symbolEventName;
                if (!symbolEventNames) {
                    // the code is duplicate, but I just want to get some better performance
                    var falseEventName = eventName + FALSE_STR;
                    var trueEventName = eventName + TRUE_STR;
                    var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
                    var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
                    zoneSymbolEventNames$1[eventName] = {};
                    zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
                    zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
                    symbolEventName = capture ? symbolCapture : symbol;
                }
                else {
                    symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = target[symbolEventName];
                var isExisting = false;
                if (existingTasks) {
                    // already have task registered
                    isExisting = true;
                    if (checkDuplicate) {
                        for (var i = 0; i < existingTasks.length; i++) {
                            if (compare(existingTasks[i], delegate)) {
                                // same callback, same capture, same event name, just return
                                return;
                            }
                        }
                    }
                }
                else {
                    existingTasks = target[symbolEventName] = [];
                }
                var source;
                var constructorName = target.constructor['name'];
                var targetSource = globalSources[constructorName];
                if (targetSource) {
                    source = targetSource[eventName];
                }
                if (!source) {
                    source = constructorName + addSource + eventName;
                }
                // do not create a new object as task.data to pass those things
                // just use the global shared one
                taskData.options = options;
                if (once) {
                    // if addEventListener with once options, we don't pass it to
                    // native addEventListener, instead we keep the once setting
                    // and handle ourselves.
                    taskData.options.once = false;
                }
                taskData.target = target;
                taskData.capture = capture;
                taskData.eventName = eventName;
                taskData.isExisting = isExisting;
                var data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : null;
                // keep taskData into data to allow onScheduleEventTask to access the task information
                if (data) {
                    data.taskData = taskData;
                }
                var task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                // should clear taskData.target to avoid memory leak
                // issue, https://github.com/angular/angular/issues/20442
                taskData.target = null;
                // need to clear up taskData because it is a global object
                if (data) {
                    data.taskData = null;
                }
                // have to save those information to task in case
                // application may call task.zone.cancelTask() directly
                if (once) {
                    options.once = true;
                }
                task.options = options;
                task.target = target;
                task.capture = capture;
                task.eventName = eventName;
                if (isHandleEvent) {
                    // save original delegate for compare to check duplicate
                    task.originalDelegate = delegate;
                }
                if (!prepend) {
                    existingTasks.push(task);
                }
                else {
                    existingTasks.unshift(task);
                }
                if (returnTarget) {
                    return target;
                }
            };
        };
        proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
        if (nativePrependEventListener) {
            proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
        }
        proto[REMOVE_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var options = arguments[2];
            var capture;
            if (options === undefined) {
                capture = false;
            }
            else if (options === true) {
                capture = true;
            }
            else if (options === false) {
                capture = false;
            }
            else {
                capture = options ? !!options.capture : false;
            }
            var delegate = arguments[1];
            if (!delegate) {
                return nativeRemoveEventListener.apply(this, arguments);
            }
            if (validateHandler &&
                !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                return;
            }
            var symbolEventNames = zoneSymbolEventNames$1[eventName];
            var symbolEventName;
            if (symbolEventNames) {
                symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
            }
            var existingTasks = symbolEventName && target[symbolEventName];
            if (existingTasks) {
                for (var i = 0; i < existingTasks.length; i++) {
                    var existingTask = existingTasks[i];
                    if (compare(existingTask, delegate)) {
                        existingTasks.splice(i, 1);
                        // set isRemoved to data for faster invokeTask check
                        existingTask.isRemoved = true;
                        if (existingTasks.length === 0) {
                            // all tasks for the eventName + capture have gone,
                            // remove globalZoneAwareCallback and remove the task cache from target
                            existingTask.allRemoved = true;
                            target[symbolEventName] = null;
                        }
                        existingTask.zone.cancelTask(existingTask);
                        if (returnTarget) {
                            return target;
                        }
                        return;
                    }
                }
            }
            // issue 930, didn't find the event name or callback
            // from zone kept existingTasks, the callback maybe
            // added outside of zone, we need to call native removeEventListener
            // to try to remove it.
            return nativeRemoveEventListener.apply(this, arguments);
        };
        proto[LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var listeners = [];
            var tasks = findEventTasks(target, eventName);
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                listeners.push(delegate);
            }
            return listeners;
        };
        proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            if (!eventName) {
                var keys = Object.keys(target);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                    var evtName = match && match[1];
                    // in nodejs EventEmitter, removeListener event is
                    // used for monitoring the removeListener call,
                    // so just keep removeListener eventListener until
                    // all other eventListeners are removed
                    if (evtName && evtName !== 'removeListener') {
                        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                    }
                }
                // remove removeListener listener finally
                this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
            }
            else {
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                if (symbolEventNames) {
                    var symbolEventName = symbolEventNames[FALSE_STR];
                    var symbolCaptureEventName = symbolEventNames[TRUE_STR];
                    var tasks = target[symbolEventName];
                    var captureTasks = target[symbolCaptureEventName];
                    if (tasks) {
                        var removeTasks = tasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                    if (captureTasks) {
                        var removeTasks = captureTasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                }
            }
            if (returnTarget) {
                return this;
            }
        };
        // for native toString patch
        attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
        attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
        if (nativeRemoveAllListeners) {
            attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
        }
        if (nativeListeners) {
            attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
        }
        return true;
    }
    var results = [];
    for (var i = 0; i < apis.length; i++) {
        results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }
    return results;
}
function findEventTasks(target, eventName) {
    var foundTasks = [];
    for (var prop in target) {
        var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
        var evtName = match && match[1];
        if (evtName && (!eventName || evtName === eventName)) {
            var tasks = target[prop];
            if (tasks) {
                for (var i = 0; i < tasks.length; i++) {
                    foundTasks.push(tasks[i]);
                }
            }
        }
    }
    return foundTasks;
}
function patchEventPrototype(global, api) {
    var Event = global['Event'];
    if (Event && Event.prototype) {
        api.patchMethod(Event.prototype, 'stopImmediatePropagation', function (delegate) { return function (self, args) {
            self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
            // we need to call the native stopImmediatePropagation
            // in case in some hybrid application, some part of
            // application will be controlled by zone, some are not
            delegate && delegate.apply(self, args);
        }; });
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
var taskSymbol = zoneSymbol('zoneTask');
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        function timer() {
            try {
                task.invoke.apply(this, arguments);
            }
            finally {
                // issue-934, task will be cancelled
                // even it is a periodic task such as
                // setInterval
                if (!(task.data && task.data.isPeriodic)) {
                    if (typeof data.handleId === 'number') {
                        // in non-nodejs env, we remove timerId
                        // from local cache
                        delete tasksByHandleId[data.handleId];
                    }
                    else if (data.handleId) {
                        // Node returns complex objects as handleIds
                        // we remove task reference from timer object
                        data.handleId[taskSymbol] = null;
                    }
                }
            }
        }
        data.args[0] = timer;
        data.handleId = setNative.apply(window, data.args);
        return task;
    }
    function clearTask(task) {
        return clearNative(task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var options = {
                    handleId: null,
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
                    args: args
                };
                var task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                if (typeof handle === 'number') {
                    // for non nodejs env, we save handleId: task
                    // mapping in local cache for clearTimeout
                    tasksByHandleId[handle] = task;
                }
                else if (handle) {
                    // for nodejs env, we save task
                    // reference in timerId Object for clearTimeout
                    handle[taskSymbol] = task;
                }
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                if (typeof handle === 'number' || handle) {
                    return handle;
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var id = args[0];
            var task;
            if (typeof id === 'number') {
                // non nodejs env.
                task = tasksByHandleId[id];
            }
            else {
                // nodejs env.
                task = id && id[taskSymbol];
                // other environments.
                if (!task) {
                    task = id;
                }
            }
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    if (typeof id === 'number') {
                        delete tasksByHandleId[id];
                    }
                    else if (id) {
                        id[taskSymbol] = null;
                    }
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}
function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}
function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    // issue-927, if the desc is frozen, don't try to change the desc
    if (!Object.isFrozen(desc)) {
        desc.configurable = true;
    }
    if (!desc.configurable) {
        // issue-927, if the obj is frozen, don't try to set the desc to obj
        if (!obj[unconfigurablesKey] && !Object.isFrozen(obj)) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        if (obj[unconfigurablesKey]) {
            obj[unconfigurablesKey][prop] = true;
        }
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = desc.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
            }
        }
        else {
            throw error;
        }
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// we have to patch the instance since the proto is non-configurable
function apply(api, _global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        patchEventTarget(_global, [WS.prototype]);
    }
    _global.WebSocket = function (x, y) {
        var socket = arguments.length > 1 ? new WS(x, y) : new WS(x);
        var proxySocket;
        var proxySocketProto;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = ObjectGetOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = ObjectCreate(socket);
            // socket have own property descriptor 'onopen', 'onmessage', 'onclose', 'onerror'
            // but proxySocket not, so we will keep socket as prototype and pass it to
            // patchOnProperties method
            proxySocketProto = socket;
            [ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR, 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    var args = ArraySlice.call(arguments);
                    if (propName === ADD_EVENT_LISTENER_STR || propName === REMOVE_EVENT_LISTENER_STR) {
                        var eventName = args.length > 0 ? args[0] : undefined;
                        if (eventName) {
                            var propertySymbol = Zone.__symbol__('ON_PROPERTY' + eventName);
                            socket[propertySymbol] = proxySocket[propertySymbol];
                        }
                    }
                    return socket[propName].apply(socket, args);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open'], proxySocketProto);
        return proxySocket;
    };
    var globalWebSocket = _global['WebSocket'];
    for (var prop in WS) {
        globalWebSocket[prop] = WS[prop];
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {globalThis}
 */
var globalEventHandlersEventNames = [
    'abort',
    'animationcancel',
    'animationend',
    'animationiteration',
    'auxclick',
    'beforeinput',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'compositionstart',
    'compositionupdate',
    'compositionend',
    'cuechange',
    'click',
    'close',
    'contextmenu',
    'curechange',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'orientationchange',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'mozpointerlockchange',
    'webkitpointerlockerchange',
    'pointerlockerror',
    'mozpointerlockerror',
    'webkitpointerlockerror',
    'pointermove',
    'pointout',
    'pointerover',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'show',
    'sort',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'volumechange',
    'touchcancel',
    'touchmove',
    'touchstart',
    'touchend',
    'transitioncancel',
    'transitionend',
    'waiting',
    'wheel'
];
var documentEventNames = [
    'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'fullscreenchange',
    'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
    'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
    'visibilitychange'
];
var windowEventNames = [
    'absolutedeviceorientation',
    'afterinput',
    'afterprint',
    'appinstalled',
    'beforeinstallprompt',
    'beforeprint',
    'beforeunload',
    'devicelight',
    'devicemotion',
    'deviceorientation',
    'deviceorientationabsolute',
    'deviceproximity',
    'hashchange',
    'languagechange',
    'message',
    'mozbeforepaint',
    'offline',
    'online',
    'paint',
    'pageshow',
    'pagehide',
    'popstate',
    'rejectionhandled',
    'storage',
    'unhandledrejection',
    'unload',
    'userproximity',
    'vrdisplyconnected',
    'vrdisplaydisconnected',
    'vrdisplaypresentchange'
];
var htmlElementEventNames = [
    'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
    'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
    'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
];
var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
var ieElementEventNames = [
    'activate',
    'afterupdate',
    'ariarequest',
    'beforeactivate',
    'beforedeactivate',
    'beforeeditfocus',
    'beforeupdate',
    'cellchange',
    'controlselect',
    'dataavailable',
    'datasetchanged',
    'datasetcomplete',
    'errorupdate',
    'filterchange',
    'layoutcomplete',
    'losecapture',
    'move',
    'moveend',
    'movestart',
    'propertychange',
    'resizeend',
    'resizestart',
    'rowenter',
    'rowexit',
    'rowsdelete',
    'rowsinserted',
    'command',
    'compassneedscalibration',
    'deactivate',
    'help',
    'mscontentzoom',
    'msmanipulationstatechanged',
    'msgesturechange',
    'msgesturedoubletap',
    'msgestureend',
    'msgesturehold',
    'msgesturestart',
    'msgesturetap',
    'msgotpointercapture',
    'msinertiastart',
    'mslostpointercapture',
    'mspointercancel',
    'mspointerdown',
    'mspointerenter',
    'mspointerhover',
    'mspointerleave',
    'mspointermove',
    'mspointerout',
    'mspointerover',
    'mspointerup',
    'pointerout',
    'mssitemodejumplistitemremoved',
    'msthumbnailclick',
    'stop',
    'storagecommit'
];
var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
var formEventNames = ['autocomplete', 'autocompleteerror'];
var detailEventNames = ['toggle'];
var frameEventNames = ['load'];
var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
var marqueeEventNames = ['bounce', 'finish', 'start'];
var XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
var websocketEventNames = ['close', 'error', 'open', 'message'];
var workerEventNames = ['error', 'message'];
var eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties) {
        return onProperties;
    }
    var tip = ignoreProperties.filter(function (ip) { return ip.target === target; });
    if (!tip || tip.length === 0) {
        return onProperties;
    }
    var targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(function (op) { return targetIgnoreProperties.indexOf(op) === -1; });
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    // check whether target is available, sometimes target will be undefined
    // because different browser or some 3rd party plugin.
    if (!target) {
        return;
    }
    var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    patchOnProperties(target, filteredProperties, prototype);
}
function propertyDescriptorPatch(api, _global) {
    if (isNode && !isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        var ignoreProperties = _global.__Zone_ignore_on_properties;
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            var internalWindow = window;
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(internalWindow, eventNames.concat(['messageerror']), ignoreProperties, ObjectGetPrototypeOf(internalWindow));
            patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
            if (typeof internalWindow['SVGElement'] !== 'undefined') {
                patchFilteredProperties(internalWindow['SVGElement'].prototype, eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            var HTMLMarqueeElement_1 = internalWindow['HTMLMarqueeElement'];
            if (HTMLMarqueeElement_1) {
                patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
            }
            var Worker_1 = internalWindow['Worker'];
            if (Worker_1) {
                patchFilteredProperties(Worker_1.prototype, workerEventNames, ignoreProperties);
            }
        }
        patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        var XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget) {
            patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(api, _global);
        }
    }
}
function canPatchViaPropertyDescriptor() {
    if ((isBrowser || isMix) && !ObjectGetOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = ObjectGetOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var ON_READY_STATE_CHANGE = 'onreadystatechange';
    var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
    var xhrDesc = ObjectGetOwnPropertyDescriptor(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE);
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
    // we should set a real desc instead a fake one
    if (xhrDesc) {
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        // restore original desc
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, xhrDesc || {});
        return result;
    }
    else {
        var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = zoneSymbol('fake');
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
            },
            set: function (value) {
                this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
        req.onreadystatechange = null;
        return result;
    }
}
var unboundKey = zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function (i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = wrapWithCurrentZone(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function eventTargetPatch(_global, api) {
    var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
    var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
        .split(',');
    var EVENT_TARGET = 'EventTarget';
    var apis = [];
    var isWtf = _global['wtf'];
    var WTF_ISSUE_555_ARRAY = WTF_ISSUE_555.split(',');
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555_ARRAY.map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    var isDisableIECheck = _global['__Zone_disable_IE_check'] || false;
    var isEnableCrossContextCheck = _global['__Zone_enable_cross_context_check'] || false;
    var ieOrEdge = isIEOrEdge();
    var ADD_EVENT_LISTENER_SOURCE = '.addEventListener:';
    var FUNCTION_WRAPPER = '[object FunctionWrapper]';
    var BROWSER_TOOLS = 'function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }';
    //  predefine all __zone_symbol__ + eventName + true/false string
    for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        var falseEventName = eventName + FALSE_STR;
        var trueEventName = eventName + TRUE_STR;
        var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames$1[eventName] = {};
        zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
    }
    //  predefine all task.source string
    for (var i = 0; i < WTF_ISSUE_555.length; i++) {
        var target = WTF_ISSUE_555_ARRAY[i];
        var targets = globalSources[target] = {};
        for (var j = 0; j < eventNames.length; j++) {
            var eventName = eventNames[j];
            targets[eventName] = target + ADD_EVENT_LISTENER_SOURCE + eventName;
        }
    }
    var checkIEAndCrossContext = function (nativeDelegate, delegate, target, args) {
        if (!isDisableIECheck && ieOrEdge) {
            if (isEnableCrossContextCheck) {
                try {
                    var testString = delegate.toString();
                    if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                        nativeDelegate.apply(target, args);
                        return false;
                    }
                }
                catch (error) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
            else {
                var testString = delegate.toString();
                if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
        }
        else if (isEnableCrossContextCheck) {
            try {
                delegate.toString();
            }
            catch (error) {
                nativeDelegate.apply(target, args);
                return false;
            }
        }
        return true;
    };
    var apiTypes = [];
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        apiTypes.push(type && type.prototype);
    }
    // vh is validateHandler to check event handler
    // is valid or not(for security check)
    patchEventTarget(_global, apiTypes, { vh: checkIEAndCrossContext });
    api.patchEventTarget = patchEventTarget;
    return true;
}
function patchEvent(global, api) {
    patchEventPrototype(global, api);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function registerElementPatch(_global) {
    if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
        return;
    }
    var _registerElement = document.registerElement;
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    document.registerElement = function (name, opts) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = 'Document.registerElement::' + callback;
                var prototype = opts.prototype;
                if (prototype.hasOwnProperty(callback)) {
                    var descriptor = ObjectGetOwnPropertyDescriptor(prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = wrapWithCurrentZone(descriptor.value, source);
                        _redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else {
                        prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                    }
                }
                else if (prototype[callback]) {
                    prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                }
            });
        }
        return _registerElement.call(document, name, opts);
    };
    attachOriginToPatched(document.registerElement, _registerElement);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
Zone.__load_patch('util', function (global, Zone, api) {
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
});
Zone.__load_patch('timers', function (global) {
    var set = 'set';
    var clear = 'clear';
    patchTimer(global, set, clear, 'Timeout');
    patchTimer(global, set, clear, 'Interval');
    patchTimer(global, set, clear, 'Immediate');
});
Zone.__load_patch('requestAnimationFrame', function (global) {
    patchTimer(global, 'request', 'cancel', 'AnimationFrame');
    patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
    patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
});
Zone.__load_patch('blocking', function (global, Zone) {
    var blockingMethods = ['alert', 'prompt', 'confirm'];
    for (var i = 0; i < blockingMethods.length; i++) {
        var name_1 = blockingMethods[i];
        patchMethod(global, name_1, function (delegate, symbol, name) {
            return function (s, args) {
                return Zone.current.run(delegate, global, args, name);
            };
        });
    }
});
Zone.__load_patch('EventTarget', function (global, Zone, api) {
    // load blackListEvents from global
    var SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
    if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
        Zone[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_BLACK_LISTED_EVENTS];
    }
    patchEvent(global, api);
    eventTargetPatch(global, api);
    // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
    var XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
        api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
    }
    patchClass('MutationObserver');
    patchClass('WebKitMutationObserver');
    patchClass('IntersectionObserver');
    patchClass('FileReader');
});
Zone.__load_patch('on_property', function (global, Zone, api) {
    propertyDescriptorPatch(api, global);
    propertyPatch();
    registerElementPatch(global);
});
Zone.__load_patch('canvas', function (global) {
    var HTMLCanvasElement = global['HTMLCanvasElement'];
    if (typeof HTMLCanvasElement !== 'undefined' && HTMLCanvasElement.prototype &&
        HTMLCanvasElement.prototype.toBlob) {
        patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', function (self, args) {
            return { name: 'HTMLCanvasElement.toBlob', target: self, cbIdx: 0, args: args };
        });
    }
});
Zone.__load_patch('XHR', function (global, Zone) {
    // Treat XMLHttpRequest as a macrotask.
    patchXHR(global);
    var XHR_TASK = zoneSymbol('xhrTask');
    var XHR_SYNC = zoneSymbol('xhrSync');
    var XHR_LISTENER = zoneSymbol('xhrListener');
    var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
    var XHR_URL = zoneSymbol('xhrURL');
    function patchXHR(window) {
        var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
        function findPendingTask(target) {
            return target[XHR_TASK];
        }
        var oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
        var oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        if (!oriAddListener) {
            var XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];
            if (XMLHttpRequestEventTarget) {
                var XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
                oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
        }
        var READY_STATE_CHANGE = 'readystatechange';
        var SCHEDULED = 'scheduled';
        function scheduleTask(task) {
            XMLHttpRequest[XHR_SCHEDULED] = false;
            var data = task.data;
            var target = data.target;
            // remove existing event listener
            var listener = target[XHR_LISTENER];
            if (!oriAddListener) {
                oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
            if (listener) {
                oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
            }
            var newListener = target[XHR_LISTENER] = function () {
                if (target.readyState === target.DONE) {
                    // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                    // readyState=4 multiple times, so we need to check task state here
                    if (!data.aborted && XMLHttpRequest[XHR_SCHEDULED] && task.state === SCHEDULED) {
                        task.invoke();
                    }
                }
            };
            oriAddListener.call(target, READY_STATE_CHANGE, newListener);
            var storedTask = target[XHR_TASK];
            if (!storedTask) {
                target[XHR_TASK] = task;
            }
            sendNative.apply(target, data.args);
            XMLHttpRequest[XHR_SCHEDULED] = true;
            return task;
        }
        function placeholderCallback() { }
        function clearTask(task) {
            var data = task.data;
            // Note - ideally, we would call data.target.removeEventListener here, but it's too late
            // to prevent it from firing. So instead, we store info for the event listener.
            data.aborted = true;
            return abortNative.apply(data.target, data.args);
        }
        var openNative = patchMethod(XMLHttpRequestPrototype, 'open', function () { return function (self, args) {
            self[XHR_SYNC] = args[2] == false;
            self[XHR_URL] = args[1];
            return openNative.apply(self, args);
        }; });
        var XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
        var sendNative = patchMethod(XMLHttpRequestPrototype, 'send', function () { return function (self, args) {
            if (self[XHR_SYNC]) {
                // if the XHR is sync there is no task to schedule, just execute the code.
                return sendNative.apply(self, args);
            }
            else {
                var options = {
                    target: self,
                    url: self[XHR_URL],
                    isPeriodic: false,
                    delay: null,
                    args: args,
                    aborted: false
                };
                return scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
            }
        }; });
        var abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', function () { return function (self) {
            var task = findPendingTask(self);
            if (task && typeof task.type == 'string') {
                // If the XHR has already completed, do nothing.
                // If the XHR has already been aborted, do nothing.
                // Fix #569, call abort multiple times before done will cause
                // macroTask task count be negative number
                if (task.cancelFn == null || (task.data && task.data.aborted)) {
                    return;
                }
                task.zone.cancelTask(task);
            }
            // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
            // task
            // to cancel. Do nothing.
        }; });
    }
});
Zone.__load_patch('geolocation', function (global) {
    /// GEO_LOCATION
    if (global['navigator'] && global['navigator'].geolocation) {
        patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
    }
});
Zone.__load_patch('PromiseRejectionEvent', function (global, Zone) {
    // handle unhandled promise rejection
    function findPromiseRejectionHandler(evtName) {
        return function (e) {
            var eventTasks = findEventTasks(global, evtName);
            eventTasks.forEach(function (eventTask) {
                // windows has added unhandledrejection event listener
                // trigger the event listener
                var PromiseRejectionEvent = global['PromiseRejectionEvent'];
                if (PromiseRejectionEvent) {
                    var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                    eventTask.invoke(evt);
                }
            });
        };
    }
    if (global['PromiseRejectionEvent']) {
        Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
            findPromiseRejectionHandler('unhandledrejection');
        Zone[zoneSymbol('rejectionHandledHandler')] =
            findPromiseRejectionHandler('rejectionhandled');
    }
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

})));


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <app-header></app-header>\n  <router-outlet></router-outlet>\n  <app-footer></app-footer>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _event_user_shared_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-user/shared/user.service */ "./src/app/event-user/shared/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(userservice) {
        this.userservice = userservice;
        this.title = 'app';
        this.userservice.updateProfile();
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_event_user_shared_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: getAuthServiceConfigs, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAuthServiceConfigs", function() { return getAuthServiceConfigs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/dist/zone */ "./node_modules/zone.js/dist/zone.js");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./material.module */ "./src/app/material.module.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./auth/auth.guard */ "./src/app/auth/auth.guard.ts");
/* harmony import */ var _auth_antiauth_guard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./auth/antiauth.guard */ "./src/app/auth/antiauth.guard.ts");
/* harmony import */ var _auth_adminauth_guard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./auth/adminauth.guard */ "./src/app/auth/adminauth.guard.ts");
/* harmony import */ var _auth_superadminauth_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./auth/superadminauth.guard */ "./src/app/auth/superadminauth.guard.ts");
/* harmony import */ var _auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./auth/auth.interceptor */ "./src/app/auth/auth.interceptor.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_color_picker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-color-picker */ "./node_modules/ngx-color-picker/dist/ngx-color-picker.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var ng_simple_slideshow__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng-simple-slideshow */ "./node_modules/ng-simple-slideshow/ng-simple-slideshow.es5.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./routes */ "./src/app/routes.ts");
/* harmony import */ var angular_6_social_login__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! angular-6-social-login */ "./node_modules/angular-6-social-login/angular-6-social-login.umd.js");
/* harmony import */ var angular_6_social_login__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(angular_6_social_login__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _event_user_shared_user_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./event-user/shared/user.service */ "./src/app/event-user/shared/user.service.ts");
/* harmony import */ var _events_shared_event_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./events/shared/event.service */ "./src/app/events/shared/event.service.ts");
/* harmony import */ var _event_types_shared_event_type_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./event-types/shared/event-type.service */ "./src/app/event-types/shared/event-type.service.ts");
/* harmony import */ var _event_venues_shared_event_venue_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./event-venues/shared/event-venue.service */ "./src/app/event-venues/shared/event-venue.service.ts");
/* harmony import */ var _shared_services_file_manager_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./shared-services/file-manager.service */ "./src/app/shared-services/file-manager.service.ts");
/* harmony import */ var _shared_services_api_factory_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./shared-services/api-factory.service */ "./src/app/shared-services/api-factory.service.ts");
/* harmony import */ var _shared_services_rest_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./shared-services/rest.service */ "./src/app/shared-services/rest.service.ts");
/* harmony import */ var _shared_services_datetime_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./shared-services/datetime.service */ "./src/app/shared-services/datetime.service.ts");
/* harmony import */ var _bookings_shared_booking_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./bookings/shared/booking.service */ "./src/app/bookings/shared/booking.service.ts");
/* harmony import */ var _shared_services_seo_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./shared-services/seo.service */ "./src/app/shared-services/seo.service.ts");
/* harmony import */ var _event_user_register_register_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./event-user/register/register.component */ "./src/app/event-user/register/register.component.ts");
/* harmony import */ var _event_user_login_login_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./event-user/login/login.component */ "./src/app/event-user/login/login.component.ts");
/* harmony import */ var _event_user_users_users_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./event-user/users/users.component */ "./src/app/event-user/users/users.component.ts");
/* harmony import */ var _event_user_users_user_user_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./event-user/users/user/user.component */ "./src/app/event-user/users/user/user.component.ts");
/* harmony import */ var _event_user_users_roles_roles_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./event-user/users/roles/roles.component */ "./src/app/event-user/users/roles/roles.component.ts");
/* harmony import */ var _event_user_users_roles_role_role_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./event-user/users/roles/role/role.component */ "./src/app/event-user/users/roles/role/role.component.ts");
/* harmony import */ var _event_user_settings_settings_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./event-user/settings/settings.component */ "./src/app/event-user/settings/settings.component.ts");
/* harmony import */ var _event_user_event_user_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./event-user/event-user.component */ "./src/app/event-user/event-user.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _events_events_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./events/events.component */ "./src/app/events/events.component.ts");
/* harmony import */ var _events_new_event_new_event_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./events/new-event/new-event.component */ "./src/app/events/new-event/new-event.component.ts");
/* harmony import */ var _event_types_event_types_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./event-types/event-types.component */ "./src/app/event-types/event-types.component.ts");
/* harmony import */ var _event_types_new_event_type_new_event_type_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./event-types/new-event-type/new-event-type.component */ "./src/app/event-types/new-event-type/new-event-type.component.ts");
/* harmony import */ var _event_venues_event_venues_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./event-venues/event-venues.component */ "./src/app/event-venues/event-venues.component.ts");
/* harmony import */ var _event_venues_new_event_venue_new_event_venue_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./event-venues/new-event-venue/new-event-venue.component */ "./src/app/event-venues/new-event-venue/new-event-venue.component.ts");
/* harmony import */ var _bookings_bookings_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./bookings/bookings.component */ "./src/app/bookings/bookings.component.ts");
/* harmony import */ var _bookings_booking_booking_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./bookings/booking/booking.component */ "./src/app/bookings/booking/booking.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
 // Included with Angular CLI.

























//import { EventPriceService } from './event-prices/shared/event-type.service';












//import { UpdateProfileComponent } from './event-user/settings/settings.component';














// Configs
function getAuthServiceConfigs() {
    var config = new angular_6_social_login__WEBPACK_IMPORTED_MODULE_20__["AuthServiceConfig"]([
        {
            id: angular_6_social_login__WEBPACK_IMPORTED_MODULE_20__["FacebookLoginProvider"].PROVIDER_ID,
            provider: new angular_6_social_login__WEBPACK_IMPORTED_MODULE_20__["FacebookLoginProvider"]("2215681985332917")
        },
        {
            id: angular_6_social_login__WEBPACK_IMPORTED_MODULE_20__["GoogleLoginProvider"].PROVIDER_ID,
            provider: new angular_6_social_login__WEBPACK_IMPORTED_MODULE_20__["GoogleLoginProvider"]("90679818586-qm4pcltmojh6g1gc7ib0al8cqlsif3sr.apps.googleusercontent.com")
        }
    ]);
    return config;
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_18__["AppComponent"],
                _event_user_register_register_component__WEBPACK_IMPORTED_MODULE_31__["RegisterComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_39__["HeaderComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_40__["FooterComponent"],
                _events_events_component__WEBPACK_IMPORTED_MODULE_41__["EventsComponent"],
                _event_user_login_login_component__WEBPACK_IMPORTED_MODULE_32__["LoginComponent"],
                _events_new_event_new_event_component__WEBPACK_IMPORTED_MODULE_42__["NewEventComponent"],
                _event_types_event_types_component__WEBPACK_IMPORTED_MODULE_43__["EventTypesComponent"],
                _event_types_new_event_type_new_event_type_component__WEBPACK_IMPORTED_MODULE_44__["NewEventTypeComponent"],
                _event_venues_event_venues_component__WEBPACK_IMPORTED_MODULE_45__["EventVenuesComponent"],
                _event_venues_new_event_venue_new_event_venue_component__WEBPACK_IMPORTED_MODULE_46__["NewEventVenueComponent"],
                _event_user_settings_settings_component__WEBPACK_IMPORTED_MODULE_37__["SettingsComponent"],
                _event_user_event_user_component__WEBPACK_IMPORTED_MODULE_38__["EventUserComponent"],
                _bookings_bookings_component__WEBPACK_IMPORTED_MODULE_47__["BookingsComponent"],
                _bookings_booking_booking_component__WEBPACK_IMPORTED_MODULE_48__["BookingComponent"],
                _event_user_users_users_component__WEBPACK_IMPORTED_MODULE_33__["UsersComponent"],
                _event_user_users_user_user_component__WEBPACK_IMPORTED_MODULE_34__["UserComponent"],
                _event_user_users_roles_roles_component__WEBPACK_IMPORTED_MODULE_35__["RolesComponent"],
                _event_user_users_roles_role_role_component__WEBPACK_IMPORTED_MODULE_36__["RoleComponent"],
                _event_user_users_users_component__WEBPACK_IMPORTED_MODULE_33__["SelectRoleDialog"],
                _event_user_users_users_component__WEBPACK_IMPORTED_MODULE_33__["UpdateRoleName"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrModule"].forRoot(),
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_8__["MaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_color_picker__WEBPACK_IMPORTED_MODULE_15__["ColorPickerModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_16__["FlexLayoutModule"],
                ng_simple_slideshow__WEBPACK_IMPORTED_MODULE_17__["SlideshowModule"],
                angular_6_social_login__WEBPACK_IMPORTED_MODULE_20__["SocialLoginModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forRoot(_routes__WEBPACK_IMPORTED_MODULE_19__["appRoutes"], { enableTracing: true } // <-- debugging purposes only
                ),
            ],
            entryComponents: [
                _event_user_users_users_component__WEBPACK_IMPORTED_MODULE_33__["SelectRoleDialog"],
                _event_user_users_users_component__WEBPACK_IMPORTED_MODULE_33__["UpdateRoleName"],
            ],
            providers: [_shared_services_seo_service__WEBPACK_IMPORTED_MODULE_30__["SeoService"], _bookings_shared_booking_service__WEBPACK_IMPORTED_MODULE_29__["BookingService"], _shared_services_datetime_service__WEBPACK_IMPORTED_MODULE_28__["DatetimeService"], _shared_services_rest_service__WEBPACK_IMPORTED_MODULE_27__["RestService"], _shared_services_api_factory_service__WEBPACK_IMPORTED_MODULE_26__["ApiFactoryService"], _shared_services_file_manager_service__WEBPACK_IMPORTED_MODULE_25__["FileManagerService"], _event_venues_shared_event_venue_service__WEBPACK_IMPORTED_MODULE_24__["EventVenueService"], _event_types_shared_event_type_service__WEBPACK_IMPORTED_MODULE_23__["EventTypeService"], _events_shared_event_service__WEBPACK_IMPORTED_MODULE_22__["EventService"], _event_user_shared_user_service__WEBPACK_IMPORTED_MODULE_21__["UserService"], _auth_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"], _auth_antiauth_guard__WEBPACK_IMPORTED_MODULE_10__["AntiauthGuard"], _auth_adminauth_guard__WEBPACK_IMPORTED_MODULE_11__["AdminauthGuard"], _auth_superadminauth_guard__WEBPACK_IMPORTED_MODULE_12__["SuperadminauthGuard"],
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HTTP_INTERCEPTORS"],
                    useClass: _auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_13__["AuthInterceptor"],
                    multi: true
                },
                {
                    provide: _angular_common__WEBPACK_IMPORTED_MODULE_14__["LocationStrategy"],
                    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_14__["HashLocationStrategy"]
                },
                {
                    provide: angular_6_social_login__WEBPACK_IMPORTED_MODULE_20__["AuthServiceConfig"],
                    useFactory: getAuthServiceConfigs
                },
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_18__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth/adminauth.guard.ts":
/*!*****************************************!*\
  !*** ./src/app/auth/adminauth.guard.ts ***!
  \*****************************************/
/*! exports provided: AdminauthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminauthGuard", function() { return AdminauthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdminauthGuard = /** @class */ (function () {
    function AdminauthGuard(router) {
        this.router = router;
    }
    AdminauthGuard.prototype.canActivate = function (next, state) {
        if (localStorage.getItem('userToken') != null) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    };
    AdminauthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AdminauthGuard);
    return AdminauthGuard;
}());



/***/ }),

/***/ "./src/app/auth/antiauth.guard.ts":
/*!****************************************!*\
  !*** ./src/app/auth/antiauth.guard.ts ***!
  \****************************************/
/*! exports provided: AntiauthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AntiauthGuard", function() { return AntiauthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AntiauthGuard = /** @class */ (function () {
    function AntiauthGuard(router) {
        this.router = router;
    }
    AntiauthGuard.prototype.canActivate = function (next, state) {
        if (localStorage.getItem('userToken') == null) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    };
    AntiauthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AntiauthGuard);
    return AntiauthGuard;
}());



/***/ }),

/***/ "./src/app/auth/auth.guard.ts":
/*!************************************!*\
  !*** ./src/app/auth/auth.guard.ts ***!
  \************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (localStorage.getItem('userToken') != null) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/auth/auth.interceptor.ts":
/*!******************************************!*\
  !*** ./src/app/auth/auth.interceptor.ts ***!
  \******************************************/
/*! exports provided: AuthInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_add_operator_do__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/do */ "./node_modules/rxjs-compat/_esm5/add/operator/do.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(router) {
        this.router = router;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());
        if (localStorage.getItem('userToken') != null) {
            var clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq)
                .do(function (succ) { }, function (err) {
                if (err.status === 401) {
                    localStorage.removeItem('userToken');
                    _this.router.navigateByUrl('/login');
                }
            });
        }
        else {
            this.router.navigateByUrl('');
        }
    };
    AuthInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthInterceptor);
    return AuthInterceptor;
}());



/***/ }),

/***/ "./src/app/auth/superadminauth.guard.ts":
/*!**********************************************!*\
  !*** ./src/app/auth/superadminauth.guard.ts ***!
  \**********************************************/
/*! exports provided: SuperadminauthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuperadminauthGuard", function() { return SuperadminauthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SuperadminauthGuard = /** @class */ (function () {
    function SuperadminauthGuard(router) {
        this.router = router;
    }
    SuperadminauthGuard.prototype.canActivate = function (next, state) {
        if (localStorage.getItem('userToken') != null) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    };
    SuperadminauthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], SuperadminauthGuard);
    return SuperadminauthGuard;
}());



/***/ }),

/***/ "./src/app/bookings/booking/booking.component.css":
/*!********************************************************!*\
  !*** ./src/app/bookings/booking/booking.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".center {\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.banner-card {\n  padding-top: 0px;\n  padding-bottom: 0px;\n  background: #d7dac99e;\n  max-height: 350px;\n}\n\n*{\n    margin:0;\n    padding:0;\n}\n\n#wrapper{\n    display:-webkit-flex;\n    -webkit-justify-content:center;\n\n    display:flex;\n    justify-content:center;\n\n}\n\n.screen-container\n{\n    display:-webkit-flex;\n    -webkit-justify-content:center;\n\n    display:flex;\n    justify-content:center;\n\n    text-align: center;\n    font-size: 12px;\n}\n\n#wrapper mat-card{\n    flex:1;\n}\n\ntable { margin: auto; }\n\n.boking_banner\n{\n  max-height: 20%;\n}\n"

/***/ }),

/***/ "./src/app/bookings/booking/booking.component.html":
/*!*********************************************************!*\
  !*** ./src/app/bookings/booking/booking.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"banner-card\">\n  <img class=\"boking_banner responsive center\" [src]=\"event.images['banner'].url\" onerror=\"this.src='https://algovent-s3-static.s3.amazonaws.com/eventico/media/event_bWDUlrT.jpg'\">\n</mat-card>\n<div id=\"wrapper\">\n  <mat-card class=\"\">\n    <mat-list>\n      <mat-list-item *ngFor=\"let price of bookingLayout.priceList\">\n        <mat-icon class=\"pricing_color_icon\" matListIcon [style.color]=\"price.color\">event_seat</mat-icon>\n        <h3 matLine> {{ price.label }} </h3>\n        <p matLine>\n          <span> RS {{ price.value }} </span>\n          <span class=\"demo-2\"> -- {{ price.desc }} </span>\n        </p>\n        <mat-divider></mat-divider>\n\n      </mat-list-item>\n    </mat-list>\n  </mat-card>\n  <mat-card  class=\"scrollable-content\" style=\"flex-basis: 800px\">\n    <mat-card-content >\n        <table *ngFor=\"let group of layout_groups\" disabled>\n          <tr *ngFor=\"let row of group.rows\">\n            <td *ngFor=\"let col of row.cols\" class=\"seat-col\">\n              <button *ngIf=\"col.type != 'active'\" [matTooltip]=\"col.number\" class=\"seat-button\" disabled  mat-icon-button><mat-icon [style.color]=\"bookingLayout.typeColors[col.type]\" aria-label=\"Event Seat\">{{ bookingLayout.typeIcons[col.type] }}</mat-icon></button>\n              <button *ngIf=\"col['selected'] == true\" (click)=\"bookingLayout.selectSeat(col)\" [matTooltip]=\"'seat : '+col.number+' ,cost : '+bookingLayout.priceMap[col.price].value\" class=\"seat-button\" mat-icon-button><mat-icon [style.color]=\"bookingLayout.typeColors['na']\" aria-label=\"Event Seat\">{{ bookingLayout.typeIcons[col.type] }}</mat-icon></button>\n              <button *ngIf=\"col.type == 'active' && col['selected'] != true\" (click)=\"bookingLayout.selectSeat(col)\" [matTooltip]=\"'seat : '+col.number+' ,cost : '+bookingLayout.priceMap[col.price].value\" class=\"seat-button\" mat-icon-button><mat-icon [style.color]=\"bookingLayout.priceMap[col.price].color\" aria-label=\"Event Seat\">{{ bookingLayout.typeIcons[col.type] }}</mat-icon></button>\n            </td>\n          <tr>\n        </table>\n\n      </mat-card-content>\n  </mat-card>\n  <mat-card class=\"\" >\n    <mat-list>\n      <mat-list-item *ngFor=\"let summary_unit of bookingLayout.selection_info['selection_summary']\">\n        <mat-icon class=\"pricing_color_icon\" matListIcon [style.color]=\"bookingLayout.priceMap[summary_unit.price].color\">event_seat</mat-icon>\n        <h3 matLine> {{ bookingLayout.priceMap[summary_unit.price].label }} </h3>\n        <p matLine>\n          <span> RS {{ bookingLayout.priceMap[summary_unit.price].value }} </span>\n          <span class=\"demo-2\"> x {{ summary_unit.qty }} </span>\n        </p>\n        <button mat-icon-button (click)=\"bookingLayout.removeSelection(summary_unit)\"><mat-icon>delete_outline</mat-icon></button>\n        <mat-divider></mat-divider>\n\n      </mat-list-item>\n\n      <mat-list-item>\n        <mat-icon class=\"pricing_color_icon\" matListIcon >payment</mat-icon>\n        <h2 matLine> Total </h2>\n        <button mat-icon-button>RS. {{ bookingLayout.selection_info['total'] }}</button>\n      </mat-list-item>\n    </mat-list>\n    <mat-divider></mat-divider>\n\n    <mat-card-actions>\n      <button mat-button (click)=\"onNavigate()\">PAY</button>\n      <button mat-button (click)=\"skipAndBook()\">SKIP PAY & BOOK</button>\n    </mat-card-actions>\n  </mat-card>\n</div>\n<div class=\"spacer\"></div>\n<div class=\"screen-container\">\n  <div style=\"text-align: center\" class=\"screen-div\">SCREEN HERE</div>\n</div>\n"

/***/ }),

/***/ "./src/app/bookings/booking/booking.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/bookings/booking/booking.component.ts ***!
  \*******************************************************/
/*! exports provided: BookingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingComponent", function() { return BookingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_booking_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/booking.model */ "./src/app/bookings/shared/booking.model.ts");
/* harmony import */ var _shared_booking_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/booking.service */ "./src/app/bookings/shared/booking.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _events_shared_event_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/shared/event.service */ "./src/app/events/shared/event.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_services_seo_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared-services/seo.service */ "./src/app/shared-services/seo.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var BookingComponent = /** @class */ (function () {
    function BookingComponent(bookingService, eventService, router, route, snackBar, seo) {
        var _this = this;
        this.bookingService = bookingService;
        this.eventService = eventService;
        this.router = router;
        this.route = route;
        this.snackBar = snackBar;
        this.seo = seo;
        this.updateMetaData();
        this.route.params.subscribe(function (params) { return _this.setupBooking(params['event_id'], params['id']); });
    }
    BookingComponent.prototype.ngOnInit = function () {
    };
    BookingComponent.prototype.setupBooking = function (event_id, booking_id) {
        if (booking_id) {
            this.mode = 'edit';
        }
        else {
            this.mode = 'new';
            this.setupNewBooking(event_id);
        }
    };
    BookingComponent.prototype.setupNewBooking = function (event_id) {
        var _this = this;
        this.booking = new _shared_booking_model__WEBPACK_IMPORTED_MODULE_1__["Booking"](this.mode);
        this.bookingLayout = this.booking.bookingLayout;
        this.event = this.booking.event;
        if (event_id != null && event_id != "undefined") {
            this.eventService.getEvent(event_id)
                .subscribe(function (data) {
                _this.booking.import(data);
                //this.updateMetaData();
            });
        }
    };
    BookingComponent.prototype.skipAndBook = function () {
        var _this = this;
        this.bookingService.skipAndBook(this.booking)
            .subscribe(function (data) {
            var message = 'Booking Confirmed';
            var action = '';
            var booking_confirm_bar = _this.snackBar.open(message, action, {
                duration: 500,
                verticalPosition: 'top',
                horizontalPosition: 'right',
            });
            booking_confirm_bar.afterDismissed().subscribe(function () {
                _this.router.navigate(['']);
            });
        });
    };
    Object.defineProperty(BookingComponent.prototype, "layout_groups", {
        get: function () {
            return this.bookingLayout.groups;
        },
        enumerable: true,
        configurable: true
    });
    BookingComponent.prototype.updateMetaData = function () {
        var config = {
            title: 'Geethanjali',
            desc: 'desc',
            image_url: 'https://algovent-s3-static.s3.amazonaws.com/eventico/media/Code_data_P0UNmn7.jpg' //this.event.images['banner'].url,
        };
        this.seo.generateTags(config);
    };
    BookingComponent.prototype.onNavigate = function () {
        window.open('https://sandboxsecure.payu.in/_payment', '_blank');
    };
    BookingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-booking',
            template: __webpack_require__(/*! ./booking.component.html */ "./src/app/bookings/booking/booking.component.html"),
            styles: [__webpack_require__(/*! ./booking.component.css */ "./src/app/bookings/booking/booking.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_booking_service__WEBPACK_IMPORTED_MODULE_2__["BookingService"], _events_shared_event_service__WEBPACK_IMPORTED_MODULE_4__["EventService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"], _shared_services_seo_service__WEBPACK_IMPORTED_MODULE_6__["SeoService"]])
    ], BookingComponent);
    return BookingComponent;
}());



/***/ }),

/***/ "./src/app/bookings/bookings.component.css":
/*!*************************************************!*\
  !*** ./src/app/bookings/bookings.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/bookings/bookings.component.html":
/*!**************************************************!*\
  !*** ./src/app/bookings/bookings.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  bookings works!\n</p>\n"

/***/ }),

/***/ "./src/app/bookings/bookings.component.ts":
/*!************************************************!*\
  !*** ./src/app/bookings/bookings.component.ts ***!
  \************************************************/
/*! exports provided: BookingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingsComponent", function() { return BookingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BookingsComponent = /** @class */ (function () {
    function BookingsComponent() {
    }
    BookingsComponent.prototype.ngOnInit = function () {
    };
    BookingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-bookings',
            template: __webpack_require__(/*! ./bookings.component.html */ "./src/app/bookings/bookings.component.html"),
            styles: [__webpack_require__(/*! ./bookings.component.css */ "./src/app/bookings/bookings.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BookingsComponent);
    return BookingsComponent;
}());



/***/ }),

/***/ "./src/app/bookings/shared/booking.model.ts":
/*!**************************************************!*\
  !*** ./src/app/bookings/shared/booking.model.ts ***!
  \**************************************************/
/*! exports provided: Booking */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Booking", function() { return Booking; });
/* harmony import */ var _shared_booking_layout_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/booking-layout.model */ "./src/app/shared/booking-layout.model.ts");
/* harmony import */ var _events_shared_event_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/shared/event.model */ "./src/app/events/shared/event.model.ts");


var Booking = /** @class */ (function () {
    function Booking(mode) {
        this.mode = mode;
        this.event_mode = 'list';
        this.layout_mode = 'new';
        this.event = new _events_shared_event_model__WEBPACK_IMPORTED_MODULE_1__["Event"]({}, this.event_mode);
        this.bookingLayout = new _shared_booking_layout_model__WEBPACK_IMPORTED_MODULE_0__["BookingLayout"]({}, this.layout_mode);
    }
    Booking.prototype.import = function (bookingJsonObject) {
        if (this.mode == 'new') {
            this.layout_mode = 'edit';
            this.bookingLayout.mode = this.layout_mode;
            this.bookingLayout.import(bookingJsonObject['layout']);
            this.event.import(bookingJsonObject['event']);
        }
        else if (this.mode == 'edit') {
            this.bookingLayout.mode = 'edit';
            //import data to event in list mode
            //import layout to booking in edit mode
            this.Id = bookingJsonObject["id"];
            this.Uid = bookingJsonObject["uid"];
        }
        else if (this.mode == 'list') {
            this.Id = bookingJsonObject["id"];
            this.Uid = bookingJsonObject["uid"];
        }
        else if (this.mode == 'view') {
            this.Id = bookingJsonObject["id"];
            this.Uid = bookingJsonObject["uid"];
        }
    };
    Booking.prototype.export = function () {
        var exportJSON = {
            "id": this.Id,
            "uid": this.Uid,
            "event_id": this.event.Id,
            'selection_info': this.bookingLayout.selection_info,
        };
        return exportJSON;
    };
    return Booking;
}());



/***/ }),

/***/ "./src/app/bookings/shared/booking.service.ts":
/*!****************************************************!*\
  !*** ./src/app/bookings/shared/booking.service.ts ***!
  \****************************************************/
/*! exports provided: BookingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingService", function() { return BookingService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _events_shared_event_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/shared/event.service */ "./src/app/events/shared/event.service.ts");
/* harmony import */ var _shared_services_rest_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared-services/rest.service */ "./src/app/shared-services/rest.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BookingService = /** @class */ (function () {
    function BookingService(restService, eventService) {
        this.restService = restService;
        this.eventService = eventService;
    }
    BookingService.prototype.skipAndBook = function (booking) {
        var skipAndBookJSON = booking.export();
        return this.restService.post('SKIP_AND_BOOK', true, null, skipAndBookJSON);
    };
    BookingService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_shared_services_rest_service__WEBPACK_IMPORTED_MODULE_2__["RestService"], _events_shared_event_service__WEBPACK_IMPORTED_MODULE_1__["EventService"]])
    ], BookingService);
    return BookingService;
}());



/***/ }),

/***/ "./src/app/event-types/event-types.component.css":
/*!*******************************************************!*\
  !*** ./src/app/event-types/event-types.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-card {\n  max-width: 400px;\n}\n\n.example-header-image {\n  background-image: url('https://ibb.co/jNkMT8');\n  background-size: cover;\n}\n\n.events-filter-toolbar\n{\n  margin-top : 20px;\n}\n\n.tollbar-splitter\n{\n  flex: 1 1 auto;\n}\n\nmat-form-field.mat-form-field {\n  font-size: 14px;\n}\n"

/***/ }),

/***/ "./src/app/event-types/event-types.component.html":
/*!********************************************************!*\
  !*** ./src/app/event-types/event-types.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar class=\"events-filter-toolbar\">\n  <mat-toolbar-row>\n    <mat-form-field primary>\n      <input matInput type=\"text\" placeholder=\"Search\">\n    </mat-form-field>\n    <span class=\"tollbar-splitter\"></span>\n    <button mat-button routerLink=\"event-type\"><i class=\"material-icons md-dark\">playlist_add</i> New Event Type</button>\n  </mat-toolbar-row>\n</mat-toolbar>\n<mat-divider></mat-divider>\n<mat-grid-list cols=\"3\" rowHeight=\"6:3\">\n  <mat-grid-tile *ngFor=\"let eventType of eventTypes\">\n    <mat-card class=\"example-card\">\n      <mat-card-header>\n        <mat-card-title>{{ eventType.Name }}</mat-card-title>\n      </mat-card-header>\n      <mat-card-content>\n        <p>\n          {{ eventType.Desc }}\n        </p>\n      </mat-card-content>\n      <mat-card-actions>\n        <button mat-button >EDIT</button>\n      </mat-card-actions>\n    </mat-card>\n  </mat-grid-tile>\n</mat-grid-list>\n"

/***/ }),

/***/ "./src/app/event-types/event-types.component.ts":
/*!******************************************************!*\
  !*** ./src/app/event-types/event-types.component.ts ***!
  \******************************************************/
/*! exports provided: EventTypesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventTypesComponent", function() { return EventTypesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_event_type_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/event-type.service */ "./src/app/event-types/shared/event-type.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventTypesComponent = /** @class */ (function () {
    function EventTypesComponent(eventTypeService) {
        this.eventTypeService = eventTypeService;
    }
    EventTypesComponent.prototype.ngOnInit = function () {
        this.eventTypeService.loadEventTypes();
    };
    Object.defineProperty(EventTypesComponent.prototype, "eventTypes", {
        get: function () {
            return this.eventTypeService.eventTypes;
        },
        enumerable: true,
        configurable: true
    });
    EventTypesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-event-types',
            template: __webpack_require__(/*! ./event-types.component.html */ "./src/app/event-types/event-types.component.html"),
            styles: [__webpack_require__(/*! ./event-types.component.css */ "./src/app/event-types/event-types.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_event_type_service__WEBPACK_IMPORTED_MODULE_1__["EventTypeService"]])
    ], EventTypesComponent);
    return EventTypesComponent;
}());



/***/ }),

/***/ "./src/app/event-types/new-event-type/new-event-type.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/event-types/new-event-type/new-event-type.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".new-event-type-card\n{\n   max-width: 30%;\n   margin: 100px auto;\n}\n\n.full-width\n{\n  width : 100%;\n}\n\n.new-event-type-card-title\n{\n  flex: 1 1 auto;\n  text-align: center;\n}\n"

/***/ }),

/***/ "./src/app/event-types/new-event-type/new-event-type.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/event-types/new-event-type/new-event-type.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"new-event-type-card\">\n  <mat-card-title class=\"new-event-type-card-title\">New Event Type</mat-card-title>\n  <form class=\"new-event-type-form\" #eventTypeCreationForm=\"ngForm\" (ngSubmit)=\"onSubmit(eventTypeCreationForm)\">\n  <mat-card-content>\n      <mat-form-field class=\"full-width\">\n        <input matInput placeholder=\"Name\" #Name=\"ngModel\" [(ngModel)]=\"eventType.Name\" name=\"Name\" required>\n      </mat-form-field>\n      <mat-form-field class=\"full-width\">\n        <textarea matInput placeholder=\"Description\" #Desc=\"ngModel\" [(ngModel)]=\"eventType.Desc\" name=\"Description\" required></textarea>\n      </mat-form-field>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-raised-button type=\"submit\" class=\"full-width\" color=\"primary\">CREATE</button>\n  </mat-card-actions>\n  </form>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/event-types/new-event-type/new-event-type.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/event-types/new-event-type/new-event-type.component.ts ***!
  \************************************************************************/
/*! exports provided: NewEventTypeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewEventTypeComponent", function() { return NewEventTypeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_event_type_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/event-type.model */ "./src/app/event-types/shared/event-type.model.ts");
/* harmony import */ var _shared_event_type_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/event-type.service */ "./src/app/event-types/shared/event-type.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewEventTypeComponent = /** @class */ (function () {
    function NewEventTypeComponent(eventTypeService, router) {
        this.eventTypeService = eventTypeService;
        this.router = router;
        this.eventType = new _shared_event_type_model__WEBPACK_IMPORTED_MODULE_1__["EventType"]({});
    }
    NewEventTypeComponent.prototype.ngOnInit = function () {
        this.resetForm();
    };
    NewEventTypeComponent.prototype.resetForm = function (form) {
        if (form != null) {
            form.reset();
            this.eventType = new _shared_event_type_model__WEBPACK_IMPORTED_MODULE_1__["EventType"]({});
        }
    };
    NewEventTypeComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.eventTypeService.createEventType(this.eventType)
            .subscribe(function (data) {
            _this.resetForm(form);
            _this.router.navigate(['']);
        });
    };
    NewEventTypeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-new-event-type',
            template: __webpack_require__(/*! ./new-event-type.component.html */ "./src/app/event-types/new-event-type/new-event-type.component.html"),
            styles: [__webpack_require__(/*! ./new-event-type.component.css */ "./src/app/event-types/new-event-type/new-event-type.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_event_type_service__WEBPACK_IMPORTED_MODULE_2__["EventTypeService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], NewEventTypeComponent);
    return NewEventTypeComponent;
}());



/***/ }),

/***/ "./src/app/event-types/shared/event-type.model.ts":
/*!********************************************************!*\
  !*** ./src/app/event-types/shared/event-type.model.ts ***!
  \********************************************************/
/*! exports provided: EventType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventType", function() { return EventType; });
var EventType = /** @class */ (function () {
    function EventType(eventTypeJsonObject) {
        this.Id = eventTypeJsonObject["id"];
        this.Name = eventTypeJsonObject["name"];
        this.Desc = eventTypeJsonObject["desc"];
    }
    EventType.prototype.getCreateJSON = function () {
        var createJSON = {
            "name": this.Name,
            "desc": this.Desc
        };
        return createJSON;
    };
    EventType.prototype.getUpdateJSON = function () {
        var updateJSON = {
            "id": this.Id,
            "name": this.Name,
            "desc": this.Desc
        };
        return updateJSON;
    };
    return EventType;
}());



/***/ }),

/***/ "./src/app/event-types/shared/event-type.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/event-types/shared/event-type.service.ts ***!
  \**********************************************************/
/*! exports provided: EventTypeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventTypeService", function() { return EventTypeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _event_type_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-type.model */ "./src/app/event-types/shared/event-type.model.ts");
/* harmony import */ var _shared_services_rest_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared-services/rest.service */ "./src/app/shared-services/rest.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventTypeService = /** @class */ (function () {
    function EventTypeService(restService) {
        this.restService = restService;
        this.eventTypes = [];
    }
    EventTypeService.prototype.createEventType = function (createETObj) {
        var createJSON = createETObj.getCreateJSON();
        return this.restService.post('CREATE_EVENT_TYPE', true, null, createJSON);
    };
    EventTypeService.prototype.updateEventType = function (updateETObj) {
        var updateJSON = updateETObj.getUpdateJSON();
        return this.restService.post('UPDATE_EVENT_TYPE', true, null, updateJSON);
    };
    EventTypeService.prototype.loadEventTypes = function () {
        var _this = this;
        this.eventTypes = [];
        this.fetchEventTypes().subscribe(function (data) {
            _this.syncUIEventTypes(data);
        });
    };
    EventTypeService.prototype.fetchEventTypes = function () {
        var params = {};
        return this.restService.get('GET_EVENT_TYPES', true, null, params);
    };
    EventTypeService.prototype.syncUIEventTypes = function (data) {
        console.log('sync data ::');
        console.log(data);
        var eventTypeList = JSON.parse(data);
        for (var i = 0; i < eventTypeList.length; i++) {
            var id = eventTypeList[i]["pk"];
            var eventTypeJsonObject = eventTypeList[i]["fields"];
            eventTypeJsonObject["id"] = id;
            var eventType = new _event_type_model__WEBPACK_IMPORTED_MODULE_1__["EventType"](eventTypeJsonObject);
            this.eventTypes.push(eventType);
        }
        console.log(this.eventTypes);
    };
    EventTypeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_shared_services_rest_service__WEBPACK_IMPORTED_MODULE_2__["RestService"]])
    ], EventTypeService);
    return EventTypeService;
}());



/***/ }),

/***/ "./src/app/event-user/event-user.component.css":
/*!*****************************************************!*\
  !*** ./src/app/event-user/event-user.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/event-user/event-user.component.html":
/*!******************************************************!*\
  !*** ./src/app/event-user/event-user.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  event-user works!\n</p>\n"

/***/ }),

/***/ "./src/app/event-user/event-user.component.ts":
/*!****************************************************!*\
  !*** ./src/app/event-user/event-user.component.ts ***!
  \****************************************************/
/*! exports provided: EventUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventUserComponent", function() { return EventUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EventUserComponent = /** @class */ (function () {
    function EventUserComponent() {
    }
    EventUserComponent.prototype.ngOnInit = function () {
    };
    EventUserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-event-user',
            template: __webpack_require__(/*! ./event-user.component.html */ "./src/app/event-user/event-user.component.html"),
            styles: [__webpack_require__(/*! ./event-user.component.css */ "./src/app/event-user/event-user.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EventUserComponent);
    return EventUserComponent;
}());



/***/ }),

/***/ "./src/app/event-user/login/login.component.css":
/*!******************************************************!*\
  !*** ./src/app/event-user/login/login.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-card\n{\n   max-width: 50%;\n   margin: 100px auto;\n   padding: 0px;\n\n}\n\n.full-width\n{\n  width : 100%;\n}\n\n.login-title\n{\n  flex: 1 1 auto;\n  text-align: center;\n}\n\nbody {\n  font-family: Arial, Helvetica, sans-serif;\n}\n\n* {\n  box-sizing: border-box;\n}\n\n/* style the container */\n\n.container {\n  position: relative;\n  border-radius: 5px;\n  background-color: #f2f2f2;\n  padding: 20px 0 30px 0;\n}\n\n/* style inputs and link buttons */\n\ninput,\n.btn {\n  width: 100%;\n  padding: 12px;\n  border: none;\n  border-radius: 4px;\n  margin: 5px 0;\n  opacity: 0.85;\n  display: inline-block;\n  font-size: 17px;\n  line-height: 20px;\n  text-decoration: none; /* remove underline from anchors */\n}\n\ninput:hover,\n.btn:hover {\n  opacity: 1;\n}\n\n/* add appropriate colors to fb, twitter and google buttons */\n\n.fb {\n  background-color: #3B5998;\n  color: white;\n}\n\n.twitter {\n  background-color: #55ACEE;\n  color: white;\n}\n\n.google {\n  background-color: #dd4b39;\n  color: white;\n}\n\n/* style the submit button */\n\ninput[type=submit] {\n  background-color: #4CAF50;\n  color: white;\n  cursor: pointer;\n}\n\ninput[type=submit]:hover {\n  background-color: #45a049;\n}\n\n/* Two-column layout */\n\n.col {\n  float: left;\n  width: 50%;\n  margin: auto;\n  padding: 0 50px;\n  margin-top: 6px;\n}\n\n/* Clear floats after the columns */\n\n.row:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n\n/* vertical line */\n\n.vl {\n  position: absolute;\n  left: 50%;\n  -webkit-transform: translate(-50%);\n          transform: translate(-50%);\n  border: 2px solid #ddd;\n  height: 175px;\n}\n\n/* text inside the vertical line */\n\n.vl-innertext {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  background-color: #f1f1f1;\n  border: 1px solid #ccc;\n  border-radius: 50%;\n  padding: 8px 10px;\n}\n\n/* hide some text on medium and large screens */\n\n.hide-md-lg {\n  display: none;\n}\n\n/* bottom container */\n\n.bottom-container {\n  text-align: center;\n  background-color: #666;\n  border-radius: 0px 0px 4px 4px;\n}\n\n/* Responsive layout - when the screen is less than 650px wide, make the two columns stack on top of each other instead of next to each other */\n\n@media screen and (max-width: 650px) {\n  .col {\n    width: 100%;\n    margin-top: 0;\n  }\n  /* hide the vertical line */\n  .vl {\n    display: none;\n  }\n  /* show the hidden text on small screens */\n  .hide-md-lg {\n    display: block;\n    text-align: center;\n  }\n\n  .login-card\n  {\n     max-width: 100%;\n     margin: 0px auto;\n     padding: 0px;\n\n  }\n}\n"

/***/ }),

/***/ "./src/app/event-user/login/login.component.html":
/*!*******************************************************!*\
  !*** ./src/app/event-user/login/login.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"login-card\">\n  <div class=\"container\">\n  <form #userLoginForm=\"ngForm\" (ngSubmit)=\"onLogin(userLoginForm)\">\n    <div class=\"row\">\n      <h2 style=\"text-align:center\"></h2>\n      <div class=\"vl\">\n        <span class=\"vl-innertext\">or</span>\n      </div>\n\n      <div class=\"col\">\n        <a (click)=\"socialSignIn('facebook')\" class=\"fb btn\">\n          <i class=\"fa fa-facebook fa-fw\"></i> Login with Facebook\n        </a>\n        <a (click)=\"socialSignIn('google')\" class=\"google btn\"><i class=\"fa fa-google fa-fw\">\n          </i> Login with Google+\n        </a>\n      </div>\n\n      <div class=\"col\">\n        <div class=\"hide-md-lg\">\n          <p>Or</p>\n        </div>\n\n        <input type=\"text\" #Email=\"ngModel\" name=\"Email\" placeholder=\"Username\" [(ngModel)]=\"user.Email\" required>\n        <input type=\"password\" #Password=\"ngModel\" name=\"Password\" placeholder=\"Password\" [(ngModel)]=\"user.Password\" required>\n        <input type=\"submit\" value=\"Login\">\n      </div>\n\n    </div>\n  </form>\n</div>\n\n<div class=\"bottom-container\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <a [routerLink]=\"['/signup']\"  style=\"color:white\" class=\"btn\">Sign up</a>\n    </div>\n    <div class=\"col\">\n      <a href=\"#\" style=\"color:white\" class=\"btn\">Forgot password?</a>\n    </div>\n  </div>\n</div>\n</mat-card>\n<!--<mat-card-title class=\"login-title\">LOGIN</mat-card-title>-->\n  <!--<form class=\"login-form\" #userLoginForm=\"ngForm\" (ngSubmit)=\"onLogin(userLoginForm)\">-->\n  <!--<mat-card-content>-->\n      <!--<mat-form-field class=\"full-width\">-->\n        <!--<input matInput placeholder=\"Email\" #Email=\"ngModel\" [(ngModel)]=\"user.Email\" name=\"Email\" required>-->\n      <!--</mat-form-field>-->\n      <!--<mat-form-field class=\"full-width\">-->\n        <!--<input matInput placeholder=\"Password\" type=\"password\" #Password=\"ngModel\" [(ngModel)]=\"user.Password\" name=\"Password\" required>-->\n      <!--</mat-form-field>-->\n  <!--</mat-card-content>-->\n  <!--<mat-card-actions>-->\n    <!--<button mat-raised-button class=\"full-width\" color=\"primary\">Login</button>-->\n  <!--</mat-card-actions>-->\n  <!--</form>-->\n  <!--<mat-divider></mat-divider>-->\n  <!--<mat-card-actions>-->\n    <!--<button mat-button  (click)=\"socialSignIn('facebook')\" color=\"primary\"><i class=\"material-icons md-dark\">book</i> Facebook</button>-->\n    <!--<button mat-button  (click)=\"socialSignIn('google')\"  color=\"primary\"><i class=\"material-icons md-dark\">book</i> Google</button>-->\n  <!--</mat-card-actions>-->\n\n"

/***/ }),

/***/ "./src/app/event-user/login/login.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/event-user/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_user_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/user.model */ "./src/app/event-user/shared/user.model.ts");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/user.service */ "./src/app/event-user/shared/user.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_6_social_login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-6-social-login */ "./node_modules/angular-6-social-login/angular-6-social-login.umd.js");
/* harmony import */ var angular_6_social_login__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angular_6_social_login__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = /** @class */ (function () {
    function LoginComponent(userservice, toastr, router, socialAuthService) {
        this.userservice = userservice;
        this.toastr = toastr;
        this.router = router;
        this.socialAuthService = socialAuthService;
        this.user = new _shared_user_model__WEBPACK_IMPORTED_MODULE_1__["User"]();
        this.passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
    }
    LoginComponent.prototype.socialSignIn = function (socialPlatform) {
        var socialPlatformProvider;
        if (socialPlatform == "facebook") {
            socialPlatformProvider = angular_6_social_login__WEBPACK_IMPORTED_MODULE_5__["FacebookLoginProvider"].PROVIDER_ID;
        }
        else if (socialPlatform == "google") {
            socialPlatformProvider = angular_6_social_login__WEBPACK_IMPORTED_MODULE_5__["GoogleLoginProvider"].PROVIDER_ID;
        }
        this.socialAuthService.signIn(socialPlatformProvider).then(function (userData) {
            console.log(socialPlatform + " sign in data : ", userData);
            // Now sign-in with userData
            // ...
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.resetForm();
    };
    LoginComponent.prototype.resetForm = function (form) {
        if (form != null) {
            form.reset();
            this.user = {
                Email: '',
                FirstName: '',
                LastName: '',
                Mobile: '',
                Password: '',
                AdminToolBar: null,
                EventCard: null,
                LoggedIn: null
            };
        }
    };
    LoginComponent.prototype.onLogin = function (form) {
        var _this = this;
        this.userservice.loginUser(form.value)
            .subscribe(function (data) {
            _this.resetForm(form);
            localStorage.setItem('userToken', data['token']);
            _this.userservice.updateProfile();
            _this.router.navigate(['']);
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/event-user/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/event-user/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], angular_6_social_login__WEBPACK_IMPORTED_MODULE_5__["AuthService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/event-user/register/register.component.css":
/*!************************************************************!*\
  !*** ./src/app/event-user/register/register.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".register-card\n{\n   max-width: 30%;\n   margin: 100px auto;\n}\n\n.full-width\n{\n  width : 100%;\n}\n\n.register-title\n{\n  flex: 1 1 auto;\n  text-align: center;\n}\n"

/***/ }),

/***/ "./src/app/event-user/register/register.component.html":
/*!*************************************************************!*\
  !*** ./src/app/event-user/register/register.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"register-card\">\n  <mat-card-title class=\"register-title\">SIGNUP</mat-card-title>\n  <form class=\"register-form\" #userRegistrationForm=\"ngForm\" (ngSubmit)=\"onRegister(userRegistrationForm)\">\n  <mat-card-content>\n      <mat-form-field class=\"full-width\">\n        <input matInput placeholder=\"Firstname\" #FirstName=\"ngModel\" [(ngModel)]=\"user.FirstName\" name=\"FirstName\" required>\n      </mat-form-field>\n      <mat-form-field class=\"full-width\">\n        <input matInput placeholder=\"Lastname\" #LastName=\"ngModel\" [(ngModel)]=\"user.LastName\" name=\"LastName\" required>\n      </mat-form-field>\n      <mat-form-field class=\"full-width\">\n        <input matInput type=\"email\" placeholder=\"Email\" #Email=\"ngModel\" [(ngModel)]=\"user.Email\" name=\"Email\" required>\n      </mat-form-field>\n      <mat-form-field class=\"full-width\">\n        <input matInput placeholder=\"Password\" type=\"password\" #Password=\"ngModel\" [(ngModel)]=\"user.Password\" name=\"Password\" required>\n      </mat-form-field>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-raised-button type=\"submit\" class=\"full-width\" color=\"primary\">REGISTER</button>\n  </mat-card-actions>\n  </form>\n  <mat-divider></mat-divider>\n  <mat-card-actions>\n    <button mat-button  color=\"primary\"><i class=\"material-icons md-dark\">book</i> Facebook</button>\n    <button mat-button  color=\"primary\"><i class=\"material-icons md-dark\">book</i> Google</button>\n  </mat-card-actions>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/event-user/register/register.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/event-user/register/register.component.ts ***!
  \***********************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _shared_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/user.model */ "./src/app/event-user/shared/user.model.ts");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/user.service */ "./src/app/event-user/shared/user.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(userservice, toastr) {
        this.userservice = userservice;
        this.toastr = toastr;
        this.user = new _shared_user_model__WEBPACK_IMPORTED_MODULE_0__["User"]();
        this.passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.resetForm();
    };
    RegisterComponent.prototype.resetForm = function (form) {
        if (form != null) {
            form.reset();
            this.user = {
                Email: '',
                FirstName: '',
                LastName: '',
                Mobile: '',
                Password: '',
                AdminToolBar: null,
                EventCard: null,
                LoggedIn: null
            };
        }
    };
    RegisterComponent.prototype.onRegister = function (form) {
        var _this = this;
        this.userservice.registerUser(form.value)
            .subscribe(function (data) {
            _this.resetForm(form);
            _this.toastr.success('User registration is successful');
        });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/event-user/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/event-user/register/register.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/event-user/settings/settings.component.css":
/*!************************************************************!*\
  !*** ./src/app/event-user/settings/settings.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/event-user/settings/settings.component.html":
/*!*************************************************************!*\
  !*** ./src/app/event-user/settings/settings.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  settings works!\n</p>\n"

/***/ }),

/***/ "./src/app/event-user/settings/settings.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/event-user/settings/settings.component.ts ***!
  \***********************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsComponent = /** @class */ (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    SettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/event-user/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.css */ "./src/app/event-user/settings/settings.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/event-user/shared/user.model.ts":
/*!*************************************************!*\
  !*** ./src/app/event-user/shared/user.model.ts ***!
  \*************************************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());



/***/ }),

/***/ "./src/app/event-user/shared/user.service.ts":
/*!***************************************************!*\
  !*** ./src/app/event-user/shared/user.service.ts ***!
  \***************************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.model */ "./src/app/event-user/shared/user.model.ts");
/* harmony import */ var _shared_services_rest_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared-services/rest.service */ "./src/app/shared-services/rest.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = /** @class */ (function () {
    function UserService(restService) {
        this.restService = restService;
        this.user = new _user_model__WEBPACK_IMPORTED_MODULE_1__["User"]();
    }
    UserService.prototype.setGuestProfile = function () {
        this.user.LoggedIn = false;
        this.user.FirstName = 'Guest';
        this.user.LastName = 'User';
        this.user.AdminToolBar = {
            'allowed': false,
            'newEvent': false,
            'reports': false,
            'manageUsers': false
        };
        this.user.EventCard = { 'allowed': true, 'edit': false, 'share': true, 'book': true };
    };
    UserService.prototype.registerUser = function (user) {
        var body = {
            email: user.Email,
            password: user.Password,
            first_name: user.FirstName,
            last_name: user.LastName
        };
        return this.restService.post('REGISTER_USER', true, null, body);
    };
    UserService.prototype.loginUser = function (user) {
        var body = {
            email: user.Email,
            password: user.Password
        };
        return this.restService.post('LOGIN_USER', true, null, body);
    };
    UserService.prototype.updateProfile = function () {
        var _this = this;
        this.setGuestProfile();
        if (localStorage.getItem('userToken') != null) {
            this.fetchProfile().subscribe(function (data) {
                _this.user.LoggedIn = true;
                _this.user.FirstName = 'Naveen';
                _this.user.LastName = 'B';
                _this.user.AdminToolBar = {
                    'allowed': true,
                    'newEvent': true,
                    'reports': true,
                    'manageUsers': true
                };
            });
        }
    };
    UserService.prototype.fetchProfile = function () {
        var params = {};
        return this.restService.get('FETCH_ROLE_PROFILE', false, null, params);
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_shared_services_rest_service__WEBPACK_IMPORTED_MODULE_2__["RestService"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/event-user/users/pick-user-role.html":
/*!******************************************************!*\
  !*** ./src/app/event-user/users/pick-user-role.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div mat-dialog-content>\n  <mat-form-field>\n    <mat-select placeholder=\"Select Role\" #RoleSelect=\"ngModel\" [(ngModel)]=\"data.user.Role\" name=\"RoleSelect\">\n      <mat-option *ngFor=\"let role of data.roles\" [value]=\"role.Id\">\n        {{ role.Name }}\n      </mat-option>\n    </mat-select>\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">CANCEL</button>\n  <button mat-button [mat-dialog-close]=\"'updated'\" cdkFocusInitial>UPDATE</button>\n</div>\n"

/***/ }),

/***/ "./src/app/event-user/users/roles/role/role.component.css":
/*!****************************************************************!*\
  !*** ./src/app/event-user/users/roles/role/role.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/event-user/users/roles/role/role.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/event-user/users/roles/role/role.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  role works!\n</p>\n"

/***/ }),

/***/ "./src/app/event-user/users/roles/role/role.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/event-user/users/roles/role/role.component.ts ***!
  \***************************************************************/
/*! exports provided: RoleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleComponent", function() { return RoleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RoleComponent = /** @class */ (function () {
    function RoleComponent() {
    }
    RoleComponent.prototype.ngOnInit = function () {
    };
    RoleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-role',
            template: __webpack_require__(/*! ./role.component.html */ "./src/app/event-user/users/roles/role/role.component.html"),
            styles: [__webpack_require__(/*! ./role.component.css */ "./src/app/event-user/users/roles/role/role.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], RoleComponent);
    return RoleComponent;
}());



/***/ }),

/***/ "./src/app/event-user/users/roles/roles.component.css":
/*!************************************************************!*\
  !*** ./src/app/event-user/users/roles/roles.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/event-user/users/roles/roles.component.html":
/*!*************************************************************!*\
  !*** ./src/app/event-user/users/roles/roles.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  roles works!\n</p>\n"

/***/ }),

/***/ "./src/app/event-user/users/roles/roles.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/event-user/users/roles/roles.component.ts ***!
  \***********************************************************/
/*! exports provided: RolesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesComponent", function() { return RolesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RolesComponent = /** @class */ (function () {
    function RolesComponent() {
    }
    RolesComponent.prototype.ngOnInit = function () {
    };
    RolesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-roles',
            template: __webpack_require__(/*! ./roles.component.html */ "./src/app/event-user/users/roles/roles.component.html"),
            styles: [__webpack_require__(/*! ./roles.component.css */ "./src/app/event-user/users/roles/roles.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], RolesComponent);
    return RolesComponent;
}());



/***/ }),

/***/ "./src/app/event-user/users/shared/manage-user.model.ts":
/*!**************************************************************!*\
  !*** ./src/app/event-user/users/shared/manage-user.model.ts ***!
  \**************************************************************/
/*! exports provided: ManageUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageUser", function() { return ManageUser; });
var ManageUser = /** @class */ (function () {
    function ManageUser(user_info) {
        this.import(user_info);
    }
    ManageUser.prototype.import = function (user_info) {
        if (user_info) {
            this.Id = user_info['id'];
            this.Name = user_info['first_name'] + ' ' + user_info['last_name'];
            this.Email = user_info['email'];
            this.Status = user_info['status'];
            this.Role = user_info['role'];
        }
    };
    ManageUser.prototype.export = function () {
        var res = {
            'id': this.Id,
            'role': this.Role,
            'status': this.Status
        };
        return res;
    };
    return ManageUser;
}());



/***/ }),

/***/ "./src/app/event-user/users/shared/manage-user.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/event-user/users/shared/manage-user.service.ts ***!
  \****************************************************************/
/*! exports provided: ManageUserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageUserService", function() { return ManageUserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_rest_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared-services/rest.service */ "./src/app/shared-services/rest.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ManageUserService = /** @class */ (function () {
    function ManageUserService(restService) {
        this.restService = restService;
    }
    ManageUserService.prototype.fetchUsers = function () {
        var params = {};
        return this.restService.get('GET_USERS', true, null, params);
    };
    ManageUserService.prototype.updateManageUser = function (manageUser) {
        var body = {};
        if (manageUser) {
            body = manageUser.export();
        }
        return this.restService.post('UPDATE_MANAGE_USER', true, null, body);
    };
    ManageUserService.prototype.upsertRole = function (role) {
        var body = {};
        if (role) {
            body = role.export();
        }
        return this.restService.post('UPSERT_ROLE', true, null, body);
    };
    ManageUserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_shared_services_rest_service__WEBPACK_IMPORTED_MODULE_1__["RestService"]])
    ], ManageUserService);
    return ManageUserService;
}());



/***/ }),

/***/ "./src/app/event-user/users/shared/role.model.ts":
/*!*******************************************************!*\
  !*** ./src/app/event-user/users/shared/role.model.ts ***!
  \*******************************************************/
/*! exports provided: Role */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return Role; });
var Role = /** @class */ (function () {
    function Role(role_info) {
        this.import(role_info);
    }
    Role.prototype.import = function (role_info) {
        if (role_info) {
            this.Id = role_info['id'];
            this.Name = role_info['display_name'];
            this.Permissions = role_info['permissions'];
            debugger;
        }
    };
    Role.prototype.export = function () {
        var res = {
            id: this.Id,
            name: this.Name,
            permissions: this.Permissions
        };
        return res;
    };
    return Role;
}());



/***/ }),

/***/ "./src/app/event-user/users/update-role-name.html":
/*!********************************************************!*\
  !*** ./src/app/event-user/users/update-role-name.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div mat-dialog-content>\n  <mat-form-field>\n    <input matInput placeholder=\"Name\" #Name=\"ngModel\" [(ngModel)]=\"data.role.Name\" name=\"Name\" required>\n  </mat-form-field>\n\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">CANCEL</button>\n  <button mat-button [mat-dialog-close]=\"'updated'\" cdkFocusInitial>UPDATE</button>\n</div>\n"

/***/ }),

/***/ "./src/app/event-user/users/user/user.component.css":
/*!**********************************************************!*\
  !*** ./src/app/event-user/users/user/user.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/event-user/users/user/user.component.html":
/*!***********************************************************!*\
  !*** ./src/app/event-user/users/user/user.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  user works!\n</p>\n"

/***/ }),

/***/ "./src/app/event-user/users/user/user.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/event-user/users/user/user.component.ts ***!
  \*********************************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserComponent = /** @class */ (function () {
    function UserComponent() {
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user',
            template: __webpack_require__(/*! ./user.component.html */ "./src/app/event-user/users/user/user.component.html"),
            styles: [__webpack_require__(/*! ./user.component.css */ "./src/app/event-user/users/user/user.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "./src/app/event-user/users/users.component.css":
/*!******************************************************!*\
  !*** ./src/app/event-user/users/users.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".table {\n  width: 100%;\n}\n"

/***/ }),

/***/ "./src/app/event-user/users/users.component.html":
/*!*******************************************************!*\
  !*** ./src/app/event-user/users/users.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group>\n  <mat-tab label=\"Users\">\n    <mat-paginator [length]=\"length\"\n                [pageSize]=\"pageSize\"\n                [pageSizeOptions]=\"pageSizeOptions\"\n                (page)=\"pageEvent = $event\">\n    </mat-paginator>\n    <mat-toolbar >\n      <mat-toolbar-row>\n      </mat-toolbar-row>\n    </mat-toolbar>\n\n    <mat-list>\n      <mat-list-item *ngFor=\"let user of users\">\n        <mat-icon matListIcon>person</mat-icon>\n        <h3 matLine> {{ user.Name }} </h3>\n        <p matLine>\n          <span> {{ user.Email }} </span>\n          <span class=\"demo-2\"> -- {{ user.Status }} </span>\n        </p>\n\n        <button matTooltip=\"Disable User\" mat-icon-button><mat-icon>block</mat-icon></button>\n        <button matTooltip=\"Update User Role\" (click)=\"selectRole(user)\" mat-icon-button><mat-icon>edit</mat-icon></button>\n        <mat-divider></mat-divider>\n      </mat-list-item>\n    </mat-list>\n\n  </mat-tab>\n  <mat-tab label=\"Roles\">\n    <mat-toolbar >\n      <mat-toolbar-row>\n        <button matTooltip=\"Go Back\" (click)=\"goto_role_view()\" mat-icon-button><mat-icon>accessibility</mat-icon></button>\n      </mat-toolbar-row>\n    </mat-toolbar>\n\n    <mat-list>\n      <mat-list-item *ngFor=\"let role of roles\">\n        <mat-icon matListIcon>accessibility</mat-icon>\n        <h3 matLine> {{ role.Name }} </h3>\n\n        <button matTooltip=\"Edit Permissions\" (click)=\"goto_permission_view(role)\" mat-icon-button><mat-icon>lock_open</mat-icon></button>\n        <button matTooltip=\"Update Role Name\" (click)=\"updateRoleName(role)\" mat-icon-button><mat-icon>edit</mat-icon></button>\n        <mat-divider></mat-divider>\n      </mat-list-item>\n    </mat-list>\n    <!--<mat-accordion *ngIf=\"update_permission_role != null && update_permission_role != undefined\">-->\n      <!--<mat-expansion-panel *ngFor=\"let pem of user_permission_role.Permissions\">-->\n        <!--<mat-expansion-panel-header>-->\n          <!--<mat-panel-title>-->\n            <!--{{ pem['display_name'] }}-->\n          <!--</mat-panel-title>-->\n          <!--<mat-panel-description>-->\n          <!--</mat-panel-description>-->\n        <!--</mat-expansion-panel-header>-->\n        <!--<mat-checkbox></mat-checkbox>-->\n\n        <!--<mat-accordion *ngIf=\"pem['childs']\">-->\n        <!--<mat-expansion-panel *ngFor=\"let cpem of pem['childs']\">-->\n          <!--<mat-expansion-panel-header>-->\n            <!--<mat-panel-title>-->\n              <!--{{ cpem['display_name'] }}-->\n            <!--</mat-panel-title>-->\n            <!--<mat-panel-description>-->\n            <!--</mat-panel-description>-->\n          <!--</mat-expansion-panel-header>-->\n          <!--<mat-checkbox></mat-checkbox>-->\n\n          <!--<mat-accordion *ngIf=\"cpem['childs']\">-->\n            <!--<mat-expansion-panel *ngFor=\"let gpem of cpem['childs']\">-->\n              <!--<mat-expansion-panel-header>-->\n                <!--<mat-panel-title>-->\n                  <!--{{ gpem['display_name'] }}-->\n                <!--</mat-panel-title>-->\n                <!--<mat-panel-description>-->\n                <!--</mat-panel-description>-->\n              <!--</mat-expansion-panel-header>-->\n              <!--<mat-checkbox></mat-checkbox>-->\n\n            <!--</mat-expansion-panel>-->\n          <!--</mat-accordion>-->\n\n        <!--</mat-expansion-panel>-->\n      <!--</mat-accordion>-->\n\n      <!--</mat-expansion-panel>-->\n    <!--</mat-accordion>-->\n  </mat-tab>\n</mat-tab-group>\n"

/***/ }),

/***/ "./src/app/event-user/users/users.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/event-user/users/users.component.ts ***!
  \*****************************************************/
/*! exports provided: UsersComponent, SelectRoleDialog, UpdateRoleName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectRoleDialog", function() { return SelectRoleDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateRoleName", function() { return UpdateRoleName; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_manage_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/manage-user.service */ "./src/app/event-user/users/shared/manage-user.service.ts");
/* harmony import */ var _shared_manage_user_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/manage-user.model */ "./src/app/event-user/users/shared/manage-user.model.ts");
/* harmony import */ var _shared_role_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/role.model */ "./src/app/event-user/users/shared/role.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var UsersComponent = /** @class */ (function () {
    function UsersComponent(dialog, manageUserService) {
        var _this = this;
        this.dialog = dialog;
        this.manageUserService = manageUserService;
        this.length = 100;
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 25];
        this.users = [];
        this.roles = [];
        this.update_permission_role = null;
        this.manageUserService.fetchUsers().subscribe(function (data) {
            if (data) {
                if (data['users']) {
                    for (var i = 0; i < data['users'].length; i++) {
                        var mu = new _shared_manage_user_model__WEBPACK_IMPORTED_MODULE_3__["ManageUser"](data['users'][i]);
                        _this.users.push(mu);
                    }
                }
                if (data['roles']) {
                    for (var i = 0; i < data['roles'].length; i++) {
                        var role = new _shared_role_model__WEBPACK_IMPORTED_MODULE_4__["Role"](data['roles'][i]);
                        _this.roles.push(role);
                    }
                }
            }
            console.log(_this.roles);
        });
    }
    UsersComponent.prototype.ngOnInit = function () {
    };
    UsersComponent.prototype.setPageSizeOptions = function (setPageSizeOptionsInput) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(function (str) { return +str; });
    };
    UsersComponent.prototype.selectRole = function (user) {
        var _this = this;
        var dialogRef = this.dialog.open(SelectRoleDialog, {
            width: '250px',
            data: { roles: this.roles, user: user }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == 'updated') {
                _this.manageUserService.updateManageUser(user).subscribe(function (data) {
                });
            }
        });
    };
    UsersComponent.prototype.updateRoleName = function (role) {
        var _this = this;
        var dialogRef = this.dialog.open(UpdateRoleName, {
            width: '600px',
            data: { role: role }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == 'updated') {
                _this.manageUserService.upsertRole(role).subscribe(function (data) {
                });
            }
        });
    };
    UsersComponent.prototype.goto_permission_view = function (role) {
        this.update_permission_role = role;
        debugger;
    };
    UsersComponent.prototype.goto_role_view = function () {
        this.update_permission_role = null;
    };
    UsersComponent.prototype.update_permission = function () {
    };
    UsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/event-user/users/users.component.html"),
            styles: [__webpack_require__(/*! ./users.component.css */ "./src/app/event-user/users/users.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _shared_manage_user_service__WEBPACK_IMPORTED_MODULE_2__["ManageUserService"]])
    ], UsersComponent);
    return UsersComponent;
}());

var SelectRoleDialog = /** @class */ (function () {
    function SelectRoleDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    SelectRoleDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SelectRoleDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'pick-user-role',
            template: __webpack_require__(/*! ./pick-user-role.html */ "./src/app/event-user/users/pick-user-role.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], SelectRoleDialog);
    return SelectRoleDialog;
}());

var UpdateRoleName = /** @class */ (function () {
    function UpdateRoleName(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    UpdateRoleName.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    UpdateRoleName = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'update-role-name',
            template: __webpack_require__(/*! ./update-role-name.html */ "./src/app/event-user/users/update-role-name.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], UpdateRoleName);
    return UpdateRoleName;
}());



/***/ }),

/***/ "./src/app/event-venues/event-venues.component.css":
/*!*********************************************************!*\
  !*** ./src/app/event-venues/event-venues.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-card {\n  max-width: 400px;\n}\n\n.example-header-image {\n  background-image: url('https://ibb.co/jNkMT8');\n  background-size: cover;\n}\n\n.event-venues-filter-toolbar\n{\n  margin-top : 20px;\n}\n\n.tollbar-splitter\n{\n  flex: 1 1 auto;\n}\n\nmat-form-field.mat-form-field {\n  font-size: 14px;\n}\n"

/***/ }),

/***/ "./src/app/event-venues/event-venues.component.html":
/*!**********************************************************!*\
  !*** ./src/app/event-venues/event-venues.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar class=\"event-venues-filter-toolbar\">\n  <mat-toolbar-row>\n    <mat-form-field primary>\n      <input matInput type=\"text\" placeholder=\"Search\">\n    </mat-form-field>\n    <span class=\"tollbar-splitter\"></span>\n    <button mat-button routerLink=\"event-venue\"><i class=\"material-icons md-dark\">playlist_add</i> New Event Venue</button>\n  </mat-toolbar-row>\n</mat-toolbar>\n<mat-divider></mat-divider>\n<mat-grid-list cols=\"3\" rowHeight=\"6:3\">\n  <mat-grid-tile *ngFor=\"let eventVenue of eventVenues\">\n    <mat-card class=\"example-card\">\n      <mat-card-header>\n        <mat-card-title>{{ eventVenue.Name }}</mat-card-title>\n      </mat-card-header>\n      <mat-card-content>\n        <p>\n          {{ eventVenue.Desc }}\n        </p>\n      </mat-card-content>\n      <mat-card-actions>\n        <button mat-button [routerLink]=\"['event-venue',{id: eventVenue.Id }]\">EDIT</button>\n      </mat-card-actions>\n    </mat-card>\n  </mat-grid-tile>\n</mat-grid-list>\n"

/***/ }),

/***/ "./src/app/event-venues/event-venues.component.ts":
/*!********************************************************!*\
  !*** ./src/app/event-venues/event-venues.component.ts ***!
  \********************************************************/
/*! exports provided: EventVenuesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventVenuesComponent", function() { return EventVenuesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_event_venue_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/event-venue.service */ "./src/app/event-venues/shared/event-venue.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventVenuesComponent = /** @class */ (function () {
    function EventVenuesComponent(eventVenueService) {
        this.eventVenueService = eventVenueService;
    }
    EventVenuesComponent.prototype.ngOnInit = function () {
        this.eventVenueService.loadEventVenues();
    };
    Object.defineProperty(EventVenuesComponent.prototype, "eventVenues", {
        get: function () {
            return this.eventVenueService.eventVenues;
        },
        enumerable: true,
        configurable: true
    });
    EventVenuesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-event-venues',
            template: __webpack_require__(/*! ./event-venues.component.html */ "./src/app/event-venues/event-venues.component.html"),
            styles: [__webpack_require__(/*! ./event-venues.component.css */ "./src/app/event-venues/event-venues.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_event_venue_service__WEBPACK_IMPORTED_MODULE_1__["EventVenueService"]])
    ], EventVenuesComponent);
    return EventVenuesComponent;
}());



/***/ }),

/***/ "./src/app/event-venues/new-event-venue/new-event-venue.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/event-venues/new-event-venue/new-event-venue.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".new-event-venue-card\n{\n   max-width: 30%;\n   margin: 100px auto;\n}\n\n.full-width\n{\n  width : 100%;\n}\n\n.new-event-venue-card-title\n{\n  flex: 1 1 auto;\n  text-align: center;\n}\n\n.example-card {\n  max-width: 250px;\n}\n\n.layout-create-toolbar\n{\n  margin-top : 20px;\n}\n\n.tollbar-splitter\n{\n  flex: 1 1 auto;\n}\n\n.layout-content\n{\n  align: center;\n}\n\ntable { margin: auto; }\n"

/***/ }),

/***/ "./src/app/event-venues/new-event-venue/new-event-venue.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/event-venues/new-event-venue/new-event-venue.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div  [style.display]=\"showOverlay\" class=\"overlay\">\n  <div class=\"indicator\">\n    <svg width=\"16px\" height=\"12px\">\n      <polyline id=\"back\" points=\"1 6 4 6 6 11 10 1 12 6 15 6\"></polyline>\n      <polyline id=\"front\" points=\"1 6 4 6 6 11 10 1 12 6 15 6\"></polyline>\n    </svg>\n  </div>\n</div>\n<mat-horizontal-stepper *ngIf=\"eventVenue != null\">\n  <mat-step label=\"Setup Event Venue\">\n    <form class=\"new-event-venue-form\" #eventVenueCreationForm=\"ngForm\">\n      <mat-card class=\"new-event-venue-card\">\n        <mat-card-content>\n            <mat-form-field class=\"full-width\">\n              <input matInput placeholder=\"Name\" #Name=\"ngModel\" [(ngModel)]=\"eventVenue.Name\" name=\"Name\" required>\n            </mat-form-field>\n            <mat-form-field class=\"full-width\">\n              <textarea matInput placeholder=\"Description\" #Desc=\"ngModel\" [(ngModel)]=\"eventVenue.Desc\" name=\"Description\" required></textarea>\n            </mat-form-field>\n          <mat-spinner [style.display]=\"showSpinner ? 'block' : 'none'\"></mat-spinner>\n        </mat-card-content>\n      </mat-card>\n      <div>\n        <button  mat-button type=\"submit\" (click)=\"upsertEventVenue()\">UPSERT</button>\n        <button  *ngIf=\"eventVenue.Id != null || eventVenue.Id != undefined\" mat-button matStepperNext >Next</button>\n      </div>\n    </form>\n  </mat-step>\n  <mat-step label=\"Set Layout\" *ngIf=\"eventVenue.Id != null\">\n    <mat-toolbar class=\"layout-create-toolbar\">\n      <mat-toolbar-row>\n        <form class=\"new-event-venue-form\" #addGroupForm=\"ngForm\" (ngSubmit)=\"addGroup(addGroupForm)\">\n          <input mat-input type=\"text\" #groupName=\"ngModel\" [(ngModel)]=\"addGroupFormData.group_name\" placeholder=\"Group Name\" name=\"groupName\" >\n          <input mat-input type=\"number\" #rows=\"ngModel\" [(ngModel)]=\"addGroupFormData.rows\" placeholder=\"Rows\" name=\"rows\" >\n          <input mat-input type=\"number\" #cols=\"ngModel\" [(ngModel)]=\"addGroupFormData.cols\" placeholder=\"Cols\" name=\"cols\" >\n          <span class=\"tollbar-splitter\"></span>\n          <button mat-button type=\"submit\" color=\"primary\" >Add Group</button>\n        </form>\n        <mat-form-field>\n            <mat-select  #LayoutType placeholder=\"Layout Type\" [(ngModel)]=\"eventVenue.eventVenueLayout.layout_type\" name=\"LayoutType\">\n              <mat-option value=\"none\">\n                NONE\n              </mat-option>\n              <mat-option value=\"box\">\n                BOX\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n      </mat-toolbar-row>\n    </mat-toolbar>\n    <mat-card  *ngIf=\"eventVenue.eventVenueLayout.layout_type == 'box'\" class=\"layout-card scrollable-content\">\n      <mat-card-content>\n        <table *ngFor=\"let group of layout_groups\">\n          <tr *ngFor=\"let row of group.rows\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>{{row.name}}</button>\n            </td>\n            <td *ngFor=\"let col of row.cols\" class=\"seat-col\">\n              <button *ngIf=\"col.type != 'active'\" [matTooltip]=\"col.number\" class=\"seat-button\" disabled  mat-icon-button><mat-icon [style.color]=\"eventVenueLayout.typeColors[col.type]\" aria-label=\"Event Seat\">{{ eventVenueLayout.typeIcons[col.type] }}</mat-icon></button>\n              <button *ngIf=\"col.type == 'active'\" [matTooltip]=\"'seat : '+col.number+' ,cost : '+eventVenueLayout.priceMap[col.price].value\" class=\"seat-button\" mat-icon-button><mat-icon [style.color]=\"eventVenueLayout.priceMap[col.price].color\" aria-label=\"Event Seat\">{{ eventVenueLayout.typeIcons[col.type] }}</mat-icon></button>\n            </td>\n          <tr>\n          <tr *ngIf=\"group != null && group.rows != null && group.rows[0] != null\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>.</button>\n            </td>\n            <td *ngFor=\"let col of group.rows[0].cols; let m = index\" class=\"seat-col\">\n              <button class=\"seat-button\" mat-icon-button>{{ m }}</button>\n            </td>\n          <tr>\n        </table>\n        <div class=\"screen-div\">SCREEN HERE</div>\n      </mat-card-content>\n    </mat-card>\n    <div *ngIf=\"eventVenue.eventVenueLayout.layout_type == 'box'\">\n      <button mat-button matStepperPrevious>Back</button>\n      <button mat-button matStepperNext>Next</button>\n    </div>\n    <div *ngIf=\"eventVenue.eventVenueLayout.layout_type == 'none'\">\n      <button mat-button matStepperPrevious>Back</button>\n      <button mat-button (click)=\"upsertLayout()\">UPSERT LAYOUT</button>\n    </div>\n  </mat-step>\n\n  <mat-step label=\"Mark Empty Space\" *ngIf=\"eventVenue.eventVenueLayout.layout_type == 'box' && eventVenue.Id != null\">\n    <mat-toolbar class=\"layout-create-toolbar\">\n      <mat-toolbar-row>\n        <form class=\"new-event-venue-form\" #markEmptyForm=\"ngForm\" (ngSubmit)=\"markEmpty(markEmptyForm)\">\n\n          <mat-form-field>\n            <mat-select placeholder=\"Select Group\" #GroupSelect=\"ngModel\" [(ngModel)]=\"markEmptyFormData.group_index\" name=\"GroupSelect\">\n              <mat-option *ngFor=\"let group of layout_groups;let i = index\" [value]=\"i\">\n                {{ group.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field *ngIf=\"markEmptyFormData.group_index != -1\">\n            <mat-select  #RowSelect placeholder=\"Select Row\" [(ngModel)]=\"markEmptyFormData.row_index\" name=\"RowSelect\">\n              <mat-option *ngFor=\"let row of layout_groups[markEmptyFormData.group_index].rows ;let j = index\" [value]=\"j\">\n                {{ row.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field *ngIf=\"markEmptyFormData.row_index != -1\">\n            <mat-select  #StartColSelect placeholder=\"Select Start Column\" [(ngModel)]=\"markEmptyFormData.start_col_index\" name=\"StartColSelect\">\n              <mat-option *ngFor=\"let col of layout_groups[markEmptyFormData.group_index].rows[markEmptyFormData.row_index].cols ;let k = index\" [value]=\"k\">\n                {{ k }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field *ngIf=\"markEmptyFormData.row_index != -1\">\n            <mat-select  #EndColSelect placeholder=\"Select End Column\" [(ngModel)]=\"markEmptyFormData.end_col_index\" name=\"EndColSelect\">\n              <mat-option *ngFor=\"let col of layout_groups[markEmptyFormData.group_index].rows[markEmptyFormData.row_index].cols;let l = index\" [value]=\"l\">\n                {{ l }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <span class=\"tollbar-splitter\"></span>\n          <button mat-button type=\"submit\" color=\"primary\" >Mark Empty</button>\n          <button mat-button >Reset Layout</button>\n        </form>\n      </mat-toolbar-row>\n    </mat-toolbar>\n    <mat-card class=\"layout-card scrollable-content\">\n      <mat-card-content>\n        <table *ngFor=\"let group of layout_groups\">\n          <tr *ngFor=\"let row of group.rows\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>{{row.name}}</button>\n            </td>\n            <td *ngFor=\"let col of row.cols\" class=\"seat-col\">\n              <button *ngIf=\"col.type != 'active'\" [matTooltip]=\"col.number\" class=\"seat-button\" disabled  mat-icon-button><mat-icon [style.color]=\"eventVenueLayout.typeColors[col.type]\" aria-label=\"Event Seat\">{{ eventVenueLayout.typeIcons[col.type] }}</mat-icon></button>\n              <button *ngIf=\"col.type == 'active'\" [matTooltip]=\"'seat : '+col.number+' ,cost : '+eventVenueLayout.priceMap[col.price].value\" class=\"seat-button\" mat-icon-button><mat-icon [style.color]=\"eventVenueLayout.priceMap[col.price].color\" aria-label=\"Event Seat\">{{ eventVenueLayout.typeIcons[col.type] }}</mat-icon></button>\n            </td>\n          <tr>\n          <tr *ngIf=\"group != null && group.rows != null && group.rows[0] != null\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>.</button>\n            </td>\n            <td *ngFor=\"let col of group.rows[0].cols; let m = index\" class=\"seat-col\">\n              <button class=\"seat-button\" mat-icon-button>{{ m }}</button>\n            </td>\n          <tr>\n        </table>\n        <div class=\"screen-div\">SCREEN HERE</div>\n      </mat-card-content>\n    </mat-card>\n    <div>\n      <button mat-button matStepperPrevious>Back</button>\n      <button mat-button matStepperNext>Next</button>\n    </div>\n  </mat-step>\n\n  <mat-step label=\"Set Path\" *ngIf=\"eventVenue.eventVenueLayout.layout_type == 'box' && eventVenue.Id != null\">\n    <mat-toolbar class=\"layout-create-toolbar\">\n      <mat-toolbar-row>\n        <form class=\"new-event-venue-form\" #addPathForm=\"ngForm\" (ngSubmit)=\"addPath(addPathForm)\">\n          <mat-form-field>\n            <mat-select placeholder=\"Select Group\" #GroupSelect=\"ngModel\" [(ngModel)]=\"addPathFormData.group_index\" name=\"GroupSelect\">\n              <mat-option *ngFor=\"let group of layout_groups;let i = index\" [value]=\"i\">\n                {{ group.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field *ngIf=\"addPathFormData.group_index != -1\">\n            <mat-select  #ColSelect placeholder=\"Select Col index\" [(ngModel)]=\"addPathFormData.col_index\" name=\"ColSelect\">\n              <mat-option *ngFor=\"let col of layout_groups[addPathFormData.group_index].rows[0].cols ;let j = index\" [value]=\"j\">\n                {{ j }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <span class=\"tollbar-splitter\"></span>\n          <button mat-button type=\"submit\" color=\"primary\" >Add Path</button>\n          <button mat-button >Reset Layout</button>\n        </form>\n      </mat-toolbar-row>\n    </mat-toolbar>\n    <mat-card class=\"layout-card scrollable-content\">\n      <mat-card-content>\n        <table *ngFor=\"let group of layout_groups\">\n          <tr *ngFor=\"let row of group.rows\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>{{row.name}}</button>\n            </td>\n            <td *ngFor=\"let col of row.cols\" class=\"seat-col\">\n              <button *ngIf=\"col.type != 'active'\" [matTooltip]=\"col.number\" class=\"seat-button\" disabled  mat-icon-button><mat-icon [style.color]=\"eventVenueLayout.typeColors[col.type]\" aria-label=\"Event Seat\">{{ eventVenueLayout.typeIcons[col.type] }}</mat-icon></button>\n              <button *ngIf=\"col.type == 'active'\" [matTooltip]=\"'seat : '+col.number+' ,cost : '+eventVenueLayout.priceMap[col.price].value\" class=\"seat-button\" mat-icon-button><mat-icon [style.color]=\"eventVenueLayout.priceMap[col.price].color\" aria-label=\"Event Seat\">{{ eventVenueLayout.typeIcons[col.type] }}</mat-icon></button>\n            </td>\n          <tr>\n          <tr *ngIf=\"group != null && group.rows != null && group.rows[0] != null\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>seat</button>\n            </td>\n            <td *ngFor=\"let col of group.rows[0].cols; let m = index\" class=\"seat-col\">\n              <button class=\"seat-button\" mat-icon-button>{{ m }}</button>\n            </td>\n          <tr>\n        </table>\n        <div class=\"screen-div\">SCREEN HERE</div>\n      </mat-card-content>\n    </mat-card>\n    <div>\n      <button mat-button matStepperPrevious>Back</button>\n      <button mat-button matStepperNext>Next</button>\n    </div>\n  </mat-step>\n\n  <mat-step label=\"Confirm Details\" *ngIf=\"eventVenue.eventVenueLayout.layout_type == 'box' && eventVenue.Id != null\">\n    <mat-card class=\"layout-card scrollable-content\">\n      <mat-card-content>\n        <table *ngFor=\"let group of layout_groups\" disabled>\n          <tr *ngFor=\"let row of group.rows\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>{{row.name}}</button>\n            </td>\n            <td *ngFor=\"let col of row.cols\" class=\"seat-col\">\n              <button *ngIf=\"col.type != 'active'\" [matTooltip]=\"col.number\" class=\"seat-button\" disabled  mat-icon-button><mat-icon [style.color]=\"eventVenueLayout.typeColors[col.type]\" aria-label=\"Event Seat\">{{ eventVenueLayout.typeIcons[col.type] }}</mat-icon></button>\n              <button *ngIf=\"col.type == 'active'\" [matTooltip]=\"'seat : '+col.number+' ,cost : '+eventVenueLayout.priceMap[col.price].value\" class=\"seat-button\" mat-icon-button><mat-icon [style.color]=\"eventVenueLayout.priceMap[col.price].color\" aria-label=\"Event Seat\">{{ eventVenueLayout.typeIcons[col.type] }}</mat-icon></button>\n            </td>\n          <tr>\n        </table>\n        <div class=\"screen-div\">SCREEN HERE</div>\n      </mat-card-content>\n    </mat-card>\n    <div>\n      <button mat-button (click)=\"upsertLayout()\">UPSERT LAYOUT</button>\n      <button mat-button matStepperPrevious>Back</button>\n    </div>\n  </mat-step>\n</mat-horizontal-stepper>\n"

/***/ }),

/***/ "./src/app/event-venues/new-event-venue/new-event-venue.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/event-venues/new-event-venue/new-event-venue.component.ts ***!
  \***************************************************************************/
/*! exports provided: NewEventVenueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewEventVenueComponent", function() { return NewEventVenueComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_event_venue_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/event-venue.model */ "./src/app/event-venues/shared/event-venue.model.ts");
/* harmony import */ var _shared_event_venue_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/event-venue.service */ "./src/app/event-venues/shared/event-venue.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NewEventVenueComponent = /** @class */ (function () {
    function NewEventVenueComponent(eventVenueService, router, dialog, route) {
        var _this = this;
        this.eventVenueService = eventVenueService;
        this.router = router;
        this.dialog = dialog;
        this.route = route;
        this.markEmptyControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]();
        this.addPathDialogData = {
            title: 'Update Path Tool',
            fields: [
                { field_type: 'text', name: 'Group Name', default_value: '', value: '' },
                { field_type: 'number', name: 'Column', default_value: 0, value: 0 }
            ]
        };
        this.markEmptyDialogData = {
            title: 'Mark Empty Tool',
            fields: [
                { field_type: 'text', name: 'Group Name', default_value: '', value: '' },
                { field_type: 'number', name: 'Row', default_value: 0, value: 0 },
                { field_type: 'number', name: 'Start Column', default_value: 1, value: 1 },
                { field_type: 'number', name: 'End Column', default_value: 1, value: 1 }
            ]
        };
        this.addNewGroupDialogData = {
            title: 'Create New Group',
            fields: [
                { field_type: 'text', name: 'Group Name', default_value: '', value: '' },
                { field_type: 'number', name: 'Rows', default_value: 0, value: 0 },
                { field_type: 'number', name: 'Columns', default_value: 0, value: 0 }
            ]
        };
        this.addGroupFormData = {
            group_name: '',
            rows: null,
            cols: null,
        };
        this.markEmptyFormData = {
            group_index: -1,
            row_index: -1,
            start_col_index: -1,
            end_col_index: -1,
        };
        this.addPathFormData = {
            group_index: -1,
            col_index: -1
        };
        this.showOverlay = 'block';
        this.route.params.subscribe(function (params) { return _this.setupEventVenue(params['id']); });
    }
    NewEventVenueComponent.prototype.setupEventVenue = function (id) {
        var _this = this;
        console.log(id);
        if (id != null && id != '' && id != "undefined") {
            this.mode = "edit";
            this.eventVenueService.getEventVenue(id)
                .subscribe(function (data) {
                var ev = data['event_venue'];
                ev["layout"] = data["layout"];
                _this.eventVenue = new _shared_event_venue_model__WEBPACK_IMPORTED_MODULE_1__["EventVenue"](ev, _this.mode);
                _this.eventVenueLayout = _this.eventVenue.eventVenueLayout;
                console.log(_this.eventVenue);
                _this.showOverlay = 'none';
            });
        }
        else {
            this.mode = "new";
            this.eventVenue = new _shared_event_venue_model__WEBPACK_IMPORTED_MODULE_1__["EventVenue"]({}, this.mode);
            this.eventVenueLayout = this.eventVenue.eventVenueLayout;
            this.showOverlay = 'none';
        }
    };
    NewEventVenueComponent.prototype.ngOnInit = function () {
        this.resetForm();
    };
    NewEventVenueComponent.prototype.resetForm = function (form) {
        if (form != null) {
            form.reset();
        }
    };
    NewEventVenueComponent.prototype.resetAddGroupForm = function (form) {
        if (form != null) {
            form.reset();
            this.addGroupFormData =
                {
                    group_name: null,
                    rows: null,
                    cols: null,
                };
        }
    };
    NewEventVenueComponent.prototype.resetMarkEmptyForm = function (form) {
        if (form != null) {
            form.reset();
            this.markEmptyFormData.group_index = -1;
            this.markEmptyFormData.row_index = -1;
            this.markEmptyFormData.start_col_index = -1;
            this.markEmptyFormData.end_col_index = -1;
        }
    };
    NewEventVenueComponent.prototype.resetAddPathForm = function (form) {
        if (form != null) {
            form.reset();
            this.addPathFormData.group_index = -1;
            this.addPathFormData.col_index = -1;
        }
    };
    NewEventVenueComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.eventVenueService.createEventVenue(this.eventVenue)
            .subscribe(function (data) {
            _this.resetForm(form);
            _this.router.navigate(['']);
        });
    };
    NewEventVenueComponent.prototype.addGroup = function (form) {
        console.log(this.addGroupFormData);
        var response = this.eventVenueLayout.addGroup(this.addGroupFormData);
        if (response.success) {
        }
        else {
            alert(response.message);
        }
        this.resetAddGroupForm(form);
    };
    NewEventVenueComponent.prototype.addPath = function (form) {
        console.log(this.addPathFormData);
        var response = this.eventVenueLayout.addPath(this.addPathFormData);
        if (response.success) {
        }
        else {
            alert(response.message);
        }
        this.resetAddPathForm(form);
    };
    NewEventVenueComponent.prototype.markEmpty = function (form) {
        console.log(this.addGroupFormData);
        var response = this.eventVenueLayout.markEmpty(this.markEmptyFormData);
        if (response.success) {
        }
        else {
            alert(response.message);
        }
        this.resetMarkEmptyForm(form);
    };
    NewEventVenueComponent.prototype.upsertEventVenue = function () {
        var _this = this;
        this.eventVenueService.upsertEventVenue(this.eventVenue)
            .subscribe(function (data) {
            _this.eventVenue.Id = data['id'];
        });
    };
    NewEventVenueComponent.prototype.upsertLayout = function () {
        var _this = this;
        this.eventVenueService.upsertVenueLayout(this.eventVenue)
            .subscribe(function (data) {
            _this.eventVenue.eventVenueLayout.Id = data['id'];
            _this.router.navigate(['']);
        });
    };
    Object.defineProperty(NewEventVenueComponent.prototype, "layout_groups", {
        get: function () {
            return this.eventVenueLayout.groups;
        },
        enumerable: true,
        configurable: true
    });
    NewEventVenueComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-new-event-venue',
            template: __webpack_require__(/*! ./new-event-venue.component.html */ "./src/app/event-venues/new-event-venue/new-event-venue.component.html"),
            styles: [__webpack_require__(/*! ./new-event-venue.component.css */ "./src/app/event-venues/new-event-venue/new-event-venue.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_event_venue_service__WEBPACK_IMPORTED_MODULE_2__["EventVenueService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], NewEventVenueComponent);
    return NewEventVenueComponent;
}());



/***/ }),

/***/ "./src/app/event-venues/shared/event-venue.model.ts":
/*!**********************************************************!*\
  !*** ./src/app/event-venues/shared/event-venue.model.ts ***!
  \**********************************************************/
/*! exports provided: EventVenue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventVenue", function() { return EventVenue; });
/* harmony import */ var _shared_event_venue_layout_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/event-venue-layout.model */ "./src/app/shared/event-venue-layout.model.ts");

var EventVenue = /** @class */ (function () {
    function EventVenue(eventVenueJsonObject, mode) {
        this.mode = mode;
        this.Id = eventVenueJsonObject["id"];
        this.Name = eventVenueJsonObject["name"];
        this.Desc = eventVenueJsonObject["desc"];
        this.eventVenueLayout = new _shared_event_venue_layout_model__WEBPACK_IMPORTED_MODULE_0__["EventVenueLayout"](eventVenueJsonObject["layout"], this.mode);
    }
    EventVenue.prototype.getCreateJSON = function () {
        var createJSON = {
            "name": this.Name,
            "desc": this.Desc
        };
        return createJSON;
    };
    EventVenue.prototype.getUpdateJSON = function () {
        var updateJSON = this.getCreateJSON();
        updateJSON["id"] = this.Id;
        return updateJSON;
    };
    return EventVenue;
}());



/***/ }),

/***/ "./src/app/event-venues/shared/event-venue.service.ts":
/*!************************************************************!*\
  !*** ./src/app/event-venues/shared/event-venue.service.ts ***!
  \************************************************************/
/*! exports provided: EventVenueService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventVenueService", function() { return EventVenueService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _event_venue_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-venue.model */ "./src/app/event-venues/shared/event-venue.model.ts");
/* harmony import */ var _shared_services_rest_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared-services/rest.service */ "./src/app/shared-services/rest.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EventVenueService = /** @class */ (function () {
    function EventVenueService(restService) {
        this.restService = restService;
        this.eventVenues = [];
    }
    EventVenueService.prototype.upsertEventVenue = function (upsertETObj) {
        if (upsertETObj.Id == null || upsertETObj.Id == '') {
            return this.createEventVenue(upsertETObj);
        }
        else {
            return this.updateEventVenue(upsertETObj);
        }
    };
    EventVenueService.prototype.getEventVenue = function (id) {
        var params = { id: id };
        return this.restService.get('GET_EVENT_VENUE', true, null, params);
    };
    EventVenueService.prototype.createEventVenue = function (createETObj) {
        var createJSON = createETObj.getCreateJSON();
        return this.restService.post('CREATE_EVENT_VENUE', true, null, createJSON);
    };
    EventVenueService.prototype.updateEventVenue = function (updateETObj) {
        var updateJSON = updateETObj.getUpdateJSON();
        return this.restService.post('UPDATE_EVENT_VENUE', true, null, updateJSON);
    };
    EventVenueService.prototype.upsertVenueLayout = function (eventVenue) {
        var upsertJSON = eventVenue.eventVenueLayout.export();
        upsertJSON['object_id'] = eventVenue.Id;
        upsertJSON['model'] = 'eventvenue';
        upsertJSON['app_label'] = 'events';
        return this.restService.post('UPSERT_LAYOUT', true, null, upsertJSON);
    };
    EventVenueService.prototype.loadEventVenues = function () {
        var _this = this;
        this.eventVenues = [];
        this.fetchEventVenues().subscribe(function (data) {
            _this.syncUIEventVenues(data);
        });
    };
    EventVenueService.prototype.fetchEventVenues = function () {
        var params = {};
        return this.restService.get('GET_EVENT_VENUES', true, null, params);
    };
    EventVenueService.prototype.syncUIEventVenues = function (data) {
        console.log('sync data ::');
        console.log(data);
        var EventVenueList = JSON.parse(data);
        var mode = 'list';
        for (var i = 0; i < EventVenueList.length; i++) {
            var eventVenue = this.makeEventVenueObject(EventVenueList[i], mode);
            this.eventVenues.push(eventVenue);
        }
        console.log(this.eventVenues);
    };
    EventVenueService.prototype.makeEventVenueObject = function (data, mode) {
        var id = data["pk"];
        var EventVenueJsonObject = data["fields"];
        EventVenueJsonObject["id"] = id;
        var eventVenue = new _event_venue_model__WEBPACK_IMPORTED_MODULE_1__["EventVenue"](EventVenueJsonObject, mode);
        return eventVenue;
    };
    EventVenueService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_shared_services_rest_service__WEBPACK_IMPORTED_MODULE_2__["RestService"]])
    ], EventVenueService);
    return EventVenueService;
}());



/***/ }),

/***/ "./src/app/events/events.component.css":
/*!*********************************************!*\
  !*** ./src/app/events/events.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".event-card {\n  max-width: 350px;\n  max-height: 300px;\n  border-radius: 8px;\n  background: #F2F2F2;\n}\n\n.events-filter-toolbar\n{\n  max-width: 80%;\n  position: relative;\n  margin: auto;\n  top:30px;\n\tbottom: 30px;\n\tleft: 0;\n\tright: 0;\n\tborder-radius: 14px;\n}\n\n.spacer{\n  height: 30px;\n}\n\nmat-card-tile{\n  min-width: 250px;\n  min-height: 400px;\n}\n\n.events-container\n{\n  width: 80%;\n  position: relative;\n  margin: auto;\n  top:15px;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n}\n\n.card-image\n{\n  margin-bottom: 0px;\n  max-height: 150px;\n}\n\n.toolbar-splitter\n{\n  flex: 1 1 auto;\n}\n\n.event_name_location{\n  width: 70%;\n\tfloat: left;\n\tpadding: 8px 0px 10px 0px;\n\n}\n\n@media only screen and (max-width: 1105px) {\n   .event_name_location{\n   \twidth: 70%;\n   }\n}\n\n@media only screen and (max-width: 1020px) {\n  .event_name_location{\n   \twidth: 70%;\n   }\n}\n\n@media only screen and (max-width: 685px) {\n  .event_name_location{\n   \twidth: 60%;\n   }\n}\n\n@media only screen and (max-width: 560px) {\n  .event_name_location{\n   \twidth: 60%;\n   }\n}\n\n.event_date_month{\n\tpadding: 8px 0px 0px 25px;\n\twidth: 20%;\n\tfloat: left;\n}\n\n.event_date_month{\n\ttext-transform: uppercase;\n\tposition: relative;\n}\n\n.event_month{\n\tcolor: #E08284;\n}\n\n.event_date_month p{\n\tmargin: 0px;\n\tfont-size: 10px\n}\n\np.event_date{\n\tfont-size: 16px;\n\tfont-weight: 500;\n}\n\np.event_name{\n  margin-top: 0px;\n}\n\n.event_date_month:after{\n\tposition: absolute;\n    content: '';\n    height: 1px;\n    width: 52px;\n    -webkit-transform: rotate(90deg);\n            transform: rotate(90deg);\n    top: 33px;\n    right: -5px;\n\tbackground: #f1f1f1;\n}\n\na.event_location{\n\tfont-size: 12px;\n\tcolor: #999;\n\ttext-decoration: none\n}\n\na.event_location:hover{\n\ttext-decoration: underline;\n}\n\n.event_price{\n\tfont-size: 10px;\n\tcolor: #999;\n}\n\n.date_name_location{\n\tposition: relative;\n}\n\n.date_name_location:after{\n    position: absolute;\n    content: '';\n    width: 100%;\n    height: 1px;\n    background: #F1F1F2;\n    bottom: -120px;\n    left: 0px;\n}\n"

/***/ }),

/***/ "./src/app/events/events.component.html":
/*!**********************************************!*\
  !*** ./src/app/events/events.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar class=\"events-filter-toolbar\">\n  <mat-toolbar-row>\n    <mat-form-field class=\"half-width\">\n    <input type=\"text\"  placeholder=\"Search Events\" aria-label=\"Number\" matInput [formControl]=\"myControl\" [matAutocomplete]=\"auto\">\n    <mat-autocomplete #auto=\"matAutocomplete\">\n      <mat-option *ngFor=\"let option of options\" [value]=\"option\">\n        {{ option }}\n      </mat-option>\n    </mat-autocomplete>\n    </mat-form-field>\n\n    <span class=\"tollbar-splitter\"></span>\n    <mat-form-field>\n      <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\">\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n      <mat-datepicker touchUi #picker></mat-datepicker>\n    </mat-form-field>\n  </mat-toolbar-row>\n</mat-toolbar>\n\n<div class=\"spacer\"></div>\n<div class=\"events-container\">\n<mat-grid-list [cols]=\"cols | async\" gutterSize=\"15px\" >\n  <mat-grid-tile *ngFor=\"let event of events\">\n    <mat-card class=\"event-card\">\n      <img mat-card-image class=\"card-image\" [src]=\"event.images['banner'].url\" onerror=\"this.src='https://algovent-s3-static.s3.amazonaws.com/eventico/media/event_bWDUlrT.jpg'\" alt=\"Photo of a Shiba Inu\">\n    <mat-card-content>\n        <div class=\"date_name_location\">\n          <div class=\"event_date_month\">\n            <p class=\"event_month\">{{event['times']['start']['month']}}</p>\n            <p class=\"event_date\">{{event['times']['start']['day_num']}}</p>\n            <p class=\"event_day\">{{event['times']['start']['day']}}</p>\n          </div>\n          <div class=\"event_name_location\">\n            <p class=\"event_name\">{{event.Name}}</p>\n            <a href=\"#\" class=\"event_location\">Phoenix Market City: Whitefield</a>\n            <p class=\"event_price\" >Rs. 999 Onwards</p>\n          </div>\n        </div>\n      </mat-card-content>\n      <mat-card-actions>\n        <button mat-button [routerLink]=\"['bookings/booking',{event_id: event.Id}]\" color=\"#cc3333cc\" >Book</button>\n        <span class=\"toolbar-splitter\"></span>\n        <button mat-icon-button routerLink=\"\"><mat-icon aria-label=\"Settings\">share</mat-icon></button>\n        <button mat-icon-button [routerLink]=\"['events/event',{id: event.Id }]\"><mat-icon aria-label=\"Edit\">edit</mat-icon></button>\n      </mat-card-actions>\n    </mat-card>\n  </mat-grid-tile>\n</mat-grid-list>\n</div>\n"

/***/ }),

/***/ "./src/app/events/events.component.ts":
/*!********************************************!*\
  !*** ./src/app/events/events.component.ts ***!
  \********************************************/
/*! exports provided: EventsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsComponent", function() { return EventsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_event_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/event.service */ "./src/app/events/shared/event.service.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_takeWhile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/operator/takeWhile */ "./node_modules/rxjs-compat/_esm5/add/operator/takeWhile.js");
/* harmony import */ var rxjs_add_operator_startWith__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/add/operator/startWith */ "./node_modules/rxjs-compat/_esm5/add/operator/startWith.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EventsComponent = /** @class */ (function () {
    function EventsComponent(eventService, observableMedia) {
        this.eventService = eventService;
        this.observableMedia = observableMedia;
        this.myControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.options = [
            'One',
            'Two',
            'Three'
        ];
    }
    EventsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventService.loadEvents();
        var grid = new Map([
            ["xs", 1],
            ["sm", 2],
            ["md", 2],
            ["lg", 3],
            ["xl", 3]
        ]);
        var start;
        grid.forEach(function (cols, mqAlias) {
            if (_this.observableMedia.isActive(mqAlias)) {
                start = cols;
            }
        });
        this.cols = this.observableMedia.asObservable()
            .map(function (change) {
            console.log(change);
            console.log(grid.get(change.mqAlias));
            return grid.get(change.mqAlias);
        })
            .startWith(start);
    };
    Object.defineProperty(EventsComponent.prototype, "events", {
        get: function () {
            return this.eventService.events;
        },
        enumerable: true,
        configurable: true
    });
    EventsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-events',
            template: __webpack_require__(/*! ./events.component.html */ "./src/app/events/events.component.html"),
            styles: [__webpack_require__(/*! ./events.component.css */ "./src/app/events/events.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_event_service__WEBPACK_IMPORTED_MODULE_2__["EventService"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["ObservableMedia"]])
    ], EventsComponent);
    return EventsComponent;
}());



/***/ }),

/***/ "./src/app/events/new-event/new-event.component.css":
/*!**********************************************************!*\
  !*** ./src/app/events/new-event/new-event.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".new-event-card\n{\n   max-width: 30%;\n   margin: 100px auto;\n}\n\n@media only screen and (max-width: 1105px) {\n   .new-event-card\n    {\n       max-width: 40%;\n       margin: 100px auto;\n    }\n}\n\n@media only screen and (max-width: 1020px) {\n  .new-event-card\n  {\n     max-width: 50%;\n     margin: 100px auto;\n  }\n}\n\n@media only screen and (max-width: 685px) {\n  .new-event-card\n  {\n     max-width: 70%;\n     margin: 100px auto;\n  }\n}\n\n@media only screen and (max-width: 560px) {\n  .event_name_location{\n   \twidth: 100%;\n   }\n}\n\n.full-width\n{\n  width : 100%;\n}\n\n.half-width\n{\n  width : 50%;\n}\n\n.fr5-width\n{\n  width : 40%;\n}\n\n.forty-width\n{\n  width : 40%;\n}\n\n.thirty-width\n{\n  width : 30%;\n}\n\n.twenty-width\n{\n  width : 20%;\n}\n\n.ten-width\n{\n  width : 10%;\n}\n\n.fivepx-margin-right\n{\n  margin-right: 5px;\n}\n\n.new-event-card-title\n{\n  flex: 1 1 auto;\n  text-align: center;\n}\n\n.layout-content\n{\n  align: center;\n}\n\ntable { margin: auto; }\n\n.pricing_color_icon\n{\n  cursor: pointer;\n}\n"

/***/ }),

/***/ "./src/app/events/new-event/new-event.component.html":
/*!***********************************************************!*\
  !*** ./src/app/events/new-event/new-event.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"indicator\" [style.disply]=\"showOverlay\">\n  <svg width=\"16px\" height=\"12px\">\n    <polyline id=\"back\" points=\"1 6 4 6 6 11 10 1 12 6 15 6\"></polyline>\n    <polyline id=\"front\" points=\"1 6 4 6 6 11 10 1 12 6 15 6\"></polyline>\n  </svg>\n</div>\n<mat-horizontal-stepper>\n  <mat-step label=\"Setup Event Info\">\n    <mat-card class=\"new-event-card\">\n      <mat-card-title ><i class=\"material-icons\">today</i></mat-card-title>\n      <form class=\"new-event-form\" #eventCreationForm=\"ngForm\" >\n      <mat-card-content>\n          <mat-form-field class=\"full-width\">\n            <input matInput placeholder=\"Name\" #Name=\"ngModel\" [(ngModel)]=\"event.Name\" name=\"Name\" required>\n          </mat-form-field>\n          <mat-form-field class=\"forty-width fivepx-margin-right\">\n            <input matInput [min]=\"minDate\" [matDatepicker]=\"startdate\" placeholder=\"Start Date\" [(value)] = \"event.times['start']['date']\" disabled required>\n            <mat-datepicker-toggle matSuffix [for]=\"startdate\"></mat-datepicker-toggle>\n            <mat-datepicker disabled=\"false\" touchUi=\"true\" #startdate></mat-datepicker>\n          </mat-form-field>\n          <mat-form-field class=\"ten-width fivepx-margin-right\">\n            <mat-select placeholder=\"HH\" [value]=\"event['times']['start']['hh']\" name=\"shh\" required>\n              <mat-option *ngFor=\"let i of [1,2,3,4,5,6,7,8,9,10,11,12]\" [value]=\"i\">{{i}}</mat-option>\n            </mat-select>\n          </mat-form-field>\n          <mat-form-field class=\"ten-width fivepx-margin-right\">\n            <mat-select placeholder=\"MM\" [value]=\"event['times']['start']['mm']\" name=\"smm\" required>\n              <mat-option *ngFor=\"let i of [0,1,2,3,4,5,6,7,8,9,10,11,12]\" [value]=\"i * 5\">{{i*5}}</mat-option>\n            </mat-select>\n          </mat-form-field>\n          <mat-form-field class=\"ten-width fivepx-margin-right\">\n            <mat-select placeholder=\"\" [value]=\"event['times']['end']['period']\" name=\"sAMPM\">\n              <mat-option selected value=\"AM\">AM</mat-option>\n              <mat-option selected value=\"PM\">PM</mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field class=\"forty-width fivepx-margin-right\">\n            <input matInput [min]=\"event['times']['start']['date']\" [matDatepicker]=\"enddate\" placeholder=\"End Date\" [(value)] = \"event['times']['end']['date']\" required disabled>\n            <mat-datepicker-toggle matSuffix [for]=\"enddate\"></mat-datepicker-toggle>\n            <mat-datepicker disabled=\"false\" touchUi=\"true\" #enddate></mat-datepicker>\n          </mat-form-field>\n          <mat-form-field class=\"ten-width fivepx-margin-right\">\n            <mat-select placeholder=\"HH\" [(value)]=\"event['times']['end']['hh']\" name=\"ehh\" required>\n              <mat-option *ngFor=\"let i of [1,2,3,4,5,6,7,8,9,10,11,12]\" [value]=\"i\">{{i}}</mat-option>\n            </mat-select>\n          </mat-form-field>\n          <mat-form-field class=\"ten-width fivepx-margin-right\">\n            <mat-select placeholder=\"MM\" [(value)]=\"event['times']['end']['mm']\" name=\"emm\" required>\n              <mat-option *ngFor=\"let i of [0,1,2,3,4,5,6,7,8,9,10,11,12]\" [value]=\"i * 5\">{{i*5}}</mat-option>\n            </mat-select>\n          </mat-form-field>\n          <mat-form-field class=\"ten-width fivepx-margin-right\">\n            <mat-select placeholder=\"\" [(value)]=\"event['times']['end']['period']\" name=\"eAMPM\" required>\n              <mat-option selected value=\"AM\">AM</mat-option>\n              <mat-option selected value=\"PM\">PM</mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field class=\"full-width\">\n            <input matInput type=\"number\" placeholder=\"Default Price\" #Name=\"ngModel\" [(ngModel)]=\"defaultPrice['value']\" name=\"DefaultPrice\" required>\n          </mat-form-field>\n          <mat-form-field class=\"full-width\">\n            <input matInput type=\"text\" placeholder=\"Default Price Label\" #Name=\"ngModel\" [(ngModel)]=\"defaultPrice['label']\" name=\"DefaultPriceLabel\" required>\n          </mat-form-field>\n          <mat-form-field class=\"full-width\">\n            <input matInput type=\"text\" placeholder=\"Default Price Description\" #Name=\"ngModel\" [(ngModel)]=\"defaultPrice['desc']\" name=\"DefaultPriceDesc\" required>\n          </mat-form-field>\n            <mat-form-field class=\"full-width\">\n            <textarea matInput placeholder=\"Description\" #Desc=\"ngModel\" [(ngModel)]=\"event.Desc\" name=\"Description\" required></textarea>\n          </mat-form-field>\n          <mat-form-field class=\"half-width\">\n          <mat-select  placeholder=\"Select EventType\" [(value)]=\"event.EventTypeId\"  name=\"EventType\">\n              <mat-option *ngFor=\"let eventType of eventTypes\" value=\"{{eventType.Id}}\">{{eventType.Name}}</mat-option>\n            </mat-select>\n          </mat-form-field>\n          <mat-form-field class=\"half-width\">\n            <mat-select placeholder=\"Select Event venue\" [(value)]=\"event.EventVenueId\"  name=\"EventVenue\" >\n              <mat-option *ngFor=\"let eventVenue of eventVenues\" value=\"{{eventVenue.Id}}\" >{{eventVenue.Name}}</mat-option>\n            </mat-select>\n          </mat-form-field>\n      </mat-card-content>\n      </form>\n    </mat-card>\n    <div>\n      <button  mat-button type=\"submit\" (click)=\"upsertEvent()\">UPSERT</button>\n      <button  *ngIf=\"event['Id'] != null && event['Id'] != undefined\" mat-button matStepperNext >NEXT</button>\n    </div>\n  </mat-step>\n\n  <mat-step label=\"Setup Banners\" *ngIf=\"event.Id != null\">\n    <mat-card>\n      <mat-card-content>\n        <img [src]=\"this.event.images['banner'].url\" onerror=\"this.src='https://algovent-s3-static.s3.amazonaws.com/eventico/media/default_bannger.jpg'\">\n      </mat-card-content>\n      <mat-divider></mat-divider>\n      <mat-card-actions>\n        <input type=\"file\"   (change)=\"handleFileInput($event.target.files)\">\n        <button mat-button  *ngIf=\"this.event.images['banner'].url != ''\" color=\"warning\"> REMOVE</button>\n      </mat-card-actions>\n    </mat-card>\n  <div>\n    <button  mat-button matStepperPrevious>BACK</button>\n    <button  mat-button matStepperNext >NEXT</button>\n  </div>\n  </mat-step>\n\n  <mat-step label=\"Mark Unavailability\" *ngIf=\"event.LayoutType == 'box' && event.Id != null\">\n    <mat-toolbar class=\"layout-create-toolbar\">\n      <mat-toolbar-row>\n        <form class=\"new-event-form\" #markNAForm=\"ngForm\" (ngSubmit)=\"markNA(markNAForm)\">\n\n          <mat-form-field>\n            <mat-select placeholder=\"Select Group\" #GroupSelect=\"ngModel\" [(ngModel)]=\"markNAFormData.group_index\" name=\"GroupSelect\">\n              <mat-option *ngFor=\"let group of layout_groups;let i = index\" [value]=\"i\">\n                {{ group.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field *ngIf=\"markNAFormData.group_index != -1\">\n            <mat-select  #RowSelect placeholder=\"Select Row\" [(ngModel)]=\"markNAFormData.row_index\" name=\"RowSelect\">\n              <mat-option *ngFor=\"let row of layout_groups[markNAFormData.group_index].rows ;let j = index\" [value]=\"j\">\n                {{ row.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field *ngIf=\"markNAFormData.row_index != -1\">\n            <mat-select  #StartColSelect placeholder=\"Select Start Column\" [(ngModel)]=\"markNAFormData.start_col_index\" name=\"StartColSelect\">\n              <mat-option *ngFor=\"let col of layout_groups[markNAFormData.group_index].rows[markNAFormData.row_index].cols ;let k = index\" [value]=\"k\">\n                {{ k }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field *ngIf=\"markNAFormData.row_index != -1\">\n            <mat-select  #EndColSelect placeholder=\"Select End Column\" [(ngModel)]=\"markNAFormData.end_col_index\" name=\"EndColSelect\">\n              <mat-option *ngFor=\"let col of layout_groups[markNAFormData.group_index].rows[markNAFormData.row_index].cols;let l = index\" [value]=\"l\">\n                {{ l }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n          <button mat-button type=\"submit\" color=\"primary\" >Mark N/A</button>\n        </form>\n        <span class=\"tollbar-splitter\"></span>\n\n        <button  mat-button [(colorPicker)]=\"eventLayout.typeColors.path\" [cpPosition]=\"'left'\">Path Color</button>\n        <button  mat-button [(colorPicker)]=\"eventLayout.typeColors.na\" [cpPosition]=\"'left'\">N/A Color</button>\n\n      </mat-toolbar-row>\n    </mat-toolbar>\n    <mat-card class=\"layout-card scrollable-content\">\n      <mat-card-content>\n        <table *ngFor=\"let group of layout_groups\">\n          <mat-divider></mat-divider>\n          <tr *ngFor=\"let row of group.rows\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>{{row.name}}</button>\n            </td>\n            <td *ngFor=\"let col of row.cols\" class=\"seat-col\">\n              <button [matTooltip]=\"col.number\" class=\"seat-button\" [disabled]=\"eventLayout.typeActionDisabled[col.type]\"  mat-icon-button><mat-icon [style.color]=\"eventLayout.typeColors[col.type]\" aria-label=\"Event Seat\">{{ eventLayout.typeIcons[col.type] }}</mat-icon></button>\n            </td>\n          <tr>\n          <tr *ngIf=\"group != null && group.rows != null && group.rows[0] != null\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>{{ group.name }}</button>\n            </td>\n            <td *ngFor=\"let col of group.rows[0].cols; let m = index\" class=\"seat-col\">\n              <button class=\"seat-button\" mat-icon-button>{{ m }}</button>\n            </td>\n          <tr>\n        </table>\n        <div class=\"screen-div\">SCREEN HERE</div>\n      </mat-card-content>\n    </mat-card>\n    <div>\n      <button mat-button matStepperPrevious>Back</button>\n      <button mat-button matStepperNext>Next</button>\n    </div>\n  </mat-step>\n\n  <mat-step label=\"Setup Pricing\" *ngIf=\"event.Id != null\">\n    <mat-toolbar class=\"layout-create-toolbar\">\n      <mat-toolbar-row>\n        <form class=\"new-event-form\" #addPricingForm=\"ngForm\" (ngSubmit)=\"addPricing(addPricingForm)\">\n\n          <mat-form-field primary>\n            <input matInput  type=\"text\" placeholder=\"Label\" #Label=\"ngModel\" [(ngModel)]=\"addPricingFormData.label\" name=\"Label\" >\n          </mat-form-field>\n          <mat-form-field primary>\n            <input matInput type=\"number\" placeholder=\"Value\" #Value=\"ngModel\" [(ngModel)]=\"addPricingFormData.value\" name=\"Value\" >\n          </mat-form-field>\n          <mat-form-field primary>\n            <input matInput type=\"text\" placeholder=\"Description\" #Desc=\"ngModel\" [(ngModel)]=\"addPricingFormData.desc\" name=\"Desc\" >\n          </mat-form-field>\n          <button mat-button type=\"submit\" color=\"primary\" >Add</button>\n        </form>\n        <span class=\"tollbar-splitter\"></span>\n\n      </mat-toolbar-row>\n    </mat-toolbar>\n\n    <mat-list>\n      <mat-list-item *ngFor=\"let price of eventLayout.priceList\">\n        <mat-icon class=\"pricing_color_icon\" matListIcon [(colorPicker)]=\"price.color\" [style.color]=\"price.color\">event_seat</mat-icon>\n        <h3 matLine> {{ price.label }} </h3>\n        <p matLine>\n          <span> {{ price.value }} </span>\n          <span class=\"demo-2\"> -- {{ price.desc }} </span>\n        </p>\n\n        <button *ngIf=\"price.name != 'default'\" mat-icon-button><mat-icon>delete</mat-icon></button>\n      </mat-list-item>\n    </mat-list>\n    <div>\n      <button mat-button matStepperPrevious>Back</button>\n      <button mat-button matStepperNext>Next</button>\n    </div>\n  </mat-step>\n\n  <mat-step label=\"Mark Pricing\" *ngIf=\"eventLayout.layout_type == 'box' && event.Id != null\">\n    <mat-toolbar class=\"layout-create-toolbar\">\n      <mat-toolbar-row>\n        <form class=\"new-event-form\" #markPricingForm=\"ngForm\" (ngSubmit)=\"markPricing(markPricingForm)\">\n\n          <mat-form-field>\n            <mat-select placeholder=\"Select Price\" #GroupSelect=\"ngModel\" [(ngModel)]=\"markPricingFormData.price_index\" name=\"PriceSelect\">\n              <mat-option *ngFor=\"let price of eventLayout.priceList;let i = index\" [value]=\"i\">\n                {{ price['label'] }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field>\n            <mat-select placeholder=\"Select Group\" #GroupSelect=\"ngModel\" [(ngModel)]=\"markPricingFormData.group_index\" name=\"GroupSelect\">\n              <mat-option *ngFor=\"let group of layout_groups;let i = index\" [value]=\"i\">\n                {{ group.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field *ngIf=\"markPricingFormData.group_index != -1\">\n            <mat-select  #RowSelect placeholder=\"Select Row\" [(ngModel)]=\"markPricingFormData.row_index\" name=\"RowSelect\">\n              <mat-option *ngFor=\"let row of layout_groups[markPricingFormData.group_index].rows ;let j = index\" [value]=\"j\">\n                {{ row.name }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field *ngIf=\"markPricingFormData.row_index != -1\">\n            <mat-select  #StartColSelect placeholder=\"Select Start Column\" [(ngModel)]=\"markPricingFormData.start_col_index\" name=\"StartColSelect\">\n              <mat-option *ngFor=\"let col of layout_groups[markPricingFormData.group_index].rows[markPricingFormData.row_index].cols ;let k = index\" [value]=\"k\">\n                {{ k }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <mat-form-field *ngIf=\"markPricingFormData.row_index != -1\">\n            <mat-select  #EndColSelect placeholder=\"Select End Column\" [(ngModel)]=\"markPricingFormData.end_col_index\" name=\"EndColSelect\">\n              <mat-option *ngFor=\"let col of layout_groups[markPricingFormData.group_index].rows[markPricingFormData.row_index].cols;let l = index\" [value]=\"l\">\n                {{ l }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n          <button mat-button type=\"submit\" color=\"primary\" >Mark Pricing</button>\n        </form>\n        <span class=\"tollbar-splitter\"></span>\n      </mat-toolbar-row>\n    </mat-toolbar>\n    <mat-card class=\"layout-card scrollable-content\">\n      <mat-card-content>\n        <table *ngFor=\"let group of layout_groups\">\n          <mat-divider></mat-divider>\n          <tr *ngFor=\"let row of group.rows\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>{{row.name}}</button>\n            </td>\n            <td *ngFor=\"let col of row.cols\" class=\"seat-col\">\n              <button *ngIf=\"col.type != 'active'\" [matTooltip]=\"col.number\" class=\"seat-button\" disabled  mat-icon-button><mat-icon [style.color]=\"eventLayout.typeColors[col.type]\" aria-label=\"Event Seat\">{{ eventLayout.typeIcons[col.type] }}</mat-icon></button>\n              <button *ngIf=\"col.type == 'active'\" [matTooltip]=\"'seat : '+col.number+' ,cost : '+eventLayout.priceMap[col.price].value\" class=\"seat-button\" mat-icon-button><mat-icon [style.color]=\"eventLayout.priceMap[col.price].color\" aria-label=\"Event Seat\">{{ eventLayout.typeIcons[col.type] }}</mat-icon></button>\n            </td>\n          <tr>\n          <tr *ngIf=\"group != null && group.rows != null && group.rows[0] != null\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>{{ group.name }}</button>\n            </td>\n            <td *ngFor=\"let col of group.rows[0].cols; let m = index\" class=\"seat-col\">\n              <button class=\"seat-button\" mat-icon-button>{{ m }}</button>\n            </td>\n          <tr>\n        </table>\n        <div class=\"screen-div\">SCREEN HERE</div>\n      </mat-card-content>\n    </mat-card>\n    <div>\n      <button mat-button matStepperPrevious>Back</button>\n      <button mat-button matStepperNext>Next</button>\n    </div>\n  </mat-step>\n\n  <mat-step label=\"Confirm Details\" *ngIf=\"event.Id != null\">\n    <mat-card class=\"layout-card scrollable-content\">\n      <mat-card-content>\n        <table *ngFor=\"let group of layout_groups\" disabled>\n          <tr *ngFor=\"let row of group.rows\">\n            <td class=\"row-name-col\">\n              <button class=\"seat-button\" mat-icon-button>{{row.name}}</button>\n            </td>\n            <td *ngFor=\"let col of row.cols\" class=\"seat-col\">\n              <button *ngIf=\"col.type != 'active'\" [matTooltip]=\"col.number\" class=\"seat-button\" disabled  mat-icon-button><mat-icon [style.color]=\"eventLayout.typeColors[col.type]\" aria-label=\"Event Seat\">{{ eventLayout.typeIcons[col.type] }}</mat-icon></button>\n              <button *ngIf=\"col.type == 'active'\" [matTooltip]=\"'seat : '+col.number+' ,cost : '+eventLayout.priceMap[col.price].value\" class=\"seat-button\" mat-icon-button><mat-icon [style.color]=\"eventLayout.priceMap[col.price].color\" aria-label=\"Event Seat\">{{ eventLayout.typeIcons[col.type] }}</mat-icon></button>\n            </td>\n          <tr>\n        </table>\n        <div class=\"screen-div\">SCREEN HERE</div>\n      </mat-card-content>\n    </mat-card>\n    <div>\n      <button mat-button (click)=\"upsertLayout()\">UPSERT LAYOUT</button>\n      <button mat-button matStepperPrevious>Back</button>\n    </div>\n  </mat-step>\n</mat-horizontal-stepper>\n"

/***/ }),

/***/ "./src/app/events/new-event/new-event.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/events/new-event/new-event.component.ts ***!
  \*********************************************************/
/*! exports provided: NewEventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewEventComponent", function() { return NewEventComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_event_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/event.model */ "./src/app/events/shared/event.model.ts");
/* harmony import */ var _event_types_shared_event_type_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../event-types/shared/event-type.service */ "./src/app/event-types/shared/event-type.service.ts");
/* harmony import */ var _event_venues_shared_event_venue_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../event-venues/shared/event-venue.service */ "./src/app/event-venues/shared/event-venue.service.ts");
/* harmony import */ var _shared_event_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/event.service */ "./src/app/events/shared/event.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_file_manager_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared-services/file-manager.service */ "./src/app/shared-services/file-manager.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var NewEventComponent = /** @class */ (function () {
    function NewEventComponent(eventService, router, eventTypeService, eventVenueService, route, fileManager) {
        var _this = this;
        this.eventService = eventService;
        this.router = router;
        this.eventTypeService = eventTypeService;
        this.eventVenueService = eventVenueService;
        this.route = route;
        this.fileManager = fileManager;
        this.banner = null;
        this.markNAFormData = {
            group_index: -1,
            row_index: -1,
            start_col_index: -1,
            end_col_index: -1,
        };
        this.markPricingFormData = {
            group_index: -1,
            row_index: -1,
            start_col_index: -1,
            end_col_index: -1,
            price_index: -1,
        };
        this.addPricingFormData = {
            label: "",
            value: "",
            desc: ""
        };
        this.color = '#ffffff';
        this.mode = "new";
        this.showOverlay = 'none';
        this.enddatetime = true;
        this.route.params.subscribe(function (params) { return _this.setupEvent(params['id']); });
        this.minDate = new Date();
    }
    NewEventComponent.prototype.ngOnInit = function () {
        this.resetForm();
    };
    NewEventComponent.prototype.handleFileInput = function (files) {
        console.log('file uploaded');
        this.banner = files.item(0);
        this.showOverlay = 'block';
        this.updateEventBanner();
    };
    NewEventComponent.prototype.updateEventBanner = function () {
        var _this = this;
        if (this.event.Id != null && this.event.Id != undefined) {
            var options = {
                objectId: this.event.Id,
                model: 'event',
                app_label: 'events',
                file_type: 'event_banner',
            };
            this.fileManager.upload(this.banner, options).subscribe(function (data) {
                console.log(data);
                _this.event.images['banner'].url = data["upload"];
                _this.showOverlay = 'none';
            }, function (error) {
                console.log(error);
            });
        }
        else {
            alert('please create event before uloading the banner');
        }
    };
    NewEventComponent.prototype.setupEvent = function (id) {
        var _this = this;
        this.eventTypeService.loadEventTypes();
        this.eventVenueService.loadEventVenues();
        this.mode = "new";
        this.event = new _shared_event_model__WEBPACK_IMPORTED_MODULE_1__["Event"]({}, this.mode);
        this.eventLayout = this.event.eventLayout;
        this.defaultPrice = this.eventLayout.getDefaultPrice();
        if (id != null && id != '' && id != "undefined") {
            this.mode = "update";
            this.eventService.getEvent(id)
                .subscribe(function (data) {
                _this.mode = 'edit';
                _this.eventService.updateEventInfo(data, _this.event);
                _this.showOverlay = 'none';
                console.log(_this.event);
            });
        }
        else {
            this.showOverlay = 'none';
        }
    };
    NewEventComponent.prototype.upsertEvent = function () {
        var _this = this;
        if (this.event == null) {
            alert('Invalid Event');
        }
        else if (this.event.Name == null || this.event.Name == undefined || this.event.Name == '') {
            alert('Event name cannot be empty');
        }
        else if (this.defaultPrice['value'] == null || this.defaultPrice['value'] == undefined || this.defaultPrice['value'] <= 0) {
            alert('default price of the event must greater than 0');
        }
        else if (this.defaultPrice['label'] == null || this.defaultPrice['label'] == undefined || this.defaultPrice['label'] == '') {
            alert('Label of the default price cannot be empty');
        }
        else if (this.event.Desc == null || this.event.Desc == undefined || this.event.Desc == '') {
            alert('Event description cannot be empty');
        }
        else if (this.event.EventTypeId == null || this.event.EventTypeId == undefined) {
            alert('Event type cannot be empty');
        }
        else if (this.event.EventVenueId == null || this.event.EventVenueId == undefined) {
            alert('Event Venue cannot be empty');
        }
        this.eventService.upsertEvent(this.event)
            .subscribe(function (data) {
            var event_info = data['event'];
            event_info['layout'] = data['layout'];
            _this.event.mode = 'edit';
            _this.event.import(event_info);
        });
    };
    NewEventComponent.prototype.upsertLayout = function () {
        var _this = this;
        this.eventService.upsertEventLayout(this.event)
            .subscribe(function (data) {
            _this.router.navigate(['']);
        });
    };
    //  updateVenueDetails()
    //  {
    //    if(this.event.EventVenueId != null)
    //    {
    //      this.showOverlay = 'block';
    //      this.eventVenueService.getEventVenue(this.event.EventVenueId)
    //      .subscribe( (data) => {
    //        var obj = JSON.parse(data.toString());
    //        var eventVenue = this.eventVenueService.makeEventVenueObject(obj[0]);
    //        this.eventLayout.import(eventVenue.eventVenueLayout.export());
    //        this.event.LayoutType = eventVenue.eventVenueLayout.layout_type;
    //        this.showOverlay = 'none';
    //        console.log(this.eventLayout);
    //      }
    //      );
    //    }
    //  }
    NewEventComponent.prototype.markNA = function (form) {
        console.log(this.markNAFormData);
        var response = this.eventLayout.markUnavailable(this.markNAFormData);
        if (response.success) {
        }
        else {
            alert(response.message);
        }
        this.resetMarkNAForm(form);
    };
    NewEventComponent.prototype.resetMarkNAForm = function (form) {
        if (form != null) {
            form.reset();
            this.markNAFormData.group_index = -1;
            this.markNAFormData.row_index = -1;
            this.markNAFormData.start_col_index = -1;
            this.markNAFormData.end_col_index = -1;
        }
    };
    NewEventComponent.prototype.addPricing = function (form) {
        console.log(this.addPricingFormData);
        var response = this.eventLayout.addPricing(this.addPricingFormData);
        if (response.success) {
        }
        else {
            alert(response.message);
        }
        this.resetAddPricingForm(form);
    };
    NewEventComponent.prototype.resetAddPricingForm = function (form) {
        if (form != null) {
            form.reset();
            this.addPricingFormData.value = "";
            this.addPricingFormData.desc = "";
            this.addPricingFormData.label = "";
        }
    };
    NewEventComponent.prototype.markPricing = function (form) {
        console.log(this.markPricingFormData);
        var response = this.eventLayout.markPricing(this.markPricingFormData);
        if (response.success) {
        }
        else {
            alert(response.message);
        }
        this.resetMarkPricingForm(form);
    };
    NewEventComponent.prototype.resetMarkPricingForm = function (form) {
        if (form != null) {
            form.reset();
            this.markPricingFormData.group_index = -1;
            this.markPricingFormData.row_index = -1;
            this.markPricingFormData.start_col_index = -1;
            this.markPricingFormData.end_col_index = -1;
            this.markPricingFormData.price_index = -1;
        }
    };
    NewEventComponent.prototype.resetForm = function (form) {
        if (form != null) {
            form.reset();
            this.event = new _shared_event_model__WEBPACK_IMPORTED_MODULE_1__["Event"]({}, 'new');
        }
    };
    Object.defineProperty(NewEventComponent.prototype, "eventTypes", {
        get: function () {
            return this.eventTypeService.eventTypes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewEventComponent.prototype, "eventVenues", {
        get: function () {
            return this.eventVenueService.eventVenues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewEventComponent.prototype, "layout_groups", {
        get: function () {
            return this.eventLayout.groups;
        },
        enumerable: true,
        configurable: true
    });
    NewEventComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-new-event',
            template: __webpack_require__(/*! ./new-event.component.html */ "./src/app/events/new-event/new-event.component.html"),
            styles: [__webpack_require__(/*! ./new-event.component.css */ "./src/app/events/new-event/new-event.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_event_service__WEBPACK_IMPORTED_MODULE_4__["EventService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _event_types_shared_event_type_service__WEBPACK_IMPORTED_MODULE_2__["EventTypeService"], _event_venues_shared_event_venue_service__WEBPACK_IMPORTED_MODULE_3__["EventVenueService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], _shared_services_file_manager_service__WEBPACK_IMPORTED_MODULE_6__["FileManagerService"]])
    ], NewEventComponent);
    return NewEventComponent;
}());



/***/ }),

/***/ "./src/app/events/shared/event.model.ts":
/*!**********************************************!*\
  !*** ./src/app/events/shared/event.model.ts ***!
  \**********************************************/
/*! exports provided: Event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony import */ var _shared_event_layout_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/event-layout.model */ "./src/app/shared/event-layout.model.ts");

var Event = /** @class */ (function () {
    function Event(eventJsonObject, mode) {
        this.times = {
            start: {
                date: new Date(),
                hh: 1,
                mm: 0,
                period: 'am',
                month: 'MTH',
                day: 'DAY',
                day_num: 'DAY NUM'
            },
            end: {
                date: new Date(),
                hh: 1,
                mm: 15,
                period: 'am'
            }
        };
        this.images = {
            banner: { url: '', id: '' },
            mini_banner: { url: '', id: '' },
            thumb_nail: { url: '', id: '' },
        };
        this.mode = mode;
        this.import(eventJsonObject);
    }
    Event.prototype.import = function (eventJsonObject) {
        this.Name = eventJsonObject["name"];
        this.Desc = eventJsonObject["desc"];
        if (this.mode == 'new') {
            this.times['start']['date'] = new Date();
            this.times['end']['date'] = new Date();
            this.eventLayout = new _shared_event_layout_model__WEBPACK_IMPORTED_MODULE_0__["EventLayout"](eventJsonObject["layout"], this.mode);
        }
        else if (this.mode == 'edit') {
            this.eventLayout.mode = 'edit';
            this.Id = eventJsonObject["id"];
            this.times = eventJsonObject['times'];
            this.eventLayout.import(eventJsonObject["layout"]);
            this.EventTypeId = eventJsonObject["event_type"].toString();
            this.EventVenueId = eventJsonObject["event_venue"].toString();
            if (eventJsonObject['images'] && eventJsonObject['images'].length > 0) {
                this.images['banner']['url'] = eventJsonObject['images'][0]['upload'];
                this.images['banner']['id'] = eventJsonObject['images'][0]['id'];
            }
        }
        else if (this.mode == 'list') {
            this.Id = eventJsonObject["id"];
            this.times = eventJsonObject['times'];
            if (eventJsonObject['images'] && eventJsonObject['images'].length > 0) {
                this.images['banner']['url'] = eventJsonObject['images'][0]['upload'];
                this.images['banner']['id'] = eventJsonObject['images'][0]['id'];
                //        "https://graph.facebook.com?id="++"&scrape=true")
            }
        }
    };
    Event.prototype.export = function () {
        var exportJSON = {
            "id": this.Id,
            "name": this.Name,
            "desc": this.Desc,
            "layout_type": this.LayoutType,
            "event_type": this.EventTypeId,
            "event_venue": this.EventVenueId,
            "times": this.times,
            "default_price": this.eventLayout.getDefaultPrice(),
        };
        return exportJSON;
    };
    Event.prototype.import_images = function (imageJSON) {
        if (imageJSON != null) {
            for (var key in imageJSON) {
                if (this.images[key]) {
                    this.images[key].url = imageJSON[key].url;
                    this.images[key].id = imageJSON[key].id;
                }
            }
        }
    };
    Event.prototype.export_images = function () {
        return this.images;
    };
    return Event;
}());



/***/ }),

/***/ "./src/app/events/shared/event.service.ts":
/*!************************************************!*\
  !*** ./src/app/events/shared/event.service.ts ***!
  \************************************************/
/*! exports provided: EventService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventService", function() { return EventService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _event_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event.model */ "./src/app/events/shared/event.model.ts");
/* harmony import */ var _shared_services_rest_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared-services/rest.service */ "./src/app/shared-services/rest.service.ts");
/* harmony import */ var _shared_services_datetime_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared-services/datetime.service */ "./src/app/shared-services/datetime.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EventService = /** @class */ (function () {
    function EventService(restService, dtService) {
        this.restService = restService;
        this.dtService = dtService;
        this.events = [];
    }
    EventService.prototype.upsertEvent = function (upsertEventObj) {
        var upsertJSON = upsertEventObj.export();
        return this.restService.post('UPSERT_EVENT', true, null, upsertJSON);
    };
    EventService.prototype.updateEventLayout = function (event) {
        //event.eventlayout;
    };
    EventService.prototype.getEvent = function (id) {
        var params = { 'id': id };
        return this.restService.get('GET_EVENT', true, null, params);
    };
    EventService.prototype.loadEvents = function () {
        var _this = this;
        this.events = [];
        this.fetchEvents().subscribe(function (data) {
            _this.syncUIEvents(data);
        });
    };
    EventService.prototype.fetchEvents = function () {
        var params = {};
        return this.restService.get('GET_EVENTS', true, null, params);
    };
    EventService.prototype.syncUIEvents = function (data) {
        console.log('sync data ::');
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var event = new _event_model__WEBPACK_IMPORTED_MODULE_1__["Event"](data[i], 'list');
            this.events.push(event);
        }
        console.log(this.events);
    };
    EventService.prototype.updateEventInfo = function (data, event) {
        event.mode = 'edit';
        var event_info = data['event'];
        event_info['layout'] = data['layout'];
        event.import(event_info);
    };
    EventService.prototype.upsertEventLayout = function (event) {
        var upsertJSON = event.eventLayout.export();
        upsertJSON['object_id'] = event.Id;
        upsertJSON['model'] = 'event';
        upsertJSON['app_label'] = 'events';
        return this.restService.post('UPSERT_LAYOUT', true, null, upsertJSON);
    };
    EventService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_shared_services_rest_service__WEBPACK_IMPORTED_MODULE_2__["RestService"], _shared_services_datetime_service__WEBPACK_IMPORTED_MODULE_3__["DatetimeService"]])
    ], EventService);
    return EventService;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spacer {\n    flex: 1 1 auto;\n}\n\n.footer\n{\n  width: 100%;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--<mat-toolbar class=\"footer\" color='primary'>-->\n  <!--<span class='spacer'></span>-->\n    <!--<h3>© Copyright Eventico Pvt Ltd 2018.</h3>-->\n  <!--<span class='spacer'></span>-->\n<!--</mat-toolbar>-->\n"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".toolbar-splitter\n{\n  flex: 1 1 auto;\n}\n\n.logo\n{\n  max-width: 200px;\n}\n\n.header\n{\n  left: 0;\n  right: 0;\n}\n\n.admin-tollbar-spacer\n{\n  flex: 1 1 auto;\n}\n\n.addon-tools {\n  display: display;\n}\n\n@media only screen and (max-width: 700px) {\n    .responsive_span_text {\n        display: none;\n    }\n    .addon-tools {\n      display: display;\n    }\n    .big-screen {\n      display: none;\n    }\n\n}\n\n"

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar class=\"header navbar-static-top\" [style.background-color]=\"'#e5e5e8'\">\n  <mat-toolbar-row >\n    <a href=\"\" routerLink=\"\"><img class=\"logo\" src=\"https://algovent-s3-static.s3.amazonaws.com/eventico/media/TOTT_Logo_New.png\" alt=\"talk-of-the-town\"></a>\n\n    <span class=\"tollbar-splitter\"></span>\n    <button *ngIf=\"loggedIn == false\" mat-button routerLink=\"login\" [style.color]=\"'#000'\">LOGIN</button>\n    <div *ngIf=\"loggedIn\">\n    <mat-menu #notifications=\"matMenu\" yPosition=\"below\" xPosition=\"before\">\n      <button mat-menu-item><mat-icon [style.color]=\"'#000'\">history</mat-icon>bookings</button>\n      <button mat-menu-item><mat-icon [style.color]=\"'#000'\">settings</mat-icon>settings</button>\n      <button mat-menu-item (click)=\"logout()\"><mat-icon [style.color]=\"'#000'\">exit_to_app</mat-icon>logout</button>\n    </mat-menu>\n    <button mat-icon-button [matMenuTriggerFor]=\"notifications\" *ngIf=\"loggedIn\">\n      <mat-icon [style.color]=\"'#000'\">person</mat-icon>\n    </button>\n    </div>\n\n\n  </mat-toolbar-row>\n</mat-toolbar>\n<mat-toolbar *ngIf=\"adminToolBar['allowed'] == true\" class=\"admin-toolbar\">\n  <i class=\"material-icons md-dark\">supervisor_account</i>\n  <button mat-button routerLink=\"events/event\"><mat-icon aria-label=\"Settings\">playlist_add</mat-icon> <span class=\"responsive_span_text\">New Event</span> </button>\n  <button mat-button routerLink=\"event-types\"><mat-icon aria-label=\"Settings\">table_chart</mat-icon> <span class=\"responsive_span_text\">Event Types</span> </button>\n  <button mat-button routerLink=\"event-venues\"><mat-icon aria-label=\"Settings\">movie_creation</mat-icon> <span class=\"responsive_span_text\">Event Venues</span></button>\n  <span class=\"admin-tollbar-spacer\"></span>\n  <mat-menu #addon_tools=\"matMenu\" class=\"addon-tools\" yPosition=\"below\" xPosition=\"before\">\n    <button mat-menu-item routerLink=\"users\"><mat-icon aria-label=\"Settings\">find_replace</mat-icon> User Management</button>\n    <button mat-menu-item routerLink=\"\"><mat-icon aria-label=\"Settings\">cloud_download</mat-icon> Reports</button>\n  </mat-menu>\n\n  <button class=\"addon-tools\" mat-icon-button [matMenuTriggerFor]=\"addon_tools\">\n    <mat-icon>more_vert</mat-icon>\n  </button>\n</mat-toolbar>\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _event_user_shared_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event-user/shared/user.service */ "./src/app/event-user/shared/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, userservice) {
        this.router = router;
        this.userservice = userservice;
        this.imageUrlArray = ['https://s3.ap-south-1.amazonaws.com/algoventimagestore/TOTT_Logo_New.png'];
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.userservice.updateProfile();
    };
    HeaderComponent.prototype.logout = function () {
        localStorage.removeItem('userToken');
        this.userservice.updateProfile();
        this.router.navigate(['']);
    };
    Object.defineProperty(HeaderComponent.prototype, "adminToolBar", {
        get: function () {
            return this.userservice.user.AdminToolBar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "loggedIn", {
        get: function () {
            return this.userservice.user.LoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _event_user_shared_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/material.module.ts":
/*!************************************!*\
  !*** ./src/app/material.module.ts ***!
  \************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
            ],
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/routes.ts":
/*!***************************!*\
  !*** ./src/app/routes.ts ***!
  \***************************/
/*! exports provided: appRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutes", function() { return appRoutes; });
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth/auth.guard */ "./src/app/auth/auth.guard.ts");
/* harmony import */ var _auth_antiauth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/antiauth.guard */ "./src/app/auth/antiauth.guard.ts");
/* harmony import */ var _event_user_register_register_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-user/register/register.component */ "./src/app/event-user/register/register.component.ts");
/* harmony import */ var _event_user_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event-user/login/login.component */ "./src/app/event-user/login/login.component.ts");
/* harmony import */ var _event_user_users_users_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./event-user/users/users.component */ "./src/app/event-user/users/users.component.ts");
/* harmony import */ var _event_user_users_user_user_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./event-user/users/user/user.component */ "./src/app/event-user/users/user/user.component.ts");
/* harmony import */ var _event_user_users_roles_roles_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./event-user/users/roles/roles.component */ "./src/app/event-user/users/roles/roles.component.ts");
/* harmony import */ var _event_user_users_roles_role_role_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./event-user/users/roles/role/role.component */ "./src/app/event-user/users/roles/role/role.component.ts");
/* harmony import */ var _events_events_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events/events.component */ "./src/app/events/events.component.ts");
/* harmony import */ var _events_new_event_new_event_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./events/new-event/new-event.component */ "./src/app/events/new-event/new-event.component.ts");
/* harmony import */ var _event_types_event_types_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./event-types/event-types.component */ "./src/app/event-types/event-types.component.ts");
/* harmony import */ var _event_types_new_event_type_new_event_type_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./event-types/new-event-type/new-event-type.component */ "./src/app/event-types/new-event-type/new-event-type.component.ts");
/* harmony import */ var _event_venues_event_venues_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./event-venues/event-venues.component */ "./src/app/event-venues/event-venues.component.ts");
/* harmony import */ var _event_venues_new_event_venue_new_event_venue_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./event-venues/new-event-venue/new-event-venue.component */ "./src/app/event-venues/new-event-venue/new-event-venue.component.ts");
/* harmony import */ var _bookings_bookings_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./bookings/bookings.component */ "./src/app/bookings/bookings.component.ts");
/* harmony import */ var _bookings_booking_booking_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./bookings/booking/booking.component */ "./src/app/bookings/booking/booking.component.ts");
















var appRoutes = [
    { path: '', component: _events_events_component__WEBPACK_IMPORTED_MODULE_8__["EventsComponent"], pathMatch: 'full' },
    { path: 'signup', component: _event_user_register_register_component__WEBPACK_IMPORTED_MODULE_2__["RegisterComponent"], canActivate: [_auth_antiauth_guard__WEBPACK_IMPORTED_MODULE_1__["AntiauthGuard"]] },
    { path: 'login', component: _event_user_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"], canActivate: [_auth_antiauth_guard__WEBPACK_IMPORTED_MODULE_1__["AntiauthGuard"]] },
    { path: 'users', component: _event_user_users_users_component__WEBPACK_IMPORTED_MODULE_4__["UsersComponent"] },
    { path: 'user', component: _event_user_users_user_user_component__WEBPACK_IMPORTED_MODULE_5__["UserComponent"] },
    { path: 'roles', component: _event_user_users_roles_roles_component__WEBPACK_IMPORTED_MODULE_6__["RolesComponent"] },
    { path: 'role', component: _event_user_users_roles_role_role_component__WEBPACK_IMPORTED_MODULE_7__["RoleComponent"] },
    { path: 'events/event', component: _events_new_event_new_event_component__WEBPACK_IMPORTED_MODULE_9__["NewEventComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__["AuthGuard"]] },
    { path: 'event-types', component: _event_types_event_types_component__WEBPACK_IMPORTED_MODULE_10__["EventTypesComponent"] },
    { path: 'event-types/event-type', component: _event_types_new_event_type_new_event_type_component__WEBPACK_IMPORTED_MODULE_11__["NewEventTypeComponent"] },
    { path: 'event-venues', component: _event_venues_event_venues_component__WEBPACK_IMPORTED_MODULE_12__["EventVenuesComponent"] },
    { path: 'event-venues/event-venue', component: _event_venues_new_event_venue_new_event_venue_component__WEBPACK_IMPORTED_MODULE_13__["NewEventVenueComponent"] },
    { path: 'bookings', component: _bookings_bookings_component__WEBPACK_IMPORTED_MODULE_14__["BookingsComponent"] },
    { path: 'bookings/booking', component: _bookings_booking_booking_component__WEBPACK_IMPORTED_MODULE_15__["BookingComponent"] },
    { path: '**', component: _events_events_component__WEBPACK_IMPORTED_MODULE_8__["EventsComponent"] }
];


/***/ }),

/***/ "./src/app/shared-services/api-factory.service.ts":
/*!********************************************************!*\
  !*** ./src/app/shared-services/api-factory.service.ts ***!
  \********************************************************/
/*! exports provided: ApiFactoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiFactoryService", function() { return ApiFactoryService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ApiFactoryService = /** @class */ (function () {
    function ApiFactoryService() {
        this.rootUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].api;
        this.api_map = new Map();
        this.load_apis();
    }
    ApiFactoryService.prototype.load_apis = function () {
        //event user services
        this.api_map.set('LOGIN_USER', '/users/api-token-auth/');
        this.api_map.set('REGISTER_USER', '/users/create/');
        this.api_map.set('FETCH_ROLE_PROFILE', '/users/profile');
        //file manager services
        this.api_map.set('UPLOAD_FILE', '/file/upload/');
        this.api_map.set('DELETE_FILE', '/file/delete/');
        //event services
        this.api_map.set('CREATE_EVENT', '/event/create/');
        this.api_map.set('UPSERT_EVENT', '/event/upsert/');
        this.api_map.set('DELETE_EVENT', '/event/delete/');
        this.api_map.set('GET_EVENT', '/event/');
        this.api_map.set('GET_EVENTS', '/events/');
        //event venue services
        this.api_map.set('CREATE_EVENT_VENUE', '/eventvenue/create/');
        this.api_map.set('UPDATE_EVENT_VENUE', '/eventvenue/update/');
        this.api_map.set('DELETE_EVENT_VENUE', '/eventvenue/delete/');
        this.api_map.set('GET_EVENT_VENUE', '/eventvenue/');
        this.api_map.set('GET_EVENT_VENUES', '/eventvenues/');
        //event type services
        this.api_map.set('CREATE_EVENT_TYPE', '/eventtype/create/');
        this.api_map.set('UPDATE_EVENT_TYPE', '/eventtype/update/');
        this.api_map.set('DELETE_EVENT_TYPE', '/eventtype/delete/');
        this.api_map.set('GET_EVENT_TYPE', '/eventtype/');
        this.api_map.set('GET_EVENT_TYPES', '/eventtypes/');
        //layout
        this.api_map.set('UPSERT_LAYOUT', '/layout/upsert/');
        //booking service
        this.api_map.set('SKIP_AND_BOOK', '/bookings/skip-and-book/');
        //manage users apis
        this.api_map.set('GET_USERS', '/users/fetch-users/');
        this.api_map.set('UPDATE_MANAGE_USER', '/users/update-manage-user/');
        this.api_map.set('UPSERT_ROLE', '/ecore/upsert-role/');
    };
    ApiFactoryService.prototype.getApi = function (api_name) {
        var api = this.api_map.get(api_name);
        if (api == null) {
            api = '';
        }
        else {
            api = this.rootUrl + this.api_map.get(api_name);
        }
        return api;
    };
    ApiFactoryService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], ApiFactoryService);
    return ApiFactoryService;
}());



/***/ }),

/***/ "./src/app/shared-services/datetime.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared-services/datetime.service.ts ***!
  \*****************************************************/
/*! exports provided: DatetimeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatetimeService", function() { return DatetimeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DatetimeService = /** @class */ (function () {
    function DatetimeService() {
    }
    DatetimeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], DatetimeService);
    return DatetimeService;
}());



/***/ }),

/***/ "./src/app/shared-services/file-manager.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/shared-services/file-manager.service.ts ***!
  \*********************************************************/
/*! exports provided: FileManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileManagerService", function() { return FileManagerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _rest_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rest.service */ "./src/app/shared-services/rest.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FileManagerService = /** @class */ (function () {
    function FileManagerService(restService) {
        this.restService = restService;
    }
    FileManagerService.prototype.upload = function (fileToUpload, options) {
        var formData = new FormData();
        formData.append('upload', fileToUpload, fileToUpload.name);
        if (options) {
            for (var key in options) {
                formData.append(key, options[key]);
            }
        }
        debugger;
        return this.restService.post('UPLOAD_FILE', false, null, formData);
    };
    FileManagerService.prototype.delete_file = function (key) {
    };
    FileManagerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_rest_service__WEBPACK_IMPORTED_MODULE_1__["RestService"]])
    ], FileManagerService);
    return FileManagerService;
}());



/***/ }),

/***/ "./src/app/shared-services/rest.service.ts":
/*!*************************************************!*\
  !*** ./src/app/shared-services/rest.service.ts ***!
  \*************************************************/
/*! exports provided: RestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestService", function() { return RestService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _api_factory_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api-factory.service */ "./src/app/shared-services/api-factory.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RestService = /** @class */ (function () {
    function RestService(http, apiFactory) {
        this.http = http;
        this.apiFactory = apiFactory;
    }
    RestService.prototype.get = function (api_name, bypass_auth, headers, params) {
        var get_headers;
        if (bypass_auth == true) {
            get_headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'No-Auth': 'True' });
        }
        else {
            get_headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({});
        }
        return this.http.get(this.apiFactory.getApi(api_name), { params: params, headers: get_headers });
    };
    RestService.prototype.post = function (api_name, bypass_auth, headers, body) {
        var post_headers;
        if (bypass_auth == true) {
            post_headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'No-Auth': 'True' });
        }
        else {
            post_headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({});
        }
        //    const req = new HttpRequest('POST', this.apiFactory.getApi(api_name), body, {
        //        headers: post_headers
        //      });
        //    return this.http.request(req);
        return this.http.post(this.apiFactory.getApi(api_name), body, { headers: post_headers });
    };
    RestService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _api_factory_service__WEBPACK_IMPORTED_MODULE_2__["ApiFactoryService"]])
    ], RestService);
    return RestService;
}());



/***/ }),

/***/ "./src/app/shared-services/seo.service.ts":
/*!************************************************!*\
  !*** ./src/app/shared-services/seo.service.ts ***!
  \************************************************/
/*! exports provided: SeoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeoService", function() { return SeoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SeoService = /** @class */ (function () {
    function SeoService(meta) {
        this.meta = meta;
    }
    SeoService.prototype.generateTags = function (config) {
        this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.addTag({ name: 'twitter:site', content: '@alligatorio' });
        this.meta.addTag({ name: 'twitter:title', content: config.title });
        this.meta.addTag({ name: 'twitter:description', content: config.desc });
        this.meta.addTag({ name: 'twitter:image', content: config.image_url });
        this.meta.addTag({ name: 'og:title', content: config.title });
        this.meta.addTag({ name: 'og:site_name', content: 'Algovent' });
        this.meta.addTag({ name: 'og:description', content: config.desc });
        this.meta.addTag({ name: 'og:type', content: 'article' });
        this.meta.addTag({ name: 'og:image', content: config.image_url });
        this.meta.addTag({ name: 'og:url', content: config.content_url });
    };
    SeoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Meta"]])
    ], SeoService);
    return SeoService;
}());



/***/ }),

/***/ "./src/app/shared/booking-layout.model.ts":
/*!************************************************!*\
  !*** ./src/app/shared/booking-layout.model.ts ***!
  \************************************************/
/*! exports provided: BookingLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingLayout", function() { return BookingLayout; });
/* harmony import */ var _layout_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout.model */ "./src/app/shared/layout.model.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BookingLayout = /** @class */ (function (_super) {
    __extends(BookingLayout, _super);
    function BookingLayout(layout, mode) {
        var _this = _super.call(this, mode) || this;
        _this.selection_info = {
            total: 0,
            qty: 0,
            selection_summary: [],
            summary_map: {},
            selected_seats: {},
        };
        _this.import(layout);
        return _this;
    }
    BookingLayout.prototype.pollAndUpdate = function () {
    };
    BookingLayout.prototype.updateEventLayout = function () {
    };
    BookingLayout.prototype.selectSeat = function (seat) {
        console.log(seat);
        var summary = this.selection_info['selection_summary'];
        var summary_map = this.selection_info['summary_map'];
        var selection = seat['selected'];
        if (selection != true) {
            seat['selected'] = true;
            var price_val = this.priceMap[seat.price].value;
            var summary_unit = summary_map[seat.price];
            this.selection_info.selected_seats[seat.lid] = seat;
            if (summary_unit) {
                summary_unit['qty'] = summary_unit['qty'] + 1;
                summary_unit['sub_total'] = summary_unit['sub_total'] + price_val;
            }
            else {
                summary_unit = { qty: 1, price: seat.price, sub_total: price_val };
                summary_map[seat.price] = summary_unit;
                summary.push(summary_unit);
            }
            this.selection_info['total'] = this.selection_info['total'] + price_val;
            this.selection_info['qty'] = this.selection_info['qty'] + 1;
        }
        else {
            seat['selected'] = false;
            var price_val = this.priceMap[seat.price].value;
            var summary_unit = summary_map[seat.price];
            if (summary_unit) {
                summary_unit['qty'] = summary_unit['qty'] - 1;
                summary_unit['sub_total'] = summary_unit['sub_total'] - price_val;
                this.selection_info['total'] = this.selection_info['total'] - price_val;
                this.selection_info['qty'] = this.selection_info['qty'] - 1;
                delete this.selection_info.selected_seats[seat.lid];
            }
        }
    };
    BookingLayout.prototype.removeSelection = function (summary_unit) {
        var seat_price = summary_unit.price;
        for (var key in this.selection_info.selected_seats) {
            var seat = this.selection_info.selected_seats[key];
            if (seat.price == seat_price) {
                seat['selected'] = false;
                delete this.selection_info.selected_seats[seat.lid];
            }
        }
        this.selection_info['total'] = this.selection_info['total'] - summary_unit['sub_total'];
        this.selection_info['qty'] = this.selection_info['qty'] - summary_unit['qty'];
        this.resetSummaryUnit(summary_unit);
    };
    BookingLayout.prototype.resetSummaryUnit = function (summary_unit) {
        summary_unit['qty'] = 0;
        summary_unit['sub_total'] = 0;
    };
    BookingLayout.prototype.export_selected_seats = function () {
        return this.selection_info.selected_seats;
    };
    BookingLayout.prototype.getBlockedSeats = function () {
    };
    return BookingLayout;
}(_layout_model__WEBPACK_IMPORTED_MODULE_0__["Layout"]));



/***/ }),

/***/ "./src/app/shared/event-layout.model.ts":
/*!**********************************************!*\
  !*** ./src/app/shared/event-layout.model.ts ***!
  \**********************************************/
/*! exports provided: EventLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventLayout", function() { return EventLayout; });
/* harmony import */ var _layout_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout.model */ "./src/app/shared/layout.model.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var EventLayout = /** @class */ (function (_super) {
    __extends(EventLayout, _super);
    function EventLayout(layout, mode) {
        var _this = _super.call(this, mode) || this;
        _this.import(layout);
        return _this;
    }
    EventLayout.prototype.markUnavailable = function (mData) {
        console.log(mData);
        if (mData == null || mData.group_index == null || mData.row_index == null || mData.row_index < 0 || mData.group_index < 0 || mData.start_col_index == null || mData.start_col_index < 0 || mData.end_col_index == null || mData.end_col_index < 0) {
            return { success: false, message: 'invalid group and rows are selected, please dont select 0th column or last column' };
        }
        var group = this.groups[mData.group_index];
        if (group != null) {
            var cols = group.rows[mData.row_index].cols;
            for (var i = mData.start_col_index; i <= mData.end_col_index; i++) {
                var col = cols[i];
                if (col.type == 'active') {
                    col.type = 'na';
                    this.priceMap[col.price].count--;
                }
            }
        }
        this.sort();
        return { success: true, message: 'Successfully Marked Unavailable' };
    };
    EventLayout.prototype.markPricing = function (mData) {
        console.log(mData);
        if (mData == null || mData.group_index == null || mData.row_index == null || mData.row_index < 0 || mData.group_index < 0 || mData.start_col_index == null || mData.start_col_index < 0 || mData.end_col_index == null || mData.end_col_index < 0) {
            return { success: false, message: 'invalid group and rows are selected, please dont select 0th column or last column' };
        }
        if (mData.price_index == null) {
            return { success: false, message: 'please select a valid pricing details' };
        }
        var group = this.groups[mData.group_index];
        if (group != null) {
            var cols = group.rows[mData.row_index].cols;
            for (var i = mData.start_col_index; i <= mData.end_col_index; i++) {
                var col = cols[i];
                if (col.type == 'active') {
                    this.priceMap[col.price].count--;
                    col.price = this.priceList[mData.price_index].name;
                    this.priceMap[col.price].count++;
                }
            }
        }
        console.log(this.groups);
        return { success: true, message: 'Successfully Marked Pricing' };
    };
    EventLayout.prototype.addPricing = function (pData) {
        if (pData.label == null || pData.label == "" || pData.value == null || pData.desc == null || pData.desc == "") {
            return { success: false, message: 'invalid info provided, please make sure all the data is filled before adding new price' };
        }
        this.priceList.push({
            value: pData.value,
            desc: pData.desc,
            color: '#acb19b',
            label: pData.label,
            status: 'active',
            name: pData.desc.slice(0, -1).replace(/\s/g, ""),
            count: 0,
        });
        this.updatePricingMap();
        return { success: true, message: 'Successfully added new Pricing' };
    };
    EventLayout.prototype.updateEventLayout = function () {
    };
    return EventLayout;
}(_layout_model__WEBPACK_IMPORTED_MODULE_0__["Layout"]));



/***/ }),

/***/ "./src/app/shared/event-venue-layout.model.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/event-venue-layout.model.ts ***!
  \****************************************************/
/*! exports provided: EventVenueLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventVenueLayout", function() { return EventVenueLayout; });
/* harmony import */ var _layout_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout.model */ "./src/app/shared/layout.model.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var EventVenueLayout = /** @class */ (function (_super) {
    __extends(EventVenueLayout, _super);
    function EventVenueLayout(layout, mode) {
        var _this = _super.call(this, mode) || this;
        if (layout != null) {
            _this.import(layout);
        }
        return _this;
    }
    EventVenueLayout.prototype.addGroup = function (gData) {
        if (gData == null || gData.group_name == null || gData.rows == null || gData.cols == null) {
            return { success: false, message: 'please provide sufficient information to create a new group' };
        }
        if (gData.rows <= 0 || gData.cols <= 0) {
            return { success: false, message: 'rows or columns cannot be less than or equal to 0' };
        }
        var group = { name: gData.group_name, rows: [], sequence: this.currentSequences.currentGroupSequence };
        this.currentSequences[group.sequence] = { currentRowSequence: 1, rows: {}, next_row_index: 0 };
        var defaultPrice = this.getDefaultPrice();
        defaultPrice.count = gData.rows * gData.cols;
        for (var i = 0; i < gData.rows; i++) {
            var row = { name: i + 1, cols: [], sequence: this.currentSequences[group.sequence].currentRowSequence };
            this.currentSequences[group.sequence].rows[row.sequence] = { currentColSequence: 1, next_col_index: 0 };
            for (var j = 0; j < gData.cols; j++) {
                var col_seq = this.currentSequences[group.sequence].rows[row.sequence].currentColSequence;
                var lid = String(group.sequence) + '_' + String(row.sequence) + '_' + String(col_seq);
                var col = { number: j + 1, sequence: col_seq, type: 'active', price: 'default', lid: lid };
                row.cols.push(col);
                this.currentSequences[group.sequence].rows[row.sequence].currentColSequence = this.currentSequences[group.sequence].rows[row.sequence].currentColSequence + 1;
                this.currentSequences[group.sequence].rows[row.sequence].next_col_index = this.currentSequences[group.sequence].rows[row.sequence].next_col_index + 1;
            }
            group.rows.push(row);
            this.currentSequences[group.sequence].currentRowSequence = this.currentSequences[group.sequence].currentRowSequence + 1;
            this.currentSequences[group.sequence].next_row_index = this.currentSequences[group.sequence].next_row_index + 1;
        }
        this.groups.push(group);
        this.currentSequences.currentGroupSequence = this.currentSequences.currentGroupSequence + 1;
        this.currentSequences.next_group_index = this.currentSequences.next_group_index + 1;
        this.sort();
        console.log(this.groups);
        return { success: true, message: 'Successfully created the group' };
    };
    EventVenueLayout.prototype.addPath = function (pData) {
        if (pData == null || pData.group_index == null || pData.col_index == null || pData.col_index <= 0 || pData.group_index < 0) {
            return { success: false, message: 'invalid group and rows are selected, please dont select 0th column or last column' };
        }
        var group_index = pData.group_index;
        var col_index = pData.col_index;
        var defaultPrice = this.getDefaultPrice();
        var group = this.groups[group_index];
        if (group != null) {
            var rows = group.rows;
            if (rows != null) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    var currentCol = row.cols[col_index];
                    var seq = currentCol.sequence;
                    seq = seq + 0.1;
                    row.cols.push({ number: 0, sequence: seq, type: 'path' });
                }
            }
        }
        this.sort();
        return { success: true, message: 'Successfully added the path' };
    };
    EventVenueLayout.prototype.markEmpty = function (mData) {
        console.log(mData);
        if (mData == null || mData.group_index == null || mData.row_index == null || mData.row_index < 0 || mData.group_index < 0 || mData.start_col_index == null || mData.start_col_index < 0 || mData.end_col_index == null || mData.end_col_index < 0) {
            return { success: false, message: 'invalid group and rows are selected, please dont select 0th column or last column' };
        }
        var defaultPrice = this.getDefaultPrice();
        var group = this.groups[mData.group_index];
        if (group != null) {
            var cols = group.rows[mData.row_index].cols;
            for (var i = mData.start_col_index; i <= mData.end_col_index; i++) {
                var col = cols[i];
                if (col.type != 'path') {
                    col.type = 'blank';
                    defaultPrice.count--;
                }
            }
            this.renumber(cols);
        }
        console.log(this.groups);
        this.sort();
        return { success: true, message: 'Successfully Marked Empty' };
    };
    EventVenueLayout.prototype.resetLayout = function () {
        this.currentSequences = { currentGroupSequence: 1, next_group_index: 0 };
        this.groups = [];
    };
    EventVenueLayout.prototype.updateEventLayout = function () {
    };
    return EventVenueLayout;
}(_layout_model__WEBPACK_IMPORTED_MODULE_0__["Layout"]));



/***/ }),

/***/ "./src/app/shared/layout.model.ts":
/*!****************************************!*\
  !*** ./src/app/shared/layout.model.ts ***!
  \****************************************/
/*! exports provided: Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
var Layout = /** @class */ (function () {
    function Layout(mode) {
        this.currentSequences = { currentGroupSequence: 1, next_group_index: 0 };
        this.groups = [];
        this.typeColors = { active: '#acb19b', na: '#d1d2cf', path: '#acb19b', blank: '#00000000', selected: '#d1d2cf', blocked: '#d1d2cf' };
        this.typeIcons = { active: 'event_seat', na: 'event_seat', path: 'reorder', blank: 'event_seat' };
        this.typeActionDisabled = { active: 'false', na: 'true', path: 'true', blank: 'true' };
        this.layout_type = 'none';
        this.lid_col_map = {};
        this.priceList = [
            {
                value: 0,
                desc: 'Basic price',
                color: '#acb19b',
                label: 'Basic',
                status: 'active',
                name: 'default',
                count: 0
            }
        ];
        this.priceMap = {};
        this.mode = mode;
        this.updatePricingMap();
    }
    Layout.prototype.getLayout = function () {
        return { groups: this.groups };
    };
    Layout.prototype.sort = function () {
        for (var i = 0; i < this.groups.length; i++) {
            for (var j = 0; j < this.groups[i].rows.length; j++) {
                this.groups[i].rows[j].cols.sort(this.sequence_compare_asc);
            }
            this.groups[i].rows.sort(this.sequence_compare_dec);
        }
        this.groups.sort(this.sequence_compare_dec);
    };
    Layout.prototype.sequence_compare_dec = function (objectA, objectB) {
        var a = Number(objectA.sequence);
        var b = Number(objectB.sequence);
        var retuVal = -1;
        if (b > a) {
            retuVal = 1;
        }
        return retuVal;
    };
    Layout.prototype.sequence_compare_asc = function (objectA, objectB) {
        var a = Number(objectA.sequence);
        var b = Number(objectB.sequence);
        var retuVal = -1;
        if (a > b) {
            retuVal = 1;
        }
        return retuVal;
    };
    Layout.prototype.renumber = function (cols) {
        var next_number = 1;
        if (cols != null) {
            for (var i = 0; i < cols.length; i++) {
                var col = cols[i];
                if (col.type == "blank" || col.type == "path") {
                    col.number = 0;
                }
                else {
                    col.number = next_number;
                    next_number++;
                }
            }
        }
    };
    Layout.prototype.import = function (layout) {
        if (layout != null && this.mode == 'edit' && Object.keys(layout).length > 0) {
            var inp_layout = layout['layout'];
            this.currentSequences = inp_layout["currentSequences"];
            this.groups = inp_layout["groups"];
            this.typeIcons = inp_layout["typeIcons"];
            this.typeActionDisabled = inp_layout["typeActionDisabled"];
            this.typeColors = inp_layout["typeColors"];
            this.layout_type = layout["layout_type"];
            this.importPriceList(inp_layout["priceList"]);
            this.Id = layout["id"];
            this.updatePricingMap();
            this.generateLidColMap();
        }
    };
    Layout.prototype.importPriceList = function (inpPriceList) {
        if (inpPriceList != null) {
            for (var i = 0; i < inpPriceList.length; i++) {
                var p = inpPriceList[i];
                if (p['name'] == "default") {
                    var defPrice = this.priceMap['default'];
                    defPrice['value'] = p['value'];
                    defPrice['desc'] = p['desc'];
                    defPrice['color'] = p['color'];
                    defPrice['label'] = p['label'];
                    defPrice['status'] = p['status'];
                    defPrice['name'] = p['name'];
                    defPrice['count'] = p['count'];
                }
                else {
                    this.priceList.push(p);
                }
            }
            this.updatePricingMap();
        }
    };
    Layout.prototype.export = function () {
        var layout = { layout: {
                currentSequences: this.currentSequences,
                groups: this.groups,
                typeIcons: this.typeIcons,
                typeActionDisabled: this.typeActionDisabled,
                typeColors: this.typeColors,
                priceList: this.priceList,
            },
            layout_type: this.layout_type,
            id: this.Id
        };
        return layout;
    };
    Layout.prototype.getDefaultPrice = function () {
        for (var i = 0; i < this.priceList.length; i++) {
            var price = this.priceList[i];
            if (price.name == "default") {
                return price;
            }
        }
    };
    Layout.prototype.updatePricingMap = function () {
        for (var i = 0; i < this.priceList.length; i++) {
            var price = this.priceList[i];
            this.priceMap[price.name] = price;
        }
    };
    Layout.prototype.generateLidColMap = function () {
        for (var i = 0; i < this.groups.length; i++) {
            for (var j = 0; j < this.groups[i].rows.length; j++) {
                for (var k = 0; k < this.groups[i].rows[j].cols.length; k++) {
                    var col = this.groups[i].rows[j].cols[k];
                    this.lid_col_map[col.lid] = col;
                }
            }
        }
    };
    return Layout;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    api: 'http://127.0.0.1:8000',
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/naveenbollimpalli/work/eventico/eventicoUI/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map