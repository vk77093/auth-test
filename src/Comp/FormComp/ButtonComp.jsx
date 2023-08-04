export function ButtonComp({buttonName,buttonStyle,buttonType,actiononButton}){
return(
    <button type={buttonType} className={'btn btn-'+buttonStyle} onClick={actiononButton}>{buttonName}</button>
)
}