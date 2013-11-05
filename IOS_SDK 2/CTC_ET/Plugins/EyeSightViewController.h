//
//  ViewController.h
//  EyeSightSDKExampleProj
//
//  Created by Tal Shulman on 1/3/12.
//  Copyright (c) 2012 eyeSight. All rights reserved.
//


#import <UIKit/UIKit.h>
#import "IOS5_SDK.h"
#import "EyeSightDelegate.h"

/**
	
 */
@interface EyeSightViewController : UIViewController<EyeSightDelegate>

{
    IBOutlet UILabel *_Fps;
    IBOutlet UILabel *_action;
    IBOutlet UILabel *_numOfUsers;
    IBOutlet UILabel *_status;
    IBOutlet UILabel *_error;
    
    ProducType m_sProducType;
    bool m_bEngineStarted;
    
    UIButton *mDirection;
}
- (IBAction)ChangeDirection:(id)sender;
- (IBAction)ChangeToLeftRight;
- (IBAction)ChangeToUpDown;

@property (retain, nonatomic) IBOutlet UIButton *mDirection;
@property (nonatomic) bool mIsDirectionSetToLeftRight;

- (IBAction)StartEngine;
- (IBAction)StopEngine;


@end
