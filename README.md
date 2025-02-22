File Manager CLI

Description

This project is a simple file management system using Node.js and the fs/promises module. It allows users to:

Create a file

Delete a file

Rename a file

Append content to a file

All operations are triggered by writing specific commands in a command.txt file.

Installation

Prerequisites

Ensure you have Node.js installed on your system. You can download it from Node.js Official Website.

Clone the Repository

git clone <repository-url>
cd <repository-name>

Install Dependencies

npm install

Usage

Create a command.txt file in the root directory.

Run the script:

node index.js

Modify command.txt to trigger operations. The script watches for changes and processes commands accordingly.

Command Syntax

Create a file:

create a file <path>

Example:

create a file test.txt

Delete a file:

delete the file <path>

Example:

delete the file test.txt

Rename a file:

rename the file <old-path> to <new-path>

Example:

rename the file test.txt to new-test.txt

Add content to a file:

add to the file <path> this content: <content>

Example:

add to the file new-test.txt this content: Hello, World!

How It Works

The script reads command.txt for changes.

When modified, it extracts the command and executes the corresponding file operation.

If the file does not exist for certain operations (like delete or rename), it handles the error gracefully.

License

This project is licensed under the MIT License.

Author

Your Name

Mohamed Sameh
