//
//  Scanner.swift
//  splendid
//
//  Created by VIshal on 13/12/22.
//


import Foundation
import React

@objc(Scanner) class Scanner: NSObject {
  var bridge: RCTBridge!
  @objc static func requiresMainQueueSetup() -> Bool { return true }

  @objc public func addEvent(_ callback: RCTResponseSenderBlock) {
      callback(["return data, e.g. 1 or true or '1' or 1.0"])
  }
  
  @objc public func resolvePromise(
      _ resolve: RCTPromiseResolveBlock,
      rejecter reject: RCTPromiseRejectBlock
    ) -> Void {
      resolve("CustomMethods.resolvePromise()")
    }
  
  @objc public func naming(
    _ name: String,
    callback: RCTResponseSenderBlock) -> Void {
    callback(["Hi \(name), We are calling from Scanner, location:naming"])
  }


}
