# File Manager

## Description

Simple implementation of File Manager using Node.js APIs created as a homework at course [NodeJS 2024Q3](https://rs.school/courses/nodejs)

The file manager is able to do the following:

- Work using CLI
- Perform basic file operations (copy, move, delete, rename, etc.)
- Utilize Streams API
- Get information about the host machine operating system
- Perform hash calculations
- Compress and decompress files

## Technical requirements

- Any external tools and libraries are not used. There's no any dependencies
- Tested on recommended 22.x.x version of Node.js (exactly v22.9.0)
- Prefered asynchronous API whenever possible

## Usage

- The program is started by npm-script `start` in following way:
```bash
npm run start -- --username=your_username
```

- To finish work press `ctrl + c` or sent `.exit` command into console

- Programm starts with current user's home directory

- By default program prompt user in console to print commands and returns a result

- Allowed operations are: `up`, `cd`, `ls`, `cat`, `add`, `rn`, `cp`, `mv`, `rm`,
 `os`, `hash`, `compress`, `decompress`, `.exit`
  
- In case of unknown operation or invalid input (missing mandatory arguments, wrong data in arguments, etc.) `Invalid input` message will be shown and user can enter another command
  
- In case of error during execution of operation (e.g. attempt to perform an operation on a non-existent file or work on a non-existent path, etc.) `Operation failed` message will be shown and user can enter another command 

## List of operations and their syntax
- Navigation & working directory (nwd)
    - Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)  
    ```bash
    up
    ```
    - Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute)
    *(✅ spases in file/folder name are supported!)*
    ```bash
    cd path_to_directory
    ```
    - Print in console list of all files and folders in current directory containing:
        - files and folder names (for files - with extension)
        - folders and files are sorted in alphabetical order ascending, but list of folders goes first
        - type of directory or file marked as a corresponding  value in column Type
    ```bash
    ls
    ```
- Basic operations with files
    - Read file and print it's content in console (using Readable stream)  
    *(✅ spases in file/folder name are supported!)*: 
    ```bash
    cat path_to_file
    ```
    - Create empty file in current working directory  
    *(✅ spases in file/folder name are supported!)*: 
    ```bash
    add new_file_name
    ```
    - Rename file (content remain unchanged)  
    *(⚠️ spases in file/folder name are NOT supported!)*: 
    ```bash
    rn path_to_file new_filename
    ```
    - Copy file (using Readable and Writable streams)  
    *(⚠️ spases in file/folder name are NOT supported!)*: 
    ```bash
    cp path_to_file path_to_new_directory
    ```
    - Move file (same as copy but initial file is deleted, copying use Readable and Writable streams)  
    *(⚠️ spases in file/folder name are NOT supported!)*: 
    ```bash
    mv path_to_file path_to_new_directory
    ```
    - Delete file  
    *(✅ spases in file/folder name are supported!)*: 
    ```bash
    rm path_to_file
    ```
- Operating system info (prints following information in console)
    - Get EOL (default system End-Of-Line) and print it to console  
    ```bash
    os --EOL
    ```
    - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console  
    ```bash
    os --cpus
    ```
    - Get home directory and print it to console  
    ```bash
    os --homedir
    ```
    - Get current *system user name* (may be different from username that is set when the application starts) and print it to console  
    ```bash
    os --username
    ```
    - Get CPU architecture for which Node.js binary has compiled and print it to console  
    ```bash
    os --architecture
    ```
- Hash calculation  
    - Calculate hash for file and print it into console  
    - *(✅ spases in file/folder name are supported!)*
    ```bash
    hash path_to_file
    ```
- Compress and decompress operations  
    - Compress file (using Brotli algorithm, using Streams API)  
    *(⚠️ spases in file/folder name are NOT supported!)*:
    ```bash
    compress path_to_file path_to_destination
    ```
    - Decompress file (using Brotli algorithm, using Streams API)  
    *(⚠️ spases in file/folder name are NOT supported!)*:
    ```bash
    decompress path_to_file path_to_destination
    ```  

## Score

### Basic Scope
- General
    - [x] **+6** Application accepts username and prints proper message
    - [x] **+10** Application exits if user pressed `ctrl+c` or sent `.exit` command and proper message is printed
- Operations fail
    - [x] **+20** Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail
    - [x] **+10** Operation fail doesn't crash application
- Navigation & working directory operations implemented properly
    - [x] **+10** Go upper from current directory
    - [x] **+10** Go to dedicated folder from current directory
    - [x] **+20** List all files and folders in current directory
- Basic operations with files implemented properly
    - [x] **+10** Read file and print it's content in console
    - [x] **+10** Create empty file
    - [x] **+10** Rename file
    - [x] **+10** Copy file
    - [x] **+10** Move file
    - [x] **+10** Delete file
- Operating system info (prints following information in console) implemented properly
    - [x] **+6** Get EOL (default system End-Of-Line)
    - [x] **+10** Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
    - [x] **+6** Get home directory
    - [x] **+6** Get current *system user name* (Do not confuse with the username that is set when the application starts)
    - [x] **+6** Get CPU architecture for which Node.js binary has compiled
- Hash calculation implemented properly
    - [x] **+20** Calculate hash for file 
- Compress and decompress operations
    - [x] **+20** Compress file (using Brotli algorithm)
    - [x] **+20** Decompress file (using Brotli algorithm)

### Advanced Scope

- [x] **+30** All operations marked as to be implemented using certain streams should be performed using Streams API
- [x] **+20** No synchronous Node.js API with asynchronous analogues is used (e.g. not used `readFileSync` instead of `readFile`)  
- [x] **+20** Codebase is written in ESM modules instead of CommonJS
- [x] **+20** Codebase is separated (at 7 modules)


### Forfeits
- [ ] 95% of total task score Any external tools/libraries are used **- not used**
- [ ] 30% of total task score Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.) **- there's no commits after deadline (2024-10-15 03:00  (UTC +03:00))**


### Total score - **330** points