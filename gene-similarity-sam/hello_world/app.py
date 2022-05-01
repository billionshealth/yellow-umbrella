import json
import boto3
import requests
import urllib
import pandas as pd
from snps import SNPs

s3 = boto3.client('s3')

def lambda_handler(event, context):    
    """
    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format
        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
    context: object, required
        Lambda Context runtime methods and attributes
        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    """

    print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')

    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        print("CONTENT TYPE: " + response['ContentType'])

        # TODO: resolve issue that loaded file loses line structure
        # I think it's possible the boto read() function is causing the problem

        loaded_content = response['Body'].read().decode('utf-8')

        with open('/tmp/file.txt', 'w', newline='') as f:
            f.write(loaded_content)
            output = s3.upload_file('/tmp/file.txt', 'gene-comparison-sam-srcbucket-1s8psqn4njdct', 'test_folder/file.txt')

            # for line in response['Body'].read().splitlines():
            #     each_line = line.decode('utf-8')
            #     f.write(each_line)

        # print("trying to read the SNPs now...")
        # SNPs(response['Body'])
        # print("did I read the SNPs?")


        ## ==== SNP OVERLAP CODE - TO USE ONCE TXT FILE LOADING PROBLEM RESOLVED ==== ##

        ## Load SNP dataframes for both genotype files
        # file1_SNPs = SNPs(file1).snps
        # file2_SNPs = SNPs(file2).snps

        # # Create dataframe with overlapping genotypes (based on rsid in index)
        # overlapping_genotypes = file1_SNPs.join(file2_SNPs, how='inner', lsuffix='_1', rsuffix='_2')

        # # Calculate total number of unique SNPs across both genotypes
        # n_overlap = len(overlapping_genotypes)
        # total_snps = (len(file1_SNPs) - n_overlap) + (len(file2_SNPs) - n_overlap) + n_overlap

        # # Create dataframe with genotypic variants identical between both files
        # identical_overlaps = overlapping_genotypes.loc[overlapping_genotypes.genotype_1 
        #                                             != overlapping_genotypes.genotype_2]

        # # Calculate percentage of identical overlapping genotypic variants
        # n_ident_overlaps = len(identical_overlaps)
        # pct_overlap = n_ident_overlaps / total_snps

        # print(f"Percentage overlap is {pct_overlap}.")

        return response['ContentType']




    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e



    try:
        ip = requests.get("http://checkip.amazonaws.com/")
    except requests.RequestException as e:
        # Send some context about this error to Lambda Logs
        print(e)

        raise e

    return {
        "statusCode": 200,
        "body": json.dumps({
            # "personId": personId + " from Lambda" ,
            "location": ip.text.replace("\n", "")
 
        }),
    }
