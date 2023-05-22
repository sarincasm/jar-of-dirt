# Pulumi - Deploying and S3 Website using TS

This is a simple example of how to deploy a static website to S3 using Pulumi and Typescript.

## Getting Started

```bash
pulumi new aws-typescript
pulumi config set aws:profile eels.de.main
pulumi up
```

## Check output

```
aws s3 ls $(pulumi stack output bucketName)
curl $(pulumi stack output bucketEndpoint)
```

## Clean up

(This will also remove the Pulumi.prod yaml file. Check the file (Deleted) for what it should look like).

```bash
pulumi destroy
pulumi stack rm
```

## Useful Links

-  [Pulumi Quick Start](https://www.pulumi.com/docs/clouds/aws/get-started/create-project/)
-  [Setting AWS Profile](https://www.pulumi.com/registry/packages/aws/installation-configuration/#configuration)
-  [AWS Toolkit - VS Code](https://aws.amazon.com/visualstudiocode/)
