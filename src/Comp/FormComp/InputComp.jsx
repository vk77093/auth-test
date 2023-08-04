export function InputComp({lablefor,labelName,inputType,inputName,inputValue,ChangeEventCatch}){
    return(
        <div className="form-group row">
        <label className="col-sm-3 col-md-3 col-form-label" htmlFor={lablefor}>{labelName}</label>
        <div className="col-sm-4 mb-2 mt-2">
            <input type={inputType} className="form-control" id={lablefor} name={inputName} value={inputValue} onChange={ChangeEventCatch}/>
        </div>
    </div>
    )
}