
export function SelectComp({children,labelfor,labelName,selectName,selectValue,SelectChangeAction}){
return(
    <div className="form-group row">
        <label className="col-sm-4 col-md-4 col-form-label" htmlFor={labelfor}>{labelName}</label>
        <div className="col-sm-4 col-md-4">
            <select className="form-control" id={labelfor} name={selectName} value={selectValue} onChange={SelectChangeAction}>
{children}
            </select>
        </div>
    </div>
)
}