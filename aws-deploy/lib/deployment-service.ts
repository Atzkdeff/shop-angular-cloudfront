import {
  CfnOutput,
  Stack,
  StackProps,
  aws_s3 as s3,
  aws_cloudfront as cloudFront,
  aws_cloudfront_origins as cloudfront_origins,
  aws_s3_deployment as s3_deployment,
  RemovalPolicy,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

const path = './aws-deploy/resources/build'; // your web app build

export class DeploymentService extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hostingBucket = new s3.Bucket(this, 'FrontendBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const distribution = new cloudFront.Distribution(
      this,
      'CloudfrontDistribution',
      {
        defaultBehavior: {
          origin: new cloudfront_origins.S3Origin(hostingBucket),
          viewerProtocolPolicy:
            cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: 'index.html',
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
          },
        ],
      },
    );

    new s3_deployment.BucketDeployment(this, 'BucketDeployment', {
      sources: [s3_deployment.Source.asset(path)],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    new CfnOutput(this, 'CloudFrontURL', {
      value: distribution.domainName,
      description: 'The distribution URL',
      exportName: 'CloudfrontURL',
    });

    new CfnOutput(this, 'BucketName', {
      value: hostingBucket.bucketName,
      description: 'The name of the S3 bucket',
      exportName: 'BucketName',
    });
  }
}
