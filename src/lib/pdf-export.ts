import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Sanitize filename: keep letters, digits, underscores, dashes.
 */
const sanitizeFilename = (name: string): string => {
    return name.trim().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-]/g, "");
};

/**
 * Exports a DOM element to a high-quality PDF using a data URI
 * approach that works reliably across all Chromium browsers.
 */
export const exportResumeToPdf = async (
    elementId: string,
    fullName: string = "Resume"
): Promise<boolean> => {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error(`Element with id "${elementId}" not found.`);
    }

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Use the DATA URI approach — browsers always prompt a save with the 
    // correct name when the <a> download attribute is set on a data: URI.
    const safeBase = sanitizeFilename(fullName) || "Resume";
    const finalFilename = `${safeBase}_CV.pdf`;

    const dataUri = pdf.output("datauristring");
    // dataUri looks like: data:application/pdf;filename=generated.pdf;base64,...
    // We strip jsPDF's embedded filename and supply our own.
    const cleanUri = dataUri.replace(
        /^data:application\/pdf;filename=[^;]*;/,
        "data:application/pdf;base64,"
    );

    const link = document.createElement("a");
    link.setAttribute("href", cleanUri);
    link.setAttribute("download", finalFilename);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
};

/**
 * Exports resume data as a JSON file.
 */
export const exportResumeToJson = (data: unknown, fullName: string = "Resume"): void => {
    const safeBase = sanitizeFilename(fullName) || "Resume";
    const filename = `${safeBase}_Data.json`;
    const jsonString = JSON.stringify(data, null, 2);

    const link = document.createElement("a");
    link.setAttribute(
        "href",
        "data:application/json;charset=utf-8," + encodeURIComponent(jsonString)
    );
    link.setAttribute("download", filename);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
