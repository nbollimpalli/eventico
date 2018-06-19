(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

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
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./material.module */ "./src/app/material.module.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth/auth.guard */ "./src/app/auth/auth.guard.ts");
/* harmony import */ var _auth_antiauth_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./auth/antiauth.guard */ "./src/app/auth/antiauth.guard.ts");
/* harmony import */ var _auth_adminauth_guard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./auth/adminauth.guard */ "./src/app/auth/adminauth.guard.ts");
/* harmony import */ var _auth_superadminauth_guard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./auth/superadminauth.guard */ "./src/app/auth/superadminauth.guard.ts");
/* harmony import */ var _auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./auth/auth.interceptor */ "./src/app/auth/auth.interceptor.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_color_picker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-color-picker */ "./node_modules/ngx-color-picker/dist/ngx-color-picker.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var ng_simple_slideshow__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng-simple-slideshow */ "./node_modules/ng-simple-slideshow/ng-simple-slideshow.es5.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./routes */ "./src/app/routes.ts");
/* harmony import */ var _event_user_shared_user_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./event-user/shared/user.service */ "./src/app/event-user/shared/user.service.ts");
/* harmony import */ var _events_shared_event_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./events/shared/event.service */ "./src/app/events/shared/event.service.ts");
/* harmony import */ var _event_types_shared_event_type_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./event-types/shared/event-type.service */ "./src/app/event-types/shared/event-type.service.ts");
/* harmony import */ var _event_venues_shared_event_venue_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./event-venues/shared/event-venue.service */ "./src/app/event-venues/shared/event-venue.service.ts");
/* harmony import */ var _shared_services_file_manager_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./shared-services/file-manager.service */ "./src/app/shared-services/file-manager.service.ts");
/* harmony import */ var _shared_services_api_factory_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./shared-services/api-factory.service */ "./src/app/shared-services/api-factory.service.ts");
/* harmony import */ var _shared_services_rest_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./shared-services/rest.service */ "./src/app/shared-services/rest.service.ts");
/* harmony import */ var _shared_services_datetime_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./shared-services/datetime.service */ "./src/app/shared-services/datetime.service.ts");
/* harmony import */ var _bookings_shared_booking_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./bookings/shared/booking.service */ "./src/app/bookings/shared/booking.service.ts");
/* harmony import */ var _shared_services_seo_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./shared-services/seo.service */ "./src/app/shared-services/seo.service.ts");
/* harmony import */ var _event_user_register_register_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./event-user/register/register.component */ "./src/app/event-user/register/register.component.ts");
/* harmony import */ var _event_user_login_login_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./event-user/login/login.component */ "./src/app/event-user/login/login.component.ts");
/* harmony import */ var _event_user_settings_settings_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./event-user/settings/settings.component */ "./src/app/event-user/settings/settings.component.ts");
/* harmony import */ var _event_user_event_user_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./event-user/event-user.component */ "./src/app/event-user/event-user.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _events_events_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./events/events.component */ "./src/app/events/events.component.ts");
/* harmony import */ var _events_new_event_new_event_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./events/new-event/new-event.component */ "./src/app/events/new-event/new-event.component.ts");
/* harmony import */ var _event_types_event_types_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./event-types/event-types.component */ "./src/app/event-types/event-types.component.ts");
/* harmony import */ var _event_types_new_event_type_new_event_type_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./event-types/new-event-type/new-event-type.component */ "./src/app/event-types/new-event-type/new-event-type.component.ts");
/* harmony import */ var _event_venues_event_venues_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./event-venues/event-venues.component */ "./src/app/event-venues/event-venues.component.ts");
/* harmony import */ var _event_venues_new_event_venue_new_event_venue_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./event-venues/new-event-venue/new-event-venue.component */ "./src/app/event-venues/new-event-venue/new-event-venue.component.ts");
/* harmony import */ var _bookings_bookings_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./bookings/bookings.component */ "./src/app/bookings/bookings.component.ts");
/* harmony import */ var _bookings_booking_booking_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./bookings/booking/booking.component */ "./src/app/bookings/booking/booking.component.ts");
/* harmony import */ var _form_dialog_form_dialog_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./form-dialog/form-dialog.component */ "./src/app/form-dialog/form-dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























//import { EventPriceService } from './event-prices/shared/event-type.service';








//import { UpdateProfileComponent } from './event-user/settings/settings.component';













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_17__["AppComponent"],
                _event_user_register_register_component__WEBPACK_IMPORTED_MODULE_29__["RegisterComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_33__["HeaderComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_34__["FooterComponent"],
                _events_events_component__WEBPACK_IMPORTED_MODULE_35__["EventsComponent"],
                _event_user_login_login_component__WEBPACK_IMPORTED_MODULE_30__["LoginComponent"],
                _events_new_event_new_event_component__WEBPACK_IMPORTED_MODULE_36__["NewEventComponent"],
                _event_types_event_types_component__WEBPACK_IMPORTED_MODULE_37__["EventTypesComponent"],
                _event_types_new_event_type_new_event_type_component__WEBPACK_IMPORTED_MODULE_38__["NewEventTypeComponent"],
                _event_venues_event_venues_component__WEBPACK_IMPORTED_MODULE_39__["EventVenuesComponent"],
                _event_venues_new_event_venue_new_event_venue_component__WEBPACK_IMPORTED_MODULE_40__["NewEventVenueComponent"],
                _form_dialog_form_dialog_component__WEBPACK_IMPORTED_MODULE_43__["FormDialogComponent"],
                _event_user_settings_settings_component__WEBPACK_IMPORTED_MODULE_31__["SettingsComponent"],
                _event_user_event_user_component__WEBPACK_IMPORTED_MODULE_32__["EventUserComponent"],
                _bookings_bookings_component__WEBPACK_IMPORTED_MODULE_41__["BookingsComponent"],
                _bookings_booking_booking_component__WEBPACK_IMPORTED_MODULE_42__["BookingComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrModule"].forRoot(),
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                ngx_color_picker__WEBPACK_IMPORTED_MODULE_14__["ColorPickerModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_15__["FlexLayoutModule"],
                ng_simple_slideshow__WEBPACK_IMPORTED_MODULE_16__["SlideshowModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot(_routes__WEBPACK_IMPORTED_MODULE_18__["appRoutes"], { enableTracing: true } // <-- debugging purposes only
                ),
            ],
            entryComponents: [
                _form_dialog_form_dialog_component__WEBPACK_IMPORTED_MODULE_43__["FormDialogComponent"],
            ],
            providers: [_shared_services_seo_service__WEBPACK_IMPORTED_MODULE_28__["SeoService"], _bookings_shared_booking_service__WEBPACK_IMPORTED_MODULE_27__["BookingService"], _shared_services_datetime_service__WEBPACK_IMPORTED_MODULE_26__["DatetimeService"], _shared_services_rest_service__WEBPACK_IMPORTED_MODULE_25__["RestService"], _shared_services_api_factory_service__WEBPACK_IMPORTED_MODULE_24__["ApiFactoryService"], _shared_services_file_manager_service__WEBPACK_IMPORTED_MODULE_23__["FileManagerService"], _event_venues_shared_event_venue_service__WEBPACK_IMPORTED_MODULE_22__["EventVenueService"], _event_types_shared_event_type_service__WEBPACK_IMPORTED_MODULE_21__["EventTypeService"], _events_shared_event_service__WEBPACK_IMPORTED_MODULE_20__["EventService"], _event_user_shared_user_service__WEBPACK_IMPORTED_MODULE_19__["UserService"], _auth_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"], _auth_antiauth_guard__WEBPACK_IMPORTED_MODULE_9__["AntiauthGuard"], _auth_adminauth_guard__WEBPACK_IMPORTED_MODULE_10__["AdminauthGuard"], _auth_superadminauth_guard__WEBPACK_IMPORTED_MODULE_11__["SuperadminauthGuard"],
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"],
                    useClass: _auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_12__["AuthInterceptor"],
                    multi: true
                },
                {
                    provide: _angular_common__WEBPACK_IMPORTED_MODULE_13__["LocationStrategy"],
                    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_13__["HashLocationStrategy"]
                },
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_17__["AppComponent"]]
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

module.exports = "<mat-card class=\"banner-card\">\n  <img class=\"boking_banner responsive center\" [src]=\"event.images['banner'].url\" onerror=\"this.src='https://algovent-s3-static.s3.amazonaws.com/eventico/media/event_bWDUlrT.jpg'\">\n</mat-card>\n<div id=\"wrapper\">\n  <mat-card class=\"\">\n    <mat-list>\n      <mat-list-item *ngFor=\"let price of bookingLayout.priceList\">\n        <mat-icon class=\"pricing_color_icon\" matListIcon [style.color]=\"price.color\">event_seat</mat-icon>\n        <h3 matLine> {{ price.label }} </h3>\n        <p matLine>\n          <span> RS {{ price.value }} </span>\n          <span class=\"demo-2\"> -- {{ price.desc }} </span>\n        </p>\n        <mat-divider></mat-divider>\n\n      </mat-list-item>\n    </mat-list>\n  </mat-card>\n  <mat-card  class=\"scrollable-content\" style=\"flex-basis: 800px\">\n    <mat-card-content >\n        <table *ngFor=\"let group of layout_groups\" disabled>\n          <tr *ngFor=\"let row of group.rows\">\n            <td *ngFor=\"let col of row.cols\" class=\"seat-col\">\n              <button *ngIf=\"col.type != 'active'\" [matTooltip]=\"col.number\" class=\"seat-button\" disabled  mat-icon-button><mat-icon [style.color]=\"bookingLayout.typeColors[col.type]\" aria-label=\"Event Seat\">{{ bookingLayout.typeIcons[col.type] }}</mat-icon></button>\n              <button *ngIf=\"col['selected'] == true\" (click)=\"bookingLayout.selectSeat(col)\" [matTooltip]=\"'seat : '+col.number+' ,cost : '+bookingLayout.priceMap[col.price].value\" class=\"seat-button\" mat-icon-button><mat-icon [style.color]=\"bookingLayout.typeColors['na']\" aria-label=\"Event Seat\">{{ bookingLayout.typeIcons[col.type] }}</mat-icon></button>\n              <button *ngIf=\"col.type == 'active' && col['selected'] != true\" (click)=\"bookingLayout.selectSeat(col)\" [matTooltip]=\"'seat : '+col.number+' ,cost : '+bookingLayout.priceMap[col.price].value\" class=\"seat-button\" mat-icon-button><mat-icon [style.color]=\"bookingLayout.priceMap[col.price].color\" aria-label=\"Event Seat\">{{ bookingLayout.typeIcons[col.type] }}</mat-icon></button>\n            </td>\n          <tr>\n        </table>\n\n      </mat-card-content>\n  </mat-card>\n  <mat-card class=\"\" >\n    <mat-list>\n      <mat-list-item *ngFor=\"let summary_unit of bookingLayout.selection_info['selection_summary']\">\n        <mat-icon class=\"pricing_color_icon\" matListIcon [style.color]=\"bookingLayout.priceMap[summary_unit.price].color\">event_seat</mat-icon>\n        <h3 matLine> {{ bookingLayout.priceMap[summary_unit.price].label }} </h3>\n        <p matLine>\n          <span> RS {{ bookingLayout.priceMap[summary_unit.price].value }} </span>\n          <span class=\"demo-2\"> x {{ summary_unit.qty }} </span>\n        </p>\n        <button mat-icon-button (click)=\"bookingLayout.removeSelection(summary_unit)\"><mat-icon>delete_outline</mat-icon></button>\n        <mat-divider></mat-divider>\n\n      </mat-list-item>\n\n      <mat-list-item>\n        <mat-icon class=\"pricing_color_icon\" matListIcon >payment</mat-icon>\n        <h2 matLine> Total </h2>\n        <button mat-icon-button>RS. {{ bookingLayout.selection_info['total'] }}</button>\n      </mat-list-item>\n    </mat-list>\n    <mat-divider></mat-divider>\n\n    <mat-card-actions>\n      <button mat-button disabled>PAY</button>\n      <button mat-button (click)=\"skipAndBook()\">SKIP PAY & BOOK</button>\n    </mat-card-actions>\n  </mat-card>\n</div>\n<div class=\"spacer\"></div>\n<div class=\"screen-container\">\n  <div style=\"text-align: center\" class=\"screen-div\">SCREEN HERE</div>\n</div>\n"

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
                _this.updateMetaData();
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
            title: this.event.Name,
            desc: this.event.Desc,
            image_url: this.event.images['banner'].url,
        };
        this.seo.generateTags(config);
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

module.exports = ".login-card\n{\n   max-width: 30%;\n   margin: 100px auto;\n}\n\n.full-width\n{\n  width : 100%;\n}\n\n.login-title\n{\n  flex: 1 1 auto;\n  text-align: center;\n}\n"

/***/ }),

/***/ "./src/app/event-user/login/login.component.html":
/*!*******************************************************!*\
  !*** ./src/app/event-user/login/login.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"login-card\">\n  <mat-card-title class=\"login-title\">LOGIN</mat-card-title>\n  <form class=\"login-form\" #userLoginForm=\"ngForm\" (ngSubmit)=\"onLogin(userLoginForm)\">\n  <mat-card-content>\n      <mat-form-field class=\"full-width\">\n        <input matInput placeholder=\"Email\" #Email=\"ngModel\" [(ngModel)]=\"user.Email\" name=\"Email\" required>\n      </mat-form-field>\n      <mat-form-field class=\"full-width\">\n        <input matInput placeholder=\"Password\" type=\"password\" #Password=\"ngModel\" [(ngModel)]=\"user.Password\" name=\"Password\" required>\n      </mat-form-field>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-raised-button class=\"full-width\" color=\"primary\">Login</button>\n  </mat-card-actions>\n  </form>\n  <mat-divider></mat-divider>\n  <mat-card-actions>\n    <button mat-button  color=\"primary\"><i class=\"material-icons md-dark\">book</i> Facebook</button>\n    <button mat-button  color=\"primary\"><i class=\"material-icons md-dark\">book</i> Google</button>\n  </mat-card-actions>\n</mat-card>\n"

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
    function LoginComponent(userservice, toastr, router) {
        this.userservice = userservice;
        this.toastr = toastr;
        this.router = router;
        this.user = new _shared_user_model__WEBPACK_IMPORTED_MODULE_1__["User"]();
        this.passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
    }
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
        __metadata("design:paramtypes", [_shared_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
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

/***/ "./src/app/form-dialog/form-dialog.component.css":
/*!*******************************************************!*\
  !*** ./src/app/form-dialog/form-dialog.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-title\n{\n  text-align: center;\n}\n"

/***/ }),

/***/ "./src/app/form-dialog/form-dialog.component.html":
/*!********************************************************!*\
  !*** ./src/app/form-dialog/form-dialog.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title class=\"form-title\">{{ data.title }}</h1>\n<div mat-dialog-content>\n  <div *ngFor=\"let field of data.fields\">\n    <mat-form-field>\n      <input matInput type=\"{{ field.field_type }}\" [(ngModel)]=\"field.value\">\n    </mat-form-field>\n  </div>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onCancel()\">Cancel</button>\n  <button mat-button cdkFocusInitial>Ok</button>\n</div>\n"

/***/ }),

/***/ "./src/app/form-dialog/form-dialog.component.ts":
/*!******************************************************!*\
  !*** ./src/app/form-dialog/form-dialog.component.ts ***!
  \******************************************************/
/*! exports provided: FormDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormDialogComponent", function() { return FormDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
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


var FormDialogComponent = /** @class */ (function () {
    function FormDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    FormDialogComponent.prototype.onCancel = function () {
        this.dialogRef.close();
    };
    FormDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-form-dialog',
            template: __webpack_require__(/*! ./form-dialog.component.html */ "./src/app/form-dialog/form-dialog.component.html"),
            styles: [__webpack_require__(/*! ./form-dialog.component.css */ "./src/app/form-dialog/form-dialog.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], FormDialogComponent);
    return FormDialogComponent;
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

module.exports = "<mat-toolbar class=\"header navbar-static-top\" [style.background-color]=\"'#e5e5e8'\">\n  <mat-toolbar-row >\n    <a href=\"\" routerLink=\"\"><img class=\"logo\" src=\"https://algovent-s3-static.s3.amazonaws.com/eventico/media/TOTT_Logo_New.png\" alt=\"talk-of-the-town\"></a>\n\n    <span class=\"tollbar-splitter\"></span>\n    <button *ngIf=\"loggedIn == false\" mat-button routerLink=\"login\" [style.color]=\"'#000'\">LOGIN</button>\n    <button *ngIf=\"loggedIn == false\" mat-button routerLink=\"signup\" [style.color]=\"'#000'\">SIGNUP</button>\n    <div *ngIf=\"loggedIn\">\n    <mat-menu #notifications=\"matMenu\" yPosition=\"below\" xPosition=\"before\">\n      <button mat-menu-item><mat-icon [style.color]=\"'#000'\">history</mat-icon>bookings</button>\n      <button mat-menu-item><mat-icon [style.color]=\"'#000'\">settings</mat-icon>settings</button>\n      <button mat-menu-item (click)=\"logout()\"><mat-icon [style.color]=\"'#000'\">exit_to_app</mat-icon>logout</button>\n    </mat-menu>\n    <button mat-icon-button [matMenuTriggerFor]=\"notifications\" *ngIf=\"loggedIn\">\n      <mat-icon [style.color]=\"'#000'\">person</mat-icon>\n    </button>\n    </div>\n\n\n  </mat-toolbar-row>\n</mat-toolbar>\n<mat-toolbar *ngIf=\"adminToolBar['allowed'] == true\" class=\"admin-toolbar\">\n  <i class=\"material-icons md-dark\">supervisor_account</i>\n  <button mat-button routerLink=\"events/event\"><mat-icon aria-label=\"Settings\">playlist_add</mat-icon> <span class=\"responsive_span_text\">New Event</span> </button>\n  <button mat-button routerLink=\"event-types\"><mat-icon aria-label=\"Settings\">table_chart</mat-icon> <span class=\"responsive_span_text\">Event Types</span> </button>\n  <button mat-button routerLink=\"event-venues\"><mat-icon aria-label=\"Settings\">movie_creation</mat-icon> <span class=\"responsive_span_text\">Event Venues</span></button>\n  <span class=\"admin-tollbar-spacer\"></span>\n  <mat-menu #addon_tools=\"matMenu\" class=\"addon-tools\" yPosition=\"below\" xPosition=\"before\">\n    <button mat-menu-item routerLink=\"\"><mat-icon aria-label=\"Settings\">find_replace</mat-icon> User Management</button>\n    <button mat-menu-item routerLink=\"\"><mat-icon aria-label=\"Settings\">cloud_download</mat-icon> Reports</button>\n  </mat-menu>\n\n  <button class=\"addon-tools\" mat-icon-button [matMenuTriggerFor]=\"addon_tools\">\n    <mat-icon>more_vert</mat-icon>\n  </button>\n</mat-toolbar>\n"

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
/* harmony import */ var _events_events_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./events/events.component */ "./src/app/events/events.component.ts");
/* harmony import */ var _events_new_event_new_event_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./events/new-event/new-event.component */ "./src/app/events/new-event/new-event.component.ts");
/* harmony import */ var _event_types_event_types_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./event-types/event-types.component */ "./src/app/event-types/event-types.component.ts");
/* harmony import */ var _event_types_new_event_type_new_event_type_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./event-types/new-event-type/new-event-type.component */ "./src/app/event-types/new-event-type/new-event-type.component.ts");
/* harmony import */ var _event_venues_event_venues_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./event-venues/event-venues.component */ "./src/app/event-venues/event-venues.component.ts");
/* harmony import */ var _event_venues_new_event_venue_new_event_venue_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./event-venues/new-event-venue/new-event-venue.component */ "./src/app/event-venues/new-event-venue/new-event-venue.component.ts");
/* harmony import */ var _bookings_bookings_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bookings/bookings.component */ "./src/app/bookings/bookings.component.ts");
/* harmony import */ var _bookings_booking_booking_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./bookings/booking/booking.component */ "./src/app/bookings/booking/booking.component.ts");












var appRoutes = [
    { path: '', component: _events_events_component__WEBPACK_IMPORTED_MODULE_4__["EventsComponent"], pathMatch: 'full' },
    { path: 'signup', component: _event_user_register_register_component__WEBPACK_IMPORTED_MODULE_2__["RegisterComponent"], canActivate: [_auth_antiauth_guard__WEBPACK_IMPORTED_MODULE_1__["AntiauthGuard"]] },
    { path: 'login', component: _event_user_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"], canActivate: [_auth_antiauth_guard__WEBPACK_IMPORTED_MODULE_1__["AntiauthGuard"]] },
    { path: 'events/event', component: _events_new_event_new_event_component__WEBPACK_IMPORTED_MODULE_5__["NewEventComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_0__["AuthGuard"]] },
    { path: 'event-types', component: _event_types_event_types_component__WEBPACK_IMPORTED_MODULE_6__["EventTypesComponent"] },
    { path: 'event-types/event-type', component: _event_types_new_event_type_new_event_type_component__WEBPACK_IMPORTED_MODULE_7__["NewEventTypeComponent"] },
    { path: 'event-venues', component: _event_venues_event_venues_component__WEBPACK_IMPORTED_MODULE_8__["EventVenuesComponent"] },
    { path: 'event-venues/event-venue', component: _event_venues_new_event_venue_new_event_venue_component__WEBPACK_IMPORTED_MODULE_9__["NewEventVenueComponent"] },
    { path: 'bookings', component: _bookings_bookings_component__WEBPACK_IMPORTED_MODULE_10__["BookingsComponent"] },
    { path: 'bookings/booking', component: _bookings_booking_booking_component__WEBPACK_IMPORTED_MODULE_11__["BookingComponent"] },
    { path: '**', component: _events_events_component__WEBPACK_IMPORTED_MODULE_4__["EventsComponent"] }
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