//! Write an HTTP server that handles file paths. Implement the following:
// !• Task 1.1: Respond with a breakdown of a given file path (e.g., extract root,
//! directory, file name, and extension) and return the full path in a formatted string.
// ! o URL: POST /path-info (Get the file path from the body)
// ! o Input: Provide a file path, such as C:/Users/example/project/sample.txt.

//? postman : path-info
// const http = require("http");
// const url = require("url");
// const path = require("path");

// const server = http.createServer((req, res, next) => {
//   if (req.method === "POST" && req.url === "path-info") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       try {
//         const filePath = JSON.parse(body);
//         if (!filePath) {
//           res.writeHead(400, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify({ error: "filePath is error" }));
//         }
//         const root = path.parse(filePath).root;
//         const directory = path.dirname(filePath);
//         const fileName = path.basename(filePath);
//         const extension = path.extname(filePath);
//         const baseName = path.basename(filePath, extension);

//         const pathInfo = {
//           fullPath: filePath,
//           root,
//           directory,
//           fileName,
//           extension,
//           baseName,
//         };
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(pathInfo));
//       } catch (error) {
//         res.writeHead(400, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Invalid JSON format" }));
//       }
//     });
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Not Found" }));
//   }
// });
// server.listen(3000, () => {
//   console.log(`Server is running on http://localhost:3000`);
// });




// ! Task 1.2: checks if a provided file path is absolute and returns additional path-
// ! related information (Ensure that you use path.join() to handle the correct path
// ! separators for your file system (i.e., using / or \ as appropriate)).
// ! o URL: POST /path-check
// ! o Input: Provide a relative or absolute file path in the request body (e.g.,
// ! ./data/file.txt or /Users/example/project/data/file.txt).

// ? postman: path-check
// const http = require("http");
// const url = require("url");
// const path = require("path");
// const server = http.createServer((req, res) => {
//   if (req.method === "POST" && req.url === "/path-info") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       try {
//         const filePath = JSON.parse(body);
//         if (!filePath) {
//           res.writeHead(400, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify({ error: "filePath is error" }));
//         }
//         const root = path.parse(filePath).root;
//         const directory = path.dirname(filePath);
//         const fileName = path.basename(filePath);
//         const extension = path.extname(filePath);
//         const baseName = path.basename(filePath, extension);

//         const pathInfo = {
//           fullPath: filePath,
//           root,
//           directory,
//           fileName,
//           extension,
//           baseName,
//         };
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(pathInfo));
//       } catch (error) {
//         res.writeHead(400, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Invalid JSON format" }));
//       }
//     });
//   } else if (req.method === "POST" && req.url === "/path-check") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       try {
//         const filePath = JSON.parse(body);
//         const isAbsolute = path.isAbsolute(filePath);
//         const normalizedPath = path.normalize(filePath);
//         const message = isAbsolute
//           ? "The provided path is an absolute path."
//           : "The provided path is a relative path.";
          
//         const pathInfo = {
//           isAbsolute,
//           normalizedPath,
//           message,
//         };
        
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(pathInfo));
//       } catch (error) {
//         res.writeHead(400, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Invalid JSON format" }));
//       }
//     });
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Not Found" }));
//   }
// });
// server.listen(3000, () => {
//   console.log(`Server is running on http://localhost:3000`);
// });




// ! 2. Events Module (2 Grades)
// ! Create an event emitter to handle file operations. Implement the following:
// !• Task 2: Emit an event when a file is created, read, or deleted.
// !o URLs:
// !▪ POST /create-file (Get the file name from the body)
// !▪ DELETE /delete-file (Get the file name from the body)
// !o Input Example for File Creation:
// !o Expected Output (Event Logged to the console):
// !“Event emitted: fileCreated for example.txt”

// const http = require("http");
// const path = require("path");
// const EventEmitter = require("events");
// class FileEmitter extends EventEmitter {}
// const fileEmitter = new FileEmitter();
// fileEmitter.on("fileCreated", (fileName) => {
//   console.log(`Event emitted: fileCreated for ${fileName}`);
// });

// fileEmitter.on("fileDeleted", (fileName) => {
//   console.log(`Event emitted: fileDeleted for ${fileName}`);
// });

// const server = http.createServer((req, res) => {
//   if (req.method === "POST" && req.url === "/create-file") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       try {
//         const { fileName } = JSON.parse(body);
//         if (!fileName) {
//           res.writeHead(400, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify({ error: "fileName is required" }));
//         }
//         fileEmitter.emit("fileCreated", fileName);
        
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ message: `File ${fileName} created.` }));
//       } catch (error) {
//         res.writeHead(400, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Invalid JSON format" }));
//       }
//     });
//   } else if (req.method === "DELETE" && req.url === "/delete-file") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       try {
//         const { fileName } = JSON.parse(body);
//         if (!fileName) {
//           res.writeHead(400, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify({ error: "fileName is required" }));
//         }
//         fileEmitter.emit("fileDeleted", fileName);
        
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ message: `File ${fileName} deleted.` }));
//       } catch (error) {
//         res.writeHead(400, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Invalid JSON format" }));
//       }
//     });
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Not Found" }));
//   }
// });


// server.listen(3000, () => {
//   console.log(`Server is running on http://localhost:3000`);
// });


// !3. OS Module (1 Grades) (Search Point)
// !Gather system information and return it in the response.
// !• Task: Respond with the system’s architecture, platform, free memory, and total memory.
// !o URL: GET /system-info
// !o Expected Output:
// ? search internet
// const http = require("http");
// const url = require("url");
// const path = require("path");
// const os = require("os"); 

// const server = http.createServer((req, res) => {
//   if (req.method === "GET" && req.url === "/system-info") {
//     const systemInfo = {
//       architecture: os.arch(), 
//       platform: os.platform(), 
//       freeMemory: os.freemem(), 
//       totalMemory: os.totalmem(),
//     };

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(systemInfo));
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Not Found" }));
//   }
// });

// server.listen(3000, () => {
//   console.log(`Server is running on http://localhost:3000`);
// });


// !4. File System Module (2 Grades)
// !Perform file-based CRUD operations using a file to store data.
// !o Task 3.1: Create and delete a file.
// !• URLs:
// !o POST /create-file (Get the file name from the body)
// !o DELETE /delete-file (Get the file name from the body)
// !• Input Example for File Creation:

// !• Expected Output: The file is created, read, or deleted, and the relevant content
// !or confirmation message is sent back.
// !• Example (After creating the file):
const http = require("http");
const fs = require("fs"); 
const url = require("url");
const path = require("path");
const os = require("os");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/create-file") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { fileName } = JSON.parse(body); 

      fs.writeFile(fileName, "This is a new file.", (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "File could not be created" }));
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: 'File created successfully ' }));
      });
    });
  } else if (req.method === "DELETE" && req.url === "/delete-file") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { fileName } = JSON.parse(body); 

      fs.unlink(fileName, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "File could not be deleted" }));
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: 'File deleted ' }));
      });
    });
  } else if (req.method === "GET" && req.url === "/system-info") {
    const systemInfo = {
      architecture: os.arch(),
      platform: os.platform(),
      freeMemory: os.freemem(),
      totalMemory: os.totalmem(),
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(systemInfo));

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});


// !Task 3.2: Asynchronously read from and append to a file. Use path.join() to create
// !the file path and path.resolve() to get the absolute path before performing the read
// !and write operations.
// !• URLs:
// !o POST /append-async (Get the file name from the body)
// !o POST /read-async (Get the file name from the body)
// !• Input Example for Asynchronous File Write:

// !• Expected Output: The file is written or read asynchronously, with a confirmation message

// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const server = http.createServer((req, res) => {
//   if (req.method === "POST" && req.url === "/append-async") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       const { fileName, content } = JSON.parse(body); 

//       const filePath = path.join(__dirname, fileName); 
//       const absolutePath = path.resolve(filePath); 

//       fs.appendFile(absolutePath, content + "\n", (err) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify({ error: "Could not append to file" }));
//         }
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ message: `Content appended to file: ${fileName}` }));
//       });
//     });
//   } else if (req.method === "POST" && req.url === "/read-async") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       const { fileName } = JSON.parse(body);

//       const filePath = path.join(__dirname, fileName); 
//       const absolutePath = path.resolve(filePath); 

//       fs.readFile(absolutePath, "utf8", (err, data) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify({ error: "Could not read file" }));
//         }
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ message: `Content of ${fileName}:`, content: data }));
//       });
//     });

//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Not Found" }));
//   }
// });

// server.listen(3000, () => {
//   console.log(`Server is running on http://localhost:3000`);
// });



// !5. Streams (3 Grades)
// !• Task 5.1 Create a readable stream that reads data from a file (buffer size will be “16”
// !and make it automatically close when it ends) and pipes it to the response.
// !Implement error handling for stream events.
// !o URL: POST /stream-file (Get the file name from the body)
// !o Expected Output: Stream the contents of data.txt to the client, logging
// !relevant stream events to the console and if there is any error, return it in
// !the response to the user
// !o Example Console Output:
// !Stream opened
// !Data event received: [data chunk]
// !Stream ended

// const http = require("http");
// const fs = require("fs");
// const path = require("path");
// const server = http.createServer((req, res) => {
//   if (req.method === "POST" && req.url === "/stream-file") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });

//     req.on("end", () => {
//       const { fileName } = JSON.parse(body); 
//       const filePath = path.join(__dirname, fileName); 

//       const readStream = fs.createReadStream(filePath, { highWaterMark: 16 }); 
//       readStream.on("open", () => {
//         console.log("Stream opened");
//       });

//       readStream.on("data", (chunk) => {
//         console.log(`Data event received: ${chunk}`);
//         res.write(chunk); 
//       });

//       readStream.on("end", () => {
//         console.log("Stream ended");
//         res.end(); 
//       });

//       readStream.on("error", (err) => {
//         console.error("Stream error:", err);
//         res.writeHead(500, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Error reading file", details: err.message }));
//       });
//     });
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Not Found" }));
//   }
// });

// server.listen(3000, () => {
//   console.log(`Server is running on http://localhost:3000`);
// });



// !Task 5.2: Stream data from one file to another.
// !o Input Example:

// !o URL: POST /copy-file
// !o Expected Output: The file is successfully copied, and a message confirming
// !the operation is sent back.

// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const server = http.createServer((req, res) => {
//   if (req.method === "POST" && req.url === "/copy-file") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });

//     req.on("end", () => {
//       const { sourceFileName, destinationFileName } = JSON.parse(body);
//       const sourceFilePath = path.join(__dirname, sourceFileName); 
//       const destinationFilePath = path.join(__dirname, destinationFileName); 
//       const readStream = fs.createReadStream(sourceFilePath);
//       const writeStream = fs.createWriteStream(destinationFilePath);
//       readStream.pipe(writeStream);
//       writeStream.on("finish", () => {
//         console.log(`File copied from ${sourceFileName} to ${destinationFileName}`);
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ message: "File copied successfully." }));
//       });

//       writeStream.on("error", (err) => {
//         console.error("Write stream error:", err);
//         res.writeHead(500, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Error writing to file", details: err.message }));
//       });

//       readStream.on("error", (err) => {
//         console.error("Read stream error:", err);
//         res.writeHead(500, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Error reading source file", details: err.message }));
//       });
//     });
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Not Found" }));
//   }
// });
// server.listen(3000, () => {
//   console.log(`Server is running on http://localhost:3000`);
// });






// !• Task 5.3: Stream Transformation with Gzip Compression
// !o Description: Read a file, compress its content using Gzip
// !o URL: POST /compress-file (Get the file name from the body)
// !o Expected Output: The compressed file content is stored on your machine and
// !return response with message done to the user.

// const http = require("http");
// const fs = require("fs");
// const path = require("path");
// const zlib = require("zlib");

// const server = http.createServer((req, res) => {
//   if (req.method === "POST" && req.url === "/compress-file") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });

//     req.on("end", () => {
//       const { fileName } = JSON.parse(body); 
//       const filePath = path.join(__dirname, fileName); 
//       const compressedFilePath = path.join(__dirname, `${fileName}.gz`); 
//       const readStream = fs.createReadStream(filePath);
//       const gzip = zlib.createGzip();
//       const writeStream = fs.createWriteStream(compressedFilePath);
//       readStream.pipe(gzip).pipe(writeStream);

//       writeStream.on("finish", () => {
//         console.log(`File compressed and saved as ${compressedFilePath}`);
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ message: "File compressed successfully." }));
//       });

//       writeStream.on("error", (err) => {
//         console.error("Write stream error:", err);
//         res.writeHead(500, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Error writing compressed file", details: err.message }));
//       });

//       readStream.on("error", (err) => {
//         console.error("Read stream error:", err);
//         res.writeHead(500, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Error reading source file", details: err.message }));
//       });
//     });
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Not Found" }));
//   }
// });

// server.listen(3000, () => {
//   console.log(`Server is running on http://localhost:3000`);
// });
