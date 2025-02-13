import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as docx from "docx";
import mammoth from "mammoth";

const WordWatermarkApp = () => {
  const [file, setFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState("");
         // Define custom style for the document's text (can be any name)
        const customStyle = {
            paragraph: {
              alignment: docx.AlignmentType.LEFT, // Left align text
              spacing: { after: 200 }, // Add space after each paragraph
            },
            run: {
              font: "Times New Roman", // Custom font
              size: 24, // Custom size for the text
              color: "0000FF", // Blue color
              bold: true, // Make text bold
            },
          };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleWatermarkChange = (e) => {
    setWatermarkText(e.target.value);
  };

  const addWatermark = async () => {
    if (!file || !watermarkText) {
      alert("Please upload a file and enter watermark text");
      return;
    }

    // Read file content
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;

      // Extract text using Mammoth.js
      mammoth.extractRawText({ arrayBuffer }).then(async (result) => {
        const documentText = result.value; // Extracted text from .docx

        const doc = new docx.Document({
          sections: [
            {
              properties: {},
              headers: {
                default: new docx.Header({
                  children: [
                    new docx.Paragraph({
                      children: [
                        new docx.TextRun({
                          text: watermarkText,
                          color: "000000",
                          font: "Arial",
                          size: 60,
                          bold: true,
                          opacity: 0.2, // Transparent watermark
                        }),
                      ],
                      alignment: docx.AlignmentType.CENTER,
                      spacing: { before: 300 },
                    }),
                  ],
                }),
              },
              children: [
                new docx.Paragraph({
                    text: documentText, // Preserve original content
                    style: customStyle.paragraph, // Apply custom paragraph style
                    children: [
                        new docx.Paragraph({
                            text: documentText, // Preserving original content
                            font: customStyle.run.font, // Apply custom font
                            size: customStyle.run.size, // Apply custom size
                            color: customStyle.run.color, // Apply custom color
                            bold: customStyle.run.bold, // Make text bold
                        }),
                    ],
                }),
              ]
            },
          ],
        });

        // Create and download the new watermarked file
        const blob = await docx.Packer.toBlob(doc);
        saveAs(blob, "watermarked.docx");
      });
    };
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-3">Word File Watermarker</h2>
      <input type="file" accept=".docx" onChange={handleFileChange} className="mb-2" />
      <input
        type="text"
        placeholder="Enter watermark text"
        value={watermarkText}
        onChange={handleWatermarkChange}
        className="border p-2 w-full mb-2"
      />
      <button onClick={addWatermark} className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Watermarked File
      </button>
    </div>
  );
};

export default WordWatermarkApp;

//___________________________________________________________________________________________________________________________________
//________________________________________________________________________________________________________________________________________________________

// import React, { useState } from "react";
// import { saveAs } from "file-saver";
// import * as docx from "docx";
// import mammoth from "mammoth";

// const WordWatermarkApp = () => {
//   const [file, setFile] = useState(null);
//   const [watermarkText, setWatermarkText] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleWatermarkChange = (e) => {
//     setWatermarkText(e.target.value);
//   };

//   const addWatermark = async () => {
//     if (!file || !watermarkText) {
//       alert("Please upload a file and enter watermark text");
//       return;
//     }

//     // Read file content
//     const reader = new FileReader();
//     reader.readAsArrayBuffer(file);
//     reader.onload = async (event) => {
//       const arrayBuffer = event.target.result;

//       // Extract text using Mammoth.js
//       mammoth.extractRawText({ arrayBuffer }).then(async (result) => {
//         const documentText = result.value; // Extracted text from .docx

//         // Create watermark in the header that will appear on every page
//         const watermarkParagraph = new docx.Paragraph({
//           children: [
//             new docx.TextRun({
//               text: watermarkText,
//               font: "Calibri",
//               color: "000000", // Black color
//               size: 48, // Adjust size as Auto (simulating with a larger size)
//               bold: true,
//               opacity: 0.2, // Semi-transparent watermark
//               transform: "rotate(-45deg)", // Diagonal layout
//             }),
//           ],
//           alignment: docx.AlignmentType.CENTER,
//           spacing: { before: 300 },
//         });

//         // Create the document with the watermark in the header
//         const doc = new docx.Document({
//           sections: [
//             {
//               properties: {},
//               headers: {
//                 default: new docx.Header({
//                   children: [
//                     watermarkParagraph, // Add watermark to the header
//                   ],
//                 }),
//               },
//               children: [
//                 new docx.Paragraph({
//                   text: documentText, // Preserve original content
//                   style: "Normal",
//                 }),
//               ],
//             },
//           ],
//         });

//         // Create and download the new watermarked file
//         const blob = await docx.Packer.toBlob(doc);
//         saveAs(blob, "watermarked.docx");
//       });
//     };
//   };

//   return (
//     <div className="p-5 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-3">Word File Watermarker</h2>
//       <input type="file" accept=".docx" onChange={handleFileChange} className="mb-2" />
//       <input
//         type="text"
//         placeholder="Enter watermark text"
//         value={watermarkText}
//         onChange={handleWatermarkChange}
//         className="border p-2 w-full mb-2"
//       />
//       <button onClick={addWatermark} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Generate Watermarked File
//       </button>
//     </div>
//   );
// };

// export default WordWatermarkApp;



// ______________________________________________________________________________________________________________________________________________
// ______________________________________________________________________________________________________________________________




// import React, { useState } from "react";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

// const WordWatermarkApp = () => {
//   const [file, setFile] = useState(null);
//   const [watermarkText, setWatermarkText] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleWatermarkChange = (e) => {
//     setWatermarkText(e.target.value);
//   };

//   const addWatermark = async () => {
//     if (!file || !watermarkText) {
//       alert("Please upload a file and enter watermark text");
//       return;
//     }

//     try {
//       // Read the DOCX file as an ArrayBuffer
//       const arrayBuffer = await file.arrayBuffer();
//       const zip = await JSZip.loadAsync(arrayBuffer);

//       // Locate header1.xml (if it exists) or create a basic header XML if it doesn't.
//       const headerPath = "word/header1.xml";
//       let headerXml = "";
//       if (zip.file(headerPath)) {
//         headerXml = await zip.file(headerPath).async("string");
//       } else {
//         // If no header exists, create a basic one
//         headerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//           <w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
//                  xmlns:v="urn:schemas-microsoft-com:vml">
//             <w:p/>
//           </w:hdr>`;
//       }

//       // Use DOMParser to parse the header XML
//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(headerXml, "application/xml");

//       // Create a new paragraph element for the watermark
//       const wNamespace = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
//       const watermarkP = xmlDoc.createElementNS(wNamespace, "w:p");

//       // Create run element
//       const watermarkR = xmlDoc.createElementNS(wNamespace, "w:r");

//       // Create text element with watermark text
//       const watermarkT = xmlDoc.createElementNS(wNamespace, "w:t");
//       watermarkT.textContent = watermarkText;

//       // Append text to run and run to paragraph
//       watermarkR.appendChild(watermarkT);
//       watermarkP.appendChild(watermarkR);

//       // Optionally, add additional properties to watermarkP for styling or positioning if needed.

//       // Append the watermark paragraph to the header (so it appears on all pages)
//       xmlDoc.documentElement.appendChild(watermarkP);

//       // Serialize the modified XML back to a string
//       const serializer = new XMLSerializer();
//       const newHeaderXml = serializer.serializeToString(xmlDoc);

//       // Update the header file in the DOCX ZIP
//       zip.file(headerPath, newHeaderXml);

//       // Generate the updated DOCX file as a Blob.
//       const updatedBlob = await zip.generateAsync({ type: "blob" });
//       saveAs(updatedBlob, "watermarked.docx");
//     } catch (error) {
//       console.error("Error processing the DOCX file:", error);
//       alert("An error occurred while adding the watermark. See console for details.");
//     }
//   };

//   return (
//     <div className="p-5 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-3">Word File Watermarker</h2>
//       <input type="file" accept=".docx" onChange={handleFileChange} className="mb-2" />
//       <input
//         type="text"
//         placeholder="Enter watermark text"
//         value={watermarkText}
//         onChange={handleWatermarkChange}
//         className="border p-2 w-full mb-2"
//       />
//       <button onClick={addWatermark} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Generate Watermarked File
//       </button>
//     </div>
//   );
// };

// export default WordWatermarkApp;
 // Nameste

 //__________________________________________________________________________________________________________________________________
 //__________________________________________________________________________________________________________________________________________________



// import React, { useState } from "react";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

// const WordWatermarkApp = () => {
//   const [file, setFile] = useState(null);
//   const [watermarkText, setWatermarkText] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleWatermarkChange = (e) => {
//     setWatermarkText(e.target.value);
//   };

//   // Function to add a VML watermark into the header XML document
//   const addWatermarkToHeader = (xmlDoc, watermarkText) => {
//     const wNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
//     const vNS = "urn:schemas-microsoft-com:vml";
//     const oNS = "urn:schemas-microsoft-com:office:office";

//     // Ensure the header element has the required namespace declarations.
//     const headerElem = xmlDoc.documentElement;
//     if (!headerElem.getAttribute("xmlns:v")) {
//       headerElem.setAttribute("xmlns:v", vNS);
//     }
//     if (!headerElem.getAttribute("xmlns:o")) {
//       headerElem.setAttribute("xmlns:o", oNS);
//     }

//     // Create the watermark VML shape with the required styling.
//     // It is rotated 45 degrees, centered, and with 0.5 opacity.
//     const wP = xmlDoc.createElementNS(wNS, "w:p");
//     const wR = xmlDoc.createElementNS(wNS, "w:r");
//     const wPict = xmlDoc.createElementNS(wNS, "w:pict");

//     const vShape = xmlDoc.createElementNS(vNS, "v:shape");
//     vShape.setAttribute("id", "PowerPlusWaterMarkObject357476642");
//     vShape.setAttribute("o:spid", "_x0000_s2049");
//     vShape.setAttribute("type", "#_x0000_t136");
//     vShape.setAttribute(
//       "style",
//       "position:absolute; width:468pt; height:355pt; z-index:-251654144; mso-wrap-edited:f; mso-position-horizontal:center; mso-position-vertical:center; rotation:45"
//     );
//     vShape.setAttribute("o:preferrelative", "t");

//     const vTextPath = xmlDoc.createElementNS(vNS, "v:textpath");
//     vTextPath.setAttribute("style", 'font-family:"Calibri";font-size:50pt;color:gray;opacity:0.5');
//     vTextPath.setAttribute("on", "true");
//     vTextPath.setAttribute("string", watermarkText);

//     // Build structure: <w:p><w:r><w:pict><v:shape><v:textpath/></v:shape></w:pict></w:r></w:p>
//     vShape.appendChild(vTextPath);
//     wPict.appendChild(vShape);
//     wR.appendChild(wPict);
//     wP.appendChild(wR);

//     // Append watermark paragraph to the header element.
//     headerElem.appendChild(wP);
//   };

//   // Function to update document.xml and its relationships when no header exists.
//   const addHeaderReferenceToDocument = async (zip) => {
//     const parser = new DOMParser();
//     const serializer = new XMLSerializer();

//     // Update word/document.xml to reference header1.xml.
//     const docPath = "word/document.xml";
//     const docXmlStr = await zip.file(docPath).async("string");
//     const docXml = parser.parseFromString(docXmlStr, "application/xml");

//     // Find the section properties (<w:sectPr>), usually the last element in <w:body>.
//     const sectPrList = docXml.getElementsByTagName("w:sectPr");
//     if (sectPrList.length > 0) {
//       const sectPr = sectPrList[0];
//       // Create a new headerReference element.
//       const headerRef = docXml.createElementNS("http://schemas.openxmlformats.org/wordprocessingml/2006/main", "w:headerReference");
//       headerRef.setAttribute("w:type", "default");
//       headerRef.setAttribute("r:id", "rIdHeader1");
//       // Insert headerReference at the beginning of sectPr.
//       sectPr.insertBefore(headerRef, sectPr.firstChild);
//       // Serialize and update document.xml.
//       const newDocXml = serializer.serializeToString(docXml);
//       zip.file(docPath, newDocXml);
//     }

//     // Update word/_rels/document.xml.rels to include the header relationship.
//     const relsPath = "word/_rels/document.xml.rels";
//     const relsXmlStr = await zip.file(relsPath).async("string");
//     const relsXml = parser.parseFromString(relsXmlStr, "application/xml");
//     const relationships = relsXml.getElementsByTagName("Relationships")[0];

//     const relationship = relsXml.createElement("Relationship");
//     relationship.setAttribute("Id", "rIdHeader1");
//     relationship.setAttribute("Type", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header");
//     relationship.setAttribute("Target", "header1.xml");

//     relationships.appendChild(relationship);
//     const newRelsXml = serializer.serializeToString(relsXml);
//     zip.file(relsPath, newRelsXml);
//   };

//   const addWatermark = async () => {
//     if (!file || !watermarkText) {
//       alert("Please upload a file and enter watermark text");
//       return;
//     }

//     try {
//       // Load the DOCX file as an ArrayBuffer.
//       const arrayBuffer = await file.arrayBuffer();
//       const zip = await JSZip.loadAsync(arrayBuffer);

//       const headerPath = "word/header1.xml";
//       let headerXml = "";
//       const parser = new DOMParser();
//       const serializer = new XMLSerializer();

//       // Check if header1.xml exists.
//       if (zip.file(headerPath)) {
//         headerXml = await zip.file(headerPath).async("string");
//       } else {
//         // Create a minimal header XML if none exists.
//         headerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//           <w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
//                  xmlns:v="urn:schemas-microsoft-com:vml"
//                  xmlns:o="urn:schemas-microsoft-com:office:office">
//             <w:p/>
//           </w:hdr>`;
//         // Add the header file to the ZIP.
//         zip.file(headerPath, headerXml);

//         // Update document.xml and its relationships so that this header is used.
//         await addHeaderReferenceToDocument(zip);
//       }

//       // Parse the header XML.
//       const headerXmlDoc = parser.parseFromString(headerXml, "application/xml");

//       // Add the watermark VML shape to the header.
//       addWatermarkToHeader(headerXmlDoc, watermarkText);

//       // Serialize the updated header XML and update the ZIP.
//       const newHeaderXml = serializer.serializeToString(headerXmlDoc);
//       zip.file(headerPath, newHeaderXml);

//       // Repackage the DOCX and trigger download.
//       const updatedBlob = await zip.generateAsync({ type: "blob" });
//       saveAs(updatedBlob, "watermarked.docx");
//     } catch (error) {
//       console.error("Error processing the DOCX file:", error);
//       alert("An error occurred while adding the watermark. Check the console for details.");
//     }
//   };

//   return (
//     <div className="p-5 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-3">Word File Watermarker</h2>
//       <input type="file" accept=".docx" onChange={handleFileChange} className="mb-2" />
//       <input
//         type="text"
//         placeholder="Enter watermark text"
//         value={watermarkText}
//         onChange={handleWatermarkChange}
//         className="border p-2 w-full mb-2"
//       />
//       <button onClick={addWatermark} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Generate Watermarked File
//       </button>
//     </div>
//   );
// };

// export default WordWatermarkApp;

//--------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------__________________________________________________________________


// import React, { useState } from "react";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

// const WordWatermarkApp = () => {
//   const [file, setFile] = useState(null);
//   const [watermarkText, setWatermarkText] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleWatermarkChange = (e) => {
//     setWatermarkText(e.target.value);
//   };

//   // Update [Content_Types].xml to include header1.xml if not present.
//   const updateContentTypes = async (zip) => {
//     const ctPath = "[Content_Types].xml";
//     const parser = new DOMParser();
//     const serializer = new XMLSerializer();
//     let ctXmlStr = await zip.file(ctPath).async("string");
//     const ctXml = parser.parseFromString(ctXmlStr, "application/xml");

//     const overrides = ctXml.getElementsByTagName("Override");
//     let exists = false;
//     for (let i = 0; i < overrides.length; i++) {
//       if (overrides[i].getAttribute("PartName") === "/word/header1.xml") {
//         exists = true;
//         break;
//       }
//     }
//     if (!exists) {
//       const overrideElem = ctXml.createElement("Override");
//       overrideElem.setAttribute("PartName", "/word/header1.xml");
//       overrideElem.setAttribute(
//         "ContentType",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"
//       );
//       ctXml.documentElement.appendChild(overrideElem);
//       const newCtXmlStr = serializer.serializeToString(ctXml);
//       zip.file(ctPath, newCtXmlStr);
//     }
//   };

//   // Inserts a VML watermark shape into the header XML document.
//   // The watermark is centered, rotated 45°, with opacity 0.5.
//   const addWatermarkToHeader = (xmlDoc, watermarkText) => {
//     const wNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
//     const rNS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
//     const vNS = "urn:schemas-microsoft-com:vml";
//     const oNS = "urn:schemas-microsoft-com:office:office";

//     const headerElem = xmlDoc.documentElement;
//     // Ensure all required namespaces are set.
//     if (!headerElem.getAttribute("xmlns:w")) headerElem.setAttribute("xmlns:w", wNS);
//     if (!headerElem.getAttribute("xmlns:r")) headerElem.setAttribute("xmlns:r", rNS);
//     if (!headerElem.getAttribute("xmlns:v")) headerElem.setAttribute("xmlns:v", vNS);
//     if (!headerElem.getAttribute("xmlns:o")) headerElem.setAttribute("xmlns:o", oNS);

//     // Create a new paragraph to hold the watermark.
//     const wP = xmlDoc.createElementNS(wNS, "w:p");
//     const wR = xmlDoc.createElementNS(wNS, "w:r");
//     const wPict = xmlDoc.createElementNS(wNS, "w:pict");

//     // Create the VML shape element.
//     const vShape = xmlDoc.createElementNS(vNS, "v:shape");
//     vShape.setAttribute("id", "PowerPlusWaterMarkObject357476642");
//     vShape.setAttribute("o:spid", "_x0000_s2049");
//     vShape.setAttribute("type", "#_x0000_t136");
//     // Set style to center, 45° rotation; adjust width/height as needed.
//     vShape.setAttribute(
//       "style",
//       "position:absolute; margin-left:0; margin-top:0; width:468pt; height:355pt; z-index:-251654144; mso-wrap-edited:f; mso-position-horizontal:center; mso-position-vertical:center; rotation:45"
//     );
//     vShape.setAttribute("o:preferrelative", "t");
//     // Add attributes that Word expects.
//     vShape.setAttribute("stroked", "f");
//     vShape.setAttribute("filled", "t");
//     vShape.setAttribute("fillcolor", "gray");

//     // Create the VML textpath element for the watermark text.
//     const vTextPath = xmlDoc.createElementNS(vNS, "v:textpath");
//     vTextPath.setAttribute("on", "true");
//     vTextPath.setAttribute("string", watermarkText);
//     // Set text style: adjust font-size and opacity as needed.
//     vTextPath.setAttribute("style", 'font-family:"Calibri";font-size:50pt;color:gray;opacity:0.5');

//     // Assemble the VML structure.
//     vShape.appendChild(vTextPath);
//     wPict.appendChild(vShape);
//     wR.appendChild(wPict);
//     wP.appendChild(wR);
//     headerElem.appendChild(wP);
//   };

//   // If no header exists, update document.xml and its relationships so that a header is used.
//   const addHeaderReferenceToDocument = async (zip) => {
//     const parser = new DOMParser();
//     const serializer = new XMLSerializer();
//     const docPath = "word/document.xml";
//     const docXmlStr = await zip.file(docPath).async("string");
//     const docXml = parser.parseFromString(docXmlStr, "application/xml");

//     // Locate section properties (<w:sectPr>), typically at the end of <w:body>.
//     const sectPr = docXml.getElementsByTagName("w:sectPr")[0];
//     if (sectPr) {
//       const headerRef = docXml.createElementNS(
//         "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
//         "w:headerReference"
//       );
//       headerRef.setAttribute("w:type", "default");
//       headerRef.setAttribute("r:id", "rIdHeader1");
//       sectPr.insertBefore(headerRef, sectPr.firstChild);
//       const newDocXmlStr = serializer.serializeToString(docXml);
//       zip.file(docPath, newDocXmlStr);
//     }

//     // Update the document relationships.
//     const relsPath = "word/_rels/document.xml.rels";
//     const relsXmlStr = await zip.file(relsPath).async("string");
//     const relsXml = parser.parseFromString(relsXmlStr, "application/xml");
//     const relationships = relsXml.getElementsByTagName("Relationships")[0];
//     const relationship = relsXml.createElement("Relationship");
//     relationship.setAttribute("Id", "rIdHeader1");
//     relationship.setAttribute(
//       "Type",
//       "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header"
//     );
//     relationship.setAttribute("Target", "header1.xml");
//     relationships.appendChild(relationship);
//     const newRelsXmlStr = new XMLSerializer().serializeToString(relsXml);
//     zip.file(relsPath, newRelsXmlStr);
//   };

//   const addWatermark = async () => {
//     if (!file || !watermarkText) {
//       alert("Please upload a file and enter watermark text");
//       return;
//     }
//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const zip = await JSZip.loadAsync(arrayBuffer);
//       const headerPath = "word/header1.xml";
//       const parser = new DOMParser();
//       const serializer = new XMLSerializer();
//       let headerXml = "";

//       // Load or create header1.xml.
//       if (zip.file(headerPath)) {
//         headerXml = await zip.file(headerPath).async("string");
//       } else {
//         headerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
//        xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
//        xmlns:v="urn:schemas-microsoft-com:vml"
//        xmlns:o="urn:schemas-microsoft-com:office:office">
//   <w:p/>
// </w:hdr>`;
//         zip.file(headerPath, headerXml);
//         await addHeaderReferenceToDocument(zip);
//         await updateContentTypes(zip);
//       }

//       // Parse header XML, add watermark, and update header1.xml.
//       const headerXmlDoc = parser.parseFromString(headerXml, "application/xml");
//       addWatermarkToHeader(headerXmlDoc, watermarkText);
//       const newHeaderXml = serializer.serializeToString(headerXmlDoc);
//       zip.file(headerPath, newHeaderXml);

//       // Generate and download the updated DOCX.
//       const updatedBlob = await zip.generateAsync({ type: "blob" });
//       saveAs(updatedBlob, "watermarked.docx");
//     } catch (error) {
//       console.error("Error processing DOCX:", error);
//       alert("Error adding watermark. Check the console for details.");
//     }
//   };

//   return (
//     <div className="p-5 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-3">Word File Watermarker</h2>
//       <input type="file" accept=".docx" onChange={handleFileChange} className="mb-2" />
//       <input
//         type="text"
//         placeholder="Enter watermark text"
//         value={watermarkText}
//         onChange={handleWatermarkChange}
//         className="border p-2 w-full mb-2"
//       />
//       <button onClick={addWatermark} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Generate Watermarked File
//       </button>
//     </div>
//   );
// };

// export default WordWatermarkApp;

//------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------



// import React, { useRef } from 'react';
// import { DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
// import '@syncfusion/ej2-react-documenteditor/styles/material.css';

// const WordWatermarkApp = () => {
//   const editorRef = useRef(null);

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const data = reader.result;
//         editorRef.current.open(data);
//       };
//       reader.readAsArrayBuffer(file);
//     } else {
//       alert('Please upload a valid .docx file.');
//     }
//   };

//   const addWatermark = () => {
//     const documentEditor = editorRef.current.documentEditor;
//     documentEditor.selection.goToPage(1);
//     documentEditor.editor.insertText('CONFIDENTIAL', 'Watermark');
//   };

//   const saveDocument = () => {
//     const documentEditor = editorRef.current.documentEditor;
//     documentEditor.save('watermarked-document.docx', 'Docx');
//   };

//   return (
//     <div>
//         <br /><br /><br /><br />
//       <input type="file" accept=".docx" onChange={handleFileChange} />
//       <button onClick={addWatermark}>Add Watermark</button>
//       <button onClick={saveDocument}>Save Document</button>
//       <DocumentEditorContainerComponent
//         ref={editorRef}
//         height="600px"
//         serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
//         enableToolbar={true}
//       />
//     </div>
//   );
// };

// export default WordWatermarkApp;


//----------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
