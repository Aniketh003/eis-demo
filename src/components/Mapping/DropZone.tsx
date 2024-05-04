import React, { useCallback, useState } from "react";
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from "react-dropzone";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface DropZoneProps {
    setMainFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const DropZone: React.FC<DropZoneProps> = ({ setMainFile }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isFileAdded, setIsFileAdded] = useState<boolean>(false);
    const [fileSizeMB, setFileSizeMB] = useState<number>(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            const fileSizeInBytes = selectedFile.size;
            const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
            setFile(selectedFile);
            setIsFileAdded(true);
            setFileSizeMB(fileSizeInMB);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragAccept }: {
        getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
        getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
        isDragActive: boolean;
        isDragAccept: boolean;
    } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [".csv"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
        },
        disabled: isFileAdded,
        multiple: false,
    });

    const selectAnotherFile = () => {
        setFile(null);
        setMainFile(null)
        setIsFileAdded(false);
    }

    return (
        <div className="drop-container">
            {!isFileAdded ?
                <div
                    {...getRootProps({
                        className: `drag-container ${isDragActive && "active"} ${isDragAccept ? "accept" : "reject"}`,
                    })}
                >
                    <input {...getInputProps()} />
                    <div
                        className={`upload-container ${isDragActive && "active"} ${isDragAccept ? "accept" : "reject"}`}
                    >
                        {isDragActive ? (
                            isDragAccept ? (
                                <CloudDoneOutlinedIcon fontSize="large" />
                            ) : (
                                <CloudOffOutlinedIcon fontSize="large" />
                            )
                        ) : (
                            <CloudUploadOutlinedIcon fontSize="large" />
                        )}
                        {isDragActive ? (
                            isDragAccept ? (
                                <p>Drop the file here ...</p>
                            ) : (
                                <p>Only csv/excel files are allowed</p>
                            )
                        ) : (
                            <>
                                <p>Drag & Drop</p>
                                <p>or <span>browse</span></p>
                            </>
                        )}
                    </div>
                </div>
                : (
                    <div className="file-container">
                        <div className="file-info">
                            <TextSnippetIcon fontSize="large" />
                            <p>File : {file?.name}</p>
                            <p>Size: {fileSizeMB.toFixed(2)} MB</p>
                        </div>
                        <div className="action-btns">
                            <button onClick={selectAnotherFile}>Delete</button>
                            <button onClick={() => setMainFile(file)}>Next</button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default DropZone;