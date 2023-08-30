import React, {useEffect,useRef} from 'react';

const css = `
        #viewDiv {
            height:600px;
            width:600px;
        }`;

export function WebMap() {
    
    
    useEffect(() =>{
        import("./Map").then(
            app => app.initialize()
        );
    });

    return(
    <>
    <div id="viewDiv"></div>
    <style>
        {css}
    </style>
    
    </>
    );
}