//
//  Scanner.m
//  splendid
//
//  Created by VIshal on 13/12/22.
//


#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

#import <React/RCTViewManager.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>


@interface RCT_EXTERN_MODULE(Scanner , NSObject)

  RCT_EXTERN_METHOD(addEvent:(RCTResponseSenderBlock) callback)
  RCT_EXTERN_METHOD(resolvePromise:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject)
  RCT_EXTERN_METHOD(naming:(NSString *) name callback: (RCTResponseSenderBlock) callback)

@end
