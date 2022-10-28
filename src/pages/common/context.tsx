import { type } from 'os';
import { createContext, useState } from 'react';
import DeviceSelect from '../device_select';

export const Tab = createContext(function(value:any){value});

function SetTab(){
    const [tab, setTab] = useState("");
    const updateTab = (value:string) =>setTab(value);

    return(
        <>
        <Tab.Provider value={updateTab}>
            <DeviceSelect/>
        </Tab.Provider>
        </>
    )
}

export default SetTab