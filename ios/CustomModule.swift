//
//  CustomModue.swift
//  splendid
//
//  Created by VIshal on 12/12/22.
//

import Foundation
@objc(CustomMethods) class CustomModule: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { return true }
  @objc public func simpleMethod() { /* do something */ }
  @objc public func simpleMethodReturns(
    _ callback: RCTResponseSenderBlock
  ) {
    callback(["CustomMethods.simpleMethodReturns()"])
  }
  @objc public func simpleMethodWithParams(
    _ param: String,
    callback: RCTResponseSenderBlock
  ) {
    callback(["CustomMethods.simpleMethodWithParams('\(param)')"])
  }

  @objc public func resolvePromise(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    resolve("CustomMethods.resolvePromise()")
  }
  @objc public func rejectPromise(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    reject("0", "CustomMethods.rejectPromise()", nil)
  }
}
