import React from 'react'
import './certs.css'
import Instance from "../../../api/instance/Instance";
export default function GenerateCertsForUser({setPub, setPrivate, setPresharedKey}) {

    const genkeys = async () => {
        try
        {
            const response = await Instance.get("/server/keys", {});
            console.log("Generate CertsForUser Response:", response);
            setPrivate(response.data.private_key)
            setPub(response.data.public_key)
            setPresharedKey(response.data.preshared_key)
        }
        catch (e)
        {
            console.error(e);
        }
    }
    return (
        <div className={"gencerts-container"}>
            <button className={"gencerts-wrapper"} onClick={genkeys}>
                <img src={process.env.PUBLIC_URL + "/auth-icons/generate.svg"} alt={"icon"}></img>
                Gen New Certs
            </button>
        </div>
    )
}
