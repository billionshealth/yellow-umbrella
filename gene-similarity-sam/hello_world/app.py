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

    # print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')

    try:
        # Load the object and create a temporary file copy
        response = s3.get_object(Bucket=bucket, Key=key)
        file_lines = response['Body'].read().splitlines()
        with open('/tmp/file.txt', 'w', newline='') as f:
            for line in file_lines:
                f.write(line.decode('utf-8'))
                f.write('\r\n')

        # Load SNP dataframes for both genotype files
        file1_SNPs = SNPs('/tmp/file.txt').snps
        file2_SNPs = SNPs('/tmp/file.txt').snps
            # TODO: upload file_2 directory to reference genome

        # Create dataframe with overlapping genotypes (based on rsid in index)
        overlapping_genotypes = file1_SNPs.join(file2_SNPs, how='inner', lsuffix='_1', rsuffix='_2')

        # Calculate total number of unique SNPs across both genotypes
        n_overlap = len(overlapping_genotypes)
        total_snps = (len(file1_SNPs) - n_overlap) + (len(file2_SNPs) - n_overlap) + n_overlap

        # Create dataframe with genotypic variants identical between both files
        identical_overlaps = overlapping_genotypes.loc[overlapping_genotypes.genotype_1 
                                                    != overlapping_genotypes.genotype_2]

        # Calculate percentage of identical overlapping genotypic variants
        n_ident_overlaps = len(identical_overlaps)
        pct_overlap = n_ident_overlaps / total_snps

        # TODO: add noise function and capping at 100%

        print(f"Percentage overlap is {pct_overlap*100}.")

        return pct_overlap

    except Exception as e:
        print(e)
        print('Some kind of error...')
        raise e
        # TODO: update the error handling
