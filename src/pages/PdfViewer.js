import { useLocation } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';  // Import Viewer and Worker
import '@react-pdf-viewer/core/lib/styles/index.css';     // Import core styles
import type { PageLayout } from '@react-pdf-viewer/core'; // Import PageLayout type
import { printPlugin } from '@react-pdf-viewer/print';    // Import print plugin
import '@react-pdf-viewer/print/lib/styles/index.css';    // Import print styles
import { toolbarPlugin } from '@react-pdf-viewer/toolbar'; // Import toolbar plugin
import '@react-pdf-viewer/toolbar/lib/styles/index.css';  // Import toolbar styles

const PdfViewer = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const fileUrl = query.get('file');
    console.log(fileUrl, "This is the file URL!");

    // Define the page layout transformation
    const pageLayout: PageLayout = {
        transformSize: ({ size }) => ({
            height: size.height + 30,
            width: size.width + 30,
        }),
    };

    // Create plugins
    const printPluginInstance = printPlugin();
    const toolbarPluginInstance = toolbarPlugin();

    // Extract the toolbar and print button
    const { Toolbar } = toolbarPluginInstance;
    const { PrintButton } = printPluginInstance;

    return (
        <div className="pdf-viewer">
            {fileUrl ? (
                <div style={{ height: '100vh', width: '100%' }}>
                    {/* Top bar with print and save buttons */}
                    <div className="topbar" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        backgroundColor: '#f1f1f1',
                        borderBottom: '1px solid #ccc'
                    }}>
                        <h2>PDF Viewer</h2>
                        <div>
                            {/* Print button from the print plugin */}
                            <PrintButton />
                        </div>
                    </div>

                    {/* Toolbar with built-in buttons */}
                    <div style={{ marginBottom: '16px' }}>
                        <Toolbar />
                    </div>

                    {/* PDF Viewer */}
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={fileUrl} pageLayout={pageLayout} 
                                plugins={[printPluginInstance, toolbarPluginInstance]} />
                    </Worker>
                </div>
            ) : (
                <p>No file selected</p>
            )}
        </div>
    );
};

export default PdfViewer;
