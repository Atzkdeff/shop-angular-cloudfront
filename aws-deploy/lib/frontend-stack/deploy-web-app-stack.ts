import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

import { DeploymentService } from './deployment-service';

export class DeployWebAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsHometaskQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    new DeploymentService(this, 'deployment');
  }
}
