import React from "react";

import Header from './comp/Header'
export default function DashboardLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}