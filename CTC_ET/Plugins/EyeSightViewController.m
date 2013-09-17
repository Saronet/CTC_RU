
//
//  ViewController.m
//  EyeSightSDKExampleProj
//
//  Created by Tal Shulman on 1/3/12.
//  Copyright (c) 2012 eyeSight. All rights reserved.
//

#import "EyeSightViewController.h"



@implementation EyeSightViewController
@synthesize mDirection = _mDirection;


bool mIsDirectionSetToLeftRight = true;

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

IOS5_SDK * eyeSightCore;


- (void)viewDidLoad
{
    [super viewDidLoad];
    
     NSLog(@"Start");

    
    @try {
        
        m_sProducType = TYPE_EYECAN_SINGLE;
        // Init the gesture recognition engine
        eyeSightCore = [[IOS5_SDK alloc] init];
        // Set Orientation mode - Sets the orientation in which the gesture recognition engine is detecting the gesures.
       	[eyeSightCore InitEyeSightEngine:m_sProducType Orientation:ORIENTATION_PORTRAIT];
        // Register as EyeSightDelegate for recieving gesture recognition callbacks
        [eyeSightCore RegisterEyeSightEngine:self];
        // Start the gesture recognetion engine
        [eyeSightCore StartEyeSightEngine];
        //set gesture direction detection
        if(mIsDirectionSetToLeftRight){
            [eyeSightCore SetLeftRight];
        }
        else{
            [eyeSightCore SetUpDown];
        }
        //Indicating whether the system should print debug information 
        [eyeSightCore ShouldPrintDebugInformation:true];
        m_bEngineStarted = true;
        
    }
    @catch(NSException *e) {
        
    }

        
	// Do any additional setup after loading the view, typically from a nib.
    
    
}

- (IBAction)ChangeToLeftRight {
    mIsDirectionSetToLeftRight = true;
    [eyeSightCore SetLeftRight];
}

- (IBAction)ChangeToUpDown {
    mIsDirectionSetToLeftRight = false; 
    [eyeSightCore SetUpDown];
}


/**
 set detection output to be Up Down or Right Left
 */
- (IBAction)ChangeDirection{
    if(mIsDirectionSetToLeftRight)
    {
     //   [self.mDirection setTitle:@"Up Down" forState:UIControlStateNormal];
     //   [eyeSightCore SetUpDown];
        mIsDirectionSetToLeftRight = false;        
    }else {
     //   [self.mDirection setTitle:@"Left Right" forState:UIControlStateNormal];
     //   [eyeSightCore SetLeftRight];
        mIsDirectionSetToLeftRight = true;   
    }
}

/**
 Set EyeSight to active or inactive
 */
- (void)StartEngine
{
    if(self->m_bEngineStarted)
    {

    }
    else
    {
        [eyeSightCore StartEyeSightEngine];
        
         self->m_bEngineStarted = true;
    }
}

- (void)StopEngine
{
    if(self->m_bEngineStarted)
    {
        [eyeSightCore StopEyeSightEngine];
        
        self->m_bEngineStarted = false;
    }
}



- (void)viewDidUnload
{
    [self setMDirection:nil];
    [self setMDirection:nil];
    [super viewDidUnload];
    
    [eyeSightCore StopEyeSightEngine];
    
    self->m_bEngineStarted = false;
    
    [_action release];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated
{
	[super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated
{
	[super viewDidDisappear:animated];
}


//////////////////////////////////////////////////////////////
///////////////implementation functions of the Delegate//////////////////////
/////////////////////////////////////////////////////////////////////////////


/**
 Handle the gesture recognition output when using the eyeCan Single product
 @param eyeSightOut holds the gesture recognition output
 */
-(void)HandleEyeSightOutput:(struct EyeSightSDKOutput*)eyeSightOut
{
    if(0 == eyeSightOut->nNumberOfUsers)
         return;
    /* Look into the index of User Zero (index 0) for acting on the detected gesture */
    switch (eyeSightOut->nEyeCanData[0].sActionType) {
        case RIGHT:
            NSLog(@"Right"); 
            [[NSNotificationCenter defaultCenter]
             postNotificationName:@"RightGesture"
             object:nil ];
            break;
        case LEFT:
            NSLog(@"Left");
            [[NSNotificationCenter defaultCenter]
            postNotificationName:@"LeftGesture"
            object:nil ];
            break;
        case UP:
            [[NSNotificationCenter defaultCenter]
            postNotificationName:@"UpGesture"
            object:nil ]; 
            break;
        case DOWN:
            [[NSNotificationCenter defaultCenter]
            postNotificationName:@"DownGesture"
            object:nil ];
            break;
        case WAVE_RIGHT_LEFT:
        case WAVE_LEFT_RIGHT:
            NSLog(@"Wave");
            break;
        case SELECT:
            [[NSNotificationCenter defaultCenter]
             postNotificationName:@"SelectGesture"
             object:nil ];
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
    switch (error){ 
        case ERR_INSUFFICIENT_FPS_REOPEN_WITH_BETTER_LIGHT_CONDITIONS:
            [_error setText:@"ERR_INSUFFICIENT_FPS_REOPEN_WITH_BETTER_LIGHT_CONDITIONS"]; 
            break;

        default:
            break;
    }

    
}

/** Used for rotating the screen according to the device orientation */
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation {
    return YES;}


/**
	Handle status messages arriving from the gesture recognition engine
	@param status - status message code
 */
-(void)HandleEyeSightStatus:(enum EyeSightStatus)status
{
    switch (status){ 
        case STATE_DETECTION_STARTED:
            [_status setText:@"STATE_DETECTION_STARTED"]; 
            break;
        case STATE_DETECTION_STOPPED:
            [_status setText:@"STATE_DETECTION_STOPPED"]; 
            break;
        case STATE_ORIENTATION_CHANGE_DETECTED:
            [_status setText:@"ORIENTATION_CHANGE_DETECTED"]; 
            break;
        case STATE_ORIENTATION_CHANGE_COMPLETED:
            [_status setText:@"ORIENTATION_CHANGE_COMPLETED"];
            break;
            /** Message provided when the Accelerometer detects the device is stable enough to re-enable the gesture recognition engine*/
        case STATE_STABLE:
            [_status setText:@"STAT_STABLE"];
            break;
        /** Message provided when the Accelerometer detects the device is in an unstable mode, preventing it from providing gesture recognition. Gesture recognition is disabled */            
        case STATE_UNSTABLE:
            [_status setText:@"STAT_UNSTABLE"];
            break;             
        default:
            break;
    }
}


- (void)dealloc {
    [_mDirection release];
    [_mDirection release];
    [super dealloc];
}
@end
