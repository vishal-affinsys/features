//
//  Scanner.m
//  splendid
//
//  Created by VIshal on 12/12/22.
//

#import <Foundation/Foundation.h>
#import "Scanner.h"
#import <React/RCTLog.h>

@implementation Scanner
RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(getScanner:(NSString *)name location:(NSString *)location callback: (RCTResponseSenderBlock)callback)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

@end
