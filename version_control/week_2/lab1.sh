
mkdir lab
cd lab/
touch file1.txt
mkdir dir1
mv file1.txt dir1/
touch file2.txt
mkdir -p dir2/dir3
mkdir -p dir2/dir3
mv file2.txt dir2/dir3/
cd dir2
touch file3.txt
mv file3.txt ../

#How many files exist in the lab directory?  1
#How many directories exist in the lab directory?  2
#How many directories exist in the dir2 directory?  1
#How many files exist in the the dir2 directory?  0
