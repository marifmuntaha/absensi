import React, { useState } from "react";
import { Card, Button } from "reactstrap";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { OverlineTitle } from "../text";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {Document, Page} from "react-pdf";

export const PreviewCard = ({ className, bodyClass, ...props }) => {
    return (
        <Card className={`card-preview ${className ? className : ""}`}>
            <div className={`card-inner ${bodyClass ? bodyClass : ""}`}>{props.children}</div>
        </Card>
    );
};

export const PreviewAltCard = ({ className, bodyClass, ...props }) => {
    return (
        <Card className={`${className ? className : ""}`}>
            <div className={`card-inner ${bodyClass ? bodyClass : ""}`}>{props.children}</div>
        </Card>
    );
};

export const PreviewTable = ({ ...props }) => {
    return (
        <Card className="card card-bordered card-preview">
            <table className={`table preview-reference ${props.size ? `table-${props.size}` : ""}`}>{props.children}</table>
        </Card>
    );
};

export const CodeBlock = ({ language, ...props }) => {
    const [copyText] = useState(props.children);
    const [copyState, setCopyState] = useState(false);
    const onCopyClick = () => {
        setCopyState(true);
        setTimeout(() => setCopyState(false), 2000);
    };
    return (
        <div className={`code-block code-block-clean ${copyState ? "clipboard-success" : ""}`}>
            <OverlineTitle className="title">{props.title ? props.title : "Code Example"}</OverlineTitle>
            <CopyToClipboard text={copyText} onCopy={onCopyClick}>
                <Button color="blank" size="sm" className="clipboard-init">
                    {copyState ? "Copied" : "Copy"}
                </Button>
            </CopyToClipboard>
            <SyntaxHighlighter language="javascript" className="bg-lighter h-max-150px m-0" style={a11yLight}>
                {props.children}
            </SyntaxHighlighter>
        </div>
    );
};

export const PdfPreview = ({fileUrl}) => {
    return (
        <div style={{marginLeft:"27%"}}>
            <Document file={fileUrl}>
                <Page pageNumber={1} />
            </Document>
        </div>
    )
}