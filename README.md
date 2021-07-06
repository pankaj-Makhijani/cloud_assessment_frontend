# How to use this project?

## Firstly creating frontend in our pc
The frontend is made by using reactjs and its pretty simple. It consists of a form with few basic details and an image. When the user submits we will send the data to the backend.
Mmake sure you have nodejs installed on your system.
Clone this repo, start frontnend using npm start and now your frontend is ready at http://localhost:3000

## Configuring frontend on ec2 instance
Firstly creating custom vpc with 3 subnets in 3 different zones(2 for autoscaling frontend and 1 for backend), Internet Gateway attach it to vpc, create route table and route traffic from 0.0.0.0/0 to internet gateway and in subnet associations attach your 3 custom subnets.

Create windows 2016 base EC2 instance in subnet 1, Go to server manager, add roles & features and start IIS web server.
Install nodejs, Download your frontend project and build it (using npm run build)

Now go to Server manager (Win+R write inetmgr). On left side click on your ec2 instance then click on view application pool and add application pool enter your app-name(keeping everything else as default). Now you can your application pool, right click on application pool go to advanced settings and click on identity then select custom account and click on set and enter ec2 credentials and click ok.

Now you have configured your application pool, its time to add website to this pool. click on add website, enter your app-name select your newly created application pool, in path select build folder of your app(created using npm run build) and click ok.

BOOM! Your website is up and running on public ip of your ec2 instance.

## Autoscaling, load balancing and cloudfront

### Autoscaling
Now as your frontend is up and running its time to autoscale our instance because due to heavy cpu usage or network traffic our nstance might fail and stop responding, so to provide high availability to the user apply autoscaling policy.
create AMI of your ec2 instance, go to launch configuration select your AMI image, select your security group created while creating frontend ec2 instance, goto advanced details select assign public ip to the newly created instances, select frontend instance keypair and fill everything else as per your requireent.
Now go to auto scaling group fill details as per your requirements(make sure to select your own vpc and multiple subnets in which you want to auto scale your instance).

Wohoo! Your instance are now attached to auto scaling groups are will provide high availability to your user.

### Load balancer
We are using load balancing here so that it can distribute incoming traffic in equal proportion to all the available instances so that 1 specific instance doesn't needs to handle heavy load. Here we have 3 types of load balancers network ELB,application ELB and Classic ELB. But we are going to use application load balancer.

Now go target group select target type as instances and your custom vpc fill everything else as per your choice and click next. In here it will show all the instances under that vpc select your frontend instance and click on Include as pending below button and click create.

Now go to load balancer, create -> select application load balancer, select internet facing -> select your vpc and subnets where your instances are kept -> select your security group or make new for load balancer -> select target group that you have previously created -> select your target instanes and click on add to register -> review -> create.

Open your load balancer DNS link in browser to view your website
Wohoo! you have created load balancer and now it will manage traffic across all your instances.

### CloudFront
Cloudfront is a contentt delivery network, AWS has 206 edge locations so when user visits your website for first time from specific region it will get content from origin. If we use cloudfront in that region then it will fetch content from the origin for the first time and store it in edge location. So whenever new user from that region access your website, it will serve content from its edge location and hence providing low latency to the user. 
Go to cloudfront select origin as load balancer you created previously and fill all the details as per your requirements.

## Use case of this Project
This project can be used when we want users to register for some specific event and send them registration details as soon as he clicks on registration button and at the same time we are notifying administrator that the new user registered for your event and storing the details into our database.

## Workflow
Cloudfront -> Load balancer -> auto scaled EC2 Instances -> frontend registration form -> backend -> storing details into rds -> storing image into s3 bucket -> sending user details into queue -> (lambda function getting items from the queue -> publish sns message to the admin about new registration) -> sending registration confirmation mail to the user. 

## Services used or learnings in this project
VPC
subnet
Internet gateway
route table
Security group
NACL
EC2 instances
AMI
Snapshot
attaching EBS volume
S3 bucket
IAM user, roles and policies
RDS
SQS
SNS
SES
Lambda Function
Auto scaling
load balancing
cloudfront

## Backend Part of this Project
Here is the link to know about the backend part of this Project - https://github.com/pankaj-Makhijani/cloud_assessment_backend
