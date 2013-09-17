/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  MainViewController.h
//  CTC_ET
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "MainViewController.h"

@implementation MainViewController
IOS5_SDK * eyeSightCore;
- (id)initWithNibName:(NSString*)nibNameOrNil bundle:(NSBundle*)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Uncomment to override the CDVCommandDelegateImpl used
        // _commandDelegate = [[MainCommandDelegate alloc] initWithViewController:self];
        // Uncomment to override the CDVCommandQueue used
        // _commandQueue = [[MainCommandQueue alloc] initWithViewController:self];       
        
        
    }
    return self;
}

- (id)init
{
    self = [super init];
    if (self) {
        // Uncomment to override the CDVCommandDelegateImpl used
        // _commandDelegate = [[MainCommandDelegate alloc] initWithViewController:self];
        // Uncomment to override the CDVCommandQueue used
        // _commandQueue = [[MainCommandQueue alloc] initWithViewController:self];
    }
    return self;
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];

    // Release any cached data, images, etc that aren't in use.
}

#pragma mark View lifecycle

- (void)viewWillAppear:(BOOL)animated
{
    // View defaults to full size.  If you want to customize the view's size, or its subviews (e.g. webView),
    // you can do so here.

    [super viewWillAppear:animated];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    /*
      m_sProducType = TYPE_EYECAN_SINGLE;
      // Init the gesture recognition engine
      eyeSightCore = [[IOS5_SDK alloc] init];
    // Set Orientation mode - Sets the orientation in which the gesture recognition engine is detecting the gesures.
    [eyeSightCore InitEyeSightEngine:m_sProducType Orientation:ORIENTATION_AUTO];
    // Register as EyeSightDelegate for recieving gesture recognition callbacks
    [eyeSightCore RegisterEyeSightEngine:self];
    // Start the gesture recognetion engine
    [eyeSightCore StartEyeSightEngine];
    //set gesture direction detection
    [eyeSightCore SetLeftRight];
    //Indicating whether the system should print debug information
    [eyeSightCore ShouldPrintDebugInformation:false];
     */
}

- (void)viewDidUnload
{
    [super viewDidUnload];
//    [eyeSightCore StopEyeSightEngine];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return [super shouldAutorotateToInterfaceOrientation:interfaceOrientation];
}

/* Comment out the block below to over-ride */

/*
- (CDVCordovaView*) newCordovaViewWithFrame:(CGRect)bounds
{
    return[super newCordovaViewWithFrame:bounds];
}
*/

#pragma mark UIWebDelegate implementation

- (void)webViewDidFinishLoad:(UIWebView*)theWebView
{
    // Black base color for background matches the native apps
    theWebView.backgroundColor = [UIColor blackColor];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWillShow:) name:UIKeyboardWillShowNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(keyboardWillHide:)
                                                 name:UIKeyboardWillHideNotification
                                               object:nil];
    


    return [super webViewDidFinishLoad:theWebView];
}

- (void)keyboardWillShow:(NSNotification *)note {
    [self performSelector:@selector(removeBar) withObject:nil afterDelay:0];
    NSLog(@"H: %f", [self.webView bounds].size.height);
}
- (void)keyboardWillHide:(NSNotification *)aNotification
{
    NSLog(@"H2: %f", [self.webView bounds].size.height);
    
}
- (void)removeBar {
    // Locate non-UIWindow.
    UIWindow *keyboardWindow = nil;
    for (UIWindow *testWindow in [[UIApplication sharedApplication] windows]) {
        if (![[testWindow class] isEqual:[UIWindow class]]) {
            keyboardWindow = testWindow;
            break;
        }
    }
    
    // Locate UIWebFormView.
    for (UIView *possibleFormView in [keyboardWindow subviews]) {
        // iOS 5 sticks the UIWebFormView inside a UIPeripheralHostView.
        if ([[possibleFormView description] rangeOfString:@"UIPeripheralHostView"].location != NSNotFound) {
            for (UIView *subviewWhichIsPossibleFormView in [possibleFormView subviews]) {
                if ([[subviewWhichIsPossibleFormView description] rangeOfString:@"UIWebFormAccessory"].location != NSNotFound) {
                    // if ipad
                    //[subviewWhichIsPossibleFormView removeFromSuperview];
                    if (UI_USER_INTERFACE_IDIOM()==UIUserInterfaceIdiomPhone)
                    {
                        for (UIView * formViewSubview in [subviewWhichIsPossibleFormView subviews]) {
                            if ([[formViewSubview description] rangeOfString:@"UISegmentedControl"].location != NSNotFound)
                            {
                                [formViewSubview removeFromSuperview];
                            }
                        }
                    }
                    else {
                        [subviewWhichIsPossibleFormView removeFromSuperview];
                    }
                }
            }
        }
    }
}
/* Comment out the block below to over-ride */

/*

- (void) webViewDidStartLoad:(UIWebView*)theWebView
{
    return [super webViewDidStartLoad:theWebView];
}

- (void) webView:(UIWebView*)theWebView didFailLoadWithError:(NSError*)error
{
    return [super webView:theWebView didFailLoadWithError:error];
}

- (BOOL) webView:(UIWebView*)theWebView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationType
{
    return [super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType];
}
*/

/**
 Handle the gesture recognition output when using the eyeCan Single product
 @param eyeSightOut holds the gesture recognition output
 */
-(void)HandleEyeSightOutput:(struct EyeSightSDKOutput*)eyeSightOut
{
    
    switch (eyeSightOut->nEyeCanData[0].sActionType) {
        case RIGHT:
            NSLog(@"RIGHT");
            
            break;
        case LEFT:
            NSLog(@"LEFT");
            
            break;
        case UP:
            NSLog(@"UP");
            
            break;
        case DOWN:
            
            NSLog(@"DOWN");
            break;
        case WAVE_RIGHT_LEFT:
        case WAVE_LEFT_RIGHT:
            
            NSLog(@"WAVE");
            break;
        case SELECT:
            
            NSLog(@"SELECT");
            break;
            
        default:
            break;
    }

    
}
/**
 Handle error messages arriving from the gesture recognition engine
 @param error  - the error message code
 */
-(void)HandleEyeSightError:(enum EyeSightError)error
{
}

/**
 Handle status messages arriving from the gesture recognition engine
 @param status - status message code
 */
-(void)HandleEyeSightStatus:(enum EyeSightStatus)status

{
}

@end

@implementation MainCommandDelegate

/* To override the methods, uncomment the line in the init function(s)
   in MainViewController.m
 */

#pragma mark CDVCommandDelegate implementation

- (id)getCommandInstance:(NSString*)className
{
    return [super getCommandInstance:className];
}

/*
   NOTE: this will only inspect execute calls coming explicitly from native plugins,
   not the commandQueue (from JavaScript). To see execute calls from JavaScript, see
   MainCommandQueue below
*/
- (BOOL)execute:(CDVInvokedUrlCommand*)command
{
    return [super execute:command];
}

- (NSString*)pathForResource:(NSString*)resourcepath;
{
    return [super pathForResource:resourcepath];
}

@end

@implementation MainCommandQueue

/* To override, uncomment the line in the init function(s)
   in MainViewController.m
 */
- (BOOL)execute:(CDVInvokedUrlCommand*)command
{
    return [super execute:command];
}

@end
