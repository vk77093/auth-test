export function CardComp({cardTitle,children}){
    return(
        <>
        <div className="card">
            <div className="card-header">
                <h4 className="text-center card-title">
                    {cardTitle}
                </h4>
                <div className="card-body mt2">
{children}
                </div>
            </div>
        </div>
        </>
    )
}