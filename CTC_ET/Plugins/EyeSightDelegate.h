//
//  EyeSightDelegate.h
//  IOS5_SDK
//
//  Created by Tal Shulman on 1/3/12.
//  Copyright (c) 2012 eyeSight. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>


#define MAX_USERS 5
/**
 A list of all possible control messages produced by the engine.
 This list includes Engine Error codes.
 */
enum EyeSightError
{
    //**The fps is insufficient do to bad lighten */
    ERR_INSUFFICIENT_FPS_REOPEN_WITH_BETTER_LIGHT_CONDITIONS = 0
};

/**
 A list of all possible control messages produced by the engine.
 This list includes Engine Status Codes.
 */
enum EyeSightStatus
{
    //** The device is stable. actions are detected */
    STATE_STABLE = 0,
    //** The device is unstable. actions are filtered */
    STATE_UNSTABLE = 1,
    //** eyeSight gesture recognition engine is active */
    STATE_DETECTION_STARTED = 2,
    //** eyeSight gesture recognition engine is not active */
    STATE_DETECTION_STOPPED = 3,
    //** An orientation change was detected, changeing the detection orientation. Wait for STATE_ORIENTATION_CHANGE_COMPLETED*/
    STATE_ORIENTATION_CHANGE_DETECTED = 4,
    //** Orientation change within the recognition engine has completed */
    STATE_ORIENTATION_CHANGE_COMPLETED = 5
};



/**
 Possible hand gestures detected by eyeSight's gesture recognition engine
 */
enum ActionType
{
    
    RIGHT = 0, /** Right to left hand motion detected */
    LEFT = 180, /** Left to right hand motion detected */
    WAVE_RIGHT_LEFT = 11, /** Wave (right left) hand motion detected */
    SELECT = 2, /** Tap on the phones camera */
    WAVE_LEFT_RIGHT = 13, /** Wave (left right) hand motion detected*/
    UP = 90, /** Bottom up hand motion detected */
    DOWN = 270, /** Up to bottom hand motion detected */
    CLAP = 5, /** A Clap gesture moving both hands towards each other in front of the face was detected */
    UN_CLAP = 6, /** Separate both hands from a clap position */
    UNDEFINED = 7, /** an action was detected, but the type of the action couldn't be resolved */
    
};

/**
 Possible hand Shape detected by eyeSight's gesture recognition engine
 */
enum HandShapeType
{
    HAND = 0,
    FIST = 1,
};


/**
 EyeCan Gesture recognition output struct.
 delivers the recognition output of a single user.
 When working with the short distance solution it will holds the data on the detected gesture.
 When working with the long distance solution it will also hold the face detection data of a specific user
 */
struct SDKEyeCanOut{
    /** Holds the IDs of the detected gestures (See ActionType) */
    enum ActionType sActionType;
    /** Holds the IDs of the detected hand Shape(See HandShapeType) */ 
    enum HandShapeType sHandActionType;
    /** Holds whether the user gained control over the system and has an active gesture detection session */
    bool IsActive;
    /** When in long distance solution - Holds X the coordinate of center of the user's face */
    int nCenterX;
    /** When in long distance solution - Holds Y the coordinate of center of the user's face */
    int nCenterY;
    /** When in long distance solution - Holds the size of the user's face (Face Width = Face Height) */
    int nSize;
};


/**
 EyePoint finger tip tracking output struct.
 Delivers the finger tip tracking output of a single user.
 */
struct SDKEyePoint{
    /** Finger tip center X coordinate */
    int nTopCenteredFingerX;
    /** Finger tip center Y coordinate */
    int nTopCenteredFingerY;
};



/**
 Struct used to report eyeSight Gesture Recognition results for each processed frame,
 built from nNumberOfUsers, array of SDKEyeCanOut and array of SDKEyePoint.
 */
struct EyeSightSDKOutput
{
    
    int nNumberOfUsers;     /** When a Long distance solution is active will hold the number of possible users.
                             When in a short distance solution the active user is at index 0 */
    
    struct SDKEyeCanOut nEyeCanData[MAX_USERS];    /** an array of EyeCanOut outpot */
    
    struct SDKEyePoint nEyePoint[MAX_USERS];  /** an array of EyePoint outpot */ 
};



/**
 A protocol for handling notification callbacks (EyeSightSDKOutput) from the eyeSight Gesture Recognition.
 A class which use this protocol must be implemented in order to receive callbacks from the engine.
 eyeSight Callbacks are divided to: status, error and output.
 A class implementing this protocol should be passed to IOS5_SDK::RegisterEyeCanCallback
 in order to allow handling of gesture recognitions and status or error messages.
 */
@protocol EyeSightDelegate <NSObject>

@required

/**
 Called asynchronously when the engine has finished analyzing a frame.
 @param eyeSightOut EyeSightSDKOutput - the engine output
 */
-(void)HandleEyeSightOutput:(struct EyeSightSDKOutput*)eyeSightOut;

/**
 Called asynchronously when the engine has detected an error.
 @param error error is detected (Camera error, Init failed...).
 */
-(void)HandleEyeSightError:(enum EyeSightError)error;

/**
 Called asynchronously on a status change.
 @param status status the code of the new changed status
 */
-(void)HandleEyeSightStatus:(enum EyeSightStatus)status;

@end

