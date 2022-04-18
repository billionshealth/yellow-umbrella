# import arv
import argparse

parser = argparse.ArgumentParser(description='Defining files for comparison')
parser.add_argument('files_to_compare', type=str, nargs=2, 
                    help='Paths to the files to compare')
                    # TODO: enable comparison of more than 2 files

# TODO: add specification of whether 23andme file vs other type (e.g. VCF)

args = parser.parse_args()



if __name__ == "__main__":
    print(f"file 1 location: {args.files_to_compare[0]}")
    print(f"file 2 location: {args.files_to_compare[1]}")

    # TODO: call the function to run the comparison here

