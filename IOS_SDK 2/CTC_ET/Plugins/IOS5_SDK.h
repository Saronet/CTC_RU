//
//  IOS5_SDK.h
//  IOS5_SDK
//
//  Created by Tal Shulman on 1/2/12.
//  Copyright (c) 2012 eyeSight. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import "EyeSightDelegate.h"


/**
 The API collection which allows the use of eyeSight's Gesture Recognition Engine.
 */
@interface IOS5_SDK:NSObject
{
    
}


// Product Type. 
typedef enum{
    TYPE_EYECAN_SINGLE, // Left, Right, Up, Down, Select gesture.
    TYPE_EYECAN_MULTI,
    TYPE_EYE_POINT, // x,y points coordination.
}ProducType;

/**
 <#Description#>
 */
typedef enum 
{    
    //** Change detection orientation based on phone orientation*/
    ORIENTATION_AUTO = -1,
    //** Lock detection orientation on landscape left Device oriented horizontally, home button on the right*/
    ORIENTATION_LANDSCAPE_LEFT = 3,
    //** Lock detection orientation on landscape Right Device oriented horizontally, home button on the left*/
    ORIENTATION_LANDSCAPE_RIGHT =4,
    //** Lock detection orientation on portrait Device oriented vertically, home button on the bottom*/
    ORIENTATION_PORTRAIT = 1
}OrientationTypes;




/**
 Init the gesture recognition engine
 @param sProducType enum : 
 TYPE_EYECAN_SINGLE  -  Left, Right, Up, Down, Select gesture.
 TYPE_EYECAN_MULTI - 
 TYPE_EYE_POINT - x,y points coordination.
 @param sOrientation enum - Set Orientation mode - Sets the orientation in which the gesture recognition engine is detecting the gesures.
 ORIENTATION_AUTO - Change detection orientation based on phone orientation.
 ORIENTATION_LANDSCAPE_LEFT - Lock detection orientation on landscape left Device oriented horizontally, home button on the righ.
 ORIENTATION_LANDSCAPE_RIGHT - Lock detection orientation on portrait Device oriented vertically, home button on the bottom
 */
- (void)InitEyeSightEngine:(ProducType)sProducType Orientation:(OrientationTypes) sOrientation;

/**
 Start the gesture recognetion engine
 */
- (void)StartEyeSightEngine;

/**
 Stop the gesture recognetion engine
 */
- (void)StopEyeSightEngine;

/**
 Register as EyeSightDelegate for recieving gesture recognition callbacks
 @param delegate EyeSightDelegate callback.
 */
- (void)RegisterEyeSightEngine:(id<EyeSightDelegate>)delegate;


/**
    set detection output to be Up Down
 */
-(void)SetUpDown;

/**
 set detection output to be Right Left
 */
-(void)SetLeftRight;

/*
Indicating whether the system should print debug information 
 @param bool true if Should Print debug information
 */
-(void) ShouldPrintDebugInformation:(bool)bShouldPrint;

// Future Use
//- (NSString*)GetVersion;




@end
