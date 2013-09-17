		#import "EyeSight.h"
#import "EyeSightViewController.h"
#import <Cordova/CDVPluginResult.h>

@implementation EyeSight

EyeSightViewController *ESviewController;
NSMutableArray *_arguments;
- (void) eyeSight:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    NSString* javaScript = nil;
    _arguments =  [[NSMutableArray alloc] initWithArray:arguments];
    NSString* callbackId = [arguments objectAtIndex:0];
     CDVPluginResult* pluginResult = nil;
     
      NSLog(@"ES Start");
            
     @try {
         NSString* echo = [arguments objectAtIndex:1];
         if ([echo isEqualToString:@"STOP"]) {
             [ESviewController StopEngine];
         }
         
         else {
             if ([echo isEqualToString:@"LR"]) {
                 [ESviewController ChangeToLeftRight];
             }
             else if ([echo isEqualToString:@"UD"]) {
                 [ESviewController ChangeToUpDown];
             }
             else {
                 [[NSNotificationCenter defaultCenter]
                  addObserver:self
                  selector:@selector(RightGestureHandler:)
                  name:@"RightGesture"
                  object:nil ];
                 
                 [[NSNotificationCenter defaultCenter]
                  addObserver:self
                  selector:@selector(LeftGestureHandler:)
                  name:@"LeftGesture"
                  object:nil ];
                 
                 [[NSNotificationCenter defaultCenter]
                  addObserver:self
                  selector:@selector(UpGestureHandler:)
                  name:@"UpGesture"
                  object:nil ];
                 
                 [[NSNotificationCenter defaultCenter]
                  addObserver:self
                  selector:@selector(DownGestureHandler:)
                  name:@"DownGesture"
                  object:nil ];
                 
                 [[NSNotificationCenter defaultCenter]
                  addObserver:self
                  selector:@selector(SelectGestureHandler:)
                  name:@"SelectGesture"
                  object:nil ];
                 

                 ESviewController = [[EyeSightViewController alloc] initWithNibName:@"MainViewController" bundle:nil] ;
                 [ESviewController viewDidLoad];
                 
             }
             [ESviewController StartEngine];

         }
                  
     if (echo != nil && [echo length] > 0) {
     pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
     javaScript =  [pluginResult toSuccessCallbackString:callbackId];
     } else {
     pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
     javaScript = [pluginResult toErrorCallbackString:callbackId];
     }
     } @catch (NSException* exception) {
     pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_JSON_EXCEPTION messageAsString:[exception reason]];
     javaScript = [pluginResult toErrorCallbackString:callbackId];
     }
     //[self writeJavascript:javaScript];
}

-(void)RightGestureHandler: (NSNotification *) notification
{
    NSString* javaScript = [NSString stringWithFormat:@"eyesightMan.returnFunc('%@');", @"right"];
    [self writeJavascript:javaScript];
}

-(void)LeftGestureHandler: (NSNotification *) notification
{
    NSString* javaScript = [NSString stringWithFormat:@"eyesightMan.returnFunc('%@');", @"left"];
    [self writeJavascript:javaScript];

}

-(void)UpGestureHandler: (NSNotification *) notification
{
    NSString* javaScript = [NSString stringWithFormat:@"eyesightMan.returnFunc('%@');", @"up"];
    [self writeJavascript:javaScript];
}

-(void)DownGestureHandler: (NSNotification *) notification
{
    NSString* javaScript = [NSString stringWithFormat:@"eyesightMan.returnFunc('%@');", @"down"];
    [self writeJavascript:javaScript];
}
-(void)SelectGestureHandler: (NSNotification *) notification
{
    NSString* javaScript = [NSString stringWithFormat:@"eyesightMan.returnFunc('%@');", @"select"];
    [self writeJavascript:javaScript];
}




@end