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
//  AppDelegate.m
//  CTC_ET
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"

#import <Cordova/CDVPlugin.h>

@implementation AppDelegate

@synthesize window, viewController;

- (id)init
{
    /** If you need to do any extra app-specific initialization, you can do it here
     *  -jm
     **/
    NSHTTPCookieStorage* cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];

    [cookieStorage setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];

    self = [super init];
    return self;
}

#pragma mark UIApplicationDelegate implementation

/**
 * This is main kick off after the app inits, the views and Settings are setup here. (preferred - iOS4 and up)
 */
- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    CGRect screenBounds = [[UIScreen mainScreen] bounds];

    self.window = [[[UIWindow alloc] initWithFrame:screenBounds] autorelease];
    self.window.autoresizesSubviews = YES;

    self.viewController = [[[MainViewController alloc] init] autorelease];
    self.viewController.useSplashScreen = YES;
    self.viewController.wwwFolderName = @"www";
    self.viewController.startPage = @"index.html";

    // NOTE: To customize the view's frame size (which defaults to full screen), override
    // [self.viewController viewWillAppear:] in your view controller.

    self.window.rootViewController = self.viewController;
    [self.window makeKeyAndVisible];
    
    //Start the Appoxee client and make sure that this your first line of code in this method.
    [[AppoxeeManager sharedManager] initManagerWithDelegate:self andOptions:NULL];
    
    //Ask Apple for your push token
    
    //Replacing this code with the method [self appNeedsToRegisterForPush];
    //[[UIApplication sharedApplication] registerForRemoteNotificationTypes:(UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeSound | //UIRemoteNotificationTypeAlert)];
    //[window makeKeyAndVisible];
    
    [self appNeedsToRegisterForPush]; //Must be Added
    //After you created your views, ask AppoxeeManager to start its action.
    //You must pass the launchOptions dictionary to the manager so it can handle app activation from push.
    //This method will check the launchOption for Push values.
    //If the app was launched from a push message it will be handled by Appoxxe.
    
    //Make sure you call this method after loading any splash screens you might have.
    [[AppoxeeManager sharedManager] managerParseLaunchOptions:launchOptions];
    

    return YES;
}

-(void)appNeedsToRegisterForPush
{
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:(UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeSound | UIRemoteNotificationTypeAlert)];
}

- (NSString *) AppoxeeDelegateAppSDKID
{
    //Replace the "xxx" with your SDK key.
    //Copy the SDK key as it was generated when you added a new app.
    //You can now find it under App Settings
    return @"526d9513b397e5.93416907";
}
- (NSString *) AppoxeeDelegateAppSecret
{
    //Replace the "xxx" with your SDK Secret key.
    //Copy the SDK Secret key as it was generated when you added a new app.
    //You can now find it under App Settings
    return @"526d9513b399f4.57468614";
}
- (void) AppoxeeNeedsToUpdateBadge:(int)badgeNum hasNumberChanged:(BOOL)hasNumberChanged
{
    //Here you should update your display to let the user know about the unread messages.
    //Here's an example code which uses Appoxee's inherent badge view:
    NSString *badgeText = NULL;
    if(badgeNum > 0)
    {
        badgeText = [NSString stringWithFormat:@"%d",badgeNum];
    }
    
    //Use the Appoxee "helper" method to display the badge on a button.
    //Make sure the button is not null (meaning that your view's nib file is already loaded).
    
    //If your Appoxxe delegate receives this method prior to loading of the UIView on which the
    //badge will be display (in this case 'AppoxeeButton') then please save the badgeNum and
    //put it on the view after it finished loading.
    
    //Please note that you can modify the location of the badge on your UIView using the
    //badgeLoaction param. In this case we put the badge at the top left most corner of
    //AppoxeeButton view.
    
    //Here for example we use the badgeNum to update the external app badge.
    [UIApplication sharedApplication].applicationIconBadgeNumber = badgeNum;
}
- (void) AppoxeeDelegateReciveAppoxeeClosed
{
    //Implement your own code.
    //This method is called when the Appoxee client has been closed.
    //This method will only be fired while the Appoxee is in modal operation mode.
}
- (void) AppoxeeDelegateReciveAppoxeeRequestFocus
{
    //Implement your own code.
    //This method is called when the Appoxee client wants to show. It is used mostly when
    //activating Appoxee in a non-modal operation.
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    // Forward the call to the AppoxeeManager
    if([[AppoxeeManager sharedManager] didReceiveRemoteNotification:userInfo])
    {
        // If the manager handled the event.. return
        return;
    }
    //Otherwise do what you want because the push didn't came from Appoxee.
}
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)token
{
    // Forward the call to the AppoxeeManager
    [[AppoxeeManager sharedManager] didRegisterForRemoteNotificationsWithDeviceToken:token];
}


// this happens while we are running ( in the background, or from within our own app )
// only valid if CTC_ET-Info.plist specifies a protocol to handle
- (BOOL)application:(UIApplication*)application handleOpenURL:(NSURL*)url
{
    if (!url) {
        return NO;
    }

    // calls into javascript global function 'handleOpenURL'
    NSString* jsString = [NSString stringWithFormat:@"handleOpenURL(\"%@\");", url];
    [self.viewController.webView stringByEvaluatingJavaScriptFromString:jsString];
    self.viewController.webView.scrollView.scrollEnabled = NO;
    self.viewController.webView.scrollView.bounces = NO;

    // all plugins will get the notification, and their handlers will be called
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];

    return YES;
}

// repost the localnotification using the default NSNotificationCenter so multiple plugins may respond
- (void)           application:(UIApplication*)application
   didReceiveLocalNotification:(UILocalNotification*)notification
{
    // re-post ( broadcast )
    [[NSNotificationCenter defaultCenter] postNotificationName:CDVLocalNotification object:notification];
}

- (NSUInteger)application:(UIApplication*)application supportedInterfaceOrientationsForWindow:(UIWindow*)window
{
    // iPhone doesn't support upside down by default, while the iPad does.  Override to allow all orientations always, and let the root view controller decide what's allowed (the supported orientations mask gets intersected).
    NSUInteger supportedInterfaceOrientations = (1 << UIInterfaceOrientationPortrait) | (1 << UIInterfaceOrientationLandscapeLeft) | (1 << UIInterfaceOrientationLandscapeRight) | (1 << UIInterfaceOrientationPortraitUpsideDown);

    return supportedInterfaceOrientations;
}

@end
