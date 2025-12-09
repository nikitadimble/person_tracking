import React from 'react';
import { CardHeader, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";

const PreviewCardHeader = ({ title, reportName, url, children }) => {

    const navigate = useNavigate();

    const handleRedirect = () => {
        if (url) {
            navigate(url);
        }
    };

    return (
        <CardHeader 
            className="d-flex align-items-center justify-content-between pt-2 pb-2"
            style={{ backgroundColor: "#171444", color: "#fff" }}
        >
            <h4 className="card-title mb-0">{title}</h4>

            <div className="d-flex align-items-center gap-2">

                {reportName && (
                    <Button 
                        color="primary" 
                        size="sm"
                        onClick={handleRedirect}
                        style={{ minWidth: "130px" }}
                    >
                        {reportName}
                    </Button>
                )}

                {children}
            </div>
        </CardHeader>
    );
}

export default PreviewCardHeader;
