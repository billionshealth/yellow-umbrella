# import arv
import argparse
import pandas as pd
from snps import SNPs

parser = argparse.ArgumentParser(description='Defining files for comparison')
parser.add_argument('files_to_compare', type=str, nargs=2, 
                    help='Paths to the files to compare')
                    # TODO: enable comparison of more than 2 files

# TODO: add specification of whether 23andme file vs other type (e.g. VCF)

args = parser.parse_args()


def calculate_pct_snp_overlap(file1, file2):

    # TODO: supress warnings

    # Load SNP dataframes for both genotype files
    file1_SNPs = SNPs(file1).snps
    file2_SNPs = SNPs(file2).snps

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

    print(f"Percentage overlap is {pct_overlap}.")

    return pct_overlap



if __name__ == "__main__":
    print(f"file 1 location: {args.files_to_compare[0]}")
    print(f"file 2 location: {args.files_to_compare[1]}")

    # TODO: add error handling for file not existing / having no SNPs

    calculate_pct_snp_overlap(args.files_to_compare[0], args.files_to_compare[1])
