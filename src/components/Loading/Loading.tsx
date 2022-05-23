import { CircleNotch } from "phosphor-react";
import './style.css'

export function Loading(){
    return(
        <div className="div-loading">
            <CircleNotch weight="bold" color="#8B8989" className="icone" />
        </div>
    )
}